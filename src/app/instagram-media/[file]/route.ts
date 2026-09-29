import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  if (!/^[A-Za-z0-9_-]+-[a-f0-9]{12}\.webp$/.test(file)) {
    return new Response(null, { status: 404 });
  }

  const directory = process.env.INSTAGRAM_MEDIA_DIR ?? path.join(process.cwd(), "var", "instagram-media");
  try {
    const bytes = await readFile(path.join(directory, file));
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(bytes.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
