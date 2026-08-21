# Panduan Foto Panorama ke `/virtual-tour`

Dokumen ini adalah panduan menambahkan dan memelihara panorama SMKN 2 Surabaya
yang tampil di `/virtual-tour`. Scope dokumen mengikuti framework yang sudah ada:
Marzipano, konfigurasi scene, pilihan aset desktop/mobile, hotspot, dan
Developer Mode.

Dokumen ini tidak mengubah kode aplikasi. Nama file, judul scene, koordinat, dan
path di bawah adalah contoh yang harus disesuaikan ketika aset final tersedia.

## Hasil akhir yang dituju

- `/virtual-tour` menampilkan panorama sekolah dari config `smkn2Tour`.
- Panorama dapat digeser dan di-zoom memakai mouse, keyboard, swipe, dan pinch.
- Desktop memakai panorama utama jika kemampuan GPU mencukupi.
- Perangkat dengan layar ringkas, pointer sentuh, atau memori terbatas memakai
  fallback maksimal 4096 x 2048 piksel.
- Jika ada beberapa lokasi, pengguna dapat berpindah scene melalui hotspot dan
  menu scene.
- Route lolos pemeriksaan desktop, HP asli, lint, test khusus virtual tour, dan
  production build.

## File yang terkait

```text
src/app/virtual-tour/page.tsx
src/features/virtual-tour/config/smkn2-tour.ts
src/features/virtual-tour/types/tour.ts
src/features/virtual-tour/devtools/hotspot-inspector.tsx
src/config/navigation.ts
src/app/sitemap.ts
public/tours/
```

`smkn2-tour.ts` adalah satu-satunya config tour publik. Tambahkan scene sekolah
di file tersebut tanpa mengubah core viewer.

## 1. Pastikan foto sumber memang panorama 360

Foto yang siap dipakai harus berupa **equirectangular 360 x 180 derajat** dengan
rasio **tepat 2:1**, misalnya:

- 8192 x 4096;
- 6000 x 3000; atau
- 4096 x 2048.

Foto biasa dari kamera/HP, foto ultra-wide, atau dua lingkaran fisheye belum bisa
langsung dimasukkan ke viewer. Foto tersebut harus di-stitch dan diekspor lebih
dahulu dari aplikasi kamera 360 atau aplikasi stitching menjadi equirectangular.

Checklist sebelum lanjut:

- sambungan kiri dan kanan menyatu tanpa garis patah;
- horizon lurus;
- bagian atas dan bawah tidak berlubang;
- wajah, plat nomor, layar komputer, dan data pribadi sudah diperiksa;
- izin publikasi lokasi dan orang di dalam foto sudah tersedia;
- file menggunakan orientasi final, bukan mengandalkan metadata rotasi EXIF.

Viewer akan menolak gambar yang dimuat jika ukuran aktualnya bukan 2:1 atau tidak
sama dengan ukuran yang dicatat di config.

## 2. Siapkan versi desktop dan mobile

Untuk setiap scene, siapkan:

| Varian | Rekomendasi awal | Fungsi |
| --- | ---: | --- |
| Utama | 8192 x 4096 JPEG | Detail lebih tinggi pada desktop/GPU yang mendukung |
| Fallback | 4096 x 2048 JPEG | Decode dan upload tekstur yang lebih aman untuk HP |

Angka tersebut adalah titik awal, bukan kewajiban kualitas. Jangan melakukan
upscale pada foto yang sumbernya lebih kecil. Jika panorama utama sudah 4096 x
2048 atau lebih kecil, satu file dapat dipakai tanpa `fallback`.

Jika panorama utama lebih lebar dari 4096 piksel, fallback 4096 x 2048 perlu
disediakan. Engine saat ini membatasi perangkat berlayar ringkas, pointer sentuh,
atau memori rendah ke tekstur selebar 4096 piksel. Perangkat desktop juga bisa
memakai fallback jika batas tekstur WebGL-nya lebih kecil dari panorama utama.

Gunakan JPEG sRGB dan kompres secukupnya. Periksa teks, wajah, serta detail
penting pada zoom normal; ukuran file sekecil mungkin tidak boleh mengorbankan
sambungan panorama. Aset `outdoor-hall` saat ini dapat dijadikan pembanding:
file utama sekitar 5,27 MiB dan fallback sekitar 1,44 MiB.

Contoh penamaan:

```text
gerbang-utama.jpg
gerbang-utama-mobile.jpg
bengkel-otomotif.jpg
bengkel-otomotif-mobile.jpg
```

Gunakan huruf kecil dan tanda hubung. Hindari spasi, tanda kurung, atau nama
seperti `final-baru-revisi-2.jpg`.

## 3. Letakkan aset di folder public tour

Buat struktur khusus tour sekolah:

```text
public/tours/smkn2/
  panoramas/
    gerbang-utama.jpg
    gerbang-utama-mobile.jpg
    bengkel-otomotif.jpg
    bengkel-otomotif-mobile.jpg
  thumbnails/
  images/
  videos/
```

- `panoramas/` berisi panorama utama dan fallback.
- `thumbnails/` bersifat opsional untuk gambar menu scene.
- `images/` digunakan oleh hotspot gambar atau gambar pada dialog info.
- `videos/` digunakan oleh hotspot video lokal.

File di dalam `public` dipanggil tanpa kata `public`. Contoh path yang benar di
config adalah `/tours/smkn2/panoramas/gerbang-utama.jpg`.

## 4. Catat ukuran aktual setiap file

Jangan menebak `width` dan `height`. Di Windows PowerShell, ukuran JPEG dapat
diperiksa dengan:

```powershell
Add-Type -AssemblyName System.Drawing
$tourImage = [System.Drawing.Image]::FromFile("public/tours/smkn2/panoramas/gerbang-utama.jpg")
"$($tourImage.Width)x$($tourImage.Height)"
$tourImage.Dispose()
```

Pastikan hasilnya tepat 2:1. Ulangi untuk versi mobile dan semua scene.

## 5. Buat config tour sekolah

Gunakan dan perbarui:

```text
src/features/virtual-tour/config/smkn2-tour.ts
```

Gunakan bentuk config yang sudah didukung oleh `TourConfig`:

```ts
import type { TourConfig } from "@/features/virtual-tour/types/tour";

export const smkn2Tour = {
  schemaVersion: 1,
  id: "smkn2",
  title: "Virtual Tour SMKN 2 Surabaya",
  description: "Jelajahi lingkungan SMKN 2 Surabaya dalam panorama 360 derajat.",
  initialSceneId: "gerbang-utama",
  autorotate: {
    enabled: false,
    yawSpeed: 0.06,
    idleDelayMs: 5000,
  },
  scenes: [
    {
      id: "gerbang-utama",
      title: "Gerbang Utama",
      description: "Area masuk SMKN 2 Surabaya.",
      source: {
        type: "equirectangular",
        src: "/tours/smkn2/panoramas/gerbang-utama.jpg",
        width: 8192,
        height: 4096,
        fallback: {
          src: "/tours/smkn2/panoramas/gerbang-utama-mobile.jpg",
          width: 4096,
          height: 2048,
        },
      },
      initialView: { yaw: 0, pitch: 0, fov: 1.35 },
      hotspots: [],
    },
  ],
} satisfies TourConfig;
```

Ganti semua ukuran contoh dengan ukuran aktual. Setiap `id` scene dan hotspot
harus unik. `initialSceneId` harus sama persis dengan salah satu `scene.id`.

Mulai dari satu scene tanpa hotspot. Pastikan panorama berhasil tampil di
desktop dan HP sebelum menambahkan scene atau fitur lain.

## 6. Hubungkan config ke `/virtual-tour`

Setelah satu scene lulus pemeriksaan, ganti config yang dipakai oleh:

```text
src/app/virtual-tour/page.tsx
```

Pastikan `VirtualTourClient` menerima `smkn2Tour`. Tetap lewat
`assertValidTourConfig` agar kesalahan ID, path, nilai view, atau target hotspot
gagal lebih awal.

Gunakan metadata publik sekolah pada route, bukan judul atau deskripsi fixture
development.

## 7. Tentukan arah pandang awal

Jalankan development server dari root project:

```powershell
npm.cmd run dev
```

Buka:

```text
http://localhost:3000/virtual-tour?dev=true
```

Developer Mode hanya aktif pada `next dev`; query `?dev=true` tidak membuka
inspector pada production build.

Untuk setiap scene:

1. Arahkan panorama ke komposisi pembuka yang diinginkan.
2. Catat nilai live `yaw`, `pitch`, dan `fov` dari inspector.
3. Salin nilai tersebut ke `initialView` scene.
4. Muat ulang route dan pastikan arah pembuka sudah benar.

Patokan awal `fov: 1.35` aman untuk evaluasi. Hindari zoom pembuka terlalu dekat
karena viewport portrait pada HP lebih sempit daripada desktop.

## 8. Tambahkan scene berikutnya satu per satu

Tambahkan satu object baru ke `scenes` untuk setiap lokasi. Contoh lokasi yang
bisa dipertimbangkan setelah asetnya tersedia dan disetujui:

- gerbang utama;
- lobi atau lapangan;
- bengkel per jurusan;
- perpustakaan;
- ruang praktik; dan
- fasilitas publik lain.

Jangan memasukkan ruang terbatas, data siswa, papan informasi sensitif, atau
area yang tidak disetujui untuk publikasi.

Setelah menambahkan scene, cek scene tersebut melalui menu scene sebelum
membuat hotspot penghubung.

## 9. Tambahkan hotspot penghubung

Di Developer Mode, buka scene asal lalu:

1. Klik singkat titik tempat panah akan dipasang; drag tidak dihitung sebagai
   pemilihan koordinat.
2. Pilih tipe `scene` di bagian **Add Hotspot**.
3. Isi ID, label, dan target scene.
4. Klik **Copy Config**.
5. Tempel snippet ke array `hotspots` milik scene asal.

Contoh:

```ts
{
  id: "gerbang-ke-lobi",
  type: "scene",
  targetSceneId: "lobi",
  yaw: 1.426,
  pitch: -0.087,
  label: "Menuju lobi",
},
```

`targetSceneId` harus sama persis dengan `id` scene tujuan. Jika pengguna perlu
kembali, tambahkan hotspot balik pada scene tujuan; hubungan scene tidak dibuat
otomatis.

Tipe hotspot yang sudah didukung:

- `scene` untuk pindah panorama;
- `info` untuk dialog teks dan gambar opsional;
- `image` untuk membuka gambar;
- `video` untuk video lokal; dan
- `link` untuk path internal atau URL HTTP(S).

Tambahkan hotspot sedikit demi sedikit dan uji setelah setiap penambahan agar
koordinat atau target yang salah mudah dilacak.

## 10. Uji di desktop

Buka `/virtual-tour` tanpa query Developer Mode dan periksa:

- panorama awal tampil tanpa layar hitam atau distorsi;
- drag mouse mengubah arah pandang;
- wheel, tombol `+`/`-`, dan pinch pada trackpad mengubah zoom;
- tombol panah mengubah yaw/pitch dan `Home` mengembalikan `initialView`;
- semua item menu scene membuka scene yang benar;
- semua hotspot berada di objek/lokasi yang benar;
- perpindahan scene tidak meninggalkan loading permanen;
- recenter dan fullscreen bekerja bila didukung browser;
- dialog dapat dibuka, ditutup, dan dikendalikan dengan keyboard;
- tidak ada error asset 404 atau error WebGL di console; dan
- tab Network menunjukkan file panorama yang ukurannya sesuai kemampuan device.

Uji minimal pada lebar desktop besar dan viewport laptop sempit.

## 11. Uji di HP asli

Emulasi viewport browser membantu memeriksa layout, tetapi tidak sepenuhnya
mewakili batas memori, decoder gambar, sentuhan, dan tekstur WebGL HP. Karena itu
tetap lakukan pengujian pada perangkat fisik.

Untuk membuka development server dari HP dalam jaringan Wi-Fi yang sama:

```powershell
npm.cmd run dev -- --hostname 0.0.0.0
ipconfig
```

Ambil alamat IPv4 komputer, lalu buka dari HP:

```text
http://<IPv4-komputer>:3000/virtual-tour
```

Jika tidak dapat dibuka, periksa profil jaringan Windows, izin firewall untuk
Node.js, dan pastikan HP tidak berada di guest network yang mengisolasi client.

Checklist HP:

- uji minimal satu Android dan satu iPhone/iPad bila tersedia;
- uji portrait dan landscape;
- swipe memutar panorama tanpa membuat halaman tersangkut;
- pinch zoom stabil;
- kontrol tidak bertumpuk dengan menu, notch, atau browser toolbar;
- scene dan dialog dapat dipilih dengan tap;
- file `*-mobile.jpg` terlihat di Network ketika perangkat masuk kategori
  fallback;
- perpindahan scene tidak menutup browser karena tekanan memori;
- teks dan target sentuh tetap terbaca; dan
- fallback error serta tombol coba lagi dapat dipakai.

Fullscreen tidak selalu tersedia atau berperilaku sama pada semua browser
mobile. Ketiadaan tombol fullscreen pada browser yang tidak mendukung bukan
berarti panorama gagal.

## 12. Jalankan validasi project

Setelah config dan aset final masuk, jalankan dari PowerShell:

```powershell
npm.cmd run test:virtual-tour
npm.cmd run lint
npm.cmd run build
```

Yang dicakup test khusus antara lain validasi config, pemilihan fallback aset,
batas view, dan scene manager. Test unit tidak membuktikan bahwa file panorama
benar-benar ada atau dapat di-decode di semua HP; pemeriksaan browser tetap
wajib.

Setelah build berhasil, jalankan mode production lokal bila diperlukan:

```powershell
npm.cmd run start
```

Lalu ulangi smoke test di `http://localhost:3000/virtual-tour`.

## 13. Siapkan route untuk publikasi

Sebelum deploy, selesaikan hal berikut:

1. Tinjau kembali title, description, dan Open Graph sebelum publikasi final.
2. Hapus status `noindex` hanya setelah konten dan izin publikasi sudah final.
3. Tambahkan `/virtual-tour` ke sitemap bila halaman boleh diindeks.
4. Tambahkan tautan ke navigasi atau entry point lain yang disepakati; route
   saat ini belum ada di navigasi utama/footer.
5. Pastikan semua nama ruang dan deskripsi faktual serta telah disetujui.
6. Jalankan lagi test, lint, build, dan QA perangkat fisik setelah deploy.

## Troubleshooting cepat

### Muncul pesan panorama tidak dapat dimuat

Periksa path asset, respons 404 di Network, dukungan WebGL, rasio gambar, ukuran
aktual, dan angka `width`/`height` di config.

### Desktop malah memakai gambar mobile

Ini dapat terjadi bila lebar panorama utama melebihi `MAX_TEXTURE_SIZE` GPU,
atau perangkat terdeteksi memiliki layar ringkas, pointer coarse, atau memori
terbatas. Itu adalah fallback yang disengaja.

### HP gagal tetapi desktop berhasil

Pastikan fallback tersedia, lebarnya tidak lebih dari 4096 piksel, rasionya 2:1,
dan ukurannya dicatat dengan benar. Periksa juga memori browser serta total scene
yang dipersiapkan dari scene aktif.

### Hotspot muncul di posisi yang salah

Ambil ulang `yaw` dan `pitch` dari scene yang benar menggunakan `?dev=true`.
Koordinat tidak dapat dipindahkan begitu saja antar-panorama.

### Hotspot tidak bisa pindah scene

Pastikan `targetSceneId` sama persis dengan `scene.id`, tidak ada ID duplikat,
dan file panorama scene tujuan tersedia.

## Definition of done

Implementasi panorama dianggap selesai jika:

- aset final telah disetujui dan bebas data sensitif;
- semua panorama tepat 2:1 dan ukuran config cocok dengan ukuran file;
- route memakai config sekolah dan metadata bukan lagi fixture development;
- desktop serta HP memuat varian aset yang sesuai;
- semua scene, hotspot, kontrol, keyboard, swipe, dan pinch berfungsi;
- tidak ada 404 asset, error config, atau error WebGL pada device target;
- test virtual tour, lint, dan production build lulus;
- `/virtual-tour` dapat ditemukan dari entry point yang disepakati; dan
- QA di deployment final sudah dilakukan, bukan hanya di localhost.
