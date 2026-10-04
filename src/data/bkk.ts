import { school } from "@/config/school";

export const bkkFlow = [
  {
    title: "Buka informasi lowongan",
    description: "Pilih lowongan yang sesuai kompetensi melalui portal BKK.",
  },
  {
    title: "Siapkan berkas",
    description: "Siapkan ijazah atau surat keterangan lulus, KTP, dan daftar riwayat hidup.",
  },
  {
    title: "Daftar melalui portal BKK",
    description: "Kirim lamaran lewat portal resmi BKK agar tercatat dan terpantau.",
  },
  {
    title: "Ikuti tes dan penempatan",
    description: "Tunggu panggilan tes dari perusahaan melalui BKK sampai penempatan.",
  },
] as const;

// Angka nyata per laman BKK SMKN 2 Surabaya (bkk.smkn2sby.sch.id).
// Perbarui manual bila laman BKK memublikasikan angka baru.
export const bkkStats = [
  { metric: "296", label: "Lowongan aktif", detail: "Terbuka pada laman BKK saat dirujuk." },
  { metric: "395", label: "Perusahaan terdaftar", detail: "167 di antaranya terikat MOU dengan sekolah." },
  { metric: "6.932", label: "Alumni terdaftar", detail: "1.055 bekerja, 744 kuliah, 74 wirausaha." },
] as const;

export const bkkStatsSource =
  "Angka per laman BKK SMKN 2 Surabaya. Konfirmasi ke kontak BKK untuk data terbaru.";

export const bkkFaq = [
  {
    question: "Apa itu BKK?",
    answer:
      "Bursa Kerja Khusus adalah unit sekolah yang memberi informasi lowongan, menyalurkan lulusan ke perusahaan, dan menyiapkan kesiapan kerja.",
  },
  {
    question: "Siapa yang bisa memakai layanan BKK?",
    answer:
      "Lulusan SMK Negeri 2 Surabaya yang mencari kerja, serta perusahaan yang membutuhkan tenaga lulusan.",
  },
  {
    question: "Bagaimana cara melamar lowongan?",
    answer:
      "Pilih lowongan, siapkan berkas, lalu daftar melalui portal resmi BKK agar lamaran tercatat.",
  },
  {
    question: "Apakah layanan BKK berbayar?",
    answer:
      "Layanan informasi dan penyaluran untuk lulusan tidak dipungut biaya. Konfirmasi ke kontak BKK bila ada pihak yang meminta bayaran.",
  },
  {
    question: "Ke mana bertanya bila lamaran tidak ada kabar?",
    answer:
      "Hubungi kontak BKK di bawah dengan menyebutkan kode lowongan yang dilamar.",
  },
] as const;

export const bkkContact = {
  email: "bkk@smkn2sby.sch.id",
  phone: "031-5343708",
  portal: school.urls.bkk,
  portalLabel: "Portal resmi BKK",
} as const;

export const bkkVideos = [
  {
    title: "Tutorial pengisian tracer study",
    href: "https://youtu.be/y3fno80zasM",
  },
  {
    title: "Tutorial pengisian E-PKL",
    href: "https://youtu.be/ANuYSj3V-6Y",
  },
] as const;
