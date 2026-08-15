import Link from "next/link";
import { informationNavigation } from "@/data/information";

type InformationNavigationProps = {
  activeHref: (typeof informationNavigation)[number]["href"];
};

export function InformationNavigation({ activeHref }: InformationNavigationProps) {
  return (
    <nav aria-label="Navigasi Informasi" className="border-b border-ink/10 bg-white">
      <div className="mx-auto w-full max-w-site overflow-x-auto px-5 sm:px-8 lg:px-10">
        <ul className="flex min-w-max gap-1 py-3">
          {informationNavigation.map((item) => {
            const active = item.href === activeHref;
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-extrabold transition-colors ${active ? "bg-ink-strong text-white" : "text-ink-muted hover:bg-secondary/25 hover:text-ink-strong"}`}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
