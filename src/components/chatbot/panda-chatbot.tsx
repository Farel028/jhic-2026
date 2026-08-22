"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

type PandaUniform = {
  dayLabel: string;
  uniformLabel: string;
  src: string;
  isWeekendFallback?: boolean;
};

type ChatAction = {
  label: string;
  href: string;
};

type ChatMessage = {
  id: number;
  author: "panda" | "user";
  text: string;
  time?: string;
  action?: ChatAction;
};

const uniformsByDay: Record<string, PandaUniform> = {
  Mon: { dayLabel: "Senin", uniformLabel: "Seragam abu-abu", src: "/panda/idle/abu_idle.webm" },
  Tue: { dayLabel: "Selasa", uniformLabel: "Seragam biru", src: "/panda/idle/biru_idle.webm" },
  Wed: { dayLabel: "Rabu", uniformLabel: "Seragam batik", src: "/panda/idle/batik_idle.webm" },
  Thu: { dayLabel: "Kamis", uniformLabel: "Seragam kotak", src: "/panda/idle/kotak_idle.webm" },
  Fri: { dayLabel: "Jumat", uniformLabel: "Seragam pramuka", src: "/panda/idle/pramuka_idle.webm" },
};

const weekendFallbacks: Record<string, PandaUniform> = {
  Sat: {
    dayLabel: "Sabtu",
    uniformLabel: "Seragam akhir pekan segera hadir",
    src: "/panda/idle/abu_idle.webm",
    isWeekendFallback: true,
  },
  Sun: {
    dayLabel: "Minggu",
    uniformLabel: "Seragam akhir pekan segera hadir",
    src: "/panda/idle/abu_idle.webm",
    isWeekendFallback: true,
  },
};

const defaultUniform = uniformsByDay.Mon;

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    author: "panda",
    text: "Halo! Aku Pando. Mau cari informasi apa?",
  },
];

const quickPrompts = [
  "Lihat jurusan",
  "Info SPMB",
  "Buka virtual tour",
] as const;

const responseGuides: Array<{
  keywords: string[];
  text: string;
  action: ChatAction;
}> = [
  {
    keywords: ["jurusan", "keahlian", "program"],
    text: "Kamu bisa melihat seluruh program keahlian beserta profil jurusannya di halaman Jurusan.",
    action: { label: "Jelajahi jurusan", href: "/#jurusan" },
  },
  {
    keywords: ["spmb", "daftar", "pendaftaran", "siswa baru"],
    text: "Informasi penerimaan murid baru tersedia di pusat informasi SPMB. Periksa periode jadwalnya sebelum mendaftar.",
    action: { label: "Buka info SPMB", href: "/informasi/spmb" },
  },
  {
    keywords: ["virtual", "tour", "360", "keliling sekolah"],
    text: "Yuk jelajahi lingkungan SMKN 2 Surabaya melalui panorama 360 derajat.",
    action: { label: "Mulai virtual tour", href: "/virtual-tour" },
  },
  {
    keywords: ["prestasi", "juara", "penghargaan"],
    text: "Kumpulan prestasi siswa dapat kamu lihat pada halaman Prestasi.",
    action: { label: "Lihat prestasi", href: "/siswa/prestasi" },
  },
  {
    keywords: ["fasilitas", "ruang", "bengkel", "laboratorium", "lab"],
    text: "Informasi fasilitas dan ruang praktik sekolah tersedia pada halaman Fasilitas.",
    action: { label: "Lihat fasilitas", href: "/tentang/fasilitas" },
  },
  {
    keywords: ["dokumentasi", "foto", "video", "kegiatan"],
    text: "Kegiatan terbaru sekolah dapat kamu lihat pada halaman Berita.",
    action: { label: "Lihat berita", href: "/berita" },
  },
];

function getJakartaUniform() {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
  }).format(new Date());

  return uniformsByDay[weekday] ?? weekendFallbacks[weekday] ?? defaultUniform;
}

function getJakartaTime() {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function getPandaResponse(value: string, id: number): ChatMessage {
  const normalizedValue = value.toLocaleLowerCase("id-ID");
  const guide = responseGuides.find(({ keywords }) => keywords.some((keyword) => normalizedValue.includes(keyword)));

  if (guide) {
    return {
      id,
      author: "panda",
      text: guide.text,
      time: getJakartaTime(),
      action: guide.action,
    };
  }

  return {
    id,
    author: "panda",
    text: "Fitur AI belum terhubung. Aku bisa bantu membuka jurusan, SPMB, prestasi, fasilitas, berita, atau virtual tour.",
    time: getJakartaTime(),
    action: { label: "Lihat jurusan", href: "/#jurusan" },
  };
}

function PandoIcon({ className = "h-8 w-12" }: { className?: string }) {
  return (
    <Image
      src="/panda/pandobot.webp"
      alt=""
      width={606}
      height={412}
      className={`object-contain ${className}`}
    />
  );
}

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return expanded ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path d="M9 4v5H4m11-5v5h5M9 20v-5H4m11 5v-5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path d="M9 4H4v5m11-5h5v5M9 20H4v-5m11 5h5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MascotStage({ uniform }: { uniform: PandaUniform }) {
  return (
    <div className="relative h-48 shrink-0 overflow-hidden bg-[linear-gradient(145deg,#dcecff_0%,#f8fbff_48%,#bfd8ff_100%)] sm:h-auto">
      <div className="absolute -left-10 top-6 size-40 rounded-full border border-primary/15" />
      <div className="absolute -right-8 -top-12 size-44 rounded-full bg-white/35 blur-2xl" />

      <video
        key={uniform.src}
        src={uniform.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          event.currentTarget.muted = true;
          void event.currentTarget.play();
        }}
        aria-label={`Pando memakai ${uniform.uniformLabel.toLocaleLowerCase("id-ID")}`}
        className="pointer-events-none absolute inset-0 size-full object-contain object-bottom sm:h-[92%] sm:self-end"
      />
    </div>
  );
}

function CompactMascot({ uniform }: { uniform: PandaUniform }) {
  return (
    <div className="relative h-20 w-24 shrink-0 overflow-visible" aria-hidden="true">
      <video
        key={uniform.src}
        src={uniform.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          event.currentTarget.muted = true;
          void event.currentTarget.play();
        }}
        className="pointer-events-none absolute bottom-[-0.25rem] left-1/2 h-[8.5rem] w-[8.5rem] -translate-x-1/2 object-contain object-bottom"
      />
    </div>
  );
}

export function PandaChatbot() {
  const panelId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const nextMessageIdRef = useRef(2);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [uniform, setUniform] = useState<PandaUniform>(defaultUniform);

  useEffect(() => {
    const updateUniform = () => setUniform(getJakartaUniform());
    updateUniform();
    const interval = window.setInterval(updateUniform, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    messageEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      window.requestAnimationFrame(() => launcherRef.current?.focus());
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  function closePanel() {
    setIsOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  function sendMessage(rawValue: string) {
    const value = rawValue.trim();
    if (!value) return;

    const userMessageId = nextMessageIdRef.current++;
    const responseMessageId = nextMessageIdRef.current++;
    const time = getJakartaTime();
    setMessages((current) => [
      ...current,
      { id: userMessageId, author: "user", text: value, time },
      getPandaResponse(value, responseMessageId),
    ]);
    setInputValue("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(inputValue);
  }

  return (
    <div
      data-chatbot-root
      className="fixed z-[70]"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))", right: "max(0.75rem, env(safe-area-inset-right))" }}
    >
      {isOpen ? (
        <section
          id={panelId}
          role="region"
          aria-labelledby={`${panelId}-title`}
          className={`panda-chatbot-panel flex h-[min(40rem,calc(100dvh-5.25rem))] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink-strong shadow-[0_20px_48px_rgba(6,24,48,0.22)] ${isExpanded ? "sm:h-[min(43rem,calc(100dvh-2.5rem))] sm:w-[min(52rem,calc(100vw-2.5rem))]" : ""}`}
        >
          <header className="relative flex min-h-[4.75rem] shrink-0 items-center gap-3 overflow-hidden border-b border-primary/15 bg-[linear-gradient(110deg,#ffffff_0%,#edf4ff_58%,#c8dcff_100%)] px-4 sm:px-5">
            <PandoIcon className="h-10 w-[3.75rem] shrink-0" />
            <div className="min-w-0 flex-1">
              <h2 id={`${panelId}-title`} className="truncate text-base font-black tracking-[-0.035em]">Pando</h2>
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-[0.68rem] font-bold text-primary-strong">
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                Panduan website sekolah
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                className="hidden size-11 place-items-center rounded-xl text-primary-strong transition-colors hover:bg-white/70 sm:grid"
                aria-label={isExpanded ? "Kecilkan panel Pando" : "Perbesar panel Pando"}
                title={isExpanded ? "Kecilkan panel" : "Perbesar panel"}
              >
                <ExpandIcon expanded={isExpanded} />
              </button>
              <button
                type="button"
                onClick={closePanel}
                className="grid size-11 place-items-center rounded-xl text-primary-strong transition-colors hover:bg-white/70"
                aria-label="Tutup Pando"
                title="Tutup"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className={`min-h-0 flex-1 ${isExpanded ? "flex flex-col sm:grid sm:grid-cols-[minmax(15rem,0.85fr)_minmax(22rem,1.25fr)]" : "flex flex-col"}`}>
            {isExpanded ? <MascotStage uniform={uniform} /> : null}

            <div className="min-h-0 flex flex-1 flex-col bg-white">
              <div className="panda-chat-surface min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite" aria-relevant="additions">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-end gap-2.5 ${message.author === "user" ? "justify-end" : "justify-start"}`}>
                      {message.author === "panda" ? (
                        <span className="flex h-8 w-10 shrink-0 items-center justify-center" aria-hidden="true">
                          <PandoIcon className="h-7 w-10" />
                        </span>
                      ) : null}
                      <div className={`max-w-[82%] rounded-[1.35rem] px-4 py-3 shadow-sm ${message.author === "user" ? "rounded-br-md bg-[linear-gradient(145deg,#4380e6,#2f66ca)] text-white" : "rounded-bl-md border border-primary/10 bg-white text-ink-strong"}`}>
                        <p className="text-sm font-semibold leading-6">{message.text}</p>
                        {message.action ? (
                          <Link href={message.action.href} className="mt-3 inline-flex min-h-10 items-center rounded-full bg-secondary/30 px-4 text-xs font-black text-primary-strong transition-colors hover:bg-secondary/50">
                            {message.action.label}
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ml-1.5 size-4">
                              <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        ) : null}
                        {message.time ? <p className={`mt-1.5 text-right text-[0.62rem] font-bold ${message.author === "user" ? "text-white/65" : "text-ink-muted/45"}`}>{message.time}</p> : null}
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              </div>

              <div className="shrink-0 border-t border-primary/10 bg-white p-3 sm:p-4">
                <div className="relative mb-3 flex min-w-0 items-end gap-2.5">
                  {!isExpanded ? <CompactMascot uniform={uniform} /> : null}
                  <div className="relative z-10 flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1" aria-label="Pertanyaan cepat">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="min-h-10 shrink-0 rounded-full border border-primary/15 bg-[#f4f8ff] px-3.5 text-xs font-extrabold text-primary-strong transition-colors hover:border-primary/30 hover:bg-secondary/20"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-[1.25rem] border border-primary/15 bg-[#f7faff] p-1.5 pl-4 focus-within:border-primary/60 focus-within:bg-white">
                  <label htmlFor={`${panelId}-input`} className="sr-only">Ketik pesan untuk Pando</label>
                  <input
                    id={`${panelId}-input`}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="Tanya seputar website..."
                    autoComplete="off"
                    className="min-h-11 min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink-strong outline-none placeholder:text-ink-muted/45 focus-visible:outline-none focus-visible:shadow-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#4d88ea,#2e65c8)] text-white shadow-md transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                    aria-label="Kirim pesan"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                      <path d="m4 5 16 7-16 7 3-7-3-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 12h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <button
          ref={launcherRef}
          type="button"
          aria-expanded="false"
          aria-controls={panelId}
          aria-label="Buka Pando"
          onClick={() => setIsOpen(true)}
          className="group flex min-h-14 items-center gap-3 rounded-[1.35rem] bg-[linear-gradient(145deg,#ffffff,#dceaff)] p-2 pr-4 text-left text-ink-strong shadow-[0_12px_28px_rgba(6,24,48,0.2)] transition-transform hover:-translate-y-1"
        >
          <span className="relative flex h-11 w-[4.1rem] shrink-0 items-center justify-center">
            <PandoIcon className="h-10 w-[3.75rem]" />
            <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-emerald-500" aria-hidden="true" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-black tracking-[-0.025em]">Tanya Pando</span>
            <span className="mt-0.5 block text-[0.62rem] font-bold text-primary-strong">Asisten sekolah</span>
          </span>
        </button>
      )}
    </div>
  );
}
