import Image from "next/image";
import { ArrowUpRightIcon, InstagramIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { instagramPosts } from "@/data/instagram-posts";

export function InstagramSection() {
  const visiblePosts = instagramPosts.slice(0, 4);

  return (
    <section className="border-y border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto w-full max-w-site">
        <div className="flex items-center justify-between gap-5 border-b border-ink/15 pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <InstagramIcon className="size-6 shrink-0 text-ink-strong" />
            <div className="min-w-0">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-ink-muted">Instagram sekolah</p>
              <h2 className="truncate text-lg font-extrabold text-ink-strong sm:text-xl">@smkn2surabaya</h2>
            </div>
          </div>
          <a
            href={school.urls.instagram}
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-ink-strong hover:text-primary-strong"
          >
            <span className="hidden sm:inline">Lihat Instagram</span>
            <span className="sm:hidden">Lihat</span>
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1 sm:gap-2 lg:grid-cols-4">
          {visiblePosts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              rel="noreferrer"
              className="group relative aspect-[3/4] overflow-hidden bg-[#dce7ed]"
              aria-label={`Posting Instagram ${post.dateLabel}. Buka di Instagram`}
            >
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
              />
              <div className="absolute inset-0 flex items-end bg-ink-strong/0 p-4 transition-colors duration-300 group-hover:bg-ink-strong/70 group-focus-visible:bg-ink-strong/70 sm:p-5">
                <p className="line-clamp-3 translate-y-2 text-xs font-semibold leading-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:text-sm sm:leading-6">
                  {post.dateLabel}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
