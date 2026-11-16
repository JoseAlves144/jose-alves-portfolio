import Link from "next/link";
import { Mail } from "lucide-react";
import { navItems, siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

export const socialLinks = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon },
  { label: "E-mail", href: `mailto:${siteConfig.links.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted">{siteConfig.shortDescription}</p>
          <div className="mt-6 flex gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
          {navItems.map((n) => (
            <Link key={n.id} href={n.id === "blog" ? "/blog" : `/#${n.id}`} className="text-muted transition-colors hover:text-fg">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 border-t border-line px-6 py-6 font-mono text-xs text-subtle sm:flex-row">
        <span>© {siteConfig.copyrightYear} {siteConfig.name}. Todos os direitos reservados.</span>
        <span title="Psst: tente digitar 'select' em qualquer lugar da página">
          Feito com Next.js, dados e café ☕ <span className="text-accent">●</span> status: operacional
        </span>
      </div>
    </footer>
  );
}
