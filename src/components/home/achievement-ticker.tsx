import { ArrowUpRightIcon } from "@/components/ui/icons";
import { achievementPreviews } from "@/data/achievements";

function TickerItems({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="ticker-track-list" aria-hidden={hidden || undefined}>
      {achievementPreviews.map((achievement) => (
        <li key={`${achievement.year}-${achievement.title}`}>
          <a href={achievement.href} className="group flex items-center gap-4 whitespace-nowrap px-6 py-4 sm:px-9" rel="noreferrer" tabIndex={hidden ? -1 : undefined}>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-ink-strong">{achievement.level}</span>
            <span className="text-sm font-bold tracking-[-0.01em] sm:text-base">{achievement.title}</span>
            <span className="text-xs font-extrabold text-ink-muted">{achievement.year}</span>
            <ArrowUpRightIcon className="size-4 text-primary-strong transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function AchievementTicker() {
  return (
    <section aria-label="Prestasi terkini" className="border-y border-ink/10 bg-white">
      <div className="ticker-viewport">
        <div className="ticker-track">
          <TickerItems />
          <TickerItems hidden />
        </div>
      </div>
    </section>
  );
}
