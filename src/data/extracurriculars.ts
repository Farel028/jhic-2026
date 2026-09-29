export type ExtracurricularCategory =
  | "Olahraga"
  | "Seni & Kreativitas"
  | "Kedisiplinan & Kepemimpinan"
  | "Kerohanian"
  | "Teknologi & Media";

export type ExtracurricularDetail = {
  slug: string;
  name: string;
  short: string;
  category: ExtracurricularCategory;
  description: string;
  /** Placeholder, diisi manual oleh tim sekolah. */
  schedule: string;
  location: string;
  coach: string;
  instagram: string;
  instagramUrl: string;
  materials: readonly string[];
  achievements: readonly string[];
};

/**
 * Daftar awal 14 ekstrakurikuler dari jadwal penampilan MPLS 2026.
 * Jadwal, pembina, lokasi, dan IG masih placeholder dan wajib diisi manual.
 * Jangan mempublikasikan prestasi tanpa sumber terverifikasi.
 */
export const extracurricularDetails: readonly ExtracurricularDetail[] = [
  {
    slug: "paskibra",
    name: "Paskibra",
    short: "PSK",
    category: "Kedisiplinan & Kepemimpinan",
    description:
      "Ekstrakurikuler baris-berbaris dan kepemimpinan yang tampil pada apel dan upacara sekolah.",
    schedule: "Jadwal latihan menyusul",
    location: "Lapangan sekolah",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Baris-berbaris", "Kedisiplinan", "Kepemimpinan"],
    achievements: [],
  },
  {
    slug: "pecinta-alam",
    name: "Pecinta Alam",
    short: "PA",
    category: "Kedisiplinan & Kepemimpinan",
    description:
      "Wadah siswa untuk kegiatan alam, survival dasar, dan kepedulian lingkungan.",
    schedule: "Jadwal latihan menyusul",
    location: "Sekretariat ekskul",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Navigasi dasar", "Survival dasar", "Konservasi lingkungan"],
    achievements: [],
  },
  {
    slug: "pramuka",
    name: "Pramuka",
    short: "PRM",
    category: "Kedisiplinan & Kepemimpinan",
    description:
      "Gerakan kepanduan untuk melatih kemandirian, kerja sama, dan keterampilan kepramukaan.",
    schedule: "Jadwal latihan menyusul",
    location: "Lapangan sekolah",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Kepramukaan", "Tali-temali", "Kepemimpinan regu"],
    achievements: [],
  },
  {
    slug: "band",
    name: "Band",
    short: "BND",
    category: "Seni & Kreativitas",
    description:
      "Ekstrakurikuler musik untuk mengasah permainan alat musik dan tampil di acara sekolah.",
    schedule: "Jadwal latihan menyusul",
    location: "Ruang musik",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Dasar musik", "Aransemen", "Tampil panggung"],
    achievements: [],
  },
  {
    slug: "pencak-silat",
    name: "Pencak Silat",
    short: "PS",
    category: "Olahraga",
    description:
      "Seni bela diri tradisional untuk melatih fisik, teknik, dan sportivitas.",
    schedule: "Jadwal latihan menyusul",
    location: "Aula / lapangan",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Teknik dasar", "Jurus", "Fisik dan mental"],
    achievements: [],
  },
  {
    slug: "voli",
    name: "Voli",
    short: "VOL",
    category: "Olahraga",
    description:
      "Tim bola voli yang rutin bertanding antar pelajar, termasuk Smandela Cup 2022.",
    schedule: "Jadwal latihan menyusul",
    location: "Lapangan voli",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Passing dan servis", "Smash dan block", "Strategi tim"],
    achievements: ["Juara Harapan 1 Smandela Cup 2022 (putra, perlu verifikasi arsip)"],
  },
  {
    slug: "basket",
    name: "Basket",
    short: "BST",
    category: "Olahraga",
    description:
      "Tim basket yang aktif di kompetisi pelajar Surabaya dan Jawa Timur.",
    schedule: "Jadwal latihan menyusul",
    location: "Lapangan basket",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Dribbling dan shooting", "Defense", "Strategi tim"],
    achievements: ["Juara 1 Basket Putra Smandela Cup 2022 (perlu verifikasi arsip)"],
  },
  {
    slug: "tari-tradisional",
    name: "Tari Tradisional",
    short: "TTR",
    category: "Seni & Kreativitas",
    description:
      "Wadah pelestarian budaya melalui latihan tari tradisional dan pentas seni.",
    schedule: "Jadwal latihan menyusul",
    location: "Aula",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Gerak dasar tari", "Koreografi", "Pentas seni"],
    achievements: [],
  },
  {
    slug: "futsal",
    name: "Futsal",
    short: "FTS",
    category: "Olahraga",
    description:
      "Tim futsal yang rutin bertanding antar pelajar, termasuk Smandela Cup 2022.",
    schedule: "Jadwal latihan menyusul",
    location: "Lapangan futsal",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Kontrol bola", "Passing dan shooting", "Strategi tim"],
    achievements: ["Juara 1 Futsal Smandela Cup 2022 (perlu verifikasi arsip)"],
  },
  {
    slug: "jurnalistik",
    name: "Jurnalistik",
    short: "JRN",
    category: "Teknologi & Media",
    description:
      "Wadah menulis, fotografi, dan publikasi karya jurnalistik siswa SMEKDA.",
    schedule: "Jadwal latihan menyusul",
    location: "Ruang redaksi",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Menulis berita", "Fotografi", "Desain publikasi"],
    achievements: [],
  },
  {
    slug: "robotik",
    name: "Robotik",
    short: "RBT",
    category: "Teknologi & Media",
    description:
      "Ekstrakurikuler teknologi untuk merakit dan memprogram robot serta IoT dasar.",
    schedule: "Jadwal latihan menyusul",
    location: "Lab elektronika",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Elektronika dasar", "Pemrograman", "Perakitan robot"],
    achievements: [],
  },
  {
    slug: "ski",
    name: "SKI",
    short: "SKI",
    category: "Kerohanian",
    description:
      "Sie Kerohanian Islam sebagai wadah pembinaan keagamaan dan kegiatan sosial siswa.",
    schedule: "Jadwal kegiatan menyusul",
    location: "Masjid sekolah",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Kajian rutin", "Keterampilan dakwah", "Bakti sosial"],
    achievements: [],
  },
  {
    slug: "badminton",
    name: "Badminton",
    short: "BDM",
    category: "Olahraga",
    description:
      "Ekstrakurikuler bulu tangkis untuk melatih teknik, fisik, dan sportivitas.",
    schedule: "Jadwal latihan menyusul",
    location: "GOR / lapangan",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Footwork", "Teknik pukulan", "Strategi tunggal dan ganda"],
    achievements: [],
  },
  {
    slug: "dance",
    name: "Dance",
    short: "DNC",
    category: "Seni & Kreativitas",
    description:
      "Wadah modern dance dan koreografi untuk tampil di acara sekolah.",
    schedule: "Jadwal latihan menyusul",
    location: "Aula",
    coach: "Pembina menyusul",
    instagram: "@ekskul_smekda",
    instagramUrl: "https://instagram.com/",
    materials: ["Gerak dasar", "Koreografi", "Tampil panggung"],
    achievements: [],
  },
] as const;

export const extracurricularCatalog = extracurricularDetails.map(
  ({ slug, name, short, category }) => ({ slug, name, short, category }),
);

export const extracurricularCategories = [
  "Semua",
  "Olahraga",
  "Seni & Kreativitas",
  "Kedisiplinan & Kepemimpinan",
  "Teknologi & Media",
  "Kerohanian",
] as const;

export type ExtracurricularCategoryFilter =
  (typeof extracurricularCategories)[number];

export function getExtracurricularBySlug(slug: string) {
  return extracurricularDetails.find((item) => item.slug === slug);
}
