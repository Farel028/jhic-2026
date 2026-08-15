import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AchievementTicker } from "@/components/home/achievement-ticker";
import { LearningJourney } from "@/components/home/learning-journey";
import { MajorExplorer } from "@/components/home/major-explorer";
import { AdmissionCta, AlumniOutcome, LatestStories } from "@/components/home/outcomes-stories";
import { PracticeShowcase } from "@/components/home/practice-showcase";
import { PrincipalMessage } from "@/components/home/principal-message";
import { UniformAndTour } from "@/components/home/uniform-tour";
import { SchoolJsonLd } from "@/components/seo/school-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { school, schoolFacts } from "@/config/school";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main id="konten-utama" className="flex-1">
      <SchoolJsonLd />
      <section className="hero-grid relative isolate min-h-[calc(100svh-4.75rem)] overflow-hidden border-b border-ink/10">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-secondary/30 to-transparent" />
        <div className="mx-auto grid min-h-[calc(100svh-4.75rem)] w-full max-w-site items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/75 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-ink-muted shadow-sm backdrop-blur-sm">
              <span className="size-2 rounded-full bg-accent-strong shadow-[0_0_0_4px_rgba(255,202,10,0.2)]" />
              Sekolah vokasi di jantung Surabaya
            </div>

            <h1 className="mt-8 max-w-3xl text-[clamp(3.25rem,8vw,7.3rem)] font-black leading-[0.88] tracking-[-0.075em] text-ink-strong">
              Belajar nyata.
              <span className="block text-primary-strong">Berkarya nyata.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
              Kenali program keahlian, karya, prestasi, dan perjalanan murid {school.name} menuju dunia kerja dan pendidikan lanjutan.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#jurusan" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">
                Jelajahi sekolah <ArrowRightIcon className="size-4" />
              </a>
              <a href={school.urls.admissions} className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-accent-strong px-6 text-sm font-extrabold text-ink-strong transition-transform hover:-translate-y-0.5" rel="noreferrer">
                Info SPMB 2026 <ArrowUpRightIcon className="size-4" />
              </a>
            </div>
            <p className="mt-4 text-xs leading-5 text-ink-muted">Rangkaian pendaftaran SPMB Jawa Timur 2026 telah berakhir. Tautan membuka portal informasi resmi.</p>
          </div>

          <div className="relative mx-auto flex aspect-[4/4.35] w-full max-w-[34rem] items-center justify-center lg:mr-0">
            <div aria-hidden="true" className="absolute inset-[6%] rotate-3 rounded-[3rem] bg-primary" />
            <div aria-hidden="true" className="absolute inset-x-[1%] inset-y-[12%] -rotate-3 rounded-[3rem] border-2 border-ink-strong bg-accent-soft" />
            <div className="relative flex h-[72%] w-[75%] flex-col items-center justify-center rounded-[2.25rem] border border-ink/10 bg-white px-8 text-center shadow-card">
              <span aria-hidden="true" className="absolute -right-7 top-8 text-[6.5rem] font-black leading-none tracking-[-0.08em] text-secondary/55 sm:text-[8rem]">02</span>
              <div className="relative size-36 overflow-hidden sm:size-44">
                <Image src={school.logo.src} alt={school.logo.alt} fill sizes="176px" className="object-contain p-2" loading="eager" fetchPriority="high" />
              </div>
              <p className="relative mt-7 text-xs font-extrabold uppercase tracking-[0.22em] text-primary-strong">{school.identity}</p>
              <p className="relative mt-2 max-w-xs text-lg font-black leading-tight tracking-[-0.03em] text-ink-strong sm:text-xl">Smart, terampil, dan berkarakter.</p>
            </div>
            <span className="absolute bottom-[2%] left-[2%] -rotate-3 rounded-full border-2 border-ink-strong bg-accent-strong px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-ink-strong">Surabaya · Jawa Timur</span>
          </div>
        </div>
      </section>

      <AchievementTicker />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow">Tentang sekolah</p>
              <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] font-black leading-[0.94] tracking-[-0.06em] text-ink-strong">Lebih dari ruang kelas.</h2>
            </div>
            <div className="lg:pt-12">
              <p className="max-w-2xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
                Berakar dari sekolah teknik yang telah hadir sejak awal abad ke-20, {school.shortName} terus menjadi ruang belajar vokasi bagi generasi baru Surabaya.
              </p>
              <Link href="/tentang/profil" className="mt-7 inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">
                Kenali sekolah kami <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <dl className="mt-14 grid border-y border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {schoolFacts.map((fact) => (
              <div key={fact.label} className="border-b border-ink/15 py-7 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{fact.label}</dt>
                <dd className="mt-3 text-3xl font-black tracking-[-0.045em] text-ink-strong sm:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-ink-muted">Sumber identitas dan data pokok: laman sekolah dan Referensi Data Kemendikdasmen.</p>
        </div>
      </section>

      <PrincipalMessage />

      <section id="jurusan" className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-7 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">Pilihan program keahlian</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5.5vw,5.6rem)] font-black leading-[0.92] tracking-[-0.065em] text-ink-strong">Temukan bidangmu. Bangun masa depanmu.</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted lg:justify-self-end lg:text-lg">Mulai dari teknologi digital, konstruksi, elektronika, hingga otomotif. Buka katalog untuk melihat seluruh pilihan yang tercatat pada sumber sekolah.</p>
          </div>
          <MajorExplorer />
          <div className="mt-7 flex justify-end">
            <Link href="/jurusan" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-ink/20 bg-white px-5 text-sm font-extrabold text-ink-strong transition-colors hover:bg-secondary/25">
              Lihat semua program <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <LearningJourney />
      <PracticeShowcase />
      <UniformAndTour />
      <AlumniOutcome />
      <LatestStories />
      <AdmissionCta />
    </main>
  );
}
