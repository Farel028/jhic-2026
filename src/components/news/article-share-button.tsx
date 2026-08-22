"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/ui/icons";

type ArticleShareButtonProps = {
  title: string;
};

export function ArticleShareButton({ title }: ArticleShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareArticle = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Salin tautan berita", url);
    }
  };

  return (
    <button
      type="button"
      onClick={shareArticle}
      className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-ink-strong transition-colors hover:text-primary-strong"
      aria-label={`Bagikan berita ${title}`}
    >
      <ShareIcon className="size-4" />
      <span aria-live="polite">{copied ? "Tautan disalin" : "Bagikan"}</span>
    </button>
  );
}
