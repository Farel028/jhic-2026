import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export function CampusMapCta() {
  return (
    <section aria-labelledby="campus-map-title" className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
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
          <Link href="/peta-sekolah" aria-label="Buka peta 3D dari denah sekolah" className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white p-3 transition-colors hover:border-primary-strong/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-strong sm:p-6">
            <Image src="/images/school/denah-canva.png" alt="Denah prototype sekolah: kelompok ruang mengelilingi taman dengan aula di tengah bagian atas" width={1333} height={595} sizes="(max-width: 1023px) 90vw, 55vw" className="h-auto w-full" />
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 text-xs font-bold text-ink-muted">
              <span>Denah sekolah → tampilan 3D</span>
              <ArrowRightIcon className="size-4 text-ink-strong transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
          <figcaption className="mt-3 text-xs font-medium leading-5 text-ink-muted">Berdasarkan prototype denah Canva; bentuk bangunan pada peta bersifat ilustratif.</figcaption>
        </figure>
      </div>
    </section>
  );
}
