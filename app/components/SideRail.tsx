"use client";

import { motion, useReducedMotion } from "framer-motion";

type Section = {
  id: string;
  label: string;
};

export default function SideRail({
  sections,
  activeId,
}: {
  sections: Section[];
  activeId: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.nav
      aria-label="Section indicator"
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      initial={prefersReduced ? undefined : { opacity: 0, x: -10 }}
      animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      {sections.map((section, idx) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
            aria-label={`Jump to ${section.label}`}
          >
            <span
              className={`text-mono text-[10px] tracking-[0.22em] transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground/30"
              }`}
            >
              {String(idx).padStart(2, "0")}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                isActive
                  ? "w-10 bg-foreground"
                  : "w-4 bg-muted-foreground/30 group-hover:w-7 group-hover:bg-muted-foreground"
              }`}
            />
            <span
              className={`text-mono text-[10px] uppercase tracking-[0.22em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </motion.nav>
  );
}
