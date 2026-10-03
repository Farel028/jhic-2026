import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export function CampusMapCta() {
  return (
    <section aria-labelledby="campus-map-title" className="border-b border-ink/10 bg-[#f3f4f6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto grid w-full max-w-site items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">Kenali lingkungan sekolah</p>
          <h2 id="campus-map-title" className="mt-5 max-w-lg text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-strong">
            Cari ruang.<br />Kenali tempatnya.
          </h2>
          <p className="mt-5 max-w-md text-base font-medium leading-7 text-ink-muted">
            Baru pertama kali ke sekolah? Temukan ruang kelas, kantor, aula,
            dan fasilitas bersama melalui peta 3D interaktif.
          </p>
          <Link href="/peta-sekolah" className="mt-7 inline-flex min-h-12 items-center gap-5 rounded-xl bg-ink-strong px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-strong">
            Jelajahi peta sekolah <ArrowRightIcon className="size-4" />
          </Link>
          <p className="mt-4 text-xs font-medium leading-5 text-ink-muted">Cari nama ruang, pilih kategorinya, lalu klik untuk melihat detail.</p>
        </div>
        <figure className="min-w-0">
          <Link
            href="/peta-sekolah"
            aria-label="Buka peta 3D dari denah arsitektur sekolah"
            className="group block overflow-hidden rounded-2xl border border-ink/15 bg-white p-3 sm:p-5 shadow-xs transition-all hover:border-primary-strong/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-strong"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-ink/10 bg-[#f8fafc]">
              <Image
                src="/images/school/denah-arsitektur-timur-bawah.png"
                alt="Denah Arsitektur Resmi SMK Negeri 2 Surabaya: pemetaan zonasi bengkel, ruang teori, administrasi, dan fasilitas sekolah."
                fill
                sizes="(max-width: 1023px) 90vw, 55vw"
                className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                priority
              />
              <span className="absolute bottom-3 left-3 rounded-md bg-ink-strong/85 px-2.5 py-1 text-[0.68rem] font-bold text-white backdrop-blur-sm sm:bottom-4 sm:left-4 sm:text-xs">
                Denah Arsitektur Resmi
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3.5 text-xs sm:text-sm font-bold text-ink-strong">
              <span className="group-hover:text-primary-strong transition-colors">
                Buka Peta Sekolah 3D Interaktif
              </span>
              <span className="inline-flex items-center gap-1.5 text-primary-strong">
                Eksplorasi
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
          <figcaption className="mt-3 text-xs font-medium leading-5 text-ink-muted">
            Berdasarkan denah arsitektur resmi SMKN 2 Surabaya (Jl. Tentara Genie Pelajar No. 26).
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
