"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { StudentMedia } from "@/components/students/student-media";
import { studentAchievements } from "@/data/students";

const filters = [
  { key: "semua", label: "Semua" },
  { key: "nasional", label: "Nasional" },
  { key: "provinsi", label: "Provinsi / Regional" },
  { key: "kota", label: "Kota" },
  { key: "akademik", label: "Akademik" },
  { key: "non-akademik", label: "Nonakademik" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function AchievementGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("semua");
  const [visibleCount, setVisibleCount] = useState(3);
  const filtered = studentAchievements.filter(
    (achievement) => activeFilter === "semua" || achievement.categories.includes(activeFilter),
  );
  const visible = filtered.slice(0, visibleCount);

  const selectFilter = (filter: FilterKey) => {
    setActiveFilter(filter);
    setVisibleCount(3);
  };

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filter prestasi">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            aria-pressed={activeFilter === filter.key}
            onClick={() => selectFilter(filter.key)}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-extrabold transition-colors ${activeFilter === filter.key ? "border-ink-strong bg-ink-strong text-white" : "border-ink/15 bg-white text-ink-muted hover:border-primary hover:text-ink-strong"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm font-bold text-ink-muted" aria-live="polite">Menampilkan {visible.length} dari {filtered.length} prestasi.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {visible.map((achievement, index) => (
          <article key={achievement.title} className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-sm">
            <StudentMedia image={achievement.image} label={achievement.title} index={index} className="aspect-[16/10]" />
            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap gap-2 text-[0.65rem] font-black uppercase tracking-[0.13em]">
                <span className="rounded-full bg-accent-soft px-3 py-1.5 text-ink-strong">{achievement.level}</span>
                <span className="rounded-full bg-secondary/30 px-3 py-1.5 text-primary-strong">{achievement.field}</span>
                <span className="px-1 py-1.5 text-ink-muted">{achievement.year}</span>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong">{achievement.title}</h2>
              <p className="mt-3 text-sm font-extrabold text-primary-strong">{achievement.people}</p>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{achievement.description}</p>
              <a href={achievement.sourceUrl} rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">
                Baca sumber <ArrowUpRightIcon className="size-4" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < filtered.length ? (
        <div className="mt-9 flex justify-center">
          <button type="button" onClick={() => setVisibleCount((count) => count + 3)} className="min-h-12 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white">
            Muat lebih banyak
          </button>
        </div>
      ) : null}
    </>
  );
}
