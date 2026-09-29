import { access, cp, mkdir, rm } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const standaloneDirectory = path.join(projectRoot, ".next", "standalone");
const staticDirectory = path.join(projectRoot, ".next", "static");
const publicDirectory = path.join(projectRoot, "public");
const releaseDirectory = path.join(projectRoot, "build");
const useRemoteMedia = Boolean(process.env.NEXT_PUBLIC_ASSET_ORIGIN);

for (const directory of [standaloneDirectory, staticDirectory, publicDirectory]) {
  try {
    await access(directory, constants.R_OK);
  } catch {
    throw new Error(`Direktori build tidak ditemukan: ${directory}. Jalankan npm run build terlebih dahulu.`);
  }
}

await rm(releaseDirectory, { recursive: true, force: true });
await mkdir(path.join(releaseDirectory, ".next"), { recursive: true });
await cp(standaloneDirectory, releaseDirectory, { recursive: true });
await cp(staticDirectory, path.join(releaseDirectory, ".next", "static"), { recursive: true });
await cp(publicDirectory, path.join(releaseDirectory, "public"), {
  recursive: true,
  filter(source) {
    if (!useRemoteMedia) return true;
    const relativePath = path.relative(publicDirectory, source);
    return !(
      relativePath === "tours"
      || relativePath.startsWith(`tours${path.sep}`)
      || relativePath === path.join("panda", "idle")
      || relativePath.startsWith(`${path.join("panda", "idle")}${path.sep}`)
    );
  },
});

console.log(`Runtime standalone siap di ${releaseDirectory}${useRemoteMedia ? " tanpa media R2" : ""}`);
