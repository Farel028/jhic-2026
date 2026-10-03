import Image from "next/image";
import { ArrowUpRightIcon, InstagramIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { getInstagramPosts } from "@/data/instagram-posts";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const mediaLabels = { image: "Foto", video: "Video", carousel: "Karusel" };

export async function InstagramSection() {
  const visiblePosts = (await getInstagramPosts()).slice(0, 8);

  return (
    <section aria-labelledby="instagram-sekolah" className="border-y border-ink/10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto w-full max-w-site">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/15 pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <InstagramIcon className="size-6 shrink-0 text-ink-strong" />
            <div className="min-w-0">
              <h2 id="instagram-sekolah" className="text-lg font-extrabold text-ink-strong sm:text-xl">Instagram sekolah</h2>
              <p className="text-sm font-medium text-ink-muted">@smkn2surabaya</p>
            </div>
          </div>
        </div>

        {visiblePosts.length ? (
          <>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {visiblePosts.map((post) => {
                const date = post.publishedAt ? new Date(post.publishedAt) : null;
                const dateLabel = date && !Number.isNaN(date.getTime()) ? dateFormatter.format(date) : null;

                return (
                  <li key={post.id} className="min-w-0">
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl focus-visible:rounded-xl"
                      aria-label={`Buka unggahan ${mediaLabels[post.mediaType]}${dateLabel ? ` tanggal ${dateLabel}` : ""} di Instagram`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#dce7ed]">
                        <Image
                          src={post.imageSrc}
                          alt={post.imageAlt}
                          fill
                          unoptimized={post.imageSrc.startsWith("/instagram-media/")}
                          loading="lazy"
                          sizes="(max-width: 639px) calc(50vw - 1.625rem), (max-width: 1023px) calc(50vw - 2.5rem), 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transition-none"
                        />
                        {post.mediaType === "video" ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 flex items-center justify-center text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105"
                          >
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-16 sm:size-24"
                            >
                              <path d="M6.5 4.8a1 1 0 0 1 1.52-.85l6.4 4.2a1 1 0 0 1 0 1.7l-6.4 4.2a1 1 0 0 1-1.52-.85V4.8Z" />
                            </svg>
                          </span>
                        ) : null}
                        {post.mediaType === "carousel" ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                          >
                            <span className="size-1.5 rounded-full bg-white" />
                            <span className="size-1.5 rounded-full bg-white/75" />
                            <span className="size-1.5 rounded-full bg-white/75" />
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-2 block text-xs font-semibold text-ink-muted sm:text-sm">
                        {dateLabel ?? "Lihat unggahan"}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex justify-center">
              <a
                href={school.urls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border-b-2 border-primary px-1 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-strong"
              >
                Lihat lainnya di Instagram
                <ArrowUpRightIcon className="size-4" />
              </a>
            </div>
          </>
        ) : (
          <p className="mt-6 text-sm text-ink-muted">Dokumentasi Instagram belum tersedia. Kunjungi profil sekolah untuk melihat unggahan.</p>
        )}
      </div>
    </section>
  );
}
