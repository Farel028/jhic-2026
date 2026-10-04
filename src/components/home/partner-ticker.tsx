"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/ui/icons";
import { type FeaturedPartner, featuredPartners } from "@/data/partners";

function PartnerItems({
  hidden = false,
  onSelect,
}: {
  hidden?: boolean;
  onSelect: (partner: FeaturedPartner) => void;
}) {
  return (
    <ul className="ticker-track-list" aria-hidden={hidden || undefined}>
      {featuredPartners.map((partner) => (
        <li
          key={`${partner.name}-${hidden ? "hidden" : "visible"}`}
          className="flex items-center whitespace-nowrap"
        >
          <button
            type="button"
            onClick={() => onSelect(partner)}
            tabIndex={hidden ? -1 : 0}
            aria-label={`Lihat profil kerja sama industri ${partner.name}`}
            className="group flex h-20 w-36 cursor-pointer select-none items-center justify-center px-5 transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-115 active:scale-95 focus:outline-none sm:h-24 sm:w-44 sm:px-7"
          >
            <Image
              src={partner.logo.src}
              alt={partner.name}
              width={partner.logo.width}
              height={partner.logo.height}
              sizes="(max-width: 639px) 6rem, 7.5rem"
              className="max-h-10 w-auto max-w-24 object-contain transition-all duration-200 group-hover:brightness-105 group-hover:drop-shadow-md sm:max-h-12 sm:max-w-30"
            />
          </button>
          <span aria-hidden="true" className="h-5 w-px bg-ink/20" />
        </li>
      ))}
    </ul>
  );
}

export function PartnerTicker() {
  const [selectedPartner, setSelectedPartner] = useState<FeaturedPartner | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPartner(null);
      }
    };
    if (selectedPartner) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPartner]);

  return (
    <div className="mt-14 pt-4">
      <p className="text-center text-base font-extrabold text-ink-strong sm:text-lg">
        SMK Negeri 2 Surabaya bekerja sama dengan
      </p>

      <div className="mt-6 border-y border-ink/10">
        <div className="ticker-viewport">
          <div
            className="ticker-track"
            tabIndex={0}
            aria-label="Daftar mitra industri kerja sama. Klik logo untuk melihat profil kemitraan."
          >
            <PartnerItems onSelect={setSelectedPartner} />
            <PartnerItems hidden onSelect={setSelectedPartner} />
          </div>
        </div>
      </div>

      {/* Modal Pop-up Profil Kemitraan */}
      {selectedPartner ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-ink-strong/60 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setSelectedPartner(null)}
            aria-hidden="true"
          />

          {/* Modal Content Card */}
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-ink/15 bg-white p-6 shadow-2xl transition-all duration-200 sm:p-8">
            {/* Tombol Tutup Silang */}
            <button
              type="button"
              onClick={() => setSelectedPartner(null)}
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-ink/10 bg-secondary/30 text-ink transition-colors hover:bg-ink-strong hover:text-white"
              aria-label="Tutup jendela informasi mitra"
            >
              <CloseIcon className="size-5" />
            </button>

            {/* Badge & Logo Header */}
            <div className="flex items-center gap-4 border-b border-ink/10 pb-5">
              <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-[#f9fafb] p-3 shadow-xs">
                <Image
                  src={selectedPartner.logo.src}
                  alt={selectedPartner.name}
                  width={selectedPartner.logo.width}
                  height={selectedPartner.logo.height}
                  className="max-h-10 w-auto max-w-full object-contain"
                />
              </div>
              <div className="pr-8">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary-strong">
                  Mitra Industri DUDI
                </span>
                <h3
                  id="partner-modal-title"
                  className="mt-1 text-lg font-bold leading-snug text-ink-strong sm:text-xl"
                >
                  {selectedPartner.fullName}
                </h3>
              </div>
            </div>

            {/* Konten Detail Kemitraan */}
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Sektor Industri
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-strong">
                  {selectedPartner.sector}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Bentuk Kerja Sama
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {selectedPartner.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Lingkup Program
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPartner.scope.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink/10 bg-secondary/20 px-3 py-1.5 text-xs font-bold text-ink-strong"
                    >
                      <span className="size-1.5 rounded-full bg-accent-strong" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Aksi Modal */}
            <div className="mt-7 flex items-center justify-end border-t border-ink/10 pt-5">
              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-ink-strong px-5 text-sm font-bold text-white transition-colors hover:bg-primary-strong"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
