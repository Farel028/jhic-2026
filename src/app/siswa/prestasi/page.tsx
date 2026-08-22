import type { Metadata } from "next";
import Link from "next/link";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { studentAchievements } from "@/data/students";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Prestasi Siswa",
  description:
    "Prestasi akademik dan nonakademik siswa SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa/prestasi" },
  openGraph: {
    title: "Prestasi Siswa SMK Negeri 2 Surabaya",
    description:
      "Capaian siswa di bidang teknologi, desain, seni, dan olahraga.",
    url: "/siswa/prestasi",
  },
});

export default function StudentAchievementsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Siswa", path: "/siswa/prestasi" },
          { name: "Prestasi", path: "/siswa/prestasi" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb current="Prestasi" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Prestasi Siswa
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Capaian lahir dari latihan, kerja sama, dan keberanian menguji
              kemampuan di luar kelas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Catatan capaian</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Dari kompetensi menuju pencapaian.
            </h2>
            <p className="mt-5 max-w-md text-sm font-medium leading-6 text-ink-muted">
              Prestasi berikut mewakili bidang akademik dan nonakademik dari
              berbagai tingkat kompetisi.
            </p>
          </div>

          <ol className="border-t border-ink/15">
            {studentAchievements.map((achievement) => (
              <li
                key={achievement.title}
                className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[5rem_1fr] sm:gap-7 sm:py-7"
              >
                <div>
                  <p className="text-xs font-extrabold text-primary-strong">
                    {achievement.year}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink-muted">
                    {achievement.level}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-muted">
                    {achievement.field}
                  </p>
                  <h3 className="mt-3 text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong sm:text-xl">
                    {achievement.title}
                  </h3>
                  <p className="mt-2 text-sm font-extrabold leading-6 text-primary-strong">
                    {achievement.people}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-ink-muted">
                    {achievement.description}
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
            Lihat bagaimana keterampilan tersebut diwujudkan menjadi karya.
          </p>
          <Link
            href="/siswa/karya"
            className="inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
          >
            Lihat karya siswa <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
