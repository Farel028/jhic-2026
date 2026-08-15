"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRightIcon, SearchIcon } from "@/components/ui/icons";
import { faqCategories, faqItems } from "@/data/information";
import { toContentId } from "@/lib/content-id";

type CategoryKey = (typeof faqCategories)[number]["key"];

export function FaqSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("semua");

  useEffect(() => {
    const openLinkedQuestion = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      setQuery("");
      setCategory("semua");
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLDetailsElement)) return;
        element.open = true;
        element.scrollIntoView({ block: "center" });
      });
    };

    openLinkedQuestion();
    window.addEventListener("hashchange", openLinkedQuestion);
    return () => window.removeEventListener("hashchange", openLinkedQuestion);
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
    return faqItems.filter((item) => {
      const matchesCategory = category === "semua" || item.category === category;
      const searchableText = [item.question, item.answer, ...item.keywords].join(" ").toLocaleLowerCase("id-ID");
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, query]);

  return (
    <div>
      <div className="relative max-w-3xl">
        <label htmlFor="faq-search" className="sr-only">Cari pertanyaan</label>
        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari: jurusan, biaya, SPMB, fasilitas…"
          className="min-h-14 w-full rounded-full border border-ink/15 bg-white py-3 pl-13 pr-5 text-base font-semibold text-ink-strong shadow-sm outline-none placeholder:text-ink-muted/70 focus:border-primary focus:ring-4 focus:ring-secondary/25"
        />
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Kategori FAQ">
        {faqCategories.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={category === item.key}
            onClick={() => setCategory(item.key)}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-extrabold transition-colors ${category === item.key ? "border-ink-strong bg-ink-strong text-white" : "border-ink/15 bg-white text-ink-muted hover:border-primary hover:text-ink-strong"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm font-bold text-ink-muted" aria-live="polite">{filteredItems.length} jawaban ditemukan.</p>

      {filteredItems.length > 0 ? (
        <div className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
          {filteredItems.map((item) => (
            <details id={toContentId(item.question)} key={item.question} className="group scroll-mt-28 bg-white px-5 sm:px-7">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-black tracking-[-0.025em] text-ink-strong marker:content-none">
                <span>{item.question}</span>
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary/30 text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="max-w-3xl pb-7 pr-10">
                <p className="text-base font-medium leading-7 text-ink-muted">{item.answer}</p>
                {item.sourceUrl ? (
                  <a href={item.sourceUrl} rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">
                    {item.sourceLabel ?? "Lihat sumber"} <ArrowUpRightIcon className="size-4" />
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-ink/20 bg-white p-8 text-center">
          <p className="text-xl font-black text-ink-strong">Belum ada jawaban yang cocok.</p>
          <p className="mt-2 text-sm text-ink-muted">Coba kata kunci lain atau pilih kategori Semua.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("semua"); }} className="mt-5 min-h-11 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Reset pencarian</button>
        </div>
      )}
    </div>
  );
}
