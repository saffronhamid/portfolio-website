"use client";

import { motion, useReducedMotion } from "framer-motion";

type Certification = {
  title: string;
  issuer: string;
  date: string;
};

const certifications: Certification[] = [
  { title: "Ultimate RAG Bootcamp — LangChain, LangGraph & LangSmith", issuer: "Udemy · Krish Naik", date: "2026" },
  { title: "MLOps Specialization", issuer: "DeepLearning.AI", date: "2024" },
  { title: "Deep Learning Specialization", issuer: "Coursera · Andrew Ng", date: "2023" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2023" },
  { title: "Top 10% — Computer Engineering", issuer: "University of Jammu", date: "2023" },
];

export default function Certifications() {
  const prefersReduced = useReducedMotion();

  return (
    <ul className="flex flex-col">
      {certifications.map((item, idx) => (
        <motion.li
          key={item.title}
          className="group relative grid gap-2 border-t border-white/[0.06] py-6 last:border-b md:grid-cols-[80px_1fr_auto] md:items-baseline md:gap-12"
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: idx * 0.06, duration: 0.5, ease: "easeOut" }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 rounded-2xl bg-gradient-to-r from-white/[0.02] via-white/[0.015] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent transition-transform duration-500 group-hover:scale-x-100"
          />
          <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground/90">
            {item.date}
          </span>
          <h3 className="text-display text-lg font-medium text-foreground">
            <span className="link-underline">{item.title}</span>
          </h3>
          <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 transition-colors duration-300 group-hover:text-foreground/90">
            {item.issuer}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
