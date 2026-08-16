# Migrasi Fixture ke Virtual Tour SMKN 2 Surabaya

Framework saat ini memakai `homeTour` sebagai fixture teknis. Jangan mengubah
core viewer, adapter Marzipano, atau komponen UI ketika aset sekolah tersedia.
Migrasi cukup dilakukan melalui aset publik dan satu file config baru.

## 1. Siapkan aset terverifikasi

- Gunakan panorama equirectangular JPEG dengan rasio tepat 2:1.
- Pastikan sekolah memiliki izin penggunaan dan publikasi setiap aset.
- Hapus GPS dan metadata pribadi sebelum file masuk ke `public/`.
- Gunakan nama file stabil, huruf kecil, dan tanda hubung.
- Sediakan thumbnail terpisah bila menu scene membutuhkannya.
- Sediakan caption WebVTT untuk video yang memiliki dialog penting.

Struktur yang disarankan:

```text
public/tours/smkn2/
  panoramas/
  thumbnails/
  images/
  videos/
```

Jangan menyalin nama lokasi dari contoh di bawah sebagai fakta sekolah. ID,
judul, deskripsi, koordinat, dan arah perpindahan harus berasal dari hasil
survei atau materi resmi SMKN 2 Surabaya.

## 2. Buat config sekolah

Salin pola `config/home-tour.ts` ke `config/smkn2-tour.ts`, lalu ganti seluruh
fixture dengan data terverifikasi. Bentuk minimal satu scene:

```ts
import type { TourConfig } from "@/features/virtual-tour/types/tour";

export const smkn2Tour = {
  schemaVersion: 1,
  id: "smkn2",
  title: "Virtual Tour SMK Negeri 2 Surabaya",
  initialSceneId: "scene-id-terverifikasi",
  scenes: [
    {
      id: "scene-id-terverifikasi",
      title: "Nama lokasi terverifikasi",
      source: {
        type: "equirectangular",
        src: "/tours/smkn2/panoramas/nama-file.jpg",
        width: 8000,
        height: 4000,
      },
      initialView: { yaw: 0, pitch: 0, fov: 1.35 },
      hotspots: [],
    },
  ],
} satisfies TourConfig;
```

Jalankan Developer Mode untuk mengambil `yaw` dan `pitch` setiap hotspot:

```text
http://localhost:3000/virtual-tour?dev=true
```

## 3. Alihkan route ke config sekolah

Di `src/app/virtual-tour/page.tsx`, ganti import `homeTour` dengan `smkn2Tour`
dan berikan config baru itu ke `VirtualTourClient`. Ini menjadi satu-satunya
perubahan wiring yang dibutuhkan.

Pertahankan `robots.index: false` selama konten masih ditinjau. Aktifkan index
hanya setelah nama lokasi, teks, tautan, media, dan izin aset disetujui.

## 4. Validasi sebelum publikasi

Jalankan:

```powershell
npm run test:virtual-tour
npm run lint
npx tsc --noEmit
npm run build
```

Kemudian periksa secara manual pada desktop dan perangkat sentuh:

- scene pembuka, drag, pinch/zoom, dan fullscreen;
- semua target hotspot dan tombol kembali;
- menu scene, dialog, label hotspot, serta urutan fokus keyboard;
- `Escape`, tombol panah, `+`, `-`, dan `Home`;
- reduced motion dan pembesaran teks;
- pesan fallback ketika WebGL atau media gagal;
- tidak ada panorama, video, atau Marzipano yang dimuat di beranda;
- title, description, canonical, dan robots route sudah sesuai status rilis.

Jika jumlah scene atau ukuran aset meningkat signifikan, ukur Core Web Vitals
sebelum rilis. Multires adalah optimasi berikutnya; jangan memperluas schema
sebelum hasil pengukuran menunjukkan kebutuhan tersebut.

## Rollback

Untuk kembali ke fixture saat investigasi, pulihkan satu import dan prop config
di route. Aset dan config sekolah tetap terisolasi, sehingga rollback tidak
memerlukan perubahan pada engine atau komponen UI.
