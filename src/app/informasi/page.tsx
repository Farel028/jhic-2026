import type { Metadata } from "next";
import Link from "next/link";
import { InformationBreadcrumb } from "@/components/information/information-breadcrumb";
import { InformationNavigation } from "@/components/information/information-navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { school, schoolMapUrl } from "@/config/school";

export const metadata: Metadata = {
  title: "Pusat Informasi",
  description: "FAQ, informasi SPMB, kontak, dan kanal layanan resmi SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/informasi" },
  openGraph: {
    title: "Pusat Informasi SMK Negeri 2 Surabaya",
    description: "Temukan jawaban umum, informasi penerimaan murid baru, dan kanal layanan resmi sekolah.",
    url: "/informasi",
  },
};

const informationCards = [
  {
    number: "01",
    title: "Pertanyaan umum",
    description: "Cari jawaban tentang sekolah, jurusan, fasilitas, SPMB, pembayaran, dan kegiatan siswa.",
    href: "/informasi/faq",
    action: "Cari jawaban",
    tone: "bg-secondary",
  },
  {
    number: "02",
    title: "SPMB",
    description: "Lihat arsip jadwal 2026, jalur, persyaratan, program keahlian, dan portal pendaftaran resmi.",
    href: "/informasi/spmb",
    action: "Buka informasi SPMB",
    tone: "bg-accent-soft",
  },
  {
    number: "03",
    title: "Layanan alumni",
    description: "Informasi karier, lowongan, dan penelusuran lulusan tersedia melalui Bursa Kerja Khusus SMEKDA.",
    href: school.urls.bkk,
    action: "Buka BKK SMEKDA",
    external: true,
    tone: "bg-[#dceefb]",
  },
  {
    number: "04",
    title: "Testimoni",
    description: "Cerita siswa, alumni, orang tua, dan mitra akan diterbitkan setelah materi serta izin publikasinya tersedia.",
    tone: "bg-white",
  },
] as const;

export default function InformationPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Informasi", path: "/informasi" }]} />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <InformationBreadcrumb />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
            <div>
              <p className="eyebrow">Pusat informasi</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">
                Jawaban jelas. <span className="block text-primary">Kanal yang tepat.</span>
              </h1>
            </div>
            <div className="max-w-xl lg:pb-3">
              <p className="text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">Mulai dari pertanyaan umum hingga penerimaan murid baru, informasi disusun agar mudah ditemukan dan tetap terhubung ke sumber resmi.</p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted shadow-sm">
                <span className="size-2 rounded-full bg-primary" /> SPMB 2026 telah selesai
              </div>
            </div>
          </div>
        </div>
      </section>

      <InformationNavigation activeHref="/informasi" />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {informationCards.map((card) => {
              const content = (
                <>
                  <span className="text-xs font-black text-ink-muted">{card.number}</span>
                  <span className="mt-16 block">
                    <span className="block text-2xl font-black tracking-[-0.04em] text-ink-strong">{card.title}</span>
                    <span className="mt-3 block text-sm font-medium leading-6 text-ink-muted">{card.description}</span>
                    {"href" in card ? <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong">{card.action} {"external" in card ? <ArrowUpRightIcon className="size-4" /> : <ArrowRightIcon className="size-4" />}</span> : <span className="mt-6 block text-xs font-extrabold uppercase tracking-[0.12em] text-primary">Menunggu materi terverifikasi</span>}
                  </span>
                </>
              );
              const className = `flex min-h-72 flex-col justify-between rounded-[1.75rem] border border-ink/10 p-6 shadow-sm sm:p-7 ${card.tone}`;
              if (!("href" in card)) return <article key={card.title} className={className}>{content}</article>;
              return "external" in card && card.external ? <a key={card.title} href={card.href} rel="noreferrer" className={`${className} transition-transform hover:-translate-y-1`}>{content}</a> : <Link key={card.title} href={card.href} className={`${className} transition-transform hover:-translate-y-1`}>{content}</Link>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid w-full max-w-site gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow">Butuh bantuan langsung?</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Hubungi kanal resmi sekolah.</h2>
            <p className="mt-6 text-base font-medium leading-7 text-ink-muted">Untuk biaya, dokumen, atau keputusan administratif, gunakan kontak resmi agar informasi yang diterima dapat dikonfirmasi.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={`tel:${school.contact.phoneHref}`} className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <PhoneIcon className="size-6 text-primary" />
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">Telepon</p>
              <p className="mt-2 text-xl font-black text-ink-strong">{school.contact.phone}</p>
            </a>
            <a href={`mailto:${school.contact.email}`} className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <MailIcon className="size-6 text-primary" />
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">Email</p>
              <p className="mt-2 break-all text-xl font-black text-ink-strong">{school.contact.email}</p>
            </a>
            <a href={schoolMapUrl} rel="noreferrer" className="rounded-[1.5rem] border border-ink/10 bg-ink-strong p-6 text-white shadow-sm transition-transform hover:-translate-y-1 sm:col-span-2">
              <MapPinIcon className="size-6 text-accent-strong" />
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.14em] text-white/55">Kunjungi sekolah</p>
              <p className="mt-2 max-w-xl text-xl font-black">{school.address.street}, {school.address.city}</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
