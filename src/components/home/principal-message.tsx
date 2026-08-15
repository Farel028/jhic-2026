import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";

export function PrincipalMessage() {
  return (
    <section aria-labelledby="sambutan-kepala-sekolah" className="overflow-hidden bg-ink-strong px-5 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid min-h-[42rem] w-full max-w-site items-end gap-10 pt-20 sm:pt-24 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:pt-0">
        <div className="relative order-2 mx-auto h-[33rem] w-full max-w-[35rem] self-end sm:h-[40rem] lg:order-1">
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

        <div className="order-1 max-w-2xl self-center pb-2 lg:order-2 lg:py-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Sambutan kepala sekolah</p>
          <h2 id="sambutan-kepala-sekolah" className="mt-5 text-[clamp(2.8rem,5.5vw,5.8rem)] font-black leading-[0.9] tracking-[-0.065em]">
            Sekolah yang terbuka, terhubung, dan terus bertumbuh.
          </h2>
          <p className="mt-7 max-w-xl text-base font-medium leading-8 text-white/70 sm:text-lg">
            Website sekolah menjadi ruang informasi dan komunikasi bagi murid, orang tua, alumni, mitra industri, serta masyarakat. Dari sini, setiap orang dapat mengikuti perkembangan pendidikan dan karya warga sekolah.
          </p>
          <div className="mt-8 border-l-4 border-accent-strong pl-5">
            <p className="text-xl font-black tracking-[-0.035em]">{school.principal.name}</p>
            <p className="mt-1 text-sm font-bold text-white/55">{school.principal.role}</p>
          </div>
          <a
            href={school.principal.messageUrl}
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent-strong px-5 text-sm font-extrabold text-ink-strong transition-transform hover:-translate-y-0.5"
          >
            Baca sambutan lengkap <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
