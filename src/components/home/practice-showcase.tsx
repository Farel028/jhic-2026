import { ArrowUpRightIcon } from "@/components/ui/icons";
import { practiceStories } from "@/data/homepage";

export function PracticeShowcase() {
  return (
    <section className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-site">
        <div className="grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Dari ruang praktik</p>
            <h2 className="mt-5 max-w-5xl text-[clamp(2.8rem,5.6vw,5.8rem)] font-black leading-[0.9] tracking-[-0.065em]">
              Yang dipelajari, dibuat, dan diuji.
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-7 text-white/65 lg:justify-self-end lg:text-lg">
            Cuplikan aktivitas dan capaian yang telah dipublikasikan sekolah. Portofolio karya individual akan ditambahkan setelah proses kurasi.
          </p>
        </div>

        <div className="divide-y divide-white/15">
          {practiceStories.map((story) => (
            <a key={story.href} href={story.href} className="group grid gap-5 py-9 transition-colors hover:text-accent-soft sm:py-11 lg:grid-cols-[0.18fr_0.8fr_1.6fr_0.45fr_auto] lg:items-center" rel="noreferrer">
              <span className="text-xs font-black tracking-[0.16em] text-secondary">{story.index}</span>
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/50">{story.category}</span>
              <span className="max-w-3xl text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">{story.title}</span>
              <span className="text-xs font-bold text-white/45">{story.meta}</span>
              <span className="grid size-12 place-items-center rounded-full border border-white/20 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-accent-strong group-hover:bg-accent-strong group-hover:text-ink-strong">
                <ArrowUpRightIcon className="size-5" />
              </span>
              <span className="text-sm leading-6 text-white/55 lg:col-start-3 lg:max-w-2xl">{story.description}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
