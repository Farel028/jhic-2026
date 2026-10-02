import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { PrototypeNote } from "@/components/prototype/prototype-note";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  bkkContact,
  bkkFaq,
  bkkFlow,
  bkkStats,
  bkkStatsSource,
  bkkVideos,
  sampleVacancies,
} from "@/data/bkk";
import { withPageTwitter } from "@/lib/metadata";

const bkkAudiences = [
  {
    title: "Lulusan",
    description:
      "Cari lowongan sesuai kompetensi, kirim lamaran lewat portal, tunggu panggilan tes sampai penempatan.",
  },
  {
    title: "Perusahaan",
    description:
      "Publikasikan lowongan, ikuti rekrutmen bersama, dan jalin MOU penyaluran lulusan dengan sekolah.",
  },
] as const;

export const metadata: Metadata = withPageTwitter({
  title: "BKK dan Karier",
  description:
    "Layanan Bursa Kerja Khusus SMK Negeri 2 Surabaya: informasi lowongan, alur pendaftaran, pertanyaan umum, dan kontak. Halaman prototype.",
  alternates: { canonical: "/informasi/bkk" },
  openGraph: {
    title: "BKK dan Karier SMK Negeri 2 Surabaya",
    description:
      "Contoh hub karier internal: layanan BKK, alur melamar, lowongan contoh, FAQ, dan kontak.",
    url: "/informasi/bkk",
  },
});

export default function BkkPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "BKK dan Karier", path: "/informasi/bkk" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">BKK dan Karier</li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">Bursa Kerja Khusus</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
                BKK dan Karier
              </h1>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              BKK menghubungkan lulusan dengan perusahaan: cari lowongan, kirim
              lamaran lewat portal, ikuti tes sampai penempatan.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            <a
              href="https://bkk.smkn2sby.sch.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary-strong bg-primary-strong px-6 text-sm font-bold text-white transition-colors hover:bg-[#063c5d]"
            >
              Buka portal BKK asli
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <a
              href="#alur"
              className="inline-flex min-h-12 items-center text-sm font-extrabold text-ink-strong underline decoration-primary-strong decoration-2 underline-offset-8"
            >
              Cara melamar
            </a>
          </div>
          <div className="mt-8 max-w-3xl">
            <PrototypeNote>
              Halaman prototype. Angka statistik merujuk laman BKK, sedangkan
              daftar lowongan di bawah adalah contoh, bukan lowongan sungguhan.
            </PrototypeNote>
          </div>
        </div>
      </section>

      <section id="alur" aria-labelledby="heading-alur" className="border-b border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Alur</p>
            <h2 id="heading-alur" className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Empat tahap melamar.
            </h2>
          </div>
          <ol className="border-t border-ink/15">
            {bkkFlow.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-ink/15 py-5 sm:py-6">
                <span className="pt-1 text-xs font-extrabold tabular-nums text-primary-strong">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-lg font-bold leading-7 tracking-[-0.015em] text-ink-strong">{step.title}</span>
                  <span className="mt-1 block text-sm font-medium leading-6 text-ink-muted">{step.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Untuk siapa</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Dua pintu, satu BKK.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {bkkAudiences.map((audience) => (
              <li key={audience.title} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6">
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {audience.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {audience.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <p className="eyebrow">Lowongan contoh</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
            Contoh tampilan loker
          </h2>
          <ul className="mt-8 border-t border-ink/15">
            {sampleVacancies.map((vacancy) => (
              <li key={vacancy.code} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-6">
                <span className="text-xs font-extrabold tabular-nums tracking-[0.12em] text-primary-strong">
                  {vacancy.code}
                </span>
                <span>
                  <span className="block text-lg font-bold leading-7 tracking-[-0.015em] text-ink-strong">
                    {vacancy.title}
                    <span className="ml-3 inline-block border border-ink/20 px-2 py-0.5 align-middle text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink-muted">
                      Contoh
                    </span>
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-6 text-ink-muted">
                    {vacancy.company} · {vacancy.requirement}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-ink-muted">
            Lowongan sungguhan ada di portal resmi BKK. Lamaran dikirim lewat
            sana agar tercatat.
          </p>
          <a
            href={bkkContact.portal}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-primary-strong hover:text-primary-strong"
          >
            {bkkContact.portalLabel} <ArrowRightIcon className="size-4" />
          </a>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <p className="eyebrow">Keterserapan</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
            Angka per laman BKK
          </h2>
          <div className="mt-8 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-3">
            {bkkStats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 sm:p-8">
                <p className="text-3xl font-black tracking-tight text-primary-strong">{stat.metric}</p>
                <h3 className="mt-2 text-sm font-extrabold text-ink-strong">{stat.label}</h3>
                <p className="mt-1 text-xs font-medium leading-relaxed text-ink-muted">{stat.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl border-l-4 border-accent-strong pl-5 text-sm font-medium leading-6 text-ink-muted">
            {bkkStatsSource}
          </p>
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
            {bkkFaq.map((item) => (
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
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Kontak BKK</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              {bkkContact.email}
            </h2>
            <p className="mt-3 text-base font-bold leading-7 text-ink-strong">
              Telp {bkkContact.phone}
            </p>
            <div className="mt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">Video panduan</p>
              <ul className="mt-3 space-y-3">
                {bkkVideos.map((video) => (
                  <li key={video.href}>
                    <a
                      href={video.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center text-sm font-extrabold text-ink-strong underline decoration-primary-strong decoration-2 underline-offset-8"
                    >
                      {video.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:border-l lg:border-ink/15 lg:pl-20">
            <p className="eyebrow">Terkait</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Praktik Kerja Lapangan
            </h2>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-ink-muted">
              Tahapan, dokumen contoh, dan tautan portal e-PKL untuk siswa yang
              menjalani praktik.
            </p>
            <Link href="/informasi/pkl" className="mt-6 inline-flex min-h-11 items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-primary-strong hover:text-primary-strong">
              Buka info PKL <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
