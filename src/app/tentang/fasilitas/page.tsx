import type { Metadata } from "next";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { AboutNavigation } from "@/components/about/about-navigation";
import { DocumentaryImage } from "@/components/about/documentary-image";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { school, schoolMapUrl } from "@/config/school";
import {
  campusOrientation,
  facilityImages,
  verifiedFacilities,
} from "@/data/about";

export const metadata: Metadata = {
  title: "Fasilitas dan Jelajah Kampus",
  description:
    "Jelajahi fasilitas pembelajaran SMK Negeri 2 Surabaya yang telah terdokumentasi, termasuk ruang praktik, bengkel otomotif, dan Teaching Factory.",
  alternates: { canonical: "/tentang/fasilitas" },
  openGraph: {
    title: "Fasilitas SMK Negeri 2 Surabaya",
    description:
      "Melihat ruang praktik dan fasilitas sekolah melalui dokumentasi nyata dari kegiatan pembelajaran.",
    url: "/tentang/fasilitas",
  },
};

export default function FacilitiesPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Tentang Sekolah", path: "/tentang" },
          { name: "Fasilitas", path: "/tentang/fasilitas" },
        ]}
      />
      <AboutNavigation activeHref="/tentang/fasilitas" />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Fasilitas" />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <p className="eyebrow">Fasilitas & jelajah kampus</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,7.5vw,7.7rem)] font-black leading-[0.85] tracking-[-0.075em] text-ink-strong">
                Ruang untuk <span className="text-primary">mencoba.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
                Dari ruang praktik hingga Teaching Factory, fasilitas menjadi tempat pengetahuan berubah menjadi keterampilan.
              </p>
              <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-5">
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">Luas lingkungan</dt>
                  <dd className="mt-2 text-2xl font-black tracking-[-0.04em] text-ink-strong">{school.landArea}</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">Lokasi</dt>
                  <dd className="mt-2 text-2xl font-black tracking-[-0.04em] text-ink-strong">Surabaya</dd>
                </div>
              </dl>
            </div>
            <div className="relative pb-6 pl-3 sm:pl-7">
              <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-8 -rotate-3 rounded-[2rem] bg-accent-soft" />
              <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-3 shadow-card">
                <DocumentaryImage
                  image={facilityImages.automotiveWorkshop}
                  className="aspect-[4/3] rounded-[1.35rem]"
                  sizes="(max-width: 1024px) 90vw, 48vw"
                  preload
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="eyebrow">Catatan data</p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Hanya yang dapat dibuktikan.</h2>
          </div>
          <div className="max-w-3xl lg:pt-8">
            <p className="text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">
              Halaman ini menyusun fasilitas dari foto dan kegiatan yang diterbitkan sekolah. Jumlah ruang, kapasitas, jadwal penggunaan, serta lokasi detail tidak ditampilkan sebelum denah dan inventaris resmi tersedia.
            </p>
            <p className="mt-6 rounded-2xl border border-ink/10 bg-[#eef7fd] p-4 text-sm leading-6 text-ink-muted">
              Foto merupakan dokumentasi kegiatan nyata dari website sekolah. Tidak ada gambar fasilitas hasil generatif.
            </p>
          </div>
        </div>
      </section>

      <section id="galeri-praktik" className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Galeri praktik</p>
              <h2 className="mt-5 max-w-5xl text-[clamp(2.8rem,5.5vw,5.8rem)] font-black leading-[0.91] tracking-[-0.065em]">Ruang yang bekerja bersama murid.</h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-white/60 lg:justify-self-end">Setiap gambar ditautkan kembali ke artikel sekolah agar konteks dan sumbernya dapat diperiksa.</p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <DocumentaryImage
              image={facilityImages.automotiveWorkshop}
              className="aspect-[16/11] rounded-[2rem]"
              sizes="(max-width: 1024px) 90vw, 54vw"
              inverse
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <DocumentaryImage
                image={facilityImages.electricityLab}
                className="aspect-[16/9] rounded-[2rem]"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 36vw"
                inverse
              />
              <DocumentaryImage
                image={facilityImages.teachingFactory}
                className="aspect-[16/9] rounded-[2rem]"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 36vw"
                inverse
              />
            </div>
          </div>
        </div>
      </section>

      <section id="katalog-fasilitas" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div>
              <p className="eyebrow">Katalog terverifikasi</p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Tempat belajar mengambil bentuk.</h2>
              <p className="mt-6 text-sm leading-6 text-ink-muted">Entri tanpa foto tetap ditampilkan apabila keberadaannya disebut langsung oleh sumber sekolah.</p>
            </div>
            <ol className="border-t border-ink/15">
              {verifiedFacilities.map((facility, index) => (
                <li key={facility.code} className="border-b border-ink/15 py-7 sm:py-8">
                  <a href={facility.href} rel="noreferrer" className="group grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-7">
                    <span className="pt-1 text-xs font-black text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-muted">{facility.category} · {facility.code}</span>
                      <span className="mt-3 block text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong sm:text-3xl">{facility.title}</span>
                      <span className="mt-4 block max-w-3xl text-sm font-medium leading-6 text-ink-muted">{facility.description}</span>
                      <span className="mt-4 block text-xs font-extrabold text-primary">{facility.status}</span>
                    </span>
                    <ArrowUpRightIcon className="mt-1 size-5 text-ink-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <div>
              <p className="eyebrow">Orientasi kampus</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5vw,5.4rem)] font-black leading-[0.92] tracking-[-0.06em] text-ink-strong">Kenali fungsi ruang sebelum berkunjung.</h2>
            </div>
            <p id="orientation-note" className="max-w-xl text-sm leading-6 text-ink-muted lg:justify-self-end">Visual ini adalah navigasi berdasarkan fungsi, bukan denah posisi bangunan. Denah resmi akan menggantikannya setelah data tersedia.</p>
          </div>

          <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
            <div aria-describedby="orientation-note" className="campus-map relative min-h-[32rem] overflow-hidden bg-primary p-6 sm:p-9">
              <div aria-hidden="true" className="absolute inset-6 rounded-[1.5rem] border-2 border-dashed border-ink-strong/20" />
              <div className="relative grid h-full min-h-[27rem] grid-cols-2 grid-rows-2 gap-4">
                {campusOrientation.map((zone, index) => (
                  <a key={zone.number} href={zone.target} className={`group flex flex-col justify-between rounded-[1.5rem] border-2 border-ink-strong/20 p-5 transition-transform hover:-translate-y-1 ${index === 1 || index === 2 ? "bg-accent-soft" : "bg-white/75"}`}>
                    <span className="text-xs font-black text-ink-muted">{zone.number}</span>
                    <span className="mt-12 text-lg font-black leading-tight tracking-[-0.03em] text-ink-strong sm:text-xl">{zone.title}</span>
                  </a>
                ))}
              </div>
            </div>
            <ol className="border-t border-ink/10 p-6 sm:p-9 lg:border-l lg:border-t-0">
              {campusOrientation.map((zone) => (
                <li key={zone.number} className="border-b border-ink/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
                  <p className="text-xs font-black text-primary">{zone.number}</p>
                  <h3 className="mt-2 text-lg font-black tracking-[-0.025em] text-ink-strong">{zone.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{zone.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="kunjungan" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-site overflow-hidden rounded-[2rem] bg-accent-soft lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-muted">Kunjungi sekolah</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.045em] text-ink-strong sm:text-5xl">Datang dengan tujuan yang jelas.</h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-ink-muted">Hubungi sekolah terlebih dahulu untuk memastikan prosedur kunjungan, akses tamu, serta ketersediaan area yang ingin dilihat.</p>
            <a href={schoolMapUrl} rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Buka Google Maps <ArrowUpRightIcon className="size-4" /></a>
          </div>
          <div className="border-t border-ink/15 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <address className="not-italic">
              <p className="flex items-start gap-3 text-sm font-bold leading-6 text-ink-strong"><MapPinIcon className="mt-0.5 size-5 shrink-0 text-primary" />{school.address.street}, {school.address.district}, {school.address.city}</p>
              <a href={`tel:${school.contact.phoneHref}`} className="mt-5 flex items-center gap-3 text-sm font-bold text-ink-strong"><PhoneIcon className="size-5 text-primary" />{school.contact.phone}</a>
              <a href={`mailto:${school.contact.email}`} className="mt-5 flex items-center gap-3 break-all text-sm font-bold text-ink-strong"><MailIcon className="size-5 shrink-0 text-primary" />{school.contact.email}</a>
            </address>
            <Link href="/tentang/profil" className="mt-10 inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8">Lihat profil sekolah <ArrowRightIcon className="size-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
