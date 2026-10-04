import type { Metadata } from "next";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { FacilityShowcase } from "@/components/home/facility-showcase";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { facilityStats, initialFacilities } from "@/data/facilities";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Fasilitas Sekolah",
  description:
    "Katalog sarana dan prasarana penunjang pembelajaran, laboratorium teknis, bengkel kejuruan, dan Teaching Factory di SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/tentang/fasilitas" },
  openGraph: {
    title: "Fasilitas SMK Negeri 2 Surabaya",
    description:
      "Ruang belajar modern, laboratorium, dan bengkel praktik berstandar industri di SMK Negeri 2 Surabaya.",
    url: "/tentang/fasilitas",
  },
});

export default function FacilitiesPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Tentang Sekolah", path: "/tentang" },
          { name: "Fasilitas", path: "/tentang/fasilitas" },
        ]}
      />

      {/* Hero Header */}
      <section className="border-b border-ink/10 bg-[#f3f4f6] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Fasilitas" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">Sarana & Prasarana Vokasi</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
                Fasilitas Penunjang Pembelajaran
              </h1>
            </div>
            <div>
              <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
                Ruang belajar teori, laboratorium komputer, bengkel praktik, dan
                Teaching Factory yang dirancang untuk mendukung pembelajaran
                berbasis industri terkini.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/peta-sekolah"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink-strong px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-strong"
                >
                  Lihat Denah di Peta 3D <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-ink/10 pt-8 sm:grid-cols-4 sm:gap-6">
            {facilityStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-ink-strong sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-semibold text-ink-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explorer / Catalog Section */}
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <div className="mb-8">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong sm:text-2xl">
              Katalog Fasilitas Kampus
            </h2>
            <p className="mt-1 text-xs font-medium text-ink-muted sm:text-sm">
              Cari dan filter fasilitas berdasarkan kategori untuk melihat sarana pendukung pembelajaran di SMK Negeri 2 Surabaya.
            </p>
          </div>

          <FacilityShowcase initialItems={initialFacilities} showPageLink={false} />
        </div>
      </section>
    </main>
  );
}
