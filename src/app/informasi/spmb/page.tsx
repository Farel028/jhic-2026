import type { Metadata } from "next";
import Link from "next/link";
import { InformationBreadcrumb } from "@/components/information/information-breadcrumb";
import { InformationNavigation } from "@/components/information/information-navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { admissionPaths, admissionRequirements, admissionTimeline, faqItems, informationSources } from "@/data/information";
import { majorCatalog } from "@/data/majors";

export const metadata: Metadata = {
  title: "Informasi SPMB",
  description: "Arsip jadwal, jalur, persyaratan, dan tautan resmi SPMB Jawa Timur untuk calon siswa SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/informasi/spmb" },
  openGraph: {
    title: "SPMB SMK Negeri 2 Surabaya",
    description: "Ringkasan informasi penerimaan murid baru dan akses menuju portal resmi SPMB Jawa Timur.",
    url: "/informasi/spmb",
  },
};

const admissionFaq = faqItems.filter((item) => item.category === "spmb").slice(0, 4);

export default function AdmissionPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Informasi", path: "/informasi" }, { name: "SPMB", path: "/informasi/spmb" }]} />
      <InformationNavigation activeHref="/informasi/spmb" />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <InformationBreadcrumb current="SPMB" />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted shadow-sm">
                <span className="size-2 rounded-full bg-ink-muted" /> Pendaftaran 2026 selesai
              </div>
              <h1 className="mt-7 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">Siapkan langkah. <span className="block text-primary">Ikuti sumber resmi.</span></h1>
            </div>
            <div className="max-w-xl lg:pb-3">
              <p className="text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">Halaman ini adalah ringkasan arsip SPMB Jawa Timur 2026. Jadwal periode berikutnya hanya akan ditampilkan setelah diumumkan oleh penyelenggara resmi.</p>
              <a href={school.urls.admissions} rel="noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent-strong px-5 text-sm font-extrabold text-ink-strong transition-transform hover:-translate-y-0.5">Buka portal SPMB <ArrowUpRightIcon className="size-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="eyebrow">Arsip timeline 2026</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Dari persiapan hingga daftar ulang.</h2>
              <p className="mt-6 text-base font-medium leading-7 text-ink-muted">Klik setiap tahap untuk melihat ringkasannya. Tanggal mengikuti jadwal resmi SPMB Jawa Timur 2026.</p>
              <a href={informationSources.admissionSchedule} rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Lihat jadwal lengkap <ArrowUpRightIcon className="size-4" /></a>
            </div>
            <div className="border-t border-ink/15">
              {admissionTimeline.map((step, index) => (
                <details key={step.title} open={index === 0} className="group border-b border-ink/15">
                  <summary className="grid min-h-24 cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 py-5 marker:content-none sm:gap-7">
                    <span className="text-xs font-black text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">{step.period}</span>
                      <span className="mt-2 block text-xl font-black tracking-[-0.035em] text-ink-strong">{step.title}</span>
                    </span>
                    <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-secondary/30 text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pb-7 pl-10 text-sm font-medium leading-6 text-ink-muted sm:pl-14">{step.description}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Jalur penerimaan 2026</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-[0.92] tracking-[-0.06em]">Lima jalur, ketentuan berbeda.</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-white/65 lg:justify-self-end">Ringkasan ini bukan pengganti juknis. Periksa kuota, dokumen, wilayah, dan pemeringkatan langsung pada portal resmi.</p>
          </div>
          <ol className="mt-12 grid border-t border-white/15 md:grid-cols-2 lg:grid-cols-5">
            {admissionPaths.map((path) => (
              <li key={path.code} className="border-b border-white/15 py-7 md:px-5 md:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <span className="text-xs font-black text-accent-strong">{path.code}</span>
                <h3 className="mt-8 text-xl font-black tracking-[-0.03em]">{path.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/60">{path.description}</p>
              </li>
            ))}
          </ol>
          <a href={informationSources.admissionTerms} rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-5 text-sm font-extrabold hover:border-accent-strong hover:bg-accent-strong hover:text-ink-strong">Baca ketentuan resmi <ArrowUpRightIcon className="size-4" /></a>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Persyaratan umum 2026</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Siapkan dokumen lebih awal.</h2>
            <ul className="mt-8 border-t border-ink/15">
              {admissionRequirements.map((requirement, index) => (
                <li key={requirement} className="grid grid-cols-[auto_1fr] gap-4 border-b border-ink/15 py-5">
                  <span className="text-xs font-black text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold leading-6 text-ink-muted">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Program keahlian</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Kenali pilihan sebelum mendaftar.</h2>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {majorCatalog.map((major) => (
                <div key={major.code} className="rounded-2xl border border-ink/10 bg-[#eef7fd] p-4">
                  <p className="text-xs font-black text-primary">{major.code}</p>
                  <p className="mt-2 text-sm font-extrabold leading-snug text-ink-strong">{major.name}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-ink-muted">Ketersediaan dan nomenklatur konsentrasi pada penerimaan berikutnya harus dikonfirmasi melalui portal SPMB resmi.</p>
            <Link href="/jurusan" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Jelajahi program keahlian <ArrowRightIcon className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="eyebrow">FAQ SPMB</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Hal penting sebelum membuka portal.</h2>
            </div>
            <div className="divide-y divide-ink/10 border-y border-ink/10 bg-white">
              {admissionFaq.map((item) => (
                <details key={item.question} className="group px-5 sm:px-7">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-black tracking-[-0.025em] text-ink-strong marker:content-none">
                    {item.question}<span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary/30 text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-7 pr-10 text-sm font-medium leading-6 text-ink-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent-strong px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-site flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-ink-muted">Sumber utama</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] text-ink-strong sm:text-5xl">Pastikan informasi terbaru di portal resmi.</h2>
          </div>
          <a href={school.urls.admissions} rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white">Buka SPMB Jawa Timur <ArrowUpRightIcon className="size-4" /></a>
        </div>
      </section>
    </main>
  );
}
