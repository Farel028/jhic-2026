"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { ExtracurricularCategory } from "@/data/extracurriculars";

export type DirectoryItem = {
  slug: string;
  name: string;
  unit?: string;
  description: string;
  number: string;
};

export type DirectoryGroup = {
  category: ExtracurricularCategory;
  items: DirectoryItem[];
};

type ActiveFilter = "Semua" | ExtracurricularCategory;

export function ExtracurricularDirectory({
  groups,
  total,
}: {
  groups: DirectoryGroup[];
  total: number;
}) {
  const [active, setActive] = useState<ActiveFilter>("Semua");
  const visibleGroups =
    active === "Semua"
      ? groups
      : groups.filter((group) => group.category === active);
  const shownCount = visibleGroups.reduce(
    (count, group) => count + group.items.length,
    0,
  );

  const filters: Array<{ label: ActiveFilter; count: number }> = [
    { label: "Semua", count: total },
    ...groups.map((group) => ({
      label: group.category as ActiveFilter,
      count: group.items.length,
    })),
  ];

  return (
    <div>
      <div
        role="group"
        aria-label="Saring ekstrakurikuler menurut bidang"
        className="flex gap-1 overflow-x-auto border-b border-ink/15 [scrollbar-width:thin]"
      >
        {filters.map((filter) => {
          const isActive = active === filter.label;
          return (
            <button
              key={filter.label}
              type="button"
              onClick={() => setActive(filter.label)}
              aria-pressed={isActive}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-bold transition-colors ${
                isActive
                  ? "border-b-2 border-primary text-ink-strong"
                  : "border-b-2 border-transparent text-ink-muted hover:text-ink-strong"
              }`}
            >
              {filter.label}
              <span
                aria-hidden="true"
                className={`rounded-full px-2 py-0.5 text-xs font-extrabold tabular-nums ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-ink/10 text-ink-muted"
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm font-medium text-ink-muted">
        Menampilkan {shownCount} dari {total} ekstrakurikuler
        {active !== "Semua" ? ` bidang ${active}` : ""} (sumber daftar: jadwal
        penampilan MPLS 2026).
      </p>

      <div className="mt-8 grid w-full gap-14 lg:gap-20">
        {visibleGroups.map((group) => (
          <div
            key={group.category}
            className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20"
          >
            <div>
              <p className="eyebrow">{group.category}</p>
              <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-strong">
                {group.category}
              </h2>
              <p className="mt-5 max-w-md text-sm font-medium leading-6 text-ink-muted">
                {group.items.length} pilihan
              </p>
            </div>

            <ol className="border-t border-ink/15">
              {group.items.map((entry) => {
                return (
                  <li
                    key={entry.slug}
                    className="grid gap-2 border-b border-ink/15 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <p
                      aria-hidden="true"
                      className="text-xs font-extrabold tabular-nums text-primary-strong"
                    >
                      {entry.number}
                    </p>
                    <div>
                      <h3 className="text-lg font-extrabold leading-6 tracking-[-0.02em] text-ink-strong sm:text-xl">
                        <Link
                          href={`/ekstrakurikuler/${entry.slug}`}
                          className="transition-colors hover:text-primary-strong"
                        >
                          {entry.name}
                        </Link>
                      </h3>
                      {entry.unit ? (
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                          {entry.unit}
                        </p>
                      ) : null}
                      <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-ink-muted">
                        {entry.description}
                      </p>
                    </div>
                    <Link
                      href={`/ekstrakurikuler/${entry.slug}`}
                      aria-label={`Lihat ${entry.name}`}
                      className="hidden size-10 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-primary hover:bg-primary hover:text-white sm:inline-flex"
                    >
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
