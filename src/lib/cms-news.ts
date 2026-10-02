import { readFile } from "node:fs/promises";
import path from "node:path";
import { newsroomItems, type NewsItem } from "@/data/documentation";

export type CmsNewsItem = NewsItem & { slug: string };

const fallbackItems: CmsNewsItem[] = newsroomItems.map((item) => ({
  ...item,
  slug: item.href.replace(/^\/berita\//, ""),
}));

function contentFile() {
  return process.env.CMS_CONTENT_FILE ?? path.join(process.cwd(), "var", "cms-news.json");
}

function isItem(value: unknown): value is CmsNewsItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CmsNewsItem>;
  return [item.slug, item.title, item.excerpt, item.category, item.categoryLabel, item.date, item.year, item.href].every((v) => typeof v === "string")
    && !!item.image && typeof item.image.src === "string" && typeof item.image.alt === "string";
}

export async function getCmsNews(): Promise<CmsNewsItem[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(contentFile(), "utf8"));
    if (Array.isArray(parsed) && parsed.length && parsed.every(isItem)) return parsed;
  } catch {
    // First deploys use the bundled content until the first admin save.
  }
  return fallbackItems;
}

export { contentFile, fallbackItems, isItem };
