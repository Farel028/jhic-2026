export const aboutSource = {
  profile: "https://web.smkn2sby.sch.id/read/2/profil",
  industryVisit:
    "https://web.smkn2sby.sch.id/read/95/kegiatan-kunjungan-industri-smk-n-2-surabaya-ke-pocari-dan-tvri-tahun-2025",
  campusExpo:
    "https://web.smkn2sby.sch.id/read/146/campus-expo-smkn-2-surabaya-membuka-wawasan-menuju-dunia-perguruan-tinggi",
  globalCareer:
    "https://web.smkn2sby.sch.id/read/144/sosialisasi-kebekerjaan-luar-negeri-membuka-peluang-karier-global-bagi-siswa-smkn-2-surabaya",
  character:
    "https://web.smkn2sby.sch.id/read/147/penyaluran-zakat-fitrah-wujud-kepedulian-keluarga-besar-smk-negeri-2-surabaya-di-bulan-ramadan",
} as const;

export const aboutNavigation = [
  { label: "Ringkasan", href: "/tentang" },
  { label: "Profil", href: "/tentang/profil" },
  { label: "Kurikulum", href: "/tentang/kurikulum" },
  { label: "Fasilitas", href: "/tentang/fasilitas" },
  { label: "Sejarah", href: "/tentang/sejarah" },
  { label: "Visi & Misi", href: "/tentang/visi-misi" },
] as const;

export const aboutImages = {
  industryVisit: {
    src: "/images/school/kunjungan-industri-2025.jpg",
    alt: "Rombongan siswa SMK Negeri 2 Surabaya saat kunjungan industri tahun 2025",
    caption: "Kunjungan industri siswa SMK Negeri 2 Surabaya, 2025.",
    href: aboutSource.industryVisit,
  },
  campusExpo: {
    src: "/images/school/campus-expo-2026.jpg",
    alt: "Warga sekolah berfoto bersama dalam kegiatan sekolah tahun 2026",
    caption: "Dokumentasi kegiatan Campus Expo SMK Negeri 2 Surabaya, 2026.",
    href: aboutSource.campusExpo,
  },
  globalCareer: {
    src: "/images/school/karier-global-2026.jpg",
    alt: "Siswa dan narasumber berfoto bersama setelah kegiatan sosialisasi karier",
    caption: "Sosialisasi peluang karier global bagi siswa, 2026.",
    href: aboutSource.globalCareer,
  },
} as const;

export const schoolIdentity = [
  { label: "Nama", value: "SMK Negeri 2 Surabaya" },
  { label: "NPSN", value: "20532203" },
  { label: "Status", value: "Sekolah negeri" },
  { label: "Akreditasi", value: "A" },
  { label: "Alamat", value: "Jl. Tentara Genie Pelajar No. 26, Surabaya" },
  { label: "Akar sejarah", value: "Sekitar 1912" },
] as const;

export const learningApproach = [
  {
    number: "01",
    title: "Fondasi",
    description:
      "Pengetahuan dasar, karakter, keselamatan kerja, dan kebiasaan belajar yang kuat.",
  },
  {
    number: "02",
    title: "Keterampilan",
    description:
      "Latihan terarah untuk memahami alat, proses, standar, dan teknologi sesuai bidang.",
  },
  {
    number: "03",
    title: "Proyek",
    description:
      "Penerapan kompetensi melalui karya, kolaborasi, dan penyelesaian masalah nyata.",
  },
  {
    number: "04",
    title: "Industri",
    description:
      "Paparan dunia kerja melalui kunjungan, praktik lapangan, mitra, dan budaya profesional.",
  },
  {
    number: "05",
    title: "Langkah lanjut",
    description:
      "Persiapan untuk bekerja, berwirausaha, atau melanjutkan pendidikan sesuai tujuan murid.",
  },
] as const;

export const historyTimeline = [
  {
    period: "Sekitar 1912–1942",
    title: "Berawal sebagai KES",
    description:
      "Sumber sekolah mencatat awal lembaga ini dengan nama KES (Koningen Emma School) pada masa Hindia Belanda.",
  },
  {
    period: "Sekitar 1921",
    title: "Lulusan awal bidang bangunan",
    description:
      "Lulusan pertama diperkirakan hadir sekitar 1921 dari bidang Bangunan Gedung dan Bangunan Air.",
  },
  {
    period: "Masa pendudukan Jepang",
    title: "Kogyo Gakko",
    description:
      "Sekolah tercatat bernama Kogyo Gakko atau Kogyo Senmon Gakko, setingkat sekolah teknologi menengah.",
  },
  {
    period: "Masa peralihan kemerdekaan",
    title: "Ruang belajar dan ruang perjuangan",
    description:
      "Riwayat sekolah menyebut kompleks ini pernah digunakan sebagai Markas Tentara Pelajar. Informasi nama sekolah pada sebagian masa peralihan masih terbatas.",
  },
  {
    period: "Setelah pengakuan kedaulatan",
    title: "STM 1 Surabaya",
    description:
      "Setelah sempat bernama MTS pada masa Belanda kembali berkuasa, sekolah kemudian dikenal sebagai Sekolah Teknologi Menengah atau STM 1 Surabaya.",
  },
  {
    period: "Kini",
    title: "SMK Negeri 2 Surabaya",
    description:
      "Identitasnya berkembang menjadi sekolah menengah kejuruan negeri dengan beragam bidang teknologi, industri, konstruksi, otomotif, dan kreatif.",
  },
] as const;

export const directionThemes = [
  {
    code: "KOMPETEN",
    title: "Keterampilan yang dapat diterapkan",
    description:
      "Pembelajaran vokasi diarahkan agar pengetahuan bertemu praktik dan menghasilkan kemampuan yang relevan.",
  },
  {
    code: "KARAKTER",
    title: "Tumbuh sebagai manusia yang peduli",
    description:
      "Kedisiplinan, tanggung jawab, kolaborasi, dan kepedulian sosial menjadi bagian dari pengalaman belajar.",
  },
  {
    code: "TERHUBUNG",
    title: "Dekat dengan industri dan masyarakat",
    description:
      "Kunjungan, praktik kerja, kolaborasi, dan kegiatan sosial membuka konteks nyata di luar kelas.",
  },
  {
    code: "BERTUMBUH",
    title: "Siap memilih langkah setelah lulus",
    description:
      "Murid dikenalkan pada jalur kerja, kewirausahaan, sertifikasi, dan pendidikan lanjutan.",
  },
] as const;

export const curriculumSources = {
  merdekaWorkshop:
    "https://web.smkn2sby.sch.id/read/52/kegiatan-workshop-iht-implementasi-kurikulum-merdeka-program-smk-pk-smkn-2-surabaya",
  industryAlignment:
    "https://web.smkn2sby.sch.id/read/58/workshop-sinkronisasi-kurikulum-bersama-dunia-usaha-dan-industri-dudi",
  studentProject:
    "https://web.smkn2sby.sch.id/read/90/jurusan-rpl-smk-negeri-2-surabaya-ikuti-kegiatan-expose-dan-expose-jatim-2024",
  internshipPreparation:
    "https://web.smkn2sby.sch.id/read/121/smk-negeri-2-surabaya-melaksanakan-sosialisai-bpjs-ketenagakerjaan-untuk-persiapan-pkl-20252026",
  competencyTest:
    "https://web.smkn2sby.sch.id/read/33/uji-kompetensi-keahlian-bagi-kelas-xi-tbsm",
  campusExpo: aboutSource.campusExpo,
} as const;

export const curriculumJourney = [
  {
    number: "01",
    label: "Foundation",
    title: "Fondasi belajar",
    description:
      "Pengetahuan umum, dasar kejuruan, karakter, keselamatan, dan kebiasaan belajar menjadi titik awal.",
    evidence: "Implementasi Kurikulum Merdeka",
    href: curriculumSources.merdekaWorkshop,
    tone: "blue",
  },
  {
    number: "02",
    label: "Skill Development",
    title: "Pengembangan keterampilan",
    description:
      "Murid berlatih menggunakan metode, alat, dan teknologi sesuai bidang melalui latihan bertahap.",
    evidence: "Sinkronisasi kurikulum dengan DUDI",
    href: curriculumSources.industryAlignment,
    tone: "light",
  },
  {
    number: "03",
    label: "Industry Project",
    title: "Proyek dan karya",
    description:
      "Kompetensi diterapkan untuk merancang solusi, membuat produk, bekerja dalam tim, dan mempresentasikan hasil.",
    evidence: "Pameran proyek perangkat lunak siswa",
    href: curriculumSources.studentProject,
    tone: "yellow",
  },
  {
    number: "04",
    label: "Internship",
    title: "Praktik kerja lapangan",
    description:
      "Murid mengenal tanggung jawab, perlindungan kerja, standar, dan budaya profesional di lingkungan mitra.",
    evidence: "Persiapan PKL tahun 2025/2026",
    href: curriculumSources.internshipPreparation,
    tone: "dark",
  },
  {
    number: "05",
    label: "Assessment",
    title: "Uji kompetensi",
    description:
      "Kemampuan teknis dan nonteknis dievaluasi melalui asesmen atau uji kompetensi sesuai konteks program.",
    evidence: "UKK bersama penguji DUDI",
    href: curriculumSources.competencyTest,
    tone: "blue",
  },
  {
    number: "06",
    label: "Next Step",
    title: "Kerja, usaha, atau kuliah",
    description:
      "Murid menyiapkan pilihan setelah lulus melalui informasi karier, kewirausahaan, dan pendidikan lanjutan.",
    evidence: "Campus Expo 2026",
    href: curriculumSources.campusExpo,
    tone: "light",
  },
] as const;

export const learningModes = [
  {
    number: "01",
    title: "Memahami",
    description: "Membangun konsep, bahasa teknis, dan alasan di balik setiap proses.",
  },
  {
    number: "02",
    title: "Mencoba",
    description: "Berlatih secara bertahap dengan alat, prosedur, dan umpan balik.",
  },
  {
    number: "03",
    title: "Membuat",
    description: "Menghasilkan karya atau solusi melalui proyek individu maupun kolaboratif.",
  },
  {
    number: "04",
    title: "Merefleksikan",
    description: "Menilai hasil, memperbaiki proses, dan menghubungkannya dengan tujuan berikutnya.",
  },
] as const;

export const facilitySources = {
  electricityLab:
    "https://web.smkn2sby.sch.id/read/103/kegiatan-hibah-alat-dari-cv-dar-al-ilmi-ke-jurusan-listrik-smkn-2-surabaya",
  automotiveWorkshop:
    "https://web.smkn2sby.sch.id/read/97/kegiatan-tes-praktik-htec-siswa-jurusan-otomotif-smk-n-2-surabaya",
  teachingFactory:
    "https://web.smkn2sby.sch.id/read/6/teaching-factory-smkn-2-sby-bengkel-motor",
  library: aboutSource.profile,
  hall:
    "https://web.smkn2sby.sch.id/read/34/persiapan-tahun-pelajaran-20222023-dengan-workshop-implementasi-kurikulum-merdeka-bagi-guru-smkn-2-surabaya",
} as const;

export const facilityImages = {
  electricityLab: {
    src: "/images/school/fasilitas-listrik-2025.jpeg",
    alt: "Peralatan praktik kelistrikan bersama guru SMK Negeri 2 Surabaya",
    caption: "Peralatan praktik untuk pembelajaran kelistrikan di ruang BL-3, 2025.",
    href: facilitySources.electricityLab,
  },
  automotiveWorkshop: {
    src: "/images/school/bengkel-otomotif-2025.jpeg",
    alt: "Siswa melaksanakan tes praktik pada kendaraan di bengkel otomotif sekolah",
    caption: "Tes praktik HTEC di bengkel otomotif SMK Negeri 2 Surabaya, 2025.",
    href: facilitySources.automotiveWorkshop,
  },
  teachingFactory: {
    src: "/images/school/teaching-factory-motor.jpg",
    alt: "Peralatan servis di Teaching Factory bengkel motor TGP 26",
    caption: "Area Teaching Factory bengkel motor TGP 26.",
    href: facilitySources.teachingFactory,
  },
} as const;

export const verifiedFacilities = [
  {
    code: "BL-3",
    category: "Ruang praktik",
    title: "Praktik kelistrikan",
    description:
      "Ruang BL-3 terdokumentasi sebagai lokasi pembelajaran dan pelatihan penggunaan alat ukur serta perangkat instalasi kelistrikan.",
    status: "Foto & lokasi ruang terverifikasi",
    href: facilitySources.electricityLab,
  },
  {
    code: "HTEC",
    category: "Bengkel",
    title: "Praktik otomotif",
    description:
      "Bengkel praktik digunakan untuk evaluasi keterampilan perawatan, sistem kelistrikan, mesin, dan diagnosis kendaraan.",
    status: "Foto & aktivitas terverifikasi",
    href: facilitySources.automotiveWorkshop,
  },
  {
    code: "TGP 26",
    category: "Teaching Factory",
    title: "Bengkel motor",
    description:
      "Teaching Factory otomotif menghubungkan pembelajaran, standar layanan bengkel, pendampingan guru, dan mekanik berpengalaman.",
    status: "Foto & fungsi terverifikasi",
    href: facilitySources.teachingFactory,
  },
  {
    code: "ABDUL AZIS",
    category: "Literasi",
    title: "Perpustakaan sekolah",
    description:
      "Laman sejarah sekolah mencatat perpustakaan bernama Abdul Azis sebagai bagian dari pengembangan kompleks sekolah.",
    status: "Keberadaan tercatat · foto menyusul",
    href: facilitySources.library,
  },
  {
    code: "AULA",
    category: "Ruang bersama",
    title: "Aula sekolah",
    description:
      "Aula terdokumentasi sebagai tempat workshop dan kegiatan bersama warga sekolah.",
    status: "Fungsi tercatat · foto khusus menyusul",
    href: facilitySources.hall,
  },
] as const;

export const campusOrientation = [
  {
    number: "01",
    title: "Informasi & layanan",
    description: "Titik awal bagi tamu untuk memperoleh arahan dan menghubungi sekolah.",
    target: "#kunjungan",
  },
  {
    number: "02",
    title: "Ruang belajar umum",
    description: "Area kegiatan kelas dan pembelajaran lintas mata pelajaran.",
    target: "#katalog-fasilitas",
  },
  {
    number: "03",
    title: "Area praktik keahlian",
    description: "Ruang praktik, laboratorium, bengkel, dan Teaching Factory.",
    target: "#galeri-praktik",
  },
  {
    number: "04",
    title: "Ruang kegiatan bersama",
    description: "Area untuk kegiatan sekolah, literasi, organisasi, dan kebersamaan.",
    target: "#katalog-fasilitas",
  },
] as const;
