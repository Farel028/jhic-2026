"use client";

export default function VirtualTourError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="konten-utama" className="grid min-h-[calc(100svh-4.75rem)] flex-1 place-items-center bg-ink-strong px-5 text-center text-white">
      <div className="max-w-lg">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Virtual Tour</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">Tour belum dapat dibuka.</h1>
        <p className="mt-5 text-sm leading-7 text-white/70">Konfigurasi atau engine panorama mengalami kendala. Detail teknis tidak ditampilkan pada halaman publik.</p>
        <button type="button" onClick={reset} className="mt-7 min-h-12 rounded-full bg-accent-strong px-6 text-sm font-extrabold text-ink-strong">Coba lagi</button>
      </div>
    </main>
  );
}
