export function PrototypeNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-ink/20 bg-white px-4 py-3 text-sm font-medium leading-6 text-ink-muted">
      <span className="font-extrabold text-ink-strong">Prototype. </span>
      {children}
    </p>
  );
}
