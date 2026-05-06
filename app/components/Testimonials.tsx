"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  accent: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Faizan delivered MLflow workflows that turned a brittle pipeline into a reproducible system. Strong instincts for what matters in production.",
    name: "Senior Engineer",
    role: "Solid Works",
    accent: "#a78bfa",
  },
  {
    quote:
      "His CNN-based navigation prototype was reliable enough that we used it as the baseline for the rest of the research track.",
    name: "Research Lead",
    role: "NIT Srinagar",
    accent: "#22d3ee",
  },
  {
    quote:
      "Owns the full stack from data ingestion to API delivery. Communicates trade-offs clearly and ships on time.",
    name: "Project Mentor",
    role: "Philipps-Universität Marburg",
    accent: "#34d399",
  },
];

export default function Testimonials() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((item, idx) => (
        <motion.figure
          key={item.name}
          className="group relative flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-7 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-500"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: idx * 0.12, duration: 0.5, ease: "easeOut" }}
          whileHover={prefersReduced ? undefined : { y: -4 }}
        >
          <div
            className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
            style={{ background: item.accent }}
          />
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
            style={{ color: item.accent }}
            aria-hidden="true"
          >
            <FiMessageCircle className="text-sm" />
          </div>
          <blockquote className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-auto flex items-center gap-3 pt-4 border-t border-white/[0.06]">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
              style={{
                background: `${item.accent}1a`,
                color: item.accent,
              }}
            >
              {item.name
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-white">{item.name}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                {item.role}
              </span>
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
