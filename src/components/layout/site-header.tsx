import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { GlobalSearch } from "@/components/search/global-search";
import { primaryNavigation } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header data-site-chrome className="sticky top-0 z-50 border-b border-ink/10 bg-background/92 backdrop-blur-lg">
      <div className="mx-auto flex h-[4.75rem] w-full max-w-site items-center gap-6 px-5 sm:px-8 lg:px-10">
        <BrandMark />

        <nav aria-label="Navigasi utama" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-bold text-ink-muted transition-colors hover:bg-secondary/30 hover:text-ink-strong">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <GlobalSearch />
          <Link href="/informasi/spmb" className="hidden min-h-11 items-center rounded-full bg-accent-strong px-5 text-sm font-extrabold text-ink-strong transition-transform hover:-translate-y-0.5 lg:inline-flex">
            Info SPMB
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
