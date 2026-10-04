import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { school } from "@/config/school";
import { PartnerTicker } from "@/components/home/partner-ticker";

export function WhyChooseUs() {
  return (
    <section
      id="keunggulan"
      aria-labelledby="keunggulan-heading"
      className="border-b border-ink/10 bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-site">
        {/* Header Bersih & Langsung ke Poin */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink/15 pb-6">
          <h2
            id="keunggulan-heading"
            className="text-[clamp(1.9rem,3.2vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong"
          >
            Mengapa SMKN 2 Surabaya?
          </h2>
          <p className="max-w-md text-sm sm:text-base font-medium leading-relaxed text-ink-muted">
            Praktik di bengkel standar pabrik, sertifikasi profesi nasional, dan terhubung langsung dengan industri.
          </p>
        </div>

        {/* Bento Grid Bersih: Visual Kuat & Data Keras */}
        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {/* Tile 1: Foto Bengkel Manufaktur (7 Col) */}
          <div className="group relative overflow-hidden rounded-2xl border border-ink/15 bg-ink-strong sm:col-span-2 lg:col-span-7 min-h-[19rem] sm:min-h-[22rem] lg:min-h-[25rem] flex flex-col justify-end p-5 sm:p-8 text-white shadow-xs">
            <Image
              src="/images/school/bengkel-otomotif-2025.jpeg"
              alt="Bengkel praktik siswa SMK Negeri 2 Surabaya"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center brightness-[0.7] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-strong via-ink-strong/40 to-transparent"
            />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Bengkel Standar Pabrik Manufaktur
              </h3>
              <p className="mt-2 max-w-xl text-base text-white/85 leading-relaxed">
                Peralatan mesin CNC presisi, otomasi PLC, dan workshop otomotif standar dealer resmi. Siswa berlatih dengan alat yang sama seperti di lini produksi industri.
              </p>
            </div>
          </div>

          {/* Tile 2: Statistik Serapan Kerja & BKK Integrasi (5 Col) */}
          <div className="flex flex-col justify-between rounded-2xl border border-ink/15 bg-white p-5 sm:p-8 lg:col-span-5 shadow-xs">
            <div>
              <span className="font-mono text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-ink-strong">
                88.4%
              </span>
              <h3 className="mt-3 text-lg sm:text-xl font-extrabold text-ink-strong leading-snug">
                Terserap Kerja & Lolos Perguruan Tinggi Negeri
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">
                Mayoritas lulusan sudah menandatangani kontrak kerja industri atau diterima di kampus negeri sebelum wisuda kelulusan.
              </p>
            </div>

            {/* BKK Mini Outcome Stats Bar */}
            <div className="mt-6 border-t border-ink/10 pt-4">
              <div className="grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10 py-3 text-center">
                <div className="px-2 first:pl-0 last:pr-0">
                  <div className="font-mono text-base sm:text-lg font-black text-ink-strong">6.932</div>
                  <div className="text-sm font-bold text-ink-muted">Alumni BKK</div>
                </div>
                <div className="px-2 first:pl-0 last:pr-0">
                  <div className="font-mono text-base sm:text-lg font-black text-ink-strong">394</div>
                  <div className="text-sm font-bold text-ink-muted">Mitra Industri</div>
                </div>
                <div className="px-2 first:pl-0 last:pr-0">
                  <div className="font-mono text-base sm:text-lg font-black text-ink-strong">167</div>
                  <div className="text-sm font-bold text-ink-muted">MOU Aktif</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-semibold text-ink-muted">Bursa Kerja Khusus (BKK)</span>
                <a
                  href={school.urls.bkk}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary-strong hover:underline"
                >
                  Portal BKK
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Tile 3: Sejarah & Akreditasi (4 Col) */}
          <div className="flex flex-col justify-between rounded-2xl border border-ink/15 bg-white p-6 sm:p-7 lg:col-span-4 shadow-xs">
            <div>
              <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-primary-strong">
                1912
              </span>
              <h3 className="mt-2 text-lg font-extrabold text-ink-strong">
                114+ Tahun Tradisi Teknik
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">
                Sekolah teknik tertua di Surabaya dengan Akreditasi A Unggul, mencetak perintis industri dirgantara dan teknisi andal nasional.
              </p>
            </div>
          </div>

          {/* Tile 4: Sertifikasi BNSP (4 Col) */}
          <div className="flex flex-col justify-between rounded-2xl border border-ink/15 bg-white p-6 sm:p-7 lg:col-span-4 shadow-xs">
            <div>
              <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-emerald-700">
                BNSP
              </span>
              <h3 className="mt-2 text-lg font-extrabold text-ink-strong">
                Ijazah Resmi & Sertifikat Profesi
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">
                Setiap lulusan dibekali Sertifikat Kompetensi Kerja dari LSP-P1 BNSP yang diakui oleh asosiasi industri di seluruh Indonesia.
              </p>
            </div>
          </div>

          {/* Tile 5: Foto Fasilitas 11 Jurusan (4 Col) */}
          <div className="group relative overflow-hidden rounded-2xl border border-ink/15 bg-ink-strong min-h-[14rem] sm:min-h-[16rem] lg:col-span-4 flex flex-col justify-end p-6 text-white shadow-xs">
            <Image
              src="/images/school/fasilitas-listrik-2025.jpeg"
              alt="Fasilitas praktik kejuruan SMKN 2 Surabaya"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center brightness-[0.7] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-strong via-ink-strong/45 to-transparent"
            />

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                11 Jurusan
              </h3>
              <p className="mt-1 text-sm sm:text-base text-white/85">
                Pilihan kejuruan teknik dan kreatif di SMK Negeri 2 Surabaya.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Mitra Industri BUMN & Multinasional dengan Pop-up Detail */}
        <PartnerTicker />
      </div>
    </section>
  );
}
