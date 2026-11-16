"use client";

import Link from "next/link";
import { useRef } from "react";

/** Monograma "JA". Easter egg: 5 cliques rápidos disparam uma mensagem. */
export function Logo() {
  const clicks = useRef<number[]>([]);

  function onClick() {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 1500), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      window.dispatchEvent(
        new CustomEvent("ja:egg", {
          detail: { title: "Outlier encontrado 🎯", body: "5 cliques em 1,5s: comportamento fora do desvio padrão. Gostei." },
        }),
      );
    }
  }

  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-2.5">
      <span aria-hidden className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent font-mono text-sm font-bold text-white shadow-[0_8px_30px_-8px_var(--accent)]">
        JA
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </span>
      <span className="sr-only sm:hidden">José Alves — início</span>
      <span className="hidden text-sm leading-tight font-semibold sm:block">
        José Alves
        <span className="block font-mono text-[10px] font-normal tracking-wider text-muted">DATA · AI</span>
      </span>
    </Link>
  );
}
