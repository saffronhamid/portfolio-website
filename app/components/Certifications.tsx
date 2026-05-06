"use client";

import { motion, useReducedMotion } from "framer-motion";

type Certification = {
  title: string;
  issuer: string;
  date: string;
};

const certifications: Certification[] = [
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
          className="grid gap-2 border-t border-white/[0.06] py-6 last:border-b md:grid-cols-[80px_1fr_auto] md:items-baseline md:gap-12"
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: idx * 0.06, duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            {item.date}
          </span>
          <h3 className="text-display text-lg font-medium text-foreground">
            {item.title}
          </h3>
          <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
            {item.issuer}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
