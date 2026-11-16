import { technologies } from "@/data/skills";

/** Faixa infinita de tecnologias (CSS puro, pausa no hover). */
export function TechMarquee() {
  const items = [...technologies, ...technologies];
  return (
    <section aria-label="Tecnologias" className="relative border-y border-line bg-surface/40 py-6">
      <div className="mask-fade-x group flex overflow-hidden">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <li
              key={`${t}-${i}`}
              aria-hidden={i >= technologies.length}
              className="flex items-center gap-10 font-mono text-sm whitespace-nowrap text-muted"
            >
              {t}
              <span className="size-1 rounded-full bg-accent/60" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
