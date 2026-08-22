# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Website ini melayani seluruh pemangku kepentingan SMK Negeri 2 Surabaya tanpa menetapkan satu kelompok sebagai prioritas tunggal. Penggunanya mencakup calon siswa, orang tua atau wali, siswa aktif, alumni, tenaga pendidik dan kependidikan, mitra sekolah atau industri, serta masyarakat umum yang membutuhkan informasi tentang sekolah.

## Product Purpose

Website ini menggantikan website lama sebagai pintu digital resmi SMEKDA untuk mengenalkan sekolah dan program keahlian, membantu pengguna menemukan informasi sekolah, memperlihatkan kehidupan dan lingkungan belajar, serta mengarahkan calon siswa dan orang tua ke proses SPMB resmi. Keberhasilan produk berarti pengguna dapat memahami sekolah, menemukan informasi yang dibutuhkan, dan mencapai tujuan berikutnya tanpa kebingungan.

## Positioning

Website menyatukan profil sekolah berbasis sumber, eksplorasi 11 program keahlian, informasi siswa dan sekolah, pencarian global, chatbot Panda, serta pengalaman virtual tour 360 derajat dalam satu pengalaman digital SMEKDA. Ia bukan sekadar brosur sekolah atau kumpulan berita.

## Operating Context

Pengguna mengakses website melalui desktop maupun perangkat mobile untuk mengenal sekolah, membandingkan program keahlian, mencari informasi, melihat kegiatan dan karya siswa, menjelajahi lingkungan sekolah secara virtual, serta menuju kanal SPMB resmi. Konten utama menggunakan Bahasa Indonesia dan harus tetap mudah dipindai oleh pengguna dengan tingkat literasi digital yang beragam.

## Capabilities and Constraints

- Menyediakan homepage, profil dan informasi sekolah, 11 program keahlian, konten siswa, dokumentasi, informasi SPMB, pencarian global, chatbot Panda, serta virtual tour.
- Virtual tour menggunakan panorama 360 derajat SMKN 2 Surabaya dan dapat bergerak otomatis dengan penghormatan terhadap preferensi reduced motion.
- Chatbot menggunakan karakter Panda dengan animasi seragam yang berubah berdasarkan hari sekolah.
- Informasi SPMB harus mengarahkan pengguna ke sumber resmi dan tidak boleh menampilkan jadwal lama seolah masih berlaku.
- Statistik, prestasi, identitas personal, foto, dan klaim sekolah tidak boleh dibuat atau dipublikasikan tanpa sumber yang dapat ditelusuri dan persetujuan yang sesuai.
- Data terstruktur di dalam repo masih menjadi sumber sementara sebelum ada integrasi CMS atau database.
- Website ini merupakan pengganti website lama, bukan website pendamping. Antarmuka final tidak boleh mengarahkan pengguna ke website lama.
- Konten lama yang masih diperlukan harus diringkas atau dimigrasikan ke route website baru. Website lama hanya boleh digunakan sebagai referensi sumber selama proses migrasi, bukan sebagai tujuan navigasi pengguna.

## Brand Commitments

- Nama resmi: SMK Negeri 2 Surabaya.
- Nama singkat: SMKN 2 Surabaya.
- Identitas yang digunakan: SMEKDA.
- Tagline: "SMK Bisa, SMK Hebat, SMKN 2 SBY Smart Berkarakter".
- Logo dan dokumentasi sekolah yang tersedia harus diperlakukan sebagai aset identitas, bukan diganti dengan representasi generik.
- Pengalaman website harus terasa spesifik terhadap SMEKDA dan menghindari copy, pola antarmuka, serta dekorasi generik yang terasa seperti hasil AI tanpa konteks sekolah.

## Evidence on Hand

- Identitas, kontak, alamat, kanal resmi, NPSN, akreditasi, dan fakta sekolah tersimpan di `src/config/school.ts` dengan rujukan ke laman sekolah dan Referensi Data Kemendikdasmen.
- Logo sekolah tersedia di `public/smkn2sby.png`.
- Foto dan dokumentasi sekolah tersedia di `public/images/school` dan hanya digunakan ketika sumbernya dapat diverifikasi.
- Data program keahlian, informasi, dokumentasi, siswa, dan homepage tersedia sebagai data terstruktur di `src/data`.
- Panorama SMKN 2 Surabaya dan video pengantar virtual tour tersedia di `public/tours`.
- Tidak ada izin untuk mengarang statistik, prestasi, testimonial, atau klaim pembeda yang tidak didukung sumber.

## Product Principles

1. Utamakan informasi resmi, jelas, dan dapat ditelusuri sumbernya.
2. Bantu semua pengguna mencapai informasi atau tindakan yang mereka cari dengan cepat.
3. Tampilkan karakter nyata SMEKDA melalui aset, program, kegiatan, dan lingkungan sekolah yang autentik.
4. Gunakan teks seperlunya; setiap bagian harus memiliki fungsi yang jelas.
5. Pertahankan pengalaman yang responsif, ringan, dan siap digunakan dalam kondisi nyata.

## Accessibility & Inclusion

Pengalaman harus dapat digunakan pada desktop dan mobile, mendukung navigasi keyboard yang benar, menyediakan struktur dan label yang dapat dipahami teknologi bantu, menjaga keterbacaan di atas media, dan menghormati preferensi reduced motion pengguna.
