"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { aboutParagraphs, evolution } from "@/data/profile";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ease } from "@/lib/utils";

/** Seção Sobre: história + evolução profissional como um pipeline de dados. */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="sobre" className="relative scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="01"
          eyebrow="Sobre"
          title={
            <>
              Dados só importam quando <Accent>viram ação.</Accent>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-pretty text-muted">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-xl text-fg" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Pipeline de evolução */}
          <div ref={ref} className="relative pl-10">
            <div className="absolute top-2 bottom-2 left-[15px] w-px bg-line-strong" />
            <motion.div
              className="absolute top-2 left-[15px] w-px bg-gradient-to-b from-primary to-accent"
              style={{ height: progress }}
            />
            <ol className="space-y-5">
              {evolution.map((step, i) => (
                <motion.li
                  key={step.label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: ease.out }}
                  className="group relative"
                >
                  <span className="absolute top-1/2 -left-10 grid size-[31px] -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                    <step.icon className="size-3.5" />
                  </span>
                  <div className="glass flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition-all duration-300 group-hover:translate-x-1 group-hover:border-line-strong">
                    <div>
                      <p className="font-semibold">{step.label}</p>
                      <p className="text-sm text-muted">{step.caption}</p>
                    </div>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
