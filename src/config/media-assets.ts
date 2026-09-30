const mediaAssetOrigin = process.env.NEXT_PUBLIC_ASSET_ORIGIN?.replace(/\/+$/, "");

export function mediaAssetUrl(path: `/${string}`): string {
  return mediaAssetOrigin ? `${mediaAssetOrigin}${path}` : path;
}
