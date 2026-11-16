"use client";

import dynamic from "next/dynamic";

/**
 * Efeitos que não aparecem no HTML inicial são baixados depois da hidratação
 * (code splitting), aliviando o carregamento da página.
 */
const Cursor = dynamic(() => import("./cursor").then((m) => m.Cursor), { ssr: false });
const EasterEggs = dynamic(() => import("./easter-eggs").then((m) => m.EasterEggs), { ssr: false });

export function DeferredEffects() {
  return (
    <>
      <Cursor />
      <EasterEggs />
    </>
  );
}
