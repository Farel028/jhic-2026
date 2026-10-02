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
      { label: "Ekstrakurikuler", href: "/siswa/ekstrakurikuler" },
      { label: "Prestasi", href: "/siswa/prestasi" },
      { label: "Karya Siswa", href: "/siswa/karya" },
      { label: "Lulusan Terbaik", href: "/siswa/lulusan-terbaik" },
      { label: "Alumni", href: "/siswa/alumni" },
    ],
  },
  { label: "Berita", href: "/berita" },
  {
    label: "Jelajahi Sekolah",
    children: [
      { label: "Virtual Tour 360°", href: "/virtual-tour" },
      { label: "Peta Sekolah 3D", href: "/peta-sekolah" },
    ],
  },
] as const;

export const footerNavigation = {
  jelajahi: [
    { label: "Program keahlian", href: "/#jurusan" },
    { label: "Ekstrakurikuler", href: "/siswa/ekstrakurikuler" },
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
