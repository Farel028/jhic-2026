import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { uniformScheduleStatus } from "@/config/uniform";

const schoolDays = ["Sen", "Sel", "Rab", "Kam", "Jum"] as const;

export function UniformAndTour() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto grid w-full max-w-site gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <article className="flex min-h-[31rem] flex-col rounded-[1.75rem] border border-ink/10 bg-accent-soft p-7 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-muted">Seragam hari ini</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.055em] text-ink-strong">Hari ini kami memakai…</h2>
            </div>
            <span className="rounded-full border border-ink/15 bg-white/65 px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-ink-muted">Menunggu data</span>
          </div>

          <div className="my-auto py-12">
            <div className="flex gap-2" aria-label="Hari sekolah">
              {schoolDays.map((day) => (
                <span key={day} className="grid size-12 place-items-center rounded-full border border-ink/15 bg-white/55 text-xs font-black text-ink-muted">{day}</span>
              ))}
            </div>
            <p className="mt-8 max-w-md text-xl font-bold leading-8 tracking-[-0.02em] text-ink-strong">{uniformScheduleStatus.message}</p>
          </div>

          <p className="border-t border-ink/15 pt-5 text-sm leading-6 text-ink-muted">Konfigurasi jadwal sudah dipisahkan dari komponen UI dan siap diisi setelah sekolah mengonfirmasi mapping Senin–Jumat.</p>
        </article>

        <article className="campus-map relative flex min-h-[35rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-primary p-7 text-ink-strong sm:p-10 lg:min-h-[31rem] lg:p-12">
          <div aria-hidden="true" className="absolute inset-0">
            <span className="absolute left-[13%] top-[18%] h-[28%] w-[30%] rotate-6 rounded-[2rem] border-2 border-ink-strong/25 bg-white/30" />
            <span className="absolute bottom-[15%] right-[10%] h-[30%] w-[33%] -rotate-6 rounded-[2rem] border-2 border-ink-strong/25 bg-accent-soft/75" />
            <span className="absolute left-[45%] top-[40%] size-5 rounded-full bg-accent-strong ring-[12px] ring-white/35" />
          </div>
          <div className="relative max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-ink">Virtual campus tour</p>
            <h2 className="mt-5 text-[clamp(2.8rem,5vw,5.2rem)] font-black leading-[0.92] tracking-[-0.065em]">Masuk ke sekolah, dari mana saja.</h2>
          </div>
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-base font-semibold leading-7 text-ink">Jelajahi fasilitas yang sudah terdokumentasi. Virtual Tour 360° akan ditambahkan setelah panorama dan URL resmi tersedia.</p>
            <Link href="/tentang/fasilitas" className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full border-2 border-ink-strong bg-white/75 px-5 text-sm font-black transition-transform hover:-translate-y-0.5">
              Jelajahi fasilitas <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
