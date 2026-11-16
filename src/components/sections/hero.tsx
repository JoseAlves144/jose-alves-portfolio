"use client";

import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroRoles, heroStats } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Aurora } from "@/components/effects/aurora";
import { DataNetwork } from "@/components/effects/data-network";
import { QueryConsole } from "./query-console";
import { cn, ease } from "@/lib/utils";

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroRoles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={heroRoles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: ease.out }}
          className="font-medium text-fg"
        >
          {heroRoles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line1 = ["Transformo", "dados"];
  const line2 = ["em", "decisões."];

  return (
    <section ref={ref} id="inicio" className="noise relative flex min-h-svh items-center overflow-hidden pt-28 pb-16">
      <Aurora />
      <div className="grid-bg mask-fade-y absolute inset-0" />
      <DataNetwork className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div style={{ y: yText, opacity }}>
          <div
            className="anim-fade-up glass mb-8 inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-xs text-muted"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 font-medium text-accent">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              Disponível
            </span>
            para projetos e consultorias
          </div>

          <h1 className="text-[clamp(2.75rem,7.5vw,5.75rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
            <span className="sr-only">José Alves, Especialista em Dados. </span>
            <span className="flex flex-wrap gap-x-[0.25em]" aria-hidden>
              {line1.map((w, i) => (
                <span key={w} className="overflow-hidden pb-[0.08em]">
                  <span className="anim-rise" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
            <span className="flex flex-wrap gap-x-[0.25em]" aria-hidden>
              {line2.map((w, i) => (
                <span key={w} className="overflow-hidden pb-[0.12em]">
                  <span
                    className={cn("anim-rise", i === 1 && "font-serif font-normal italic text-gradient pr-[0.05em]")}
                    style={{ animationDelay: `${0.15 + (i + 2) * 0.08}s` }}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div className="anim-fade-up" style={{ animationDelay: "0.45s" }}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted">
              Sou <strong className="font-semibold text-fg">José Alves</strong>, Especialista em Dados com mais de 10
              anos transformando grandes volumes de dados em indicadores, automações e soluções com IA.
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-sm text-muted">
              <Sparkles className="size-4 text-accent" /> Foco atual: <RotatingRole />
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href="#projetos" className={buttonVariants({ variant: "gradient", size: "lg" })}>
                  Ver projetos
                  <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="#contato" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Falar comigo
                </Link>
              </Magnetic>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-muted">{s.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">
                    <span className="sr-only">{`${s.value}${s.suffix}`}</span>
                    <span aria-hidden className="count-up" style={{ "--to": s.value } as React.CSSProperties}>
                      {s.suffix}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>

        <motion.div style={{ y: yCard }} className="hidden md:block">
          <div className="anim-fade-up" style={{ animationDelay: "0.4s", animationDuration: "1.1s" }}>
            <QueryConsole />
          </div>
        </motion.div>
      </div>

      <Link
        href="#sobre"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-subtle uppercase md:flex"
      >
        scroll<span className="sr-only"> para a próxima seção</span>
        <motion.span aria-hidden animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </Link>
    </section>
  );
}
