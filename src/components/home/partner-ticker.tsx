import Image from "next/image";
import { featuredPartners } from "@/data/partners";

function PartnerItems({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="ticker-track-list" aria-hidden={hidden || undefined}>
      {featuredPartners.map((partner) => (
        <li
          key={partner.name}
          className="flex items-center whitespace-nowrap"
        >
          <span className="flex h-20 w-36 items-center justify-center px-5 sm:h-24 sm:w-44 sm:px-7">
            <Image
              src={partner.logo.src}
              alt={partner.name}
              width={partner.logo.width}
              height={partner.logo.height}
              sizes="(max-width: 639px) 6rem, 7.5rem"
              className="max-h-10 w-auto max-w-24 object-contain sm:max-h-12 sm:max-w-30"
            />
          </span>
          <span aria-hidden="true" className="h-5 w-px bg-ink/20" />
        </li>
      ))}
    </ul>
  );
}

export function PartnerTicker() {
  return (
    <section
      aria-label="Mitra kerja sama SMK Negeri 2 Surabaya"
      className="bg-white pb-20 sm:pb-24 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10">
        <p className="text-center text-sm font-extrabold leading-6 text-ink-strong">
          SMKN 2 Surabaya bekerja sama dengan
        </p>
      </div>

      <div className="mt-7 border-y border-ink/10">
        <div className="ticker-viewport">
          <div
            className="ticker-track"
            tabIndex={0}
            aria-label="Daftar mitra kerja sama. Fokus untuk menjeda gerakan."
          >
            <PartnerItems />
            <PartnerItems hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
