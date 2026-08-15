import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
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

  if (!major) {
    return {};
  }

  return withPageTwitter({
    title: major.name,
    description: `${major.description} Kenali gambaran bidang ${major.code} di SMK Negeri 2 Surabaya.`,
    alternates: {
      canonical: `/jurusan/${major.slug}`,
    },
    openGraph: {
      title: `${major.name} · SMK Negeri 2 Surabaya`,
      description: major.description,
      url: `/jurusan/${major.slug}`,
    },
  });
}

export default async function MajorPage({ params }: MajorPageProps) {
  const { slug } = await params;
  const major = getMajorBySlug(slug);

  if (!major) {
    notFound();
  }

  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Program Keahlian", path: "/jurusan" },
          { name: major.name, path: `/jurusan/${major.slug}` },
        ]}
      />

      <section className={`relative overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24 ${major.accent === "yellow" ? "bg-accent-soft" : "bg-secondary"}`}>
        <span aria-hidden="true" className="absolute -right-10 top-4 text-[13rem] font-black leading-none tracking-[-0.1em] text-white/35 sm:text-[22rem] lg:right-[4%]">{major.code}</span>
        <div className="relative mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-ink-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/jurusan" className="transition-colors hover:text-ink-strong">Program keahlian</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">{major.code}</li>
            </ol>
          </nav>

          <div className="mt-16 max-w-5xl sm:mt-20">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-ink-muted">Program keahlian · {major.code}</p>
            <h1 className="mt-5 text-[clamp(3.5rem,8vw,8.5rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">{major.name}</h1>
            <p className="mt-8 max-w-2xl text-lg font-semibold leading-8 text-ink sm:text-xl sm:leading-9">{major.description}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="eyebrow">Gambaran bidang</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Belajar lewat proses dan karya.</h2>
            <p className="mt-7 text-base font-medium leading-8 text-ink-muted sm:text-lg">{major.overview}</p>
            <p className="mt-6 rounded-2xl border border-ink/10 bg-[#eef7fd] p-4 text-sm leading-6 text-ink-muted">
              Area belajar berikut adalah ringkasan orientasi bidang, bukan rincian kurikulum resmi per tahun.
            </p>
          </div>

          <ol className="border-t border-ink/15">
            {major.learningAreas.map((area, index) => (
              <li key={area} className="grid grid-cols-[auto_1fr] gap-5 border-b border-ink/15 py-6 sm:gap-8 sm:py-8">
                <span className="text-xs font-black tabular-nums text-primary-strong">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-xl font-extrabold leading-snug tracking-[-0.025em] text-ink-strong sm:text-2xl">{area}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto grid w-full max-w-site overflow-hidden rounded-[2rem] bg-ink-strong text-white shadow-card lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">{major.evidence.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">{major.evidence.title}</h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/70 sm:text-lg sm:leading-8">{major.evidence.description}</p>
            <a href={major.evidence.href} rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent-strong px-5 text-sm font-extrabold text-ink-strong transition-transform hover:-translate-y-0.5">
              {major.evidence.linkLabel} <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
          <div className={`relative min-h-72 overflow-hidden border-t border-white/15 p-8 lg:min-h-full lg:border-l lg:border-t-0 ${major.accent === "yellow" ? "bg-accent-soft" : "bg-primary"}`}>
            <span aria-hidden="true" className="absolute -bottom-10 -right-6 text-[13rem] font-black leading-none tracking-[-0.1em] text-white/35 sm:text-[17rem]">{major.code}</span>
            <div className="relative flex h-full flex-col justify-between">
              <span className="w-fit rounded-full border border-ink/20 bg-white/65 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-ink-strong">Praktik · Kolaborasi · Refleksi</span>
              <p className="mt-24 max-w-xs text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong">Pengalaman nyata membantu teori menjadi keterampilan.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">Setelah lulus</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Bekal untuk melangkah lebih jauh.</h2>
              <p className="mt-6 text-sm leading-6 text-ink-muted">Contoh arah berikut bersifat orientasi umum bidang, bukan jaminan penempatan kerja atau daftar profesi resmi sekolah.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {major.pathwayExamples.map((path, index) => (
                <li key={path} className="flex min-h-36 flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
                  <span className="text-xs font-black text-primary-strong">0{index + 1}</span>
                  <span className="mt-8 text-lg font-extrabold leading-snug tracking-[-0.025em] text-ink-strong">{path}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-site items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Cek informasi resmi</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-6xl">Tertarik dengan {major.code}?</h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-ink-muted">Gunakan profil ini sebagai pengantar. Konfirmasikan kurikulum, daya tampung, dan ketentuan pendaftaran melalui kanal resmi sekolah.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={major.officialProfile} rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">
              Buka sumber sekolah <ArrowUpRightIcon className="size-4" />
            </a>
            <Link href="/jurusan" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-ink/20 px-6 text-sm font-extrabold text-ink-strong transition-colors hover:bg-secondary/25">
              Semua program <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
