"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina de progresso de leitura no topo da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary to-accent"
      style={{ scaleX }}
    />
  );
}
