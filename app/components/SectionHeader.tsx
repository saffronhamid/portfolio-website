"use client";

import { motion, useReducedMotion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  const prefersReduced = useReducedMotion();

  const content = (
    <div className="mb-16 relative">
      {/* Large background number / decorative text */}
      <div className="absolute -left-4 -top-8 text-[8rem] font-bold text-white/[0.03] leading-none pointer-events-none select-none hidden lg:block">
        {title}
      </div>
      {subtitle && (
        <p className="text-xs uppercase tracking-[0.3em] text-[#a78bfa] font-semibold mb-4">
          ◆ {subtitle}
        </p>
      )}
      <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
        {title}
        <span className="text-[#a78bfa]">.</span>
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base text-muted leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-[#a78bfa] to-transparent rounded-full" />
    </div>
  );

  if (prefersReduced) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}
