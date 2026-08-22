import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { majorCatalog } from "@/data/majors";

export function MajorExplorer() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
      {majorCatalog.map((major) => (
        <Link key={major.slug} href={`/jurusan/${major.slug}`} className="group block">
          <div className="relative aspect-[2/3] overflow-hidden bg-[#e4e9ec]">
            <Image
              src={`/images/school/${major.code.toLowerCase()}-home.jpg`}
              alt={`Poster jurusan ${major.name} SMK Negeri 2 Surabaya`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
            />
          </div>
          <div className="mt-4 flex items-start justify-between gap-3 border-t border-ink/20 pt-3">
            <h3 className="text-sm font-extrabold leading-5 tracking-[-0.015em] text-ink-strong transition-colors group-hover:text-primary-strong sm:text-base sm:leading-6">
              {major.name}
            </h3>
            <ArrowRightIcon className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-primary-strong" />
          </div>
        </Link>
      ))}
    </div>
  );
}
