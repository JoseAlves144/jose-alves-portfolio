import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Cabeçalho padrão de seção: índice mono + eyebrow + título + descrição. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 flex flex-col gap-4 md:mb-20",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}

/** Destaque em serifa itálica usado nos títulos */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-serif font-normal italic text-gradient">{children}</span>;
}
