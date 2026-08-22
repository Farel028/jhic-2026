import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export function VirtualTourCta() {
  return (
    <section className="relative min-h-[calc(100svh-4.75rem)] overflow-hidden bg-ink-strong lg:min-h-[calc(100svh-5.25rem)]" aria-labelledby="virtual-tour-cta-title">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 size-full origin-center scale-150 object-cover object-center"
      >
        <source src="/tours/virtual-tour.webm" type="video/webm" />
        <source src="/tours/virtual-tour.mp4" type="video/mp4" />
      </video>

      <div aria-hidden="true" className="absolute inset-0 bg-ink-strong/55" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,18,32,0.42)_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-4.75rem)] w-full max-w-site flex-col items-center justify-center px-5 py-12 text-center text-white sm:px-8 sm:py-16 lg:min-h-[calc(100svh-5.25rem)] lg:px-10 lg:py-20">
        <h2 id="virtual-tour-cta-title" className="text-3xl font-extrabold tracking-[-0.025em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] sm:text-4xl">
          SMEKDA Tour
        </h2>
        <p className="mt-3 text-sm font-semibold text-white/80 sm:text-base">Yuk, lihat suasana sekolah lebih dekat.</p>
        <Link href="/virtual-tour" className="mt-5 inline-flex min-h-14 items-center gap-4 rounded-full border border-white/45 bg-white/10 py-1.5 pl-5 pr-1.5 text-sm font-black text-white shadow-[0_14px_38px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/18">
          Mulai Virtual Tour
          <span className="grid size-10 place-items-center rounded-full bg-white text-ink-strong shadow-md">
            <ArrowRightIcon className="size-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
