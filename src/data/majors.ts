export type MajorPreview = {
  slug: string;
  code: string;
  name: string;
  description: string;
  focus: readonly string[];
  accent: "blue" | "yellow";
};

export type MajorDetail = MajorPreview & {
  overview: string;
  learningAreas: readonly string[];
  pathwayExamples: readonly string[];
  evidence: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    linkLabel: string;
  };
  officialProfile: string;
};

export type MajorCatalogItem = {
  code: string;
  name: string;
  group: "Digital & Kreatif" | "Konstruksi" | "Elektronika & Listrik" | "Manufaktur" | "Otomotif";
  slug?: MajorDetail["slug"];
};

export const majorDetails: readonly MajorDetail[] = [
  {
    slug: "rekayasa-perangkat-lunak",
    code: "RPL",
    name: "Rekayasa Perangkat Lunak",
    description:
      "Mempelajari proses merancang, membangun, menguji, dan mengembangkan perangkat lunak.",
    focus: ["Pemrograman", "Aplikasi web", "Basis data"],
    accent: "blue",
    overview:
      "RPL cocok bagi murid yang tertarik memecahkan masalah melalui logika dan teknologi. Proses belajarnya bergerak dari memahami kebutuhan pengguna sampai menghasilkan aplikasi yang dapat diuji dan dikembangkan.",
    learningAreas: [
      "Logika, algoritma, dan dasar pemrograman",
      "Pengembangan aplikasi web dan antarmuka",
      "Perancangan serta pengelolaan basis data",
      "Pengujian, dokumentasi, dan kerja proyek",
    ],
    pathwayExamples: [
      "Pengembang perangkat lunak tingkat pemula",
      "Penguji kualitas perangkat lunak",
      "Teknisi dukungan aplikasi",
      "Studi lanjut bidang informatika",
    ],
    evidence: {
      eyebrow: "Jejak kegiatan 2025",
      title: "Belajar menghubungkan perangkat lunak dan perangkat keras.",
      description:
        "Siswa RPL mengikuti workshop Arduino IDE dan Proteus untuk berlatih pemrograman mikrokontroler serta simulasi rangkaian.",
      href: "https://web.smkn2sby.sch.id/read/100/workshop-simulasi-software-arduino-ide-dan-proteus-di-smk-n-2-surabaya",
      linkLabel: "Baca liputan workshop",
    },
    officialProfile: "https://web.smkn2sby.sch.id/read/125/rekayasa-perangkat-lunak",
  },
  {
    slug: "animasi",
    code: "ANI",
    name: "Animasi",
    description:
      "Menggabungkan kemampuan visual, cerita, dan teknologi untuk menghasilkan karya animasi.",
    focus: ["Visual story", "2D & 3D", "Motion"],
    accent: "yellow",
    overview:
      "Animasi mempertemukan cara bercerita, kepekaan visual, dan proses produksi digital. Murid belajar mengolah ide menjadi rangkaian visual yang komunikatif melalui latihan dan proyek.",
    learningAreas: [
      "Dasar visual, komposisi, dan storytelling",
      "Perancangan karakter dan storyboard",
      "Produksi animasi dua dan tiga dimensi",
      "Penyuntingan, motion, dan presentasi karya",
    ],
    pathwayExamples: [
      "Animator tingkat pemula",
      "Storyboard artist",
      "Motion graphic designer",
      "Studi lanjut bidang desain dan multimedia",
    ],
    evidence: {
      eyebrow: "Jejak kegiatan 2025",
      title: "Mendekatkan proses belajar dengan dunia kreatif.",
      description:
        "Siswa kelas XII Animasi mengikuti workshop bersama DKV ITS yang membahas keterampilan, studi lanjut, dan praktik animasi sederhana.",
      href: "https://web.smkn2sby.sch.id/read/109/smk-negeri-2-surabaya-sukses-gelar-workshop-inspiratif-bersama-prodi-dkv-its-untuk-siswa-animasi",
      linkLabel: "Baca liputan workshop",
    },
    officialProfile: "https://web.smkn2sby.sch.id/read/123/animasi",
  },
  {
    slug: "desain-pemodelan-informasi-bangunan",
    code: "DPIB",
    name: "Desain Pemodelan & Informasi Bangunan",
    description:
      "Mempelajari gambar teknik dan pemodelan informasi untuk perencanaan bangunan.",
    focus: ["Gambar teknik", "Pemodelan", "Perencanaan"],
    accent: "blue",
    overview:
      "DPIB mengajak murid menerjemahkan kebutuhan ruang dan bangunan ke dalam gambar serta model yang terukur. Ketelitian, cara berpikir spasial, dan komunikasi teknis menjadi bagian penting dari prosesnya.",
    learningAreas: [
      "Gambar teknik dan pembacaan dokumen bangunan",
      "Pemodelan informasi bangunan",
      "Dasar pengukuran dan perencanaan ruang",
      "Presentasi gambar serta kerja proyek",
    ],
    pathwayExamples: [
      "Drafter bangunan tingkat pemula",
      "Operator pemodelan bangunan",
      "Asisten pelaksana atau pengawas lapangan",
      "Studi lanjut bidang arsitektur dan teknik sipil",
    ],
    evidence: {
      eyebrow: "Jejak kegiatan 2025",
      title: "Melihat penerapan teknologi konstruksi di lapangan.",
      description:
        "Siswa DPIB mengikuti kunjungan industri ke proyek Tol Probowangi untuk melihat proses konstruksi dan penerapan Building Information Modeling.",
      href: "https://web.smkn2sby.sch.id/read/111/kunjungan-industri-program-keahlian-tkp-dpib-dan-kgsp-smkn-2-surabaya-ke-proyek-pembangunan-tol-probowangi-tahap-ii",
      linkLabel: "Baca liputan kunjungan",
    },
    officialProfile: "https://web.smkn2sby.sch.id/read/3/kompetensi-keahlian",
  },
  {
    slug: "teknik-komputer-dan-jaringan",
    code: "TKJ",
    name: "Teknik Komputer & Jaringan",
    description:
      "Mempelajari perangkat komputer, jaringan, dan layanan infrastruktur digital.",
    focus: ["Jaringan", "Server", "Infrastruktur"],
    accent: "yellow",
    overview:
      "TKJ berfokus pada cara perangkat saling terhubung dan layanan digital dapat berjalan dengan baik. Murid berlatih menangani perangkat, konfigurasi jaringan, serta pemeliharaan infrastruktur dasar.",
    learningAreas: [
      "Perakitan dan perawatan perangkat komputer",
      "Konfigurasi jaringan kabel dan nirkabel",
      "Layanan server dan administrasi sistem dasar",
      "Pemecahan masalah serta keamanan jaringan dasar",
    ],
    pathwayExamples: [
      "Teknisi komputer dan jaringan",
      "Administrator jaringan tingkat pemula",
      "Teknisi dukungan infrastruktur TI",
      "Studi lanjut bidang jaringan dan sistem informasi",
    ],
    evidence: {
      eyebrow: "Program pendukung",
      title: "Terhubung dengan pembelajaran jaringan berstandar industri.",
      description:
        "SMK Negeri 2 Surabaya tercatat sebagai training partner MikroTik Academy dengan materi konfigurasi jaringan, routing, firewall, wireless, VPN, dan QoS.",
      href: "https://web.smkn2sby.sch.id/read/9/mikrotik-academy",
      linkLabel: "Lihat informasi MikroTik Academy",
    },
    officialProfile: "https://web.smkn2sby.sch.id/read/124/teknik-komputer-dan-jaringan",
  },
] as const;

export const majorPreviews: readonly MajorPreview[] = majorDetails;

export const majorCatalog: readonly MajorCatalogItem[] = [
  { code: "ANI", name: "Animasi", group: "Digital & Kreatif", slug: "animasi" },
  { code: "DPIB", name: "Desain Pemodelan dan Informasi Bangunan", group: "Konstruksi", slug: "desain-pemodelan-informasi-bangunan" },
  { code: "TKP", name: "Teknik Konstruksi dan Perumahan", group: "Konstruksi" },
  { code: "TAV", name: "Teknik Audio Video", group: "Elektronika & Listrik" },
  { code: "TEI", name: "Teknik Elektronika Industri", group: "Elektronika & Listrik" },
  { code: "TITL", name: "Teknik Instalasi Tenaga Listrik", group: "Elektronika & Listrik" },
  { code: "TPM", name: "Teknik Pemesinan", group: "Manufaktur" },
  { code: "TKR", name: "Teknik Kendaraan Ringan", group: "Otomotif" },
  { code: "TSM", name: "Teknik Sepeda Motor", group: "Otomotif" },
  { code: "TKJ", name: "Teknik Komputer dan Jaringan", group: "Digital & Kreatif", slug: "teknik-komputer-dan-jaringan" },
  { code: "RPL", name: "Rekayasa Perangkat Lunak", group: "Digital & Kreatif", slug: "rekayasa-perangkat-lunak" },
] as const;

export function getMajorBySlug(slug: string) {
  return majorDetails.find((major) => major.slug === slug);
}
