import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/layout/brand-mark";
import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { footerNavigation } from "@/config/navigation";
import { school, schoolMapUrl } from "@/config/school";

const jhicPartners = [
  { src: "/images/partners/jhic-2.0.png", alt: "JHIC 2.0" },
  { src: "/images/partners/jagoanhosting.png", alt: "Jagoan Hosting" },
  { src: "/images/partners/komdigi.png", alt: "Kementerian Komunikasi dan Digital" },
  { src: "/images/partners/garudaspark.png", alt: "Garuda Spark" },
  { src: "/images/partners/ngalup.png", alt: "Ngalup Collaborative Network" },
] as const;

export function SiteFooter() {
  return (
    <footer data-site-chrome className="bg-ink-strong text-white">
      <div className="mx-auto w-full max-w-site px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.05fr_0.55fr_0.55fr_0.9fr] lg:gap-12">
          <div className="max-w-xl">
            <BrandMark inverse />
            <p className="mt-7 max-w-lg text-xl font-semibold leading-relaxed tracking-[-0.025em] text-white/85 sm:text-2xl">
              Ruang digital untuk melihat apa yang dipelajari, dibuat, dan dicapai warga sekolah.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
              <a href={schoolMapUrl} className="group flex items-start gap-3 rounded-xl py-2 transition-colors hover:text-white" rel="noreferrer">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                <span>{school.address.street}, {school.address.city}</span>
              </a>
              <div className="space-y-3">
                <a href={`tel:${school.contact.phoneHref}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <PhoneIcon className="size-5 shrink-0 text-accent-strong" />
                  {school.contact.phone}
                </a>
                <a href={`mailto:${school.contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white">
                  <MailIcon className="size-5 shrink-0 text-accent-strong" />
                  {school.contact.email}
                </a>
              </div>
            </div>
          </div>

          <FooterLinkGroup title="Jelajahi" links={footerNavigation.jelajahi} />
          <FooterLinkGroup title="Informasi" links={footerNavigation.informasi} />
          <section aria-labelledby="footer-map-title">
            <p id="footer-map-title" className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Lokasi</p>
            <div className="mt-5 overflow-hidden rounded-lg border border-white/15 bg-white/5">
              <iframe
                title={`Peta lokasi ${school.name}`}
                src={`https://www.google.com/maps?q=${school.coordinates.latitude},${school.coordinates.longitude}&z=16&output=embed`}
                className="h-48 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </div>

        <section aria-label="Mitra JHIC" className="border-b border-white/15 py-7">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10">
            {jhicPartners.map((partner) => (
              <Image
                key={partner.src}
                src={partner.src}
                alt={partner.alt}
                width={200}
                height={90}
                className="h-8 w-auto max-w-44 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.28)] transition-transform duration-200 hover:-translate-y-0.5 sm:h-9"
              />
            ))}
          </div>
        </section>

        <div className="grid gap-7 pt-9 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Ekosistem digital sekolah</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
              <FooterExternalLink href={school.urls.siakad}>SIAKAD</FooterExternalLink>
              <FooterExternalLink href={school.urls.elearning}>E-Learning</FooterExternalLink>
              <FooterExternalLink href={school.urls.bkk}>BKK SMEKDA</FooterExternalLink>
              <FooterExternalLink href={school.urls.pkl}>e-PKL</FooterExternalLink>
              <FooterExternalLink href={school.urls.presensi}>e-Presensi</FooterExternalLink>
              <FooterExternalLink href={school.urls.library}>e-Library</FooterExternalLink>
              <FooterExternalLink href={school.urls.cbt}>CBT SMEKDA</FooterExternalLink>
            </div>
          </div>
          <p className="text-xs leading-5 text-white/50">© {new Date().getFullYear()} {school.name}. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent-strong">
      {children} <ArrowUpRightIcon className="size-4" />
    </a>
  );
}

type FooterLinkGroupProps = {
  title: string;
  links: readonly { label: string; href: string }[];
};

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <nav aria-label={title}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm font-semibold text-white/70 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
