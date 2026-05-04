"use client";

import { motion, useReducedMotion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

export default function SectionHeader({
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  const prefersReduced = useReducedMotion();
  const letters = title.split("");

  const content = (
    <div className="mb-16 relative">
      {/* Large background decorative text */}
      <div className="absolute -left-4 -top-8 text-[8rem] font-bold text-white/[0.03] leading-none pointer-events-none select-none hidden lg:block">
        {title}
      </div>
      {subtitle && (
        <p className="text-xs uppercase tracking-[0.3em] text-[#a78bfa] font-semibold mb-4">
          ◆ {subtitle}
        </p>
      )}
      <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
        {prefersReduced ? (
          <>
            {title}
            <span className="text-[#a78bfa]">.</span>
          </>
        ) : (
          <>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px" }}
                className="inline-block"
                style={{ whiteSpace: letter === " " ? "pre" : undefined }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="text-[#a78bfa] inline-block"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: letters.length * 0.03 + 0.1, duration: 0.4, type: "spring" }}
            >
              .
            </motion.span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {!prefersReduced ? (
        <motion.div
          className="mt-6 h-[2px] bg-gradient-to-r from-[#a78bfa] to-transparent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      ) : (
        <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-[#a78bfa] to-transparent rounded-full" />
      )}
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
