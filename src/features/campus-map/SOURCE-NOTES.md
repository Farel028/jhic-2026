# Peta sekolah: sumber, asumsi, dan verifikasi

## Sumber dan koordinat

- Gambar pengguna: `Screenshot 2026-09-12 090628.png`, disajikan oleh integrasi situs di `/images/school/denah-canva.png`.
- Penelusuran visual memakai salinan identik `clip_20260912_090644_2.png`, termasuk crop label kecil. Bukan dataset proyek lama.
- `src/data/campus-map.ts` menyimpan seluruh koordinat dalam piksel sumber 1333 × 595. `x,z` adalah kiri atas; `w,d` adalah lebar dan kedalaman pada gambar. Toleransi pengukuran visual beberapa piksel, bukan survei bangunan.
- Renderer memusatkan koordinat terhadap `(666.5, 297.5)`. Arah atas gambar bukan klaim arah utara.
- 54 record ruang/area, termasuk 4 taman, 3 gazebo, 2 kamar mandi dan 1 parkir. Total bukan jumlah ruang kelas.
- Lorong mengikuti segmen yang terlihat. Margin kosong tidak diisi gedung/jalan buatan.

## Label dan klasifikasi yang perlu diketahui

- Delapan sel baris atas kiri sama-sama tertulis **R. 08** pada sumber. ID internal `r08-1` hingga `r08-8` membedakannya, beserta posisi dari kiri. Tidak diganti dengan nomor urut kelas yang tidak ada di sumber.
- Dua blok **R. BK** tetap dipisah sebagai `bk-atas` dan `bk-bawah`.
- **Jurnal…** hanya terbaca sebagian. Nama lengkap belum dikonfirmasi.
- Blok biru antara Kepsek dan R. TU tidak memiliki label terbaca: **Blok tanpa label**, fungsi belum dikonfirmasi.
- **P. Guru** ditafsirkan sebagai parkir guru berdasarkan kategori pengguna; ekspansi label perlu konfirmasi sekolah.
- Sumber menulis **R. guru dpib**. Label literal dipertahankan, kategorinya fasilitas/staf karena fungsi guru. Kategori jurusan tetap **DBIP** sesuai ejaan yang diminta pengguna.
- Baris hijau muda sumber dikategorikan **RPL** berwarna turquoise sesuai koreksi pengguna, bukan warna sumber.
- **Lab Kimia** terbaca pada sudut kanan atas.
- Tidak ada kapasitas, jumlah pengguna, ukuran meter, atau inventaris fasilitas yang diciptakan.

## Model 3D ilustratif

- Tinggi bukan hasil pengukuran: ruang biasa 26 unit piksel-model, taman 2, parkir 3, gazebo 20, panggung 8, lantai Aula Luar 3.
- Aula Luar terbuka dengan tiang ilustratif, bukan balok dinding tertutup. Enam tiang adalah konstruksi visual, bukan klaim jumlah/posisi kolom riil.
- `hallRoof` mempunyai satu bidang atap dasar yang mencakup Panggung, Aula Luar dan Aula Dalam. Dua tingkat mahkota joglo di atas Aula Luar menyentuh tingkat sebelumnya; tidak ada celah antaratap.
- Tinggi, pitch, warna atap dan jumlah tiang tidak tersedia di denah. Struktur tersebut memenuhi arahan bentuk joglo tersambung, bukan rekonstruksi arsitektur terukur.
- Toggle Atap menyembunyikan kelompok atap/tiang dan menampilkan label aula. Mesh aula tetap dapat dipilih saat atap aktif.
- Kamar mandi memakai tekstur gradasi pink-biru sesuai pengguna; kategori lain memakai warna datar.

## Perilaku dan pengelolaan sumber daya

- Orthographic camera, tampak awal isometrik ringan `(250,850,700)`. Tampak atas mempertahankan orientasi sumber. Reset memusatkan seluruh denah.
- Fit viewport menghitung proyeksi delapan sudut batas denah dan tinggi model; `ResizeObserver` mengikuti desktop/mobile.
- Orbit/pan/zoom via OrbitControls, kontrol tombol alternatif, klik raycast, penyorotan dan daftar tombol keyboard.
- Filter menampilkan konteks nonhasil secara redup tetapi mengecualikannya dari klik. Search dan kategori beririsan. Mengubah filter membersihkan pilihan lama.
- Drag lebih dari 6 piksel tidak diperlakukan sebagai klik; pointer nonutama dan pembatalan gesture tidak memilih ruang.
- Render on demand tanpa loop animasi/damping. Gerak tidak otomatis; reduced-motion mematikan transform feedback CSS.
- Cleanup melepas observer/listener/controls, geometri, material, tekstur dan WebGL context saat unmount.
- Import renderer dinamis di client leaf. Loading, kegagalan WebGL dan context loss memiliki fallback gambar asli; daftar tetap berfungsi.

## Pemeriksaan yang benar-benar dijalankan

- TDD: test footprint Aula Luar merah lalu hijau; test search merah lalu hijau; test slab Aula Luar merah lalu hijau; test konfigurasi atap bersama merah lalu hijau.
- `npm.cmd run test:campus-map`: 7/7 (5 data/model, 2 integrasi milik parent).
- `npm.cmd run lint`: exit 0.
- `npx.cmd tsc --noEmit --pretty false`: exit 0.
- `npm.cmd run build`: exit 0, `/peta-sekolah` diprerender statis.
- `PLAYWRIGHT_MODULE='C:/Users/LENOVO/AppData/Local/Temp/jhic-map-qa/node_modules/playwright' node src/features/campus-map/browser-check.mjs`: HTTP 200, raycast R.08 posisi 4, drag-not-click, search/filter/empty, keyboard Enter, gambar asli, mobile 390 tanpa overflow, screenshot dark/reduced-motion, fallback WebGL awal; tidak ada pageerror.
- Screenshot terabaikan git: `artifacts/campus-map/desktop.png`, `mobile.png`, `dark-mobile.png`.
- Parent mempunyai suite penerimaan tambahan `tests/campus-map/browser-acceptance.mjs`.
- Script baseline `test:virtual-tour` merujuk berkas yang tidak ada dalam clone; tidak diklaim lulus.
- `npm audit --omit=dev` melaporkan masalah baseline Next 16.3.1 (critical) dan sharp <0.35.4 (high). Tidak meng-upgrade framework di luar lingkup peta; perlu ditangani sebelum deployment publik.
