"use client";

import { motion, useReducedMotion } from "framer-motion";

type SectionHeaderProps = {
  number: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  number,
  title,
  description,
}: SectionHeaderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
      <motion.div
        className="flex items-baseline gap-3"
        initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
        whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-mono text-xs tracking-[0.18em] text-muted-foreground">
          {number}
        </span>
        <span className="hairline w-12 origin-left" />
      </motion.div>

      <div className="flex flex-col gap-4">
        <motion.h2
          className="display-lg text-foreground"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            className="max-w-xl text-base leading-relaxed text-muted-foreground"
            initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
