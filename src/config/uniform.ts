export type UniformScheduleItem = {
  day: 1 | 2 | 3 | 4 | 5;
  label: string;
  description: string;
  pandaAsset?: string;
};

// Diisi setelah jadwal resmi sekolah dikonfirmasi.
export const uniformSchedule: readonly UniformScheduleItem[] = [];

export const uniformScheduleStatus = {
  verified: false,
  message:
    "Jadwal seragam resmi belum dipublikasikan pada sumber sekolah yang tersedia.",
} as const;
