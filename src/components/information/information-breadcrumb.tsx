import Link from "next/link";

export function InformationBreadcrumb({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
        <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
        <li aria-hidden="true">/</li>
        {current ? (
          <>
            <li><Link href="/informasi" className="hover:text-primary">Informasi</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-strong">{current}</li>
          </>
        ) : <li aria-current="page" className="text-ink-strong">Informasi</li>}
      </ol>
    </nav>
  );
}
