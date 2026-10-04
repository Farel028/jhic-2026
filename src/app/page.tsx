import Image from "next/image";
import type { Metadata } from "next";
import { AchievementShowcase } from "@/components/home/achievement-showcase";
import { InstagramSection } from "@/components/home/instagram-section";
import { MajorExplorer } from "@/components/home/major-explorer";
import { AdmissionCta } from "@/components/home/outcomes-stories";
import { PracticeShowcase } from "@/components/home/practice-showcase";
import { SchoolIntroduction } from "@/components/home/school-introduction";
import { VisionMission } from "@/components/home/vision-mission";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { VirtualTourCta } from "@/components/home/virtual-tour-cta";
import { CampusMapCta } from "@/components/home/campus-map-cta";
import { SchoolJsonLd } from "@/components/seo/school-json-ld";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Refresh the cached homepage after the daily Instagram snapshot changes.
export const revalidate = 60;

export default function Home() {
  return (
    <main id="konten-utama" className="flex-1">
      <SchoolJsonLd />
      <section className="relative isolate overflow-hidden bg-[#f3f4f6] px-4 pt-6 sm:px-8 sm:pt-8 lg:px-10 lg:pt-10">
        {/* Subtle Architectural Drafting Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#0b2447_1px,transparent_1px),linear-gradient(to_bottom,#0b2447_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
        />

        {/* Clean Typographic Badge & Institutional Masthead (Hero Backdrop - Scaled Proportional to Viewport) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[35%] sm:top-[37%] lg:top-[39%] -translate-y-1/2 select-none flex items-center justify-center text-center overflow-visible">
          <span className="block font-sans text-[clamp(4.25rem,19vw,15rem)] font-black tracking-[0.16em] sm:tracking-[0.22em] text-[#092244]/[0.055] leading-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] whitespace-nowrap">
            <span className="inline-block translate-x-[0.08em] sm:translate-x-[0.11em]">SMEKDA</span>
          </span>
        </div>

        {/* Engineering Coordinate & Datum Markers (Hidden on Mobile) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-8 sm:inset-x-8 sm:top-10 hidden sm:flex items-center justify-between text-[0.62rem] sm:text-[0.7rem] font-bold font-mono text-[#0b2447]/30 tracking-widest uppercase">
          <span>LAT -7.2584° · LON 112.7256°</span>
          <span>EST. 1912 · SURABAYA</span>
        </div>

        {/* Precision Drafting Axis Behind Students */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
          <svg
            viewBox="0 0 1440 260"
            fill="none"
            preserveAspectRatio="none"
            className="h-44 w-full max-w-[96rem] opacity-35 sm:h-56 lg:h-64"
          >
            {/* Soft Ambient Horizon Center Light */}
            <radialGradient id="draftingGlow" cx="50%" cy="100%" r="55%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <rect width="1440" height="260" fill="url(#draftingGlow)" />

            {/* Precision Technical Center Axis */}
            <line x1="720" y1="30" x2="720" y2="260" stroke="#0b2447" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.25" />
            <circle cx="720" cy="30" r="3.5" fill="#0b2447" fillOpacity="0.35" />

            {/* Horizontal Datum Elevation Lines */}
            <line x1="120" y1="210" x2="1320" y2="210" stroke="#0b2447" strokeWidth="1.2" strokeOpacity="0.2" />
            <line x1="280" y1="160" x2="1160" y2="160" stroke="#0b2447" strokeWidth="0.8" strokeDasharray="6 6" strokeOpacity="0.2" />

            {/* Dimension ticks */}
            <line x1="280" y1="154" x2="280" y2="166" stroke="#0b2447" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="1160" y1="154" x2="1160" y2="166" stroke="#0b2447" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="120" y1="204" x2="120" y2="216" stroke="#0b2447" strokeWidth="1.2" strokeOpacity="0.3" />
            <line x1="1320" y1="204" x2="1320" y2="216" stroke="#0b2447" strokeWidth="1.2" strokeOpacity="0.3" />

            {/* Elevation labels */}
            <text x="135" y="202" fill="#0b2447" fillOpacity="0.3" fontSize="10" fontFamily="monospace" fontWeight="600">EL +0.00 (BENCHMARK)</text>
            <text x="295" y="152" fill="#0b2447" fillOpacity="0.28" fontSize="9" fontFamily="monospace" fontWeight="600">REF AXIS // 11 KEJURUAN</text>
          </svg>
        </div>

        {/* Ambient Pedestal Light directly behind students */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-10 -translate-x-1/2 w-[72vw] max-w-4xl h-48 rounded-[100%] bg-gradient-to-t from-white via-white/80 to-transparent blur-3xl opacity-75"
        />

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
              alt="Sebelas siswa SMK Negeri 2 Surabaya mengenakan seragam praktik dari berbagai jurusan"
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

      <VisionMission />

      <WhyChooseUs />

      <section id="jurusan" className="border-b border-ink/10 bg-[#f3f4f6] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-7 lg:items-center lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="max-w-4xl text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong">Temukan jurusan yang cocok untukmu</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted lg:justify-self-end lg:text-lg">Pilih bidang yang ingin kamu pelajari lebih jauh.</p>
          </div>
          <MajorExplorer />
        </div>
      </section>

      <AchievementShowcase />
      <PracticeShowcase />
      <VirtualTourCta />
      <CampusMapCta />
      <InstagramSection />
      <AdmissionCta />
    </main>
  );
}
