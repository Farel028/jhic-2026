# Digital School Experience — SMK Negeri 2 Surabaya

Website sekolah berbasis Next.js App Router untuk SMK Negeri 2 Surabaya. Implementasi saat ini mencakup design foundation, application shell, SEO dasar, homepage, katalog jurusan, empat profil jurusan awal, halaman inti Tentang Sekolah, visualisasi kurikulum, galeri fasilitas, sambutan kepala sekolah, halaman Siswa, pusat Informasi, Dokumentasi dan Newsroom, serta pencarian global berbasis indeks konten statis.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Validasi produksi:

```bash
npm run lint
npm run build
```

## Environment

Salin `.env.example` menjadi `.env.local` bila canonical URL deployment berbeda.

```text
NEXT_PUBLIC_SITE_URL=https://web.smkn2sby.sch.id
```

## Struktur utama

- `src/app` — route, layout, metadata routes, dan error states.
- `src/components` — komponen UI, layout, navigation, homepage, dan SEO.
- `src/config` — identitas sekolah dan navigation config.
- `src/data` — structured data sementara sebelum integrasi CMS/database.

## Sumber konten dan aset

- Identitas/kontak: website SMK Negeri 2 Surabaya dan Referensi Data Kemendikdasmen.
- Logo `public/smkn2sby.png`: aset identitas sekolah yang diberikan untuk project.
- Foto kepala sekolah `public/images/school/kepala-sekolah.png`: olahan mirror dan background removal dari foto resmi yang diberikan; ornamen visual dibuat pada layer antarmuka.
- Foto pada `public/images/school`: dokumentasi asli dari artikel website sekolah; setiap penggunaan menampilkan tautan sumber.
- Prestasi pada ticker: artikel yang diterbitkan di website lama sekolah.
- Informasi SPMB: portal resmi SPMB Jawa Timur; jadwal yang ditampilkan saat ini merupakan arsip 2026 dan bukan jadwal periode berikutnya.
- Thumbnail video di `public/images/documentation`: thumbnail YouTube lokal dari video yang ditanam pada website resmi sekolah; halaman tidak memuat player sebelum pengguna memilih video.
- Kanal sosial: Instagram dan YouTube diverifikasi dari tautan website/e-learning sekolah. TikTok `@smknegeri2surabaya` ditambahkan berdasarkan konfirmasi identitas kanal dari pengguna project.

Foto sekolah yang tidak dapat diverifikasi belum digunakan. Jangan menambahkan data statistik, prestasi, atau identitas personal tanpa sumber dan persetujuan publikasi yang jelas.

pipeline stucked because collaborators