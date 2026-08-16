import type { EquirectangularAsset, EquirectangularSource } from "@/features/virtual-tour/types/tour";

export function selectPanoramaAsset(source: EquirectangularSource, textureWidthLimit: number): EquirectangularAsset {
  const primary: EquirectangularAsset = {
    src: source.src,
    width: source.width,
    height: source.height,
  };

  if (primary.width === undefined || primary.width <= textureWidthLimit) return primary;
  if (source.fallback?.width !== undefined && source.fallback.width <= textureWidthLimit) return source.fallback;

  throw new Error(`No panorama asset fits the device texture limit of ${textureWidthLimit}px.`);
}
