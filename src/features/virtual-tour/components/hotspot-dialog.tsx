import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { DialogHotspot } from "@/features/virtual-tour/hotspots/hotspot-layer";
import type { TourImage } from "@/features/virtual-tour/types/tour";

function DialogImage({ image, onError }: { image: TourImage; onError(): void }) {
  return (
    <figure>
      <div className="relative min-h-64 overflow-hidden rounded-2xl bg-ink-strong/5 sm:min-h-96">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) calc(100vw - 4rem), 44rem" className="object-contain" onError={onError} unoptimized />
      </div>
      {image.caption ? <figcaption className="mt-3 text-sm leading-6 text-ink-muted">{image.caption}</figcaption> : null}
    </figure>
  );
}

export function HotspotDialog({ hotspot, onClose }: { hotspot: DialogHotspot | null; onClose(): void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!hotspot || !dialog) return;
    setMediaError(false);
    if (!dialog.open) dialog.showModal();
  }, [hotspot]);

  if (!hotspot) return null;

  const title = hotspot.type === "image" ? hotspot.image.caption ?? hotspot.label : hotspot.title;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="virtual-tour-dialog-title"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(48rem,calc(100%-2rem))] overflow-y-auto rounded-[2rem] bg-background p-0 text-ink-strong shadow-card backdrop:bg-ink-strong/80 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-ink/10 bg-background/95 px-5 py-4 backdrop-blur-md sm:px-7">
        <div className="min-w-0 py-1">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-strong">{hotspot.type} hotspot</p>
          <h2 id="virtual-tour-dialog-title" className="mt-2 text-2xl font-black tracking-[-0.04em]">{title}</h2>
        </div>
        <button type="button" onClick={() => dialogRef.current?.close()} className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 bg-white text-ink-muted hover:border-primary hover:text-ink-strong" aria-label="Tutup panel">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className="p-5 sm:p-7">
        {hotspot.type === "info" ? (
          <div>
            <p className="text-base leading-7 text-ink-muted">{hotspot.description}</p>
            {hotspot.image && !mediaError ? <div className="mt-6"><DialogImage image={hotspot.image} onError={() => setMediaError(true)} /></div> : null}
          </div>
        ) : null}

        {hotspot.type === "image" && !mediaError ? <DialogImage image={hotspot.image} onError={() => setMediaError(true)} /> : null}

        {hotspot.type === "video" && !mediaError ? (
          <video controls preload="none" playsInline poster={hotspot.video.poster?.src} onError={() => setMediaError(true)} className="max-h-[65dvh] w-full rounded-2xl bg-ink-strong" aria-label={hotspot.title}>
            <source src={hotspot.video.src} type={hotspot.video.mimeType} />
            {hotspot.video.captions ? <track src={hotspot.video.captions.src} kind="captions" srcLang={hotspot.video.captions.srcLang} label={hotspot.video.captions.label} /> : null}
            Browser tidak mendukung pemutar video HTML.
          </video>
        ) : null}

        {mediaError ? (
          <div className="rounded-2xl border border-dashed border-ink/20 bg-white p-8 text-center" role="status">
            <p className="text-lg font-black">Media fixture belum tersedia.</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">Tambahkan file pada path di tour config tanpa mengubah viewer atau dialog.</p>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
