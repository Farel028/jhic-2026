export type DocumentationImage = {
  src: string;
  alt: string;
};

export const documentationSources = {
  school: "https://web.smkn2sby.sch.id",
  instagram: "https://www.instagram.com/smkn2surabaya",
  youtube: "https://www.youtube.com/channel/UCCSWIraIMBHC_q11n55ozQg",
  tiktok: "https://www.tiktok.com/@smknegeri2surabaya",
} as const;

export const photoGallery = [
  {
    title: "Campus Expo",
    category: "Kegiatan siswa",
    year: "2026",
    image: { src: "/images/school/campus-expo-2026.jpg", alt: "Dokumentasi Campus Expo SMK Negeri 2 Surabaya tahun 2026" },
    sourceUrl: "https://web.smkn2sby.sch.id/read/146/campus-expo-smkn2-surabaya-membuka-wawasan-menuju-dunia-perguruan-tinggi",
  },
  {
    title: "Sosialisasi karier global",
    category: "Karier",
    year: "2026",
    image: { src: "/images/school/karier-global-2026.jpg", alt: "Siswa dan narasumber pada sosialisasi peluang karier global" },
    sourceUrl: "https://web.smkn2sby.sch.id/read/144/sosialisasi-kebekerjaan-luar-negeri-membuka-peluang-karier-global-bagi-siswa-smkn-2-surabaya",
  },
  {
    title: "Kunjungan industri",
    category: "Industri",
    year: "2025",
    image: { src: "/images/school/kunjungan-industri-2025.jpg", alt: "Rombongan siswa dalam kegiatan kunjungan industri tahun 2025" },
    sourceUrl: "https://web.smkn2sby.sch.id/read/95/kegiatan-kunjungan-industri-smk-n-2-surabaya-ke-pocari-dan-tvri-tahun-2025",
  },
  {
    title: "Praktik kelistrikan",
    category: "Ruang praktik",
    year: "2025",
    image: { src: "/images/school/fasilitas-listrik-2025.jpeg", alt: "Peralatan praktik kelistrikan bersama guru SMK Negeri 2 Surabaya" },
    sourceUrl: "https://web.smkn2sby.sch.id/read/103/kegiatan-hibah-alat-dari-cv-dar-al-ilmi-ke-jurusan-listrik-smkn-2-surabaya",
  },
  {
    title: "Tes praktik otomotif",
    category: "Ruang praktik",
    year: "2025",
    image: { src: "/images/school/bengkel-otomotif-2025.jpeg", alt: "Siswa melaksanakan tes praktik di bengkel otomotif sekolah" },
    sourceUrl: "https://web.smkn2sby.sch.id/read/97/kegiatan-tes-praktik-htec-siswa-jurusan-otomotif-smk-n-2-surabaya",
  },
  {
    title: "Teaching Factory bengkel motor",
    category: "Fasilitas",
    year: "Arsip",
    image: { src: "/images/school/teaching-factory-motor.jpg", alt: "Peralatan servis Teaching Factory bengkel motor TGP 26" },
    sourceUrl: "https://web.smkn2sby.sch.id/read/6/teaching-factory-smkn-2-sby-bengkel-motor",
  },
] as const;

export const schoolVideos = [
  {
    title: "Campus Expo SMKN 2 Surabaya",
    description: "Inspirasi kuliah dan percakapan tentang pendidikan lanjutan bersama alumni dari berbagai perguruan tinggi.",
    year: "2026",
    videoId: "ilUQf2p7o1E",
    thumbnail: { src: "/images/documentation/youtube-campus-expo-2026.jpg", alt: "Thumbnail video Campus Expo SMK Negeri 2 Surabaya" },
    sourcePage: "https://web.smkn2sby.sch.id/read/139/campus-expo-smkn-2-surabaya-hadirkan-alumni-dari-berbagai-perguruan-tinggi-ternama-jawa-timur",
  },
  {
    title: "Program SIKAP SMKN 2 Surabaya",
    description: "Dokumentasi Sekolah Inovatif Ketahanan Pangan dan keterlibatan warga sekolah dalam praktik lingkungan.",
    year: "2026",
    videoId: "aEBby90L5h0",
    thumbnail: { src: "/images/documentation/youtube-program-sikap-2026.jpg", alt: "Thumbnail video Program SIKAP SMK Negeri 2 Surabaya" },
    sourcePage: "https://web.smkn2sby.sch.id/read/137/smkn-2-surabaya-ikuti-peluncuran-program-sikap-serentak-se-jawa-timur",
  },
  {
    title: "Rencana Aksi SMK Pusat Keunggulan",
    description: "Gambaran rencana aksi pengembangan sekolah dan aktivitas pembelajaran vokasi.",
    year: "2021",
    videoId: "jvc7siI6DQU",
    thumbnail: { src: "/images/documentation/youtube-rencana-aksi-2021.jpg", alt: "Thumbnail video Rencana Aksi SMK Pusat Keunggulan" },
    sourcePage: documentationSources.school,
  },
  {
    title: "BKK SMKN 2 Surabaya",
    description: "Pengenalan Bursa Kerja Khusus sebagai penghubung alumni dengan informasi kerja dan mitra industri.",
    year: "Arsip",
    videoId: "zvSPZ05OmoE",
    thumbnail: { src: "/images/documentation/youtube-bkk-smekda.jpg", alt: "Thumbnail video BKK SMK Negeri 2 Surabaya" },
    sourcePage: documentationSources.school,
  },
] as const;

export const socialChannels = [
  {
    platform: "Instagram",
    handle: "@smkn2surabaya",
    description: "Akun Instagram yang ditautkan langsung oleh website dan e-learning resmi sekolah.",
    href: documentationSources.instagram,
    status: "Terverifikasi dari website sekolah",
    tone: "bg-secondary",
  },
  {
    platform: "YouTube",
    handle: "SMKN 2 Surabaya",
    description: "Kanal video yang digunakan pada embed artikel dan beranda resmi sekolah.",
    href: documentationSources.youtube,
    status: "Terverifikasi dari website sekolah",
    tone: "bg-accent-soft",
  },
  {
    platform: "TikTok",
    handle: "@smknegeri2surabaya",
    description: "Akun TikTok sekolah berdasarkan identitas kanal yang dikonfirmasi untuk project ini.",
    href: documentationSources.tiktok,
    status: "Dikonfirmasi pengguna",
    tone: "bg-white",
  },
] as const;

export const newsCategories = [
  { key: "semua", label: "Semua" },
  { key: "kegiatan", label: "Kegiatan" },
  { key: "prestasi", label: "Prestasi" },
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
  internal?: boolean;
  image?: DocumentationImage;
};

export const newsroomItems: readonly NewsItem[] = [
  {
    title: "Penyaluran Zakat Fitrah, Wujud Kepedulian Keluarga Besar Sekolah",
    excerpt: "Kegiatan bersama warga sekolah yang menjadi ruang belajar tentang kepedulian, tanggung jawab, dan kebersamaan.",
    category: "kegiatan", categoryLabel: "Kegiatan", date: "12 Maret 2026", year: "2026",
    href: "https://web.smkn2sby.sch.id/read/147/penyaluran-zakat-fitrah-wujud-kepedulian-keluarga-besar-smk-negeri-2-surabaya-di-bulan-ramadan",
  },
  {
    title: "Campus Expo Membuka Wawasan Menuju Dunia Perguruan Tinggi",
    excerpt: "Siswa mengenal program studi, jalur masuk, beasiswa, dan pilihan pendidikan setelah lulus.",
    category: "kegiatan", categoryLabel: "Alumni & Kampus", date: "6 Maret 2026", year: "2026",
    href: "https://web.smkn2sby.sch.id/read/146/campus-expo-smkn2-surabaya-membuka-wawasan-menuju-dunia-perguruan-tinggi",
    image: { src: "/images/school/campus-expo-2026.jpg", alt: "Dokumentasi Campus Expo SMK Negeri 2 Surabaya" },
  },
  {
    title: "Sosialisasi Web BKK untuk Penelusuran Lulusan",
    excerpt: "Pengenalan layanan BKK bagi calon mahasiswa, calon tenaga kerja, dan calon pengusaha muda.",
    category: "karier", categoryLabel: "Karier", date: "6 Maret 2026", year: "2026",
    href: "https://web.smkn2sby.sch.id/read/145/sosialisasi-web-bkk-smekda-penelusuran-calon-mahasiswa-tenaga-kerja-dan-pengusaha-sukses-smkn-2-surabaya",
  },
  {
    title: "Membuka Peluang Karier Global bagi Siswa",
    excerpt: "Sosialisasi kesiapan kompetensi, budaya kerja, dan peluang bekerja di luar negeri.",
    category: "karier", categoryLabel: "Karier", date: "6 Maret 2026", year: "2026",
    href: "https://web.smkn2sby.sch.id/read/144/sosialisasi-kebekerjaan-luar-negeri-membuka-peluang-karier-global-bagi-siswa-smkn-2-surabaya",
    image: { src: "/images/school/karier-global-2026.jpg", alt: "Sosialisasi peluang karier global bagi siswa" },
  },
  {
    title: "Group Sholawat Raih Juara 3 Festival Albanjari Tingkat Jawa",
    excerpt: "Prestasi seni religi yang menunjukkan kekompakan, disiplin latihan, dan kolaborasi siswa.",
    category: "prestasi", categoryLabel: "Prestasi", date: "4 Februari 2026", year: "2026",
    href: "https://web.smkn2sby.sch.id/read/142/group-sholawat-ahnafussholihin-smkn-2-surabaya-raih-juara-3-festival-albanjari-tingkat-jawa",
  },
  {
    title: "Juara 2 Olimpiade Desain Produk Nasional kategori Furniture",
    excerpt: "Karya Alifah Zahratul Jannah dinilai dari konsep, estetika, fungsi, dan ketepatan perancangan.",
    category: "prestasi", categoryLabel: "Prestasi", date: "4 Februari 2026", year: "2026",
    href: "https://web.smkn2sby.sch.id/read/141/siswi-smkn-2-surabaya-raih-juara-2-olimpiade-desain-produk-nasional-kategori-furniture",
  },
  {
    title: "SMKN 2 Surabaya Mengikuti Peluncuran Program SIKAP",
    excerpt: "Partisipasi sekolah dalam program ketahanan pangan berkelanjutan berbasis pendidikan di Jawa Timur.",
    category: "sekolah", categoryLabel: "Program Sekolah", date: "26 Januari 2026", year: "2026",
    href: "https://web.smkn2sby.sch.id/read/137/smkn-2-surabaya-ikuti-peluncuran-program-sikap-serentak-se-jawa-timur",
    image: { src: "/images/documentation/youtube-program-sikap-2026.jpg", alt: "Kegiatan Program SIKAP SMK Negeri 2 Surabaya" },
  },
  {
    title: "Juara 1 Karate Piala ISB Ke-1 Kota Surabaya",
    excerpt: "Duta Anugerah dari XI TITL 2 meraih capaian tingkat kota melalui latihan dan disiplin.",
    category: "prestasi", categoryLabel: "Prestasi", date: "20 Mei 2025", year: "2025",
    href: "https://web.smkn2sby.sch.id/read/116/smk-negeri-2-surabaya-bangga-ananda-duta-anugerah-xi-titl-2-raih-juara-1-karate-piala-isb-ke-1-kota-surabaya-tahun-2025",
  },
  {
    title: "Melihat Kelistrikan Industri dari Pabrik hingga Ruang Siaran",
    excerpt: "Siswa Teknik Ketenagalistrikan mengamati proses produksi Pocari Sweat dan sistem penyiaran TVRI.",
    category: "industri", categoryLabel: "Kunjungan Industri", date: "25 Januari 2025", year: "2025",
    href: "/berita/kunjungan-industri-pocari-tvri-2025",
    internal: true,
    image: { src: "/images/school/kunjungan-industri-2025.jpg", alt: "Siswa SMK Negeri 2 Surabaya mengikuti kunjungan industri tahun 2025" },
  },
  {
    title: "Peralatan Baru untuk Memperkuat Praktik Kelistrikan",
    excerpt: "Hibah alat dan pelatihan dari CV Dar Al Ilmi menambah pengalaman praktik siswa kelas XI TITL.",
    category: "industri", categoryLabel: "Praktik TITL", date: "25 Januari 2025", year: "2025",
    href: "/berita/hibah-alat-praktik-titl-2025",
    internal: true,
    image: { src: "/images/school/fasilitas-listrik-2025.jpeg", alt: "Peralatan praktik kelistrikan bersama guru SMK Negeri 2 Surabaya" },
  },
  {
    title: "Uji Keterampilan Otomotif dengan Standar Industri",
    excerpt: "Tes praktik HTEC menguji keterampilan perawatan, perbaikan, dan diagnosis kendaraan siswa Otomotif.",
    category: "industri", categoryLabel: "Praktik Otomotif", date: "25 Januari 2025", year: "2025",
    href: "/berita/tes-praktik-htec-otomotif-2025",
    internal: true,
    image: { src: "/images/school/bengkel-otomotif-2025.jpeg", alt: "Siswa melaksanakan tes praktik di bengkel otomotif SMK Negeri 2 Surabaya" },
  },
  {
    title: "Kunjungan Industri Konstruksi ke Proyek Tol Probowangi",
    excerpt: "Siswa TKP, DPIB, dan KGSP melihat proses konstruksi serta penerapan BIM di proyek skala besar.",
    category: "industri", categoryLabel: "Industri", date: "15 Februari 2025", year: "2025",
    href: "https://web.smkn2sby.sch.id/read/111/kunjungan-industri-program-keahlian-tkp-dpib-dan-kgsp-smkn-2-surabaya-ke-proyek-pembangunan-tol-probowangi-tahap-ii",
  },
  {
    title: "Workshop Simulasi Arduino IDE dan Proteus",
    excerpt: "Pembelajaran RPL yang mempertemukan pemrograman mikrokontroler dan simulasi rangkaian elektronik.",
    category: "industri", categoryLabel: "Workshop", date: "25 Januari 2025", year: "2025",
    href: "https://web.smkn2sby.sch.id/read/100/workshop-simulasi-software-arduino-ide-dan-proteus-di-smk-n-2-surabaya",
  },
] as const;
