import { cn } from "@/lib/utils";

/**
 * Scroll reveal leve (sem JS por elemento).
 * - O estado inicial/final é CSS (.reveal / .stagger em globals.css).
 * - Um único IntersectionObserver global (<RevealObserver />) adiciona `.in`.
 * - Só esconde o conteúdo quando há JS (`html.js`), então nada some sem JavaScript.
 */
type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Reveal({ delay = 0, className, style, ...props }: DivProps & { delay?: number }) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? ({ "--d": `${delay}s`, ...style } as React.CSSProperties) : style}
      {...props}
    />
  );
}

/** Container cujos filhos diretos aparecem em sequência. */
export function Stagger({ className, ...props }: DivProps) {
  return <div className={cn("stagger", className)} {...props} />;
}

/** Item de um <Stagger>. Mantido para semântica/legibilidade. */
export function RevealItem(props: DivProps) {
  return <div {...props} />;
}
