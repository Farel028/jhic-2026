import type { Metadata } from "next";
import { withPageTwitter } from "@/lib/metadata";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { AboutNavigation } from "@/components/about/about-navigation";
import { DocumentaryImage } from "@/components/about/documentary-image";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { aboutImages, directionThemes, learningApproach } from "@/data/about";
import { school, schoolFacts } from "@/config/school";

export const metadata: Metadata = withPageTwitter({
  title: "Tentang Sekolah",
  description:
    "Kenali identitas, sejarah, pendekatan belajar, dan arah pendidikan SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/tentang" },
  openGraph: {
    title: "Tentang SMK Negeri 2 Surabaya",
    description:
      "Sekolah vokasi dengan akar sejarah panjang, pembelajaran praktik, dan hubungan dengan dunia nyata.",
    url: "/tentang",
  },
});

const aboutCards = [
  {
    number: "01",
    title: "Profil sekolah",
    description: "Identitas, cara belajar, dan hubungan sekolah dengan dunia industri.",
    href: "/tentang/profil",
    tone: "bg-secondary",
  },
  {
    number: "02",
    title: "Kurikulum",
    description: "Peta pengalaman belajar dari fondasi hingga langkah setelah lulus.",
    href: "/tentang/kurikulum",
    tone: "bg-white",
  },
  {
    number: "03",
    title: "Jejak sejarah",
    description: "Perjalanan dari sekolah teknik era awal abad ke-20 hingga hari ini.",
    href: "/tentang/sejarah",
    tone: "bg-accent-soft",
  },
  {
    number: "04",
    title: "Visi & misi",
    description: "Arah pendidikan yang tercermin dari nilai dan kegiatan sekolah.",
    href: "/tentang/visi-misi",
    tone: "bg-[#dceefb]",
  },
  {
    number: "05",
    title: "Program keahlian",
    description: "Pilihan bidang vokasi untuk membangun keterampilan dan masa depan.",
    href: "/jurusan",
    tone: "bg-secondary",
  },
  {
    number: "06",
    title: "Fasilitas",
    description: "Galeri ruang praktik dan orientasi kampus berbasis dokumentasi sekolah.",
    href: "/tentang/fasilitas",
    tone: "bg-accent-soft",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Tentang Sekolah", path: "/tentang" },
        ]}
      />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-20">
            <div>
              <p className="eyebrow">Tentang {school.identity}</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.6rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">
                Berakar kuat. <span className="block text-primary-strong">Terus bergerak.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
                {school.name} tumbuh dari tradisi pendidikan teknik dan terus membuka ruang agar murid belajar melalui praktik, karya, serta pengalaman nyata.
              </p>
            </div>
            <div className="relative pb-7 pl-4 sm:pl-8">
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-8 -rotate-3 rounded-[2rem] bg-accent-soft" />
              <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-3 shadow-card">
                <DocumentaryImage
                  image={aboutImages.campusExpo}
                  className="aspect-[4/3] rounded-[1.35rem]"
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  preload
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutNavigation activeHref="/tentang" />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="eyebrow">Kenali sekolah</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Satu sekolah, banyak cerita.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutCards.map((card) => (
                <Link key={card.href} href={card.href} className={`group flex min-h-64 flex-col justify-between rounded-[1.75rem] border border-ink/10 p-6 shadow-sm transition-transform hover:-translate-y-1 sm:p-7 ${card.tone}`}>
                  <span className="text-xs font-black text-ink-muted">{card.number}</span>
                  <span className="mt-16">
                    <span className="block text-2xl font-black tracking-[-0.04em] text-ink-strong">{card.title}</span>
                    <span className="mt-3 block text-sm font-medium leading-6 text-ink-muted">{card.description}</span>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong">Jelajahi <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <dl className="mt-20 grid border-y border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {schoolFacts.map((fact) => (
              <div key={fact.label} className="border-b border-ink/15 py-7 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{fact.label}</dt>
                <dd className="mt-3 text-3xl font-black tracking-[-0.045em] text-ink-strong sm:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Cara kami belajar</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5vw,5.6rem)] font-black leading-[0.92] tracking-[-0.06em]">Dari fondasi menuju langkah setelah lulus.</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-white/65 lg:justify-self-end">Alur ini merupakan gambaran pengalaman vokasi, bukan struktur kurikulum resmi per tingkat.</p>
          </div>
          <ol className="mt-12 grid border-t border-white/15 md:grid-cols-5">
            {learningApproach.map((step) => (
              <li key={step.number} className="border-b border-white/15 py-7 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <span className="text-xs font-black text-accent-strong">{step.number}</span>
                <h3 className="mt-8 text-xl font-black tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/60">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">Nilai yang bergerak</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Bukan hanya kata di dinding.</h2>
              <p className="mt-6 text-base font-medium leading-7 text-ink-muted">Arah sekolah terlihat melalui kegiatan yang membawa murid lebih dekat pada industri, masyarakat, dan pilihan masa depan.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {directionThemes.map((theme) => (
                <article key={theme.code} className="rounded-3xl border border-ink/10 bg-[#eef7fd] p-6">
                  <p className="text-xs font-black tracking-[0.14em] text-primary-strong">{theme.code}</p>
                  <h3 className="mt-8 text-xl font-black leading-snug tracking-[-0.03em] text-ink-strong">{theme.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink-muted">{theme.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
