"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const INITIAL_VISIBLE_COUNT = 3;
const LOAD_MORE_COUNT = 3;

const achievementPosters = [
  {
    src: "/images/achieve/cinta-juara-1.webp",
    alt: "Cinta dari kelas XII TAV 2 meraih Juara 1 Kejurnas Umum U-23 Handball Championship 2026",
  },
  {
    src: "/images/achieve/itsl-juara-2.webp",
    alt: "Tim RPL SMEKDA meraih Juara 2 UBAYA IT Summer Lab 2026 kategori Fun, Fast, Vibe Coding",
  },
  {
    src: "/images/achieve/daffa-juara-1.webp",
    alt: "Rayhan Daffa Fahri Pratama dari kelas XI TKP 1 meraih Juara 1 Kejuaraan Jujitsu Piala Wali Kota Mojokerto 2026 se-Jawa Timur",
  },
] as const;

export function AchievementShowcase() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const visiblePosters = achievementPosters.slice(0, visibleCount);
  const hasMore = visibleCount < achievementPosters.length;

  return (
    <section
      aria-labelledby="prestasi-siswa"
      className="border-b border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto w-full max-w-site">
        <div className="grid items-end gap-4 border-b border-ink/15 pb-7 md:grid-cols-[1fr_auto] md:gap-10">
          <h2
            id="prestasi-siswa"
            className="text-[clamp(1.9rem,3vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong"
          >
            Prestasi siswa
          </h2>
          <p className="max-w-md text-sm font-medium leading-6 text-ink-muted sm:text-base">
            Capaian siswa SMEKDA di berbagai bidang.
          </p>
        </div>

        <ol className="mt-8 grid snap-x snap-mandatory grid-flow-col auto-cols-[76%] gap-4 overflow-x-auto overscroll-x-contain pb-3 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-auto md:max-w-[50rem] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible md:pb-0 md:pr-0 lg:gap-5">
          {visiblePosters.map((poster) => (
            <li key={poster.src} className="snap-start">
              <Link href="/siswa/prestasi" className="group block">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e3e1d9]">
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 767px) 76vw, (max-width: 839px) calc(33vw - 2rem), 253px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transition-none"
                  />
                </figure>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex justify-center">
          {hasMore ? (
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => count + LOAD_MORE_COUNT)
              }
              className="min-h-11 border-b-2 border-primary px-1 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong"
            >
              Muat lebih banyak
            </button>
          ) : (
            <Link
              href="/siswa/prestasi"
              className="inline-flex min-h-11 items-center border-b-2 border-primary px-1 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong"
            >
              Lihat semua prestasi
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
