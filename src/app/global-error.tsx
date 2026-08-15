"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="id">
      <body className="grid min-h-dvh place-items-center bg-background px-5 text-ink">
        <main className="max-w-xl text-center">
          <p className="eyebrow">Terjadi kendala</p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-ink-strong sm:text-5xl">Halaman belum dapat ditampilkan.</h1>
          <p className="mt-5 text-base leading-7 text-ink-muted">Coba muat kembali halaman. Jika kendala berlanjut, silakan kembali beberapa saat lagi.</p>
          <button type="button" onClick={reset} className="mt-8 min-h-12 rounded-full bg-accent-strong px-6 text-sm font-extrabold text-ink-strong">Coba lagi</button>
        </main>
      </body>
    </html>
  );
}
