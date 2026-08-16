import type { TourConfig } from "@/features/virtual-tour/types/tour";

export const homeTour = {
  schemaVersion: 1,
  id: "home",
  title: "Virtual Tour Rumah",
  description: "Fixture pengembangan menggunakan panorama rumah asli sebelum framework dipindahkan ke aset sekolah.",
  initialSceneId: "kitchen",
  autorotate: {
    enabled: false,
    yawSpeed: 0.06,
    idleDelayMs: 5000,
  },
  scenes: [
    {
      id: "kitchen",
      title: "Dapur",
      description: "Panorama dapur sebagai scene awal untuk menguji rendering equirectangular, drag, zoom, dan lifecycle viewer.",
      source: {
        type: "equirectangular",
        src: "/tours/home/panoramas/kitchen.jpg",
        width: 8704,
        height: 4352,
        fallback: {
          src: "/tours/home/panoramas/kitchen-mobile.jpg",
          width: 4096,
          height: 2048,
        },
      },
      initialView: { yaw: 0, pitch: 0, fov: 1.35 },
      hotspots: [
        {
          id: "to-bedroom",
          type: "scene",
          targetSceneId: "bedroom",
          yaw: -3.075,
          pitch: 0.562,
          label: "Menuju kamar",
        },
        {
          id: "kitchen-info",
          type: "info",
          yaw: -1.476,
          pitch: 0.070,
          label: "Kamar Mandi",
          title: "Kamar MandiF",
          description: "Tempat membasuh dan mengolah ide.",
        },
        {
          id: "kitchen-image",
          type: "image",
          yaw: 1.75,
          pitch: 0.03,
          label: "Buka contoh gambar",
          image: {
            src: "/tours/home/panoramas/kitchen-mobile.jpg",
            alt: "Panorama dapur pada fixture pengembangan virtual tour",
            caption: "Contoh image hotspot menggunakan aset rumah yang benar-benar tersedia.",
          },
        },
      ],
    },
    {
      id: "bedroom",
      title: "Kamar",
      description: "Panorama kedua untuk membuktikan perpindahan scene, lazy loading, dan pembuatan hotspot saat scene pertama kali dibuka.",
      source: {
        type: "equirectangular",
        src: "/tours/home/panoramas/bedroom.jpg",
        width: 8704,
        height: 4352,
        fallback: {
          src: "/tours/home/panoramas/bedroom-mobile.jpg",
          width: 4096,
          height: 2048,
        },
      },
      initialView: { yaw: 0, pitch: 0, fov: 1.35 },
      hotspots: [
        {
          id: "to-kitchen",
          type: "scene",
          targetSceneId: "kitchen",
          yaw: -2.868,
          pitch: 0.653,
          label: "Kembali ke dapur",
        },
        {
          id: "bedroom-info",
          type: "info",
          yaw: 0.55,
          pitch: 0,
          label: "Pintu",
          title: "Pintu",
          description: "Pintu ini adalah awal permulaan.",
        },
      ],
    },
  ],
} satisfies TourConfig;
