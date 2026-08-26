"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const pageBriefs: Record<string, string> = {
  "/": "Selamat datang di SMKN 2 Surabaya! Aku Pando, siap memandumu menjelajahi sekolah! 🐼",
  "/berita": "Ini halaman Berita Sekolah. Kamu bisa baca kabar & kegiatan terbaru di sini! 📰",
  "/virtual-tour": "Selamat datang di Virtual Tour! Yuk keliling kampus SMKN 2 Surabaya secara 360°! 🏫",
  "/informasi/spmb": "Ini pusat informasi SPMB. Cek syarat, alur, dan jadwal pendaftaran siswa baru! 📝",
  "/siswa/prestasi": "Ini halaman Prestasi. Lihat deretan piala dan karya terbaik siswa SMKN 2 Surabaya! 🏆",
  "/tentang/fasilitas": "Ini halaman Fasilitas. Jelajahi lab, bengkel praktik, dan sarana belajar kami! 🔬",
  "/tentang/visi-misi": "Ini halaman Visi & Misi SMKN 2 Surabaya untuk mencetak generasi vokasi unggul! 🎯",
  "/tentang/profil": "Ini halaman Profil Sekolah. Pelajari visi-misi dan sejarah SMKN 2 Surabaya! 🎓",
};

const availableUniformList: PandaUniform[] = [
  uniformsByDay.Mon, // 1 / F1: Abu-abu
  uniformsByDay.Tue, // 2 / F2: Biru
  uniformsByDay.Wed, // 3 / F3: Batik
  uniformsByDay.Thu, // 4 / F4: Kotak
  uniformsByDay.Fri, // 5 / F5: Pramuka
];

function getBriefForPath(pathname: string): string {
  if (pageBriefs[pathname]) return pageBriefs[pathname];
  if (pathname.startsWith("/berita")) return "Ini artikel berita sekolah. Selamat membaca! 📰";
  if (pathname.startsWith("/informasi")) return "Ini pusat informasi SMKN 2 Surabaya. 📢";
  if (pathname.startsWith("/siswa")) return "Ini halaman seputar kegiatan dan prestasi siswa. 🎒";
  if (pathname.startsWith("/tentang")) return "Ini halaman profil & fasilitas SMKN 2 Surabaya. ✨";
  return "Aku Pando! Siap membantumu menjelajahi website SMKN 2 Surabaya. 🐼";
}

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

      <LazyMascotVideo
        src={uniform.src}
        alt={`Pando memakai ${uniform.uniformLabel.toLocaleLowerCase("id-ID")}`}
        className="absolute inset-0 size-full sm:h-[92%] sm:self-end"
      />
    </div>
  );
}

function CompactMascot({ uniform }: { uniform: PandaUniform }) {
  return (
    <div className="relative h-12 w-32 shrink-0 overflow-visible" aria-hidden="true">
      <LazyMascotVideo
        src={uniform.src}
        alt=""
        className="absolute bottom-[-0.5rem] left-1/2 size-56 -translate-x-1/2"
      />
    </div>
  );
}

function LazyMascotVideo({
  src,
  alt = "Pando",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

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
    <video
      key={src}
      src={src}
      poster="/panda/pandobot.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setHasError(true)}
      onCanPlay={(event) => {
        event.currentTarget.muted = true;
        void event.currentTarget.play().catch(() => setHasError(true));
      }}
      aria-label={alt}
      className={`pointer-events-none object-contain object-bottom ${className}`}
    />
  );
}

function LeftPandoMascot({
  uniform,
  onOpenChat,
}: {
  uniform: PandaUniform;
  onOpenChat: () => void;
}) {
  const pathname = usePathname();
  const briefText = getBriefForPath(pathname);
  const [showBubble, setShowBubble] = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setShowBubble(true);
  }

  useEffect(() => {
    if (!showBubble) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, showBubble]);

  const handleMascotClick = () => {
    if (!showBubble) {
      setShowBubble(true);
    } else {
      onOpenChat();
    }
  };

  return (
    <aside
      aria-label="Pando VTuber Maskot"
      className="hidden sm:flex pando-left-mascot fixed left-[-2.5rem] sm:left-[-4rem] md:left-[-5.5rem] lg:left-[-7rem] bottom-[-2.5rem] sm:bottom-[-3.5rem] md:bottom-[-4.5rem] z-[65] pointer-events-none flex-col items-start"
    >
      {/* Massive VTuber-style Avatar character anchored past bottom edge */}
      <div
        onClick={handleMascotClick}
        className="pointer-events-auto pando-float relative h-[32rem] w-[22rem] sm:h-[44rem] sm:w-[32rem] md:h-[54rem] md:w-[40rem] lg:h-[66rem] lg:w-[48rem] max-h-[80vh] sm:max-h-[90vh] md:max-h-[98vh] shrink-0 cursor-pointer drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)]"
      >
        {/* Dynamic Auto-Appearing & Auto-Disappearing Speech Bubble */}
        <div
          className={`pointer-events-auto absolute top-2 sm:top-6 md:top-10 left-[6rem] sm:left-[9rem] md:left-[12rem] lg:left-[14rem] z-20 w-[15rem] sm:w-[18rem] md:w-[21rem] rounded-2xl border border-primary/20 bg-white/95 p-3.5 sm:p-4 shadow-[0_20px_48px_rgba(6,24,48,0.25)] backdrop-blur-md text-ink-strong transition-all duration-500 ease-out ${
            showBubble
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[0.72rem] font-black uppercase tracking-wider text-primary-strong">
                Pando Guide 🐼
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="grid size-5 place-items-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              title="Tutup sapaan"
              aria-label="Tutup sapaan"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-3" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className="text-xs sm:text-sm font-semibold leading-relaxed text-ink-strong">
            {briefText}
          </p>

          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenChat();
              }}
              className="inline-flex items-center gap-1 text-[0.72rem] font-extrabold text-primary-strong hover:underline"
            >
              Tanya Pando AI
              <svg viewBox="0 0 24 24" fill="none" className="size-3" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-[0.62rem] text-slate-400 font-bold">Klik Pando untuk sapa lagi</span>
          </div>

          {/* Speech bubble tail pointing to Pando */}
          <div className="absolute -left-2.5 top-6 size-0 border-y-[8px] border-y-transparent border-r-[10px] border-r-white" />
        </div>

        <LazyMascotVideo
          src={uniform.src}
          alt={`Pando memakai ${uniform.uniformLabel}`}
          className="size-full object-bottom"
        />
      </div>
    </aside>
  );
}

export function PandaChatbot() {
  const panelId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const launcherContainerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const nextMessageIdRef = useRef(2);
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSummoned, setIsSummoned] = useState(false);
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

  // Secret shortcut key listener to change Pando's uniform (1-5, F1-F5, Alt+1-5)
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
      else if (event.altKey && event.key >= "1" && event.key <= "5") {
        selectedIndex = parseInt(event.key, 10) - 1;
      } else if (!event.altKey && !event.ctrlKey && !event.metaKey && event.key >= "1" && event.key <= "5") {
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
    if (!isOpen && !showMenu) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      setShowMenu(false);
      window.requestAnimationFrame(() => launcherRef.current?.focus());
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, showMenu]);

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        launcherContainerRef.current &&
        !launcherContainerRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  function closePanel() {
    setIsOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  function handleLauncherClick() {
    if (isOpen) {
      setIsOpen(false);
      setShowMenu(false);
    } else if (typeof window !== "undefined" && window.innerWidth < 640) {
      setIsOpen(true);
      setShowMenu(false);
    } else {
      setShowMenu((current) => !current);
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
      {isSummoned ? (
        <LeftPandoMascot
          uniform={uniform}
          onOpenChat={() => {
            setIsOpen(true);
            setShowMenu(false);
          }}
        />
      ) : null}

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
            className={`panda-chatbot-panel flex h-[min(40rem,calc(100dvh-5.25rem))] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink-strong shadow-[0_20px_48px_rgba(6,24,48,0.22)] ${isExpanded
              ? "sm:h-[min(43rem,calc(100dvh-2.5rem))] sm:w-[min(52rem,calc(100vw-2.5rem))]"
              : ""
              }`}
          >
            <header className="relative flex min-h-[4.75rem] shrink-0 items-center gap-3 overflow-hidden border-b border-primary/15 bg-[linear-gradient(110deg,#ffffff_0%,#edf4ff_58%,#c8dcff_100%)] px-4 sm:px-5">
              <PandoIcon className="h-10 w-[3.75rem] shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 id={`${panelId}-title`} className="truncate text-base font-black tracking-[-0.035em]">
                  Pando
                </h2>
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

            <div
              className={`min-h-0 flex-1 ${isExpanded
                ? "flex flex-col sm:grid sm:grid-cols-[minmax(15rem,0.85fr)_minmax(22rem,1.25fr)]"
                : "flex flex-col"
                }`}
            >
              {isExpanded ? <MascotStage uniform={uniform} /> : null}

              <div className="panda-chat-surface min-h-0 flex flex-1 flex-col">
                <div
                  className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5"
                  aria-live="polite"
                  aria-relevant="additions"
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-end gap-2.5 ${message.author === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        {message.author === "panda" ? (
                          <span className="flex h-8 w-10 shrink-0 items-center justify-center" aria-hidden="true">
                            <PandoIcon className="h-7 w-10" />
                          </span>
                        ) : null}
                        <div
                          className={`max-w-[82%] rounded-[1.35rem] px-4 py-3 shadow-sm ${message.author === "user"
                            ? "rounded-br-md bg-[linear-gradient(145deg,#4380e6,#2f66ca)] text-white"
                            : "rounded-bl-md border border-primary/10 bg-white text-ink-strong"
                            }`}
                        >
                          <p className="text-sm font-semibold leading-6">{message.text}</p>
                          {message.action ? (
                            <Link
                              href={message.action.href}
                              className="mt-3 inline-flex min-h-10 items-center rounded-full bg-secondary/30 px-4 text-xs font-black text-primary-strong transition-colors hover:bg-secondary/50"
                            >
                              {message.action.label}
                              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ml-1.5 size-4">
                                <path
                                  d="M5 12h14m-5-5 5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="1.9"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          ) : null}
                          {message.time ? (
                            <p
                              className={`mt-1.5 text-right text-[0.62rem] font-bold ${message.author === "user" ? "text-white/65" : "text-ink-muted/45"
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

                <div className="shrink-0 bg-white p-3 sm:p-4">
                  <div className="relative mb-3 flex min-h-14 min-w-0 items-center gap-2.5 py-1">
                    {!isExpanded ? <CompactMascot uniform={uniform} /> : null}
                    <div
                      className="relative z-10 flex min-w-0 flex-1 gap-2 overflow-x-auto py-1"
                      aria-label="Pertanyaan cepat"
                    >
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
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 rounded-[1.25rem] border border-primary/15 bg-[#f7faff] p-1.5 pl-4 focus-within:border-primary/60 focus-within:bg-white"
                  >
                    <label htmlFor={`${panelId}-input`} className="sr-only">
                      Ketik pesan untuk Pando
                    </label>
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
                        <path
                          d="m4 5 16 7-16 7 3-7-3-7Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M7 12h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="relative">
            {showMenu ? (
              <div
                role="menu"
                aria-label="Pilihan Pando"
                className="pando-bubbles-menu absolute bottom-16 right-0 mb-2.5 flex flex-col items-end gap-2 min-w-[12rem] sm:min-w-[13.5rem]"
              >
                {/* Bubble 1: Tanya Pando */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setShowMenu(false);
                    setIsOpen(true);
                  }}
                  className="group flex items-center gap-2.5 rounded-[1.25rem] bg-white/95 px-4 py-2.5 shadow-[0_8px_24px_rgba(6,24,48,0.16)] border border-primary/20 backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#f4f8ff] active:scale-95 text-left"
                >
                  <span className="text-sm font-extrabold tracking-tight text-ink-strong group-hover:text-primary-strong">
                    Tanya Pando
                  </span>
                  <span
                    className="relative grid size-9 shrink-0 place-items-center rounded-full bg-primary/10"
                    aria-hidden="true"
                  >
                    <PandoIcon className="size-7" />
                    <span className="absolute right-0 top-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </span>
                </button>

                {/* Bubble 2: Panggil Pando */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setShowMenu(false);
                    setIsSummoned((current) => !current);
                  }}
                  className={`hidden sm:flex group items-center gap-2.5 rounded-[1.25rem] px-4 py-2.5 shadow-[0_8px_24px_rgba(6,24,48,0.16)] border backdrop-blur-sm transition-all hover:scale-105 active:scale-95 text-left ${isSummoned
                    ? "bg-primary-strong text-white border-primary-strong hover:bg-primary"
                    : "bg-white text-ink-strong border-primary/20 hover:bg-[#f4f8ff]"
                    }`}
                >
                  <span className="text-sm font-extrabold tracking-tight">
                    {isSummoned ? "Sembunyikan Pando" : "Panggil Pando"}
                  </span>
                  <span
                    className={`relative grid size-9 shrink-0 place-items-center rounded-full ${isSummoned ? "bg-white/20" : "bg-accent-soft/40"
                      }`}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`size-5 ${isSummoned ? "text-white" : "text-amber-700"}`}
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M11 5.882a3 3 0 00-3-3H5a2 2 0 00-2 2v10a2 2 0 002 2h3a3 3 0 003-3v-8.118z" />
                    </svg>
                  </span>
                </button>
              </div>
            ) : null}

            <button
              ref={launcherRef}
              type="button"
              aria-expanded={showMenu}
              aria-controls={panelId}
              aria-label="Pilihan Pando"
              onClick={handleLauncherClick}
              className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white text-left text-ink-strong shadow-[0_10px_24px_rgba(6,24,48,0.18)] transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f4f8ff]"
            >
              <span className="relative grid size-14 shrink-0 place-items-center rounded-full" aria-hidden="true">
                <PandoIcon className="size-[3.25rem]" />
              </span>
            </button>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0.5 top-0.5 size-3 rounded-full bg-emerald-500"
            />
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

