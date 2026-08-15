import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { majorCatalog, majorDetails } from "@/data/majors";

export const metadata: Metadata = {
  title: "Program Keahlian",
  description:
    "Jelajahi program keahlian SMK Negeri 2 Surabaya dari bidang digital, konstruksi, elektronika, manufaktur, hingga otomotif.",
  alternates: {
    canonical: "/jurusan",
  },
  openGraph: {
    title: "Program Keahlian SMK Negeri 2 Surabaya",
    description:
      "Kenali pilihan bidang belajar vokasi di SMK Negeri 2 Surabaya.",
    url: "/jurusan",
  },
};

const catalogSource =
  "https://web.smkn2sby.sch.id/read/3/kompetensi-keahlian";

export default function MajorsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Program Keahlian", path: "/jurusan" },
        ]}
      />

      <section className="hero-grid relative overflow-hidden border-b border-ink/10 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div aria-hidden="true" className="absolute -right-20 -top-24 size-80 rounded-full bg-secondary/35 blur-3xl" />
        <div className="relative mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-muted">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-ink-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-primary">Program keahlian</li>
            </ol>
          </nav>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="eyebrow">Pilih jalur belajarmu</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.4rem,8vw,7.8rem)] font-black leading-[0.86] tracking-[-0.075em] text-ink-strong">
                Keahlian untuk <span className="text-primary">dunia nyata.</span>
              </h1>
            </div>
            <div className="max-w-xl lg:pb-3">
              <p className="text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
                Temukan bidang yang sesuai dengan minatmu, lalu kenali cara belajar dan kemungkinan arah setelah lulus.
              </p>
              <p className="mt-5 rounded-2xl border border-ink/10 bg-white/75 p-4 text-sm leading-6 text-ink-muted shadow-sm">
                Daftar di halaman ini mengikuti sumber resmi sekolah untuk tahun ajaran 2023/2024. Ketersediaan konsentrasi pada penerimaan terbaru perlu dikonfirmasi melalui kanal SPMB resmi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="eyebrow">Profil pilihan</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Mulai dari empat bidang.</h2>
              <p className="mt-6 max-w-lg text-base font-medium leading-7 text-ink-muted">
                Empat profil awal berikut sudah dilengkapi gambaran bidang dan jejak kegiatan yang dapat diverifikasi dari laman sekolah.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {majorDetails.map((major, index) => (
                <Link
                  key={major.slug}
                  href={`/jurusan/${major.slug}`}
                  className={`group relative min-h-72 overflow-hidden rounded-[1.75rem] border border-ink/10 p-6 shadow-soft transition-transform hover:-translate-y-1 sm:p-7 ${major.accent === "yellow" ? "bg-accent-soft" : "bg-secondary"}`}
                >
                  <span aria-hidden="true" className="absolute -right-3 -top-8 text-[8.5rem] font-black leading-none tracking-[-0.1em] text-white/40">{major.code}</span>
                  <span className="relative text-xs font-extrabold uppercase tracking-[0.18em] text-ink-muted">0{index + 1} · {major.code}</span>
                  <h3 className="relative mt-16 max-w-sm text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong sm:text-3xl">{major.name}</h3>
                  <span className="relative mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong">
                    Buka profil <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Katalog program</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.7rem,5vw,5.4rem)] font-black leading-[0.92] tracking-[-0.06em]">Sebelas konsentrasi. Banyak kemungkinan.</h2>
            </div>
            <a href={catalogSource} rel="noreferrer" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-white/25 px-5 text-sm font-extrabold transition-colors hover:border-accent-strong hover:bg-accent-strong hover:text-ink-strong">
              Lihat sumber sekolah <ArrowUpRightIcon className="size-4" />
            </a>
          </div>

          <ol className="mt-12 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {majorCatalog.map((major, index) => (
              <li key={major.code} className="border-b border-white/15 py-6 sm:px-6 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                {major.slug ? (
                  <Link href={`/jurusan/${major.slug}`} className="group flex h-full items-start gap-4">
                    <CatalogItem major={major} index={index} linked />
                  </Link>
                ) : (
                  <div className="flex h-full items-start gap-4">
                    <CatalogItem major={major} index={index} />
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-7 max-w-3xl text-sm leading-6 text-white/60">
            Pengelompokan bidang digunakan untuk memudahkan penjelajahan dan bukan nomenklatur resmi sekolah. Profil rinci untuk program lainnya akan ditambahkan setelah materi terverifikasi tersedia.
          </p>
        </div>
      </section>
    </main>
  );
}

function CatalogItem({
  major,
  index,
  linked = false,
}: {
  major: (typeof majorCatalog)[number];
  index: number;
  linked?: boolean;
}) {
  return (
    <>
      <span className="pt-1 text-xs font-black tabular-nums text-secondary">{String(index + 1).padStart(2, "0")}</span>
      <span className="min-w-0 flex-1">
        <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/45">{major.group}</span>
        <span className="mt-2 block text-lg font-extrabold leading-snug tracking-[-0.025em] text-white">{major.name}</span>
        <span className="mt-3 block text-xs font-bold text-accent-strong">{major.code}{linked ? " · Profil tersedia" : " · Profil menyusul"}</span>
      </span>
      {linked ? <ArrowRightIcon className="mt-1 size-5 shrink-0 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-accent-strong" /> : null}
    </>
  );
}
