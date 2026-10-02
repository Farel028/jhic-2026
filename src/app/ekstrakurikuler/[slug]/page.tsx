import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  extracurricularDetails,
  getExtracurricularBySlug,
} from "@/data/extracurriculars";
import { withPageTwitter } from "@/lib/metadata";

type ExtracurricularPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return extracurricularDetails.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ExtracurricularPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getExtracurricularBySlug(slug);

  if (!item) return {};

  return withPageTwitter({
    title: `${item.name} · Ekstrakurikuler`,
    description: item.description,
    alternates: {
      canonical: `/ekstrakurikuler/${item.slug}`,
    },
    openGraph: {
      title: `${item.name} · Ekstrakurikuler SMK Negeri 2 Surabaya`,
      description: item.description,
      url: `/ekstrakurikuler/${item.slug}`,
    },
  });
}

const infoLabels = ["Jadwal", "Tempat", "Pembina", "Instagram"] as const;

export default async function ExtracurricularPage({
  params,
}: ExtracurricularPageProps) {
  const { slug } = await params;
  const item = getExtracurricularBySlug(slug);

  if (!item) notFound();

  const currentIndex = extracurricularDetails.findIndex(
    (entry) => entry.slug === item.slug,
  );
  const nextItem =
    extracurricularDetails[(currentIndex + 1) % extracurricularDetails.length];
  const infoValues: Record<(typeof infoLabels)[number], string> = {
    Jadwal: item.schedule,
    Tempat: item.location,
    Pembina: item.coach,
    Instagram: item.instagram,
  };

  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Ekstrakurikuler", path: "/siswa/ekstrakurikuler" },
          { name: item.name, path: `/ekstrakurikuler/${item.slug}` },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-12 text-ink-strong sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/siswa/ekstrakurikuler" className="transition-colors hover:text-primary-strong">Ekstrakurikuler</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">{item.short}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative flex size-24 sm:size-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-ink/15 bg-white p-2 shadow-xs">
                <Image
                  src={`/images/ekskul/${item.slug}.jpg`}
                  alt={`Logo ${item.name}`}
                  width={112}
                  height={112}
                  className="size-full rounded-xl object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary-strong">
                  {item.category} · {item.short}
                </p>
                <h1 className="mt-2 text-[clamp(2.2rem,4.4vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">
                  {item.name}
                </h1>
                <p className="mt-4 max-w-xl text-base font-medium leading-7 text-ink-muted">
                  {item.description}
                </p>
              </div>
            </div>

            <dl className="grid gap-3 rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:grid-cols-2 sm:p-6">
              {infoLabels.map((label) => (
                <div key={label} className="rounded-xl bg-[#f1f0ea] px-4 py-3">
                  <dt className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-ink-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold leading-6">
                    {label === "Instagram" ? (
                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-strong underline decoration-2 underline-offset-4"
                      >
                        {infoValues[label]}
                      </a>
                    ) : (
                      infoValues[label]
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20">
          <div>
            <p className="eyebrow">Materi latihan</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Yang dipelajari
            </h2>
          </div>
          <div>
            <ol className="border-t border-ink/15">
              {item.materials.map((material, index) => (
                <li key={material} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-ink/15 py-5 sm:py-6">
                  <span className="pt-1 text-xs font-extrabold tabular-nums text-primary-strong">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-bold leading-7 tracking-[-0.015em] text-ink-strong">{material}</span>
                </li>
              ))}
            </ol>
            <p className="mt-7 max-w-3xl border-l-4 border-accent-strong pl-5 text-sm font-medium leading-6 text-ink-muted">
              Materi di atas adalah kerangka awal dari tim web dan perlu dikonfirmasi
              dengan pembina masing-masing ekskul sebelum dianggap resmi.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Prestasi & galeri</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Jejak {item.short}
            </h2>
            {item.achievements.length > 0 ? (
              <ul className="mt-8 border-t border-ink/15">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="border-b border-ink/15 py-5 text-base font-bold leading-7 text-ink-strong">
                    {achievement}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-8 rounded-2xl bg-[#f1f0ea] px-5 py-6 text-base font-medium leading-7 text-ink-muted">
                Belum ada prestasi terverifikasi yang ditampilkan untuk {item.name}.
                Prestasi baru akan ditambahkan setelah ada sumber artikel atau
                dokumen resmi sekolah.
              </p>
            )}
          </div>

          <div className="lg:border-l lg:border-ink/15 lg:pl-20">
            <p className="eyebrow">Cara bergabung</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Hubungi via IG
            </h2>
            <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-ink-muted">
              Pendaftaran dan tanya-jawab {item.name} diarahkan ke akun Instagram
              masing-masing ekskul agar info jadwal dan seleksi selalu terbaru.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={item.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-3 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                {item.instagram} <ArrowRightIcon className="size-4" />
              </a>
              <Link
                href="/siswa/ekstrakurikuler"
                className="inline-flex min-h-11 items-center text-sm font-extrabold text-ink-strong underline decoration-accent-strong decoration-2 underline-offset-8"
              >
                Semua ekstrakurikuler
              </Link>
            </div>
            <p className="mt-6 text-sm leading-6 text-ink-muted">
              Akun IG di atas masih placeholder dan perlu diganti dengan akun resmi
              tiap ekskul.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink">Ekstrakurikuler berikutnya</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              {nextItem.name}
            </h2>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href={`/ekstrakurikuler/${nextItem.slug}`} className="inline-flex min-h-11 items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-white">
              Lihat ekskul <ArrowRightIcon className="size-4" />
            </Link>
            <Link href="/#ekstrakurikuler" className="inline-flex min-h-11 items-center text-sm font-extrabold text-ink-strong underline decoration-white decoration-2 underline-offset-8">
              Semua ekstrakurikuler
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
