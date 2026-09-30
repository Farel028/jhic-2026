# Application Manager Webuzo

Target: domain `smekdaverse.my.id`, user `americano`, port `30001`.

## 1. Siapkan release

Masuk SSH sebagai `americano`, lalu dari repository aplikasi:

```sh
export NEXT_PUBLIC_SITE_URL=https://smekdaverse.my.id
export NEXT_PUBLIC_ASSET_ORIGIN=https://cdn.codel.diy
npm ci
npm run build
npm run deploy:prepare
```

`NEXT_PUBLIC_ASSET_ORIGIN` harus ada **sebelum** build; nilai ini dibundel ke
browser agar Panda dan virtual tour memakai R2.

## 2. Tambah aplikasi Node.js

Di Webuzo Enduser Panel > **Applications** > **Add Application**, pilih
**Node.js** dan mode **Self Managed**. Isi:

| Field | Nilai |
| --- | --- |
| Application path | `/home/americano/apps/smekdaverse` |
| Domain | `smekdaverse.my.id` |
| Port | `30001` |
| Start command | `PORT=30001 HOSTNAME=127.0.0.1 NODE_ENV=production node /home/americano/apps/smekdaverse/build/server.js` |
| Stop command | `pkill -TERM -f '/home/americano/apps/smekdaverse/build/server\\.js' || true` |

Jika `node` tidak ada di PATH Webuzo, ganti `node` pada start command dengan
hasil `command -v node`. Jangan gunakan `npm run dev`, `next dev`, atau
`node server.js` dari root repository.

Setelah aplikasi berjalan, custom proxy domain harus meneruskan ke
`127.0.0.1:30001`; template `smekdaverse.my.id.apache.conf` sudah memakai port
tersebut.

## 3. Instagram sync

`npm run instagram:sync` adalah pekerjaan background. Ia mengambil feed,
menyimpan preview WebP 800px ke folder persisten, lalu menulis snapshot JSON.
Pengunjung tidak menjalankan scraper ini saat membuka homepage.

Buat folder satu kali:

```sh
mkdir -p /home/americano/data/instagram-media /home/americano/logs
```

Di Webuzo > **Cron Jobs**, buat jadwal misalnya setiap 6 jam. Isi command:

```sh
cd /home/americano/apps/smekdaverse && INSTAGRAM_FEED_FILE=/home/americano/data/instagram-feed.json INSTAGRAM_MEDIA_DIR=/home/americano/data/instagram-media npm run instagram:sync >> /home/americano/logs/instagram-sync.log 2>&1
```

Jika cron tidak mengenali `npm`, ganti dengan path dari `command -v npm`.
Script hanya mengganti feed apabila minimal empat post valid didapat; jika
Instagram gagal, snapshot lama tetap dipakai. Homepage membaca snapshot tersebut
melalui ISR, sehingga update tampil maksimal sekitar satu menit setelah request
berikutnya.

Media Instagram tetap berada di VPS untuk saat ini: ukurannya sudah dikecilkan
menjadi WebP 800px dan route `/instagram-media/[file]` memberi cache immutable.
Jangan masukkan ke R2 sebelum hasil stress test menunjukkan route ini bottleneck;
sinkronisasi R2 akan membutuhkan upload tambahan dan perubahan URL feed.

## 4. Smoke test

```sh
curl -fsSI http://127.0.0.1:30001/
curl -fsSI https://smekdaverse.my.id/
```

Pastikan Network browser pada `/virtual-tour` dan maskot Panda memuat dari
`cdn.codel.diy`, sedangkan gambar Instagram boleh tetap dari
`smekdaverse.my.id/instagram-media/...`.
