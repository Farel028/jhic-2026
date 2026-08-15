import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/ui/icons";

type DocumentaryImageProps = {
  image: {
    src: string;
    alt: string;
    caption: string;
    href: string;
  };
  className?: string;
  imageClassName?: string;
  sizes: string;
  preload?: boolean;
  inverse?: boolean;
};

export function DocumentaryImage({
  image,
  className = "aspect-[4/3]",
  imageClassName = "object-cover",
  sizes,
  preload = false,
  inverse = false,
}: DocumentaryImageProps) {
  return (
    <figure className="group">
      <div className={`relative overflow-hidden bg-secondary/25 ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={`transition-transform duration-500 group-hover:scale-[1.02] ${imageClassName}`}
        />
      </div>
      <figcaption className={`mt-3 flex items-start justify-between gap-4 text-xs leading-5 ${inverse ? "text-white/60" : "text-ink-muted"}`}>
        <span>{image.caption}</span>
        <a href={image.href} rel="noreferrer" className={`inline-flex shrink-0 items-center gap-1 font-extrabold ${inverse ? "text-white hover:text-accent-strong" : "text-ink-strong hover:text-primary-strong"}`}>
          Sumber <ArrowUpRightIcon className="size-3.5" />
        </a>
      </figcaption>
    </figure>
  );
}
