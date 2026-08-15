import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { school } from "@/config/school";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? school.urls.canonical),
  title: {
    default: `${school.name} | Vokasi, Karya, dan Masa Depan`,
    template: `%s | ${school.name}`,
  },
  description: school.description,
  applicationName: school.name,
  category: "education",
  keywords: [
    "SMK Negeri 2 Surabaya",
    "SMKN 2 Surabaya",
    "SMEKDA",
    "sekolah kejuruan Surabaya",
    "SMK negeri Surabaya",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: school.name,
    title: `${school.name} | Vokasi, Karya, dan Masa Depan`,
    description: school.description,
    images: [
      {
        url: school.logo.src,
        width: school.logo.width,
        height: school.logo.height,
        alt: school.logo.alt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${school.name} | Vokasi, Karya, dan Masa Depan`,
    description: school.description,
    images: [school.logo.src],
  },
  icons: {
    icon: school.logo.src,
    apple: school.logo.src,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9f9f9",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="antialiased">
      <body className="flex min-h-dvh flex-col">
        <a href="#konten-utama" className="skip-link">Lewati ke konten utama</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
