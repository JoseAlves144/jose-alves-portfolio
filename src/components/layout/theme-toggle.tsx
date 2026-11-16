"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

/** Botão de tema com ícone animado e transição circular de página inteira. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
