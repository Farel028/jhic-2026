import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { practiceStories } from "@/data/practice-stories";

export function PracticeShowcase() {
  const [featuredStory, ...supportingStories] = practiceStories;

  return (
    <section className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto w-full max-w-site">
        <div className="grid gap-7 border-b border-white/15 pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-secondary">Belajar lewat praktik</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              Dari ruang praktik ke dunia industri.
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-7 text-white/65 lg:justify-self-end lg:text-lg">
            Dokumentasi kegiatan belajar dan kolaborasi siswa sepanjang 2025.
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14">
          <article>
            <Link href={`/berita/${featuredStory.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                <Image
                  src={featuredStory.image.src}
                  alt={featuredStory.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">{featuredStory.category} · {featuredStory.year}</p>
                <h3 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight tracking-[-0.025em] sm:text-3xl">{featuredStory.title}</h3>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/60 sm:text-base sm:leading-7">{featuredStory.description}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-sm font-extrabold text-white underline decoration-secondary decoration-2 underline-offset-8">
                  Baca cerita <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </article>

          <div>
            {supportingStories.map((story) => (
              <article key={story.slug} className="border-t border-white/15 py-7 first:pt-0 lg:first:border-t-0">
                <Link href={`/berita/${story.slug}`} className="group grid gap-5 sm:grid-cols-[0.44fr_0.56fr] sm:items-start lg:grid-cols-1 xl:grid-cols-[0.44fr_0.56fr]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 18vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-secondary">{story.category} · {story.year}</p>
                    <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-[-0.02em] sm:text-2xl">{story.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">{story.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-white">
                      Baca <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-end border-t border-white/15 pt-7">
          <Link href="/berita" className="inline-flex min-h-11 items-center gap-3 text-sm font-extrabold text-white underline decoration-primary decoration-2 underline-offset-8">
            Lihat semua berita <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
