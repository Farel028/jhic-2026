"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { primaryNavigation } from "@/config/navigation";

const itemClassName = "inline-flex min-h-11 items-center whitespace-nowrap rounded-xl px-2 xl:px-3.5 text-[0.82rem] font-bold tracking-[-0.015em] text-ink-muted transition-colors hover:bg-secondary/25 hover:text-ink-strong";

export function DesktopNavigation() {
  const navRef = useRef<HTMLElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!keyboardOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setKeyboardOpen(null);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setKeyboardOpen(null);
      activeTriggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [keyboardOpen]);

  return (
    <nav ref={navRef} aria-label="Navigasi utama" className="ml-auto hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {primaryNavigation.map((item) => (
          <li
            key={item.label}
            className="group relative"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setKeyboardOpen((current) => current === item.label ? null : current);
              }
            }}
          >
            {"children" in item ? (
              <>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={keyboardOpen === item.label}
                  onPointerDown={(event) => {
                    if (event.pointerType === "mouse") event.preventDefault();
                  }}
                  onClick={(event) => {
                    const mouseCanHover = event.detail !== 0 && window.matchMedia("(hover: hover)").matches;
                    if (mouseCanHover) return;
                    activeTriggerRef.current = event.currentTarget;
                    setKeyboardOpen((current) => current === item.label ? null : item.label);
                  }}
                  className={`${itemClassName} gap-1.5`}
                >
                  {item.label}
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`size-3.5 transition-transform group-hover:rotate-180 ${keyboardOpen === item.label ? "rotate-180" : ""}`}>
                    <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={`pointer-events-none invisible absolute top-full z-50 pt-1 opacity-0 transition-[opacity,visibility] duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 ${item.children.length > 6 ? "left-1/2 w-[40rem] max-w-[calc(100vw-2rem)] -translate-x-1/2" : "left-0 w-80"} ${keyboardOpen === item.label ? "pointer-events-auto visible opacity-100" : ""}`}>
                  <ul className={`max-h-[calc(100dvh-6.5rem)] overflow-y-auto bg-background/95 px-5 py-4 backdrop-blur-xl ${item.children.length > 6 ? "grid grid-flow-col grid-rows-6 gap-x-8 gap-y-1" : "space-y-1"}`}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setKeyboardOpen(null)} className="flex min-h-10 items-center text-sm font-bold leading-snug text-ink-muted transition-[color,transform] hover:translate-x-1 hover:text-primary-strong">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <Link href={item.href} className={itemClassName}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
