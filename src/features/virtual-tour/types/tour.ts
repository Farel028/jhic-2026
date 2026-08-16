export type ViewState = {
  yaw: number;
  pitch: number;
  fov: number;
};

export type HotspotCoordinates = Pick<ViewState, "yaw" | "pitch">;

export type EquirectangularSource = {
  type: "equirectangular";
  src: string;
  width?: number;
  height?: number;
};

export type SceneSource = EquirectangularSource;

export type TourImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type BaseHotspot = HotspotCoordinates & {
  id: string;
  label: string;
};

export type SceneHotspot = BaseHotspot & {
  type: "scene";
  targetSceneId: string;
};

export type InfoHotspot = BaseHotspot & {
  type: "info";
  title: string;
  description: string;
  image?: TourImage;
};

export type ImageHotspot = BaseHotspot & {
  type: "image";
  image: TourImage;
};

export type LocalVideoSource = {
  provider: "file";
  src: string;
  mimeType?: string;
  poster?: TourImage;
  captions?: {
    src: string;
    srcLang: string;
    label: string;
  };
};

export type VideoSource = LocalVideoSource;

export type VideoHotspot = BaseHotspot & {
  type: "video";
  title: string;
  video: VideoSource;
};

export type LinkHotspot = BaseHotspot & {
  type: "link";
  href: string;
  newTab?: boolean;
};

export type Hotspot =
  | SceneHotspot
  | InfoHotspot
  | ImageHotspot
  | VideoHotspot
  | LinkHotspot;

export type SceneConfig = {
  id: string;
  title: string;
  description?: string;
  source: SceneSource;
  initialView?: ViewState;
  thumbnail?: TourImage;
  hotspots: readonly Hotspot[];
};

export type AutorotateConfig = {
  enabled: boolean;
  yawSpeed?: number;
  idleDelayMs?: number;
};

export type TourConfig = {
  schemaVersion: 1;
  id: string;
  title: string;
  description?: string;
  initialSceneId: string;
  scenes: readonly SceneConfig[];
  autorotate?: AutorotateConfig;
};
