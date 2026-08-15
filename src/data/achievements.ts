export type AchievementPreview = {
  level: string;
  title: string;
  year: string;
  href: string;
};

export const achievementPreviews: readonly AchievementPreview[] = [
  {
    level: "Nasional",
    title: "Juara 2 Olimpiade Desain Produk kategori Furniture",
    year: "2026",
    href: "https://web.smkn2sby.sch.id/read/141/siswi-smkn-2-surabaya-raih-juara-2-olimpiade-desain-produk-nasional-kategori-furniture",
  },
  {
    level: "Regional",
    title: "Juara 3 Festival Albanjari tingkat Jawa",
    year: "2026",
    href: "https://web.smkn2sby.sch.id/read/142/group-sholawat-ahnafussholihin-smkn-2-surabaya-raih-juara-3-festival-albanjari-tingkat-jawa",
  },
  {
    level: "Nasional",
    title: "Juara 1 PLC pada Industrial Automation and Robotic Competition",
    year: "2025",
    href: "https://web.smkn2sby.sch.id/read/93/prestasi-membanggakan-siswa-smk-n-2-surabaya-di-ajang-iarc-its",
  },
] as const;
