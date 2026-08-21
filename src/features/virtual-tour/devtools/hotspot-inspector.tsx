"use client";

import { useEffect, useMemo, useState } from "react";
import type { HotspotCoordinates, SceneConfig, ViewState } from "@/features/virtual-tour/types/tour";

type HotspotType = "scene" | "info" | "image" | "video" | "link";

export type HotspotInspectorProps = {
  currentSceneId: string;
  scenes: readonly SceneConfig[];
  pickedCoordinates: HotspotCoordinates | null;
  getCurrentView(): ViewState | null;
  onClose(): void;
};

function formatCoordinate(value: number | undefined) {
  return value === undefined ? "---" : value.toFixed(3);
}

function quote(value: string, fallback: string) {
  return JSON.stringify(value.trim() || fallback);
}

async function copyText(value: string) {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard API is unavailable.");
  await navigator.clipboard.writeText(value);
}

function buildHotspotSnippet({
  type,
  coordinates,
  id,
  label,
  targetSceneId,
  title,
  description,
  assetPath,
  alt,
  href,
  newTab,
}: {
  type: HotspotType;
  coordinates: HotspotCoordinates;
  id: string;
  label: string;
  targetSceneId: string;
  title: string;
  description: string;
  assetPath: string;
  alt: string;
  href: string;
  newTab: boolean;
}) {
  const lines = [
    "{",
    `  id: ${quote(id, "hotspot-example")},`,
    `  type: ${JSON.stringify(type)},`,
  ];

  if (type === "scene") lines.push(`  targetSceneId: ${quote(targetSceneId, "target-scene")},`);
  if (type === "info") {
    lines.push(`  title: ${quote(title, "Judul informasi")},`);
    lines.push(`  description: ${quote(description, "Deskripsi informasi")},`);
  }
  if (type === "image") {
    lines.push("  image: {");
    lines.push(`    src: ${quote(assetPath, "/tours/smkn2/images/example.jpg")},`);
    lines.push(`    alt: ${quote(alt, "Deskripsi gambar")},`);
    lines.push("  },");
  }
  if (type === "video") {
    lines.push(`  title: ${quote(title, "Judul video")},`);
    lines.push("  video: {");
    lines.push('    provider: "file",');
    lines.push(`    src: ${quote(assetPath, "/tours/smkn2/videos/example.mp4")},`);
    lines.push('    mimeType: "video/mp4",');
    lines.push("  },");
  }
  if (type === "link") {
    lines.push(`  href: ${quote(href, "/")},`);
    if (newTab) lines.push("  newTab: true,");
  }

  lines.push(`  yaw: ${coordinates.yaw.toFixed(3)},`);
  lines.push(`  pitch: ${coordinates.pitch.toFixed(3)},`);
  lines.push(`  label: ${quote(label, "Hotspot baru")},`);
  lines.push("},");
  return lines.join("\n");
}

const fieldClassName = "mt-2 min-h-11 w-full rounded-xl border border-white/15 bg-white/8 px-3 text-sm font-semibold text-white outline-none placeholder:text-white/35 focus:border-secondary";

export function HotspotInspector({ currentSceneId, scenes, pickedCoordinates, getCurrentView, onClose }: HotspotInspectorProps) {
  const [view, setView] = useState<ViewState | null>(() => getCurrentView());
  const [hotspotType, setHotspotType] = useState<HotspotType>("scene");
  const [id, setId] = useState("hotspot-example");
  const [label, setLabel] = useState("Hotspot baru");
  const [targetSceneId, setTargetSceneId] = useState(() => scenes.find((scene) => scene.id !== currentSceneId)?.id ?? currentSceneId);
  const [title, setTitle] = useState("Judul hotspot");
  const [description, setDescription] = useState("Deskripsi hotspot");
  const [assetPath, setAssetPath] = useState("/tours/smkn2/images/example.jpg");
  const [alt, setAlt] = useState("Deskripsi gambar");
  const [href, setHref] = useState("/");
  const [newTab, setNewTab] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setView(getCurrentView()), 120);
    return () => window.clearInterval(interval);
  }, [getCurrentView]);

  function handleHotspotTypeChange(type: HotspotType) {
    setHotspotType(type);
    if (type === "image") setAssetPath("/tours/smkn2/images/example.jpg");
    if (type === "video") setAssetPath("/tours/smkn2/videos/example.mp4");
  }

  const snippet = useMemo(() => pickedCoordinates ? buildHotspotSnippet({
    type: hotspotType,
    coordinates: pickedCoordinates,
    id,
    label,
    targetSceneId,
    title,
    description,
    assetPath,
    alt,
    href,
    newTab,
  }) : "Klik panorama untuk memilih yaw dan pitch.", [alt, assetPath, description, href, hotspotType, id, label, newTab, pickedCoordinates, targetSceneId, title]);

  async function handleCopy(value: string, successMessage: string) {
    try {
      await copyText(value);
      setCopyStatus(successMessage);
    } catch {
      setCopyStatus("Clipboard tidak tersedia. Salin teks secara manual.");
    }
  }

  const coordinateText = pickedCoordinates
    ? `yaw: ${pickedCoordinates.yaw.toFixed(3)},\npitch: ${pickedCoordinates.pitch.toFixed(3)},`
    : "";

  return (
    <aside className="absolute inset-x-3 bottom-3 z-40 max-h-[72dvh] overflow-y-auto rounded-[1.5rem] border border-secondary/35 bg-[#071725]/95 p-4 text-white shadow-card backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-5 sm:w-[25rem] sm:max-h-none" aria-labelledby="hotspot-inspector-title">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-secondary">Development only</p>
          <h2 id="hotspot-inspector-title" className="mt-2 text-xl font-black">Hotspot Inspector</h2>
          <p className="mt-1 text-xs font-bold text-white/50">Scene: {currentSceneId}</p>
        </div>
        <button type="button" onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 hover:bg-white/10" aria-label="Tutup Developer Mode">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        {(["yaw", "pitch", "fov"] as const).map((key) => (
          <div key={key} className="rounded-xl border border-white/10 bg-white/6 p-3">
            <dt className="text-[0.6rem] font-black uppercase tracking-[0.16em] text-white/45">{key}</dt>
            <dd className="mt-1 font-mono text-sm font-bold text-secondary">{formatCoordinate(view?.[key])}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4" aria-labelledby="picked-coordinate-title">
        <h3 id="picked-coordinate-title" className="text-sm font-black">Clicked Coordinates</h3>
        <p className="mt-2 text-xs leading-5 text-white/50">Klik singkat pada panorama. Drag tidak dianggap sebagai pemilihan koordinat.</p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-black/25 p-3 font-mono text-xs leading-6 text-secondary">{coordinateText || "yaw: ---\npitch: ---"}</pre>
        <button type="button" disabled={!pickedCoordinates} onClick={() => void handleCopy(coordinateText, "Coordinates disalin.")} className="mt-3 min-h-11 w-full rounded-full bg-secondary px-4 text-sm font-black text-ink-strong disabled:cursor-not-allowed disabled:opacity-40">Copy Coordinates</button>
      </section>

      <section className="mt-5" aria-labelledby="hotspot-creator-title">
        <h3 id="hotspot-creator-title" className="text-sm font-black">Add Hotspot</h3>
        <label className="mt-4 block text-xs font-bold text-white/65">Type
          <select value={hotspotType} onChange={(event) => handleHotspotTypeChange(event.target.value as HotspotType)} className={fieldClassName}>
            <option className="text-ink-strong" value="scene">Scene</option>
            <option className="text-ink-strong" value="info">Info</option>
            <option className="text-ink-strong" value="image">Image</option>
            <option className="text-ink-strong" value="video">Video</option>
            <option className="text-ink-strong" value="link">Link</option>
          </select>
        </label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-bold text-white/65">ID<input value={id} onChange={(event) => setId(event.target.value)} className={fieldClassName} /></label>
          <label className="text-xs font-bold text-white/65">Label<input value={label} onChange={(event) => setLabel(event.target.value)} className={fieldClassName} /></label>
        </div>

        {hotspotType === "scene" ? (
          <label className="mt-3 block text-xs font-bold text-white/65">Target scene
            <select value={targetSceneId} onChange={(event) => setTargetSceneId(event.target.value)} className={fieldClassName}>
              {scenes.map((scene) => <option className="text-ink-strong" key={scene.id} value={scene.id}>{scene.title}</option>)}
            </select>
          </label>
        ) : null}

        {hotspotType === "info" ? (
          <div className="mt-3 space-y-3">
            <label className="block text-xs font-bold text-white/65">Title<input value={title} onChange={(event) => setTitle(event.target.value)} className={fieldClassName} /></label>
            <label className="block text-xs font-bold text-white/65">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className={`${fieldClassName} py-3`} /></label>
          </div>
        ) : null}

        {hotspotType === "image" || hotspotType === "video" ? (
          <div className="mt-3 space-y-3">
            {hotspotType === "video" ? <label className="block text-xs font-bold text-white/65">Title<input value={title} onChange={(event) => setTitle(event.target.value)} className={fieldClassName} /></label> : null}
            <label className="block text-xs font-bold text-white/65">Asset path<input value={assetPath} onChange={(event) => setAssetPath(event.target.value)} className={fieldClassName} /></label>
            {hotspotType === "image" ? <label className="block text-xs font-bold text-white/65">Alt text<input value={alt} onChange={(event) => setAlt(event.target.value)} className={fieldClassName} /></label> : null}
          </div>
        ) : null}

        {hotspotType === "link" ? (
          <div className="mt-3 space-y-3">
            <label className="block text-xs font-bold text-white/65">URL or path<input value={href} onChange={(event) => setHref(event.target.value)} className={fieldClassName} /></label>
            <label className="flex min-h-11 items-center gap-3 text-xs font-bold text-white/65"><input type="checkbox" checked={newTab} onChange={(event) => setNewTab(event.target.checked)} className="size-5 accent-[#7fc8f8]" />Open in new tab</label>
          </div>
        ) : null}

        <pre className="mt-4 max-h-64 overflow-auto rounded-xl bg-black/30 p-3 font-mono text-xs leading-5 text-white/75">{snippet}</pre>
        <button type="button" disabled={!pickedCoordinates} onClick={() => void handleCopy(snippet, "Config hotspot disalin.")} className="mt-3 min-h-11 w-full rounded-full bg-accent-strong px-4 text-sm font-black text-ink-strong disabled:cursor-not-allowed disabled:opacity-40">Copy Config</button>
      </section>

      <p className="mt-4 min-h-5 text-center text-xs font-bold text-secondary" aria-live="polite">{copyStatus}</p>
    </aside>
  );
}
