"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { majorDetails } from "@/data/majors";

type CartoonyTheme = {
  paperBg: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  textColor: string;
  shadowColor: string;
};

// Exact cartoony color mapping matching user requested palette per major
const cartoonyThemes: Record<string, CartoonyTheme> = {
  RPL: {
    paperBg: "bg-[#a7f3d0]",
    borderColor: "border-[#059669]",
    badgeBg: "bg-[#059669]",
    badgeText: "text-white",
    textColor: "text-[#065f46]",
    shadowColor: "rgba(5,150,105,0.25)",
  },
  ANI: {
    paperBg: "bg-[#fbcfe8]",
    borderColor: "border-[#db2777]",
    badgeBg: "bg-[#db2777]",
    badgeText: "text-white",
    textColor: "text-[#9d174d]",
    shadowColor: "rgba(219,39,119,0.25)",
  },
  DPIB: {
    paperBg: "bg-[#fde68a]",
    borderColor: "border-[#b45309]",
    badgeBg: "bg-[#b45309]",
    badgeText: "text-white",
    textColor: "text-[#78350f]",
    shadowColor: "rgba(180,83,9,0.25)",
  },
  TKP: {
    paperBg: "bg-[#c5dbc2]",
    borderColor: "border-[#3f6212]",
    badgeBg: "bg-[#3f6212]",
    badgeText: "text-white",
    textColor: "text-[#1a2e05]",
    shadowColor: "rgba(63,98,18,0.25)",
  },
  TPM: {
    paperBg: "bg-[#fca5a5]",
    borderColor: "border-[#dc2626]",
    badgeBg: "bg-[#dc2626]",
    badgeText: "text-white",
    textColor: "text-[#7f1d1d]",
    shadowColor: "rgba(220,38,38,0.25)",
  },
  TAV: {
    paperBg: "bg-[#fed7aa]",
    borderColor: "border-[#ea580c]",
    badgeBg: "bg-[#ea580c]",
    badgeText: "text-white",
    textColor: "text-[#9a3412]",
    shadowColor: "rgba(234,88,12,0.25)",
  },
  TEI: {
    paperBg: "bg-[#fdba74]",
    borderColor: "border-[#c2410c]",
    badgeBg: "bg-[#c2410c]",
    badgeText: "text-white",
    textColor: "text-[#7c2d12]",
    shadowColor: "rgba(194,65,12,0.25)",
  },
  TKJ: {
    paperBg: "bg-[#86efac]",
    borderColor: "border-[#15803d]",
    badgeBg: "bg-[#15803d]",
    badgeText: "text-white",
    textColor: "text-[#064e3b]",
    shadowColor: "rgba(21,128,61,0.25)",
  },
  TKR: {
    paperBg: "bg-[#bfdbfe]",
    borderColor: "border-[#1d4ed8]",
    badgeBg: "bg-[#1d4ed8]",
    badgeText: "text-white",
    textColor: "text-[#1e3a8a]",
    shadowColor: "rgba(29,78,216,0.25)",
  },
  TSM: {
    paperBg: "bg-[#cbd5e1]",
    borderColor: "border-[#475569]",
    badgeBg: "bg-[#475569]",
    badgeText: "text-white",
    textColor: "text-[#1e293b]",
    shadowColor: "rgba(71,85,105,0.25)",
  },
  TITL: {
    paperBg: "bg-[#fef08a]",
    borderColor: "border-[#ca8a04]",
    badgeBg: "bg-[#ca8a04]",
    badgeText: "text-white",
    textColor: "text-[#854d0e]",
    shadowColor: "rgba(202,138,4,0.25)",
  },
};

// Triple array for seamless infinite looping (Set 0, Set 1, Set 2)
const loopedMajors = [...majorDetails, ...majorDetails, ...majorDetails];
const TOTAL_MAJORS = majorDetails.length;

export function MajorExplorer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Set initial scroll position to middle set (Set 1) on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
      updateActiveIndex();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Update active card index & perform instant, invisible boundary swaps
  const updateActiveIndex = () => {
    const el = scrollRef.current;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;

    // Instant boundary swap (no smooth scroll transition during position reset)
    if (el.scrollLeft < singleSetWidth * 0.4) {
      el.scrollLeft += singleSetWidth;
    } else if (el.scrollLeft > singleSetWidth * 1.6) {
      el.scrollLeft -= singleSetWidth;
    }

    // Find active major index (0..10)
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx % TOTAL_MAJORS);
  };

  // Convert vertical mouse wheel scroll to smooth horizontal gliding on desktop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY * 1.6,
          behavior: "smooth",
        });
      }
    };

    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    el.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      el.removeEventListener("scroll", updateActiveIndex);
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  // Smooth scroll to card when Notebook Index Tab is clicked (PC only)
  const scrollToMajor = (index: number) => {
    setActiveIndex(index);
    const targetIdx = TOTAL_MAJORS + index;
    const targetCard = cardRefs.current[targetIdx];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <div className="relative mt-8">
      {/* PC ONLY: Notebook Index Tabs Strip (Hidden on Mobile/Tablet < lg) */}
      <div className="hidden lg:flex items-center justify-center gap-1.5 overflow-x-auto pb-4 pt-1 px-1 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {majorDetails.map((major, idx) => {
          const theme = cartoonyThemes[major.code] || cartoonyThemes.RPL;
          const isActive = activeIndex === idx;

          return (
            <button
              key={major.code}
              type="button"
              onClick={() => scrollToMajor(idx)}
              className={`group relative flex shrink-0 items-center gap-1.5 rounded-t-xl border-2 ${
                theme.borderColor
              } ${theme.paperBg} px-3.5 py-1.5 text-xs font-black tracking-wide transition-all cursor-pointer ${
                isActive
                  ? "-translate-y-1 shadow-md scale-105 z-10"
                  : "opacity-75 hover:opacity-100 hover:-translate-y-0.5"
              }`}
            >
              <span className={`font-handwriting text-sm font-bold ${theme.textColor}`}>
                #{String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-ink-strong">{major.code}</span>
              {isActive ? (
                <span className={`size-1.5 rounded-full ${theme.badgeBg} animate-pulse`} />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Infinite Looping Track */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-7 overflow-x-auto snap-x snap-mandatory pt-4 pb-8 px-4 sm:px-6 lg:px-8 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loopedMajors.map((major, loopIndex) => {
          const realIndex = loopIndex % TOTAL_MAJORS;
          const theme = cartoonyThemes[major.code] || cartoonyThemes.RPL;
          const isActive = activeIndex === realIndex;

          const rotationClass =
            loopIndex % 4 === 0
              ? "-rotate-[2deg]"
              : loopIndex % 4 === 1
              ? "rotate-[2deg]"
              : loopIndex % 4 === 2
              ? "-rotate-[1.5deg]"
              : "rotate-[1.8deg]";

          return (
            <Link
              key={`${major.slug}-${loopIndex}`}
              ref={(el) => {
                cardRefs.current[loopIndex] = el;
              }}
              href={`/jurusan/${major.slug}`}
              className={`group relative flex w-[78vw] sm:w-[265px] lg:w-[285px] shrink-0 snap-center flex-col ${
                isActive ? "rotate-0 -translate-y-2 scale-[1.03] z-20" : rotationClass
              } transition-all duration-300 hover:rotate-0 hover:-translate-y-3 hover:scale-[1.03] hover:z-30`}
            >
              {/* Solid Cartoony Notepad Sheet */}
              <div
                className={`relative flex flex-col justify-between rounded-xl ${theme.paperBg} p-3.5 pb-4 border-[3px] ${theme.borderColor} shadow-xl`}
                style={{
                  boxShadow: isActive
                    ? `0 22px 42px -6px ${theme.shadowColor}, 0 8px 18px -3px rgba(0,0,0,0.18)`
                    : `0 18px 36px -6px ${theme.shadowColor}, 0 6px 14px -3px rgba(0,0,0,0.15)`,
                }}
              >
                {/* 5 Binder Punch Holes at Top Header */}
                <div className="flex items-center justify-between px-2 pt-0.5 pb-2.5 border-b-2 border-black/10">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="size-3.5 rounded-full bg-white border border-black/20 shadow-inner pointer-events-none"
                    />
                  ))}
                </div>

                {/* Poster Photo Frame */}
                <div className="relative mt-3 aspect-[2/3] w-full overflow-hidden rounded-md bg-white shadow-xs border-2 border-black/10 pointer-events-none">
                  <Image
                    src={`/images/school/${major.code.toLowerCase()}-home.webp`}
                    alt={`Poster jurusan ${major.name}`}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 265px, 285px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                    draggable={false}
                  />
                </div>

                {/* Bottom Paper Info & Link */}
                <div className="mt-3.5 px-1 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="min-w-0 flex-1 pr-2">
                    <span className={`font-handwriting text-base font-bold ${theme.textColor}`}>
                      #{String(realIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm sm:text-base font-black tracking-tight leading-snug text-ink-strong group-hover:text-ink transition-colors">
                      {major.name}
                    </h3>
                  </div>

                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${theme.badgeBg} ${theme.badgeText} shadow-md transition-transform group-hover:translate-x-1`}
                  >
                    <ArrowRightIcon className="size-4 shrink-0" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
