import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { pklBenefits, pklContact, pklFaq, pklRoles, pklStages } from "@/data/pkl";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "PKL",
  description:
    "Informasi Praktik Kerja Lapangan SMK Negeri 2 Surabaya: tahapan, peran, dan tautan portal e-PKL.",
  alternates: { canonical: "/informasi/pkl" },
  openGraph: {
    title: "PKL SMK Negeri 2 Surabaya",
    description:
      "Tahapan, peran, dan tautan portal e-PKL untuk siswa SMK Negeri 2 Surabaya.",
    url: "/informasi/pkl",
  },
});

export default function PklPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "PKL", path: "/informasi/pkl" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">PKL</li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">Praktik Kerja Lapangan</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
                PKL
              </h1>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              PKL adalah praktik siswa di dunia kerja: siapkan berkas, jalani
              praktik dengan jurnal, tutup dengan laporan dan sidang.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            <a
              href={pklContact.portal}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary-strong bg-primary-strong px-6 text-sm font-bold text-white transition-colors hover:bg-[#063c5d]"
            >
              {pklContact.portalLabel}
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <a
              href="#tahapan"
              className="inline-flex min-h-12 items-center text-sm font-extrabold text-ink-strong underline decoration-primary-strong decoration-2 underline-offset-8"
            >
              Lihat tahapan
            </a>
          </div>
        </div>
      </section>

      <section id="tahapan" aria-labelledby="heading-tahapan" className="border-b border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Kenapa PKL</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Sekolah selesai di kelas, lanjut di dunia kerja.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {pklBenefits.map((benefit) => (
              <li key={benefit.title} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6">
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {benefit.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="tahapan" aria-labelledby="heading-tahapan-alur" className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Tahapan</p>
            <h2 id="heading-tahapan-alur" className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Tiga tahap PKL.
            </h2>
          </div>
          <ol className="border-t border-ink/15">
            {pklStages.map((stage, index) => (
              <li key={stage.title} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-ink/15 py-5 sm:py-6">
                <span className="pt-1 text-xs font-extrabold tabular-nums text-primary-strong">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-lg font-bold leading-7 tracking-[-0.015em] text-ink-strong">{stage.title}</span>
                  <span className="mt-1 block text-sm font-medium leading-6 text-ink-muted">{stage.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Peran</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Siapa mengerjakan apa.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {pklRoles.map((role) => (
              <li key={role.title} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6">
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {role.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {role.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <div className="max-w-3xl">
            <p className="eyebrow">Portal resmi</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              e-PKL
            </h2>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-ink-muted">
              Pengisian jurnal, monitoring, dan informasi angkatan berjalan
              tersedia di portal e-PKL.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
              <a
                href={pklContact.portal}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-primary-strong hover:text-primary-strong"
              >
                {pklContact.portalLabel} <ArrowRightIcon className="size-4" />
              </a>
              <a
                href={pklContact.tutorial}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-extrabold text-ink-strong underline decoration-primary-strong decoration-2 underline-offset-8"
              >
                {pklContact.tutorialLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Pertanyaan umum</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Yang sering ditanyakan.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {pklFaq.map((item) => (
              <li key={item.question} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6">
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {item.question}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink">
              Butuh lowongan setelah lulus
            </p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Lanjut ke BKK dan Karier
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Link href="/informasi/bkk" className="inline-flex min-h-11 items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-primary-strong hover:text-primary-strong">
              Buka BKK <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
