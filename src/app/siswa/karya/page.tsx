import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Karya Siswa",
  description: "Showcase karya siswa dari berbagai program keahlian SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa/karya" },
  openGraph: {
    title: "Made at SMEKDA · Karya Siswa",
    description: "Proyek nyata, proses belajar, dan karya siswa SMK Negeri 2 Surabaya.",
    url: "/siswa/karya",
  },
});

export default function StudentWorksPage() {
  redirect("/siswa?bagian=karya");
}