# Virtual Tour Framework

Feature ini mengisolasi konfigurasi tour dan UI dari Marzipano. Hanya
`engine/marzipano-adapter.ts` yang boleh mengimpor atau memanggil API
Marzipano.

Milestone saat ini mendukung multi-scene, lima jenis hotspot, dan public tour
controls. Scene awal dibuat saat viewer siap; scene yang ditautkan langsung
dari scene aktif dipersiapkan satu tingkat di background. Hotspot target baru
dipasang ketika scene tersebut benar-benar dikunjungi. Posisi DOM ditangani engine adapter, sedangkan
button, link, dialog, media, fullscreen, dan runtime control state tetap
dikelola React.

## Architecture

```text
TourConfig
  -> config validation and scene registry
  -> lazy SceneManager
  -> VirtualTourClient
  -> React hotspot portals and dialogs
  -> PanoramaEngine interface
  -> MarzipanoAdapter
  -> Marzipano
```

## Asset Directory

```text
public/tours/home/
  panoramas/
  thumbnails/
  images/
  videos/
```

Simpan panorama V1 sebagai JPEG equirectangular dengan rasio tepat 2:1.
Gunakan path public yang diawali `/tours/` di dalam config.
Untuk panorama lebih lebar dari 4096 piksel, sediakan `fallback` 4096x2048.
Engine memilih aset berdasarkan batas tekstur WebGL, jenis pointer, dan indikasi
memori perangkat tanpa membaca user-agent. Desktop yang mampu tetap memakai
panorama utama, sedangkan HP memakai fallback agar decode dan upload tekstur
tidak menghabiskan memori.

## Adding a Scene

1. Tambahkan panorama ke `public/tours/<tour-id>/panoramas/`.
2. Tambahkan object scene ke file config tour.
3. Isi ukuran source dan initial view dalam radian.
4. Scene otomatis muncul di menu dan dipersiapkan bila ditautkan scene aktif.
5. Tambahkan hotspot melalui array `hotspots` bila scene membutuhkannya.

```ts
{
  id: "living-room",
  title: "Ruang Tamu",
  source: {
    type: "equirectangular",
    src: "/tours/home/panoramas/living-room.jpg",
    width: 8704,
    height: 4352,
    fallback: {
      src: "/tours/home/panoramas/living-room-mobile.jpg",
      width: 4096,
      height: 2048,
    },
  },
  initialView: { yaw: 0, pitch: 0, fov: 1.35 },
  hotspots: [],
}
```

Ubah `initialSceneId` bila scene tersebut harus menjadi scene pembuka. Scene
baru tidak memerlukan perubahan pada scene manager, interface engine, adapter,
atau komponen menu.

## Adding a Hotspot

Schema dan renderer mendukung discriminated union `scene`, `info`, `image`,
`video`, dan `link`. Jangan menaruh button, modal, atau media presentation di
dalam adapter engine.

```ts
{
  id: "to-kitchen",
  type: "scene",
  targetSceneId: "kitchen",
  yaw: 1.426,
  pitch: -0.087,
  label: "Ke Dapur",
}
```

- `scene` memanggil scene manager; target langsung dari scene aktif dipersiapkan di background.
- `info` membuka dialog teks dengan optional image.
- `image` membuka image viewer dengan alt text dan optional caption.
- `video` membuka player lokal dengan `preload="none"`.
- `link` menerima internal path atau HTTP(S). Gunakan `newTab: true` bila perlu;
  renderer otomatis menambahkan `noopener noreferrer`.

Fixture video saat ini menunjuk
`/tours/home/videos/tour-sample.mp4`. File tersebut sengaja tidak dibuat;
dialog menampilkan fallback sampai video asli ditambahkan ke path itu.

Validator akan menolak ID scene duplikat, initial scene yang tidak ada,
target scene yang tidak dikenal, path asset tidak aman, serta data view dan
hotspot yang tidak valid.

Hotspot `scene` dirender sebagai panah lantai. Saat dipilih, kamera mengarah ke
koordinat hotspot dan zoom masuk sebelum scene berganti dengan crossfade.
Target panorama yang tertaut langsung sudah mulai dipersiapkan ketika scene
aktif tampil. Menu scene tetap memakai perpindahan langsung.

## Mengubah Link Antar-scene

Hubungan antar-scene tidak memakai URL halaman. Setiap panah membaca
`targetSceneId` dari hotspot `scene` di file config tour. Fixture saat ini ada
di `config/home-tour.ts`; tour sekolah nantinya menggunakan
`config/smkn2-tour.ts`.

Contoh scene tujuan:

```ts
{
  id: "scene-b",
  title: "Nama Scene B",
  source: {
    type: "equirectangular",
    src: "/tours/smkn2/panoramas/scene-b.jpg",
    width: 8000,
    height: 4000,
  },
  hotspots: [],
}
```

Lalu arahkan panah dari Scene A ke ID tersebut:

```ts
{
  id: "scene-a-to-scene-b",
  type: "scene",
  targetSceneId: "scene-b",
  yaw: 1.426,
  pitch: -0.087,
  label: "Menuju Scene B",
}
```

Nilai `targetSceneId` harus sama persis dengan `id` scene tujuan. Untuk jalur
pulang, tambahkan hotspot lain pada `scene-b` yang menargetkan `scene-a`.
Gunakan Developer Mode untuk mengambil `yaw` dan `pitch` baru.

Jika yang ingin diubah adalah file panorama, ubah `source.src` dan
`source.fallback.src` beserta ukuran masing-masing. Jika yang
diinginkan adalah tautan ke halaman atau website, gunakan hotspot `type: "link"`
dengan field `href`, bukan `targetSceneId`.

## Switching Tour Config

Berikan config lain ke boundary client yang sama:

```tsx
<VirtualTourClient config={smkn2Tour} />
```

Tour sekolah nantinya sebaiknya berada di config terpisah. Jangan mengganti
core viewer saat aset sekolah tersedia.

Ikuti [panduan migrasi SMKN 2](./docs/smkn2-migration.md) untuk struktur aset,
urutan penggantian config, dan checklist sebelum publikasi. Status acceptance
framework dicatat di [acceptance checklist](./docs/acceptance-checklist.md).

## Developer Mode

Developer Mode hanya tersedia saat menjalankan `next dev`. Buka:

```text
http://localhost:3000/virtual-tour?dev=true
```

Query tersebut tidak mengaktifkan inspector pada production build. Modul
inspector dimuat secara dinamis setelah environment dan query tervalidasi.

Inspector menampilkan scene aktif serta yaw, pitch, dan FOV secara live. Klik
singkat pada panorama untuk memilih koordinat; drag tidak dianggap sebagai
click coordinate. Tombol `Copy Coordinates` menghasilkan:

```text
yaw: 1.426,
pitch: -0.087,
```

Bagian `Add Hotspot` dapat membuat snippet untuk `scene`, `info`, `image`,
`video`, atau `link`. Pilih tipe, lengkapi field minimal, lalu gunakan
`Copy Config`. Tool hanya menghasilkan teks untuk di-copy dan tidak mengubah
source config atau menyimpan data ke backend.

## Tour Controls

Control cluster menyediakan recenter dan fullscreen. Tombol autorotate hanya
muncul bila fitur tersebut diaktifkan oleh config. Zoom tetap tersedia melalui
wheel, pinch, serta keyboard. Recenter selalu menggunakan `initialView` milik
scene aktif. Autorotate memakai `yawSpeed` serta `idleDelayMs` dari config;
drag, wheel, dan scene switching mem-pause gerakan sebelum dilanjutkan setelah
idle delay.

Saat menu scene, dialog hotspot, atau loading target terbuka, autorotate
berhenti. Preferensi `prefers-reduced-motion: reduce` membuat tombol autorotate
tidak tersedia. Fullscreen hanya diterapkan pada section Virtual Tour sehingga
tidak mengubah layout global website.

## Keyboard Navigation

Fokuskan area panorama lalu gunakan:

- `Arrow Left` / `Arrow Right` untuk mengubah yaw.
- `Arrow Up` / `Arrow Down` untuk mengubah pitch.
- `+` / `-` untuk zoom.
- `Home` untuk kembali ke `initialView` scene aktif.

Perpindahan scene memakai transisi nol saat `prefers-reduced-motion: reduce`.
Loading dan scene change diumumkan melalui live region, sedangkan public
controls disembunyikan ketika menu scene terbuka agar tidak saling menutup pada
viewport kecil.

Video menggunakan native accessible controls, `playsInline`, dan
`preload="none"`. Config video dapat menambahkan optional captions:

```ts
captions: {
  src: "/tours/home/videos/captions-id.vtt",
  srcLang: "id",
  label: "Bahasa Indonesia",
}
```

## Future Multires Support

`SceneSource` sengaja berupa object discriminated berdasarkan `type`. Source
`multires` dapat ditambahkan kemudian sebagai anggota union dan ditangani oleh
adapter tanpa mengubah bentuk `SceneConfig` atau UI tour.
