"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/**
 * Easter eggs sutis:
 *  1. Mensagem no console para quem inspeciona o código.
 *  2. Código Konami (↑↑↓↓←→←→BA) → "auditoria antifraude" do visitante.
 *  3. Digitar "select" em qualquer lugar → mesma notificação, versão SQL.
 *  4. Evento "ja:egg" disparado por outros componentes (ex.: 5 cliques no logo).
 */
export function EasterEggs() {
  const [toast, setToast] = useState<null | { title: string; body: string }>(null);

  useEffect(() => {
    console.log(
      "%c José Alves %c Data · Analytics · IA ",
      "background:#2563eb;color:#fff;padding:6px 10px;border-radius:6px 0 0 6px;font-weight:700",
      "background:#06b6d4;color:#09090b;padding:6px 10px;border-radius:0 6px 6px 0",
    );
    console.log(
      "%cCurioso pelo código? Você tem o perfil certo. Vamos conversar → " + "linkedin.com/in/josé-alves-825735168",
      "color:#06b6d4",
    );
    console.log("%cDica: tente ↑ ↑ ↓ ↓ ← → ← → B A", "color:#71717a;font-style:italic");

    let seq: string[] = [];
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;
      seq = [...seq, e.key].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        setToast({
          title: "Anomalia detectada",
          body: "Score de risco do visitante: 0%. Padrão identificado: curiosidade acima da média. ✔",
        });
        seq = [];
      }
      typed = (typed + e.key.toLowerCase()).slice(-6);
      if (typed === "select") {
        setToast({
          title: "SELECT * FROM talentos",
          body: "WHERE nome = 'José Alves' → 1 linha retornada em 0,001s.",
        });
      }
    };
    const onEgg = (e: Event) => setToast((e as CustomEvent).detail);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ja:egg", onEgg);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ja:egg", onEgg);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="glass fixed right-4 bottom-4 z-[150] flex max-w-sm gap-3 rounded-2xl p-4 shadow-2xl"
        >
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" />
          <div>
            <p className="font-mono text-sm font-semibold">{toast.title}</p>
            <p className="mt-1 text-sm text-muted">{toast.body}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
