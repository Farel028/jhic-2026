# R2 media untuk `cdn.codel.diy`

Website tetap di `https://smekdaverse.my.id` pada VPS Jagoan Hosting. Domain
aset boleh berbeda: `https://cdn.codel.diy` akan melayani hanya video Panda dan
file tour. Kedua domain harus HTTPS.

## 1. Siapkan domain Cloudflare

1. Masuk ke akun Cloudflare yang akan memiliki bucket R2.
2. Pastikan zone `codel.diy` ada pada akun Cloudflare yang sama. DNS
   `smekdaverse.my.id` boleh tetap dikelola Jagoan Hosting; tidak perlu dipindah.
3. Jangan gunakan `r2.dev` untuk production.

## 2. Buat bucket dan custom domain

1. Buka **R2 Object Storage** > **Create bucket**.
2. Nama bucket: `jhic-assets`.
3. Buka bucket tersebut > **Settings** > **Public access** > **Custom Domains**.
4. Pilih **Connect Domain**, isi `cdn.codel.diy`, lalu konfirmasi DNS record
   yang dibuat Cloudflare.
5. Setelah status domain **Active**, biarkan Public Development URL (`r2.dev`)
   nonaktif.

## 3. Atur cache dan CORS

1. Pada zone `codel.diy`, buka **Caching** > **Cache Rules** > **Create rule**.
2. Gunakan filter `Hostname equals cdn.codel.diy` dan `URI Path starts with /`.
3. Pilih **Cache eligibility: Eligible for cache**, lalu set Edge TTL satu tahun.
   File di-upload dengan nama/key yang sama seperti source; purge URL bila media
   diganti sebelum TTL selesai.
4. Pada bucket, buka **Settings** > **CORS Policy** dan tempel isi
   `cors.json`. Setelah menyimpan, purge cache `cdn.codel.diy` sekali.

CORS ini wajib untuk panorama karena Marzipano membuat texture WebGL dari gambar
lintas domain. Jangan mengganti origin menjadi `*`; cukup izinkan website publik.

## 4. Login dan upload dari Windows

Jalankan sekali di PowerShell dari root repository:

```powershell
npx.cmd --yes wrangler@latest login
npx.cmd --yes wrangler@latest r2 bucket cors set jhic-assets --file deploy/r2/cors.json
.\deploy\r2\upload-media.ps1
```

Script meng-upload key yang sama dengan URL aplikasi:

```text
panda/idle/*.webm
tours/virtual-tour.webm
tours/smkn2/panoramas/*.jpg
```

Setiap berkas dikirim dengan `Cache-Control: public, max-age=31536000, immutable`.
Untuk aset baru yang menggantikan file lama, gunakan nama baru lalu ubah referensi
di kode, atau purge URL lama dari Cloudflare.

## 5. Aktifkan pada aplikasi

Di VPS, set sebelum build:

```sh
export NEXT_PUBLIC_SITE_URL=https://smekdaverse.my.id
export NEXT_PUBLIC_ASSET_ORIGIN=https://cdn.codel.diy
npm run build
npm run deploy:prepare
sudo systemctl restart smekdaverse
```

`NEXT_PUBLIC_ASSET_ORIGIN` dibaca saat build, sehingga restart saja tidak cukup.
Set nilai yang sama di `.env.local` untuk menguji dari komputer lokal. Jika variabel
kosong, aplikasi otomatis tetap memakai `/panda` dan `/tours` dari VPS.

## 6. Verifikasi

```powershell
curl.exe -I https://cdn.codel.diy/panda/idle/abu_idle.webm
curl.exe -H "Origin: https://smekdaverse.my.id" -I https://cdn.codel.diy/tours/smkn2/panoramas/ceremony-field.jpg
```

Request kedua harus berisi `Access-Control-Allow-Origin: https://smekdaverse.my.id`.
Lalu buka `/virtual-tour` dan pastikan Network menunjukkan host `cdn.codel.diy`
serta tidak ada error CORS atau WebGL.
