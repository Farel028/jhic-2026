import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile, rename, mkdtemp, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const feedFile = process.env.INSTAGRAM_FEED_FILE ?? path.join(root, "var/instagram-feed.json");
const imagesDir = process.env.INSTAGRAM_MEDIA_DIR ?? path.join(root, "var/instagram-media");
const browserUserDataDir = process.env.INSTAGRAM_BROWSER_USER_DATA_DIR?.trim() || null;
const account = "smkn2surabaya";
const pinnedPostIds = new Set([
  "DMKMu85SepL",
  "DMKMtfvSNID",
  "DMKMsNHy-72",
]);
const args = process.argv.slice(2);
const inputIndex = args.indexOf("--input");
const limitIndex = args.indexOf("--limit");
const inputFile = inputIndex >= 0 ? args[inputIndex + 1] : null;
const limit = limitIndex >= 0 ? Number(args[limitIndex + 1]) : 12;
const dryRun = args.includes("--dry-run");

if ((inputIndex >= 0 && !inputFile) || !Number.isInteger(limit) || limit < 4 || limit > 12) {
  throw new Error("Usage: node scripts/sync-instagram.mjs [--input ig.json] [--limit 4..12] [--dry-run]");
}

function instagramPostUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    const match = url.pathname.match(/^\/(p|reel)\/([A-Za-z0-9_-]+)\/?$/);
    if (!(["instagram.com", "www.instagram.com"].includes(url.hostname) && match)) return null;
    return `https://www.instagram.com/${match[1]}/${match[2]}/`;
  } catch {
    return null;
  }
}

function imageUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !/(^|\.)(cdninstagram\.com|fbcdn\.net)$/.test(url.hostname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

function isPinnedPost(node) {
  return pinnedPostIds.has(node.code)
    || node.is_pinned === true
    || node.pinned_for_users === true
    || (Array.isArray(node.pinned_for_users) && node.pinned_for_users.length > 0)
    || (Array.isArray(node.timeline_pinned_user_ids) && node.timeline_pinned_user_ids.length > 0);
}

function decodeHtml(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, code) => {
    if (code.startsWith("#")) {
      const point = code[1].toLowerCase() === "x"
        ? Number.parseInt(code.slice(2), 16)
        : Number.parseInt(code.slice(1), 10);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[code.toLowerCase()] ?? entity;
  });
}

function metadata(html) {
  const result = {};
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), decodeHtml(match[2])]),
    );
    const key = attributes.property ?? attributes.name;
    if (key && attributes.content) result[key] = attributes.content;
  }
  return result;
}

function publishedAt(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/\bon (January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})[.:]/);
  if (match) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return new Date(Date.UTC(Number(match[3]), months.indexOf(match[1]), Number(match[2]))).toISOString();
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

function captionFromMeta(meta) {
  const description = meta["og:description"] ?? "";
  const title = meta["og:title"] ?? "";
  const match = description.match(/\bon [A-Za-z]+ \d{1,2}, \d{4}:\s*["“]([\s\S]*)["”]\s*$/)
    ?? title.match(/\bon Instagram:\s*["“]([\s\S]*)["”]\s*$/);
  return match?.[1]?.trim() || null;
}

async function get(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SMEKDA website content sync)" },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

function chromeCandidates() {
  if (process.env.INSTAGRAM_BROWSER_BINARY) return [process.env.INSTAGRAM_BROWSER_BINARY];
  if (process.platform === "win32") {
    return [
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    ];
  }
  return ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"];
}

async function dumpProfileDom(browser, userDataDir) {
  const outputDirectory = await mkdtemp(path.join(tmpdir(), "jhic-instagram-dom-"));
  const outputFile = path.join(outputDirectory, "profile.html");
  return new Promise((resolve, reject) => {
    const browserArgs = [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-crash-reporter",
      "--disable-breakpad",
      "--disable-dev-shm-usage",
      "--disable-features=UseDBus",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${userDataDir}`,
      "--virtual-time-budget=12000",
      "--dump-dom",
      `https://www.instagram.com/${account}/`,
    ];
    const shellQuote = (value) => `'${String(value).replaceAll("'", "'\\''")}'`;
    const childEnv = { ...process.env };
    delete childEnv.DBUS_SESSION_BUS_ADDRESS;
    delete childEnv.DBUS_SYSTEM_BUS_ADDRESS;
    delete childEnv.DISPLAY;
    const command = `${[browser, ...browserArgs].map(shellQuote).join(" ")} > ${shellQuote(outputFile)}`;
    const child = spawn("/bin/sh", ["-c", command], {
      windowsHide: true,
      env: {
        ...childEnv,
      },
    });
    let output = "";
    let error = "";
    const timeout = setTimeout(() => child.kill(), 45000);
    child.stderr.on("data", (chunk) => { error += chunk; });
    child.on("error", reject);
    child.on("close", async (code) => {
      clearTimeout(timeout);
      try {
        output = await readFile(outputFile, "utf8");
        if (output.trim()) resolve(output);
        else reject(new Error(`${browser} exited with ${code ?? "an error"}${error ? `: ${error.slice(0, 300)}` : ""}`));
      } finally {
        await rm(outputDirectory, { recursive: true, force: true });
      }
    });
  });
}

function profilePostsFromDom(html) {
  const posts = new Map();
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    const node = value;
    if (typeof node.code === "string" && typeof node.display_uri === "string" && !isPinnedPost(node)) {
      const url = instagramPostUrl(`https://www.instagram.com/${node.product_type === "clips" ? "reel" : "p"}/${node.code}/`);
      if (url) {
        const caption = typeof node.caption === "object" && node.caption ? node.caption.text : null;
        posts.set(url, {
          url,
          image: postImageUrl(node),
          date: publishedAt(node.accessibility_caption),
          type: node.media_type === 2 ? "Video" : node.media_type === 8 ? "Sidecar" : "Image",
          caption: typeof caption === "string" && caption.trim() ? caption.trim() : node.accessibility_caption ?? null,
          alt: node.accessibility_caption ?? null,
        });
      }
    }
    Object.values(node).forEach(visit);
  };

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    if (!match[1].includes("polaris_ordered_timeline_connection")) continue;
    try {
      visit(JSON.parse(match[1]));
    } catch {
      // Instagram includes unrelated JSON script tags; ignore malformed payloads.
    }
  }
  return [...posts.values()];
}

function profileGridImagesFromDom(html) {
  const images = new Map();
  const anchorPattern = /<a\b[^>]*href=["']\/[^"']+\/(p|reel)\/([A-Za-z0-9_-]+)\/?["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(anchorPattern)) {
    const image = match[3].match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1]
      ?? match[3].match(/<img\b[^>]*\bsrcset=["']([^"']+)["']/i)?.[1]?.split(/\s+/)[0];
    const src = imageUrl(image?.replaceAll("&amp;", "&"));
    if (src) images.set(match[2], src);
  }
  return images;
}

async function candidatesFromProfile() {
  const userDataDir = browserUserDataDir
    ? path.resolve(browserUserDataDir)
    : await mkdtemp(path.join(tmpdir(), "jhic-instagram-"));
  let html;
  let lastError;
  try {
    if (browserUserDataDir) await mkdir(userDataDir, { recursive: true });
    for (const browser of chromeCandidates()) {
      try {
        html = await dumpProfileDom(browser, userDataDir);
        break;
      } catch (error) {
        lastError = error;
      }
    }
  } finally {
    if (!browserUserDataDir) await rm(userDataDir, { recursive: true, force: true });
  }
  if (!html) {
    throw new Error(`Could not load Instagram in a local Chrome/Chromium browser. Install Chromium or set INSTAGRAM_BROWSER_BINARY. ${lastError?.message ?? ""}`.trim());
  }
  const posts = profilePostsFromDom(html);
  if (posts.length) {
    const gridImages = profileGridImagesFromDom(html);
    return posts.map((post) => {
      const id = post.url.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)\//)?.[1];
      const gridImage = id ? gridImages.get(id) : null;
      return gridImage ? { ...post, image: gridImage } : post;
    });
  }

  const urls = [...html.matchAll(/\/(?:p|reel)\/([A-Za-z0-9_-]+)\//g)]
    .map((match) => instagramPostUrl(`https://www.instagram.com/${match[0].split("/")[1]}/${match[1]}/`))
    .filter(Boolean);
  const uniqueUrls = [...new Set(urls)].filter((url) => {
    const id = url.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)\//)?.[1];
    return id && !pinnedPostIds.has(id);
  });
  if (uniqueUrls.length) {
    const gridImages = profileGridImagesFromDom(html);
    return uniqueUrls.map((url) => {
      const id = url.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)\//)?.[1];
      const image = id ? gridImages.get(id) : null;
      return image ? { url, image } : { url };
    });
  }

  if (/\b(?:log\s*in|login|challenge|captcha)\b/i.test(html)) {
    throw new Error("Instagram mengirim login wall/challenge. Login sekali pada profile browser VPS yang sama, lalu ulangi dry-run.");
  }

  return [];
}

function postImageUrl(node) {
  const candidates = [
    ...(Array.isArray(node?.image_versions2?.candidates) ? node.image_versions2.candidates : []),
    ...(Array.isArray(node?.thumbnail_resources) ? node.thumbnail_resources : []),
  ]
    .filter((candidate) => candidate && typeof candidate.url === "string")
    .sort((left, right) => (Number(right.width ?? 0) * Number(right.height ?? 0)) - (Number(left.width ?? 0) * Number(left.height ?? 0)));
  return imageUrl(candidates[0]?.url) ?? imageUrl(node?.display_uri);
}

async function candidatesFromInput() {
  const input = JSON.parse(await readFile(path.resolve(root, inputFile), "utf8"));
  if (!Array.isArray(input)) throw new Error("Input must be a JSON array of Instagram posts.");
  return input.map((item) => ({
    url: instagramPostUrl(item.url),
    image: imageUrl(item.displayUrl),
    date: publishedAt(item.timestamp) ?? publishedAt(item.alt),
    type: item.type,
    alt: item.alt,
  })).filter((item) => item.url);
}

async function resolvePost(candidate) {
  try {
    const meta = metadata(await (await get(candidate.url)).text());
    return {
      ...candidate,
      // The profile grid carries the correct displayed aspect ratio. Use the
      // post metadata only when the grid did not provide an image.
      image: candidate.image ?? imageUrl(meta["og:image"] ?? meta["twitter:image"]),
      date: publishedAt(meta["article:published_time"]) ?? publishedAt(meta["og:description"]) ?? candidate.date,
      type: candidate.type ?? (candidate.url.includes("/reel/") || meta["og:type"] === "video" ? "Video" : "Image"),
      caption: captionFromMeta(meta) ?? candidate.caption ?? candidate.alt,
      alt: candidate.alt ?? meta["og:description"] ?? meta["og:title"],
    };
  } catch (error) {
    if (!candidate.image) throw error;
    process.stderr.write(`Post metadata unavailable for ${candidate.url}: ${error.message}\n`);
    return candidate;
  }
}

function mediaType(type) {
  return type === "Video" ? "video" : type === "Sidecar" ? "carousel" : "image";
}

async function saveImage(url, filename) {
  const response = await get(url);
  const type = response.headers.get("content-type")?.split(";")[0];
  if (!["image/jpeg", "image/png", "image/webp"].includes(type)) {
    throw new Error(`Unsupported image type: ${type ?? "unknown"}`);
  }
  const source = Buffer.from(await response.arrayBuffer());
  if (source.length > 8 * 1024 * 1024) throw new Error("Image exceeds 8 MB.");
  // Instagram renders profile-grid media with object-fit: cover in a 3:4 tile.
  // Persist that presentation crop, rather than the post's OG image or raw aspect ratio.
  const bytes = await sharp(source)
    .rotate()
    .resize({ width: 800, height: 1067, fit: "cover", position: "centre", withoutEnlargement: false })
    .webp({ quality: 80 })
    .toBuffer();
  const digest = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  const name = `${filename}-${digest}.webp`;
  await writeFile(path.join(imagesDir, name), bytes);
  return `/instagram-media/${name}`;
}

const candidates = inputFile ? await candidatesFromInput() : await candidatesFromProfile();
if (!candidates.length) throw new Error("No public posts found. Instagram may require login; feed was not changed.");
candidates.sort((a, b) => (Date.parse(b.date ?? "") || 0) - (Date.parse(a.date ?? "") || 0));

if (dryRun) {
  process.stdout.write(`${JSON.stringify(candidates.slice(0, limit), null, 2)}\n`);
} else {
  await mkdir(imagesDir, { recursive: true });
  const posts = [];
  const seen = new Set();
  for (const candidate of candidates) {
    if (posts.length >= limit) break;
    if (seen.has(candidate.url)) continue;
    seen.add(candidate.url);
    try {
      const post = await resolvePost(candidate);
      if (!post.image) throw new Error("No public preview image found.");
      const id = post.url.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)\//)[1];
      let imageSrc;
      try {
        imageSrc = await saveImage(post.image, id);
      } catch (error) {
        if (!candidate.image || post.image === candidate.image) throw error;
        imageSrc = await saveImage(candidate.image, id);
      }
      posts.push({
        id,
        permalink: post.url,
        imageSrc,
        imageAlt: `Unggahan ${mediaType(post.type) === "video" ? "video" : mediaType(post.type) === "carousel" ? "carousel" : "foto"} Instagram SMK Negeri 2 Surabaya`,
        caption: post.caption ?? null,
        publishedAt: post.date ?? null,
        mediaType: mediaType(post.type),
      });
    } catch (error) {
      process.stderr.write(`Skipped ${candidate.url}: ${error.message}\n`);
    }
  }

  if (posts.length < 4) throw new Error("Fewer than four usable posts; previous feed was preserved.");
  posts.sort((a, b) => (Date.parse(b.publishedAt ?? "") || 0) - (Date.parse(a.publishedAt ?? "") || 0));
  await mkdir(path.dirname(feedFile), { recursive: true });
  const tempFile = `${feedFile}.tmp`;
  await writeFile(tempFile, `${JSON.stringify({ updatedAt: new Date().toISOString(), posts }, null, 2)}\n`);
  await rename(tempFile, feedFile);
  process.stdout.write(`Instagram feed updated: ${posts.length} posts. The homepage will refresh from the snapshot.\n`);
}
