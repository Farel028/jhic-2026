export type AdmissionProgramStatistic = {
  program: string;
  academicQuota: number;
  highestScore: number;
  lowestScore: number;
};

export type AdmissionSnapshot = {
  year: "2025" | "2026";
  status: "available" | "awaiting";
  statusLabel: string;
  description: string;
  scoreMethod: string;
  sourceLabel: string;
  sourceUrl: string;
  verificationNote: string;
  programs: readonly AdmissionProgramStatistic[];
};

export const admissionSnapshots: readonly AdmissionSnapshot[] = [
  {
    year: "2026",
    status: "awaiting",
    statusLabel: "Menunggu rekap sekolah",
    description:
      "Rangkaian SPMB Jawa Timur 2026 telah selesai, tetapi rekap final khusus SMKN 2 Surabaya belum tersedia dalam sumber publik yang dapat diverifikasi.",
    scoreMethod:
      "Untuk lulusan 2026, nilai kemampuan akademik menggunakan 60% rerata rapor dan 40% rerata TKA.",
    sourceLabel: "Ketentuan resmi SPMB Jatim 2026",
    sourceUrl: "https://spmbjatim.net/informasi/ketentuan/index.html?jalur=akademik",
    verificationNote:
      "Data akan ditampilkan setelah jumlah diterima, daftar ulang, dan rentang nilai per program dikonfirmasi sekolah.",
    programs: [],
  },
  {
    year: "2025",
    status: "available",
    statusLabel: "Arsip sementara",
    description:
      "Rentang nilai dan pagu jalur nilai prestasi akademik per program keahlian pada SPMB 2025.",
    scoreMethod:
      "Nilai pada tabel hanya mewakili jalur nilai prestasi akademik dan tidak dapat disamakan dengan seluruh jalur penerimaan.",
    sourceLabel: "Rekap publik SPMB 2025",
    sourceUrl: "https://id.scribd.com/document/905888524/MAN-20250410-135659-0000",
    verificationNote:
      "Angka diterima dan daftar ulang belum ditampilkan karena masih membutuhkan konfirmasi sekolah. Nilai historis bukan passing grade untuk tahun berikutnya.",
    programs: [
      { program: "Animasi", academicQuota: 43, highestScore: 90.75, lowestScore: 89.26 },
      { program: "Desain Pemodelan dan Informasi Bangunan", academicQuota: 43, highestScore: 91.17, lowestScore: 89.42 },
      { program: "Rekayasa Perangkat Lunak", academicQuota: 66, highestScore: 91.01, lowestScore: 90.12 },
      { program: "Teknik Audio Video", academicQuota: 43, highestScore: 90.05, lowestScore: 89.03 },
      { program: "Teknik Elektronika Industri", academicQuota: 21, highestScore: 90.64, lowestScore: 89.19 },
      { program: "Teknik Instalasi Tenaga Listrik", academicQuota: 66, highestScore: 90.58, lowestScore: 89.15 },
      { program: "Teknik Kendaraan Ringan", academicQuota: 43, highestScore: 90.92, lowestScore: 89.65 },
      { program: "Teknik Komputer dan Jaringan", academicQuota: 43, highestScore: 91.04, lowestScore: 89.71 },
      { program: "Teknik Konstruksi dan Perumahan", academicQuota: 43, highestScore: 90.06, lowestScore: 89.02 },
      { program: "Teknik Pemesinan", academicQuota: 66, highestScore: 91.16, lowestScore: 88.96 },
      { program: "Teknik Sepeda Motor", academicQuota: 43, highestScore: 90.51, lowestScore: 89.11 },
    ],
  },
] as const;
