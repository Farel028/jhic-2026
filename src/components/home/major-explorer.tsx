"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { majorPreviews } from "@/data/majors";

export function MajorExplorer() {
  const [activeSlug, setActiveSlug] = useState(majorPreviews[0].slug);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeMajor = majorPreviews.find((major) => major.slug === activeSlug) ?? majorPreviews[0];

  const moveToTab = (index: number) => {
    const nextIndex = (index + majorPreviews.length) % majorPreviews.length;
    setActiveSlug(majorPreviews[nextIndex].slug);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveToTab(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveToTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveToTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveToTab(majorPreviews.length - 1);
    }
  };

  return (
    <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-soft lg:grid lg:min-h-[29rem] lg:grid-cols-[0.8fr_1.2fr]">
      <div className="border-b border-ink/10 p-3 lg:border-b-0 lg:border-r lg:p-5">
        <div role="tablist" aria-label="Pilih program keahlian" className="grid grid-cols-2 gap-2 lg:block lg:space-y-2">
          {majorPreviews.map((major, index) => {
            const selected = major.slug === activeMajor.slug;
            return (
              <button
                key={major.slug}
                id={`major-tab-${major.slug}`}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="major-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveSlug(major.slug)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`group flex min-h-24 w-full flex-col items-start justify-between rounded-2xl p-4 text-left transition-colors lg:min-h-0 lg:flex-row lg:items-center lg:px-5 lg:py-4 ${selected ? "bg-ink-strong text-white" : "hover:bg-secondary/25"}`}
              >
                <span>
                  <span className={`block text-[0.65rem] font-extrabold uppercase tracking-[0.18em] ${selected ? "text-secondary" : "text-primary-strong"}`}>0{index + 1}</span>
                  <span className="mt-1.5 block text-sm font-extrabold leading-snug tracking-[-0.02em] sm:text-base">{major.name}</span>
                </span>
                <span className={`mt-2 text-xs font-black ${selected ? "text-accent-strong" : "text-ink-muted"}`}>{major.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="major-panel"
        role="tabpanel"
        aria-labelledby={`major-tab-${activeMajor.slug}`}
        className={`relative flex min-h-[25rem] flex-col justify-between overflow-hidden p-6 sm:p-9 lg:p-12 ${activeMajor.accent === "yellow" ? "bg-accent-soft" : "bg-secondary"}`}
      >
        <span aria-hidden="true" className="absolute -right-4 -top-12 text-[12rem] font-black leading-none tracking-[-0.1em] text-white/35 sm:text-[17rem]">{activeMajor.code}</span>
        <div className="relative max-w-xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink-muted">Program keahlian pilihan</p>
          <h3 className="mt-5 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-ink-strong sm:text-5xl">{activeMajor.name}</h3>
          <p className="mt-6 max-w-lg text-base font-medium leading-7 text-ink sm:text-lg">{activeMajor.description}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Fokus pembelajaran">
            {activeMajor.focus.map((item) => (
              <li key={item} className="rounded-full border border-ink/15 bg-white/60 px-3.5 py-2 text-xs font-extrabold text-ink-strong backdrop-blur-sm">{item}</li>
            ))}
          </ul>
        </div>

        <Link href={`/jurusan/${activeMajor.slug}`} className="relative mt-10 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">
          Pelajari jurusan <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
