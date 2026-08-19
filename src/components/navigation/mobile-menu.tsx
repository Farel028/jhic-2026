"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { primaryNavigation } from "@/config/navigation";
import { school } from "@/config/school";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      document.documentElement.classList.remove("menu-open");
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    document.documentElement.classList.add("menu-open");
  };

  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" onClick={openMenu} className="grid size-11 place-items-center rounded-xl border border-ink/15 bg-accent-strong text-ink-strong lg:hidden" aria-label="Buka menu navigasi">
        <MenuIcon className="size-5" />
      </button>

      <dialog ref={dialogRef} className="mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-ink-strong lg:hidden">
        <div className="flex min-h-full flex-col px-5 pb-7 pt-5 sm:px-8">
          <div className="flex items-center justify-between border-b border-ink/10 pb-5">
            <span className="text-sm font-extrabold tracking-[-0.02em]">{school.shortName}</span>
            <button type="button" onClick={closeMenu} className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white" aria-label="Tutup menu navigasi">
              <CloseIcon className="size-5" />
            </button>
          </div>

          <nav aria-label="Navigasi mobile" className="mt-9">
            <ul className="space-y-1">
              {primaryNavigation.map((item, index) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMenu} className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 text-2xl font-bold tracking-[-0.04em] transition-colors hover:bg-secondary/35">
                    <span className="w-6 text-xs font-bold text-primary-strong">0{index + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-3 pt-10">
            <Link href="/informasi/spmb" onClick={closeMenu} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-strong px-6 font-extrabold text-ink-strong">
              Info SPMB
            </Link>
            <p className="text-center text-xs leading-5 text-ink-muted">Portal SPMB Jawa Timur 2026 telah menutup rangkaian pendaftaran.</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
