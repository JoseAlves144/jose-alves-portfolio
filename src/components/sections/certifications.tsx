"use client";

import { Award, ExternalLink, Hourglass } from "lucide-react";
import { certifications } from "@/data/certifications";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

/** Certificações: itens "earned" mostram link de verificação; "planned" aparecem como em preparação. */
export function Certifications() {
  return (
    <section id="certificacoes" className="relative scroll-mt-20 py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="07"
          eyebrow="Certificações"
          title={
            <>
              Aprendizado <Accent>contínuo.</Accent>
            </>
          }
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => {
            const earned = c.status === "earned";
            return (
              <RevealItem key={c.name}>
                <div className={`flex h-full flex-col rounded-3xl border p-6 transition-colors ${earned ? "glass hover:border-accent/40" : "border-dashed border-line-strong"}`}>
                  <div className="mb-6 flex items-center justify-between">
                    <span className={`grid size-10 place-items-center rounded-xl ${earned ? "bg-accent/15 text-accent" : "bg-surface-2 text-subtle"}`}>
                      {earned ? <Award className="size-5" /> : <Hourglass className="size-5" />}
                    </span>
                    <Badge size="sm" variant={earned ? "accent" : "default"}>
                      {earned ? c.date : "em preparação"}
                    </Badge>
                  </div>
                  <p className="font-semibold leading-snug">{c.name}</p>
                  <p className="mt-1 flex-1 text-sm text-muted">{c.issuer}</p>
                  {earned && c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                      Verificar credencial <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
