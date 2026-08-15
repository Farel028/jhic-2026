import Link from "next/link";

type AboutBreadcrumbProps = {
  current?: string;
  inverse?: boolean;
};

export function AboutBreadcrumb({ current, inverse = false }: AboutBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs font-extrabold uppercase tracking-[0.15em] ${inverse ? "text-white/70" : "text-ink-muted"}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className={`transition-colors ${inverse ? "hover:text-white" : "hover:text-ink-strong"}`}>Beranda</Link></li>
        <li aria-hidden="true">/</li>
        {current ? (
          <>
            <li><Link href="/tentang" className={`transition-colors ${inverse ? "hover:text-white" : "hover:text-ink-strong"}`}>Tentang</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className={inverse ? "text-secondary" : "text-primary-strong"}>{current}</li>
          </>
        ) : (
          <li aria-current="page" className={inverse ? "text-secondary" : "text-primary-strong"}>Tentang</li>
        )}
      </ol>
    </nav>
  );
}
