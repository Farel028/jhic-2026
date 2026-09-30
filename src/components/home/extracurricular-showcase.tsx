"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ChevronRightIcon } from "@/components/ui/icons";
import {
  extracurricularCategories,
  extracurricularDetails,
  type ExtracurricularCategoryFilter,
} from "@/data/extracurriculars";

export function ExtracurricularShowcase() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [filter, setFilter] =
    useState<ExtracurricularCategoryFilter>("Semua");

  const filtered = useMemo(
    () =>
      filter === "Semua"
        ? extracurricularDetails
        : extracurricularDetails.filter((item) => item.category === filter),
    [filter],
  );

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <section
      id="ekstrakurikuler"
      aria-labelledby="ekstrakurikuler-heading"
      className="relative overflow-hidden border-b border-ink/10 bg-[#faf8f5] px-5 py-20 text-ink-strong sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#0b2447_1px,transparent_1px),linear-gradient(to_bottom,#0b2447_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
      />

      <div className="relative mx-auto w-full max-w-site">
        <div className="grid items-end gap-4 border-b border-ink/15 pb-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <p className="eyebrow">Kegiatan siswa · 14 pilihan</p>
            <h2
              id="ekstrakurikuler-heading"
              className="mt-3 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]"
            >
              Ekstrakurikuler SMEKDA
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-sm font-medium leading-6 text-ink-muted sm:text-base">
              Dari lapangan sampai panggung — pilih komunitasmu, lihat jadwal
              latihan, dan gabung lewat IG masing-masing ekskul.
            </p>
            <div className="mt-5 flex items-center justify-start gap-2 lg:justify-end">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Geser ekstrakurikuler ke kiri"
                className="flex size-10 items-center justify-center rounded-xl border border-ink/15 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:border-primary hover:bg-primary hover:text-white active:scale-95 sm:size-11"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Geser ekstrakurikuler ke kanan"
                className="flex size-10 items-center justify-center rounded-xl border border-ink/15 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:border-primary hover:bg-primary hover:text-white active:scale-95 sm:size-11"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter kategori ekstrakurikuler">
          {extracurricularCategories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={`min-h-10 rounded-full border px-4 text-xs font-extrabold uppercase tracking-[0.08em] transition-all active:scale-95 ${
                  isActive
                    ? "border-ink-strong bg-ink-strong text-white"
                    : "border-ink/15 bg-white text-ink-muted hover:border-ink-strong hover:text-ink-strong"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <ul
          ref={trackRef}
          className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
        >
          {filtered.map((item, index) => (
            <li
              key={item.slug}
              className="w-[78vw] max-w-[20rem] shrink-0 snap-start sm:w-[19rem]"
            >
              <Link
                href={`/ekstrakurikuler/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/15 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                aria-label={`${item.name} — ${item.category}`}
              >
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md border border-ink/15 bg-[#f1f0ea] px-2 py-1 text-[0.65rem] font-black tracking-[0.14em] text-ink-strong">
                      {item.short}
                    </span>
                    <span className="text-[0.65rem] font-extrabold uppercase tabular-nums tracking-[0.12em] text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold leading-7 tracking-[-0.02em] transition-colors group-hover:text-primary-strong">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-primary-strong">
                    {item.category}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-ink-muted">
                    {item.description}
                  </p>
                  <div className="mt-4 rounded-xl bg-[#f1f0ea] px-3 py-2.5 text-xs font-bold leading-5 text-ink-muted">
                    {item.schedule}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
                    <span className="text-xs font-extrabold text-primary-strong">
                      {item.instagram}
                    </span>
                    <span className="inline-flex items-center gap-1 border-b-2 border-primary pb-0.5 text-xs font-extrabold text-ink-strong">
                      Detail
                      <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs font-medium leading-5 text-ink-muted">
          Menampilkan {filtered.length} dari {extracurricularDetails.length} ekstrakurikuler
          (sumber daftar: jadwal penampilan MPLS 2026).
        </p>
      </div>
    </section>
  );
}
