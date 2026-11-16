"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Database, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TiltCard } from "@/components/ui/tilt-card";

/**
 * Elemento-assinatura do hero: um "console" que simula um agente de IA
 * gerando SQL no BigQuery e devolvendo um resultado executivo de risco.
 * Ilustrativo — os números são fictícios.
 */
const QUESTION = "Quais prestadores têm maior risco de fraude este mês?";
const SQL = `SELECT prestador, score_risco
FROM fraude.indicadores
WHERE mes = CURRENT_MONTH()
ORDER BY score_risco DESC
LIMIT 4;`;

const ROWS = [
  { name: "Prestador A-17", score: 94 },
  { name: "Prestador C-03", score: 81 },
  { name: "Prestador B-42", score: 67 },
  { name: "Prestador D-09", score: 38 },
];

export function QueryConsole() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Só anima quando visível (no celular o console fica oculto: zero trabalho)
  const inView = useInView(ref, { margin: "-40px" });
  const [typed, setTyped] = useState(reduce ? SQL.length : 0);
  const [cycle, setCycle] = useState(0);
  const done = typed >= SQL.length;

  useEffect(() => {
    if (reduce || !inView) return;
    if (!done) {
      const t = setTimeout(() => setTyped((v) => v + 2), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(0);
      setCycle((c) => c + 1);
    }, 7000);
    return () => clearTimeout(t);
  }, [typed, done, reduce, inView]);

  return (
    <div ref={ref}>
    <TiltCard max={6} className="overflow-hidden shadow-[0_40px_120px_-40px_var(--glow)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-subtle">
          <Database className="size-3" /> bigquery · agente-ia
        </span>
      </div>

      <div className="space-y-5 p-5 font-mono text-[12.5px] leading-relaxed">
        <div className="flex gap-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-surface-2 text-[10px] text-muted">
            VC
          </span>
          <p className="text-fg">{QUESTION}</p>
        </div>

        <div className="flex gap-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-gradient-to-br from-primary to-accent text-white">
            <Bot className="size-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <pre className="min-h-[7.5em] overflow-hidden rounded-lg border border-line bg-bg/60 p-3 whitespace-pre-wrap text-muted">
              <code>
                {highlight(SQL.slice(0, typed))}
                {!done && <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent" />}
              </code>
            </pre>

            <motion.div
              key={cycle}
              initial={false}
              animate={{ opacity: done ? 1 : 0.25 }}
              className="mt-4 space-y-2.5"
            >
              <div className="flex items-center justify-between text-[11px] text-subtle">
                <span className="flex items-center gap-1.5">
                  <Play className="size-3 text-accent" /> 4 linhas · 0,8s
                </span>
                <span>score_risco</span>
              </div>
              {ROWS.map((r, i) => (
                <div key={r.name} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3">
                  <span className="truncate text-muted">{r.name}</span>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      className={r.score > 75 ? "h-full rounded-full bg-gradient-to-r from-primary to-accent" : "h-full rounded-full bg-subtle/60"}
                      initial={{ width: 0 }}
                      animate={{ width: done ? `${r.score}%` : 0 }}
                      transition={{ duration: 0.9, delay: done ? i * 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className={r.score > 75 ? "text-right text-accent" : "text-right text-subtle"}>{r.score}</span>
                </div>
              ))}
              <p className="pt-2 font-sans text-[13px] leading-snug text-fg">
                <span className="text-accent">→</span> 2 prestadores acima do limite de risco. Recomendo auditoria
                prioritária.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </TiltCard>
    </div>
  );
}

/** Realce de sintaxe mínimo para palavras-chave SQL */
function highlight(code: string) {
  const parts = code.split(/(\b(?:SELECT|FROM|WHERE|ORDER BY|DESC|LIMIT)\b)/g);
  return parts.map((p, i) =>
    /^(SELECT|FROM|WHERE|ORDER BY|DESC|LIMIT)$/.test(p) ? (
      <span key={i} className="text-accent">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}
