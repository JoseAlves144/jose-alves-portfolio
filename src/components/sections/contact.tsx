"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";
import { Accent } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Aurora } from "@/components/effects/aurora";

const channels = [
  { label: "LinkedIn", value: "José Alves", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: siteConfig.links.github.replace("https://", ""), href: siteConfig.links.github, icon: GithubIcon },
  { label: "E-mail", value: siteConfig.links.email, href: `mailto:${siteConfig.links.email}`, icon: Mail },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API indisponível (HTTP, permissão negada): abre o cliente de e-mail.
      window.location.href = `mailto:${siteConfig.links.email}`;
    }
  }

  return (
    <section id="contato" className="relative scroll-mt-20 px-4 py-28 md:py-32">
      <div className="noise gradient-border relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-line bg-surface/60 px-6 py-20 md:px-16 md:py-28">
        <Aurora className="opacity-70" />
        <div className="grid-bg mask-fade-y absolute inset-0" />
        <div className="relative grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
              <span className="text-accent">09</span> — Contato
            </span>
            <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-tight text-balance md:text-7xl">
              Vamos transformar seus dados em <Accent>resultado?</Accent>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Aberto a oportunidades, consultorias e projetos em Dados, Fraudes, BI e IA.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "gradient", size: "lg" })}>
                  Conversar no LinkedIn <ArrowUpRight />
                </a>
              </Magnetic>
              <button onClick={copyEmail} className={buttonVariants({ variant: "outline", size: "lg" })}>
                {copied ? <Check className="text-accent" /> : <Copy />}
                {copied ? "E-mail copiado!" : "Copiar e-mail"}
              </button>
            </div>
          </Reveal>

          <Stagger className="grid gap-3">
            {channels.map((c) => (
              <RevealItem key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:translate-x-1 hover:border-accent/40"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-muted transition-colors group-hover:bg-accent group-hover:text-bg">
                    <c.icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{c.label}</span>
                    <span className="block truncate text-sm text-muted">{c.value}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-subtle transition-all group-hover:rotate-45 group-hover:text-accent" />
                </a>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
