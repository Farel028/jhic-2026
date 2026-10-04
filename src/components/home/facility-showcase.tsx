"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  facilityCategories,
  type FacilityCategory,
  type FacilityItem,
} from "@/data/facilities";
import { ArrowRightIcon } from "@/components/ui/icons";

interface FacilityShowcaseProps {
  initialItems: FacilityItem[];
  showPageLink?: boolean;
  limit?: number;
  enablePagination?: boolean;
  showCategoryFilter?: boolean;
}

const DEFAULT_ITEMS_PER_PAGE = 8; // 4 kolom x 2 baris

export function FacilityShowcase({
  initialItems,
  showPageLink = true,
  limit,
  enablePagination = true,
  showCategoryFilter = true,
}: FacilityShowcaseProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<FacilityCategory>("Semua Kategori");
  const [currentPage, setCurrentPage] = useState(1);

  const categorySelectId = useId();

  const filteredItems = useMemo(() => {
    if (!showCategoryFilter || selectedCategory === "Semua Kategori") return initialItems;
    return initialItems.filter((item) => item.category === selectedCategory);
  }, [initialItems, selectedCategory, showCategoryFilter]);

  const itemsPerPage = limit ?? DEFAULT_ITEMS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedItems = enablePagination
    ? filteredItems.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage)
    : filteredItems.slice(0, itemsPerPage);

  function handleCategoryChange(cat: FacilityCategory) {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }

  return (
    <div className="mt-8">
      {/* Category Dropdown Bar */}
      {showCategoryFilter && (
        <div className="flex items-center justify-end">
          <div className="relative w-full sm:w-auto">
            <label htmlFor={categorySelectId} className="sr-only">
              Filter kategori fasilitas
            </label>
            <select
              id={categorySelectId}
              value={selectedCategory}
              onChange={(e) =>
                handleCategoryChange(e.target.value as FacilityCategory)
              }
              className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-[0.9rem] font-medium text-slate-700 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
            >
              {facilityCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Grid: 4 Kolom x 2 Baris = 8 Cards Per Page */}
      {filteredItems.length === 0 ? (
        <div className="mt-6 border border-dashed border-ink/20 bg-white p-10 text-center">
          <p className="text-sm font-extrabold text-ink-strong">
            Tidak ada fasilitas pada kategori ini
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedItems.map((item) => (
            <article key={item.id} className="group flex flex-col">
              {/* Image Frame (Tajam tanpa rounded) */}
              <figure className="relative aspect-[4/3] overflow-hidden bg-[#f3f4f6]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) calc(50vw - 2rem), calc(25vw - 2rem)"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                />
              </figure>

              {/* Body */}
              <div className="mt-4 flex flex-1 flex-col">
                <p className="text-xs font-bold leading-5 text-primary-strong sm:text-sm">
                  {item.category}
                </p>

                <h3 className="mt-1 text-base font-extrabold leading-6 tracking-[-0.02em] text-ink-strong transition-colors group-hover:text-primary-strong line-clamp-2">
                  {item.name}
                </h3>

                <p className="mt-2 text-xs font-medium leading-relaxed text-ink-muted line-clamp-3">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {enablePagination && totalPages > 1 && (
        <nav
          aria-label="Navigasi halaman fasilitas"
          className="mt-12 flex items-center justify-center gap-1.5"
        >
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Halaman sebelumnya"
            className="grid size-9 place-items-center border border-ink/20 bg-white text-ink-muted transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const active = safePage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-label={`Halaman ${page}`}
                aria-current={active ? "page" : undefined}
                className={`grid size-9 place-items-center text-xs font-bold transition ${
                  active
                    ? "bg-ink-strong text-white"
                    : "border border-ink/20 bg-white text-ink-muted hover:border-ink/40 hover:text-ink-strong"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label="Halaman berikutnya"
            className="grid size-9 place-items-center border border-ink/20 bg-white text-ink-muted transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </nav>
      )}

      {/* Footer Link to Full Facility Page */}
      {showPageLink && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/tentang/fasilitas"
            className="inline-flex min-h-11 items-center gap-3 border-b-2 border-primary pb-1 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong"
          >
            Lihat semua fasilitas
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
