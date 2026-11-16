"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/timeline";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn, ease } from "@/lib/utils";

/** Timeline vertical com linha que "acende" conforme o scroll. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 50%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="trajetoria" className="relative scroll-mt-20 py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Trajetória"
          title={
            <>
              Uma década de <Accent>evolução contínua.</Accent>
            </>
          }
        />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-line-strong md:left-1/2" />
          <motion.div
            className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-primary via-accent to-accent md:left-1/2"
            style={{ scaleY }}
          />
          <ol>
          {timeline.map((item, i) => {
            const right = i % 2 === 1;
            return (
              <li key={i} className="relative mb-14 pl-10 last:mb-0 md:w-1/2 md:pl-0 md:odd:pr-14 md:even:ml-auto md:even:pl-14">
                <span
                  className={cn(
                    "absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-bg md:left-auto",
                    right ? "md:-left-[7.5px]" : "md:-right-[7.5px]",
                    item.current ? "bg-accent shadow-[0_0_0_6px_color-mix(in_oklab,var(--accent)_20%,transparent)]" : "bg-line-strong",
                  )}
                />
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: ease.out }}
                  className={cn("glass rounded-3xl p-6 transition-colors hover:border-line-strong", !right && "md:text-right")}
                >
                  <span className="font-mono text-xs tracking-wider text-accent uppercase">{item.period}</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{item.role}</h3>
                  <p className="text-sm text-muted">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  <div className={cn("mt-4 flex flex-wrap gap-1.5", !right && "md:justify-end")}>
                    {item.highlights.map((h) => (
                      <Badge key={h} size="sm">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
