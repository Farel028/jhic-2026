import { learningJourney } from "@/data/homepage";

export function LearningJourney() {
  return (
    <section className="overflow-hidden bg-background px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-site">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">Generasi masa depan</p>
            <h2 className="mt-5 text-[clamp(2.8rem,5.4vw,5.5rem)] font-black leading-[0.92] tracking-[-0.065em] text-ink-strong">
              Dari tahu, menjadi mampu.
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-medium leading-8 text-ink-muted lg:justify-self-end">
            Perjalanan belajar vokasi tidak berhenti pada teori. Setiap tahap membawa murid lebih dekat pada karya dan dunia nyata.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-4 lg:grid-cols-3">
          {learningJourney.map((stage, index) => (
            <li key={stage.step} className={`relative min-h-[27rem] overflow-hidden rounded-[1.75rem] border border-ink/10 p-7 sm:p-9 ${index === 1 ? "bg-primary" : index === 2 ? "bg-ink-strong text-white" : "bg-white"}`}>
              <span className={`text-sm font-black tracking-[0.16em] ${index === 2 ? "text-secondary" : "text-ink-muted"}`}>{stage.step}</span>
              <span aria-hidden="true" className={`absolute -right-4 top-4 text-[9rem] font-black leading-none tracking-[-0.1em] ${index === 2 ? "text-white/5" : "text-white/35"}`}>{stage.step}</span>
              <div className="relative mt-20">
                <h3 className={`text-4xl font-black tracking-[-0.055em] sm:text-5xl ${index === 2 ? "text-white" : "text-ink-strong"}`}>{stage.title}</h3>
                <p className={`mt-5 text-base font-medium leading-7 ${index === 2 ? "text-white/70" : "text-ink"}`}>{stage.description}</p>
                <ul className={`mt-8 space-y-3 border-t pt-6 text-sm font-bold ${index === 2 ? "border-white/15 text-white/75" : "border-ink/15 text-ink-muted"}`}>
                  {stage.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className={`size-2 rounded-full ${index === 2 ? "bg-accent-strong" : "bg-white ring-4 ring-ink/5"}`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
