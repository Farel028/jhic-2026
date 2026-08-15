import Image from "next/image";
import Link from "next/link";
import { school } from "@/config/school";

type BrandMarkProps = {
  inverse?: boolean;
};

export function BrandMark({ inverse = false }: BrandMarkProps) {
  return (
    <Link href="/" className="group inline-flex min-w-0 items-center gap-3" aria-label={`${school.name}, kembali ke beranda`}>
      <span className="relative size-11 shrink-0 overflow-hidden transition-transform duration-300 group-hover:-rotate-2 sm:size-12">
        <Image src={school.logo.src} alt="" fill sizes="48px" className="object-contain p-1" loading="eager" />
      </span>
      <span className="min-w-0 leading-none">
        <span className={`block truncate text-[0.68rem] font-bold uppercase tracking-[0.2em] ${inverse ? "text-white/65" : "text-ink-muted"}`}>
          {school.identity}
        </span>
        <span className={`mt-1 block truncate text-sm font-extrabold tracking-[-0.02em] sm:text-base ${inverse ? "text-white" : "text-ink-strong"}`}>
          {school.name}
        </span>
      </span>
    </Link>
  );
}
