"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Axis = { label: string; value: number };

/** Gráfico radar em SVG puro com animação de entrada. */
export function RadarChart({ axes, size = 320 }: { axes: readonly Axis[]; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = size / 2;
  const R = c - 48;
  const n = axes.length;

  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(a) * R * (v / 100), c + Math.sin(a) * R * (v / 100)] as const;
  };

  const poly = (v: (i: number) => number) =>
    axes.map((_, i) => point(i, v(i)).join(",")).join(" ");

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[360px]" role="img" aria-label="Radar de competências">
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {[25, 50, 75, 100].map((lvl) => (
        <polygon key={lvl} points={poly(() => lvl)} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="var(--line)" />;
      })}
      <motion.polygon
        points={poly((i) => axes[i].value)}
        fill="url(#radar-fill)"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ transformOrigin: `${c}px ${c}px` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {axes.map((a, i) => {
        const [x, y] = point(i, a.value);
        const [lx, ly] = point(i, 122);
        return (
          <g key={a.label}>
            <motion.circle
              cx={x}
              cy={y}
              r="4"
              fill="var(--accent)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.06 }}
            />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-geist-mono)">
              {a.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
