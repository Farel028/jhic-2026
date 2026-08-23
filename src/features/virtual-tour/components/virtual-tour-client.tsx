"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { HotspotDialog } from "@/features/virtual-tour/components/hotspot-dialog";
import { SceneMenu } from "@/features/virtual-tour/components/scene-menu";
import { TourControls } from "@/features/virtual-tour/components/tour-controls";
import { SceneManager } from "@/features/virtual-tour/core/scene-manager";
import { createSceneRegistry } from "@/features/virtual-tour/core/scene-registry";
import { MAX_PANORAMA_FOV, MIN_PANORAMA_FOV } from "@/features/virtual-tour/core/limit-panorama-view";
import type { PanoramaEngine } from "@/features/virtual-tour/engine/panorama-engine";
import type { HotspotInspectorProps } from "@/features/virtual-tour/devtools/hotspot-inspector";
import { HotspotLayer, type DialogHotspot, type MountedHotspot } from "@/features/virtual-tour/hotspots/hotspot-layer";
import type { HotspotCoordinates, SceneConfig, TourConfig } from "@/features/virtual-tour/types/tour";

type ViewerStatus = "loading" | "ready" | "error";

const DEFAULT_VIEW = { yaw: 0, pitch: 0, fov: 1.35 };

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function preloadLinkedScenes(manager: SceneManager, sceneId: string, signal: AbortSignal) {
  void manager.preloadLinkedScenes(sceneId, signal).catch((error) => {
    if (signal.aborted || isAbortError(error)) return;
    if (process.env.NODE_ENV === "development") console.warn(`Could not preload scenes linked from "${sceneId}".`, error);
  });
}

export function VirtualTourClient({ config }: { config: TourConfig }) {
  const tourRef = useRef<HTMLElement>(null);
  const sceneMenuButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<PanoramaEngine | null>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const hotspotMountsRef = useRef(new Map<string, MountedHotspot[]>());
  const lifecycleSignalRef = useRef<AbortSignal | null>(null);
  const switchingSceneRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const autorotateIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<ViewerStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [sceneError, setSceneError] = useState<{ sceneId: string; message: string } | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState(config.initialSceneId);
  const [pendingSceneId, setPendingSceneId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mountedHotspots, setMountedHotspots] = useState<MountedHotspot[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<DialogHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [autorotateEnabled, setAutorotateEnabled] = useState(config.autorotate?.enabled ?? false);
  const [autorotatePaused, setAutorotatePaused] = useState(false);
  const [controlError, setControlError] = useState("");
  const [HotspotInspectorComponent, setHotspotInspectorComponent] = useState<ComponentType<HotspotInspectorProps> | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [pickedCoordinates, setPickedCoordinates] = useState<HotspotCoordinates | null>(null);
  const [attempt, setAttempt] = useState(0);
  const registry = useMemo(() => createSceneRegistry(config), [config]);
  const currentScene = registry.scenes.get(currentSceneId) ?? registry.initialScene;
  const getCurrentView = useCallback(() => engineRef.current?.getCurrentView() ?? null, []);

  const closeSceneMenu = useCallback(() => {
    setIsMenuOpen(false);
    window.requestAnimationFrame(() => sceneMenuButtonRef.current?.focus());
  }, []);

  const clearAutorotateIdleTimer = useCallback(() => {
    if (autorotateIdleTimerRef.current === null) return;
    clearTimeout(autorotateIdleTimerRef.current);
    autorotateIdleTimerRef.current = null;
  }, []);

  const pauseAutorotateForInteraction = useCallback(() => {
    if (!autorotateEnabled || prefersReducedMotion) return;
    clearAutorotateIdleTimer();
    setAutorotatePaused(true);
    autorotateIdleTimerRef.current = setTimeout(() => {
      autorotateIdleTimerRef.current = null;
      setAutorotatePaused(false);
    }, config.autorotate?.idleDelayMs ?? 5000);
  }, [autorotateEnabled, clearAutorotateIdleTimer, config.autorotate?.idleDelayMs, prefersReducedMotion]);

  const mountSceneHotspots = useCallback((engine: PanoramaEngine, scene: SceneConfig) => {
    if (hotspotMountsRef.current.has(scene.id)) return;

    const records = scene.hotspots.map((hotspot) => ({
      key: `${scene.id}:${hotspot.id}`,
      hotspot,
      mount: engine.mountHotspot(scene.id, { yaw: hotspot.yaw, pitch: hotspot.pitch }),
    }));

    hotspotMountsRef.current.set(scene.id, records);
    setMountedHotspots((current) => [...current, ...records]);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const viewerContainer: HTMLElement = container;
    const abortController = new AbortController();
    const hotspotMounts = hotspotMountsRef.current;
    let engine: PanoramaEngine | null = null;
    let manager: SceneManager | null = null;
    let disposed = false;

    lifecycleSignalRef.current = abortController.signal;
    switchingSceneRef.current = true;
    setStatus("loading");
    setErrorMessage("");
    setSceneError(null);
    setActiveHotspot(null);
    setPickedCoordinates(null);
    setMountedHotspots([]);
    setCurrentSceneId(registry.initialScene.id);
    setPendingSceneId(registry.initialScene.id);

    async function initializeTour() {
      try {
        const { MarzipanoAdapter } = await import("@/features/virtual-tour/engine/marzipano-adapter");
        if (disposed) return;

        const initializedEngine: PanoramaEngine = new MarzipanoAdapter();
        engine = initializedEngine;
        engineRef.current = initializedEngine;
        initializedEngine.initialize(viewerContainer);
        manager = new SceneManager(initializedEngine, registry);
        sceneManagerRef.current = manager;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const scene = await manager.switchTo(registry.initialScene.id, abortController.signal, { durationMs: reduceMotion ? 0 : 350 });
        if (disposed) return;
        mountSceneHotspots(initializedEngine, scene);
        setCurrentSceneId(scene.id);
        setPendingSceneId(null);
        setStatus("ready");
        preloadLinkedScenes(manager, scene.id, abortController.signal);
      } catch (error) {
        if (disposed || isAbortError(error)) return;
        if (process.env.NODE_ENV === "development") console.error("Virtual Tour initialization failed", error);
        setPendingSceneId(null);
        setErrorMessage("Panorama tidak dapat dimuat. Pastikan aset tersedia dan browser mendukung WebGL.");
        setStatus("error");
      } finally {
        switchingSceneRef.current = false;
      }
    }

    void initializeTour();

    return () => {
      disposed = true;
      abortController.abort();
      switchingSceneRef.current = false;
      lifecycleSignalRef.current = null;
      if (sceneManagerRef.current === manager) sceneManagerRef.current = null;
      if (engineRef.current === engine) engineRef.current = null;
      hotspotMounts.forEach((records) => records.forEach(({ mount }) => mount.destroy()));
      hotspotMounts.clear();
      engine?.destroy();
    };
  }, [attempt, mountSceneHotspots, registry]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (new URLSearchParams(window.location.search).get("dev") !== "true") return;

    let active = true;
    void import("@/features/virtual-tour/devtools/hotspot-inspector").then(({ HotspotInspector }) => {
      if (!active) return;
      setHotspotInspectorComponent(() => HotspotInspector);
      setIsInspectorOpen(true);
    });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);
    handleMotionPreference();
    motionPreference.addEventListener("change", handleMotionPreference);
    return () => motionPreference.removeEventListener("change", handleMotionPreference);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(document.fullscreenElement === tourRef.current);
    setFullscreenSupported(document.fullscreenEnabled && typeof tourRef.current?.requestFullscreen === "function");
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const shouldRotate = status === "ready"
      && autorotateEnabled
      && !autorotatePaused
      && !prefersReducedMotion
      && pendingSceneId === null
      && !activeHotspot
      && !isMenuOpen;

    if (shouldRotate) engine.startAutorotate(config.autorotate);
    else engine.stopAutorotate();
  }, [activeHotspot, autorotateEnabled, autorotatePaused, config.autorotate, isMenuOpen, pendingSceneId, prefersReducedMotion, status]);

  useEffect(() => () => clearAutorotateIdleTimer(), [clearAutorotateIdleTimer]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSceneMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeSceneMenu, isMenuOpen]);

  async function switchScene(sceneId: string, departure?: HotspotCoordinates) {
    const manager = sceneManagerRef.current;
    const engine = engineRef.current;
    const signal = lifecycleSignalRef.current;
    if (!manager || !engine || !signal || switchingSceneRef.current || sceneId === currentSceneId) {
      if (sceneId === currentSceneId) closeSceneMenu();
      return;
    }

    switchingSceneRef.current = true;
    pauseAutorotateForInteraction();
    setActiveHotspot(null);
    if (isMenuOpen) closeSceneMenu();
    setPendingSceneId(sceneId);
    setSceneError(null);

    try {
      const scene = await manager.switchTo(sceneId, signal, { durationMs: prefersReducedMotion ? 0 : departure ? 360 : 350 });
      if (sceneManagerRef.current !== manager || signal.aborted) return;
      mountSceneHotspots(engine, scene);
      setCurrentSceneId(scene.id);
      setPickedCoordinates(null);
      preloadLinkedScenes(manager, scene.id, signal);
    } catch (error) {
      if (signal.aborted || isAbortError(error)) return;
      if (process.env.NODE_ENV === "development") console.error(`Failed to switch Virtual Tour scene to "${sceneId}"`, error);
      setSceneError({ sceneId, message: `Scene ${registry.get(sceneId).title} tidak dapat dimuat.` });
    } finally {
      if (sceneManagerRef.current === manager) {
        switchingSceneRef.current = false;
        setPendingSceneId(null);
      }
    }
  }

  function adjustZoom(delta: number) {
    const engine = engineRef.current;
    const view = engine?.getCurrentView();
    if (!engine || !view) return;
    pauseAutorotateForInteraction();
    engine.setView({ ...view, fov: Math.min(MAX_PANORAMA_FOV, Math.max(MIN_PANORAMA_FOV, view.fov + delta)) });
  }

  function recenterView() {
    const engine = engineRef.current;
    if (!engine) return;
    pauseAutorotateForInteraction();
    engine.setView(currentScene.initialView ?? DEFAULT_VIEW);
  }

  function toggleAutorotate() {
    clearAutorotateIdleTimer();
    setAutorotatePaused(false);
    setAutorotateEnabled((enabled) => !enabled);
  }

  async function toggleFullscreen() {
    const tour = tourRef.current;
    if (!tour || !fullscreenSupported) return;
    setControlError("");

    try {
      if (document.fullscreenElement === tour) await document.exitFullscreen();
      else await tour.requestFullscreen();
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error("Virtual Tour fullscreen request failed", error);
      setControlError("Mode layar penuh tidak dapat dibuka pada browser ini.");
    }
  }

  function handleViewerPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    pauseAutorotateForInteraction();
  }

  function handleViewerClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (!HotspotInspectorComponent || !isInspectorOpen) return;
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6) return;

    const engine = engineRef.current;
    if (!engine) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const coordinates = engine.screenToCoordinates({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    if (coordinates) setPickedCoordinates(coordinates);
  }

  function handleViewerKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      adjustZoom(-0.15);
      return;
    }
    if (event.key === "-") {
      event.preventDefault();
      adjustZoom(0.15);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      recenterView();
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

    const engine = engineRef.current;
    const view = engine?.getCurrentView();
    if (!engine || !view) return;
    event.preventDefault();
    pauseAutorotateForInteraction();

    const yawDelta = event.key === "ArrowLeft" ? -0.12 : event.key === "ArrowRight" ? 0.12 : 0;
    const pitchDelta = event.key === "ArrowUp" ? 0.08 : event.key === "ArrowDown" ? -0.08 : 0;
    engine.setView({
      ...view,
      yaw: view.yaw + yawDelta,
      pitch: Math.min(Math.PI / 2 - 0.01, Math.max(-Math.PI / 2 + 0.01, view.pitch + pitchDelta)),
    });
  }

  return (
    <section ref={tourRef} className="relative isolate min-h-dvh flex-1 overflow-hidden bg-ink-strong text-white" aria-labelledby="virtual-tour-title">
      <div
        ref={containerRef}
        role="region"
        aria-label={`Panorama 360 derajat: ${currentScene.title}`}
        aria-describedby="virtual-tour-keyboard-help"
        aria-busy={status === "loading" || pendingSceneId !== null}
        tabIndex={0}
        onPointerDown={handleViewerPointerDown}
        onClick={handleViewerClick}
        onKeyDown={handleViewerKeyDown}
        onWheel={pauseAutorotateForInteraction}
        className="absolute inset-0"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-ink-strong/75 to-transparent px-5 pb-16 pt-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-site items-center gap-3">
          <Link
            href="/"
            prefetch={false}
            aria-label="Kembali ke beranda"
            className="pointer-events-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-ink-strong/85 text-sm font-extrabold text-white transition-colors hover:bg-ink-strong sm:h-11 sm:w-auto sm:gap-2 sm:px-4"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Beranda</span>
          </Link>
          <h1 id="virtual-tour-title" className="min-w-0 flex-1 truncate text-xl font-black tracking-[-0.035em] sm:text-2xl">{currentScene.title}</h1>
          {status === "ready" ? (
            <button
              ref={sceneMenuButtonRef}
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="virtual-tour-scene-menu"
              aria-label={`Buka daftar scene (${config.scenes.length})`}
              title="Daftar scene"
              onClick={() => isMenuOpen ? closeSceneMenu() : setIsMenuOpen(true)}
              className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full border border-white/20 bg-ink-strong/55 text-white backdrop-blur-sm hover:bg-ink-strong"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="M9 7h10M9 12h10M9 17h7M5 7h.01M5 12h.01M5 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          ) : null}
        </div>
      </div>

      <p id="virtual-tour-keyboard-help" className="sr-only">Gunakan tombol panah untuk mengubah arah pandang, tombol plus dan minus untuk zoom, serta tombol Home untuk kembali ke arah awal.</p>
      <p className="sr-only" aria-live="polite">{pendingSceneId ? `Memuat scene ${registry.get(pendingSceneId).title}.` : status === "ready" ? `Scene ${currentScene.title} siap dilihat.` : ""}</p>

      {status === "ready" ? (
        <>
          <HotspotLayer
            hotspots={mountedHotspots}
            isSwitching={pendingSceneId !== null}
            onSceneSelect={(sceneId, departure) => void switchScene(sceneId, departure)}
            onDialogOpen={(hotspot) => { setIsMenuOpen(false); setActiveHotspot(hotspot); }}
          />
          <SceneMenu
            scenes={config.scenes}
            currentSceneId={currentSceneId}
            pendingSceneId={pendingSceneId}
            isOpen={isMenuOpen}
            onClose={closeSceneMenu}
            onSelect={(sceneId) => void switchScene(sceneId)}
          />
          {!isMenuOpen ? (
            <TourControls
              disabled={pendingSceneId !== null}
              fullscreenSupported={fullscreenSupported}
              isFullscreen={isFullscreen}
              showAutorotate={config.autorotate?.enabled === true}
              autorotateEnabled={autorotateEnabled && !prefersReducedMotion}
              autorotatePaused={autorotatePaused}
              autorotateUnavailable={prefersReducedMotion}
              onRecenter={recenterView}
              onFullscreenToggle={() => void toggleFullscreen()}
              onAutorotateToggle={toggleAutorotate}
            />
          ) : null}
        </>
      ) : null}

      {pendingSceneId && status === "ready" ? (
        <div className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-ink-strong/90 px-5 py-3 text-sm font-extrabold shadow-card backdrop-blur-md" role="status" aria-live="polite">
          Memuat {registry.get(pendingSceneId).title}...
        </div>
      ) : null}

      {sceneError ? (
        <div className="absolute bottom-20 left-1/2 z-30 flex w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-ink-strong/95 p-3 pl-5 text-sm shadow-card backdrop-blur-md" role="alert">
          <p className="min-w-0 flex-1 font-bold text-white/80">{sceneError.message}</p>
          <button type="button" onClick={() => void switchScene(sceneError.sceneId)} className="min-h-11 shrink-0 rounded-full bg-accent-strong px-4 font-extrabold text-ink-strong">Coba lagi</button>
          <button type="button" onClick={() => setSceneError(null)} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15" aria-label="Tutup pesan error">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>
      ) : null}

      {controlError ? (
        <div className="absolute bottom-36 left-1/2 z-30 flex w-[min(30rem,calc(100%-2rem))] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-ink-strong/95 p-3 pl-5 text-sm shadow-card backdrop-blur-md" role="alert">
          <p className="min-w-0 flex-1 font-bold text-white/80">{controlError}</p>
          <button type="button" onClick={() => setControlError("")} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15" aria-label="Tutup pesan error control">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>
      ) : null}

      {status !== "ready" ? (
        <div className="absolute inset-0 z-20 grid place-items-center bg-ink-strong px-5 text-center" aria-live="polite">
          {status === "loading" ? (
            <div role="status">
              <span aria-hidden="true" className="mx-auto block size-12 animate-pulse rounded-full border-4 border-secondary border-r-accent-strong" />
              <p className="mt-5 text-sm font-extrabold">Memuat panorama {registry.initialScene.title}...</p>
            </div>
          ) : (
            <div className="max-w-md rounded-[1.75rem] border border-white/15 bg-white/10 p-7 backdrop-blur-sm">
              <p className="text-2xl font-black">Panorama tidak dapat dimuat.</p>
              <p className="mt-3 text-sm leading-6 text-white/70">{errorMessage}</p>
              <button type="button" onClick={() => setAttempt((value) => value + 1)} className="mt-6 min-h-12 rounded-full bg-accent-strong px-6 text-sm font-extrabold text-ink-strong">Coba lagi</button>
            </div>
          )}
        </div>
      ) : null}

      <HotspotDialog hotspot={activeHotspot} onClose={() => setActiveHotspot(null)} />

      {HotspotInspectorComponent ? (
        isInspectorOpen ? (
          <HotspotInspectorComponent
            currentSceneId={currentSceneId}
            scenes={config.scenes}
            pickedCoordinates={pickedCoordinates}
            getCurrentView={getCurrentView}
            onClose={() => setIsInspectorOpen(false)}
          />
        ) : (
          <button type="button" onClick={() => setIsInspectorOpen(true)} className="absolute right-4 top-4 z-40 min-h-11 rounded-full border border-secondary/40 bg-[#071725]/95 px-4 font-mono text-xs font-black uppercase tracking-[0.12em] text-secondary shadow-card" aria-label="Buka Developer Mode">DEV</button>
        )
      ) : null}
    </section>
  );
}
