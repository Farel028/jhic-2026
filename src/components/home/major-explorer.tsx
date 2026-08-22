"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { majorDetails } from "@/data/majors";

type NavigationState = {
  canPrevious: boolean;
  canNext: boolean;
};

type MajorTheme = {
  paper: string;
  border: string;
  accentText: string;
};

const initialNavigationState: NavigationState = {
  canPrevious: false,
  canNext: true,
};

const majorThemes: Record<string, MajorTheme> = {
  ANI: { paper: "bg-[#fbcfe8]", border: "border-[#db2777]", accentText: "text-[#9d174d]" },
  DPIB: { paper: "bg-[#fde68a]", border: "border-[#b45309]", accentText: "text-[#78350f]" },
  TKP: { paper: "bg-[#c5dbc2]", border: "border-[#3f6212]", accentText: "text-[#1a2e05]" },
  TAV: { paper: "bg-[#fed7aa]", border: "border-[#ea580c]", accentText: "text-[#9a3412]" },
  TEI: { paper: "bg-[#fdba74]", border: "border-[#c2410c]", accentText: "text-[#7c2d12]" },
  TITL: { paper: "bg-[#fef08a]", border: "border-[#ca8a04]", accentText: "text-[#854d0e]" },
  TPM: { paper: "bg-[#fca5a5]", border: "border-[#dc2626]", accentText: "text-[#7f1d1d]" },
  TKR: { paper: "bg-[#bfdbfe]", border: "border-[#1d4ed8]", accentText: "text-[#1e3a8a]" },
  TSM: { paper: "bg-[#cbd5e1]", border: "border-[#475569]", accentText: "text-[#1e293b]" },
  TKJ: { paper: "bg-[#86efac]", border: "border-[#15803d]", accentText: "text-[#064e3b]" },
  RPL: { paper: "bg-[#a7f3d0]", border: "border-[#059669]", accentText: "text-[#065f46]" },
};

const rotations = ["-rotate-[1.2deg]", "rotate-[1deg]", "-rotate-[0.7deg]", "rotate-[1.3deg]"] as const;

export function MajorExplorer() {
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [navigationState, setNavigationState] = useState(initialNavigationState);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateNavigationState = () => {
    const track = trackRef.current;
    if (!track) return;

    const nextState = {
      canPrevious: track.scrollLeft > 2,
      canNext: track.scrollLeft < track.scrollWidth - track.clientWidth - 2,
    };

    setNavigationState((currentState) =>
      currentState.canPrevious === nextState.canPrevious &&
      currentState.canNext === nextState.canNext
        ? currentState
        : nextState,
    );

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === closestIndex ? currentIndex : closestIndex,
    );
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateNavigationState();
    const resizeObserver = new ResizeObserver(updateNavigationState);
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleScroll = () => {
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      updateNavigationState();
      animationFrameRef.current = null;
    });
  };

  const scrollTrack = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (direction === -1 && !navigationState.canPrevious) {
      track.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      return;
    }

    if (direction === 1 && !navigationState.canNext) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    track.scrollBy({
      left: direction * track.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="mt-9"
      role="region"
      aria-roledescription="carousel"
      aria-label="Program keahlian SMK Negeri 2 Surabaya"
    >
      <div className="mb-5 flex items-center justify-between border-t border-ink/15 pt-4">
        <p className="text-xs font-bold text-ink-muted">
          Geser untuk melihat seluruh program
        </p>
        <div className="flex gap-2" role="group" aria-label="Kontrol carousel">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            aria-label="Lihat program sebelumnya"
            className="grid size-11 place-items-center rounded-xl border border-ink/20 text-ink-strong transition-colors hover:border-primary-strong hover:bg-primary-strong hover:text-white"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(1)}
            aria-label="Lihat program berikutnya"
            className="grid size-11 place-items-center rounded-xl border border-ink/20 text-ink-strong transition-colors hover:border-primary-strong hover:bg-primary-strong hover:text-white"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-2 pb-5 pt-3 sm:gap-5 lg:gap-6 [scrollbar-color:var(--primary-strong)_transparent] [scrollbar-width:thin]"
      >
        {majorDetails.map((major, index) => {
          const theme = majorThemes[major.code] ?? majorThemes.RPL;
          const isActive = activeIndex === index;

          return (
            <li
              key={major.slug}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} dari ${majorDetails.length}: ${major.name}`}
              className={`w-[74vw] max-w-[19rem] shrink-0 snap-center transition-transform duration-300 ease-out sm:w-[17rem] lg:w-[19rem] ${
                isActive
                  ? "relative z-10 -translate-y-1 rotate-0 scale-[1.015]"
                  : rotations[index % rotations.length]
              }`}
            >
              <Link href={`/jurusan/${major.slug}`} className="group block">
                <div className={`rounded-xl border-2 p-3 shadow-[0_10px_24px_rgba(11,31,51,0.12)] ${theme.paper} ${theme.border}`}>
                  <div className="flex items-center justify-between border-b border-ink/15 px-1 pb-2.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, holeIndex) => (
                      <span key={holeIndex} className="size-3 rounded-full border border-ink/20 bg-white/80 shadow-inner" />
                    ))}
                  </div>

                  <div className="relative mt-3 aspect-[3/4] overflow-hidden bg-white">
                    <Image
                      src={`/images/school/${major.code.toLowerCase()}-home.webp`}
                      alt={`Poster jurusan ${major.name}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 74vw, (max-width: 1023px) 17rem, 19rem"
                      className="select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-reduce:transition-none"
                      draggable={false}
                    />
                  </div>

                  <div className="flex min-h-24 items-start justify-between gap-4 px-1 pb-1 pt-4">
                    <div>
                      <p className={`text-[0.65rem] font-extrabold uppercase tracking-[0.12em] ${theme.accentText}`}>
                        {major.group}
                      </p>
                      <h3 className="mt-2 text-base font-extrabold leading-6 tracking-[-0.02em] text-ink-strong sm:text-lg">
                        {major.name}
                      </h3>
                    </div>
                    <ChevronRightIcon className={`mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1 ${theme.accentText}`} />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
