import { createPortal } from "react-dom";
import type { PanoramaHotspotMount } from "@/features/virtual-tour/engine/panorama-engine";
import type { Hotspot, HotspotCoordinates, InfoHotspot, ImageHotspot, SceneHotspot, VideoHotspot } from "@/features/virtual-tour/types/tour";

export type DialogHotspot = InfoHotspot | ImageHotspot | VideoHotspot;

export type MountedHotspot = {
  key: string;
  hotspot: Hotspot;
  mount: PanoramaHotspotMount;
};

type HotspotLayerProps = {
  hotspots: readonly MountedHotspot[];
  isSwitching: boolean;
  onSceneSelect(sceneId: string, departure: HotspotCoordinates): void;
  onDialogOpen(hotspot: DialogHotspot): void;
};

function SceneArrow({ hotspot, disabled, onSelect, onPointerDown }: { hotspot: SceneHotspot; disabled: boolean; onSelect(): void; onPointerDown(event: React.PointerEvent): void }) {
  return (
    <button
      type="button"
      aria-label={hotspot.label}
      disabled={disabled}
      onPointerDown={onPointerDown}
      onClick={(event) => { event.stopPropagation(); onSelect(); }}
      className="group relative flex h-20 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-0 bg-transparent text-secondary disabled:cursor-wait disabled:opacity-55"
    >
      <span aria-hidden="true" className="absolute inset-x-4 bottom-2 h-5 rounded-[50%] bg-primary/65 blur-md motion-safe:animate-pulse" />
      <span aria-hidden="true" className="relative grid h-[4.5rem] w-24 place-items-center [transform:perspective(140px)_rotateX(58deg)]">
        <svg viewBox="0 0 96 72" fill="none" className="h-full w-full drop-shadow-[0_8px_10px_rgba(7,23,37,0.7)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110 group-focus-visible:-translate-y-1 group-focus-visible:scale-110">
          <ellipse cx="48" cy="48" rx="42" ry="20" fill="currentColor" opacity="0.24" />
          <path d="M48 5 91 43 73 63 48 42 23 63 5 43 48 5Z" fill="currentColor" stroke="white" strokeWidth="3" strokeLinejoin="round" />
          <path d="m48 17 27 24-9 10-18-15-18 15-9-10 27-24Z" fill="white" opacity="0.5" />
        </svg>
      </span>
      <span className="pointer-events-none absolute bottom-[calc(100%-0.25rem)] left-1/2 w-max max-w-48 -translate-x-1/2 rounded-full bg-ink-strong/95 px-3 py-2 text-center text-xs font-extrabold leading-4 text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{hotspot.label}</span>
    </button>
  );
}

function HotspotIcon({ type }: { type: Hotspot["type"] }) {
  if (type === "scene") {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (type === "info") return <span aria-hidden="true" className="text-base font-black">i</span>;
  if (type === "image") {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="m6.5 16 4-4 3 3 2-2 2.5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (type === "video") {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="m9 7 8 5-8 5V7Z" fill="currentColor" /></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M10 7H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3M14 5h5v5m0-5-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function hotspotTone(type: Hotspot["type"]) {
  if (type === "scene") return "bg-accent-strong text-ink-strong";
  if (type === "info") return "bg-secondary text-ink-strong";
  return "bg-white text-ink-strong";
}

export function HotspotLayer({ hotspots, isSwitching, onSceneSelect, onDialogOpen }: HotspotLayerProps) {
  return hotspots.map(({ key, hotspot, mount }) => {
    const sharedClassName = `group relative grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 shadow-card transition-transform hover:scale-110 focus-visible:scale-110 ${hotspotTone(hotspot.type)}`;
    const label = <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.55rem)] w-max max-w-48 -translate-x-1/2 rounded-full bg-ink-strong/95 px-3 py-2 text-center text-xs font-extrabold leading-4 text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{hotspot.label}</span>;
    const stopViewerGesture = (event: React.PointerEvent) => event.stopPropagation();

    let content;
    if (hotspot.type === "scene") {
      content = (
        <SceneArrow
          hotspot={hotspot}
          disabled={isSwitching}
          onPointerDown={stopViewerGesture}
          onSelect={() => onSceneSelect(hotspot.targetSceneId, { yaw: hotspot.yaw, pitch: hotspot.pitch })}
        />
      );
    } else if (hotspot.type === "link") {
      content = (
        <a href={hotspot.href} target={hotspot.newTab ? "_blank" : undefined} rel={hotspot.newTab ? "noopener noreferrer" : undefined} aria-label={hotspot.label} onPointerDown={stopViewerGesture} onClick={(event) => event.stopPropagation()} className={sharedClassName}>
          <HotspotIcon type={hotspot.type} />
          {label}
        </a>
      );
    } else {
      content = (
        <button type="button" aria-label={hotspot.label} onPointerDown={stopViewerGesture} onClick={(event) => { event.stopPropagation(); onDialogOpen(hotspot); }} className={sharedClassName}>
          <HotspotIcon type={hotspot.type} />
          {label}
        </button>
      );
    }

    return createPortal(content, mount.element, key);
  });
}
