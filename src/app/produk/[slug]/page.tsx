import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getProductBySlug, products } from "@/data/products";
import { school } from "@/config/school";
import { withPageTwitter } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return withPageTwitter({
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/produk/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} · Produk BLUD SMK Negeri 2 Surabaya`,
      description: product.description,
      url: `/produk/${product.slug}`,
      images: [
        {
          url: product.image.src,
          alt: product.image.alt,
        },
      ],
    },
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const currentIndex = products.findIndex((item) => item.slug === product.slug);
  const nextProduct =
    currentIndex + 1 < products.length ? products[currentIndex + 1] : undefined;
  const otherProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Produk BLUD", path: "/produk" },
          { name: product.name, path: `/produk/${product.slug}` },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/produk" className="transition-colors hover:text-primary-strong">Produk BLUD</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">{product.code}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <figure className="relative aspect-[4/3] overflow-hidden border border-ink/15 bg-white">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </figure>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary-strong">{product.unit} · {product.code}</p>
              <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong">
                {product.name}
              </h1>
              <p className="mt-5 border-y border-ink/15 py-5 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-[-0.025em] text-ink-strong">
                {product.price}
              </p>
              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
                {product.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <a
                  href={`mailto:${school.contact.email}?subject=Pemesanan ${product.code}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary-strong bg-primary-strong px-6 text-sm font-bold text-white transition-colors hover:bg-[#063c5d]"
                >
                  Pesan sekarang
                </a>
                {/* Nomor sekolah adalah telepon kabel sehingga tautan memakai
                    tel:. Bila sekolah menyediakan nomor WhatsApp khusus,
                    ganti href menjadi https://wa.me/62xxxxxxxxxx */}
                <a
                  href={`tel:${school.contact.phoneHref}`}
                  className="inline-flex min-h-12 items-center gap-2 text-sm font-extrabold text-ink-strong underline decoration-primary-strong decoration-2 underline-offset-8"
                >
                  <svg viewBox="0 0 24 24" fill="#25D366" aria-hidden="true" className="size-5 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  {school.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Alur pemesanan</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              Cara mendapatkan layanan ini
            </h2>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              {product.processNote}
            </p>
          </div>

          <div className="lg:border-l lg:border-ink/15 lg:pl-20">
            <p className="eyebrow">Unit pengelola</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink-strong">
              {product.unit}
            </h2>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Layanan dikerjakan siswa {product.unit} dengan pendampingan guru.
              Sampaikan kode {product.code} saat memesan.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-7 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="max-w-4xl text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-strong">
              Produk lainnya
            </h2>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted lg:justify-self-end lg:text-lg">
              Layanan unit sekolah yang bisa dipesan.
            </p>
          </div>
          <ul className="mt-9 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {otherProducts.map((item) => (
              <li key={item.slug} className="border border-ink/15 bg-white transition-colors hover:border-primary-strong">
                <Link href={`/produk/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/15 bg-white">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-primary-strong">
                      {item.unit} · {item.code}
                    </p>
                    <h3 className="mt-2 text-base font-extrabold leading-6 tracking-[-0.015em] text-ink-strong transition-colors group-hover:text-primary-strong">
                      {item.name}
                    </h3>
                    <p className="mt-3 border-t border-ink/15 pt-3 text-lg font-extrabold tracking-[-0.015em] text-ink-strong">
                      {item.price}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">
            {nextProduct ? (
              <Link href={`/produk/${nextProduct.slug}`} className="inline-flex min-h-11 items-center gap-3 border-b-2 border-ink-strong text-sm font-extrabold text-ink-strong transition-colors hover:border-primary-strong hover:text-primary-strong">
                Berikutnya: {nextProduct.name} <ArrowRightIcon className="size-4" />
              </Link>
            ) : null}
            <Link href="/produk" className="inline-flex min-h-11 items-center text-sm font-extrabold text-ink-strong underline decoration-primary-strong decoration-2 underline-offset-8">
              Semua produk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
