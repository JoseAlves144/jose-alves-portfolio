/**
 * Loading screen premium em CSS puro (zero JavaScript).
 * - Renderizada no servidor e animada por CSS: não atrasa hidratação nem LCP.
 * - Exibida só na primeira visita da sessão: o script de tema adiciona
 *   `skip-loader` ao <html> nas visitas seguintes ou com movimento reduzido.
 * - Estilos em globals.css (.loader, .loader-count, .loader-bar, .loader-steps).
 */
const STEPS = ["Conectando fontes", "Executando ETL", "Treinando modelo", "Renderizando insights"];

export function Loader() {
  return (
    <div aria-hidden className="loader pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg">
      <div className="grid-bg mask-fade-y absolute inset-0 opacity-60" />
      <div className="relative flex w-64 flex-col gap-5">
        <div className="flex items-end justify-between font-mono">
          <span className="h-[1.5em] overflow-hidden text-sm leading-[1.5em] text-muted">
            <span className="loader-steps block">
              {STEPS.map((s) => (
                <span key={s} className="block">
                  <span className="text-accent">&gt;</span> {s}
                  <span className="animate-pulse-soft">_</span>
                </span>
              ))}
            </span>
          </span>
          <span className="loader-count text-4xl font-semibold tabular-nums" />
        </div>
        <div className="h-px w-full overflow-hidden bg-line-strong">
          <div className="loader-bar h-full bg-gradient-to-r from-primary to-accent" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] text-subtle uppercase">José Alves · Data &amp; AI</span>
      </div>
    </div>
  );
}
