import Image from "next/image";
import type { Metadata } from "next";
import { AchievementShowcase } from "@/components/home/achievement-showcase";
import { InstagramSection } from "@/components/home/instagram-section";
import { MajorExplorer } from "@/components/home/major-explorer";
import { AdmissionCta, AlumniOutcome } from "@/components/home/outcomes-stories";
import { PartnerTicker } from "@/components/home/partner-ticker";
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
      <section className="relative isolate overflow-hidden bg-[#f1f0ea] px-4 pt-3 sm:px-8 sm:pt-4 lg:px-10 lg:pt-5">
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
          <path d="M-80 440 640 82" stroke="#e9b521" strokeOpacity="0.72" strokeWidth="14" />
          <path d="m1680 440-720-358" stroke="#e9b521" strokeOpacity="0.72" strokeWidth="14" />
          <path d="M252 440 692 82" stroke="#176b9f" strokeOpacity="0.22" strokeWidth="4" />
          <path d="m1348 440-440-358" stroke="#176b9f" strokeOpacity="0.22" strokeWidth="4" />
          <path d="M338 324h924" stroke="#e9b521" strokeOpacity="0.65" strokeWidth="10" />
          <path d="M532 218h536" stroke="#176b9f" strokeOpacity="0.18" strokeWidth="4" />
          <path d="M0 405h210v35H0zM1390 405h210v35h-210z" fill="#176b9f" fillOpacity="0.55" />
        </svg>

        <div className="relative mx-auto flex w-full max-w-site flex-col items-center text-center">
          <div className="relative z-10 w-full max-w-5xl px-4 pb-2 pt-1 sm:px-10 sm:pb-3 sm:pt-2 lg:pb-4 lg:pt-3">
            <p className="relative z-10 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-sm lg:text-base">
              SMK Bisa, SMK Hebat
            </p>
            <h1 className="relative z-10 mt-2 text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong sm:mt-3">
              SMKN 2 Surabaya
              <span className="mt-1 block text-[0.80em] leading-[1.08] tracking-[-0.025em] text-primary-strong">
                Smart Berkarakter
              </span>
            </h1>
          </div>

          <div className="relative mt-1 w-full max-w-[76rem] sm:mt-1 lg:max-w-[64rem] xl:max-w-[68rem] 2xl:max-w-[72rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[8%] bottom-[1.5%] z-0 h-4 rounded-[50%] bg-ink-strong/10 blur-[20px] sm:h-5 lg:inset-x-[7%]"
            />
            <Image
              src="/images/school/11-jurusan.webp"
              alt="Sebelas siswa SMK Negeri 2 Surabaya mengenakan seragam praktik dari berbagai program keahlian"
              width={2163}
              height={727}
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1103px) calc(100vw - 5rem), (max-width: 1279px) 1024px, (max-width: 1535px) 1088px, 1152px"
              priority
              className="relative z-10 h-auto w-full object-contain [filter:saturate(.94)_contrast(.99)] lg:[filter:saturate(.88)_contrast(.97)_brightness(.99)]"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-b from-transparent via-white/55 to-white sm:h-16 lg:h-20"
        />
      </section>

      <SchoolIntroduction />

      <section id="jurusan" className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-7 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="max-w-4xl text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong">11 Program Keahlian</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted lg:justify-self-end lg:text-lg">Pilih bidang yang ingin kamu pelajari lebih jauh.</p>
          </div>
          <MajorExplorer />
        </div>
      </section>

      <AchievementShowcase />
      <PracticeShowcase />
      <AlumniOutcome />
      <PartnerTicker />
      <VirtualTourCta />
      <InstagramSection />
      <AdmissionCta />
    </main>
  );
}
