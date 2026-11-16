"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Sistema de tema leve (sem dependências).
 * - Script inline no <head> aplica o tema antes da pintura (sem "flash").
 * - Troca animada com View Transitions API: círculo expandindo a partir do clique.
 */
export type Theme = "dark" | "light";
const STORAGE_KEY = "ja-theme";

export const themeScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}var d=document.documentElement;d.classList.add('js');d.classList.toggle('dark',t==='dark');if(sessionStorage.getItem('ja-loaded')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('skip-loader')}else{sessionStorage.setItem('ja-loaded','1')}}catch(e){document.documentElement.classList.add('dark')}})()`;

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";
const getServerSnapshot = (): Theme => "dark";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme, origin?: { x: number; y: number }) => {
    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }, []);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => setTheme(getSnapshot() === "dark" ? "light" : "dark", origin),
    [setTheme],
  );

  return { theme, setTheme, toggle };
}
