import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutBreadcrumb } from "@/components/about/about-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { facilityImages } from "@/data/about";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Fasilitas Sekolah",
  description:
    "Gambaran ringkas fasilitas belajar SMK Negeri 2 Surabaya, termasuk ruang praktik, bengkel, dan Teaching Factory.",
  alternates: { canonical: "/tentang/fasilitas" },
  openGraph: {
    title: "Fasilitas SMK Negeri 2 Surabaya",
    description:
      "Ruang belajar dan praktik yang mendukung pendidikan vokasi di SMK Negeri 2 Surabaya.",
    url: "/tentang/fasilitas",
  },
});

const facilityGallery = [
  facilityImages.automotiveWorkshop,
  facilityImages.electricityLab,
  facilityImages.teachingFactory,
] as const;

const facilityGroups = [
  {
    title: "Ruang belajar",
    description:
      "Ruang untuk pembelajaran umum, diskusi, dan kegiatan kelas sehari-hari.",
  },
  {
    title: "Laboratorium & ruang praktik",
    description:
      "Tempat murid melatih keterampilan teknis dengan perangkat sesuai bidang keahlian.",
  },
  {
    title: "Bengkel & Teaching Factory",
    description:
      "Lingkungan praktik yang mendekatkan proses belajar dengan standar kerja dan layanan nyata.",
  },
  {
    title: "Ruang bersama",
    description:
      "Perpustakaan, aula, dan area kegiatan yang mendukung literasi serta kebersamaan warga sekolah.",
  },
] as const;

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

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <AboutBreadcrumb current="Fasilitas" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Fasilitas Sekolah
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Ruang belajar, laboratorium, dan bengkel menjadi tempat murid
              mengubah pengetahuan menjadi keterampilan.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Lingkungan belajar</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Ruang yang mendukung proses.
            </h2>
            <p className="mt-5 max-w-md text-sm font-medium leading-6 text-ink-muted">
              Fasilitas digunakan sebagai bagian dari pembelajaran, latihan, dan
              kegiatan warga sekolah.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {facilityGallery.map((image, index) => (
              <figure
                key={image.src}
                className={index === 0 ? "sm:col-span-2" : undefined}
              >
                <div
                  className={`relative overflow-hidden bg-secondary/20 ${
                    index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 90vw, 58vw"
                        : "(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 28vw"
                    }
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs font-medium leading-5 text-ink-muted">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Fungsi ruang</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Belajar membutuhkan ruang yang berbeda.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {facilityGroups.map((facility) => (
              <li
                key={facility.title}
                className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.38fr_0.62fr] sm:gap-8 sm:py-6"
              >
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {facility.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {facility.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base font-extrabold leading-7 tracking-[-0.015em] text-ink-strong sm:text-lg">
            Lihat lingkungan sekolah secara langsung melalui SMEKDA Tour.
          </p>
          <Link
            href="/virtual-tour"
            className="inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
          >
            Mulai virtual tour <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
