import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { schoolMission, schoolVision } from "@/data/about";

export function VisionMission() {
  return (
    <section
      aria-labelledby="visi-misi-heading"
      className="border-b border-ink/10 bg-[#f3f4f6] px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <div className="mx-auto w-full max-w-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p id="visi-misi-heading" className="eyebrow">Visi dan misi</p>
          <Link
            href="/tentang/profil#visi-misi"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary-strong decoration-2 underline-offset-8"
          >
            Profil sekolah <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <p className="mt-4 max-w-4xl text-lg font-bold leading-8 tracking-[-0.01em] text-ink-strong sm:text-xl sm:leading-9">
          <span className="mr-3 text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">
            Visi
          </span>
          {schoolVision}
        </p>
        <ol className="mt-6 grid gap-x-10 border-t border-ink/15 sm:grid-cols-2">
          {schoolMission.map((mission, index) => (
            <li key={mission} className="flex gap-3 border-b border-ink/15 py-3">
              <span className="pt-1 text-xs font-extrabold tabular-nums text-primary-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-bold leading-6 text-ink-strong sm:text-base sm:leading-7">
                {mission}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
