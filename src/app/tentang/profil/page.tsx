import type { Metadata } from "next";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { schoolIdentity, schoolVision } from "@/data/about";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Profil Sekolah",
  description:
    "Profil SMK Negeri 2 Surabaya, sekolah vokasi yang menempati bangunan cagar budaya bersejarah di Kota Surabaya.",
  alternates: { canonical: "/tentang/profil" },
  openGraph: {
    title: "Profil SMK Negeri 2 Surabaya",
    description:
      "Kenali identitas, warisan pendidikan, dan visi SMK Negeri 2 Surabaya.",
    url: "/tentang/profil",
  },
});

const relatedAboutPages = [
  {
    label: "Sejarah",
    description: "Jejak sekolah teknik sejak awal abad ke-20.",
    href: "/tentang/sejarah",
  },
  {
    label: "Kurikulum & Pembelajaran",
    description: "Cara kompetensi dibangun melalui praktik dan pengalaman nyata.",
    href: "/tentang/kurikulum",
  },
  {
    label: "Fasilitas",
    description: "Ruang belajar, laboratorium, bengkel, dan Teaching Factory.",
    href: "/tentang/fasilitas",
  },
] as const;

export default function ProfilePage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Tentang Sekolah", path: "/tentang" },
          { name: "Profil Sekolah", path: "/tentang/profil" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Profil" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <div>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
                Profil SMKN 2 Surabaya
              </h1>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              {school.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12 lg:px-10 lg:pb-28 lg:pt-14">
        <div className="mx-auto grid w-full max-w-site gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="eyebrow">Warisan pendidikan</p>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong">
              Berakar dari Koningin Emma School.
            </h2>
            <div className="mt-6 max-w-xl space-y-5 text-base font-medium leading-7 text-ink-muted">
              <p>
                Kompleks {school.shortName} tercatat sebagai Bangunan Cagar
                Budaya Kota Surabaya. Jejaknya bermula dari sekolah teknik yang
                dibuka pada 2 Juli 1912 dan kemudian diberi nama Koningin Emma
                School.
              </p>
              <p>
                Lebih dari satu abad kemudian, fungsi pendidikannya tetap hidup
                melalui 11 program keahlian di bidang teknologi, seni,
                konstruksi, elektronika, manufaktur, dan otomotif.
              </p>
            </div>
            <Link
              href="/#jurusan"
              className="mt-7 inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
            >
              Lihat program keahlian <ArrowRightIcon className="size-4" />
            </Link>
          </div>

          <dl className="border-t border-ink/15">
            {schoolIdentity.map((item) => (
              <div key={item.label} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.34fr_0.66fr] sm:gap-8 sm:py-6">
                <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">{item.label}</dt>
                <dd className="text-base font-extrabold leading-6 tracking-[-0.015em] text-ink-strong sm:text-lg sm:leading-7">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="visi-misi" className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-6 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
          <p className="eyebrow">Visi sekolah</p>
          <p className="max-w-5xl text-[clamp(1.5rem,2.7vw,2.3rem)] font-extrabold leading-[1.28] tracking-[-0.025em] text-ink-strong">
            {schoolVision}
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-6 sm:grid-cols-[0.42fr_0.58fr] sm:gap-12 lg:gap-20">
            <div>
              <p className="eyebrow">Tentang sekolah</p>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
                Kenali SMEKDA lebih lanjut.
              </h2>
            </div>
            <nav aria-label="Informasi lain tentang sekolah">
              <ul className="border-t border-ink/15">
                {relatedAboutPages.map((page) => (
                  <li key={page.href} className="border-b border-ink/15">
                    <Link href={page.href} className="group grid grid-cols-[1fr_auto] items-center gap-5 py-5 sm:py-6">
                      <span>
                        <span className="block text-base font-extrabold text-ink-strong group-hover:text-primary-strong sm:text-lg">{page.label}</span>
                        <span className="mt-1 block text-sm leading-6 text-ink-muted">{page.description}</span>
                      </span>
                      <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-primary-strong" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
