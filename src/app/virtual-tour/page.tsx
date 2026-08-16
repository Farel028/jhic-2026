import type { Metadata } from "next";
import { VirtualTourClient } from "@/features/virtual-tour/components/virtual-tour-client";
import { homeTour } from "@/features/virtual-tour/config/home-tour";
import { assertValidTourConfig } from "@/features/virtual-tour/core/validate-tour-config";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Virtual Tour Development",
  description: "Development fixture untuk reusable Virtual Tour Framework sebelum menggunakan panorama SMK Negeri 2 Surabaya.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Virtual Tour Development / SMK Negeri 2 Surabaya",
    description: "Uji awal framework panorama 360 derajat yang reusable dan config-driven.",
  },
});

export default function VirtualTourPage() {
  const config = assertValidTourConfig(homeTour);

  return (
    <main id="konten-utama" className="flex-1">
      <VirtualTourClient config={config} />
    </main>
  );
}
