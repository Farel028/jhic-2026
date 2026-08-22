import type { Metadata } from "next";
import Link from "next/link";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { studentWorks } from "@/data/students";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Karya Siswa",
  description:
    "Karya dan proyek siswa dari berbagai program keahlian SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa/karya" },
  openGraph: {
    title: "Karya Siswa SMK Negeri 2 Surabaya",
    description:
      "Proyek, proses belajar, dan karya siswa SMK Negeri 2 Surabaya.",
    url: "/siswa/karya",
  },
});

export default function StudentWorksPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Siswa", path: "/siswa/prestasi" },
          { name: "Karya Siswa", path: "/siswa/karya" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb current="Karya Siswa" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Karya Siswa
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Tempat keterampilan teknis, gagasan, dan proses belajar bertemu
              dalam sebuah hasil nyata.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Dibuat di SMEKDA</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Belajar dengan menghasilkan sesuatu.
            </h2>
            <p className="mt-5 max-w-md text-sm font-medium leading-6 text-ink-muted">
              Karya berikut memperlihatkan penerapan keterampilan dari beberapa
              bidang keahlian.
            </p>
          </div>

          <ol className="border-t border-ink/15">
            {studentWorks.map((work) => (
              <li
                key={work.title}
                className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[5rem_1fr] sm:gap-7 sm:py-7"
              >
                <p className="text-xs font-extrabold text-primary-strong">
                  {work.year}
                </p>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-muted">
                    {work.program}
                  </p>
                  <h3 className="mt-3 text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong sm:text-xl">
                    {work.title}
                  </h3>
                  <p className="mt-2 text-sm font-extrabold leading-6 text-primary-strong">
                    {work.creator}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-ink-muted">
                    {work.description}
                  </p>
                  <p className="mt-4 text-xs font-medium leading-5 text-ink-muted">
                    {work.technologies.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-[#f1f0ea] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base font-extrabold leading-7 tracking-[-0.015em] text-ink-strong sm:text-lg">
            Proses yang baik juga membuka jalan menuju pencapaian.
          </p>
          <Link
            href="/siswa/prestasi"
            className="inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
          >
            Lihat prestasi siswa <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
