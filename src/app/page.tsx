import Image from "next/image";
import type { Metadata } from "next";
import { AchievementTicker } from "@/components/home/achievement-ticker";
import { InstagramSection } from "@/components/home/instagram-section";
import { MajorExplorer } from "@/components/home/major-explorer";
import { AdmissionCta, AlumniOutcome } from "@/components/home/outcomes-stories";
import { PracticeShowcase } from "@/components/home/practice-showcase";
import { SchoolIntroduction } from "@/components/home/school-introduction";
import { VirtualTourCta } from "@/components/home/virtual-tour-cta";
import { SchoolJsonLd } from "@/components/seo/school-json-ld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main id="konten-utama" className="flex-1">
      <SchoolJsonLd />
      <section className="relative isolate overflow-hidden border-b border-ink/10 bg-[#f1f0ea] px-4 pt-3 sm:px-8 sm:pt-4 lg:px-10 lg:pt-5">
        <div aria-hidden="true" className="absolute left-0 top-9 h-px w-[22%] bg-primary-strong/35 sm:top-12" />
        <div aria-hidden="true" className="absolute left-[22%] top-[2.05rem] h-2 w-14 bg-primary-strong sm:top-[2.7rem] sm:w-24" />
        <div aria-hidden="true" className="absolute right-0 top-20 h-px w-[18%] bg-ink/20 sm:top-28" />
        <div aria-hidden="true" className="absolute right-[18%] top-[4.65rem] h-2 w-10 bg-accent-strong sm:top-[6.55rem] sm:w-16" />

        <svg
          aria-hidden="true"
          viewBox="0 0 1600 440"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[42%] w-full"
        >
          <path d="M0 0h1600v440H0z" fill="#e3e6e3" />
          <path d="M-80 440 640 82" stroke="#e9b521" strokeWidth="18" />
          <path d="m1680 440-720-358" stroke="#e9b521" strokeWidth="18" />
          <path d="M252 440 692 82" stroke="#176b9f" strokeOpacity="0.34" strokeWidth="5" />
          <path d="m1348 440-440-358" stroke="#176b9f" strokeOpacity="0.34" strokeWidth="5" />
          <path d="M338 324h924" stroke="#e9b521" strokeWidth="13" />
          <path d="M532 218h536" stroke="#176b9f" strokeOpacity="0.3" strokeWidth="5" />
          <path d="M0 405h210v35H0zM1390 405h210v35h-210z" fill="#176b9f" fillOpacity="0.82" />
        </svg>

        <div className="relative mx-auto flex w-full max-w-site flex-col items-center text-center">
          <div className="relative z-10 w-full max-w-5xl px-4 pb-2 pt-1 sm:px-10 sm:pb-3 sm:pt-2 lg:pb-4 lg:pt-3">
            <p className="relative z-10 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-sm lg:text-base">
              SMK Bisa, SMK Hebat
            </p>
            <h1 className="relative z-10 mt-2 text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong sm:mt-3">
              SMKN 2 Surabaya
              <span className="block text-primary-strong">Smart Berkarakter</span>
            </h1>
          </div>

          <div className="relative mt-1 w-full max-w-[76rem] sm:mt-2">
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
        </div>
      </section>

      <AchievementTicker />
      <SchoolIntroduction />

      <section id="jurusan" className="border-y border-ink/10 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-7 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">Program Keahlian</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong">Pilih dari 11 jurusan.</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted lg:justify-self-end lg:text-lg">Temukan bidang teknologi, konstruksi, elektronika, dan otomotif yang sesuai dengan minatmu.</p>
          </div>
          <MajorExplorer />
        </div>
      </section>

      <PracticeShowcase />
      <VirtualTourCta />
      <AlumniOutcome />
      <InstagramSection />
      <AdmissionCta />
    </main>
  );
}
