import { cn } from "@/lib/utils";

/**
 * Fundo animado com "blobs" de luz.
 * Usa gradientes radiais (suaves por natureza) em vez de filter: blur,
 * que é caro em CPUs modestas. Só anima transform: roda na GPU.
 */
export function Aurora({ className }: { className?: string }) {
  const blob = "absolute rounded-full animate-aurora will-change-transform";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(blob, "-top-1/3 left-1/4 h-[70vmax] w-[70vmax]")}
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 22%, transparent), transparent)" }}
      />
      <div
        className={cn(blob, "top-1/4 -right-1/4 h-[55vmax] w-[55vmax]")}
        style={{
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 18%, transparent), transparent)",
          animationDelay: "-6s",
        }}
      />
      <div
        className={cn(blob, "-bottom-1/3 -left-1/4 h-[50vmax] w-[50vmax]")}
        style={{
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
