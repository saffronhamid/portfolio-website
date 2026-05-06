"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AvailabilityBadge() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.a
      href="#contact"
      className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-[#34d399]/40 hover:text-foreground transition-colors duration-300"
      initial={prefersReduced ? undefined : { opacity: 0, y: -10 }}
      animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      aria-label="Available for hire — open to opportunities"
    >
      <span className="relative flex h-2 w-2">
        {!prefersReduced && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-75" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
      </span>
      <span className="font-medium">Available for hire</span>
      <span className="text-[#34d399]/60 group-hover:text-[#34d399] transition-colors">→</span>
    </motion.a>
  );
}
