import type { Metadata } from "next";
import Link from "next/link";
import { AdmissionDataExplorer } from "@/components/information/admission-data-explorer";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Data Penerimaan SPMB",
  description:
    "Arsip daya tampung dan rentang nilai penerimaan SMK Negeri 2 Surabaya berdasarkan tahun dan program keahlian.",
  alternates: { canonical: "/informasi/spmb" },
  openGraph: {
    title: "Data Penerimaan SMK Negeri 2 Surabaya",
    description:
      "Lihat arsip daya tampung dan rentang nilai penerimaan SMEKDA per program keahlian.",
    url: "/informasi/spmb",
  },
});

export default function AdmissionPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Data Penerimaan", path: "/informasi/spmb" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
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
                Data Penerimaan
              </li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">
                Arsip SPMB SMEKDA
              </p>
              <h1 className="mt-3 max-w-3xl text-[clamp(2.1rem,4vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-strong">
                Data Penerimaan
              </h1>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg">
              Daya tampung dan rentang nilai per program untuk membantu calon murid membaca penerimaan tahun sebelumnya.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">
              Pilih tahun
            </p>
            <p className="max-w-3xl text-sm font-medium leading-6 text-ink-muted">
              Angka ditampilkan sebagai arsip, bukan prediksi kelulusan. Metode penilaian dan kuota dapat berubah pada setiap periode SPMB.
            </p>
          </div>
          <AdmissionDataExplorer />
        </div>
      </section>
    </main>
  );
}
