import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/layout/brand-mark";
import {
  ArrowUpRightIcon,
  GlobeIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import { school, schoolMapUrl } from "@/config/school";

const jhicPartners = [
  {
    src: "/images/partners/jhic-2.0.png",
    alt: "Jagoan Hosting Innovation Competition 2026",
    className: "h-8 sm:h-9 md:h-10 w-auto object-contain",
  },
  {
    src: "/images/partners/jagoanhosting-white.png",
    alt: "Jagoan Hosting",
    className: "h-5 sm:h-6 md:h-7 w-auto object-contain",
  },
  {
    src: "/images/partners/garudaspark-white.png",
    alt: "Garuda Spark Innovation Hub",
    className: "h-7 sm:h-8 md:h-9 w-auto object-contain",
  },
  {
    src: "/images/partners/komdigi-white.png",
    alt: "Kementerian Komunikasi dan Digital",
    className: "h-7 sm:h-8 md:h-9 w-auto object-contain",
  },
  {
    src: "/images/partners/ngalup-white.png",
    alt: "Ngalup.co",
    className: "h-5 sm:h-5.5 md:h-6 w-auto object-contain",
  },
] as const;

const navigationLinks = {
  jelajahi: [
    { label: "Beranda", href: "/" },
    { label: "Profil Sekolah", href: "/tentang/profil" },
    { label: "Kompetensi Keahlian (Jurusan)", href: "/#jurusan" },
    { label: "Ekstrakurikuler", href: "/siswa/ekstrakurikuler" },
    { label: "Karya Siswa", href: "/siswa/karya" },
    { label: "Prestasi Siswa", href: "/siswa/prestasi" },
    { label: "Alumni", href: "/siswa/alumni" },
    { label: "Berita & Agenda", href: "/berita" },
  ],
  layanan: [
    { label: "Pendaftaran SPMB", href: "/informasi/spmb", highlighted: true },
    { label: "Virtual Tour 360°", href: "/virtual-tour" },
    { label: "SIAKAD", href: school.urls.siakad, external: true },
    { label: "E-Learning", href: school.urls.elearning, external: true },
    { label: "BKK SMEKDA", href: school.urls.bkk, external: true },
    { label: "e-PKL", href: school.urls.pkl, external: true },
    { label: "e-Presensi", href: school.urls.presensi, external: true },
    { label: "e-Library", href: school.urls.library, external: true },
    { label: "CBT SMEKDA", href: school.urls.cbt, external: true },
  ],
} as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-site-chrome className="bg-ink-strong text-white">
      <div className="mx-auto w-full max-w-site px-5 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        {/* 4 Kolom Utama: Responsif rapi di HP, Tablet, & Desktop */}
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr] lg:gap-10 xl:gap-14 lg:pb-14">
          
          {/* Kolom 1: Identitas & Kontak */}
          <div className="space-y-6 sm:col-span-2 sm:space-y-7 lg:col-span-1">
            <BrandMark inverse />
            
            <p className="max-w-md text-lg font-medium leading-relaxed text-white/90 sm:text-xl lg:text-2xl">
              Ruang digital untuk melihat apa yang dipelajari, dibuat, dan dicapai warga sekolah.
            </p>

            {/* Kontak Vertikal */}
            <div className="space-y-3.5 text-sm text-white/80 sm:space-y-4 sm:text-base">
              <a
                href={schoolMapUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-white sm:gap-3.5"
              >
                <MapPinIcon className="mt-1 size-5 shrink-0 text-accent-strong" />
                <span className="leading-snug">
                  {school.address.street}, {school.address.district}, {school.address.city} {school.address.postalCode}
                </span>
              </a>

              <a
                href={`tel:${school.contact.phoneHref}`}
                className="flex items-center gap-3 transition-colors hover:text-white sm:gap-3.5"
              >
                <PhoneIcon className="size-5 shrink-0 text-accent-strong" />
                <span className="font-semibold tracking-wide">{school.contact.phone}</span>
              </a>

              <a
                href={`mailto:${school.contact.email}`}
                className="flex items-center gap-3 break-all transition-colors hover:text-white sm:gap-3.5"
              >
                <MailIcon className="size-5 shrink-0 text-accent-strong" />
                <span>{school.contact.email}</span>
              </a>
            </div>

            {/* Ikon Media Sosial */}
            <div className="pt-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary">Media Sosial Resmi</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={school.urls.canonical}
                  aria-label="Website Resmi SMKN 2 Surabaya"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:scale-105 hover:bg-primary hover:text-white sm:size-11"
                >
                  <GlobeIcon className="size-5" />
                </a>
                <a
                  href={school.urls.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram SMKN 2 Surabaya"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:scale-105 hover:bg-primary hover:text-white sm:size-11"
                >
                  <InstagramIcon className="size-5" />
                </a>
                <a
                  href={school.urls.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube SMKN 2 Surabaya"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:scale-105 hover:bg-primary hover:text-white sm:size-11"
                >
                  <YouTubeIcon className="size-5" />
                </a>
                <a
                  href={school.urls.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok SMKN 2 Surabaya"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:scale-105 hover:bg-primary hover:text-white sm:size-11"
                >
                  <TikTokIcon className="size-5" />
                </a>
                <a
                  href={school.urls.x}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter) SMKN 2 Surabaya"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all hover:scale-105 hover:bg-primary hover:text-white sm:size-11"
                >
                  <XIcon className="size-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Kolom 2: Jelajahi */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Jelajahi</p>
            <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
              {navigationLinks.jelajahi.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm font-medium text-white/80 transition-all duration-150 hover:translate-x-1 hover:text-white sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Layanan & Aplikasi Siswa */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Aplikasi & Layanan</p>
            <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
              {navigationLinks.layanan.map((item) => (
                <li key={item.href}>
                  {"external" in item && item.external ? (
                    <FooterExternalLink href={item.href}>{item.label}</FooterExternalLink>
                  ) : (
                    <Link
                      href={item.href}
                      className={`inline-block text-sm font-medium transition-all duration-150 hover:translate-x-1 sm:text-base ${
                        "highlighted" in item && item.highlighted
                          ? "font-semibold text-accent-soft hover:text-accent-strong"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Lokasi Sekolah & Maps */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Lokasi Sekolah</p>
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/20 bg-ink-muted/30 shadow-xl sm:mt-6">
              <a
                href={schoolMapUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1 text-xs font-bold text-ink shadow-md transition-all hover:bg-accent-soft hover:text-ink-strong sm:px-3.5 sm:py-1.5 sm:text-sm"
              >
                <span>Buka di Maps</span>
                <ArrowUpRightIcon className="size-3.5 sm:size-4" />
              </a>
              <iframe
                title={`Peta lokasi ${school.name}`}
                src={`https://maps.google.com/maps?q=${school.coordinates.latitude},${school.coordinates.longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="h-56 w-full border-0 sm:h-64 lg:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/70 sm:mt-3.5 sm:text-sm">
              {school.address.street}, {school.address.district}, Kota {school.address.city}, {school.address.province}
            </p>
          </div>
        </div>

        {/* Baris Logo Mitra: Bersih, Rapi & Terpusat (Simetris & Responsif di Semua Layar) */}
        <div className="border-t border-white/15 py-8 sm:py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 sm:gap-y-6 lg:gap-x-14">
            {jhicPartners.map((partner) => (
              <Image
                key={partner.src}
                src={partner.src}
                alt={partner.alt}
                width={240}
                height={80}
                className={`${partner.className} opacity-80 transition-all duration-200 hover:scale-105 hover:opacity-100`}
              />
            ))}
          </div>
        </div>

        {/* Footer Bottom Bar: Bersih & Terpusat */}
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/50 sm:py-6 sm:text-sm">
          <p>© {currentYear} {school.name}. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-all duration-150 hover:translate-x-1 hover:text-accent-strong sm:text-base"
    >
      <span>{children}</span>
      <ArrowUpRightIcon className="size-3.5 text-accent-strong sm:size-4" />
    </a>
  );
}
