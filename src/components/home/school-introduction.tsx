import Image from "next/image";
import { school } from "@/config/school";

export function SchoolIntroduction() {
  return (
    <section
      aria-labelledby="sambutan-kepala-sekolah"
      className="overflow-hidden border-b border-ink/10 bg-white px-5 text-ink-strong sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-site">
        <div className="grid items-end gap-8 pt-12 sm:gap-10 sm:pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:pt-0">
          <div className="relative order-1 mx-auto h-[25rem] w-full max-w-[35rem] self-end sm:h-[34rem] lg:h-[39rem]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[8%] bottom-0 top-[14%] rounded-t-[12rem] bg-[#e3e1d9]"
            />
            <Image
              src={school.principal.image.src}
              alt={school.principal.image.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 44vw"
              className="relative z-10 object-contain object-bottom"
            />
          </div>

          <div className="order-2 -mt-2 border-t border-ink/15 pt-5 lg:hidden">
            <p className="text-lg font-extrabold tracking-[-0.02em]">
              {school.principal.name}
            </p>
            <p className="mt-1 text-sm font-bold text-ink-muted">
              {school.principal.role}
            </p>
          </div>

          <div className="order-3 max-w-2xl self-center pb-14 sm:pb-16 lg:order-2 lg:py-20">
            <h2
              id="sambutan-kepala-sekolah"
              className="max-w-xl text-[clamp(1.8rem,3.2vw,2.65rem)] font-extrabold leading-[1.08] tracking-[-0.03em]"
            >
              Sambutan Kepala Sekolah
            </h2>
            <div className="mt-7 max-w-xl space-y-5 text-base font-medium leading-8 text-ink-muted sm:text-lg">
              <p>
                Selamat datang di website resmi {school.shortName}. Website ini
                kami hadirkan sebagai ruang informasi sekaligus penghubung bagi
                murid, orang tua, alumni, mitra, dan masyarakat.
              </p>
              <p>
                Melalui pendidikan vokasi yang berakar pada praktik, karya, dan
                karakter, kami terus menyiapkan murid agar siap berkembang dan
                memberi manfaat di tengah perubahan dunia kerja.
              </p>
            </div>

            <div className="mt-8 hidden border-t border-ink/15 pt-6 lg:block">
              <p className="text-lg font-extrabold tracking-[-0.02em]">
                {school.principal.name}
              </p>
              <p className="mt-1 text-sm font-bold text-ink-muted">
                {school.principal.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
