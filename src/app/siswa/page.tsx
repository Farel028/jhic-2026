import type { Metadata } from "next";
import { withPageTwitter } from "@/lib/metadata";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { StudentMedia } from "@/components/students/student-media";
import { StudentNavigation } from "@/components/students/student-navigation";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { studentActivities, studentWorks } from "@/data/students";

export const metadata: Metadata = withPageTwitter({
  title: "Siswa",
  description: "Karya, prestasi, dan kehidupan siswa SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa" },
  openGraph: {
    title: "Siswa SMK Negeri 2 Surabaya",
    description: "Lihat karya, prestasi, dan pengalaman siswa di dalam serta di luar ruang kelas.",
    url: "/siswa",
  },
});

const studentAreas = [
  { number: "01", title: "Karya", description: "Proyek dan hasil belajar dari beragam bidang keahlian.", href: "/siswa/karya", tone: "bg-secondary" },
  { number: "02", title: "Prestasi", description: "Capaian akademik dan nonakademik dari kota hingga nasional.", href: "/siswa/prestasi", tone: "bg-accent-soft" },
  { number: "03", title: "Kehidupan siswa", description: "Pengalaman belajar, organisasi, karier, dan kegiatan sosial.", href: "#kehidupan-siswa", tone: "bg-[#dceefb]" },
  { number: "04", title: "Ekstrakurikuler", description: "Direktori kegiatan minat dan bakat akan dilengkapi pada fase konten berikutnya.", tone: "bg-white" },
] as const;

export default function StudentsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Siswa", path: "/siswa" }]} />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="eyebrow">Ruang siswa</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">
                Belajar. Mencoba. <span className="block text-primary-strong">Menjadi.</span>
              </h1>
            </div>
            <div className="relative lg:pb-4">
              <span aria-hidden="true" className="absolute -left-8 -top-20 text-[11rem] font-black leading-none text-secondary/40">02</span>
              <p className="relative max-w-xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
                Kehidupan sekolah dibentuk oleh proyek, kompetisi, pertemanan, kegiatan, dan keberanian untuk terus mencoba hal baru.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StudentNavigation activeHref="/siswa" />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studentAreas.map((area) => {
              const body = (
                <>
                  <span className="text-xs font-black text-ink-muted">{area.number}</span>
                  <span className="mt-16 block">
                    <span className="block text-2xl font-black tracking-[-0.04em] text-ink-strong">{area.title}</span>
                    <span className="mt-3 block text-sm font-medium leading-6 text-ink-muted">{area.description}</span>
                    {"href" in area ? <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong">Jelajahi <ArrowRightIcon className="size-4" /></span> : <span className="mt-6 block text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">Segera dilengkapi</span>}
                  </span>
                </>
              );
              const className = `flex min-h-72 flex-col justify-between rounded-[1.75rem] border border-ink/10 p-6 shadow-sm sm:p-7 ${area.tone}`;
              return "href" in area ? <Link key={area.title} href={area.href} className={`${className} transition-transform hover:-translate-y-1`}>{body}</Link> : <article key={area.title} className={className}>{body}</article>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <p className="eyebrow">Made at SMEKDA</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5.5vw,5.5rem)] font-black leading-[0.92] tracking-[-0.06em] text-ink-strong">Karya lahir dari rasa ingin tahu.</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted lg:justify-self-end">Showcase awal ini menggunakan proyek yang telah dipublikasikan sekolah. Dokumentasi visual akan terus dilengkapi tanpa gambar sintetis.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {studentWorks.map((work, index) => (
              <article key={work.title} className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-sm">
                <StudentMedia image={work.image} label={work.title} index={index} />
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-primary-strong">{work.program} · {work.year}</p>
                  <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong">{work.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{work.creator}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/siswa/karya" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Lihat semua karya <ArrowRightIcon className="size-4" /></Link>
        </div>
      </section>

      <section id="kehidupan-siswa" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="eyebrow">Kehidupan siswa</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Pengalaman yang melampaui kelas.</h2>
              <p className="mt-6 text-base font-medium leading-7 text-ink-muted">Belajar juga terjadi saat siswa bertemu alumni, mengenal industri, dan mulai menyusun arah masa depannya.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {studentActivities.map((activity, index) => (
                <article key={activity.title} className={index === 0 ? "sm:col-span-2" : ""}>
                  <StudentMedia image={activity.image} label={activity.title} index={index} className={index === 0 ? "aspect-[16/8] rounded-[1.75rem]" : "aspect-[4/3] rounded-[1.75rem]"} />
                  <h3 className="mt-5 text-xl font-black tracking-[-0.035em] text-ink-strong">{activity.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{activity.description}</p>
                  <a href={activity.sourceUrl} rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Sumber kegiatan <ArrowUpRightIcon className="size-4" /></a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-accent-strong px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-site flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-ink-muted">Jejak pencapaian</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] text-ink-strong sm:text-5xl">Lihat cerita di balik setiap prestasi.</h2>
          </div>
          <Link href="/siswa/prestasi" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-ink-strong px-6 text-sm font-extrabold text-white">Buka galeri prestasi <ArrowRightIcon className="size-4" /></Link>
        </div>
      </section>
    </main>
  );
}
