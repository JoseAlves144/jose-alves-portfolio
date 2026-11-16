"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { indicators, radarAxes, skillGroups, technologies } from "@/data/skills";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { RadarChart } from "./radar-chart";
import { cn, ease } from "@/lib/utils";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between text-sm">
        <span>{name}</span>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.3, delay, ease: ease.out }}
        >
          <span className="absolute top-1/2 right-0 size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
        </motion.div>
      </div>
    </div>
  );
}

function Ring({ label, value }: { label: string; value: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const r = 34;
  const C = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative">
        <svg ref={ref} viewBox="0 0 80 80" className="size-24 -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C * (1 - value / 100) } : {}}
            transition={{ duration: 1.6, ease: ease.out }}
          />
          <defs>
            <linearGradient id="ring-grad">
              <stop offset="0" stopColor="var(--primary)" />
              <stop offset="1" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg font-semibold">
          <Counter value={value} suffix="%" />
        </span>
      </div>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

export function Skills() {
  const [tab, setTab] = useState(0);

  return (
    <section id="skills" className="relative scroll-mt-20 py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title={
            <>
              Um stack completo de <Accent>dados & IA.</Accent>
            </>
          }
          description={`${technologies.length} tecnologias dominadas, do SQL ao agente de IA em produção.`}
        />

        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="glass rounded-3xl p-6 md:p-8">
            <div role="tablist" aria-label="Grupos de skills" className="mb-8 flex flex-wrap gap-1 rounded-full border border-line p-1">
              {skillGroups.map((g, i) => (
                <button
                  key={g.title}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={cn(
                    "relative flex-1 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors",
                    tab === i ? "text-bg" : "text-muted hover:text-fg",
                  )}
                >
                  {tab === i && (
                    <motion.span layoutId="skill-tab" className="absolute inset-0 -z-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{g.title}</span>
                </button>
              ))}
            </div>
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {skillGroups[tab].skills.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 0.08} />
              ))}
            </motion.div>
          </Reveal>

          <Reveal delay={0.1} className="glass flex flex-col items-center justify-center rounded-3xl p-6">
            <p className="mb-2 self-start font-mono text-xs tracking-wider text-muted uppercase">Radar de competências</p>
            <RadarChart axes={radarAxes} />
          </Reveal>

          <Reveal delay={0.15} className="glass grid grid-cols-2 gap-6 rounded-3xl p-6 sm:grid-cols-4 md:p-8 lg:col-span-2">
            {indicators.map((ind) => (
              <Ring key={ind.label} {...ind} />
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2">
          {technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
            >
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
