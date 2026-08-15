"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { MediaPlaceholder } from "@/components/documentation/media-placeholder";
import { newsCategories, newsroomItems } from "@/data/documentation";

type CategoryKey = (typeof newsCategories)[number]["key"];
type YearKey = "semua" | "2025" | "2026";

export function NewsroomFilter() {
  const [category, setCategory] = useState<CategoryKey>("semua");
  const [year, setYear] = useState<YearKey>("semua");
  const [visibleCount, setVisibleCount] = useState(6);
  const filteredItems = newsroomItems.filter((item) => (category === "semua" || item.category === category) && (year === "semua" || item.year === year));
  const visibleItems = filteredItems.slice(0, visibleCount);

  const updateCategory = (value: CategoryKey) => { setCategory(value); setVisibleCount(6); };
  const updateYear = (value: YearKey) => { setYear(value); setVisibleCount(6); };

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-ink/10 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Kategori berita">
          {newsCategories.map((item) => (
            <button key={item.key} type="button" aria-pressed={category === item.key} onClick={() => updateCategory(item.key)} className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-extrabold ${category === item.key ? "border-ink-strong bg-ink-strong text-white" : "border-ink/15 bg-white text-ink-muted hover:border-primary hover:text-ink-strong"}`}>{item.label}</button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm font-extrabold text-ink-muted">
          Tahun
          <select value={year} onChange={(event) => updateYear(event.target.value as YearKey)} className="min-h-11 rounded-full border border-ink/15 bg-white px-4 text-sm font-extrabold text-ink-strong outline-none focus:border-primary focus:ring-4 focus:ring-secondary/25">
            <option value="semua">Semua tahun</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm font-bold text-ink-muted" aria-live="polite">Menampilkan {visibleItems.length} dari {filteredItems.length} berita.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <article key={item.href} className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-sm">
            {item.image ? <div className="relative aspect-[16/10] overflow-hidden bg-secondary/20"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 30vw" className="object-cover transition-transform duration-500 hover:scale-[1.02]" /></div> : <MediaPlaceholder title={item.title} index={index} />}
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.12em]">
                <span className="rounded-full bg-secondary/25 px-3 py-1.5 text-primary">{item.categoryLabel}</span>
                <time className="text-ink-muted">{item.date}</time>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong">{item.title}</h2>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{item.excerpt}</p>
              <a href={item.href} rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Baca di sumber <ArrowUpRightIcon className="size-4" /></a>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? <div className="mt-8 rounded-[1.75rem] border border-dashed border-ink/20 bg-white p-8 text-center"><p className="text-xl font-black text-ink-strong">Belum ada berita pada kombinasi ini.</p><button type="button" onClick={() => { updateCategory("semua"); updateYear("semua"); }} className="mt-5 min-h-11 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Reset filter</button></div> : null}

      {visibleCount < filteredItems.length ? <div className="mt-9 flex justify-center"><button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="min-h-12 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white">Muat lebih banyak</button></div> : null}
    </div>
  );
}
