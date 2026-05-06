"use client";

import { motion, useReducedMotion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Faizan delivered MLflow workflows that turned a brittle pipeline into a reproducible system. Strong instincts for what matters in production.",
    name: "Senior Engineer",
    role: "Solid Works",
  },
  {
    quote:
      "His CNN-based navigation prototype was reliable enough that we used it as the baseline for the rest of the research track.",
    name: "Research Lead",
    role: "NIT Srinagar",
  },
  {
    quote:
      "Owns the full stack from data ingestion to API delivery. Communicates trade-offs clearly and ships on time.",
    name: "Project Mentor",
    role: "Philipps-Universität Marburg",
  },
];

export default function Testimonials() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid gap-px bg-white/[0.06] md:grid-cols-3">
      {testimonials.map((item, idx) => (
        <motion.figure
          key={item.name}
          className="flex flex-col gap-8 bg-[#0a0a0a] p-8 md:p-10"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
        >
          <span
            className="text-display text-5xl leading-none text-foreground/30"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="flex-1 text-base leading-relaxed text-foreground/85">
            {item.quote}
          </blockquote>
          <figcaption className="flex flex-col gap-1 border-t border-white/[0.06] pt-5">
            <span className="text-sm font-medium text-foreground">{item.name}</span>
            <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
              {item.role}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
