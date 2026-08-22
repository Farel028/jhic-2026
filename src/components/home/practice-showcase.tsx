import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { newsroomItems } from "@/data/documentation";

const latestNews = newsroomItems.slice(0, 4);

export function PracticeShowcase() {
  return (
    <section
      aria-labelledby="berita-terbaru"
      className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto w-full max-w-site">
        <div className="border-b border-ink/15 pb-7">
          <h2
            id="berita-terbaru"
            className="text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong"
          >
            Berita terbaru
          </h2>
        </div>

        <ol className="mt-10 grid gap-y-8 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
          {latestNews.map((item) => (
            <li key={item.href}>
              <article>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[7.5rem_1fr] items-start gap-4 sm:block"
                >
                  <figure className="relative aspect-[4/3] overflow-hidden bg-[#e3e1d9]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 7.5rem, (max-width: 1023px) calc(50vw - 2.25rem), (max-width: 1535px) calc(25vw - 2rem), 345px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transition-none"
                    />
                  </figure>

                  <div className="sm:mt-4">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-bold leading-5 text-ink-muted">
                      <span className="text-primary-strong">
                        {item.categoryLabel}
                      </span>
                      <span aria-hidden="true">/</span>
                      <time>{item.date}</time>
                    </p>
                    <h3 className="mt-2 text-base font-extrabold leading-6 tracking-[-0.02em] text-ink-strong transition-colors group-hover:text-primary-strong sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Link
            href="/berita"
            className="inline-flex min-h-11 items-center gap-3 border-b-2 border-primary pb-1 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong"
          >
            Lihat semua berita
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
