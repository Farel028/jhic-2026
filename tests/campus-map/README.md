# Peta sekolah: pengujian

Dari root proyek:

    npm run test:campus-map
    npm run lint
    npx tsc --noEmit --pretty false
    npm run build

Browser acceptance memakai Playwright di luar dependency produksi. Jalankan server dengan `npm run dev -- --hostname 127.0.0.1 --port 3100`, kemudian:

    node tests/campus-map/browser-acceptance.mjs

Jika Playwright diinstal terpisah, set `PLAYWRIGHT_MODULE` ke path absolut `playwright/index.mjs`. Contoh Git Bash pada mesin pengembangan ini:

    PLAYWRIGHT_MODULE=C:/Users/LENOVO/AppData/Local/Temp/jhic-map-qa/node_modules/playwright/index.mjs node tests/campus-map/browser-acceptance.mjs

Pengaturan opsional:

- `MAP_QA_URL`: URL server (default http://127.0.0.1:3100).
- `MAP_QA_BROWSER`: channel browser Playwright (default msedge).
- `MAP_QA_OUTPUT`: direktori bukti (default artifacts/campus-map, tidak masuk Git).

Browser menggunakan profil headless terisolasi, bukan profil pribadi pengguna. Uji meliputi pencarian, kombinasi filter, kondisi kosong, seleksi keyboard, kode R. 08 duplikat, klik raycast asli pada Ruang Guru, pemisahan seret/klik, perubahan visual atap/label/zoom, denah pembanding, ukuran desktop/tablet/mobile, dan fallback kehilangan konteks WebGL. Hasil tersimpan di browser-results.json atau browser-failure.json. Skenario kehilangan konteks WebGL disengaja, bukan kegagalan yang terjadi saat penggunaan normal.

`site-integration.test.mjs` menjaga tautan navigasi, beranda, fasilitas, dan sitemap. Data dan geometri diuji oleh test map lainnya. Script virtual-tour bawaan menunjuk file yang tidak disertakan pada salinan proyek ini; jangan mengklaim uji tersebut lulus.
