import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { alumniOutcomeFacts } from "@/data/homepage";

export function AlumniOutcome() {
  return (
    <section
      aria-labelledby="alumni-outcome-title"
      className="bg-white px-5 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-24 lg:px-10 lg:pb-12 lg:pt-28"
    >
      <div className="mx-auto grid w-full max-w-site gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-start lg:gap-24">
        <div>
          <h2
            id="alumni-outcome-title"
            className="max-w-2xl text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong"
          >
            Setelah lulus dari SMEKDA
          </h2>
          <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
            Bursa Kerja Khusus membantu alumni mengakses informasi karier,
            terhubung dengan perusahaan, dan tetap tercatat melalui penelusuran
            lulusan.
          </p>

          <a
            href={school.urls.bkk}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-3 border-b-2 border-primary pb-1 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong"
          >
            Kunjungi BKK
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>

        <dl className="border-t border-ink/20">
          {alumniOutcomeFacts.map((fact) => (
            <div
              key={fact.label}
              className="grid grid-cols-[0.34fr_0.66fr] items-baseline gap-5 border-b border-ink/20 py-6 sm:grid-cols-[0.3fr_0.7fr] sm:gap-8 sm:py-7"
            >
              <dt className="text-sm font-bold leading-6 text-ink-muted sm:text-base">
                {fact.label}
              </dt>
              <dd className="order-first text-3xl font-extrabold tracking-[-0.03em] text-ink-strong sm:text-4xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function AdmissionCta() {
  return (
    <section
      aria-labelledby="admission-cta-title"
      className="border-t-[0.5rem] border-accent-strong bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div>
          <h2
            id="admission-cta-title"
            className="max-w-3xl text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong"
          >
            Data penerimaan SPMB
          </h2>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
            Cek daya tampung dan rentang nilai tiap jurusan dari penerimaan
            tahun sebelumnya.
          </p>
        </div>

        <Link
          href="/informasi/spmb"
          className="inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-xl border border-ink-strong px-6 text-sm font-extrabold text-ink-strong transition-colors hover:bg-ink-strong hover:text-white lg:justify-self-end"
        >
          Lihat data penerimaan
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
