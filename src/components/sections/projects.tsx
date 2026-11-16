"use client";

import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { ProjectVisual } from "./project-visual";
import { cn } from "@/lib/utils";

// Code splitting: o modal só é baixado quando o usuário abre um projeto
const ProjectModal = dynamic(() => import("./project-modal").then((m) => m.ProjectModal), { ssr: false });

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projetos" className="relative scroll-mt-20 py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow="Projetos"
          title={
            <>
              Problemas complexos, <Accent>soluções mensuráveis.</Accent>
            </>
          }
          description="Uma seleção de entregas que unem dados, IA e automação. Clique em um projeto para ver problema, solução e resultado."
        />

        <Stagger className="grid gap-5 md:grid-cols-6">
          {projects.map((p, i) => (
            <RevealItem key={p.slug} className={cn(p.featured ? "md:col-span-3" : "md:col-span-2")}>
              <TiltCard max={4} className="h-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className="flex h-full w-full flex-col text-left"
                  aria-label={`Ver detalhes: ${p.title}`}
                >
                  <ProjectVisual variant={p.variant} className={cn("w-full", p.featured ? "aspect-[16/9]" : "aspect-[4/3]")} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-wider text-subtle uppercase">
                      <span>{p.tagline}</span>
                      <span>0{i + 1}</span>
                    </div>
                    <h3 className={cn("font-semibold tracking-tight", p.featured ? "text-2xl" : "text-lg")}>{p.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <Badge key={s} size="sm">
                            {s}
                          </Badge>
                        ))}
                      </div>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </RevealItem>
          ))}
        </Stagger>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
