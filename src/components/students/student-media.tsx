import Image from "next/image";
import type { StudentImage } from "@/data/students";

type StudentMediaProps = {
  image?: StudentImage;
  label: string;
  index: number;
  className?: string;
};

const tones = ["bg-secondary", "bg-accent-soft", "bg-[#dceefb]", "bg-[#cbe8f9]"] as const;

export function StudentMedia({ image, label, index, className = "aspect-[4/3]" }: StudentMediaProps) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-secondary/25 ${className}`}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 92vw, 46vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div role="img" aria-label={`Dokumentasi untuk ${label} belum tersedia`} className={`relative overflow-hidden ${tones[index % tones.length]} ${className}`}>
      <span aria-hidden="true" className="absolute -right-8 -top-10 text-[9rem] font-black leading-none text-white/45">{String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden="true" className="absolute -bottom-12 -left-8 size-40 rounded-full border-[2rem] border-primary/45" />
      <span className="absolute bottom-5 left-5 rounded-full border border-ink/15 bg-white/85 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.12em] text-ink-muted backdrop-blur-sm">
        Dokumentasi belum tersedia
      </span>
    </div>
  );
}
