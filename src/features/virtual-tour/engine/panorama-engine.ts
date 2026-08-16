import type { AutorotateConfig, HotspotCoordinates, SceneConfig, ViewState } from "@/features/virtual-tour/types/tour";

export interface PanoramaEngine {
  initialize(container: HTMLElement): void;
  createScene(config: SceneConfig, signal?: AbortSignal): Promise<void>;
  switchScene(sceneId: string, signal?: AbortSignal, options?: SceneTransitionOptions): Promise<void>;
  getCurrentSceneId(): string | null;
  getCurrentView(): ViewState | null;
  setView(view: ViewState): void;
  animateView(view: ViewState, signal?: AbortSignal, options?: SceneTransitionOptions): Promise<void>;
  screenToCoordinates(point: { x: number; y: number }): HotspotCoordinates | null;
  mountHotspot(sceneId: string, coordinates: HotspotCoordinates): PanoramaHotspotMount;
  startAutorotate(config?: AutorotateConfig): void;
  stopAutorotate(): void;
  destroy(): void;
}

export type SceneTransitionOptions = {
  durationMs?: number;
};

export type PanoramaHotspotMount = {
  readonly element: HTMLElement;
  destroy(): void;
};
