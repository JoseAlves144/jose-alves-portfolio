"use client";

import { expertiseAreas } from "@/data/profile";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Grade "bento" de áreas de especialização. */
export function Expertise() {
  return (
    <section id="especializacao" className="relative scroll-mt-20 py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="Especialização"
          title={
            <>
              Da regra de negócio ao <Accent>modelo de IA.</Accent>
            </>
          }
          description="Atuação ponta a ponta no ciclo de dados, com profundidade em risco e saúde suplementar."
        />

        <Stagger className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expertiseAreas.map((area) => (
            <RevealItem key={area.title} className={cn(area.featured && "lg:col-span-2")}>
              <TiltCard max={5} className="h-full p-6">
                <div className="flex h-full flex-col">
                  <span className="mb-6 grid size-11 place-items-center rounded-xl border border-line bg-gradient-to-br from-primary/15 to-accent/10 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <area.icon className="size-5" />
                  </span>
                  <h3 className={cn("font-semibold tracking-tight", area.featured ? "text-2xl" : "text-lg")}>
                    {area.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{area.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {area.tags.map((t) => (
                      <Badge key={t} size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
