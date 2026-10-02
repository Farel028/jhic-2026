import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShareButton } from "@/components/news/article-share-button";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, EyeIcon } from "@/components/ui/icons";
import { getPracticeStoryBySlug, practiceStories } from "@/data/practice-stories";
import { withPageTwitter } from "@/lib/metadata";
import { getCmsNews } from "@/lib/cms-news";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return practiceStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getPracticeStoryBySlug(slug);

  if (!story) {
    const item = (await getCmsNews()).find((entry) => entry.slug === slug);
    if (!item) return {};
    return withPageTwitter({ title: item.title, description: item.excerpt, alternates: { canonical: item.href } });
  }

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

  if (!story) {
    const item = (await getCmsNews()).find((entry) => entry.slug === slug);
    if (!item) notFound();
    return (
      <main id="konten-utama" className="flex-1 bg-white px-5 py-12 sm:px-8 lg:px-10">
        <article className="mx-auto max-w-4xl">
          <Link href="/berita" className="text-sm font-bold text-ink-muted hover:text-primary-strong">← Kembali ke berita</Link>
          <p className="mt-10 text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">{item.categoryLabel}</p>
          <h1 className="mt-3 text-[clamp(1.85rem,4vw,3rem)] font-extrabold leading-tight text-ink-strong">{item.title}</h1>
          <p className="mt-4 text-base font-medium leading-7 text-ink-muted">{item.excerpt}</p>
          <p className="mt-5 text-sm font-bold text-ink-muted">{item.date}</p>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-background">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 959px) calc(100vw - 2.5rem), 896px" className="object-cover" />
          </div>
        </article>
      </main>
    );
  }

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

      <article className="bg-white">
        <header className="border-b border-ink/10 px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
          <div className="mx-auto w-full max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs font-bold text-ink-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/berita" className="transition-colors hover:text-primary-strong">Berita</Link>
                </li>
              </ol>
            </nav>

            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">
              {story.category}
            </p>
            <h1 className="mt-3 max-w-3xl text-[clamp(1.85rem,4vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink-strong">
              {story.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-ink-muted sm:text-lg">
              {story.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-4 text-sm font-medium text-ink-muted">
              <time>{story.date}</time>
              <span aria-hidden="true">·</span>
              <span>{story.author}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <EyeIcon className="size-4" />
                {story.views.toLocaleString("id-ID")} kali dilihat
              </span>
              <span className="ml-0 sm:ml-auto">
                <ArticleShareButton title={story.title} />
              </span>
            </div>
          </div>
        </header>

        <div className="px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
          <figure className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden bg-background">
            <Image
              src={story.image.src}
              alt={story.image.alt}
              fill
              preload
              sizes="(max-width: 959px) calc(100vw - 2.5rem), 896px"
              className="object-cover"
            />
          </figure>
        </div>

        <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg font-semibold leading-8 text-ink-strong">
              {story.introduction}
            </p>

            <div className="mt-10 space-y-9">
              {story.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-extrabold leading-7 tracking-[-0.02em] text-ink-strong sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base font-medium leading-8 text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-ink/10 bg-[#f1f0ea] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">Berita berikutnya</p>
            <h2 className="mt-2 max-w-2xl text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong sm:text-xl">
              {nextStory.title}
            </h2>
          </div>
          <Link href={`/berita/${nextStory.slug}`} className="inline-flex min-h-10 w-fit shrink-0 items-center gap-2 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong">
            Baca berita <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
