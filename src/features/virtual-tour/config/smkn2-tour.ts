import type { TourConfig } from "@/features/virtual-tour/types/tour";

export const smkn2Tour = {
  schemaVersion: 1,
  id: "smkn2",
  title: "Virtual Tour SMKN 2 Surabaya",
  description: "Jelajahi lingkungan SMKN 2 Surabaya melalui panorama 360 derajat.",
  initialSceneId: "ceremony-field",
  autorotate: {
    enabled: true,
    yawSpeed: 0.5,
    idleDelayMs: 5000,
  },
  scenes: [
    {
      id: "ceremony-field",
      title: "Lapangan Upacara",
      description: "Panorama 360 derajat lapangan upacara SMKN 2 Surabaya.",
      source: {
        type: "equirectangular",
        src: "/tours/smkn2/panoramas/ceremony-field.jpg",
        width: 8192,
        height: 4096,
        fallback: {
          src: "/tours/smkn2/panoramas/ceremony-field-mobile.jpg",
          width: 4096,
          height: 2048,
        },
      },
      initialView: { yaw: 0, pitch: 0, fov: 1.35 },
      hotspots: [],
    },
    {
      id: "outdoor-hall",
      title: "Outdoor Hall",
      description: "Panorama 360 derajat area outdoor hall SMKN 2 Surabaya.",
      source: {
        type: "equirectangular",
        src: "/tours/smkn2/panoramas/outdoor-hall.jpg",
        width: 8192,
        height: 4096,
        fallback: {
          src: "/tours/smkn2/panoramas/outdoor-hall-mobile.jpg",
          width: 4096,
          height: 2048,
        },
      },
      initialView: { yaw: 0, pitch: 0, fov: 1.35 },
      hotspots: [],
    },
  ],
} satisfies TourConfig;
