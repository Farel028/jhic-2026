import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { StudentMedia } from "@/components/students/student-media";
import { StudentNavigation } from "@/components/students/student-navigation";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { studentWorks } from "@/data/students";

export const metadata: Metadata = {
  title: "Karya Siswa",
  description: "Showcase karya siswa dari berbagai program keahlian SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa/karya" },
  openGraph: {
    title: "Made at SMEKDA · Karya Siswa",
    description: "Proyek nyata, proses belajar, dan karya siswa SMK Negeri 2 Surabaya.",
    url: "/siswa/karya",
  },
};

export default function StudentWorksPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Siswa", path: "/siswa" }, { name: "Karya Siswa", path: "/siswa/karya" }]} />
      <StudentNavigation activeHref="/siswa/karya" />

      <section className="hero-grid border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb current="Karya siswa" />
          <p className="eyebrow mt-12">Made at {school.identity}</p>
          <h1 className="mt-5 max-w-6xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">
            Ide diuji. <span className="block text-primary">Karya diwujudkan.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">Showcase awal karya yang sudah memiliki sumber publik. Portofolio akan berkembang seiring dokumentasi dari setiap program keahlian tersedia.</p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site space-y-20 lg:space-y-28">
          {studentWorks.map((work, index) => (
            <article key={work.title} className="grid items-center gap-9 lg:grid-cols-2 lg:gap-20">
              <div className={index % 2 ? "lg:order-2" : ""}>
                <StudentMedia image={work.image} label={work.title} index={index} className="aspect-[16/11] rounded-[2rem] shadow-soft" />
              </div>
              <div className={index % 2 ? "lg:order-1" : ""}>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-primary">{String(index + 1).padStart(2, "0")} · {work.program}</p>
                <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">{work.title}</h2>
                <p className="mt-5 text-sm font-extrabold text-ink-muted">{work.creator} · {work.year}</p>
                <p className="mt-6 max-w-xl text-base font-medium leading-7 text-ink-muted">{work.description}</p>
                <ul aria-label="Teknologi dan bidang" className="mt-6 flex flex-wrap gap-2">
                  {work.technologies.map((technology) => <li key={technology} className="rounded-full bg-secondary/25 px-3 py-2 text-xs font-extrabold text-ink-strong">{technology}</li>)}
                </ul>
                <a href={work.sourceUrl} rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Lihat publikasi sumber <ArrowUpRightIcon className="size-4" /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink-strong px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-site gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="max-w-3xl text-3xl font-black tracking-[-0.05em] sm:text-5xl">Portofolio ini tumbuh bersama dokumentasi siswa.</h2>
          <p className="max-w-xl text-sm font-medium leading-7 text-white/65 lg:justify-self-end">Nama pencipta, teknologi, galeri, demo, dan repositori hanya akan ditampilkan jika sumbernya tersedia dan layak dipublikasikan.</p>
        </div>
      </section>
    </main>
  );
}
