import type { Hotspot, SceneConfig, TourConfig, TourImage, ViewState } from "@/features/virtual-tour/types/tour";

export type TourConfigIssue = {
  path: string;
  message: string;
};

export class TourConfigError extends Error {
  readonly issues: readonly TourConfigIssue[];

  constructor(issues: readonly TourConfigIssue[]) {
    super(`Virtual Tour Config Error:\n${issues.map((issue) => `- ${issue.path}: ${issue.message}`).join("\n")}`);
    this.name = "TourConfigError";
    this.issues = issues;
  }
}

function hasText(value: string) {
  return value.trim().length > 0;
}

function isPublicAssetPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") && !value.split("/").includes("..");
}

function isSafeLink(value: string) {
  if (isPublicAssetPath(value)) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function validateImage(image: TourImage, path: string, issues: TourConfigIssue[]) {
  if (!isPublicAssetPath(image.src)) issues.push({ path: `${path}.src`, message: "must be an absolute public asset path" });
  if (!hasText(image.alt)) issues.push({ path: `${path}.alt`, message: "must provide meaningful alternative text" });
}

function validateView(view: ViewState, path: string, issues: TourConfigIssue[]) {
  if (!Number.isFinite(view.yaw)) issues.push({ path: `${path}.yaw`, message: "must be a finite number in radians" });
  if (!Number.isFinite(view.pitch) || view.pitch < -Math.PI / 2 || view.pitch > Math.PI / 2) {
    issues.push({ path: `${path}.pitch`, message: "must be between -PI/2 and PI/2 radians" });
  }
  if (!Number.isFinite(view.fov) || view.fov <= 0 || view.fov >= Math.PI) {
    issues.push({ path: `${path}.fov`, message: "must be greater than 0 and less than PI radians" });
  }
}

function validateHotspot(hotspot: Hotspot, path: string, sceneIds: ReadonlySet<string>, issues: TourConfigIssue[]) {
  if (!hasText(hotspot.id)) issues.push({ path: `${path}.id`, message: "must not be empty" });
  if (!hasText(hotspot.label)) issues.push({ path: `${path}.label`, message: "must provide an accessible label" });
  if (!Number.isFinite(hotspot.yaw)) issues.push({ path: `${path}.yaw`, message: "must be a finite number in radians" });
  if (!Number.isFinite(hotspot.pitch) || hotspot.pitch < -Math.PI / 2 || hotspot.pitch > Math.PI / 2) {
    issues.push({ path: `${path}.pitch`, message: "must be between -PI/2 and PI/2 radians" });
  }

  switch (hotspot.type) {
    case "scene":
      if (!sceneIds.has(hotspot.targetSceneId)) {
        issues.push({ path: `${path}.targetSceneId`, message: `references unknown scene "${hotspot.targetSceneId}"` });
      }
      break;
    case "info":
      if (!hasText(hotspot.title)) issues.push({ path: `${path}.title`, message: "must not be empty" });
      if (!hasText(hotspot.description)) issues.push({ path: `${path}.description`, message: "must not be empty" });
      if (hotspot.image) validateImage(hotspot.image, `${path}.image`, issues);
      break;
    case "image":
      validateImage(hotspot.image, `${path}.image`, issues);
      break;
    case "video":
      if (!hasText(hotspot.title)) issues.push({ path: `${path}.title`, message: "must not be empty" });
      if (!isPublicAssetPath(hotspot.video.src)) {
        issues.push({ path: `${path}.video.src`, message: "must be an absolute public asset path for V1" });
      }
      if (hotspot.video.poster) validateImage(hotspot.video.poster, `${path}.video.poster`, issues);
      if (hotspot.video.captions) {
        if (!isPublicAssetPath(hotspot.video.captions.src)) {
          issues.push({ path: `${path}.video.captions.src`, message: "must be an absolute public asset path" });
        }
        if (!hasText(hotspot.video.captions.srcLang)) issues.push({ path: `${path}.video.captions.srcLang`, message: "must not be empty" });
        if (!hasText(hotspot.video.captions.label)) issues.push({ path: `${path}.video.captions.label`, message: "must not be empty" });
      }
      break;
    case "link":
      if (!isSafeLink(hotspot.href)) issues.push({ path: `${path}.href`, message: "must be an internal path or an HTTP(S) URL" });
      break;
  }
}

function validateScene(scene: SceneConfig, index: number, sceneIds: ReadonlySet<string>, issues: TourConfigIssue[]) {
  const path = `scenes[${index}]`;
  if (!hasText(scene.id)) issues.push({ path: `${path}.id`, message: "must not be empty" });
  if (!hasText(scene.title)) issues.push({ path: `${path}.title`, message: "must not be empty" });
  if (!isPublicAssetPath(scene.source.src)) issues.push({ path: `${path}.source.src`, message: "must be an absolute public asset path" });
  if (scene.source.width !== undefined && (!Number.isInteger(scene.source.width) || scene.source.width <= 0)) {
    issues.push({ path: `${path}.source.width`, message: "must be a positive integer" });
  }
  if (scene.source.height !== undefined && (!Number.isInteger(scene.source.height) || scene.source.height <= 0)) {
    issues.push({ path: `${path}.source.height`, message: "must be a positive integer" });
  }
  if (scene.source.width && scene.source.height && scene.source.width !== scene.source.height * 2) {
    issues.push({ path: `${path}.source`, message: "equirectangular panoramas must use a 2:1 aspect ratio" });
  }
  if (scene.initialView) validateView(scene.initialView, `${path}.initialView`, issues);
  if (scene.thumbnail) validateImage(scene.thumbnail, `${path}.thumbnail`, issues);

  const hotspotIds = new Set<string>();
  scene.hotspots.forEach((hotspot, hotspotIndex) => {
    const hotspotPath = `${path}.hotspots[${hotspotIndex}]`;
    if (hotspotIds.has(hotspot.id)) issues.push({ path: `${hotspotPath}.id`, message: `duplicates hotspot ID "${hotspot.id}" in this scene` });
    hotspotIds.add(hotspot.id);
    validateHotspot(hotspot, hotspotPath, sceneIds, issues);
  });
}

export function getTourConfigIssues(config: TourConfig): readonly TourConfigIssue[] {
  const issues: TourConfigIssue[] = [];

  if (config.schemaVersion !== 1) issues.push({ path: "schemaVersion", message: "must be 1" });
  if (!hasText(config.id)) issues.push({ path: "id", message: "must not be empty" });
  if (!hasText(config.title)) issues.push({ path: "title", message: "must not be empty" });
  if (config.scenes.length === 0) issues.push({ path: "scenes", message: "must contain at least one scene" });

  const sceneIds = new Set<string>();
  config.scenes.forEach((scene, index) => {
    if (sceneIds.has(scene.id)) issues.push({ path: `scenes[${index}].id`, message: `duplicates scene ID "${scene.id}"` });
    sceneIds.add(scene.id);
  });

  if (!sceneIds.has(config.initialSceneId)) {
    issues.push({ path: "initialSceneId", message: `references unknown scene "${config.initialSceneId}"` });
  }

  config.scenes.forEach((scene, index) => validateScene(scene, index, sceneIds, issues));

  if (config.autorotate?.yawSpeed !== undefined && !Number.isFinite(config.autorotate.yawSpeed)) {
    issues.push({ path: "autorotate.yawSpeed", message: "must be a finite number" });
  }
  if (config.autorotate?.idleDelayMs !== undefined && config.autorotate.idleDelayMs < 0) {
    issues.push({ path: "autorotate.idleDelayMs", message: "must be zero or greater" });
  }

  return issues;
}

export function assertValidTourConfig(config: TourConfig): TourConfig {
  const issues = getTourConfigIssues(config);
  if (issues.length > 0) throw new TourConfigError(issues);
  return config;
}
