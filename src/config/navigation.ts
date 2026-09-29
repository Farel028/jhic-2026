import { extracurricularCatalog } from "@/data/extracurriculars";
import { majorCatalog } from "@/data/majors";

export type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavigationItem = NavigationLink | {
  label: string;
  children: readonly NavigationLink[];
};

export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang Kami",
    children: [
      { label: "Profil", href: "/tentang/profil" },
      { label: "Sejarah", href: "/tentang/sejarah" },
      { label: "Kurikulum & Pembelajaran", href: "/tentang/kurikulum" },
      { label: "Fasilitas", href: "/tentang/fasilitas" },
    ],
  },
  {
    label: "Jurusan",
    children: [
      ...majorCatalog.map((major) => ({
        label: major.name,
        href: `/jurusan/${major.slug}`,
      })),
    ],
  },
  {
    label: "Siswa",
    children: [
      { label: "Prestasi", href: "/siswa/prestasi" },
      { label: "Karya Siswa", href: "/siswa/karya" },
      { label: "Alumni", href: "/siswa/alumni" },
      { label: "Ekstrakurikuler", href: "/#ekstrakurikuler" },
      ...extracurricularCatalog.map((item) => ({
        label: item.name,
        href: `/ekstrakurikuler/${item.slug}`,
      })),
    ],
  },
  { label: "Berita", href: "/berita" },
  { label: "Peta Sekolah", href: "/peta-sekolah" },
  { label: "Virtual Tour", href: "/virtual-tour" },
] as const;

export const footerNavigation = {
  jelajahi: [
    { label: "Program keahlian", href: "/#jurusan" },
    { label: "Ekstrakurikuler", href: "/#ekstrakurikuler" },
    { label: "Karya siswa", href: "/siswa/karya" },
    { label: "Prestasi", href: "/siswa/prestasi" },
    { label: "Alumni", href: "/siswa/alumni" },
    { label: "Berita sekolah", href: "/berita" },
  ],
  informasi: [
    { label: "Info SPMB", href: "/informasi/spmb" },
    { label: "Profil sekolah", href: "/tentang/profil" },
    { label: "Fasilitas", href: "/tentang/fasilitas" },
    { label: "Peta Sekolah", href: "/peta-sekolah" },
  ],
} as const;
