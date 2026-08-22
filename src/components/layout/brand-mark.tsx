import Image from "next/image";
import Link from "next/link";
import { school } from "@/config/school";

type BrandMarkProps = {
  inverse?: boolean;
  showIdentity?: boolean;
};

export function BrandMark({ inverse = false, showIdentity = true }: BrandMarkProps) {
  return (
    <Link href="/" className="group inline-flex min-w-0 items-center gap-2.5 sm:gap-3.5" aria-label={`${school.name}, kembali ke beranda`}>
      <span className="relative size-9 shrink-0 overflow-hidden transition-transform duration-300 group-hover:-rotate-2 sm:size-12">
        <Image src={school.logo.src} alt="" fill sizes="48px" className="object-contain" loading="eager" />
      </span>
      <span className="min-w-0 leading-none">
        {showIdentity ? (
          <span className={`block truncate text-[0.52rem] font-extrabold uppercase tracking-[0.12em] sm:text-[0.65rem] sm:tracking-[0.14em] ${inverse ? "text-white/65" : "text-primary-strong"}`}>
            {school.identity}
          </span>
        ) : null}
        <span className={`${showIdentity ? "mt-1 sm:mt-1.5" : ""} block truncate text-[0.72rem] font-extrabold tracking-[-0.035em] sm:text-base ${inverse ? "text-white" : "text-ink-strong"}`}>
          {school.name}
        </span>
      </span>
    </Link>
  );
}
