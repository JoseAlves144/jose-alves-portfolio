"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lightbulb, Target, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectVisual } from "./project-visual";
import { ease } from "@/lib/utils";

/** Modal de detalhes do projeto (Problema → Solução → Resultado). */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
  }, [project, onClose]);

  // Portal no <body>: o modal não é afetado por containment/transform das seções
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: ease.out }}
            className="gradient-border relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface shadow-2xl sm:rounded-3xl"
          >
            <ProjectVisual variant={project.variant} className="aspect-[21/9] w-full" />
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Fechar"
              className="glass absolute top-4 right-4 grid size-10 place-items-center rounded-full"
            >
              <X className="size-4" />
            </button>
            <div className="p-6 sm:p-10">
              <p className="font-mono text-xs tracking-wider text-accent uppercase">{project.tagline}</p>
              <h3 id="project-title" className="mt-2 text-3xl font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Badge key={s} variant="accent">
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Problema", text: project.problem, icon: Target },
                  { label: "Solução", text: project.solution, icon: Lightbulb },
                  { label: "Resultado", text: project.result, icon: CheckCircle2 },
                ].map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    className="rounded-2xl border border-line bg-surface-2/60 p-5"
                  >
                    <b.icon className="mb-3 size-5 text-accent" />
                    <p className="text-sm font-semibold">{b.label}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
