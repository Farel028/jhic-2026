"use client";

import { useState } from "react";

type Item = {
  slug: string; title: string; excerpt: string; category: "kegiatan" | "karier" | "industri" | "sekolah";
  categoryLabel: string; date: string; year: "2025" | "2026"; href: string;
  image: { src: string; alt: string };
};

const empty: Item = {
  slug: "berita-baru", title: "", excerpt: "", category: "sekolah", categoryLabel: "Sekolah",
  date: "", year: "2026", href: "/berita/berita-baru", image: { src: "", alt: "" },
};

export function NewsAdmin() {
  const [token, setToken] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState<Item>(empty);
  const [status, setStatus] = useState("");

  async function load() {
    const response = await fetch("/api/admin/news", { headers: { authorization: `Bearer ${token}` } });
    if (!response.ok) return setStatus("Token salah atau akses ditolak.");
    setItems(await response.json()); setStatus("Konten dimuat.");
  }

  function edit(item: Item) { setDraft(item); window.scrollTo({ top: 0, behavior: "smooth" }); }

  function add() {
    setItems((current) => [...current.filter((item) => item.slug !== draft.slug), { ...draft, href: `/berita/${draft.slug}` }]);
    setDraft(empty); setStatus("Perubahan lokal siap disimpan.");
  }

  async function save() {
    const response = await fetch("/api/admin/news", { method: "PUT", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify(items) });
    setStatus(response.ok ? "Tersimpan. Halaman berita akan diperbarui." : "Gagal menyimpan.");
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-8 px-5 py-10 text-ink-strong">
      <header><p className="text-xs font-bold uppercase tracking-widest text-primary-strong">CMS ringan</p><h1 className="mt-2 text-3xl font-extrabold">Kelola berita</h1></header>
      <section className="grid gap-3 border-y border-ink/15 py-5 sm:grid-cols-[1fr_auto]">
        <input aria-label="Token admin" type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="CMS_ADMIN_TOKEN" className="min-h-11 border border-ink/20 px-3" />
        <button type="button" onClick={load} className="min-h-11 bg-ink-strong px-5 font-bold text-white">Muat berita</button>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(draft) as (keyof Item)[]).filter((key) => !["image"].includes(key)).map((key) => (
          <label key={key} className="grid gap-1 text-sm font-bold">{key}<input value={String(draft[key])} onChange={(event) => setDraft({ ...draft, [key]: event.target.value } as Item)} className="min-h-10 border border-ink/20 px-3 font-normal" /></label>
        ))}
        <label className="grid gap-1 text-sm font-bold">image.src<input value={draft.image.src} onChange={(event) => setDraft({ ...draft, image: { ...draft.image, src: event.target.value } })} className="min-h-10 border border-ink/20 px-3 font-normal" /></label>
        <label className="grid gap-1 text-sm font-bold">image.alt<input value={draft.image.alt} onChange={(event) => setDraft({ ...draft, image: { ...draft.image, alt: event.target.value } })} className="min-h-10 border border-ink/20 px-3 font-normal" /></label>
      </section>
      <div className="flex flex-wrap gap-3"><button type="button" onClick={add} className="min-h-11 bg-primary px-5 font-bold text-white">Tambah / ubah</button><button type="button" onClick={save} className="min-h-11 border border-ink-strong px-5 font-bold">Simpan ke VPS</button><span className="self-center text-sm text-ink-muted">{status}</span></div>
      <ol className="divide-y divide-ink/15 border-y border-ink/15">{items.map((item) => <li key={item.slug} className="flex items-center justify-between gap-4 py-4"><span><b>{item.title || item.slug}</b><br /><small>{item.categoryLabel} · {item.date}</small></span><button type="button" onClick={() => edit(item)} className="text-sm font-bold underline">Edit</button></li>)}</ol>
    </main>
  );
}
