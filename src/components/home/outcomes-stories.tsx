import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { alumniOutcomeFacts, latestStories } from "@/data/homepage";

export function AlumniOutcome() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-site">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="eyebrow">Alumni journey</p>
            <h2 className="mt-5 text-[clamp(2.8rem,5vw,5.2rem)] font-black leading-[0.92] tracking-[-0.065em] text-ink-strong">
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
                  <p className="text-4xl font-black tracking-[-0.055em] text-ink-strong sm:text-5xl">{fact.value}</p>
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

export function LatestStories() {
  return (
    <section className="border-y border-ink/10 bg-background px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-site">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Cerita terbaru</p>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,5rem)] font-black leading-[0.94] tracking-[-0.06em] text-ink-strong">Yang sedang terjadi di sekolah.</h2>
          </div>
          <a href={school.urls.legacyWebsite} className="inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8" rel="noreferrer">
            Lihat semua berita <ArrowUpRightIcon className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {latestStories.map((story, index) => (
            <a key={`${story.date}-${story.title}`} href={story.href} className={`group flex min-h-[22rem] flex-col justify-between rounded-[1.5rem] border border-ink/10 p-7 transition-transform hover:-translate-y-1 sm:p-8 ${index === 1 ? "bg-ink-strong text-white" : "bg-white text-ink-strong"}`} rel="noreferrer">
              <div className="flex items-center justify-between gap-4">
                <span className={`text-xs font-black uppercase tracking-[0.16em] ${index === 1 ? "text-secondary" : "text-primary-strong"}`}>{story.category}</span>
                <ArrowUpRightIcon className={`size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${index === 1 ? "text-accent-strong" : "text-ink-muted"}`} />
              </div>
              <div>
                <h3 className="text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">{story.title}</h3>
                <p className={`mt-5 text-xs font-bold ${index === 1 ? "text-white/50" : "text-ink-muted"}`}>{story.date}</p>
              </div>
            </a>
          ))}
        </div>
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
          <h2 className="mt-5 max-w-5xl text-[clamp(2.8rem,5.7vw,6rem)] font-black leading-[0.9] tracking-[-0.07em] text-ink-strong">Siapkan langkahmu menuju sekolah vokasi.</h2>
          <p className="mt-7 max-w-2xl text-base font-semibold leading-7 text-ink">Rangkaian SPMB Jawa Timur 2026 telah selesai. Portal informasi tetap dapat dibuka sebagai referensi.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={school.urls.admissions} className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-accent-strong px-6 text-sm font-extrabold text-ink-strong transition-transform hover:-translate-y-0.5" rel="noreferrer">
            Info SPMB <ArrowUpRightIcon className="size-4" />
          </a>
          <Link href="/jurusan" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border-2 border-ink-strong px-6 text-sm font-extrabold text-ink-strong transition-colors hover:bg-white/50">
            Lihat jurusan <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
