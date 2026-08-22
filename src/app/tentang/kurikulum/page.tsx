import type { Metadata } from "next";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { learningModes } from "@/data/about";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Kurikulum dan Pembelajaran",
  description:
    "Gambaran ringkas pembelajaran vokasi di SMK Negeri 2 Surabaya, dari memahami konsep hingga menerapkannya dalam praktik.",
  alternates: { canonical: "/tentang/kurikulum" },
  openGraph: {
    title: "Kurikulum dan Pembelajaran SMK Negeri 2 Surabaya",
    description:
      "Pembelajaran vokasi yang menghubungkan pemahaman, praktik, karya, dan dunia kerja.",
    url: "/tentang/kurikulum",
  },
});

const learningContexts = [
  {
    title: "Praktik keahlian",
    description:
      "Murid menggunakan alat, metode, dan prosedur sesuai bidang yang dipelajari.",
  },
  {
    title: "Proyek dan karya",
    description:
      "Kompetensi diterapkan untuk membuat karya serta menyelesaikan persoalan secara kolaboratif.",
  },
  {
    title: "Pengalaman dunia kerja",
    description:
      "Pembelajaran diperkuat melalui industri, Praktik Kerja Lapangan, dan uji kompetensi.",
  },
] as const;

export default function CurriculumPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Tentang Sekolah", path: "/tentang" },
          { name: "Kurikulum", path: "/tentang/kurikulum" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Kurikulum" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Kurikulum & Pembelajaran
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Pembelajaran vokasi menghubungkan pengetahuan, keterampilan, dan
              pengalaman nyata sesuai bidang keahlian.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
          <div>
            <p className="eyebrow">Pembelajaran vokasi</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Pengetahuan tumbuh lewat praktik.
            </h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base font-medium leading-7 text-ink-muted">
            <p>
              Murid memulai dari konsep dan dasar kejuruan, lalu mengembangkan
              kemampuan melalui latihan, proyek, dan pengalaman di lingkungan
              kerja.
            </p>
            <p>
              Cara belajar dapat berbeda pada setiap program keahlian, tetapi
              tujuannya sama: membangun kompetensi, tanggung jawab, dan kesiapan
              menentukan langkah setelah lulus.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Siklus belajar</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Memahami, mencoba, membuat.
            </h2>
          </div>
          <ol className="border-t border-ink/15">
            {learningModes.map((mode) => (
              <li
                key={mode.number}
                className="grid gap-3 border-b border-ink/15 py-5 sm:grid-cols-[4rem_0.35fr_0.65fr] sm:items-start sm:gap-6 sm:py-6"
              >
                <span className="text-xs font-extrabold text-primary-strong">
                  {mode.number}
                </span>
                <h3 className="text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong">
                  {mode.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {mode.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Konteks nyata</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Belajar tidak berhenti di kelas.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {learningContexts.map((context) => (
              <li
                key={context.title}
                className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6"
              >
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {context.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {context.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base font-extrabold leading-7 tracking-[-0.015em] text-ink-strong sm:text-lg">
            Setiap program keahlian menerapkan pembelajaran sesuai bidangnya.
          </p>
          <Link
            href="/#jurusan"
            className="inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
          >
            Lihat program keahlian <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
