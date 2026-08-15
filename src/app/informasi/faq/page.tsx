import type { Metadata } from "next";
import { FaqSearch } from "@/components/information/faq-search";
import { InformationBreadcrumb } from "@/components/information/information-breadcrumb";
import { InformationNavigation } from "@/components/information/information-navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { faqItems } from "@/data/information";

export const metadata: Metadata = {
  title: "Pertanyaan Umum",
  description: "Cari jawaban mengenai sekolah, jurusan, fasilitas, SPMB, pembayaran, dan kegiatan siswa SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/informasi/faq" },
  openGraph: {
    title: "FAQ SMK Negeri 2 Surabaya",
    description: "Jawaban terstruktur untuk pertanyaan umum tentang SMK Negeri 2 Surabaya.",
    url: "/informasi/faq",
  },
};

export default function FaqPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Informasi", path: "/informasi" }, { name: "FAQ", path: "/informasi/faq" }]} />
      <FaqJsonLd items={faqItems} />
      <InformationNavigation activeHref="/informasi/faq" />

      <section className="hero-grid border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <InformationBreadcrumb current="FAQ" />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="eyebrow">Pertanyaan umum</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">Cari dulu. <span className="block text-primary">Temukan jawabannya.</span></h1>
            </div>
            <p className="max-w-xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">Basis jawaban awal untuk warga sekolah dan calon siswa. Informasi administratif yang sensitif tetap perlu dikonfirmasi melalui kanal resmi.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <FaqSearch />
        </div>
      </section>
    </main>
  );
}
