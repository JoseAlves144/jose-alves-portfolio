"use client";

import { useEffect, useRef } from "react";

/**
 * Partículas em forma de "rede de dados": nós conectados que reagem ao mouse.
 * - Canvas 2D puro (sem libs), DPR limitado a 2.
 * - Pausa fora da viewport e com a aba oculta.
 * - Com prefers-reduced-motion desenha apenas um quadro estático.
 */
export function DataNetwork({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };
    let colors = { a: "37,99,235", b: "6,182,212" };

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean };
    let nodes: Node[] = [];

    const readColors = () => {
      const dark = document.documentElement.classList.contains("dark");
      colors = dark ? { a: "59,130,246", b: "6,182,212" } : { a: "37,99,235", b: "8,145,178" };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hot: Math.random() < 0.08, // poucos nós "anômalos" em ciano: alusão à detecção de fraudes
      }));
    };

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          // leve atração ao cursor
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            n.x += dx * 0.004;
            n.y += dy * 0.004;
          }
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${colors.a},${(1 - d / LINK) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (md < 180) {
          ctx.strokeStyle = `rgba(${colors.b},${(1 - md / 180) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = n.hot ? `rgba(${colors.b},0.95)` : `rgba(${colors.a},0.6)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hot ? n.r + 1 : n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hot) {
          ctx.fillStyle = `rgba(${colors.b},0.12)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      if (visible && !document.hidden) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    readColors();
    resize();
    const themeObs = new MutationObserver(() => {
      readColors();
      if (reduce) draw();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);

    // Inicia só quando o navegador estiver ocioso: não compete com o carregamento inicial
    const start = () => {
      if (reduce) return draw();
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
