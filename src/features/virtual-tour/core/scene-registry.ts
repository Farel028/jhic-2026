import { assertValidTourConfig } from "@/features/virtual-tour/core/validate-tour-config";
import type { SceneConfig, TourConfig } from "@/features/virtual-tour/types/tour";

export type SceneRegistry = {
  readonly initialScene: SceneConfig;
  readonly scenes: ReadonlyMap<string, SceneConfig>;
  get(sceneId: string): SceneConfig;
};

export function createSceneRegistry(config: TourConfig): SceneRegistry {
  assertValidTourConfig(config);
  const scenes = new Map(config.scenes.map((scene) => [scene.id, scene]));
  const initialScene = scenes.get(config.initialSceneId);

  if (!initialScene) {
    throw new Error(`Scene registry could not resolve initial scene "${config.initialSceneId}".`);
  }

  return {
    initialScene,
    scenes,
    get(sceneId) {
      const scene = scenes.get(sceneId);
      if (!scene) throw new Error(`Unknown virtual tour scene "${sceneId}".`);
      return scene;
    },
  };
}
