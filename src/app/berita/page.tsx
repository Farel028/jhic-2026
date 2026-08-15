import type { Metadata } from "next";
import { withPageTwitter } from "@/lib/metadata";
import Link from "next/link";
import { NewsroomFilter } from "@/components/documentation/newsroom-filter";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata: Metadata = withPageTwitter({
  title: "Berita Sekolah",
  description: "Newsroom SMK Negeri 2 Surabaya dengan berita kegiatan, prestasi, karier, industri, dan program sekolah.",
  alternates: { canonical: "/berita" },
  openGraph: {
    title: "Berita SMK Negeri 2 Surabaya",
    description: "Jelajahi publikasi sekolah berdasarkan kategori dan tahun.",
    url: "/berita",
  },
});

export default function NewsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Dokumentasi", path: "/dokumentasi" }, { name: "Berita", path: "/berita" }]} />
      <section className="hero-grid border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted"><li><Link href="/" className="hover:text-primary-strong">Beranda</Link></li><li aria-hidden="true">/</li><li><Link href="/dokumentasi" className="hover:text-primary-strong">Dokumentasi</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-ink-strong">Berita</li></ol></nav>
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div><p className="eyebrow">Newsroom sekolah</p><h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">Kabar, karya, <span className="block text-primary-strong">dan langkah baru.</span></h1></div>
            <p className="max-w-xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">Kurasi publikasi sekolah yang dapat dijelajahi berdasarkan kategori dan tahun. Artikel lengkap tetap dibaca dari sumber aslinya.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"><div className="mx-auto w-full max-w-site"><NewsroomFilter /><p className="mt-10 border-t border-ink/10 pt-5 text-xs leading-5 text-ink-muted">Newsroom ini merupakan kurasi awal dari publikasi resmi sekolah dan belum memuat seluruh arsip.</p></div></section>
    </main>
  );
}
