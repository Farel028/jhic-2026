import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { products } from "@/data/products";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Produk BLUD",
  description:
    "Katalog produk dan jasa unit sekolah SMK Negeri 2 Surabaya yang dikerjakan siswa dengan pendampingan guru.",
  alternates: { canonical: "/produk" },
  openGraph: {
    title: "Produk BLUD SMK Negeri 2 Surabaya",
    description:
      "Jasa servis motor, rakit PC, desain animasi, instalasi listrik, furniture, dan web profil usaha.",
    url: "/produk",
  },
});

export default function ProductsPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Produk BLUD", path: "/produk" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f3f4f6] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb" className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-primary-strong">Beranda</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-strong">Produk BLUD</li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">Badan Layanan Umum Daerah</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
                Produk BLUD
              </h1>
            </div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Jasa dan produk unit sekolah yang dikerjakan siswa dengan
              pendampingan guru. {products.length} layanan tersedia.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug} className="border border-ink/15 bg-white transition-colors hover:border-primary-strong">
                <Link href={`/produk/${product.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/15 bg-[#f3f4f6]">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-primary-strong">
                      {product.unit} · {product.code}
                    </p>
                    <h2 className="mt-2 text-lg font-extrabold leading-7 tracking-[-0.015em] text-ink-strong transition-colors group-hover:text-primary-strong">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-sm font-medium leading-6 text-ink-muted">
                      {product.short}
                    </p>
                    <p className="mt-4 border-t border-ink/15 pt-4 text-xl font-extrabold tracking-[-0.02em] text-ink-strong">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
