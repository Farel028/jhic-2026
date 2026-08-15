import Link from "next/link";

type AboutBreadcrumbProps = {
  current?: string;
};

export function AboutBreadcrumb({ current }: AboutBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.15em] text-ink-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="transition-colors hover:text-ink-strong">Beranda</Link></li>
        <li aria-hidden="true">/</li>
        {current ? (
          <>
            <li><Link href="/tentang" className="transition-colors hover:text-ink-strong">Tentang</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-primary">{current}</li>
          </>
        ) : (
          <li aria-current="page" className="text-primary">Tentang</li>
        )}
      </ol>
    </nav>
  );
}
