import Image from "next/image";
import { useEffect, useRef } from "react";
import type { SceneConfig } from "@/features/virtual-tour/types/tour";

type SceneMenuProps = {
  scenes: readonly SceneConfig[];
  currentSceneId: string;
  pendingSceneId: string | null;
  isOpen: boolean;
  onClose(): void;
  onSelect(sceneId: string): void;
};

export function SceneMenu({ scenes, currentSceneId, pendingSceneId, isOpen, onClose, onSelect }: SceneMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <aside
      id="virtual-tour-scene-menu"
      aria-labelledby="virtual-tour-scene-menu-title"
      className="absolute bottom-4 left-4 right-4 top-24 z-30 overflow-y-auto rounded-[1.75rem] border border-white/15 bg-ink-strong/95 p-4 text-white shadow-card backdrop-blur-xl sm:bottom-auto sm:left-8 sm:right-auto sm:top-1/2 sm:max-h-[min(34rem,calc(100svh-3rem))] sm:w-80 sm:-translate-y-1/2 lg:left-10"
    >
        <div className="flex items-start justify-between gap-4 px-2 pb-4 pt-1">
          <h2 id="virtual-tour-scene-menu-title" className="pt-2 text-xl font-black tracking-[-0.035em]">Pilih scene</h2>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/75 hover:bg-white/10 hover:text-white" aria-label="Tutup daftar scene">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>

        <ul className="space-y-2">
          {scenes.map((scene, index) => {
            const isCurrent = scene.id === currentSceneId;
            const isPending = scene.id === pendingSceneId;

            return (
              <li key={scene.id}>
                <button
                  type="button"
                  aria-current={isCurrent ? "true" : undefined}
                  disabled={pendingSceneId !== null}
                  onClick={() => onSelect(scene.id)}
                  className={`group flex min-h-16 w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors disabled:cursor-wait disabled:opacity-70 ${isCurrent ? "border-secondary/70 bg-secondary/15" : "border-transparent hover:border-white/15 hover:bg-white/8"}`}
                >
                  {scene.thumbnail ? (
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-white/10">
                      <Image src={scene.thumbnail.src} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                  ) : (
                    <span aria-hidden="true" className={`grid size-12 shrink-0 place-items-center rounded-xl text-sm font-black ${isCurrent ? "bg-secondary text-ink-strong" : "bg-white/10 text-white/65"}`}>{String(index + 1).padStart(2, "0")}</span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold">{scene.title}</span>
                    {isPending || isCurrent ? <span className="mt-1 block text-xs font-semibold text-white/55">{isPending ? "Memuat..." : "Sedang dilihat"}</span> : null}
                  </span>
                  <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${isCurrent ? "bg-secondary" : "border border-white/40"}`} />
                </button>
              </li>
            );
          })}
        </ul>
    </aside>
  );
}
