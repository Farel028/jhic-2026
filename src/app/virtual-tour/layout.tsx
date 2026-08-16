import type { ReactNode } from "react";

export default function VirtualTourLayout({ children }: { children: ReactNode }) {
  return (
    <div data-immersive-page className="flex min-h-dvh flex-1">
      {children}
    </div>
  );
}
