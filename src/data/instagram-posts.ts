import { readFile } from "node:fs/promises";
import path from "node:path";
import feed from "./instagram-feed.json";

export type InstagramPost = {
  id: string;
  permalink: string;
  imageSrc: string;
  imageAlt: string;
  caption: string | null;
  publishedAt: string | null;
  mediaType: "image" | "carousel" | "video";
};

function isInstagramPost(value: unknown): value is InstagramPost {
  if (!value || typeof value !== "object") return false;
  const post = value as Partial<InstagramPost>;
  return typeof post.id === "string"
    && /^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/$/.test(post.permalink ?? "")
    && typeof post.imageSrc === "string"
    && /^\/instagram-media\/[\w-]+-[a-f0-9]{12}\.webp$/.test(post.imageSrc)
    && typeof post.imageAlt === "string"
    && (post.caption === null || typeof post.caption === "string")
    && (post.publishedAt === null || typeof post.publishedAt === "string")
    && ["image", "carousel", "video"].includes(post.mediaType ?? "");
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const file = process.env.INSTAGRAM_FEED_FILE ?? path.join(process.cwd(), "var", "instagram-feed.json");

  try {
    const snapshot: unknown = JSON.parse(await readFile(/* turbopackIgnore: true */ file, "utf8"));
    if (snapshot && typeof snapshot === "object" && "posts" in snapshot) {
      const posts = (snapshot as { posts: unknown }).posts;
      if (Array.isArray(posts) && posts.length >= 4 && posts.every(isInstagramPost)) {
        return posts.slice(0, 12);
      }
    }
  } catch {
    // A missing or invalid runtime snapshot falls back to the bundled gallery.
  }

  return feed.posts as InstagramPost[];
}
