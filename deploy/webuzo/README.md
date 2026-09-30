# Deploy ke Webuzo Ubuntu 24.04

Target ini memakai domain `smekdaverse.my.id` dan user Webuzo `americano`.
Next.js berjalan sebagai proses Node lokal; Nginx Webuzo adalah satu-satunya
server yang menerima traffic publik.

Gunakan **satu** process manager: Application Manager Webuzo atau unit systemd
di bawah. Karena Application Manager sudah tersedia, pilih itu dan jangan
menyalakan service systemd yang memakai port `30001`.

## Konfigurasi Webuzo

1. Buat atau pastikan domain `smekdaverse.my.id` dimiliki user `americano`.
2. Di **Admin > Apps > Default Apps**, jadikan Nginx web server default.
3. Di **Admin > Apps > Nginx Reverse Proxy**, aktifkan proxy dan aktifkan untuk
   user `americano`. Apache tetap diperlukan sebagai upstream Nginx Webuzo.
4. Aktifkan HTTP/2 dan gzip di **Apps > Nginx Settings**.
5. Sebagai root, salin `smekdaverse.my.id.apache.conf` ke
   `/var/webuzo-data/apache2/custom/domains/smekdaverse.my.id.conf`, lalu
   rebuild/restart virtual host dari Webuzo.

Jangan menaruh proxy pada custom Nginx domain config untuk root domain: Webuzo
memproses root domain lewat Apache saat Nginx Reverse Proxy aktif.

## Rilis aplikasi

Pastikan Node.js 22 tersedia di server (`command -v node`); bila path-nya bukan
`/usr/bin/node`, ubah `ExecStart` pada `smekdaverse.service`. Lalu jalankan
sebagai user `americano`:

```sh
mkdir -p /home/americano/apps/smekdaverse /home/americano/data/instagram-media /home/americano/logs
cd /home/americano/apps/smekdaverse
git clone <REPOSITORY_URL> .
export NEXT_PUBLIC_SITE_URL=https://smekdaverse.my.id
export NEXT_PUBLIC_ASSET_ORIGIN=https://cdn.codel.diy
npm ci
npm run build
npm run deploy:prepare
```

`deploy:prepare` membuat `/home/americano/apps/smekdaverse/build`, berisi server
standalone, `public`, dan `.next/static`. Saat `NEXT_PUBLIC_ASSET_ORIGIN` diisi,
folder `public/tours` dan `public/panda/idle` tidak ikut folder release karena
browser mengambilnya dari R2. Proses Node tidak boleh dijalankan dari repository
root karena dua directory static tersebut tidak otomatis dicopy oleh Next.js ke
standalone output.

## Application Manager Webuzo

Ikuti [application-manager.md](application-manager.md) untuk nilai port, start,
stop, environment, dan cron Instagram yang tepat.

## Alternatif: service systemd

Sebagai root, salin `smekdaverse.service` ke
`/etc/systemd/system/smekdaverse.service`, lalu:

```sh
systemctl daemon-reload
systemctl enable --now smekdaverse
systemctl status smekdaverse
```

Service berjalan sebagai `americano`, bind hanya pada `127.0.0.1:30001`, dan
systemd menyalakannya kembali lima detik setelah crash. Setelah rilis berikutnya,
jalankan `npm run build && npm run deploy:prepare` lalu `systemctl restart smekdaverse`.

Log proses tersedia melalui `journalctl -u smekdaverse -f`.

## Verifikasi dan beban

```sh
curl -fsSI http://127.0.0.1:30001/
curl -fsSI https://smekdaverse.my.id/
STRESS_TEST_URL=https://smekdaverse.my.id STRESS_TEST_ALLOW_REMOTE=true \
  STRESS_TEST_CONNECTIONS=20 STRESS_TEST_DURATION=30 npm run stress:test
```

Naikkan koneksi bertahap ke 50 lalu 100 hanya di staging atau maintenance
window. Pastikan DNS Cloudflare sudah menunjuk ke VPS sebelum menguji domain
publik.

## Instagram dan R2

Thumbnail Instagram harus berada di `/home/americano/data/instagram-media`;
folder ini persisten dan tidak ikut build. Untuk R2, pindahkan hanya video Panda
dan panorama ke custom domain aset setelah deployment Node stabil. Jangan pakai
URL `r2.dev` di production.
