import type { Metadata } from "next";
import Link from "next/link";
import { StudentBreadcrumb } from "@/components/students/student-breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { ArrowRightIcon } from "@/components/ui/icons";
import { withPageTwitter } from "@/lib/metadata";

export const metadata: Metadata = withPageTwitter({
  title: "Alumni",
  description:
    "Ruang informasi alumni SMK Negeri 2 Surabaya setelah menempuh pendidikan di SMEKDA.",
  alternates: { canonical: "/siswa/alumni" },
  openGraph: {
    title: "Alumni SMK Negeri 2 Surabaya",
    description:
      "Jejaring, perjalanan setelah lulus, dan kontribusi alumni SMEKDA.",
    url: "/siswa/alumni",
  },
});

const graduatePaths = [
  {
    title: "Bekerja",
    description:
      "Menerapkan kompetensi dan terus berkembang di lingkungan profesional.",
  },
  {
    title: "Berwirausaha",
    description:
      "Mengolah keterampilan menjadi produk, layanan, atau usaha mandiri.",
  },
  {
    title: "Melanjutkan pendidikan",
    description:
      "Memperdalam bidang keahlian melalui pendidikan dan pelatihan lanjutan.",
  },
] as const;

const alumniConnections = [
  {
    title: "Informasi karier",
    description:
      "Bursa Kerja Khusus membantu menghubungkan lulusan dengan peluang dan kebutuhan dunia kerja.",
  },
  {
    title: "Penelusuran lulusan",
    description:
      "Perjalanan alumni membantu sekolah memahami transisi lulusan setelah menyelesaikan pendidikan.",
  },
  {
    title: "Berbagi kembali",
    description:
      "Pengalaman, wawasan, dan jejaring alumni dapat membuka perspektif baru bagi generasi berikutnya.",
  },
] as const;

export default function AlumniPage() {
  return (
    <main id="konten-utama" className="flex-1">
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", path: "/" },
          { name: "Siswa", path: "/siswa/prestasi" },
          { name: "Alumni", path: "/siswa/alumni" },
        ]}
      />

      <section className="border-b border-ink/10 bg-[#f1f0ea] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto w-full max-w-site">
          <StudentBreadcrumb current="Alumni" />
          <div className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-strong">
              Alumni SMEKDA
            </h1>
            <p className="max-w-xl text-base font-medium leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Kelulusan menjadi awal perjalanan baru, bukan akhir hubungan
              dengan sekolah.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
          <div>
            <p className="eyebrow">Setelah lulus</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Kompetensi membuka banyak arah.
            </h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base font-medium leading-7 text-ink-muted">
            <p>
              Alumni membawa pengetahuan, keterampilan, dan pengalaman SMEKDA
              ke lingkungan kerja, dunia usaha, maupun pendidikan lanjutan.
            </p>
            <p>
              Halaman ini menjadi penghubung informasi alumni tanpa mengulang
              arsip tokoh yang sudah ditempatkan pada halaman Sejarah.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#f1f0ea] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Langkah berikutnya</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Satu sekolah, beragam perjalanan.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {graduatePaths.map((path) => (
              <li
                key={path.title}
                className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6"
              >
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {path.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {path.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-site gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <p className="eyebrow">Tetap terhubung</p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
              Hubungan yang terus tumbuh.
            </h2>
          </div>
          <ul className="border-t border-ink/15">
            {alumniConnections.map((connection) => (
              <li
                key={connection.title}
                className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[0.35fr_0.65fr] sm:gap-8 sm:py-6"
              >
                <h3 className="text-base font-extrabold leading-6 text-ink-strong sm:text-lg">
                  {connection.title}
                </h3>
                <p className="text-sm font-medium leading-6 text-ink-muted">
                  {connection.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-[#f1f0ea] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-site flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base font-extrabold leading-7 tracking-[-0.015em] text-ink-strong sm:text-lg">
            Kenali alumni terdahulu yang tercatat dalam perjalanan sekolah.
          </p>
          <Link
            href="/tentang/sejarah#alumni"
            className="inline-flex items-center gap-3 text-sm font-extrabold text-ink-strong underline decoration-primary decoration-2 underline-offset-8"
          >
            Lihat jejak alumni <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
