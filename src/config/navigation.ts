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
      { label: "Kurikulum", href: "/tentang/kurikulum" },
      { label: "Fasilitas", href: "/tentang/fasilitas" },
      { label: "Sejarah", href: "/tentang/sejarah" },
      { label: "Visi & Misi", href: "/tentang/visi-misi" },
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
    ],
  },
  { label: "Informasi", href: "/informasi" },
  { label: "Dokumentasi", href: "/dokumentasi" },
] as const;

export const footerNavigation = {
  jelajahi: [
    { label: "Program keahlian", href: "/#jurusan" },
    { label: "Karya siswa", href: "/siswa/karya" },
    { label: "Prestasi", href: "/siswa/prestasi" },
    { label: "Dokumentasi", href: "/dokumentasi" },
    { label: "Berita sekolah", href: "/berita" },
  ],
  informasi: [
    { label: "Pusat informasi", href: "/informasi" },
    { label: "Pertanyaan umum", href: "/informasi/faq" },
    { label: "Info SPMB", href: "/informasi/spmb" },
    { label: "Profil sekolah", href: "/tentang/profil" },
    { label: "Fasilitas", href: "/tentang/fasilitas" },
  ],
} as const;
