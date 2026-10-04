import type { Metadata } from "next";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ExtracurricularShowcase } from "@/components/home/extracurricular-showcase";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Ekstrakurikuler Siswa",
  description:
    "14 pilihan kegiatan ekstrakurikuler di SMK Negeri 2 Surabaya untuk pengembangan minat, bakat, dan karakter.",
  alternates: { canonical: "/siswa/ekstrakurikuler" },
  openGraph: {
    title: "Ekstrakurikuler Siswa SMK Negeri 2 Surabaya",
    description:
      "Temukan berbagai kegiatan ekstrakurikuler olahraga, seni, teknologi, dan kepemimpinan di SMEKDA.",
    url: "/siswa/ekstrakurikuler",
  },
});

export default function StudentExtracurricularPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Siswa", path: "/siswa/ekstrakurikuler" },
          { name: "Ekstrakurikuler", path: "/siswa/ekstrakurikuler" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f3f4f6] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb current="Ekstrakurikuler" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Ekstrakurikuler
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Wadah mengasah minat, bakat, kebugaran fisik, kepemimpinan, dan
              kreativitas di luar jam kelas formal.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Ekskul Interaktif Lingkaran Pemilihan Karakter */}
      <ExtracurricularShowcase />
    </main>
  );
}
