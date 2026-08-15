import { photoGallery, newsroomItems } from "@/data/documentation";
import { faqItems } from "@/data/information";
import { majorCatalog } from "@/data/majors";
import { studentAchievements, studentWorks } from "@/data/students";
import { toContentId } from "@/lib/content-id";

export type SearchCategory =
  | "Halaman"
  | "Jurusan"
  | "FAQ"
  | "Karya siswa"
  | "Prestasi"
  | "Berita"
  | "Fasilitas"
  | "Staf";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords?: readonly string[];
  featured?: number;
};

const pages: readonly SearchEntry[] = [
  { id: "beranda", title: "Beranda", description: "Ringkasan profil, program, karya, dan kabar terbaru sekolah.", href: "/", category: "Halaman", keywords: ["home", "smekda", "smkn 2 surabaya"], featured: 1 },
  { id: "tentang", title: "Tentang Sekolah", description: "Profil, sejarah, visi misi, kurikulum, fasilitas, dan pimpinan sekolah.", href: "/tentang", category: "Halaman", keywords: ["profil", "sejarah", "visi", "misi"], featured: 5 },
  { id: "profil", title: "Profil Sekolah", description: "Identitas dan gambaran umum SMK Negeri 2 Surabaya.", href: "/tentang/profil", category: "Halaman", keywords: ["npsn", "alamat", "akreditasi"] },
  { id: "sejarah", title: "Sejarah Sekolah", description: "Perjalanan dan akar sejarah pendidikan vokasi sekolah sejak 1912.", href: "/tentang/sejarah", category: "Halaman", keywords: ["1912", "riwayat"] },
  { id: "visi-misi", title: "Visi & Misi", description: "Arah, nilai, dan komitmen pendidikan SMK Negeri 2 Surabaya.", href: "/tentang/visi-misi", category: "Halaman", keywords: ["nilai", "tujuan"] },
  { id: "kurikulum", title: "Kurikulum", description: "Gambaran pembelajaran vokasi, praktik, projek, dan pengalaman industri.", href: "/tentang/kurikulum", category: "Halaman", keywords: ["belajar", "praktik", "industri"] },
  { id: "fasilitas", title: "Fasilitas Sekolah", description: "Orientasi kampus, ruang praktik, bengkel, dan dokumentasi fasilitas.", href: "/tentang/fasilitas", category: "Halaman", keywords: ["laboratorium", "bengkel", "kampus", "ruang"] },
  { id: "kepala-sekolah", title: "Kepala Sekolah", description: "Sambutan Dr. Dhanu Lukmantoro, S.Kom., ST., M.M.", href: "/#sambutan-kepala-sekolah", category: "Staf", keywords: ["pimpinan", "kepsek", "dhanu lukmantoro"] },
  { id: "jurusan", title: "Program Keahlian", description: "Jelajahi katalog program dan fokus belajar setiap jurusan.", href: "/jurusan", category: "Halaman", keywords: ["jurusan", "kompetensi", "keahlian"], featured: 2 },
  { id: "siswa", title: "Siswa", description: "Kegiatan, karya, prestasi, dan pengalaman belajar siswa.", href: "/siswa", category: "Halaman", keywords: ["ekstrakurikuler", "kegiatan", "murid"] },
  { id: "karya", title: "Karya Siswa", description: "Showcase proyek dan karya siswa dari berbagai bidang keahlian.", href: "/siswa/karya", category: "Halaman", keywords: ["project", "proyek", "portofolio"], featured: 4 },
  { id: "prestasi", title: "Prestasi Siswa", description: "Capaian akademik dan nonakademik siswa.", href: "/siswa/prestasi", category: "Halaman", keywords: ["juara", "lomba", "kompetisi"] },
  { id: "informasi", title: "Pusat Informasi", description: "Akses cepat ke FAQ, SPMB, dan kanal informasi resmi.", href: "/informasi", category: "Halaman", keywords: ["info", "bantuan"] },
  { id: "faq", title: "Pertanyaan Umum (FAQ)", description: "Jawaban tentang sekolah, jurusan, fasilitas, SPMB, dan pembayaran.", href: "/informasi/faq", category: "Halaman", keywords: ["pertanyaan", "jawaban", "bantuan"], featured: 3 },
  { id: "spmb", title: "Informasi SPMB", description: "Ringkasan jalur, persyaratan, dan tautan portal penerimaan murid baru.", href: "/informasi/spmb", category: "Halaman", keywords: ["ppdb", "pendaftaran", "murid baru"] },
  { id: "dokumentasi", title: "Dokumentasi", description: "Galeri foto, video, kanal sosial, dan kabar sekolah.", href: "/dokumentasi", category: "Halaman", keywords: ["foto", "video", "instagram", "youtube", "tiktok"] },
  { id: "berita", title: "Berita Sekolah", description: "Kabar kegiatan, karier, industri, prestasi, dan program sekolah.", href: "/berita", category: "Halaman", keywords: ["news", "kabar", "artikel"] },
];

const majorEntries: readonly SearchEntry[] = majorCatalog.map((major) => ({
  id: `jurusan-${major.code.toLocaleLowerCase("id-ID")}`,
  title: major.name,
  description: `${major.code} · Program bidang ${major.group}.`,
  href: major.slug ? `/jurusan/${major.slug}` : "/jurusan",
  category: "Jurusan",
  keywords: [major.code, major.group, "jurusan", "program keahlian"],
}));

const faqEntries: readonly SearchEntry[] = faqItems.map((item) => ({
  id: `faq-${toContentId(item.question)}`,
  title: item.question,
  description: item.answer,
  href: `/informasi/faq#${toContentId(item.question)}`,
  category: "FAQ",
  keywords: [item.category, ...item.keywords],
}));

const workEntries: readonly SearchEntry[] = studentWorks.map((work) => ({
  id: `karya-${toContentId(work.title)}`,
  title: work.title,
  description: `${work.creator} · ${work.description}`,
  href: "/siswa/karya",
  category: "Karya siswa",
  keywords: [work.program, work.year, ...work.technologies, "project", "proyek"],
}));

const achievementEntries: readonly SearchEntry[] = studentAchievements.map((achievement) => ({
  id: `prestasi-${toContentId(achievement.title)}`,
  title: achievement.title,
  description: `${achievement.people} · ${achievement.description}`,
  href: "/siswa/prestasi",
  category: "Prestasi",
  keywords: [achievement.level, achievement.field, achievement.year, ...achievement.categories],
}));

const newsEntries: readonly SearchEntry[] = newsroomItems.map((item) => ({
  id: `berita-${toContentId(item.title)}`,
  title: item.title,
  description: `${item.date} · ${item.excerpt}`,
  href: "/berita",
  category: "Berita",
  keywords: [item.category, item.categoryLabel, item.year],
}));

const facilityEntries: readonly SearchEntry[] = photoGallery
  .filter((item) => item.category === "Fasilitas" || item.category === "Ruang praktik")
  .map((item) => ({
    id: `fasilitas-${toContentId(item.title)}`,
    title: item.title,
    description: `${item.category} · Dokumentasi ${item.year}.`,
    href: "/tentang/fasilitas",
    category: "Fasilitas" as const,
    keywords: [item.category, item.year, "ruang praktik", "bengkel"],
  }));

export const searchEntries: readonly SearchEntry[] = [
  ...pages,
  ...majorEntries,
  ...faqEntries,
  ...workEntries,
  ...achievementEntries,
  ...newsEntries,
  ...facilityEntries,
];
