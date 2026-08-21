import type { Metadata } from "next";
import { VirtualTourClient } from "@/features/virtual-tour/components/virtual-tour-client";
import { smkn2Tour } from "@/features/virtual-tour/config/smkn2-tour";
import { assertValidTourConfig } from "@/features/virtual-tour/core/validate-tour-config";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Virtual Tour 360°",
  description: "Jelajahi lingkungan SMK Negeri 2 Surabaya melalui panorama 360 derajat.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Virtual Tour 360° / SMK Negeri 2 Surabaya",
    description: "Jelajahi lingkungan SMK Negeri 2 Surabaya melalui panorama 360 derajat.",
  },
});

export default function VirtualTourPage() {
  const config = assertValidTourConfig(smkn2Tour);

  return (
    <main id="konten-utama" className="flex-1">
      <VirtualTourClient config={config} />
    </main>
  );
}
