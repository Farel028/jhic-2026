import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { alumniOutcomeFacts } from "@/data/homepage";

export function AlumniOutcome() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-site">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="eyebrow">Alumni journey</p>
            <h2 className="mt-5 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong">
              Dari sekolah ini, mereka melangkah lebih jauh.
            </h2>
            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-ink-muted">
              Bursa Kerja Khusus menghubungkan alumni dengan informasi karier, perusahaan, dan penelusuran lulusan.
            </p>
            <a href={school.urls.bkk} className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5" rel="noreferrer">
              Buka BKK Smekda <ArrowUpRightIcon className="size-4" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:items-stretch">
            {alumniOutcomeFacts.map((fact, index) => (
              <div key={fact.label} className={`flex min-h-64 flex-col justify-between rounded-[1.5rem] p-6 sm:min-h-72 ${index === 0 ? "bg-secondary" : index === 1 ? "bg-accent-soft" : "bg-background border border-ink/10"}`}>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-ink-muted">BKK Smekda</span>
                <div>
                  <p className="text-3xl font-extrabold tracking-[-0.03em] text-ink-strong sm:text-4xl">{fact.value}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-ink-muted">{fact.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 text-xs text-ink-muted">Angka mengikuti rekapitulasi yang ditampilkan sistem BKK sekolah dan bukan persentase seluruh lulusan.</p>
      </div>
    </section>
  );
}

export function AdmissionCta() {
  return (
    <section className="bg-primary px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid w-full max-w-site gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-ink">Langkah berikutnya</p>
          <h2 className="mt-5 max-w-5xl text-[clamp(2.15rem,4vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-strong">Siapkan langkahmu menuju sekolah vokasi.</h2>
          <p className="mt-7 max-w-2xl text-base font-semibold leading-7 text-ink">Rangkaian SPMB Jawa Timur 2026 telah selesai. Portal informasi tetap dapat dibuka sebagai referensi.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={school.urls.admissions} className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-accent-strong px-6 text-sm font-extrabold text-ink-strong transition-transform hover:-translate-y-0.5" rel="noreferrer">
            Info SPMB <ArrowUpRightIcon className="size-4" />
          </a>
          <Link href="/#jurusan" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border-2 border-ink-strong px-6 text-sm font-extrabold text-ink-strong transition-colors hover:bg-white/50">
            Lihat jurusan <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
