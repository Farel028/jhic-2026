import { assertValidTourConfig } from "@/features/virtual-tour/core/validate-tour-config";
import { withAssetVersion } from "@/features/virtual-tour/core/select-panorama-asset";
import type { SceneConfig, TourConfig } from "@/features/virtual-tour/types/tour";

export type SceneRegistry = {
  readonly initialScene: SceneConfig;
  readonly scenes: ReadonlyMap<string, SceneConfig>;
  get(sceneId: string): SceneConfig;
};

function withSceneVersion(scene: SceneConfig, assetVersion?: string): SceneConfig {
  if (!assetVersion) return scene;
  return {
    ...scene,
    source: {
      ...scene.source,
      src: withAssetVersion(scene.source.src, assetVersion),
      fallback: scene.source.fallback
        ? {
            ...scene.source.fallback,
            src: withAssetVersion(scene.source.fallback.src, assetVersion),
          }
        : undefined,
    },
  };
}

export function createSceneRegistry(config: TourConfig): SceneRegistry {
  assertValidTourConfig(config);
  const scenes = new Map(config.scenes.map((scene) => [scene.id, withSceneVersion(scene, config.assetVersion)]));
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
