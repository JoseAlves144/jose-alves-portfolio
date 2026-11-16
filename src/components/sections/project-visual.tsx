import type { ProjectVariant } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Ilustrações vetoriais dos projetos — geradas por código, zero bytes de imagem,
 * nítidas em qualquer resolução e adaptadas ao tema via variáveis CSS.
 */
export function ProjectVisual({ variant, className }: { variant: ProjectVariant; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary/10 via-surface-2 to-accent/10",
        className,
      )}
    >
      <div className="grid-bg absolute inset-0 opacity-70" />
      <svg viewBox="0 0 400 220" className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.04]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`g-${variant}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        {VISUALS[variant](`url(#g-${variant})`)}
      </svg>
    </div>
  );
}

const VISUALS: Record<ProjectVariant, (grad: string) => React.ReactNode> = {
  fraud: (g) => {
    const pts = [[60,150],[95,120],[130,135],[165,90],[200,110],[235,70],[270,95],[305,60],[340,80]];
    return (
      <>
        {pts.slice(1).map(([x, y], i) => (
          <line key={i} x1={pts[i][0]} y1={pts[i][1]} x2={x} y2={y} stroke="var(--line-strong)" strokeWidth="1.5" />
        ))}
        {[[90,60],[150,170],[250,160],[320,150],[120,80],[290,130],[60,90],[200,170]].map(([x, y], i) => (
          <circle key={`s${i}`} cx={x} cy={y} r="3" fill="var(--subtle)" opacity="0.5" />
        ))}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="var(--muted)" />
        ))}
        <circle cx="235" cy="70" r="22" fill="none" stroke={g} strokeWidth="2" strokeDasharray="4 4" className="origin-[235px_70px] animate-spin-slow" />
        <circle cx="235" cy="70" r="7" fill={g} />
        <rect x="258" y="22" width="92" height="26" rx="13" fill="var(--surface)" stroke="var(--line-strong)" />
        <text x="304" y="39" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--accent)">risco 94%</text>
      </>
    );
  },
  agent: (g) => (
    <>
      <rect x="40" y="40" width="200" height="34" rx="17" fill="var(--surface)" stroke="var(--line-strong)" />
      <text x="58" y="61" fontSize="11" fontFamily="sans-serif" fill="var(--muted)">Qual a sinistralidade por região?</text>
      <rect x="150" y="92" width="210" height="88" rx="14" fill="var(--surface)" stroke={g} strokeWidth="1.5" />
      <text x="168" y="116" fontSize="10" fontFamily="monospace" fill="var(--accent)">SELECT regiao,</text>
      <text x="168" y="132" fontSize="10" fontFamily="monospace" fill="var(--muted)">  SUM(sinistro)/SUM(premio)</text>
      <text x="168" y="148" fontSize="10" fontFamily="monospace" fill="var(--accent)">FROM</text>
      <text x="200" y="148" fontSize="10" fontFamily="monospace" fill="var(--muted)">saude.contratos</text>
      <text x="168" y="164" fontSize="10" fontFamily="monospace" fill="var(--accent)">GROUP BY</text>
      <text x="224" y="164" fontSize="10" fontFamily="monospace" fill="var(--muted)">regiao</text>
      <circle cx="120" cy="136" r="18" fill={g} />
      <path d="M113 136h14M120 129v14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  automation: (g) => (
    <>
      {[60, 165, 270].map((x, i) => (
        <g key={x}>
          <rect x={x} y="85" width="70" height="50" rx="12" fill="var(--surface)" stroke={i === 1 ? g : "var(--line-strong)"} strokeWidth="1.5" />
          <rect x={x + 14} y="102" width="42" height="5" rx="2.5" fill="var(--muted)" opacity="0.6" />
          <rect x={x + 14} y="113" width="28" height="5" rx="2.5" fill="var(--subtle)" opacity="0.5" />
        </g>
      ))}
      <path d="M130 110h35M235 110h35" stroke={g} strokeWidth="2" strokeDasharray="5 5">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <circle cx="200" cy="50" r="16" fill="none" stroke={g} strokeWidth="2" />
      <path d="M200 40v10l7 5" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="200" y="170" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--muted)">−horas manuais</text>
    </>
  ),
  dashboard: (g) => (
    <>
      <rect x="40" y="30" width="320" height="160" rx="14" fill="var(--surface)" stroke="var(--line-strong)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={56 + i * 100} y="46" width="88" height="34" rx="8" fill="var(--surface-2)" />
          <rect x={66 + i * 100} y="56" width="30" height="5" rx="2.5" fill="var(--subtle)" />
          <rect x={66 + i * 100} y="66" width={50 - i * 8} height="7" rx="3" fill={i === 0 ? g : "var(--muted)"} />
        </g>
      ))}
      {[50, 72, 40, 90, 66, 100, 84].map((h, i) => (
        <rect key={i} x={60 + i * 24} y={176 - h * 0.8} width="14" height={h * 0.8} rx="3" fill={i === 5 ? g : "var(--line-strong)"} />
      ))}
      <path d="M240 160 L270 140 L295 148 L340 104" fill="none" stroke={g} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="340" cy="104" r="4" fill="var(--accent)" />
    </>
  ),
  pipeline: (g) => (
    <>
      {[
        { x: 40, label: "ingest" },
        { x: 150, label: "transform" },
        { x: 260, label: "serve" },
      ].map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="80" width="100" height="60" rx="12" fill="var(--surface)" stroke={i === 2 ? g : "var(--line-strong)"} strokeWidth="1.5" />
          <text x={s.x + 50} y="115" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={i === 2 ? "var(--accent)" : "var(--muted)"}>
            {s.label}
          </text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i}>
          <line x1={140 + i * 110} y1="110" x2={150 + i * 110} y2="110" stroke="var(--line-strong)" strokeWidth="2" />
          <circle r="3.5" fill="var(--accent)">
            <animateMotion dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" path={`M${40 + i * 110} 60 H${150 + i * 110 + 100}`} />
          </circle>
        </g>
      ))}
      <ellipse cx="90" cy="175" rx="26" ry="8" fill="none" stroke="var(--muted)" />
      <path d="M64 175v14c0 4 12 8 26 8s26-4 26-8v-14" fill="none" stroke="var(--muted)" />
    </>
  ),
};
