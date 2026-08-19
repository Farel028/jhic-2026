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
import { ArrowRightIcon } from "@/components/ui/icons";
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
      <section className="relative isolate overflow-hidden border-b border-ink/10 bg-[#f4f6f8] px-4 pt-8 sm:px-8 sm:pt-12 lg:px-10 lg:pt-14">
        <div aria-hidden="true" className="absolute left-1/2 top-20 aspect-square w-[33rem] -translate-x-1/2 rounded-full border border-dashed border-primary/25 sm:w-[52rem] lg:top-8 lg:w-[76rem]" />
        <div aria-hidden="true" className="absolute left-1/2 top-36 aspect-square w-[24rem] -translate-x-1/2 rounded-full border border-dashed border-primary/20 sm:w-[38rem] lg:top-24 lg:w-[58rem]" />

        <div className="relative mx-auto flex w-full max-w-site flex-col items-center text-center">
          <div className="relative z-10 w-full max-w-5xl px-4 py-6 sm:px-10 sm:py-9 lg:py-11">
            <p className="relative z-10 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-sm lg:text-base">
              SMK Bisa, SMK Hebat
            </p>
            <h1 className="relative z-10 mt-2 text-[clamp(1.7rem,5vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.055em] text-ink-strong sm:mt-3">
              SMKN 2 Surabaya
              <span className="block text-primary-strong">Smart Berkarakter</span>
            </h1>
          </div>

          <div className="relative mt-4 w-full max-w-[76rem] sm:mt-7 lg:mt-9">
            <div aria-hidden="true" className="absolute bottom-0 left-1/2 aspect-[1.8/1] w-[78%] -translate-x-1/2 rounded-t-full bg-accent-strong/80" />
            <Image
              src="/images/school/11-jurusan.png"
              alt="Sebelas siswa SMK Negeri 2 Surabaya mengenakan seragam praktik dari berbagai program keahlian"
              width={2163}
              height={727}
              sizes="(max-width: 640px) 94vw, (max-width: 1536px) 88vw, 1216px"
              preload
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_14px_16px_rgba(11,31,51,0.16)]"
            />
          </div>

          <dl className="relative z-20 -mt-1 grid w-[94%] max-w-4xl grid-cols-3 overflow-hidden rounded-t-2xl bg-primary text-white shadow-card sm:-mt-7 sm:rounded-t-3xl lg:-mt-16">
            <div className="flex flex-col px-2 py-3 sm:px-6 sm:py-5">
              <dt className="text-[0.58rem] font-semibold text-white/75 sm:text-xs">Program keahlian</dt>
              <dd className="order-first mb-0.5 text-xl font-extrabold tracking-[-0.04em] sm:text-3xl lg:text-4xl">11</dd>
            </div>
            <div className="flex flex-col border-x border-dashed border-white/45 px-2 py-3 sm:px-6 sm:py-5">
              <dt className="text-[0.58rem] font-semibold text-white/75 sm:text-xs">Akreditasi</dt>
              <dd className="order-first mb-0.5 text-xl font-extrabold tracking-[-0.04em] sm:text-3xl lg:text-4xl">{school.accreditation}</dd>
            </div>
            <div className="flex flex-col px-2 py-3 sm:px-6 sm:py-5">
              <dt className="text-[0.58rem] font-semibold text-white/75 sm:text-xs">Berdiri sejak</dt>
              <dd className="order-first mb-0.5 text-xl font-extrabold tracking-[-0.04em] sm:text-3xl lg:text-4xl">{school.historicalSince}</dd>
            </div>
          </dl>
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
