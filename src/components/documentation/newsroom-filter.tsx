"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { newsCategories, newsroomItems } from "@/data/documentation";

type CategoryKey = (typeof newsCategories)[number]["key"];
type YearKey = "semua" | "2025" | "2026";

export function NewsroomFilter() {
  const [category, setCategory] = useState<CategoryKey>("semua");
  const [year, setYear] = useState<YearKey>("semua");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredItems = newsroomItems.filter(
    (item) =>
      (category === "semua" || item.category === category) &&
      (year === "semua" || item.year === year),
  );
  const visibleItems = filteredItems.slice(0, visibleCount);

  const updateCategory = (value: CategoryKey) => {
    setCategory(value);
    setVisibleCount(6);
  };

  const updateYear = (value: YearKey) => {
    setYear(value);
    setVisibleCount(6);
  };

  const resetFilters = () => {
    setCategory("semua");
    setYear("semua");
    setVisibleCount(6);
  };

  return (
    <div>
      <div className="border-y border-ink/15 py-4">
        <div
          className="flex gap-5 overflow-x-auto border-b border-ink/10"
          aria-label="Kategori berita"
        >
          {newsCategories.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={category === item.key}
              onClick={() => updateCategory(item.key)}
              className={`min-h-11 shrink-0 border-b-2 px-0.5 text-sm font-extrabold transition-colors ${
                category === item.key
                  ? "border-primary text-ink-strong"
                  : "border-transparent text-ink-muted hover:text-ink-strong"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="mt-4 flex max-w-xs items-center justify-between gap-5 text-sm font-extrabold text-ink-muted">
          Tahun
          <select
            value={year}
            onChange={(event) => updateYear(event.target.value as YearKey)}
            className="min-h-10 border-0 border-b border-ink/20 bg-transparent px-1 text-sm font-extrabold text-ink-strong outline-none focus:border-primary"
          >
            <option value="semua">Semua tahun</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-xs font-bold text-ink-muted" aria-live="polite">
        {filteredItems.length} berita ditemukan
      </p>

      {visibleItems.length > 0 ? (
        <ol className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item) => (
            <li key={item.href}>
              <article>
                <Link
                  href={item.href}
                  aria-label={`Baca berita: ${item.title}`}
                  className="group block"
                >
                  <figure className="relative aspect-[4/3] overflow-hidden bg-[#ecebe5]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc(50vw - 2.25rem), (max-width: 1535px) calc(25vw - 2rem), 345px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                  </figure>
                </Link>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-ink-muted">
                  <span className="text-primary-strong">{item.categoryLabel}</span>
                  <span aria-hidden="true">/</span>
                  <time>{item.date}</time>
                </div>

                <h3 className="mt-3 text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong">
                  <Link
                    href={item.href}
                    className="group inline-flex items-start gap-2 transition-colors hover:text-primary-strong"
                  >
                    {item.title}
                    <ArrowRightIcon className="mt-1.5 size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-ink-muted">
                  {item.excerpt}
                </p>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-8 border-y border-ink/15 py-8">
          <p className="text-base font-extrabold text-ink-strong">
            Belum ada berita pada pilihan ini.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
          >
            Tampilkan semua berita
          </button>
        </div>
      )}

      {visibleCount < filteredItems.length ? (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + 6)}
          className="mt-8 min-h-11 border-b-2 border-primary text-sm font-extrabold text-ink-strong"
        >
          Muat berita lainnya
        </button>
      ) : null}
    </div>
  );
}
