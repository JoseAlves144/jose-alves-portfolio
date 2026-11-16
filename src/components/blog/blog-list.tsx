"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { blogCategories, posts, type BlogCategory } from "@/data/posts";
import { PostCard } from "./post-card";
import { cn } from "@/lib/utils";

/** Lista de artigos com filtro animado por categoria. */
export function BlogList() {
  const [cat, setCat] = useState<BlogCategory | "Todos">("Todos");
  const sorted = [...posts].sort((a, b) => Number(a.draft) - Number(b.draft) || b.date.localeCompare(a.date));
  const visible = cat === "Todos" ? sorted : sorted.filter((p) => p.category === cat);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        {(["Todos", ...blogCategories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all",
              cat === c ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length === 0 && (
        <p className="py-16 text-center text-muted">Nenhum artigo nesta categoria ainda. Em breve! ✍️</p>
      )}
    </>
  );
}
