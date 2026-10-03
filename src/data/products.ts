export type Product = {
  slug: string;
  code: string;
  name: string;
  unit: string;
  short: string;
  description: string;
  price: string;
  processNote: string;
  image: {
    src: string;
    alt: string;
  };
};

// Isi di bawah ini contoh untuk prototype. Ganti dengan data resmi
// (nama, deskripsi, harga, foto produk asli) sebelum dipublikasikan.
export const products: readonly Product[] = [
  {
    slug: "tune-up-sepeda-motor",
    code: "TSM-01",
    name: "Tune Up Sepeda Motor",
    unit: "Teknik Sepeda Motor",
    short: "Perawatan berkala motor oleh siswa dengan pendampingan guru.",
    description:
      "Pemeriksaan dan perawatan berkala sepeda motor oleh siswa di bawah pendampingan guru: ganti oli, cek rem, dan penyetelan mesin ringan.",
    price: "Rp35.000", // contoh
    processNote: "Motor diterima di bengkel praktik pada jam sekolah. Estimasi pengerjaan satu hari.",
    image: {
      src: "/images/school/teaching-factory-motor.jpg",
      alt: "Ruang praktik layanan sepeda motor SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "rakit-instalasi-pc",
    code: "TKJ-01",
    name: "Rakit dan Instalasi PC",
    unit: "Teknik Komputer dan Jaringan",
    short: "Rakit PC plus instalasi sistem dan aplikasi standar.",
    description:
      "Perakitan unit komputer beserta instalasi sistem operasi dan aplikasi standar kebutuhan kantor atau belajar.",
    price: "Rp150.000 jasa", // contoh, di luar komponen
    processNote: "Konsultasi spesifikasi sebelum pengerjaan.",
    image: {
      src: "/images/school/tkj.webp",
      alt: "Banner jurusan Teknik Komputer dan Jaringan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "desain-logo-animasi",
    code: "ANI-01",
    name: "Desain Logo dan Animasi Pendek",
    unit: "Animasi",
    short: "Logo plus animasi pembuka maksimal 15 detik.",
    description:
      "Pembuatan logo serta animasi pembuka berdurasi pendek untuk usaha atau acara, dikerjakan siswa dengan revisi terbatas.",
    price: "Rp200.000", // contoh, termasuk dua kali revisi
    processNote: "Durasi animasi maksimal 15 detik.",
    image: {
      src: "/images/school/animasi.webp",
      alt: "Banner jurusan Animasi SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "instalasi-listrik-rumah",
    code: "TITL-01",
    name: "Instalasi Listrik Rumah",
    unit: "Teknik Instalasi Tenaga Listrik",
    short: "Pemasangan dan perbaikan instalasi penerangan rumah.",
    description:
      "Pemasangan dan perbaikan instalasi penerangan rumah tinggal oleh tim siswa terlatih dengan pengawasan guru.",
    price: "Survei dulu", // contoh alur
    processNote: "Survei lokasi, penawaran biaya, lalu penjadwalan pengerjaan.",
    image: {
      src: "/images/school/fasilitas-listrik-2025.jpeg",
      alt: "Fasilitas praktik ketenagalistrikan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "furniture-kayu-custom",
    code: "TKP-01",
    name: "Furniture Kayu Custom",
    unit: "Teknik Konstruksi dan Perumahan",
    short: "Meja, rak, dan perabot kayu sesuai ukuran pemesan.",
    description:
      "Pembuatan meja, rak, dan perabot kayu sederhana sesuai ukuran pemesan melalui bengkel perkayuan sekolah.",
    price: "Mulai Rp500.000", // contoh untuk meja belajar standar
    processNote: "Desain khusus dihitung terpisah.",
    image: {
      src: "/images/school/tkp.webp",
      alt: "Banner jurusan Teknik Konstruksi dan Perumahan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "web-profil-usaha",
    code: "RPL-01",
    name: "Web Profil Usaha",
    unit: "Rekayasa Perangkat Lunak",
    short: "Website profil 1-5 halaman plus formulir kontak dan peta.",
    description:
      "Pembuatan website profil satu sampai lima halaman untuk usaha kecil, termasuk formulir kontak dan peta lokasi.",
    price: "Mulai Rp750.000", // contoh, belum termasuk domain dan hosting
    processNote: "Domain dan hosting tahunan di luar harga di atas.", // contoh; harga asli menyusul
    image: {
      src: "/images/school/rpl.webp",
      alt: "Banner jurusan Rekayasa Perangkat Lunak SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "bengkel-umum",
    code: "TKR-01",
    name: "Bengkel Umum",
    unit: "Teknik Kendaraan Ringan",
    short: "Servis ringan mobil dan motor untuk umum.",
    description:
      "Layanan bengkel umum oleh siswa dengan pendampingan guru: ganti oli, tune up ringan, cek rem, dan perawatan berkala kendaraan.",
    price: "Mulai Rp50.000", // contoh
    processNote: "Kendaraan diterima di bengkel praktik pada jam sekolah. Estimasi pengerjaan satu sampai dua hari.",
    image: {
      src: "/images/school/bengkel-otomotif-2025.jpeg",
      alt: "Bengkel otomotif SMK Negeri 2 Surabaya",
    },
  },
] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
