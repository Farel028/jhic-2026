import type { Metadata } from "next";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import {
  historyTimeline,
  notableAlumni,
  schoolLeadershipHistory,
} from "@/data/about";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Sejarah Sekolah",
  description:
    "Perjalanan SMK Negeri 2 Surabaya sejak sekolah teknik tahun 1912, riwayat kepemimpinan, dan alumni yang memberi dampak.",
  alternates: { canonical: "/tentang/sejarah" },
  openGraph: {
    title: "Sejarah SMK Negeri 2 Surabaya",
    description:
      "Menelusuri warisan pendidikan teknik SMK Negeri 2 Surabaya sejak 1912.",
    url: "/tentang/sejarah",
  },
});

export default function HistoryPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Tentang Sekolah", path: "/tentang" },
          { name: "Sejarah", path: "/tentang/sejarah" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Sejarah" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Sejarah SMKN 2 Surabaya
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Dari sekolah teknik pada 1912 hingga SMEKDA hari ini, fungsi
              pendidikan terus hidup melewati perubahan nama dan zaman.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
          <div>
            <p className="eyebrow">Awal perjalanan</p>
            <p className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold leading-none tracking-[-0.045em] text-ink-strong">
              2 Juli 1912
            </p>
          </div>
          <div>
            <h2 className="max-w-3xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Sekolah teknik yang menjadi bagian dari warisan kota.
            </h2>
            <div className="mt-6 max-w-3xl space-y-5 text-base font-medium leading-7 text-ink-muted">
              <p>
                Sekolah teknik ini ditetapkan pada 12 Januari 1912 dan dibuka
                pada 2 Juli 1912. Nama Koningin Emma School kemudian ditetapkan
                secara resmi pada 11 Februari 1913.
              </p>
              <p>
                Lebih dari satu abad kemudian, kompleksnya tercatat sebagai
                Bangunan Cagar Budaya Kota Surabaya dan tetap digunakan untuk
                pendidikan vokasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-6 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
            <div>
              <p className="eyebrow">Jejak waktu</p>
              <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
                Nama berubah, pendidikan berlanjut.
              </h2>
            </div>
            <ol className="border-t border-ink/15">
              {historyTimeline.map((event) => (
                <li
                  key={`${event.period}-${event.title}`}
                  className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[0.3fr_0.7fr] sm:gap-8 sm:py-7"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">
                    {event.period}
                  </p>
                  <div>
                    <h3 className="text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong sm:text-xl">
                      {event.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-ink-muted sm:text-base sm:leading-7">
                      {event.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-6 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
            <div>
              <p className="eyebrow">Kepemimpinan</p>
              <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
                Kepala sekolah dari masa ke masa.
              </h2>
            </div>
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {schoolLeadershipHistory.map((leader) => (
                <li
                  key={`${leader.period}-${leader.name}`}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-ink/15 py-4"
                >
                  <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-ink-muted">
                    {leader.period}
                  </span>
                  <span className="text-sm font-extrabold leading-5 text-ink-strong sm:text-base sm:leading-6">
                    {leader.name}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="alumni" className="scroll-mt-24 border-y border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
            <div>
              <p className="eyebrow">Jejak alumni</p>
              <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
                Dari ruang belajar menuju pengabdian.
              </h2>
              <p className="mt-5 max-w-md text-sm font-medium leading-6 text-ink-muted">
                Arsip sekolah mencatat sejumlah alumnus yang berkontribusi di
                bidang dirgantara, pertahanan, kepolisian, pers, dan pelestarian
                sejarah.
              </p>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {notableAlumni.map((alumnus) => (
                <li
                  key={alumnus.name}
                  className="border-t border-ink/15 py-5 sm:py-6"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-primary-strong">
                    {alumnus.field}
                  </p>
                  <h3 className="mt-3 text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong sm:text-xl">
                    {alumnus.wikipediaUrl ? (
                      <a
                        href={alumnus.wikipediaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 underline decoration-ink/20 decoration-1 underline-offset-4 transition-colors hover:text-primary-strong hover:decoration-primary"
                      >
                        {alumnus.name}
                        <ArrowUpRightIcon className="size-3.5 text-ink-muted transition-colors group-hover:text-primary-strong" />
                      </a>
                    ) : (
                      alumnus.name
                    )}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-ink-muted">
                    {alumnus.impact}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base font-extrabold leading-7 tracking-[-0.015em] text-ink-strong sm:text-lg">
            Warisan ini terus bergerak melalui pendidikan vokasi hari ini.
          </p>
          <Link
            href="/tentang/profil#visi-misi"
            className="inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
          >
            Lihat visi sekolah <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
