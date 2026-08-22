import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getPracticeStoryBySlug, practiceStories } from "@/data/practice-stories";
import { withPageTwitter } from "@/lib/metadata";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getPracticeStoryBySlug(slug);

  if (!story) return {};

  return withPageTwitter({
    title: story.title,
    description: story.description,
    alternates: { canonical: `/berita/${story.slug}` },
    openGraph: {
      title: `${story.title} · SMK Negeri 2 Surabaya`,
      description: story.description,
      url: `/berita/${story.slug}`,
      images: [{ url: story.image.src, alt: story.image.alt }],
    },
  });
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getPracticeStoryBySlug(slug);

  if (!story) notFound();

  const currentIndex = practiceStories.findIndex((item) => item.slug === story.slug);
  const nextStory = practiceStories[(currentIndex + 1) % practiceStories.length];

  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Berita", path: "/berita" },
          { name: story.title, path: `/berita/${story.slug}` },
        ]}
      />

      <article>
        <header className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto w-full max-w-site">
            <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/berita" className="transition-colors hover:text-primary-strong">Berita</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink-strong">{story.year}</li>
              </ol>
            </nav>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary-strong">{story.category}</p>
                <h1 className="mt-4 max-w-5xl text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink-strong">
                  {story.title}
                </h1>
              </div>
              <div className="lg:pb-1">
                <p className="text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">{story.description}</p>
                <p className="mt-5 text-sm font-bold text-ink-muted">{story.date} · {story.author}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white px-5 pt-8 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
          <figure className="relative mx-auto aspect-[16/9] w-full max-w-site overflow-hidden bg-background">
            <Image src={story.image.src} alt={story.image.alt} fill priority sizes="(max-width: 1536px) 100vw, 1440px" className="object-cover" />
          </figure>
        </div>

        <div className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xl font-semibold leading-9 text-ink-strong sm:text-2xl sm:leading-10">{story.introduction}</p>

            <div className="mt-14 space-y-12">
              {story.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.025em] text-ink-strong sm:text-3xl">{section.title}</h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base font-medium leading-8 text-ink-muted sm:text-lg">{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-14 border-t border-ink/15 pt-6 text-sm leading-6 text-ink-muted">
              Artikel ini dipindahkan dan diringkas dari publikasi Tim Humas SMK Negeri 2 Surabaya.
            </p>
          </div>
        </div>
      </article>

      <section className="bg-primary px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto flex w-full max-w-site flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink">Baca berikutnya</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">{nextStory.title}</h2>
          </div>
          <Link href={`/berita/${nextStory.slug}`} className="inline-flex min-h-11 w-fit items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-white">
            Baca cerita <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
