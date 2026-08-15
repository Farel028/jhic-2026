import type { Metadata } from "next";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { AboutNavigation } from "@/components/about/about-navigation";
import { DocumentaryImage } from "@/components/about/documentary-image";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { aboutImages, aboutSource, directionThemes } from "@/data/about";
import { school } from "@/config/school";

export const metadata: Metadata = {
  title: "Visi dan Misi",
  description:
    "Arah pendidikan SMK Negeri 2 Surabaya yang tercermin melalui kompetensi, karakter, keterhubungan industri, dan kesiapan masa depan.",
  alternates: { canonical: "/tentang/visi-misi" },
  openGraph: {
    title: "Visi dan Misi SMK Negeri 2 Surabaya",
    description: "Nilai dan arah pendidikan yang menggerakkan kehidupan sekolah.",
    url: "/tentang/visi-misi",
  },
};

export default function VisionMissionPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[
        { name: "Beranda", path: "/" },
        { name: "Tentang Sekolah", path: "/tentang" },
        { name: "Visi dan Misi", path: "/tentang/visi-misi" },
      ]} />
      <AboutNavigation activeHref="/tentang/visi-misi" />

      <section className="hero-grid border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Visi & Misi" />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <p className="eyebrow">Arah pendidikan</p>
              <h1 className="mt-5 text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[0.85] tracking-[-0.075em] text-ink-strong">Menyiapkan keterampilan. Membentuk karakter.</h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">{school.tagline} bukan sekadar slogan—ia menjadi pengingat bahwa kompetensi dan karakter perlu tumbuh bersama.</p>
            </div>
            <DocumentaryImage image={aboutImages.globalCareer} className="aspect-[4/3] rounded-[2rem]" sizes="(max-width: 1024px) 90vw, 48vw" preload />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="eyebrow">Empat arah</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Nilai yang diterjemahkan menjadi pengalaman.</h2>
              <p className="mt-6 rounded-2xl border border-ink/10 bg-accent-soft/60 p-4 text-sm leading-6 text-ink-muted">Redaksi visi dan misi resmi terbaru belum tampil secara konsisten pada kanal publik sekolah. Bagian ini merangkum arah yang dapat diverifikasi dari slogan serta kegiatan sekolah, bukan menggantikan dokumen resmi.</p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {directionThemes.map((theme, index) => (
                <li key={theme.code} className={`min-h-72 rounded-[1.75rem] border border-ink/10 p-6 shadow-sm sm:p-7 ${index === 0 || index === 3 ? "bg-secondary" : "bg-[#eef7fd]"}`}>
                  <span className="text-xs font-black text-ink-muted">0{index + 1}</span>
                  <p className="mt-14 text-xs font-black tracking-[0.15em] text-primary">{theme.code}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong">{theme.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-ink-muted">{theme.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Dari arah menjadi tindakan</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl">Terlihat dalam keseharian sekolah.</h2>
          </div>
          <div className="border-t border-white/15">
            <EvidenceLink number="01" title="Pengalaman industri" description="Murid melihat penerapan kompetensi dan budaya kerja secara langsung." href={aboutSource.industryVisit} />
            <EvidenceLink number="02" title="Rencana studi lanjut" description="Campus Expo membantu murid mengenali program studi, jalur masuk, dan peluang beasiswa." href={aboutSource.campusExpo} />
            <EvidenceLink number="03" title="Wawasan karier global" description="Kegiatan sekolah membuka wawasan mengenai peluang, kesiapan, bahasa, dan etos kerja." href={aboutSource.globalCareer} />
            <EvidenceLink number="04" title="Kepedulian sosial" description="Kegiatan sosial menjadi ruang belajar tanggung jawab, kerja sama, dan empati." href={aboutSource.character} />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-xl font-black leading-tight tracking-[-0.03em] text-ink-strong">Kenali program keahlian yang menjadi ruang bertumbuhnya kompetensi tersebut.</p>
          <Link href="/jurusan" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Program keahlian <ArrowRightIcon className="size-4" /></Link>
        </div>
      </section>
    </main>
  );
}

function EvidenceLink({ number, title, description, href }: { number: string; title: string; description: string; href: string }) {
  return (
    <a href={href} rel="noreferrer" className="group grid grid-cols-[auto_1fr_auto] gap-4 border-b border-white/15 py-6 sm:gap-7 sm:py-7">
      <span className="pt-1 text-xs font-black text-secondary">{number}</span>
      <span>
        <span className="block text-xl font-black tracking-[-0.03em]">{title}</span>
        <span className="mt-2 block text-sm leading-6 text-white/60">{description}</span>
      </span>
      <ArrowUpRightIcon className="mt-1 size-5 text-white/45 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-strong" />
    </a>
  );
}
