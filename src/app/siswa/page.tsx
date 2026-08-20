import type { Metadata } from "next";
import { Suspense } from "react";
import { withPageTwitter } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { StudentTabs } from "@/components/students/student-tabs";

export const metadata: Metadata = withPageTwitter({
  title: "Siswa",
  description: "Karya, prestasi, dan kehidupan siswa SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa" },
  openGraph: {
    title: "Siswa SMK Negeri 2 Surabaya",
    description: "Lihat karya, prestasi, dan pengalaman siswa di dalam serta di luar ruang kelas.",
    url: "/siswa",
  },
});

export default function StudentsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Siswa", path: "/siswa" }]} />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="eyebrow">Ruang siswa</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">
                Belajar. Mencoba. <span className="block text-primary-strong">Menjadi.</span>
              </h1>
            </div>
            <div className="relative lg:pb-4">
              <p className="relative max-w-xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
                Kehidupan sekolah dibentuk oleh proyek, kompetisi, pertemanan, kegiatan, dan keberanian untuk terus mencoba hal baru.
              </p>
              <p className="relative mt-5 max-w-xl text-sm font-semibold leading-6 text-ink-muted">
                Dari karya yang dibuat di ruang praktik hingga catatan prestasi di tingkat kota, provinsi, dan nasional — semuanya bermuara pada proses belajar yang nyata.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <StudentTabs />
      </Suspense>
    </main>
  );
}