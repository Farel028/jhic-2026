export type MajorGroup =
  | "Digital & Kreatif"
  | "Konstruksi"
  | "Elektronika & Listrik"
  | "Manufaktur"
  | "Otomotif";

export type MajorDetail = {
  slug: string;
  code: string;
  name: string;
  group: MajorGroup;
  description: string;
  focus: readonly string[];
  accent: "blue" | "yellow";
  overview: string;
  learningLabel: "Kegiatan" | "Kompetensi yang diajarkan" | "Fokus pembelajaran";
  learningAreas: readonly string[];
  pathwayExamples: readonly string[];
  banner: {
    src: string;
    alt: string;
  };
  sourceNote?: string;
};

export type MajorPreview = Pick<
  MajorDetail,
  "slug" | "code" | "name" | "description" | "focus" | "accent"
>;

export type MajorCatalogItem = Pick<MajorDetail, "code" | "name" | "group" | "slug">;

export const majorDetails: readonly MajorDetail[] = [
  {
    slug: "animasi",
    code: "ANI",
    name: "Animasi",
    group: "Digital & Kreatif",
    description: "Mempelajari teori dan teknik pembuatan animasi 2D, 3D, film, dan game.",
    focus: ["3D modelling", "Ilustrasi", "Storyboard"],
    accent: "yellow",
    overview:
      "Animasi merupakan jurusan yang berdiri terakhir di SMK Negeri 2 Surabaya, sekitar tahun 2005. Bidang ini mempelajari teori dan teknik untuk membuat animasi 2D dan 3D, animasi film, animasi game, serta berbagai karya yang menggunakan konten animasi.",
    learningLabel: "Kompetensi yang diajarkan",
    learningAreas: [
      "3D modelling",
      "Ilustrasi",
      "Storyboard",
      "Animasi 2D dan 3D",
    ],
    pathwayExamples: [
      "Animator",
      "Ilustrator",
      "Storyboard artist",
      "Desainer karakter",
      "Desainer grafis",
      "Konten kreator",
    ],
    banner: {
      src: "/images/school/animasi.webp",
      alt: "Banner jurusan Animasi SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "desain-pemodelan-informasi-bangunan",
    code: "DPIB",
    name: "Desain Pemodelan dan Informasi Bangunan",
    group: "Konstruksi",
    description: "Mempelajari perencanaan, pelaksanaan, dan pemeliharaan bangunan.",
    focus: ["Desain bangunan", "Estimasi biaya", "Konstruksi"],
    accent: "blue",
    overview:
      "DPIB mempelajari perencanaan pembangunan, pelaksanaan pembangunan, dan perbaikan gedung.",
    learningLabel: "Kegiatan",
    learningAreas: [
      "Menggambar desain rumah, gedung, dan apartemen",
      "Menghitung biaya pembangunan",
      "Melaksanakan pembangunan",
      "Memelihara konstruksi bangunan",
    ],
    pathwayExamples: [
      "Drafter",
      "Quantity surveyor",
      "Quality control",
      "Pelaksana lapangan",
      "Logistik",
      "Perencana konstruksi",
      "Pengendali proyek",
      "Kontraktor atau pemborong",
    ],
    banner: {
      src: "/images/school/dpib.webp",
      alt: "Banner jurusan Desain Pemodelan dan Informasi Bangunan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "teknik-konstruksi-dan-perumahan",
    code: "TKP",
    name: "Teknik Konstruksi dan Perumahan",
    group: "Konstruksi",
    description: "Mempelajari konstruksi bangunan, pengukuran tanah, dan perencanaan biaya.",
    focus: ["Pengukuran tanah", "Konstruksi", "Estimasi biaya"],
    accent: "yellow",
    overview:
      "TKP mempelajari ilmu konstruksi bangunan dan furnitur perkayuan, pengukuran tanah, rancangan anggaran biaya (RAB), konstruksi bangunan, serta laporan pelaksanaan konstruksi.",
    learningLabel: "Kompetensi yang diajarkan",
    learningAreas: [
      "Gambar manual dan mekanika teknik",
      "Teknik pengukuran tanah dan dasar-dasar konstruksi bangunan",
      "Perencanaan, pelaksanaan, serta pengawasan bisnis konstruksi dan properti",
      "Estimasi biaya dan pengelolaan konstruksi serta properti",
      "Produk kreatif dan kewirausahaan",
    ],
    pathwayExamples: [
      "Drafter",
      "Quantity surveyor",
      "Quality control",
      "Pelaksana lapangan",
      "Logistik",
      "Perencana konstruksi",
      "Pengendali proyek",
      "Kontraktor atau pemborong",
    ],
    banner: {
      src: "/images/school/tkp.webp",
      alt: "Banner jurusan Teknik Konstruksi dan Perumahan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "teknik-audio-video",
    code: "TAV",
    name: "Teknik Audio Video",
    group: "Elektronika & Listrik",
    description: "Mempelajari bidang elektronika, khususnya pengolahan sistem audio dan video.",
    focus: ["Elektronika", "Audio", "Video"],
    accent: "blue",
    overview:
      "Teknik Audio Video merupakan jurusan dalam bidang elektronika, khususnya pengolahan sistem audio dan video.",
    learningLabel: "Kompetensi yang diajarkan",
    learningAreas: [
      "Dasar-dasar kelistrikan",
      "Dasar elektronika dan teknik digital",
      "Keselamatan dan kesehatan kerja (K3)",
    ],
    pathwayExamples: [
      "Teknisi instalasi audio video",
      "Sound engineer",
      "Wirausaha",
      "Sektor swasta",
    ],
    banner: {
      src: "/images/school/tav.webp",
      alt: "Banner jurusan Teknik Audio Video SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "teknik-elektronika-industri",
    code: "TEI",
    name: "Teknik Elektronika Industri",
    group: "Elektronika & Listrik",
    description: "Mempelajari sistem kontrol dan pemeliharaan peralatan elektronika industri.",
    focus: ["Sistem kontrol", "Mikrokontroler", "PLC"],
    accent: "yellow",
    overview:
      "TEI mendidik siswa agar memiliki kemampuan pada bidang sistem kontrol dan pemeliharaan peralatan industri berbasis electrical control dan microprocessor.",
    learningLabel: "Kompetensi yang diajarkan",
    learningAreas: [
      "Elektronika umum",
      "Mikrokontroler dan mikroprosesor",
      "Pneumatik dan PLC",
      "Pemrograman berbasis komputer yang berkaitan dengan proses produksi industri",
    ],
    pathwayExamples: [
      "Teknisi industri",
      "Sound engineer",
      "Wirausaha",
      "Sektor swasta",
    ],
    banner: {
      src: "/images/school/tei.webp",
      alt: "Banner jurusan Teknik Elektronika Industri SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "teknik-instalasi-tenaga-listrik",
    code: "TITL",
    name: "Teknik Instalasi Tenaga Listrik",
    group: "Elektronika & Listrik",
    description: "Mempelajari perencanaan dan pemasangan instalasi penerangan serta tenaga listrik.",
    focus: ["Instalasi listrik", "Panel surya", "PLC"],
    accent: "yellow",
    overview:
      "TITL mendidik peserta didik dengan keahlian dan keterampilan dalam perencanaan serta pemasangan instalasi penerangan dan tenaga.",
    learningLabel: "Kegiatan",
    learningAreas: [
      "Praktik instalasi penerangan listrik",
      "Merakit panel surya",
      "PLC (Programmable Logic Controller)",
      "Merawat dan memperbaiki alat rumah tangga listrik",
    ],
    pathwayExamples: [
      "Bidang pembangkitan, transmisi, dan distribusi tenaga listrik",
      "Peneliti atau perancang ketenagalistrikan",
      "Insinyur operasi dan pemeliharaan",
      "Instansi pemerintah dan industri ketenagalistrikan",
    ],
    banner: {
      src: "/images/school/titl.webp",
      alt: "Banner jurusan Teknik Instalasi Tenaga Listrik SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "teknik-pemesinan",
    code: "TPM",
    name: "Teknik Pemesinan",
    group: "Manufaktur",
    description: "Mempersiapkan keterampilan dasar teknik mesin dan pengoperasian mesin produksi.",
    focus: ["Teknik mesin", "Mesin produksi", "CNC"],
    accent: "blue",
    overview:
      "TPM mempersiapkan tenaga kerja menengah terampil dalam bidang pemesinan melalui pekerjaan dasar teknik mesin dan dasar perancangan teknik mesin.",
    learningLabel: "Kegiatan",
    learningAreas: [
      "Mengoperasikan mesin produksi manual",
      "Mengoperasikan mesin CNC (Computer Numerical Control)",
      "Pekerjaan dasar teknik mesin",
      "Dasar perancangan teknik mesin",
    ],
    pathwayExamples: [
      "Industri otomotif",
      "Bidang konversi energi",
      "Industri bioteknologi",
      "Pembangkit Jawa Bali",
      "Industri pertambangan",
      "Drafter",
    ],
    banner: {
      src: "/images/school/tpm.webp",
      alt: "Banner jurusan Teknik Pemesinan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "teknik-kendaraan-ringan",
    code: "TKR",
    name: "Teknik Kendaraan Ringan",
    group: "Otomotif",
    description: "Mempelajari perawatan dan perbaikan kendaraan ringan.",
    focus: ["Mesin", "Perawatan", "Perbaikan"],
    accent: "blue",
    overview:
      "TKR merupakan kompetensi keahlian bidang teknik otomotif yang menekankan penguasaan jasa perbaikan kendaraan ringan.",
    learningLabel: "Kompetensi yang diajarkan",
    learningAreas: [
      "Memahami dasar-dasar mesin",
      "Memperbaiki sistem kendaraan ringan",
      "Menerapkan prosedur perawatan",
      "Memelihara komponen sistem kerja mesin",
    ],
    pathwayExamples: [
      "Industri otomotif",
      "Mekanik",
      "Operator alat berat",
      "Wirausaha",
      "Sektor swasta",
    ],
    banner: {
      src: "/images/school/tkr.webp",
      alt: "Banner jurusan Teknik Kendaraan Ringan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "teknik-sepeda-motor",
    code: "TSM",
    name: "Teknik Sepeda Motor",
    group: "Otomotif",
    description: "Mempelajari pemeriksaan, perawatan, dan perbaikan sistem sepeda motor.",
    focus: ["Sepeda motor", "Diagnosis", "Perawatan"],
    accent: "yellow",
    overview:
      "Teknik Sepeda Motor berfokus pada pemeriksaan, perawatan, dan perbaikan sistem sepeda motor serta penerapan keselamatan kerja di bengkel.",
    learningLabel: "Fokus pembelajaran",
    learningAreas: [
      "Dasar mesin dan sistem sepeda motor",
      "Perawatan mesin, sasis, dan sistem kelistrikan",
      "Diagnosis gangguan dan perbaikan",
      "Keselamatan kerja dan layanan bengkel",
    ],
    pathwayExamples: [
      "Mekanik sepeda motor",
      "Teknisi bengkel",
      "Service advisor tingkat pemula",
      "Wirausaha bengkel",
    ],
    banner: {
      src: "/images/school/teaching-factory-motor.webp",
      alt: "Ruang praktik layanan sepeda motor SMK Negeri 2 Surabaya",
    },
    sourceNote:
      "Banner TSM pada arsip sekolah memuat materi TKR. Ringkasan TSM pada halaman ini disajikan sebagai orientasi umum bidang dan perlu dikonfirmasi kembali dengan tim jurusan.",
  },
  {
    slug: "teknik-komputer-dan-jaringan",
    code: "TKJ",
    name: "Teknik Komputer dan Jaringan",
    group: "Digital & Kreatif",
    description: "Mempelajari perakitan komputer dan administrasi infrastruktur jaringan.",
    focus: ["Komputer", "Routing", "Jaringan"],
    accent: "yellow",
    overview:
      "TKJ mempelajari cara merakit komputer, memasang program komputer, dan mengelola infrastruktur jaringan.",
    learningLabel: "Kegiatan",
    learningAreas: [
      "Administrasi infrastruktur jaringan",
      "Praktikum routing dinamis dengan protokol OSPF",
      "Konfigurasi routing dinamis dengan protokol RIP",
      "Perakitan dan instalasi program komputer",
    ],
    pathwayExamples: [
      "Teknisi",
      "Marketer atau sales",
      "Pegawai negeri sipil",
      "Desainer",
      "Programmer",
      "System analyst",
      "Network administrator",
      "Game developer",
    ],
    banner: {
      src: "/images/school/tkj.webp",
      alt: "Banner jurusan Teknik Komputer dan Jaringan SMK Negeri 2 Surabaya",
    },
  },
  {
    slug: "rekayasa-perangkat-lunak",
    code: "RPL",
    name: "Rekayasa Perangkat Lunak",
    group: "Digital & Kreatif",
    description: "Mempelajari proses pengembangan perangkat lunak, web, dan aplikasi bergerak.",
    focus: ["Web", "Aplikasi bergerak", "Pemrograman"],
    accent: "blue",
    overview:
      "RPL merupakan bidang yang mendalami cara pengembangan perangkat lunak.",
    learningLabel: "Kegiatan",
    learningAreas: [
      "Pemrograman web",
      "Pemrograman perangkat bergerak",
      "Pemrograman berbasis objek",
    ],
    pathwayExamples: [
      "Software engineer atau programmer",
      "Mobile computing developer",
      "IT consultant",
      "System analyst",
      "Game developer",
      "Software tester",
    ],
    banner: {
      src: "/images/school/rpl.webp",
      alt: "Banner jurusan Rekayasa Perangkat Lunak SMK Negeri 2 Surabaya",
    },
  },
] as const;

export const majorPreviews: readonly MajorPreview[] = majorDetails;

export const majorCatalog: readonly MajorCatalogItem[] = majorDetails.map(
  ({ code, name, group, slug }) => ({ code, name, group, slug }),
);

export function getMajorBySlug(slug: string) {
  return majorDetails.find((major) => major.slug === slug);
}
