"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/ui/icons";
import type { SearchEntry } from "@/data/search";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("id-ID");
}

function rankEntry(entry: SearchEntry, query: string) {
  const normalizedQuery = normalize(query.trim());
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const title = normalize(entry.title);
  const description = normalize(entry.description);
  const category = normalize(entry.category);
  const keywords = normalize(entry.keywords?.join(" ") ?? "");
  const searchable = `${title} ${description} ${category} ${keywords}`;

  if (!tokens.every((token) => searchable.includes(token))) return -1;

  let score = 0;
  if (title === normalizedQuery) score += 120;
  if (title.startsWith(normalizedQuery)) score += 80;
  else if (title.includes(normalizedQuery)) score += 50;

  for (const token of tokens) {
    if (title.startsWith(token)) score += 24;
    else if (title.includes(token)) score += 16;
    if (keywords.includes(token)) score += 8;
    if (category.includes(token)) score += 6;
    if (description.includes(token)) score += 3;
  }

  return score;
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (
    target.isContentEditable
    || target.tagName === "INPUT"
    || target.tagName === "TEXTAREA"
    || target.tagName === "SELECT"
  );
}

export function GlobalSearch() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchIndexPromiseRef = useRef<Promise<readonly SearchEntry[]> | null>(null);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<readonly SearchEntry[] | null>(null);

  const loadSearchIndex = useCallback(() => {
    searchIndexPromiseRef.current ??= import("@/data/search").then(({ searchEntries }) => searchEntries);
    void searchIndexPromiseRef.current.then(setEntries);
  }, []);

  const openSearch = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.classList.add("search-open");
    loadSearchIndex();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [loadSearchIndex]);

  const closeSearch = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      document.documentElement.classList.remove("search-open");
      setQuery("");
    };
    const handleShortcut = (event: KeyboardEvent) => {
      const commandShortcut = (event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase("id-ID") === "k";
      const slashShortcut = event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !isTypingTarget(event.target);
      if (!commandShortcut && !slashShortcut) return;
      event.preventDefault();
      openSearch();
    };

    dialog.addEventListener("close", handleClose);
    window.addEventListener("keydown", handleShortcut);
    return () => {
      dialog.removeEventListener("close", handleClose);
      window.removeEventListener("keydown", handleShortcut);
      document.documentElement.classList.remove("search-open");
    };
  }, [openSearch]);

  const results = useMemo(() => {
    if (!entries) return [];

    if (!query.trim()) {
      return entries
        .filter((entry) => entry.featured)
        .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
    }

    return entries
      .map((entry) => ({ entry, score: rankEntry(entry, query) }))
      .filter((result) => result.score >= 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "id-ID"))
      .slice(0, 12)
      .map((result) => result.entry);
  }, [entries, query]);

  const resultLabel = !entries
    ? "Menyiapkan indeks pencarian…"
    : query.trim()
    ? `${results.length} hasil ditemukan untuk ${query.trim()}`
    : "Tautan yang sering dicari";

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink/15 bg-white text-ink-muted transition-colors hover:border-primary hover:bg-secondary/15 hover:text-ink-strong"
        aria-label="Buka pencarian website"
        aria-keyshortcuts="Control+K Meta+K /"
        title="Cari (Ctrl/⌘ + K)"
      >
        <SearchIcon className="size-[1.15rem]" />
      </button>

      <dialog
        ref={dialogRef}
        className="global-search m-auto max-h-[min(48rem,calc(100dvh-2rem))] w-[min(58rem,calc(100%-2rem))] overflow-hidden rounded-[2rem] bg-background p-0 text-ink-strong shadow-card"
        aria-labelledby="global-search-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSearch();
        }}
      >
        <div className="flex max-h-[min(48rem,calc(100dvh-2rem))] flex-col">
          <h2 id="global-search-title" className="sr-only">Pencarian website</h2>
          <div className="flex items-center gap-3 border-b border-ink/10 bg-white p-4 sm:p-5">
            <SearchIcon className="size-5 shrink-0 text-primary-strong" />
            <label htmlFor="global-search-input" className="sr-only">Cari di seluruh website</label>
            <input
              ref={inputRef}
              id="global-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari jurusan, berita, prestasi, karya, FAQ…"
              autoComplete="off"
              className="min-h-11 min-w-0 flex-1 bg-transparent text-base font-bold text-ink-strong outline-none placeholder:font-semibold placeholder:text-ink-muted/65 sm:text-lg"
            />
            <button type="button" onClick={closeSearch} className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink-muted hover:border-primary hover:text-ink-strong" aria-label="Tutup pencarian">
              <CloseIcon className="size-5" />
            </button>
          </div>

          <div className="overflow-y-auto px-4 pb-5 pt-4 sm:px-6 sm:pb-7">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-ink-muted" aria-live="polite">{resultLabel}</p>
              <span className="hidden rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[0.65rem] font-black text-ink-muted sm:inline">ESC untuk tutup</span>
            </div>

            {!entries ? (
              <div className="mt-5 rounded-[1.5rem] border border-ink/10 bg-white p-8 text-center" role="status">
                <span aria-hidden="true" className="mx-auto block size-8 animate-pulse rounded-full bg-secondary" />
                <p className="mt-4 text-sm font-bold text-ink-muted">Menyiapkan konten pencarian…</p>
              </div>
            ) : results.length > 0 ? (
              <ul className="mt-4 space-y-2" aria-label="Hasil pencarian">
                {results.map((entry) => (
                  <li key={entry.id}>
                    <Link href={entry.href} onClick={closeSearch} className="group flex min-h-20 items-center gap-4 rounded-2xl border border-transparent bg-white p-4 transition-colors hover:border-secondary hover:bg-secondary/10 sm:px-5">
                      <span className="min-w-0 flex-1">
                        <span className="text-[0.65rem] font-black uppercase tracking-[0.13em] text-primary-strong">{entry.category}</span>
                        <span className="mt-1 block text-base font-black leading-tight tracking-[-0.025em] text-ink-strong sm:text-lg">{entry.title}</span>
                        <span className="mt-1 line-clamp-2 block text-sm font-medium leading-5 text-ink-muted">{entry.description}</span>
                      </span>
                      <ArrowRightIcon className="size-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-ink-strong" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 rounded-[1.5rem] border border-dashed border-ink/20 bg-white p-8 text-center">
                <p className="text-xl font-black text-ink-strong">Belum ada hasil yang cocok.</p>
                <p className="mt-2 text-sm font-medium leading-6 text-ink-muted">Coba kata yang lebih singkat, kode jurusan, atau istilah seperti SPMB, fasilitas, dan prestasi.</p>
                <button type="button" onClick={() => setQuery("")} className="mt-5 min-h-11 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Hapus pencarian</button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
