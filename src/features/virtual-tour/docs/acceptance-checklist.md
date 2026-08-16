# Virtual Tour V1 Acceptance Checklist

## Terverifikasi otomatis

- [x] Route `/virtual-tour` dibangun sebagai route terpisah.
- [x] Marzipano hanya diimpor oleh adapter dan tidak masuk jalur render server.
- [x] Config divalidasi sebelum viewer dibuat.
- [x] Scene target langsung dipersiapkan one-hop; hotspot dipasang saat scene dikunjungi.
- [x] Lima tipe hotspot tersedia: scene, info, image, video, dan link.
- [x] Zoom, recenter, autorotate, fullscreen, dan scene menu tersedia.
- [x] Developer Mode tidak tersedia pada production build.
- [x] Keyboard navigation, accessible hotspot labels, live region, dan reduced motion tersedia.
- [x] Home route tidak mengimpor feature Virtual Tour atau preload aset tour.
- [x] Validator memiliki regression test untuk kontrak valid dan failure cases utama.
- [x] Lint, TypeScript, test, dan production build menjadi quality gate handoff.

## Wajib diverifikasi manual sebelum rilis publik

- [ ] Interaksi pointer, touch, pinch, fullscreen, dan dialog pada browser target.
- [ ] Urutan fokus dan pembaca layar dengan konten sekolah final.
- [ ] Semua panorama sekolah berasio 2:1, orientasinya benar, dan sudah dioptimalkan.
- [ ] Semua nama lokasi, deskripsi, tautan, dan media telah diverifikasi sekolah.
- [ ] Hak publikasi aset serta penghapusan metadata pribadi telah dikonfirmasi.
- [ ] Metadata SEO dan status indexing telah diubah dari mode fixture.
- [ ] Pengukuran Core Web Vitals dilakukan menggunakan aset sekolah final.

Fixture rumah membuktikan arsitektur dan perilaku teknis, tetapi bukan konten
produksi SMK Negeri 2 Surabaya. Checklist manual baru dapat ditutup setelah aset
dan data sekolah yang sah tersedia.
