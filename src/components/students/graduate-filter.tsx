"use client";

import { useMemo, useState } from "react";
import {
  GraduateCategory,
  graduateCategories,
  topGraduates,
  type TopGraduate,
} from "@/data/graduates";

export function GraduateFilter() {
  const [selectedCategory, setSelectedCategory] = useState<GraduateCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGraduates = useMemo(() => {
    return topGraduates.filter((grad) => {
      const matchCategory =
        selectedCategory === "all" || grad.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        grad.name.toLowerCase().includes(q) ||
        grad.organization.toLowerCase().includes(q) ||
        grad.majorName.toLowerCase().includes(q) ||
        grad.majorCode.toLowerCase().includes(q) ||
        grad.currentRole.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Category Navigation - Minimalist Underline Tabs matching SMEKDA pattern */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-ink/15 pb-4">
        <div
          role="tablist"
          aria-label="Kategori lulusan terbaik"
          className="flex flex-wrap items-center gap-6 text-sm"
        >
          {graduateCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? topGraduates.length
                : topGraduates.filter((g) => g.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-2 pb-2 transition-colors ${
                  isActive
                    ? "font-extrabold text-ink-strong"
                    : "font-medium text-ink-muted hover:text-ink-strong"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[0.68rem] transition-colors ${
                    isActive
                      ? "bg-primary-strong text-white font-bold"
                      : "bg-ink/5 text-ink-muted"
                  }`}
                >
                  {count}
                </span>
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-4 h-0.5 bg-primary-strong" />
                )}
              </button>
            );
          })}
        </div>

        {/* Clean Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, jurusan, atau instansi..."
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink-strong placeholder:text-ink-muted/70 focus:border-primary-strong focus:outline-none focus:ring-1 focus:ring-primary-strong"
          />
        </div>
      </div>

      {/* Results Header Count */}
      <div className="mt-4 mb-2 flex items-center justify-between text-xs font-medium text-ink-muted">
        <span>
          Menampilkan {filteredGraduates.length} dari {topGraduates.length} profil alumni
        </span>
        {searchQuery.trim() && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-primary-strong hover:underline"
          >
            Hapus filter pencarian
          </button>
        )}
      </div>

      {/* Ledger List */}
      {filteredGraduates.length === 0 ? (
        <div className="my-14 rounded-xl border border-dashed border-ink/20 p-12 text-center bg-[#f3f4f6]">
          <p className="text-base font-bold text-ink-strong">Tidak ada profil yang cocok</p>
          <p className="mt-1 text-xs text-ink-muted">
            Coba ganti kata kunci pencarian atau pilih kategori lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-xs font-extrabold text-primary-strong underline underline-offset-4"
          >
            Tampilkan Semua Lulusan
          </button>
        </div>
      ) : (
        <ol className="border-t border-ink/15">
          {filteredGraduates.map((grad) => (
            <li
              key={grad.id}
              className="grid gap-4 border-b border-ink/15 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-9"
            >
              {/* Left Column: Graduation Year & Major Stamp */}
              <div>
                <p className="text-xs font-extrabold tracking-wide text-primary-strong">
                  Lulusan {grad.graduationYear}
                </p>
                <p className="mt-1 font-mono text-xs font-bold text-ink-muted">
                  {grad.majorCode}
                </p>
                <p className="mt-0.5 text-[0.7rem] font-medium leading-tight text-ink-muted/80">
                  {grad.majorName}
                </p>
              </div>

              {/* Right Column: Name, Role, Achievement & Story */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-extrabold leading-tight tracking-[-0.02em] text-ink-strong sm:text-2xl">
                    {grad.name}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    {grad.organization}
                  </span>
                </div>

                <p className="mt-1.5 text-sm font-bold text-primary-strong">
                  {grad.currentRole}
                </p>

                <p className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
                  Capaian: <span className="font-semibold normal-case tracking-normal text-ink-strong">{grad.achievement}</span>
                </p>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-ink-muted">
                  {grad.summary}
                </p>

                <blockquote className="mt-4 border-l-2 border-primary-strong/40 pl-3.5 text-xs italic leading-relaxed text-ink-muted">
                  "{grad.quote}"
                </blockquote>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
