import type { Metadata } from "next";
import Link from "next/link";
import { AdmissionDataExplorer } from "@/components/information/admission-data-explorer";
import { AdmissionHub } from "@/components/information/admission-hub";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "PPDB & Informasi Penerimaan Siswa Baru",
  description:
    "Panduan resmi PPDB dan SPMB SMK Negeri 2 Surabaya: alokasi 5 jalur, alur pendaftaran, ketentuan buta warna jurusan, simulasi nilai gabungan, dan arsip daya tampung.",
  alternates: { canonical: "/informasi/spmb" },
  openGraph: {
    title: "PPDB & Informasi Penerimaan SMKN 2 Surabaya",
    description:
      "Panduan lengkap calon murid baru SMEKDA: jalur pendaftaran, persyaratan kesehatan, simulasi nilai, dan arsip statistik penerimaan.",
    url: "/informasi/spmb",
  },
});

export default function AdmissionPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Informasi PPDB", path: "/informasi/spmb" },
        ]}
      />

      <section className="border-b border-ink/10 bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
              <li>
                <Link href="/" className="hover:text-primary-strong">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">
                Informasi PPDB & SPMB
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary-strong">
                Pusat Informasi Calon Siswa Baru · SMEKDA
              </p>
              <h1 className="mt-3 text-[clamp(2.1rem,4vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-strong">
                PPDB & Penerimaan Siswa Baru
              </h1>
              <p className="mt-4 text-base font-normal leading-7 text-ink-muted sm:text-lg">
                Panduan resmi regulasi jalur, tahapan seleksi, syarat kesehatan jurusan, dan simulasi nilai PPDB SMKN 2 Surabaya.
              </p>
            </div>
            <div>
              <a
                href="https://spmbjatim.net"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary-strong bg-primary-strong px-6 text-sm font-bold text-white transition-colors hover:bg-[#063c5d]"
              >
                Portal Resmi SPMB Jatim
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site space-y-20 lg:space-y-28">
          <AdmissionHub />

          <section id="arsip-data" aria-labelledby="heading-arsip-data">
            <div className="border-b border-ink/15 pb-6">
              <p className="eyebrow">Statistik Penerimaan</p>
              <h2
                id="heading-arsip-data"
                className="mt-2 text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong"
              >
                Arsip Daya Tampung & Rentang Nilai
              </h2>
            </div>

            <div className="mt-8">
              <AdmissionDataExplorer />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
