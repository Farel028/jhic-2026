export const studentNavigation = [
  { label: "Ringkasan", href: "/siswa" },
  { label: "Karya siswa", href: "/siswa/karya" },
  { label: "Prestasi", href: "/siswa/prestasi" },
] as const;

export type StudentImage = {
  src: string;
  alt: string;
};

export type StudentWork = {
  title: string;
  creator: string;
  program: string;
  year: string;
  description: string;
  technologies: readonly string[];
  sourceUrl: string;
  image?: StudentImage;
};

export const studentWorks: readonly StudentWork[] = [
  {
    title: "Real Time Face Mask Detection & Healthcare Chatbot",
    creator: "Afif Sauqil dan tim · Ahmad Rafli Al-Adzani dan tim",
    program: "Sistem Informasi, Jaringan, dan Aplikasi",
    year: "2021",
    description:
      "Dua proyek kecerdasan buatan yang dikembangkan setelah pelatihan berbasis kurikulum Intel dan mendapat apresiasi dari mitra industri.",
    technologies: ["Artificial intelligence", "Computer vision", "Chatbot"],
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/20/proyek-ai-siswa-jurusan-sija-dapatkan-apresiasi-dari-iduka",
  },
  {
    title: "Desain Furniture Olimpiade Produk Nasional",
    creator: "Alifah Zahratul Jannah",
    program: "Desain Pemodelan dan Informasi Bangunan",
    year: "2026",
    description:
      "Rancangan furniture yang dinilai dari konsep, estetika, fungsi, dan ketepatan perancangan pada kompetisi nasional Departemen Desain Produk Industri ITS.",
    technologies: ["Product design", "Perancangan", "Presentasi visual"],
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/141/siswi-smkn-2-surabaya-raih-juara-2-olimpiade-desain-produk-nasional-kategori-furniture",
  },
  {
    title: "Sistem Kendali Programmable Logic Controller",
    creator: "Ahmad Kagendra Nouval A. dan Muhammad Fandy A.",
    program: "Teknik Instalasi Tenaga Listrik",
    year: "2025",
    description:
      "Karya otomasi industri yang membawa tim XII TITL 2 meraih Juara 1 kategori PLC pada Industrial Automation and Robotic Competition ITS.",
    technologies: ["PLC", "Otomasi industri", "Sistem kendali"],
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/93/prestasi-membanggakan-siswa-smk-n-2-surabaya-di-ajang-iarc-its",
  },
] as const;

export type StudentAchievement = {
  title: string;
  people: string;
  level: string;
  field: string;
  year: string;
  description: string;
  categories: readonly ("nasional" | "provinsi" | "kota" | "akademik" | "non-akademik")[];
  sourceUrl: string;
  image?: StudentImage;
};

export const studentAchievements: readonly StudentAchievement[] = [
  {
    title: "Juara 2 Olimpiade Desain Produk kategori Furniture",
    people: "Alifah Zahratul Jannah · XII DPIB 1",
    level: "Nasional",
    field: "Desain produk",
    year: "2026",
    description:
      "Capaian nasional dalam perancangan furniture yang diselenggarakan Departemen Desain Produk Industri ITS.",
    categories: ["nasional", "akademik"],
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/141/siswi-smkn-2-surabaya-raih-juara-2-olimpiade-desain-produk-nasional-kategori-furniture",
  },
  {
    title: "Juara 3 Festival Albanjari tingkat Jawa",
    people: "Group Sholawat Ahnafussholihin",
    level: "Regional Jawa",
    field: "Seni religi",
    year: "2026",
    description:
      "Prestasi seni dan kekompakan tim dalam Festival Albanjari ASPI tingkat SMA, MA, dan SMK sederajat se-Jawa.",
    categories: ["provinsi", "non-akademik"],
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/142/group-sholawat-ahnafussholihin-smkn-2-surabaya-raih-juara-3-festival-albanjari-tingkat-jawa",
  },
  {
    title: "Juara 1 PLC Industrial Automation and Robotic Competition",
    people: "Ahmad Kagendra Nouval A. dan Muhammad Fandy A.",
    level: "Nasional",
    field: "Otomasi industri",
    year: "2025",
    description:
      "Tim XII TITL 2 meraih posisi pertama pada kategori Programmable Logic Controller di kompetisi IARC ITS.",
    categories: ["nasional", "akademik"],
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/93/prestasi-membanggakan-siswa-smk-n-2-surabaya-di-ajang-iarc-its",
  },
  {
    title: "Juara 1 Karate Piala ISB Ke-1 Kota Surabaya",
    people: "Duta Anugerah · XI TITL 2",
    level: "Kota Surabaya",
    field: "Karate",
    year: "2025",
    description:
      "Capaian bidang olahraga yang lahir dari latihan, disiplin, dan semangat berkompetisi di tingkat kota.",
    categories: ["kota", "non-akademik"],
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/116/smk-negeri-2-surabaya-bangga-ananda-duta-anugerah-xi-titl-2-raih-juara-1-karate-piala-isb-ke-1-kota-surabaya-tahun-2025",
  },
] as const;

export const studentActivities = [
  {
    title: "Menyusun arah setelah lulus",
    description:
      "Campus Expo membuka percakapan tentang program studi, jalur masuk, beasiswa, dan pilihan pendidikan lanjutan.",
    image: {
      src: "/images/school/campus-expo-2026.jpg",
      alt: "Kegiatan Campus Expo SMK Negeri 2 Surabaya tahun 2026",
    },
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/146/campus-expo-smkn-2-surabaya-membuka-wawasan-menuju-dunia-perguruan-tinggi",
  },
  {
    title: "Mengenal peluang karier global",
    description:
      "Siswa memperoleh informasi tentang kesiapan kompetensi, budaya kerja, dan peluang bekerja di luar negeri.",
    image: {
      src: "/images/school/karier-global-2026.jpg",
      alt: "Sosialisasi peluang karier global bagi siswa SMK Negeri 2 Surabaya",
    },
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/144/sosialisasi-kebekerjaan-luar-negeri-membuka-peluang-karier-global-bagi-siswa-smkn-2-surabaya",
  },
  {
    title: "Belajar langsung dari lapangan",
    description:
      "Kunjungan industri membantu siswa melihat proses kerja, standar profesional, dan penerapan kompetensi secara nyata.",
    image: {
      src: "/images/school/kunjungan-industri-2025.jpg",
      alt: "Rombongan siswa SMK Negeri 2 Surabaya dalam kunjungan industri",
    },
    sourceUrl:
      "https://web.smkn2sby.sch.id/read/95/kegiatan-kunjungan-industri-smk-n-2-surabaya-ke-pocari-dan-tvri-tahun-2025",
  },
] as const;
