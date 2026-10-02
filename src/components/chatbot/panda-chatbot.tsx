"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { mediaAssetUrl } from "@/config/media-assets";

type PandaUniform = {
  dayLabel: string;
  uniformLabel: string;
  src: string;
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
  Mon: { dayLabel: "Senin", uniformLabel: "Seragam abu-abu", src: mediaAssetUrl("/panda/idle/abu_idle.webm") },
  Tue: { dayLabel: "Selasa", uniformLabel: "Seragam biru", src: mediaAssetUrl("/panda/idle/biru_idle.webm") },
  Wed: { dayLabel: "Rabu", uniformLabel: "Seragam batik", src: mediaAssetUrl("/panda/idle/batik_idle.webm") },
  Thu: { dayLabel: "Kamis", uniformLabel: "Seragam kotak", src: mediaAssetUrl("/panda/idle/kotak_idle.webm") },
  Fri: { dayLabel: "Jumat", uniformLabel: "Seragam pramuka", src: mediaAssetUrl("/panda/idle/pramuka_idle.webm") },
};

const weekendFallbacks: Record<string, PandaUniform> = {
  Sat: {
    dayLabel: "Sabtu",
    uniformLabel: "Seragam DC",
    src: mediaAssetUrl("/panda/idle/dc_idle.webm"),
  },
  Sun: {
    dayLabel: "Minggu",
    uniformLabel: "Seragam DC",
    src: mediaAssetUrl("/panda/idle/dc_idle.webm"),
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
      text: "Kamu bisa melihat seluruh jurusan beserta profilnya di halaman Jurusan.",
      action: { label: "Jelajahi jurusan", href: "/#jurusan" },
    },
    {
      keywords: ["ekskul", "ekstra", "paskibra", "pramuka", "futsal", "basket", "robotik"],
      text: "SMEKDA punya 14 ekstrakurikuler, dari Paskibra sampai Robotik. Lihat jadwal dan cara gabung lewat IG masing-masing ekskul.",
      action: { label: "Lihat ekstrakurikuler", href: "/#ekstrakurikuler" },
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

const availableUniformList: PandaUniform[] = [
  uniformsByDay.Mon, // 1 / F1: Abu-abu
  uniformsByDay.Tue, // 2 / F2: Biru
  uniformsByDay.Wed, // 3 / F3: Batik
  uniformsByDay.Thu, // 4 / F4: Kotak
  uniformsByDay.Fri, // 5 / F5: Pramuka
  weekendFallbacks.Sat, // 6 / F6: DC
  weekendFallbacks.Sun, // 7 / F7: DC
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
    <div className="relative hidden flex-col justify-center overflow-hidden border-r border-ink/10 bg-[#f8f7f4] p-4 sm:flex sm:h-full sm:p-5">
      <div className="relative my-auto flex h-72 sm:h-[26rem] w-full items-end justify-center overflow-hidden scale-110 sm:scale-125 origin-bottom">
        <LazyMascotVideo
          src={uniform.src}
          alt={`Pando memakai ${uniform.uniformLabel.toLocaleLowerCase("id-ID")}`}
          className="size-full object-bottom"
          fit="contain"
        />
      </div>
    </div>
  );
}

function LazyMascotVideo({
  src,
  alt = "Pando",
  className = "",
  fit = "contain",
}: {
  src: string;
  alt?: string;
  className?: string;
  fit?: "contain" | "cover";
}) {
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  if (hasError) {
    return (
      <Image
        src="/panda/pandobot.webp"
        alt={alt}
        width={606}
        height={412}
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      {/* Video with smooth fade-in once ready */}
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setHasError(true)}
        onCanPlay={(event) => {
          event.currentTarget.muted = true;
          void event.currentTarget.play().then(() => {
            setIsVideoReady(true);
          }).catch(() => setHasError(true));
        }}
        aria-label={alt}
        className={`pointer-events-none size-full transition-opacity duration-700 ease-out ${fit === "cover" ? "object-cover" : "object-contain"} object-center ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export function PandaChatbot() {
  const panelId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const launcherContainerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const nextMessageIdRef = useRef(2);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [uniform, setUniform] = useState<PandaUniform>(defaultUniform);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateUniform = () => setUniform(getJakartaUniform());
    updateUniform();
    const interval = window.setInterval(updateUniform, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  // Secret shortcut key listener to change Pando's uniform (1-7, F1-F7, Alt+1-7)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      let selectedIndex = -1;

      if (event.key === "F1") selectedIndex = 0;
      else if (event.key === "F2") selectedIndex = 1;
      else if (event.key === "F3") selectedIndex = 2;
      else if (event.key === "F4") selectedIndex = 3;
      else if (event.key === "F5") selectedIndex = 4;
      else if (event.key === "F6") selectedIndex = 5;
      else if (event.key === "F7") selectedIndex = 6;
      else if (event.altKey && event.key >= "1" && event.key <= "7") {
        selectedIndex = parseInt(event.key, 10) - 1;
      } else if (!event.altKey && !event.ctrlKey && !event.metaKey && event.key >= "1" && event.key <= "7") {
        selectedIndex = parseInt(event.key, 10) - 1;
      }

      if (selectedIndex >= 0 && selectedIndex < availableUniformList.length) {
        if (event.key.startsWith("F") || event.altKey) {
          event.preventDefault();
        }
        const newUniform = availableUniformList[selectedIndex];
        setUniform(newUniform);
        const msg = `✨ Secret Uniform: ${newUniform.uniformLabel} (${newUniform.dayLabel})`;
        setToastMessage(msg);

        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => setToastMessage(null), 3500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  function handleLauncherClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
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
    <>
      <div
        ref={launcherContainerRef}
        data-chatbot-root
        className="fixed z-[70]"
        style={{
          bottom: "max(0.75rem, env(safe-area-inset-bottom))",
          right: "max(0.75rem, env(safe-area-inset-right))",
        }}
      >
        {isOpen ? (
          <section
            id={panelId}
            role="region"
            aria-labelledby={`${panelId}-title`}
            className={`panda-chatbot-panel flex h-[min(40rem,calc(100dvh-5.25rem))] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white text-ink-strong shadow-[0_16px_40px_rgba(11,36,71,0.16)] sm:h-[min(40rem,calc(100dvh-5.25rem))] max-sm:max-h-[calc(100dvh-4.5rem)] max-sm:w-[calc(100vw-1.5rem)] max-sm:rounded-xl ${isExpanded
                ? "sm:h-[min(43rem,calc(100dvh-2.5rem))] sm:w-[min(52rem,calc(100vw-2.5rem))]"
                : ""
                }`}
          >
            <header className="relative flex min-h-[3.75rem] shrink-0 items-center gap-2.5 border-b border-ink/10 bg-[#faf9f6] px-3 sm:min-h-[4.25rem] sm:gap-3 sm:px-5">
              <PandoIcon className="h-8 w-10 shrink-0 sm:h-9 sm:w-12" />
              <div className="min-w-0 flex-1">
                <h2 id={`${panelId}-title`} className="truncate text-base font-extrabold tracking-tight text-ink-strong">
                  Pando
                </h2>
                <p className="mt-0.5 truncate text-[0.68rem] font-medium text-ink-muted">
                  Asisten Informasi SMKN 2 Surabaya
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsExpanded((current) => !current)}
                  className="hidden size-9 place-items-center rounded-lg border border-ink/10 text-ink-muted transition-colors hover:bg-black/5 hover:text-ink-strong sm:grid"
                  aria-label={isExpanded ? "Kecilkan panel Pando" : "Perbesar panel Pando"}
                  title={isExpanded ? "Kecilkan panel" : "Perbesar panel"}
                >
                  <ExpandIcon expanded={isExpanded} />
                </button>
                <button
                  type="button"
                  onClick={closePanel}
                  className="grid size-9 place-items-center rounded-lg border border-ink/10 text-ink-muted transition-colors hover:bg-black/5 hover:text-ink-strong"
                  aria-label="Tutup Pando"
                  title="Tutup"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
                    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </header>

            <div
              className={`min-h-0 flex-1 ${isExpanded
                ? "flex flex-col sm:grid sm:grid-cols-[minmax(15rem,0.85fr)_minmax(22rem,1.25fr)]"
                : "grid flex-col grid-rows-[minmax(0,1fr)_minmax(0,1fr)] sm:flex"
                }`}
            >
              {isExpanded ? <MascotStage uniform={uniform} /> : null}
              {!isExpanded ? (
                <div className="relative flex min-h-0 items-start justify-center overflow-hidden bg-[#f8f7f4] sm:hidden">
                  <LazyMascotVideo
                    src={uniform.src}
                    alt={`Pando memakai ${uniform.uniformLabel.toLocaleLowerCase("id-ID")}`}
                    className="h-full max-h-full w-full"
                    fit="contain"
                  />
                </div>
              ) : null}

              <div className="panda-chat-surface min-h-0 flex flex-1 flex-col bg-[#fdfcfb]">
                <div
                  className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5"
                  aria-live="polite"
                  aria-relevant="additions"
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-end gap-1.5 sm:gap-2.5 ${message.author === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        {message.author === "panda" ? (
                          <span className="flex h-7 w-8 shrink-0 items-center justify-center sm:h-8 sm:w-10" aria-hidden="true">
                            <PandoIcon className="h-6 w-8 sm:h-7 sm:w-10" />
                          </span>
                        ) : null}
                        <div
                          className={`min-w-0 max-w-[80%] rounded-xl px-3 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:max-w-[84%] sm:px-4 sm:py-3 ${message.author === "user"
                            ? "rounded-br-xs bg-[#0b2447] text-white"
                            : "rounded-bl-xs border border-ink/10 bg-white text-ink-strong"
                            }`}
                        >
                          <p className="break-words text-[0.83rem] font-medium leading-relaxed sm:text-sm">{message.text}</p>
                          {message.action ? (
                            <Link
                              href={message.action.href}
                              className={`mt-3 inline-flex min-h-9 items-center rounded-lg px-3.5 text-xs font-bold transition-colors ${message.author === "user"
                                ? "bg-white/15 text-white hover:bg-white/25"
                                : "bg-[#0b2447] text-white hover:bg-[#081a33]"
                                }`}
                            >
                              {message.action.label}
                              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ml-1.5 size-3.5">
                                <path
                                  d="M5 12h14m-5-5 5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          ) : null}
                          {message.time ? (
                            <p
                              className={`mt-1.5 text-right font-mono text-[0.62rem] ${message.author === "user" ? "text-white/60" : "text-ink-muted/50"
                                }`}
                            >
                              {message.time}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </div>
                </div>

                <div className="shrink-0 border-t border-ink/10 bg-white p-2.5 sm:p-4">
                  <div className="mb-2 flex min-w-0">
                    <div
                      className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      aria-label="Pertanyaan cepat"
                    >
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => sendMessage(prompt)}
                          className="min-h-9 shrink-0 rounded-lg border border-ink/10 bg-[#f8f9fa] px-2.5 text-[0.72rem] font-semibold text-ink-strong transition-all hover:border-[#0b2447] hover:bg-[#0b2447] hover:text-white sm:px-3 sm:text-xs"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="relative z-10 flex items-end gap-2"
                  >
                    <div className="relative z-10 flex min-w-0 flex-1 items-end rounded-xl border border-ink/20 bg-white px-2.5 py-1 transition-colors focus-within:border-[#0b2447] focus-within:ring-1 focus-within:ring-[#0b2447] sm:px-3.5">
                      <label htmlFor={`${panelId}-input`} className="sr-only">
                        Ketik pesan untuk Pando
                      </label>
                      <textarea
                        id={`${panelId}-input`}
                        rows={1}
                        value={inputValue}
                        onChange={(event) => {
                          setInputValue(event.target.value);
                          event.target.style.height = "auto";
                          event.target.style.height = `${Math.min(event.target.scrollHeight, 120)}px`;
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            const message = inputValue.trim();
                            if (message) {
                              sendMessage(message);
                              setInputValue("");
                              event.currentTarget.style.height = "auto";
                            }
                          }
                        }}
                        placeholder="Tanya seputar SMKN 2 Sby..."
                        autoComplete="off"
                        className="max-h-28 min-h-10 min-w-0 w-full resize-none bg-transparent py-2 text-[0.83rem] font-medium text-ink-strong outline-none ring-0 border-0 focus:outline-none focus:ring-0 placeholder:text-ink-muted/40 [outline:none!important] [box-shadow:none!important] sm:py-2.5 sm:text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#0b2447] text-white shadow-xs transition-all hover:bg-[#081a33] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[#0b2447] max-sm:size-10"
                      aria-label="Kirim pesan"
                    >
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
                        <path
                          d="m4 5 16 7-16 7 3-7-3-7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M7 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="relative">
            <button
              ref={launcherRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label="Pilihan Pando"
              onClick={handleLauncherClick}
              className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white text-left text-ink-strong shadow-[0_10px_24px_rgba(6,24,48,0.18)] transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f4f8ff]"
            >
              <span className="relative grid size-14 shrink-0 place-items-center rounded-full" aria-hidden="true">
                <PandoIcon className="size-[3.25rem]" />
              </span>
            </button>
          </div>
        )}
      </div>

      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 rounded-full border border-primary/30 bg-ink-strong/95 px-5 py-2.5 text-xs font-black text-white shadow-2xl backdrop-blur-md"
        >
          <span>👔</span>
          <span>{toastMessage}</span>
        </div>
      ) : null}
    </>
  );
}

