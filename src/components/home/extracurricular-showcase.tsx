"use client";

import Image from "next/image";
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
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [filter, setFilter] = useState<ExtracurricularCategoryFilter>("Semua");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(
    () =>
      filter === "Semua"
        ? extracurricularDetails
        : extracurricularDetails.filter((item) => item.category === filter),
    [filter],
  );

  const safeActiveIndex =
    activeIndex < filtered.length ? activeIndex : 0;
  const activeEkskul =
    filtered[safeActiveIndex] ?? filtered[0] ?? extracurricularDetails[0];

  const scrollToItem = (index: number) => {
    setActiveIndex(index);
    const target = itemRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const handlePrev = () => {
    const prev = (safeActiveIndex - 1 + filtered.length) % filtered.length;
    scrollToItem(prev);
  };

  const handleNext = () => {
    const next = (safeActiveIndex + 1) % filtered.length;
    scrollToItem(next);
  };

  const handleSelectCategory = (category: ExtracurricularCategoryFilter) => {
    setFilter(category);
    setActiveIndex(0);
    setTimeout(() => {
      itemRefs.current[0]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 60);
  };

  return (
    <section
      id="ekstrakurikuler"
      aria-labelledby="ekstrakurikuler-heading"
      className="relative overflow-hidden border-b border-ink/10 bg-[#faf8f5] px-5 py-20 text-ink-strong sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="relative mx-auto w-full max-w-site">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/15 pb-7">
          <div>
            <p className="eyebrow">Kegiatan siswa · 14 pilihan</p>
            <h2
              id="ekstrakurikuler-heading"
              className="mt-3 text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]"
            >
              Ekstrakurikuler SMEKDA
            </h2>
          </div>

          <div className="flex items-center gap-4 md:justify-end">
            {/* Counter Selection */}
            <div className="font-mono text-xs font-bold text-ink-muted">
              <span className="text-sm font-extrabold text-ink-strong">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(filtered.length).padStart(2, "0")}
            </div>

            {/* Functional Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Pilih ekskul sebelumnya"
                className="flex size-11 items-center justify-center rounded-xl border border-ink/15 bg-white text-ink-strong shadow-xs transition-colors hover:border-ink-strong hover:bg-neutral-50 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Pilih ekskul berikutnya"
                className="flex size-11 items-center justify-center rounded-xl border border-ink/15 bg-white text-ink-strong shadow-xs transition-colors hover:border-ink-strong hover:bg-neutral-50 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation - Editorial Minimalist Underline Tabs */}
        <div className="mt-8 border-b border-ink/15 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-6 sm:gap-8 pb-px min-w-max" role="tablist" aria-label="Kategori ekstrakurikuler">
            {extracurricularCategories.map((category) => {
              const count =
                category === "Semua"
                  ? extracurricularDetails.length
                  : extracurricularDetails.filter((item) => item.category === category).length;
              const isActive = filter === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectCategory(category)}
                  className={`group relative flex items-center gap-2 pb-3.5 pt-1 text-sm transition-colors ${
                    isActive ? "font-extrabold text-ink-strong" : "font-medium text-ink-muted hover:text-ink-strong"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[0.68rem] transition-colors ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "bg-ink/5 text-ink-muted group-hover:bg-ink/10 group-hover:text-ink-strong"
                    }`}
                  >
                    {count}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Character Selection Circle Runway (Fixed Slot & Highlight) */}
        <div className="relative mt-8 py-4">
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory items-center justify-start gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain px-[25vw] pb-6 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-[35vw] lg:px-[40vw]"
          >
            {filtered.map((item, index) => {
              const isSelected = activeIndex === index;

              return (
                <li
                  key={item.slug}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="w-36 sm:w-44 lg:w-48 shrink-0 snap-center flex flex-col items-center"
                >
                  <button
                    type="button"
                    onClick={() => scrollToItem(index)}
                    aria-pressed={isSelected}
                    className="group relative flex flex-col items-center focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {/* Fixed Circle Slot Container */}
                    <div className="relative flex size-32 sm:size-36 lg:size-40 items-center justify-center">
                      {/* Circle Emblem with GPU scale (No layout bump) */}
                      <div
                        className={`relative size-28 sm:size-32 lg:size-36 flex items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-out ${
                          isSelected
                            ? "scale-110 border-2 sm:border-[2.5px] border-ink-strong ring-4 ring-ink-strong/15 shadow-md opacity-100 z-10"
                            : "scale-95 border border-ink/20 opacity-60 hover:opacity-90 z-0"
                        }`}
                      >
                        <Image
                          src={`/images/ekskul/${item.slug}.jpg`}
                          alt={`Logo ${item.name}`}
                          width={144}
                          height={144}
                          className="size-full rounded-full object-cover p-1.5"
                          priority={isSelected}
                        />
                      </div>
                    </div>

                    {/* Indicator Beam */}
                    <div className="h-2.5 flex items-center justify-center mt-2">
                      {isSelected && (
                        <span className="h-1.5 w-12 sm:w-14 rounded-full bg-ink-strong" />
                      )}
                    </div>

                    {/* Fixed Height Title Label */}
                    <div className="mt-1 h-9 flex items-center justify-center px-1 text-center">
                      <span
                        className={`truncate transition-all ${
                          isSelected
                            ? "text-sm sm:text-base font-extrabold text-ink-strong max-w-[8rem] sm:max-w-[10rem]"
                            : "text-xs sm:text-sm font-medium text-ink-muted max-w-[6.5rem] sm:max-w-[8rem] opacity-75"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Selected Dossier Panel (Stats & Details Card) */}
        <div className="rounded-2xl border border-ink/15 bg-white p-6 shadow-sm sm:p-8 lg:p-10 transition-all duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-ink-muted">
                  {activeEkskul.short}
                </span>
                <span className="text-xs font-bold text-ink/30">•</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-strong">
                  {activeEkskul.category}
                </span>
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-[-0.02em] text-ink-strong">
                {activeEkskul.name}
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink/80">
                {activeEkskul.description}
              </p>

              {/* Info Bar */}
              <div className="mt-5 flex flex-wrap gap-4 sm:gap-8 border-t border-ink/10 pt-4 text-xs sm:text-sm">
                <div>
                  <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-ink-muted">Jadwal</span>
                  <span className="mt-0.5 block font-bold text-ink-strong">{activeEkskul.schedule}</span>
                </div>
                <div>
                  <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-ink-muted">Tempat</span>
                  <span className="mt-0.5 block font-bold text-ink-strong">{activeEkskul.location}</span>
                </div>
                <div>
                  <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-ink-muted">Akun IG</span>
                  <span className="mt-0.5 block font-bold text-primary-strong">{activeEkskul.instagram}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap lg:flex-col items-stretch gap-3 shrink-0">
              <Link
                href={`/ekstrakurikuler/${activeEkskul.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-primary-strong"
              >
                Buka Profil Lengkap
                <ChevronRightIcon className="size-4" />
              </Link>
              {activeEkskul.instagramUrl && (
                <a
                  href={activeEkskul.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-ink-strong transition-colors hover:bg-neutral-50"
                >
                  Kunjungi Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs font-medium leading-5 text-ink-muted">
          Menampilkan {filtered.length} dari {extracurricularDetails.length} ekstrakurikuler
          (sumber daftar: jadwal penampilan MPLS 2026).
        </p>
      </div>
    </section>
  );
}
