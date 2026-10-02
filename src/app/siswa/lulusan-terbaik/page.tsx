import type { Metadata } from "next";
import Link from "next/link";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { graduateStats } from "@/data/graduates";
import { GraduateFilter } from "@/components/students/graduate-filter";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Lulusan Terbaik",
  description:
    "Rekam jejak, capaian profesional, dan kontribusi lulusan terbaik SMK Negeri 2 Surabaya di industri, perguruan tinggi, dan wirausaha.",
  alternates: { canonical: "/siswa/lulusan-terbaik" },
  openGraph: {
    title: "Lulusan Terbaik SMK Negeri 2 Surabaya",
    description:
      "Profil inspiratif alumni SMEKDA yang berkiprah di BUMN, korporasi global, riset teknologi, dan wirausaha mandiri.",
    url: "/siswa/lulusan-terbaik",
  },
});

export default function TopGraduatesPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Siswa", path: "/siswa/prestasi" },
          { name: "Lulusan Terbaik", path: "/siswa/lulusan-terbaik" },
        ]}
      />

      {/* Hero Header Section */}
      <section className="border-b border-ink/10 bg-[#f3f4f6] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb current="Lulusan Terbaik" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">Rekam jejak keunggulan</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
                Lulusan Terbaik SMEKDA
              </h1>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Mewakili ribuan alumni yang membuktikan bahwa kompetensi teknik,
              integritas, dan etos kerja vokasi mampu bersaing di kancah nasional
              maupun internasional.
            </p>
          </div>
        </div>
      </section>

      {/* Split Section: Metrics on Left, Main Ledger on Right */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          {/* Left Column: Tracer Study Metrics & Context */}
          <div>
            <p className="eyebrow">Tracer study & keterserapan</p>
            <h2 className="mt-4 text-[clamp(1.75rem,2.8vw,2.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-strong">
              Kompetensi nyata di lapangan kerja.
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-ink-muted">
              Data keterserapan lulusan SMEKDA mencerminkan kesesuaian kurikulum
              berbasis industri dengan kebutuhan BUMN, manufaktur, dan perguruan tinggi vokasi.
            </p>

            {/* Clean Vertical Metric List */}
            <div className="mt-8 border-t border-ink/15">
              {graduateStats.map((item) => (
                <div key={item.label} className="border-b border-ink/15 py-5">
                  <div className="font-mono text-3xl font-black tracking-tight text-primary-strong">
                    {item.metric}
                  </div>
                  <h3 className="mt-1 text-sm font-extrabold text-ink-strong">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-ink-muted">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* BKK Partner Box */}
            <div className="mt-8 rounded-xl border border-ink/15 bg-[#f3f4f6] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-primary-strong">
                Kemitraan Rekrutmen BKK
              </p>
              <p className="mt-2 text-xs font-medium leading-relaxed text-ink-muted">
                Perusahaan Anda membutuhkan tenaga kerja siap pakai? Hubungi Bursa Kerja Khusus (BKK) SMEKDA.
              </p>
              <Link
                href="/siswa/alumni"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-ink-strong hover:text-primary-strong"
              >
                Jejaring BKK & Alumni <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Filter & Ledger of Graduates */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-ink-strong">
                Daftar Rekam Jejak Alumni Pilihan
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                Profil representatif lulusan dari berbagai kompetensi keahlian dan lintas angkatan.
              </p>
            </div>

            <GraduateFilter />
          </div>
        </div>
      </section>

      {/* Bottom Editorial Navigation Strip */}
      <section className="border-t border-ink/10 bg-[#f3f4f6] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base font-extrabold leading-7 tracking-[-0.015em] text-ink-strong sm:text-lg">
            Lihat karya dan proyek nyata yang mereka ciptakan selama belajar di SMEKDA.
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
