import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Prestasi Siswa",
  description: "Galeri prestasi akademik dan nonakademik siswa SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa/prestasi" },
  openGraph: {
    title: "Prestasi Siswa SMK Negeri 2 Surabaya",
    description: "Capaian siswa di bidang teknologi, desain, seni, dan olahraga.",
    url: "/siswa/prestasi",
  },
});

export default function StudentAchievementsPage() {
  redirect("/siswa?bagian=prestasi");
}