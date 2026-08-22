"use client";

import { useMemo, useState } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { admissionSnapshots } from "@/data/admission-statistics";

function formatScore(value: number) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function AdmissionDataExplorer() {
  const [activeYear, setActiveYear] = useState<"2025" | "2026">("2025");
  const snapshot = admissionSnapshots.find((item) => item.year === activeYear) ?? admissionSnapshots[1];

  const summary = useMemo(() => {
    if (snapshot.programs.length === 0) return null;

    return {
      quota: snapshot.programs.reduce((total, item) => total + item.academicQuota, 0),
      highest: Math.max(...snapshot.programs.map((item) => item.highestScore)),
      lowest: Math.min(...snapshot.programs.map((item) => item.lowestScore)),
    };
  }, [snapshot]);

  return (
    <div>
      <div className="flex items-end justify-between gap-6 border-b border-ink/15">
        <div className="flex gap-6" aria-label="Pilih tahun data penerimaan">
          {admissionSnapshots.map((item) => (
            <button
              key={item.year}
              type="button"
              aria-pressed={activeYear === item.year}
              onClick={() => setActiveYear(item.year)}
              className={`min-h-12 border-b-2 text-sm font-extrabold transition-colors ${
                activeYear === item.year
                  ? "border-primary text-ink-strong"
                  : "border-transparent text-ink-muted hover:text-ink-strong"
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>
        <p className="hidden pb-3 text-xs font-bold text-ink-muted sm:block">
          {snapshot.statusLabel}
        </p>
      </div>

      {summary ? (
        <>
          <dl className="grid border-b border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-ink/10 py-6 sm:border-r sm:pr-6 lg:border-b-0">
              <dt className="text-xs font-bold text-ink-muted">Program keahlian</dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-ink-strong">
                {snapshot.programs.length}
              </dd>
            </div>
            <div className="border-b border-ink/10 py-6 sm:pl-6 lg:border-b-0 lg:border-r lg:pr-6">
              <dt className="text-xs font-bold text-ink-muted">Pagu jalur akademik</dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-ink-strong">
                {summary.quota}
              </dd>
            </div>
            <div className="border-b border-ink/10 py-6 sm:border-b-0 sm:border-r sm:pr-6 lg:pl-6">
              <dt className="text-xs font-bold text-ink-muted">Nilai tertinggi</dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-ink-strong">
                {formatScore(summary.highest)}
              </dd>
            </div>
            <div className="py-6 sm:pl-6">
              <dt className="text-xs font-bold text-ink-muted">Nilai terendah</dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-ink-strong">
                {formatScore(summary.lowest)}
              </dd>
            </div>
          </dl>

          <div className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-strong">
                  SPMB {snapshot.year}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-ink-strong">
                  Rentang nilai per program
                </h2>
              </div>
              <p className="max-w-xl text-sm font-medium leading-6 text-ink-muted">
                {snapshot.description}
              </p>
            </div>

            <div className="mt-6 overflow-x-auto border-y border-ink/15">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="text-xs font-extrabold text-ink-muted">
                    <th scope="col" className="py-4 pr-8">Program keahlian</th>
                    <th scope="col" className="px-4 py-4 text-right">Pagu akademik</th>
                    <th scope="col" className="px-4 py-4 text-right">Nilai tertinggi</th>
                    <th scope="col" className="py-4 pl-4 text-right">Nilai terendah</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.programs.map((item) => (
                    <tr key={item.program} className="border-t border-ink/10 text-sm">
                      <th scope="row" className="py-4 pr-8 font-extrabold text-ink-strong">
                        {item.program}
                      </th>
                      <td className="px-4 py-4 text-right font-semibold text-ink-muted">
                        {item.academicQuota}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-ink-strong">
                        {formatScore(item.highestScore)}
                      </td>
                      <td className="py-4 pl-4 text-right font-semibold text-ink-strong">
                        {formatScore(item.lowestScore)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="grid gap-5 border-b border-ink/15 py-10 sm:grid-cols-[0.35fr_0.65fr] sm:gap-12">
          <p className="text-sm font-extrabold text-primary-strong">{snapshot.statusLabel}</p>
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.025em] text-ink-strong">
              Rekap {snapshot.year} belum dapat ditampilkan.
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-ink-muted">
              {snapshot.description}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 border-t border-ink/15 pt-6 lg:grid-cols-[0.68fr_0.32fr] lg:gap-12">
        <div>
          <p className="text-sm font-extrabold text-ink-strong">Cara membaca data</p>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-ink-muted">
            {snapshot.scoreMethod} {snapshot.verificationNote}
          </p>
        </div>
        <a
          href={snapshot.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 w-fit items-center gap-2 text-sm font-extrabold text-ink-strong transition-colors hover:text-primary-strong lg:justify-self-end"
        >
          {snapshot.sourceLabel}
          <ArrowUpRightIcon className="size-4" />
        </a>
      </div>
    </div>
  );
}
