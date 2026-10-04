import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { schoolMission, schoolVision } from "@/data/about";

export function VisionMission() {
  return (
    <section
      aria-labelledby="visi-misi-heading"
      className="border-b border-ink/10 bg-[#f8f9fa] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto w-full max-w-site">
        {/* Header bar */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/15 pb-6">
          <div>
            <h2 id="visi-misi-heading" className="text-3xl font-black tracking-tight text-ink-strong sm:text-4xl lg:text-[2.75rem] leading-tight">
              Visi & Misi Sekolah
            </h2>
          </div>

          <Link
            href="/tentang/profil#visi-misi"
            className="inline-flex items-center gap-2.5 border-b-2 border-primary pb-1 text-base font-extrabold text-ink-strong transition-colors hover:text-primary-strong sm:text-lg"
          >
            Profil lengkap sekolah <ArrowRightIcon className="size-4 sm:size-5" />
          </Link>
        </div>

        {/* Content Grid: Visi (Kiri) & Misi (Kanan) */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Card Visi */}
          <div className="flex flex-col justify-start bg-white p-7 sm:p-9 shadow-xs">
            <div>
              <span className="inline-block text-base font-black uppercase tracking-[0.14em] text-primary-strong sm:text-lg">
                Visi
              </span>
              <blockquote className="mt-4 text-xl font-bold leading-relaxed text-ink-strong sm:text-2xl sm:leading-10">
                &ldquo;{schoolVision}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* List Misi */}
          <div>
            <div className="mb-4">
              <span className="text-base font-black uppercase tracking-[0.14em] text-ink-strong sm:text-lg">
                Misi
              </span>
            </div>

            <ol className="divide-y divide-ink/10 border-t border-b border-ink/10">
              {schoolMission.map((mission, index) => (
                <li
                  key={mission}
                  className="group flex items-start gap-4 py-4 transition-colors hover:bg-white/60 sm:py-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center bg-ink-strong text-xs font-black text-white transition-colors group-hover:bg-primary-strong">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-bold leading-relaxed text-ink-strong sm:text-lg sm:leading-8">
                    {mission}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
