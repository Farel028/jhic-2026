import type { Metadata } from "next";
import { withPageTwitter } from "@/lib/metadata";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { aboutSource, historyTimeline } from "@/data/about";

export const metadata: Metadata = withPageTwitter({
  title: "Sejarah Sekolah",
  description:
    "Perjalanan sejarah SMK Negeri 2 Surabaya dari sekolah teknik era awal abad ke-20 hingga menjadi sekolah menengah kejuruan.",
  alternates: { canonical: "/tentang/sejarah" },
  openGraph: {
    title: "Sejarah SMK Negeri 2 Surabaya",
    description: "Menelusuri jejak panjang pendidikan teknik SMK Negeri 2 Surabaya.",
    url: "/tentang/sejarah",
  },
});

export default function HistoryPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: "Beranda", path: "/" },
        { name: "Tentang Sekolah", path: "/tentang" },
        { name: "Sejarah", path: "/tentang/sejarah" },
      ]} />

      <section className="relative overflow-hidden bg-ink-strong px-5 py-14 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <span aria-hidden="true" className="absolute -right-12 top-10 text-[13rem] font-black leading-none tracking-[-0.1em] text-white/[0.04] sm:text-[23rem]">1912</span>
        <div className="relative mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Sejarah" inverse />
          <div className="mt-16 max-w-6xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Jejak waktu</p>
            <h1 className="mt-5 text-[clamp(3.7rem,9vw,8.8rem)] font-black leading-[0.84] tracking-[-0.075em]">Lebih dari satu abad bertumbuh.</h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-white/65 sm:text-xl sm:leading-9">Nama dan zamannya berubah, tetapi pendidikan teknik terus menjadi benang merah perjalanan sekolah ini.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site gap-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Arsip sejarah</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Waktu membentuk identitas.</h2>
            <p className="mt-6 text-sm leading-6 text-ink-muted">Urutan ini diringkas dari laman profil sekolah. Istilah dan rentang tahun mengikuti sumber tersebut; bagian yang belum pasti ditulis apa adanya.</p>
            <a href={aboutSource.profile} rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Baca sumber sejarah <ArrowUpRightIcon className="size-4" /></a>
          </div>

          <ol className="relative border-l border-ink/20 pl-7 sm:pl-10">
            {historyTimeline.map((event, index) => (
              <li key={event.title} className="relative border-b border-ink/15 py-8 first:pt-0 sm:py-10">
                <span aria-hidden="true" className={`absolute -left-[2.15rem] top-10 size-3 rounded-full ring-8 ring-background sm:-left-[2.85rem] ${index % 2 === 0 ? "bg-primary" : "bg-accent-strong"}`} />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-strong">{event.period}</p>
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong sm:text-4xl">{event.title}</h3>
                <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">{event.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-site items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="eyebrow">Arsip visual</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-6xl">Foto lama sedang dikurasi.</h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-ink-muted">Kami tidak menggunakan foto generatif untuk menggantikan dokumentasi sejarah. Area ini disiapkan untuk arsip nyata setelah sumber dan izin publikasinya terkonfirmasi.</p>
          </div>
          <div role="img" aria-label="Placeholder arsip foto sejarah sekolah" className="grid aspect-[4/3] place-items-center rounded-[2rem] border-2 border-dashed border-ink/20 bg-white p-8 text-center">
            <span>
              <span className="block text-7xl font-black tracking-[-0.08em] text-secondary sm:text-8xl">1912</span>
              <span className="mt-4 block text-xs font-extrabold uppercase tracking-[0.18em] text-ink-muted">Arsip foto terverifikasi menyusul</span>
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-xl font-black leading-tight tracking-[-0.03em] text-ink-strong">Lihat bagaimana warisan tersebut diterjemahkan ke dalam arah pendidikan hari ini.</p>
          <Link href="/tentang/visi-misi" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Visi & misi <ArrowRightIcon className="size-4" /></Link>
        </div>
      </section>
    </main>
  );
}
