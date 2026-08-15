export type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Jurusan", href: "/jurusan" },
  { label: "Siswa", href: "/siswa" },
  { label: "Informasi", href: "/informasi" },
  { label: "Dokumentasi", href: "/dokumentasi" },
] as const;

export const footerNavigation = {
  jelajahi: [
    { label: "Program keahlian", href: "/jurusan" },
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
