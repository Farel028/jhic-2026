import type { ReactNode } from "react";

type ControlButtonProps = {
  label: string;
  disabled?: boolean;
  pressed?: boolean;
  onClick(): void;
  children: ReactNode;
};

function ControlButton({ label, disabled, pressed, onClick, children }: ControlButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`group relative grid size-12 shrink-0 place-items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${pressed ? "bg-secondary text-ink-strong" : "text-white hover:bg-white/12"}`}
    >
      {children}
      <span className="pointer-events-none absolute right-[calc(100%+0.6rem)] top-1/2 hidden w-max -translate-y-1/2 rounded-full bg-ink-strong/95 px-3 py-2 text-xs font-extrabold text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block">{label}</span>
    </button>
  );
}

type TourControlsProps = {
  disabled: boolean;
  fullscreenSupported: boolean;
  isFullscreen: boolean;
  showAutorotate: boolean;
  autorotateEnabled: boolean;
  autorotatePaused: boolean;
  autorotateUnavailable: boolean;
  onRecenter(): void;
  onFullscreenToggle(): void;
  onAutorotateToggle(): void;
};

export function TourControls({
  disabled,
  fullscreenSupported,
  isFullscreen,
  showAutorotate,
  autorotateEnabled,
  autorotatePaused,
  autorotateUnavailable,
  onRecenter,
  onFullscreenToggle,
  onAutorotateToggle,
}: TourControlsProps) {
  const autorotateLabel = autorotateUnavailable
    ? "Autorotate dinonaktifkan oleh preferensi reduced motion"
    : autorotateEnabled
      ? autorotatePaused ? "Autorotate aktif, sedang dijeda" : "Matikan autorotate"
      : "Aktifkan autorotate";

  return (
    <div className="absolute bottom-20 right-4 z-20 flex items-center gap-1 rounded-full border border-white/15 bg-ink-strong/85 p-1.5 shadow-card backdrop-blur-md md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2 md:flex-col lg:right-10" aria-label="Kontrol virtual tour" role="toolbar">
      <ControlButton label="Kembalikan arah pandang" disabled={disabled} onClick={onRecenter}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M19 8a8 8 0 1 0 1 6M19 4v4h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>
      </ControlButton>
      {showAutorotate ? (
        <ControlButton label={autorotateLabel} disabled={disabled || autorotateUnavailable} pressed={autorotateEnabled} onClick={onAutorotateToggle}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M18.5 8A7.5 7.5 0 1 0 19 15m-.5-11v4h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </ControlButton>
      ) : null}
      <ControlButton label={fullscreenSupported ? isFullscreen ? "Keluar dari layar penuh" : "Masuk layar penuh" : "Layar penuh tidak didukung"} disabled={disabled || !fullscreenSupported} pressed={isFullscreen} onClick={onFullscreenToggle}>
        {isFullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M9 4v5H4m11-5v5h5M9 20v-5H4m11 5v-5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M9 4H4v5m11-5h5v5M9 20H4v-5m11 5h5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </ControlButton>
    </div>
  );
}
