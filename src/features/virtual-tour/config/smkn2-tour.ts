import { mediaAssetUrl } from "@/config/media-assets";
import type { TourConfig } from "@/features/virtual-tour/types/tour";

const ASSET_VERSION = "2026-10-02-panorama-v1";

function panoramaAsset(name: string) {
  return `${mediaAssetUrl(`/tours/smkn2/panoramas/${name}-v2.jpg` as `/${string}`)}?v=${ASSET_VERSION}`;
}

function mobilePanoramaAsset(name: string) {
  return `${mediaAssetUrl(`/tours/smkn2/panoramas/${name}-mobile-v2.jpg` as `/${string}`)}?v=${ASSET_VERSION}`;
}

function scene(id: string, title: string, description: string) {
  return {
    id,
    title,
    description,
    source: {
      type: "equirectangular" as const,
      src: panoramaAsset(id),
      width: 8192,
      height: 4096,
      fallback: { src: mobilePanoramaAsset(id), width: 4096, height: 2048 },
    },
    initialView: { yaw: 0, pitch: 0, fov: 1.35 },
    hotspots: [],
  };
}

export const smkn2Tour = {
  schemaVersion: 1,
  id: "smkn2",
  title: "Virtual Tour SMK Negeri 2 Surabaya",
  description: "Jelajahi lingkungan SMK Negeri 2 Surabaya melalui panorama 360 derajat.",
  initialSceneId: "ceremony-field",
  assetVersion: ASSET_VERSION,
  autorotate: {
    enabled: true,
    yawSpeed: 0.06,
    idleDelayMs: 5000,
  },
  scenes: [
    scene("ceremony-field", "Lapangan Upacara", "Area lapangan upacara SMK Negeri 2 Surabaya."),
    scene("outdoor-hall", "Outdoor Hall", "Area outdoor hall sekolah."),
    scene("gerbang-depan", "Gerbang Depan", "Pintu masuk utama sekolah."),
    scene("bengkel", "Bengkel Praktik", "Area bengkel praktik siswa."),
    scene("bengkel-toyota", "Bengkel Toyota", "Area praktik otomotif Toyota."),
    scene("bengkel-gtw", "Bengkel GTW", "Area praktik dan kerja siswa."),
    scene("kelas-rpl", "Kelas RPL", "Ruang praktik Rekayasa Perangkat Lunak."),
    scene("kelas-animasi", "Kelas Animasi", "Ruang praktik Animasi."),
    scene("perpustakaan", "Perpustakaan", "Ruang baca dan perpustakaan sekolah."),
    scene("kantin", "Kantin", "Area kantin sekolah."),
    scene("masjid", "Masjid", "Masjid dan area ibadah sekolah."),
    scene("taman-rpl", "Taman RPL", "Ruang terbuka di sekitar jurusan RPL."),
    scene("lapangan-basket", "Lapangan Basket", "Lapangan basket sekolah."),
    scene("lapangan-voli", "Lapangan Voli", "Lapangan voli sekolah."),
    scene("lapangan-belakang", "Lapangan Belakang", "Area lapangan belakang sekolah."),
    scene("parkir-kelas-11", "Parkir Kelas 11", "Area parkir dan akses kelas 11."),
  ],
} satisfies TourConfig;
