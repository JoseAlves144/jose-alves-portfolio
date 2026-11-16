"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor personalizado: ponto preciso + anel com inércia.
 * O anel cresce sobre links, botões e elementos com [data-cursor="hover"].
 * Só ativa em dispositivos com mouse e sem prefers-reduced-motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- habilita só no cliente
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role=button], [data-cursor=hover], input, textarea, select"));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          scale: down ? 0.8 : 1,
          backgroundColor: hover ? "rgba(6,182,212,0.12)" : "rgba(6,182,212,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </>
  );
}
