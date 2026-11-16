"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Inclinação máxima em graus */
  max?: number;
  /** Exibe spotlight que segue o mouse */
  spotlight?: boolean;
};

/**
 * Card premium: hover 3D (tilt), spotlight que segue o mouse e borda em gradiente.
 * Implementação leve: escreve variáveis CSS direto no elemento (sem re-render
 * e sem springs em JS). Tilt desativado com prefers-reduced-motion e em toque.
 */
export function TiltCard({ children, className, max = 8, spotlight = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useRef<boolean | null>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (e.pointerType !== "mouse" || !el) return;
    reduce.current ??= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce.current) {
      el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty("--rx", `${-(py - 0.5) * max * 2}deg`);
    }
  }

  function onLeave() {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group gradient-border relative rounded-3xl border border-line bg-surface/70 backdrop-blur-sm",
        "[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
        "transition-[transform,border-color] duration-300 ease-out hover:border-transparent",
        className,
      )}
      data-cursor="hover"
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), var(--glow), transparent 60%)" }}
        />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  );
}
