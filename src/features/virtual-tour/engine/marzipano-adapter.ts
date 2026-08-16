import Marzipano from "marzipano";
import type { PanoramaEngine, PanoramaHotspotMount, SceneTransitionOptions } from "@/features/virtual-tour/engine/panorama-engine";
import type { AutorotateConfig, HotspotCoordinates, SceneConfig, ViewState } from "@/features/virtual-tour/types/tour";

const DEFAULT_VIEW: ViewState = { yaw: 0, pitch: 0, fov: 1.35 };

function createAbortError() {
  return new DOMException("Panorama loading was cancelled.", "AbortError");
}

function loadImageDimensions(src: string, signal?: AbortSignal) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();

    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
      signal?.removeEventListener("abort", handleAbort);
    };
    const handleAbort = () => {
      cleanup();
      image.src = "";
      reject(createAbortError());
    };

    image.decoding = "async";
    image.onload = () => {
      cleanup();
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      cleanup();
      reject(new Error(`Panorama asset could not be loaded: ${src}`));
    };

    if (signal?.aborted) {
      handleAbort();
      return;
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
    image.src = src;
  });
}

export class MarzipanoAdapter implements PanoramaEngine {
  private container: HTMLElement | null = null;
  private viewer: Marzipano.Viewer | null = null;
  private readonly scenes = new Map<string, Marzipano.Scene>();
  private currentSceneId: string | null = null;
  private destroyed = false;

  initialize(container: HTMLElement) {
    if (this.viewer) throw new Error("MarzipanoAdapter has already been initialized.");
    this.container = container;
    this.destroyed = false;
    this.viewer = new Marzipano.Viewer(container, { controls: { mouseViewMode: "drag" } });
  }

  async createScene(config: SceneConfig, signal?: AbortSignal) {
    const viewer = this.requireViewer();
    if (this.scenes.has(config.id)) throw new Error(`Scene "${config.id}" has already been created.`);

    const dimensions = await loadImageDimensions(config.source.src, signal);
    if (this.destroyed || signal?.aborted) throw createAbortError();
    if (dimensions.width !== dimensions.height * 2) {
      throw new Error(`Panorama "${config.id}" must use a 2:1 equirectangular aspect ratio.`);
    }

    const source = Marzipano.ImageUrlSource.fromString(config.source.src);
    const geometry = new Marzipano.EquirectGeometry([{ width: dimensions.width }]);
    const initialView = config.initialView ?? DEFAULT_VIEW;
    const faceResolution = Math.max(512, Math.round(dimensions.width / 4));
    const limiter = Marzipano.RectilinearView.limit.traditional(faceResolution, (120 * Math.PI) / 180);
    const view = new Marzipano.RectilinearView(initialView, limiter);
    const scene = viewer.createScene({ source, geometry, view, pinFirstLevel: true });

    this.scenes.set(config.id, scene);
  }

  async switchScene(sceneId: string, signal?: AbortSignal, options?: SceneTransitionOptions) {
    const scene = this.scenes.get(sceneId);
    if (!scene) throw new Error(`Scene "${sceneId}" has not been created.`);
    signal?.throwIfAborted();

    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const finish = (callback: () => void) => {
        if (settled) return;
        settled = true;
        signal?.removeEventListener("abort", handleAbort);
        callback();
      };
      const handleAbort = () => finish(() => reject(signal?.reason ?? createAbortError()));

      signal?.addEventListener("abort", handleAbort, { once: true });
      scene.switchTo({ transitionDuration: options?.durationMs ?? 350 }, () => finish(resolve));
    });
    this.currentSceneId = sceneId;
  }

  getCurrentSceneId() {
    return this.currentSceneId;
  }

  getCurrentView(): ViewState | null {
    const scene = this.currentSceneId ? this.scenes.get(this.currentSceneId) : null;
    if (!scene) return null;
    const view = scene.view();
    return { yaw: view.yaw(), pitch: view.pitch(), fov: view.fov() };
  }

  setView(viewState: ViewState) {
    const scene = this.currentSceneId ? this.scenes.get(this.currentSceneId) : null;
    if (!scene) return;
    scene.view().setParameters(viewState);
  }

  async animateView(viewState: ViewState, signal?: AbortSignal, options?: SceneTransitionOptions) {
    const scene = this.currentSceneId ? this.scenes.get(this.currentSceneId) : null;
    if (!scene) return;
    signal?.throwIfAborted();

    const durationMs = options?.durationMs ?? 400;
    if (durationMs <= 0) {
      scene.view().setParameters(viewState);
      return;
    }

    const viewer = this.requireViewer();
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const finish = (callback: () => void) => {
        if (settled) return;
        settled = true;
        signal?.removeEventListener("abort", handleAbort);
        callback();
      };
      const handleAbort = () => finish(() => {
        viewer.stopMovement();
        reject(signal?.reason ?? createAbortError());
      });

      signal?.addEventListener("abort", handleAbort, { once: true });
      scene.lookTo(viewState, { transitionDuration: durationMs, controlsInterrupt: false }, () => finish(resolve));
    });
  }

  screenToCoordinates(point: { x: number; y: number }): HotspotCoordinates | null {
    const scene = this.currentSceneId ? this.scenes.get(this.currentSceneId) : null;
    return scene?.view().screenToCoordinates(point) ?? null;
  }

  mountHotspot(sceneId: string, coordinates: HotspotCoordinates): PanoramaHotspotMount {
    const scene = this.scenes.get(sceneId);
    if (!scene) throw new Error(`Cannot mount hotspot because scene "${sceneId}" has not been created.`);

    const element = document.createElement("div");
    const container = scene.hotspotContainer();
    const hotspot = container.createHotspot(element, coordinates);
    let destroyed = false;

    return {
      element,
      destroy() {
        if (destroyed) return;
        destroyed = true;
        if (container.hasHotspot(hotspot)) container.destroyHotspot(hotspot);
      },
    };
  }

  startAutorotate(config?: AutorotateConfig) {
    const viewer = this.requireViewer();
    viewer.startMovement(Marzipano.autorotate({
      yawSpeed: config?.yawSpeed ?? 0.06,
      targetPitch: 0,
      targetFov: this.getCurrentView()?.fov ?? DEFAULT_VIEW.fov,
    }));
  }

  stopAutorotate() {
    this.viewer?.stopMovement();
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.currentSceneId = null;
    this.scenes.clear();
    this.viewer?.destroy();
    this.viewer = null;
    this.container?.replaceChildren();
    this.container = null;
  }

  private requireViewer() {
    if (!this.viewer || this.destroyed) throw new Error("MarzipanoAdapter is not initialized.");
    return this.viewer;
  }
}
