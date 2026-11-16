"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn, ease } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

/**
 * Navbar inteligente:
 *  - esconde ao rolar para baixo e reaparece ao subir;
 *  - ganha fundo glass após sair do topo;
 *  - destaca a seção visível (scroll spy) com indicador animado.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 320 && !open);
  });

  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const href = (id: string) => (id === "blog" && !isHome ? "/blog" : `/#${id}`);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: ease.out }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav
          aria-label="Principal"
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 pl-4 transition-all duration-500",
            scrolled || !isHome ? "glass shadow-[0_8px_40px_-20px_rgba(0,0,0,0.5)]" : "border border-transparent",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={href(item.id)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/#contato" className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}>
              Vamos conversar <ArrowUpRight />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-full border border-line lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="flex h-full flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={href(item.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 text-4xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
