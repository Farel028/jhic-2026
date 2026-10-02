import { school } from "@/config/school";

export const pklBenefits = [
  {
    title: "Pengalaman kerja nyata",
    description:
      "Siswa mengerjakan tugas sungguhan di perusahaan, bukan sekadar latihan di kelas.",
  },
  {
    title: "Bekal portofolio",
    description:
      "Hasil kerja selama PKL menjadi bukti kemampuan saat melamar kerja atau lanjut kuliah.",
  },
  {
    title: "Jejaring industri",
    description:
      "Siswa dikenal dan mengenal dunia kerja sebelum lulus.",
  },
] as const;

export const pklStages = [
  {
    title: "Persiapan",
    description:
      "Sekolah memberi pembekalan, memetakan tempat praktik, dan menerbitkan surat pengantar untuk tiap siswa.",
  },
  {
    title: "Pelaksanaan",
    description:
      "Siswa bekerja di tempat praktik, menulis jurnal harian, dan dipantau guru pembimbing.",
  },
  {
    title: "Pelaporan",
    description:
      "Siswa menyusun laporan akhir dari jurnalnya, lalu mempresentasikannya dalam sidang.",
  },
] as const;

export const pklRoles = [
  {
    title: "Siswa",
    description:
      "Mengikuti tata tertib tempat praktik, mengisi jurnal jujur setiap hari, dan menyelesaikan laporan.",
  },
  {
    title: "Guru pembimbing",
    description:
      "Mengantar ke tempat praktik, memantau lewat kunjungan dan jurnal, serta menguji laporan.",
  },
  {
    title: "Perusahaan",
    description:
      "Memberi tugas sesuai kompetensi, menunjuk pendamping lapangan, dan menilai kinerja siswa.",
  },
] as const;

// Daftar contoh untuk prototype, bukan daftar resmi sekolah.
export const pklDocuments = [
  "Surat pengantar PKL dari sekolah (contoh)",
  "Jurnal harian kegiatan (contoh)",
  "Lembar monitoring pembimbing (contoh)",
  "Laporan akhir dan materi sidang (contoh)",
] as const;

export const pklFaq = [
  {
    question: "Kapan PKL dilaksanakan?",
    answer:
      "PKL mengikuti kalender akademik sekolah. Tanyakan jadwal angkatanmu ke wali kelas atau guru pembimbing.",
  },
  {
    question: "Bolehkah memilih tempat praktik sendiri?",
    answer:
      "Bisa diusulkan, tetapi penetapannya lewat sekolah agar tempatnya sesuai kompetensi jurusan.",
  },
  {
    question: "Bagaimana bila sakit atau berhalangan saat PKL?",
    answer:
      "Segera kabari pendamping lapangan dan guru pembimbing. Kekurangan hari diganti sesuai aturan sekolah.",
  },
  {
    question: "Apakah PKL dipungut biaya?",
    answer:
      "Konfirmasi ke sekolah untuk ketentuan angkatan berjalan. Waspadai pihak yang meminta bayaran di luar sekolah.",
  },
] as const;

export const pklContact = {
  portal: school.urls.pkl,
  portalLabel: "Portal e-PKL",
  tutorial: "https://youtu.be/ANuYSj3V-6Y",
  tutorialLabel: "Video tutorial pengisian E-PKL",
} as const;
