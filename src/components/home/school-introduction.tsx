import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";

export function SchoolIntroduction() {
  return (
    <section aria-labelledby="tentang-smekda" className="overflow-hidden bg-ink-strong px-5 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-site items-end gap-10 pt-16 sm:pt-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:pt-0">
        <div className="relative order-2 mx-auto h-[31rem] w-full max-w-[35rem] self-end sm:h-[39rem] lg:order-1">
          <div aria-hidden="true" className="absolute inset-x-[8%] bottom-0 top-[13%] rounded-t-[12rem] bg-primary" />
          <div aria-hidden="true" className="absolute bottom-[13%] left-[2%] size-24 rounded-full bg-accent-strong sm:size-32" />
          <div aria-hidden="true" className="absolute right-[1%] top-[12%] grid size-24 grid-cols-4 gap-2 opacity-50 sm:size-32">
            {Array.from({ length: 16 }).map((_, index) => (
              <span key={index} className="size-1.5 rounded-full bg-white sm:size-2" />
            ))}
          </div>
          <Image
            src={school.principal.image.src}
            alt={school.principal.image.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 44vw"
            className="relative z-10 object-contain object-bottom"
          />
        </div>

        <div className="order-1 max-w-2xl self-center lg:order-2 lg:py-24">
          <p className="text-sm font-extrabold text-secondary">Tentang SMEKDA</p>
          <h2 id="tentang-smekda" className="mt-5 max-w-2xl text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            Sekolah vokasi Surabaya sejak {school.historicalSince}.
          </h2>
          <p className="mt-7 max-w-xl text-base font-medium leading-8 text-white/70 sm:text-lg">
            {school.shortName} menyiapkan murid melalui pembelajaran vokasi, praktik, dan karya di berbagai bidang teknologi dan industri.
          </p>

          <div className="mt-8 border-t border-white/15 pt-7">
            <p className="text-sm font-bold text-secondary">Sambutan Kepala Sekolah</p>
            <p className="mt-4 max-w-xl text-base font-medium leading-8 text-white/70">
              Website ini menjadi ruang informasi pendidikan sekaligus penghubung antara sekolah, murid, orang tua, alumni, mitra, dan masyarakat.
            </p>
            <div className="mt-6 border-l-4 border-accent-strong pl-5">
              <p className="text-xl font-extrabold tracking-[-0.025em]">{school.principal.name}</p>
              <p className="mt-1 text-sm font-bold text-white/55">{school.principal.role}</p>
            </div>
          </div>

          <Link href="/tentang/profil" className="mt-8 inline-flex min-h-11 items-center gap-3 border-b-2 border-accent-strong pb-1 text-sm font-extrabold text-white transition-colors hover:text-secondary">
            Profil sekolah <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
