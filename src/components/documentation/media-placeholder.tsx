export function MediaPlaceholder({ title, index, className = "aspect-[16/10]" }: { title: string; index: number; className?: string }) {
  const tones = ["bg-secondary", "bg-accent-soft", "bg-[#dceefb]"] as const;
  return (
    <div role="img" aria-label={`Dokumentasi untuk ${title} belum tersedia`} className={`relative overflow-hidden ${tones[index % tones.length]} ${className}`}>
      <span aria-hidden="true" className="absolute -right-5 -top-10 text-[8rem] font-black leading-none text-white/45">{String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden="true" className="absolute -bottom-12 -left-10 size-40 rounded-full border-[2rem] border-primary/35" />
      <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.12em] text-ink-muted backdrop-blur-sm">Foto belum tersedia</span>
    </div>
  );
}
