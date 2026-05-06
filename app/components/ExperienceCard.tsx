"use client";

import { motion, useReducedMotion } from "framer-motion";

type Experience = {
  role: string;
  company: string;
  date: string;
  location: string;
  bullets: string[];
};

export default function ExperienceCard({
  experience,
  index = 0,
}: {
  experience: Experience;
  index?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      className="group grid gap-6 border-t border-white/[0.06] py-10 md:grid-cols-[200px_1fr] md:gap-12 md:py-12"
      initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
          {experience.date}
        </span>
        <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
          {experience.location}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-display text-xl font-medium text-foreground sm:text-2xl">
            {experience.role}
            <span className="text-muted-foreground"> · {experience.company}</span>
          </h3>
        </div>
        <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
          {experience.bullets.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/40" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
