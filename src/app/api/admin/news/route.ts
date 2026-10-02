import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { contentFile, getCmsNews, isItem, type CmsNewsItem } from "@/lib/cms-news";

export const runtime = "nodejs";

function authorized(request: Request) {
  const expected = process.env.CMS_ADMIN_TOKEN?.trim();
  return !!expected && request.headers.get("authorization") === `Bearer ${expected}`;
}

async function save(items: CmsNewsItem[]) {
  const file = contentFile();
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  await writeFile(temporary, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  await rename(temporary, file);
  revalidatePath("/berita");
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getCmsNews());
}

export async function PUT(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload: unknown = await request.json();
  if (!Array.isArray(payload) || !payload.every(isItem)) {
    return NextResponse.json({ error: "Format berita tidak valid" }, { status: 400 });
  }
  await save(payload);
  return NextResponse.json({ ok: true, count: payload.length });
}
