import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileMenu } from "@/components/navigation/mobile-menu";

export function SiteHeader() {
  return (
    <header data-site-chrome className="sticky top-0 z-50 bg-transparent lg:border-b lg:border-ink/10 lg:bg-background/95 lg:backdrop-blur-xl">
      <div className="mx-3 mt-2 flex h-16 max-w-site items-center gap-3 rounded-2xl border border-ink/10 bg-white/95 px-3 shadow-[0_8px_24px_rgba(11,31,51,0.1)] backdrop-blur-xl sm:mx-5 sm:px-4 lg:mx-auto lg:mt-0 lg:h-[5.25rem] lg:gap-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-10 lg:shadow-none">
        <BrandMark showIdentity={false} />

        <DesktopNavigation />

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link href="/informasi/spmb" className="hidden min-h-11 items-center rounded-xl bg-accent-strong px-5 text-[0.82rem] font-extrabold text-ink-strong transition-colors hover:bg-accent lg:inline-flex">
            Info SPMB
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
