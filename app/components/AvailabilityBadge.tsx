"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AvailabilityBadge() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.a
      href="#contact"
      className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:border-white/30 hover:text-foreground"
      initial={prefersReduced ? undefined : { opacity: 0 }}
      animate={prefersReduced ? undefined : { opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      aria-label="Available for hire"
    >
      <span className="relative flex h-1.5 w-1.5">
        {!prefersReduced && (
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-[#34d399]"
            style={{ animation: "pulse-soft 2.4s ease-out infinite" }}
          />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34d399]" />
      </span>
      Open to opportunities
      <span
        className="text-foreground/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden="true"
      >
        →
      </span>
    </motion.a>
  );
}
