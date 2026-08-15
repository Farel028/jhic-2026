import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main id="konten-utama" className="flex min-h-[70svh] flex-1 items-center px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.45fr_1fr] lg:items-end">
        <p aria-hidden="true" className="text-[8rem] font-black leading-none tracking-[-0.09em] text-secondary sm:text-[12rem]">404</p>
        <div className="max-w-2xl">
          <p className="eyebrow">Halaman tidak ditemukan</p>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-0.055em] text-ink-strong sm:text-6xl">Sepertinya kamu mengambil jalur yang belum tersedia.</h1>
          <p className="mt-6 text-lg leading-8 text-ink-muted">Kembali ke beranda untuk melanjutkan penjelajahan sekolah.</p>
          <Link href="/" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white">
            Kembali ke beranda <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
