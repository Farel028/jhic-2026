import Image from "next/image";
import type { Metadata } from "next";
import { withPageTwitter } from "@/lib/metadata";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { photoGallery, newsroomItems, schoolVideos, socialChannels } from "@/data/documentation";

export const metadata: Metadata = withPageTwitter({
  title: "Dokumentasi",
  description: "Galeri foto, video, berita, dan kanal sosial resmi SMK Negeri 2 Surabaya.",
  alternates: { canonical: "/dokumentasi" },
  openGraph: {
    title: "Dokumentasi SMK Negeri 2 Surabaya",
    description: "Lihat kegiatan sekolah melalui foto, video, dan publikasi yang terverifikasi.",
    url: "/dokumentasi",
  },
});

export default function DocumentationPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Beranda", path: "/" }, { name: "Dokumentasi", path: "/dokumentasi" }]} />

      <section className="hero-grid overflow-hidden border-b border-ink/10 px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-site">
          <nav aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted"><li><Link href="/" className="hover:text-primary-strong">Beranda</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-ink-strong">Dokumentasi</li></ol></nav>
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="eyebrow">Dokumentasi sekolah</p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink-strong">Momen nyata. <span className="block text-primary-strong">Cerita yang tersimpan.</span></h1>
            </div>
            <div className="max-w-xl lg:pb-3">
              <p className="text-lg font-medium leading-8 text-ink-muted sm:text-xl sm:leading-9">Kumpulan foto, video, dan liputan yang telah diterbitkan melalui kanal resmi sekolah. Tidak ada visual sintetis dalam galeri ini.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#foto" className="inline-flex min-h-11 items-center rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Lihat foto</a>
                <a href="#video" className="inline-flex min-h-11 items-center rounded-full border border-ink/15 bg-white px-5 text-sm font-extrabold text-ink-strong">Putar video</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="foto" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-7 lg:grid-cols-[1fr_0.7fr]">
            <div><p className="eyebrow">Galeri foto</p><h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5.5vw,5.5rem)] font-black leading-[0.92] tracking-[-0.06em] text-ink-strong">Sekolah dalam berbagai sudut.</h2></div>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted lg:justify-self-end">Setiap foto terhubung ke publikasi asal agar konteks kegiatan tetap dapat ditelusuri.</p>
          </div>

          <div className="mt-12 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photoGallery.map((photo, index) => (
              <figure key={photo.title} className={`group relative overflow-hidden rounded-[1.75rem] bg-secondary/20 ${index === 0 ? "sm:col-span-2 sm:row-span-2" : index === 3 ? "lg:row-span-2" : ""}`}>
                <Image src={photo.image.src} alt={photo.image.alt} fill sizes={index === 0 ? "(max-width: 1024px) 92vw, 60vw" : "(max-width: 768px) 92vw, 32vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-strong/85 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 text-white sm:p-6">
                  <span><span className="block text-xs font-extrabold uppercase tracking-[0.13em] text-white/65">{photo.category} · {photo.year}</span><span className="mt-2 block text-xl font-black tracking-[-0.03em]">{photo.title}</span></span>
                  <a href={photo.sourceUrl} rel="noreferrer" aria-label={`Lihat sumber foto ${photo.title}`} className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink-strong transition-transform hover:-translate-y-0.5"><ArrowUpRightIcon className="size-4" /></a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="video" className="bg-ink-strong px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary">Video sekolah</p><h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-[0.92] tracking-[-0.06em]">Klik saat siap menonton.</h2></div>
            <p className="max-w-xl text-base font-medium leading-7 text-white/65 lg:justify-self-end">Halaman hanya memuat thumbnail lokal. Player YouTube baru dibuka setelah pengguna memilih video.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {schoolVideos.map((video, index) => (
              <article key={video.videoId} className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5">
                <a href={`https://www.youtube.com/watch?v=${video.videoId}`} rel="noreferrer" className="group relative block aspect-video overflow-hidden bg-black">
                  <Image src={video.thumbnail.src} alt={video.thumbnail.alt} fill sizes="(max-width: 768px) 92vw, 46vw" className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100" />
                  <span aria-hidden="true" className="absolute inset-0 grid place-items-center"><span className="grid size-16 place-items-center rounded-full bg-accent-strong text-ink-strong shadow-card transition-transform group-hover:scale-105"><span className="ml-1 text-2xl">▶</span></span></span>
                  <span className="absolute left-4 top-4 rounded-full bg-ink-strong/80 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.12em]">Video {String(index + 1).padStart(2, "0")}</span>
                </a>
                <div className="p-6 sm:p-7"><p className="text-xs font-black uppercase tracking-[0.13em] text-accent-strong">YouTube · {video.year}</p><h3 className="mt-4 text-2xl font-black tracking-[-0.04em]">{video.title}</h3><p className="mt-4 text-sm leading-6 text-white/60">{video.description}</p><a href={video.sourcePage} rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-white underline decoration-secondary decoration-2 underline-offset-8">Konteks publikasi <ArrowUpRightIcon className="size-4" /></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div><p className="eyebrow">Kanal sosial</p><h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-ink-strong sm:text-5xl">Ikuti sumbernya, bukan sekadar tag.</h2><p className="mt-6 text-base font-medium leading-7 text-ink-muted">Status kanal berasal dari tautan website resmi sekolah atau konfirmasi identitas yang diberikan untuk project.</p></div>
            <div className="grid gap-4 sm:grid-cols-3">
              {socialChannels.map((channel) => {
                const className = `min-h-72 rounded-[1.75rem] border border-ink/10 p-6 shadow-sm ${channel.tone}`;
                return <a key={channel.platform} href={channel.href} rel="noreferrer" className={`${className} transition-transform hover:-translate-y-1`}><span className="text-xs font-black uppercase tracking-[0.14em] text-ink-muted">{channel.platform}</span><span className="mt-12 block text-xl font-black tracking-[-0.035em] text-ink-strong">{channel.handle}</span><span className="mt-3 block text-sm leading-6 text-ink-muted">{channel.description}</span><span className="mt-6 block text-xs font-extrabold text-primary-strong">{channel.status}</span><span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-ink-strong">Buka kanal <ArrowUpRightIcon className="size-4" /></span></a>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef7fd] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-site">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow">Newsroom</p><h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5vw,5.5rem)] font-black leading-[0.92] tracking-[-0.06em] text-ink-strong">Berita terbaru dari sekolah.</h2></div><Link href="/berita" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-ink-strong px-5 text-sm font-extrabold text-white">Buka semua berita <ArrowRightIcon className="size-4" /></Link></div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {newsroomItems.slice(0, 3).map((item, index) => (
              <a key={item.href} href={item.href} rel="noreferrer" className={`group flex min-h-80 flex-col justify-between rounded-[1.75rem] border border-ink/10 p-6 shadow-sm transition-transform hover:-translate-y-1 ${index === 1 ? "bg-accent-soft" : index === 2 ? "bg-secondary" : "bg-white"}`}>
                <span className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.12em] text-ink-muted"><span>{item.categoryLabel}</span><ArrowUpRightIcon className="size-4" /></span>
                <span><time className="text-xs font-bold text-primary-strong">{item.date}</time><span className="mt-4 block text-2xl font-black leading-tight tracking-[-0.04em] text-ink-strong">{item.title}</span><span className="mt-4 block text-sm leading-6 text-ink-muted">{item.excerpt}</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
