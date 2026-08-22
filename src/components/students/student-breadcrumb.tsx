import Link from "next/link";

export function StudentBreadcrumb({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
        <li><Link href="/" className="hover:text-primary-strong">Beranda</Link></li>
        <li aria-hidden="true">/</li>
        {current ? (
          <>
            <li><Link href="/siswa/prestasi" className="hover:text-primary-strong">Siswa</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-strong">{current}</li>
          </>
        ) : (
          <li aria-current="page" className="text-ink-strong">Siswa</li>
        )}
      </ol>
    </nav>
  );
}
