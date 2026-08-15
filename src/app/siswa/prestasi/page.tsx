import type { Metadata } from "next";
import { AchievementGallery } from "@/components/students/achievement-gallery";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { StudentNavigation } from "@/components/students/student-navigation";

export const metadata: Metadata = {
  title: "Prestasi Siswa",
  description: "Galeri prestasi akademik dan nonakademik siswa SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/siswa/prestasi" },
  openGraph: {
    title: "Prestasi Siswa SMK Negeri 2 Surabaya",
    description: "Capaian siswa di bidang teknologi, desain, seni, dan olahraga.",
    url: "/siswa/prestasi",
  },
};

export default function StudentAchievementsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Siswa", path: "/siswa" }, { name: "Prestasi", path: "/siswa/prestasi" }]} />
      <StudentNavigation activeHref="/siswa/prestasi" />

      <section className="hero-grid border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb current="Prestasi" />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="eyebrow">Galeri prestasi</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">Proses yang naik <span className="block text-primary">ke podium.</span></h1>
            </div>
            <p className="max-w-xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">Catatan capaian siswa dari sumber publik sekolah, disusun agar mudah dijelajahi berdasarkan tingkat dan bidang.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <AchievementGallery />
          <p className="mt-10 border-t border-ink/10 pt-5 text-xs leading-5 text-ink-muted">Daftar ini merupakan kurasi awal dari publikasi sekolah dan belum mewakili seluruh prestasi siswa.</p>
        </div>
      </section>
    </main>
  );
}
