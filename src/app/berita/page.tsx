import type { Metadata } from "next";
import Link from "next/link";
import { NewsroomFilter } from "@/components/documentation/newsroom-filter";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Berita Sekolah",
  description:
    "Berita kegiatan, prestasi, karier, industri, dan program SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/berita" },
  openGraph: {
    title: "Berita SMK Negeri 2 Surabaya",
    description: "Kabar terbaru dari kegiatan dan perjalanan warga SMEKDA.",
    url: "/berita",
  },
});

export default function NewsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Berita", path: "/berita" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
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
                Berita
              </li>
            </ol>
          </nav>

          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Berita Sekolah
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Kabar tentang kegiatan, prestasi, pembelajaran, dan langkah baru
              dari warga SMEKDA.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <NewsroomFilter />
        </div>
      </section>
    </main>
  );
}
