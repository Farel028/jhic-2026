"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon } from "@/components/ui/icons";
import { majorDetails } from "@/data/majors";

type MajorTheme = {
  paper: string;
  border: string;
  accentText: string;
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

export function MajorExplorer() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{
    isDown: boolean;
    startX: number;
    scrollLeft: number;
    hasMoved: boolean;
  }>({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 15);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragStartRef.current = {
      isDown: true,
      startX: e.pageX - track.offsetLeft,
      scrollLeft: track.scrollLeft,
      hasMoved: false,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current.isDown) return;
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - dragStartRef.current.startX) * 1.3;
    if (Math.abs(walk) > 4) {
      dragStartRef.current.hasMoved = true;
    }
    track.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    dragStartRef.current.isDown = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    dragStartRef.current.isDown = false;
    setIsDragging(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (dragStartRef.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div
      className="relative mt-8"
      role="region"
      aria-roledescription="carousel"
      aria-label="Jurusan SMK Negeri 2 Surabaya"
    >
      {/* Navigasi Carousel Arrow */}
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Geser ke kiri"
          className="group relative flex size-10 items-center justify-center rounded-xl border border-ink/15 bg-white text-ink-strong shadow-xs transition-all hover:border-ink-strong hover:bg-neutral-50 active:scale-95 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5 transition-transform group-hover:-translate-x-0.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Geser ke kanan"
          className="group relative flex size-10 items-center justify-center rounded-xl border border-ink/15 bg-white text-ink-strong shadow-xs transition-all hover:border-ink-strong hover:bg-neutral-50 active:scale-95 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5 transition-transform group-hover:translate-x-0.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Area kartu jurusan */}
      <div className="relative pt-2">
        <ul
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`flex gap-3.5 sm:gap-4 lg:gap-4.5 overflow-x-auto overscroll-x-contain px-2 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging
              ? "cursor-grabbing select-none scroll-auto"
              : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {majorDetails.map((major, index) => {
            const theme = majorThemes[major.code] ?? majorThemes.RPL;

            return (
              <li
                key={major.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} dari ${majorDetails.length}: ${major.name}`}
                className="w-[68vw] max-w-[15.5rem] shrink-0 snap-center sm:w-[14.5rem] lg:w-[15rem] xl:w-[15.5rem]"
              >
                <Link
                  href={`/jurusan/${major.slug}`}
                  onClick={handleCardClick}
                  draggable={false}
                  className="group block h-full select-none"
                >
                  {/* Kartu Jurusan Solid Kotak Tegas */}
                  <div
                    className={`relative flex h-full flex-col justify-between border border-ink-strong/20 p-3 shadow-[0_4px_16px_rgba(11,31,51,0.06)] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_28px_rgba(11,31,51,0.12)] ${theme.paper}`}
                  >
                    <div>
                      {/* Poster Karya Siswa Asli (3/4 Aspect) */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden border border-ink-strong/15 bg-white shadow-xs">
                        <Image
                          src={`/images/school/${major.code.toLowerCase()}-home.webp`}
                          alt={`Poster jurusan ${major.name}`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 639px) 68vw, (max-width: 1023px) 14.5rem, 15.5rem"
                          className="select-none object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                          draggable={false}
                        />
                      </div>

                      {/* Rumpun Keahlian di Bawah Poster */}
                      <div className="mt-2.5 px-0.5">
                        <span className={`text-[0.65rem] font-bold uppercase tracking-wider ${theme.accentText}`}>
                          {major.group}
                        </span>
                      </div>
                    </div>

                    {/* Judul & Action */}
                    <div className="mt-1 flex items-end justify-between gap-2.5 px-0.5 pb-0.5">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-black leading-tight tracking-[-0.02em] text-ink-strong transition-colors group-hover:text-primary sm:text-[0.95rem]">
                          {major.name}
                        </h3>
                        <p className="mt-0.5 truncate text-[0.68rem] font-semibold text-ink-strong/75">
                          {major.focus.slice(0, 3).join(" • ")}
                        </p>
                      </div>
                      <span className="inline-flex size-6.5 shrink-0 items-center justify-center border border-ink-strong/25 bg-white text-ink-strong shadow-xs transition-colors group-hover:bg-ink-strong group-hover:text-white">
                        <ChevronRightIcon className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
