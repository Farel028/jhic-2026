export type DocumentationImage = {
  src: string;
  alt: string;
};

export const newsCategories = [
  { key: "semua", label: "Semua" },
  { key: "kegiatan", label: "Kegiatan" },
  { key: "karier", label: "Karier" },
  { key: "industri", label: "Industri" },
  { key: "sekolah", label: "Sekolah" },
] as const;

export type NewsCategory = Exclude<(typeof newsCategories)[number]["key"], "semua">;

export type NewsItem = {
  title: string;
  excerpt: string;
  category: NewsCategory;
  categoryLabel: string;
  date: string;
  year: "2025" | "2026";
  href: string;
  image: DocumentationImage;
};

export const newsroomItems: readonly NewsItem[] = [
  {
    title: "Campus Expo membantu siswa membaca pilihan setelah lulus",
    excerpt:
      "Siswa mengenal program studi, jalur masuk, beasiswa, dan berbagai kemungkinan pendidikan setelah SMK.",
    category: "kegiatan",
    categoryLabel: "Kegiatan",
    date: "6 Maret 2026",
    year: "2026",
    href: "/berita/campus-expo-2026",
    image: {
      src: "/images/school/campus-expo-2026.jpg",
      alt: "Dokumentasi Campus Expo SMK Negeri 2 Surabaya tahun 2026",
    },
  },
  {
    title: "Membuka wawasan tentang peluang karier global",
    excerpt:
      "Sosialisasi kebekerjaan mengenalkan peluang, persyaratan, dan kesiapan yang diperlukan untuk bekerja di luar negeri.",
    category: "karier",
    categoryLabel: "Karier",
    date: "6 Maret 2026",
    year: "2026",
    href: "/berita/peluang-karier-global-2026",
    image: {
      src: "/images/school/karier-global-2026.jpg",
      alt: "Sosialisasi peluang karier global bagi siswa SMK Negeri 2 Surabaya",
    },
  },
  {
    title: "SMEKDA berpartisipasi dalam Program SIKAP Jawa Timur",
    excerpt:
      "Program Sekolah Inovatif Ketahanan Pangan menghubungkan pembelajaran dengan kemandirian, lingkungan, dan gotong royong.",
    category: "sekolah",
    categoryLabel: "Program sekolah",
    date: "26 Januari 2026",
    year: "2026",
    href: "/berita/program-sikap-2026",
    image: {
      src: "/images/documentation/youtube-program-sikap-2026.jpg",
      alt: "Kegiatan Program SIKAP SMK Negeri 2 Surabaya tahun 2026",
    },
  },
  {
    title: "Melihat Kelistrikan Industri dari Pabrik hingga Ruang Siaran",
    excerpt:
      "Siswa Teknik Ketenagalistrikan mengamati proses produksi Pocari Sweat dan sistem penyiaran TVRI.",
    category: "industri",
    categoryLabel: "Kunjungan industri",
    date: "25 Januari 2025",
    year: "2025",
    href: "/berita/kunjungan-industri-pocari-tvri-2025",
    image: {
      src: "/images/school/kunjungan-industri-2025.jpg",
      alt: "Siswa SMK Negeri 2 Surabaya mengikuti kunjungan industri tahun 2025",
    },
  },
  {
    title: "Peralatan Baru untuk Memperkuat Praktik Kelistrikan",
    excerpt:
      "Hibah alat dan pelatihan dari CV Dar Al Ilmi menambah pengalaman praktik siswa kelas XI TITL.",
    category: "industri",
    categoryLabel: "Praktik TITL",
    date: "25 Januari 2025",
    year: "2025",
    href: "/berita/hibah-alat-praktik-titl-2025",
    image: {
      src: "/images/school/fasilitas-listrik-2025.jpeg",
      alt: "Peralatan praktik kelistrikan bersama guru SMK Negeri 2 Surabaya",
    },
  },
  {
    title: "Uji Keterampilan Otomotif dengan Standar Industri",
    excerpt:
      "Tes praktik HTEC menguji keterampilan perawatan, perbaikan, dan diagnosis kendaraan siswa Otomotif.",
    category: "industri",
    categoryLabel: "Praktik otomotif",
    date: "25 Januari 2025",
    year: "2025",
    href: "/berita/tes-praktik-htec-otomotif-2025",
    image: {
      src: "/images/school/bengkel-otomotif-2025.jpeg",
      alt: "Siswa melaksanakan tes praktik di bengkel otomotif SMK Negeri 2 Surabaya",
    },
  },
] as const;
