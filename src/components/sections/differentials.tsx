"use client";

import { differentials } from "@/data/profile";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function Differentials() {
  return (
    <section id="diferenciais" className="relative scroll-mt-20 overflow-hidden py-28 md:py-32">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="06"
          eyebrow="Diferenciais"
          title={
            <>
              O que me <Accent>diferencia.</Accent>
            </>
          }
          description="Técnica é pré-requisito. O valor está em conectar dados, negócio e pessoas."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((d, i) => (
            <RevealItem key={d.title} className={i === 0 ? "sm:col-span-2" : undefined}>
              <TiltCard max={6} className="h-full p-6">
                <div className="flex h-full flex-col">
                  <div className="mb-8 flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_10px_30px_-10px_var(--accent)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <d.icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </div>
                  <h3 className={i === 0 ? "text-3xl font-semibold tracking-tight" : "text-lg font-semibold"}>{d.title}</h3>
                  <p className={i === 0 ? "mt-3 text-lg leading-relaxed text-muted" : "mt-2 text-sm leading-relaxed text-muted"}>
                    {d.description}
                  </p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
