import type { PanoramaEngine, SceneTransitionOptions } from "@/features/virtual-tour/engine/panorama-engine";
import type { SceneRegistry } from "@/features/virtual-tour/core/scene-registry";
import type { SceneConfig } from "@/features/virtual-tour/types/tour";

export class SceneManager {
  private readonly loadedSceneIds = new Set<string>();
  private readonly preparingScenes = new Map<string, Promise<SceneConfig>>();
  private currentSceneId: string | null = null;

  constructor(
    private readonly engine: PanoramaEngine,
    private readonly registry: SceneRegistry,
  ) {}

  async prepare(sceneId: string, signal?: AbortSignal): Promise<SceneConfig> {
    const scene = this.registry.get(sceneId);
    signal?.throwIfAborted();

    if (this.loadedSceneIds.has(sceneId)) return scene;

    let preparation = this.preparingScenes.get(sceneId);
    if (!preparation) {
      preparation = this.engine.createScene(scene, signal).then(() => {
        this.loadedSceneIds.add(sceneId);
        return scene;
      });
      this.preparingScenes.set(sceneId, preparation);
    }

    try {
      await preparation;
    } finally {
      if (this.preparingScenes.get(sceneId) === preparation) this.preparingScenes.delete(sceneId);
    }

    signal?.throwIfAborted();

    return scene;
  }

  async preloadLinkedScenes(sceneId: string, signal?: AbortSignal): Promise<void> {
    const scene = this.registry.get(sceneId);
    const targetIds = new Set<string>();
    scene.hotspots.forEach((hotspot) => {
      if (hotspot.type === "scene" && hotspot.targetSceneId !== sceneId) targetIds.add(hotspot.targetSceneId);
    });

    await Promise.all([...targetIds].map(async (targetId) => {
      try {
        await this.prepare(targetId, signal);
      } catch (error) {
        if (signal?.aborted) throw error;
      }
    }));
  }

  async switchTo(sceneId: string, signal?: AbortSignal, options?: SceneTransitionOptions): Promise<SceneConfig> {
    const scene = await this.prepare(sceneId, signal);

    signal?.throwIfAborted();
    await this.engine.switchScene(sceneId, signal, options);
    signal?.throwIfAborted();
    this.currentSceneId = sceneId;

    return scene;
  }

  getCurrentSceneId() {
    return this.currentSceneId;
  }

  isLoaded(sceneId: string) {
    return this.loadedSceneIds.has(sceneId);
  }
}
