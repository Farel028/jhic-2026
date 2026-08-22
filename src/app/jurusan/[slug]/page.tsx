import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getMajorBySlug, majorDetails } from "@/data/majors";
import { withPageTwitter } from "@/lib/metadata";

type MajorPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return majorDetails.map((major) => ({ slug: major.slug }));
}

export async function generateMetadata({ params }: MajorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const major = getMajorBySlug(slug);

  if (!major) return {};

  return withPageTwitter({
    title: major.name,
    description: major.description,
    alternates: {
      canonical: `/jurusan/${major.slug}`,
    },
    openGraph: {
      title: `${major.name} · SMK Negeri 2 Surabaya`,
      description: major.description,
      url: `/jurusan/${major.slug}`,
      images: [
        {
          url: major.banner.src,
          alt: major.banner.alt,
        },
      ],
    },
  });
}

export default async function MajorPage({ params }: MajorPageProps) {
  const { slug } = await params;
  const major = getMajorBySlug(slug);

  if (!major) notFound();

  const currentIndex = majorDetails.findIndex((item) => item.slug === major.slug);
  const nextMajor = majorDetails[(currentIndex + 1) % majorDetails.length];

  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Program Keahlian", path: "/#jurusan" },
          { name: major.name, path: `/jurusan/${major.slug}` },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/#jurusan" className="transition-colors hover:text-primary-strong">Program keahlian</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">{major.code}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary-strong">{major.group} · {major.code}</p>
              <h1 className="mt-4 text-[clamp(2.4rem,4.8vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink-strong">
                {major.name}
              </h1>
              <p className="mt-6 max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
                {major.description}
              </p>
            </div>

            <figure className="relative aspect-video overflow-hidden bg-white">
              <Image
                src={major.banner.src}
                alt={major.banner.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20">
          <div>
            <p className="eyebrow">Tentang bidang</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Gambaran {major.code}
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
              {major.overview}
            </p>
            {major.sourceNote ? (
              <p className="mt-7 max-w-3xl border-l-4 border-accent-strong pl-5 text-sm font-medium leading-6 text-ink-muted">
                {major.sourceNote}
              </p>
            ) : (
              <p className="mt-7 text-sm leading-6 text-ink-muted">
                Isi diringkas dari banner profil jurusan yang dipublikasikan sekolah.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">{major.learningLabel}</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Yang dipelajari
            </h2>
            <ol className="mt-8 border-t border-ink/15">
              {major.learningAreas.map((area, index) => (
                <li key={area} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-ink/15 py-5 sm:py-6">
                  <span className="pt-1 text-xs font-extrabold tabular-nums text-primary-strong">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-bold leading-7 tracking-[-0.015em] text-ink-strong">{area}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:border-l lg:border-ink/15 lg:pl-20">
            <p className="eyebrow">Peluang setelah lulus</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Arah karier
            </h2>
            <ul className="mt-8 grid border-t border-ink/15 sm:grid-cols-2">
              {major.pathwayExamples.map((path) => (
                <li key={path} className="flex min-h-20 items-center border-b border-ink/15 py-4 pr-5 text-base font-bold leading-6 text-ink-strong sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                  {path}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-ink-muted">
              Daftar ini merupakan contoh arah karier, bukan jaminan penempatan kerja.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink">Jurusan berikutnya</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              {nextMajor.name}
            </h2>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href={`/jurusan/${nextMajor.slug}`} className="inline-flex min-h-11 items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-white">
              Lihat jurusan <ArrowRightIcon className="size-4" />
            </Link>
            <Link href="/#jurusan" className="inline-flex min-h-11 items-center text-sm font-extrabold text-ink-strong underline decoration-white decoration-2 underline-offset-8">
              Semua jurusan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
