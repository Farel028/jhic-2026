import type { Metadata } from "next";
import { withPageTwitter } from "@/lib/metadata";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { AboutNavigation } from "@/components/about/about-navigation";
import { DocumentaryImage } from "@/components/about/documentary-image";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { aboutImages, aboutSource, learningApproach, schoolIdentity } from "@/data/about";
import { school } from "@/config/school";

export const metadata: Metadata = withPageTwitter({
  title: "Profil Sekolah",
  description:
    "Profil SMK Negeri 2 Surabaya: identitas, pendekatan pendidikan vokasi, dan hubungan pembelajaran dengan dunia nyata.",
  alternates: { canonical: "/tentang/profil" },
  openGraph: {
    title: "Profil SMK Negeri 2 Surabaya",
    description: "Kenali identitas dan pendekatan belajar SMK Negeri 2 Surabaya.",
    url: "/tentang/profil",
  },
});

export default function ProfilePage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: "Beranda", path: "/" },
        { name: "Tentang Sekolah", path: "/tentang" },
        { name: "Profil Sekolah", path: "/tentang/profil" },
      ]} />
      <AboutNavigation activeHref="/tentang/profil" />

      <section className="hero-grid border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Profil" />
          <div className="mt-14 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div>
              <p className="eyebrow">Profil sekolah</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[0.86] tracking-[-0.07em] text-ink-strong">Pendidikan vokasi yang dekat dengan kehidupan.</h1>
            </div>
            <p className="max-w-xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">{school.name} menjadi ruang untuk membangun pengetahuan, keterampilan, karakter, dan keberanian memilih masa depan.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow">Identitas</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Berada di jantung Surabaya.</h2>
            <p className="mt-6 text-base font-medium leading-7 text-ink-muted">Berakar dari sekolah teknik sejak awal abad ke-20, identitas sekolah berkembang bersama kebutuhan pendidikan vokasi dan dunia industri.</p>
            <a href={aboutSource.profile} rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Sumber profil sekolah <ArrowUpRightIcon className="size-4" /></a>
          </div>
          <dl className="border-t border-ink/15">
            {schoolIdentity.map((item) => (
              <div key={item.label} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6">
                <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">{item.label}</dt>
                <dd className="text-lg font-extrabold leading-snug tracking-[-0.02em] text-ink-strong">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow">Pendekatan belajar</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-6xl">Tumbuh lewat proses.</h2>
              <p className="mt-6 max-w-xl text-base font-medium leading-7 text-ink-muted">Setiap tahap membantu murid beralih dari memahami dasar menuju menerapkan kompetensi dalam konteks yang semakin nyata.</p>
            </div>
            <ol className="border-t border-ink/15">
              {learningApproach.map((step) => (
                <li key={step.number} className="grid grid-cols-[auto_1fr] gap-5 border-b border-ink/15 py-6 sm:gap-8 sm:py-7">
                  <span className="text-xs font-black text-primary-strong">{step.number}</span>
                  <span>
                    <span className="block text-xl font-black tracking-[-0.03em] text-ink-strong">{step.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-ink-muted">{step.description}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <DocumentaryImage image={aboutImages.industryVisit} className="aspect-[16/10] rounded-[2rem]" sizes="(max-width: 1024px) 90vw, 52vw" />
          <div>
            <p className="eyebrow">Terhubung dengan industri</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Teori bertemu situasi nyata.</h2>
            <p className="mt-6 text-base font-medium leading-7 text-ink-muted">Kunjungan industri, praktik kerja, kegiatan bersama mitra, dan paparan budaya profesional membantu murid memahami bagaimana kompetensi digunakan di lapangan.</p>
            <Link href="/jurusan" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Jelajahi program keahlian <ArrowRightIcon className="size-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
