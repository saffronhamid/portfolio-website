"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SkillGroup({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="grid gap-4 border-t border-white/[0.06] py-7 md:grid-cols-[180px_1fr] md:gap-12"
      initial={prefersReduced ? undefined : { opacity: 0, y: 14 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h3 className="text-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
        {title}
      </h3>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-base text-foreground/85">
        {skills.map((skill, idx) => (
          <span
            key={skill}
            className="inline-flex items-center gap-3 transition-colors hover:text-foreground"
          >
            {skill}
            {idx < skills.length - 1 && (
              <span className="text-muted-foreground/40" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
