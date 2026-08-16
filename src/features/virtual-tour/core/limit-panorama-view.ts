export const MIN_PANORAMA_FOV = 0.45;
export const MAX_PANORAMA_FOV = 2.05;

export function limitPanoramaView<T extends { fov: number; pitch: number }>(parameters: T): T {
  parameters.fov = Math.min(MAX_PANORAMA_FOV, Math.max(MIN_PANORAMA_FOV, parameters.fov));
  parameters.pitch = Math.min(Math.PI / 2, Math.max(-Math.PI / 2, parameters.pitch));
  return parameters;
}
