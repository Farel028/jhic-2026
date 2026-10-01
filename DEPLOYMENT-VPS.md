# Deployment VPS Jagoan Hosting

Deployment ini memakai Next.js standalone build dan satu proses Node.js yang
listen di port `30001`. Folder `build/` adalah satu-satunya artefak runtime
yang perlu di-upload ke `public_html/build/`.

## 1. Build di komputer lokal

`NEXT_PUBLIC_*` dipakai saat build dan nilainya akan tertanam ke bundle browser.
Set nilainya sebelum menjalankan `build` dan `deploy:prepare`:

```powershell
$env:NEXT_PUBLIC_SITE_URL="https://smekdaverse.my.id"
$env:NEXT_PUBLIC_ASSET_ORIGIN="https://cdn.codel.diy"

npm.cmd run build
npm.cmd run deploy:prepare
```

Perintah terakhir menghasilkan folder `build/`. Upload atau replace folder itu
ke `/home/americano/public_html/build/` di VPS. Jangan hanya mengubah
`NEXT_PUBLIC_ASSET_ORIGIN` setelah build selesai; perubahan itu membutuhkan
build ulang.

## 2. Runtime di VPS

Pastikan folder data Instagram persisten dan dapat dibaca user aplikasi:

```bash
mkdir -p /home/americano/data/instagram-media /home/americano/logs
```

Restart proses Node dari folder aplikasi:

```bash
cd /home/americano/public_html

pkill -9 -f "next-server|build/server" || true
sleep 2

PORT=30001 \
HOSTNAME=127.0.0.1 \
NODE_ENV=production \
NEXT_PUBLIC_SITE_URL=https://smekdaverse.my.id \
INSTAGRAM_FEED_FILE=/home/americano/data/instagram-feed.json \
INSTAGRAM_MEDIA_DIR=/home/americano/data/instagram-media \
nohup node /home/americano/public_html/build/server.js \
  > /home/americano/logs/web.log 2>&1 &
```

Webuzo/Application Manager harus mem-proxy domain ke `127.0.0.1:30001`.
Gunakan satu process manager saja untuk port tersebut.

## 3. Menyalakan sinkronisasi Instagram

Fitur Instagram tidak mengambil data langsung dari browser pengunjung. Script
di `scripts/sync-instagram.mjs` membuka profil publik `smkn2surabaya` memakai
Chrome/Chromium headless, mengunduh cover menjadi WebP, lalu menyimpan snapshot
ke file JSON. Karena itu, selain folder `build/`, upload juga `scripts/`,
`package.json`, dan `package-lock.json` ke `public_html`, lalu install
dependency runtime satu kali:

```bash
cd /home/americano/public_html
npm ci --omit=dev
```

Chrome/Chromium harus tersedia di VPS. Cek atau tentukan binary-nya:

```bash
command -v google-chrome || command -v google-chrome-stable || command -v chromium
```

Jalankan dry-run terlebih dahulu. Perintah ini tidak mengganti snapshot lama:

```bash
cd /home/americano/public_html
export INSTAGRAM_BROWSER_BINARY=/bin/google-chrome
export INSTAGRAM_BROWSER_USER_DATA_DIR=/home/americano/data/instagram-chrome-profile
export INSTAGRAM_FEED_FILE=/home/americano/data/instagram-feed.json
export INSTAGRAM_MEDIA_DIR=/home/americano/data/instagram-media

npm run instagram:sync -- --dry-run
npm run instagram:sync
```

Script hanya mengganti snapshot jika menemukan minimal empat post valid. Jika
Instagram mengirim login wall, challenge, atau error jaringan, snapshot lama
tetap dipakai sehingga homepage tidak menjadi kosong.

Tambahkan cron Webuzo untuk menjalankan sinkronisasi, misalnya setiap hari
pukul 09:00 WIB (pastikan timezone server benar):

```cron
0 9 * * * cd /home/americano/public_html && INSTAGRAM_BROWSER_BINARY=/bin/google-chrome INSTAGRAM_BROWSER_USER_DATA_DIR=/home/americano/data/instagram-chrome-profile INSTAGRAM_FEED_FILE=/home/americano/data/instagram-feed.json INSTAGRAM_MEDIA_DIR=/home/americano/data/instagram-media /bin/sh scripts/run-instagram-daily.sh >> /home/americano/logs/instagram-sync.log 2>&1
```

Folder `/home/americano/data/instagram-feed.json` dan
`/home/americano/data/instagram-media/` harus berada di luar folder release agar
tidak terhapus saat deployment berikutnya. Setelah sync sukses, homepage akan
membaca snapshot baru pada regenerasi berikutnya (maksimal sekitar satu menit),
tanpa rebuild atau restart server.

## 4. Verifikasi

```bash
sleep 5
curl -fsSI http://127.0.0.1:30001/
curl -fsSI https://smekdaverse.my.id/
tail -n 100 /home/americano/logs/web.log
```

Interpretasi cepat:

- localhost gagal: periksa `web.log`, path `build/server.js`, versi Node, dan permission;
- localhost berhasil tetapi domain gagal: periksa proxy Webuzo, DNS, dan SSL;
- HTML berhasil tetapi Panda/tour rusak: periksa `NEXT_PUBLIC_ASSET_ORIGIN` saat build dan CORS CDN;
- feed Instagram kosong atau stale: periksa file dan path `INSTAGRAM_*` di runtime.

Build sebaiknya dibuat pada Linux yang kompatibel dengan VPS bila runtime
melaporkan error native module seperti `sharp`.
