import type { Metadata } from "next";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { AboutNavigation } from "@/components/about/about-navigation";
import { DocumentaryImage } from "@/components/about/documentary-image";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import {
  aboutImages,
  curriculumJourney,
  curriculumSources,
  learningModes,
} from "@/data/about";

export const metadata: Metadata = {
  title: "Kurikulum dan Pengalaman Belajar",
  description:
    "Gambaran pengalaman belajar vokasi SMK Negeri 2 Surabaya dari fondasi, pengembangan keterampilan, proyek, PKL, uji kompetensi, hingga langkah setelah lulus.",
  alternates: { canonical: "/tentang/kurikulum" },
  openGraph: {
    title: "Kurikulum dan Pengalaman Belajar SMK Negeri 2 Surabaya",
    description:
      "Melihat bagaimana pembelajaran bergerak dari pengetahuan dasar menuju praktik dan pilihan masa depan.",
    url: "/tentang/kurikulum",
  },
};

const evidenceCards = [
  {
    number: "01",
    label: "Pengembangan pembelajaran",
    title: "Kurikulum Merdeka dan Teaching Factory",
    description:
      "Workshop sekolah membahas capaian pembelajaran, perencanaan berbasis data, Teaching Factory, kurikulum operasional sekolah, dan modul ajar.",
    href: curriculumSources.merdekaWorkshop,
  },
  {
    number: "02",
    label: "Relevansi industri",
    title: "Sinkronisasi bersama DUDI",
    description:
      "Sekolah mendokumentasikan penyelarasan kurikulum bersama dunia usaha dan industri agar pembelajaran mengikuti perkembangan kebutuhan kerja.",
    href: curriculumSources.industryAlignment,
  },
  {
    number: "03",
    label: "Pengalaman profesional",
    title: "Persiapan PKL yang bertanggung jawab",
    description:
      "Pembekalan PKL mencakup pemahaman hak, kewajiban, perlindungan, serta keselamatan peserta selama berada di institusi mitra.",
    href: curriculumSources.internshipPreparation,
  },
] as const;

export default function CurriculumPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Tentang Sekolah", path: "/tentang" },
          { name: "Kurikulum", path: "/tentang/kurikulum" },
        ]}
      />
      <AboutNavigation activeHref="/tentang/kurikulum" />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Kurikulum" />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
            <div>
              <p className="eyebrow">Kurikulum & pengalaman belajar</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,7.5vw,7.7rem)] font-black leading-[0.85] tracking-[-0.075em] text-ink-strong">
                Belajar. Mencoba. <span className="text-primary">Menjadi mampu.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
                Pembelajaran vokasi bergerak dari memahami dasar menuju menerapkan keterampilan dalam proyek, lingkungan kerja, dan pilihan nyata setelah lulus.
              </p>
            </div>
            <div className="relative pb-6 pr-3 sm:pr-7">
              <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-8 rotate-3 rounded-[2rem] bg-primary" />
              <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-3 shadow-card">
                <DocumentaryImage
                  image={aboutImages.industryVisit}
                  className="aspect-[4/3] rounded-[1.35rem]"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  preload
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="eyebrow">Cara membaca halaman ini</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Peta pengalaman, bukan jadwal pelajaran.</h2>
          </div>
          <div className="max-w-3xl lg:pt-8">
            <p className="text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
              Kanal publik sekolah menunjukkan implementasi Kurikulum Merdeka, Teaching Factory, sinkronisasi industri, proyek, PKL, dan uji kompetensi. Namun, dokumen struktur per kelas dan alokasi jam belum tersedia untuk ditampilkan di website ini.
            </p>
            <p className="mt-6 rounded-2xl border border-ink/10 bg-accent-soft/65 p-4 text-sm leading-6 text-ink-muted">
              Enam tahap di bawah adalah visualisasi editorial agar alur mudah dipahami. Urutan aktual dapat berbeda menurut program keahlian dan tahun ajaran.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Perjalanan belajar</p>
              <h2 className="mt-5 max-w-5xl text-[clamp(2.8rem,5.5vw,5.8rem)] font-black leading-[0.91] tracking-[-0.065em]">Enam tahap menuju masa depan.</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-white/60 lg:justify-self-end">Setiap tahap saling terhubung: pengetahuan memberi arah, praktik membangun kemampuan, dan refleksi membantu menentukan langkah berikutnya.</p>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {curriculumJourney.map((stage) => (
              <li key={stage.number} className={`group flex min-h-[23rem] flex-col rounded-[1.75rem] border p-6 sm:p-7 ${stageTone(stage.tone)}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-black">{stage.number}</span>
                  <span className="text-right text-[0.65rem] font-black uppercase tracking-[0.16em] opacity-65">{stage.label}</span>
                </div>
                <div className="mt-auto pt-16">
                  <h3 className="text-3xl font-black leading-none tracking-[-0.045em]">{stage.title}</h3>
                  <p className="mt-5 text-sm font-medium leading-6 opacity-70">{stage.description}</p>
                  <a href={stage.href} rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold underline decoration-current decoration-2 underline-offset-8">
                    {stage.evidence} <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="eyebrow">Siklus belajar</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Tidak berhenti saat tugas selesai.</h2>
              <p className="mt-6 text-base font-medium leading-7 text-ink-muted">Kemampuan berkembang ketika murid memahami alasan, berlatih, menghasilkan sesuatu, lalu membaca kembali hasil dan prosesnya.</p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {learningModes.map((mode) => (
                <li key={mode.number} className="flex min-h-56 flex-col justify-between rounded-3xl border border-ink/10 bg-[#eef7fd] p-6 shadow-sm">
                  <span className="text-xs font-black text-primary">{mode.number}</span>
                  <span className="mt-12">
                    <span className="block text-2xl font-black tracking-[-0.04em] text-ink-strong">{mode.title}</span>
                    <span className="mt-3 block text-sm font-medium leading-6 text-ink-muted">{mode.description}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow">Jejak terverifikasi</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Apa yang sudah terdokumentasi.</h2>
            </div>
            <div className="border-t border-ink/15">
              {evidenceCards.map((item) => (
                <a key={item.number} href={item.href} rel="noreferrer" className="group grid grid-cols-[auto_1fr_auto] gap-4 border-b border-ink/15 py-6 sm:gap-7 sm:py-8">
                  <span className="pt-1 text-xs font-black text-primary">{item.number}</span>
                  <span>
                    <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">{item.label}</span>
                    <span className="mt-3 block text-xl font-black leading-snug tracking-[-0.03em] text-ink-strong sm:text-2xl">{item.title}</span>
                    <span className="mt-3 block max-w-2xl text-sm leading-6 text-ink-muted">{item.description}</span>
                  </span>
                  <ArrowUpRightIcon className="mt-1 size-5 text-ink-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-site gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-accent-soft p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-muted">Dokumen kurikulum</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.045em] text-ink-strong sm:text-5xl">Rincian resmi akan ditempatkan di sini.</h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-ink-muted">Komponen unduhan sudah disiapkan, tetapi belum menampilkan tombol atau file palsu. Dokumen akan ditambahkan setelah versi publik per tahun ajaran diberikan sekolah.</p>
            <div className="mt-8 flex min-h-24 items-center rounded-2xl border-2 border-dashed border-ink/20 bg-white/45 px-5 text-sm font-extrabold text-ink-muted">Belum ada dokumen publik terverifikasi.</div>
          </div>
          <div className="flex flex-col justify-between rounded-[2rem] bg-primary p-7 sm:p-10 lg:p-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-strong/65">Konteks tiap bidang</p>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.045em] text-ink-strong sm:text-4xl">Cara belajar berbeda menurut keahlian.</h2>
              <p className="mt-5 text-sm font-medium leading-6 text-ink">Buka profil jurusan untuk melihat fokus belajar, kegiatan, dan kemungkinan langkah lanjut yang lebih spesifik.</p>
            </div>
            <Link href="/jurusan" className="mt-12 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Jelajahi jurusan <ArrowRightIcon className="size-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function stageTone(tone: (typeof curriculumJourney)[number]["tone"]) {
  const tones = {
    blue: "border-white/15 bg-primary text-ink-strong",
    light: "border-white/15 bg-[#eef7fd] text-ink-strong",
    yellow: "border-white/15 bg-accent-soft text-ink-strong",
    dark: "border-white/20 bg-white/[0.06] text-white",
  } as const;

  return tones[tone];
}
