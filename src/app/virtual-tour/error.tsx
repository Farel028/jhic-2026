"use client";

import Link from "next/link";

export default function VirtualTourError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="konten-utama" className="relative grid min-h-dvh flex-1 place-items-center bg-ink-strong px-5 text-center text-white">
      <Link
        href="/"
        prefetch={false}
        className="absolute left-5 top-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-extrabold text-white transition-colors hover:bg-white/18 sm:left-8"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
          <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Beranda
      </Link>
      <div className="max-w-lg">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Virtual Tour</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">Tour belum dapat dibuka.</h1>
        <p className="mt-5 text-sm leading-7 text-white/70">Konfigurasi atau engine panorama mengalami kendala. Detail teknis tidak ditampilkan pada halaman publik.</p>
        <button type="button" onClick={reset} className="mt-7 min-h-12 rounded-full bg-accent-strong px-6 text-sm font-extrabold text-ink-strong">Coba lagi</button>
      </div>
    </main>
  );
}
