import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main id="konten-utama" className="flex-1">
      <section className="border-b border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid min-h-[55svh] w-full max-w-site items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Halaman ini tidak ditemukan.
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Tautannya mungkin sudah berubah atau halaman tersebut tidak lagi tersedia.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-ink-strong px-5 text-sm font-extrabold text-white transition-colors hover:bg-primary-strong"
              >
                Kembali ke beranda <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div aria-hidden="true" className="relative mx-auto w-full max-w-xl border-y border-ink/15 py-8 sm:py-10 lg:justify-self-end">
            <div className="flex items-center justify-between gap-6">
              <span className="text-[clamp(4.5rem,10vw,6rem)] font-extrabold leading-none tracking-[-0.04em] text-primary-strong">
                404
              </span>
              <span className="max-w-28 text-right text-[0.65rem] font-extrabold uppercase leading-5 tracking-[0.12em] text-ink-muted sm:max-w-36 sm:text-xs">
                Rute tidak tersedia
              </span>
            </div>
            <div className="mt-7 flex items-center" role="presentation">
              <span className="h-2 w-16 bg-accent-strong sm:w-24" />
              <span className="h-px flex-1 bg-primary-strong/45" />
              <span className="size-3 bg-primary-strong" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
