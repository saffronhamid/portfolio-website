"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiAward, FiBookOpen, FiShield, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  icon: IconType;
  accent: string;
};

const certifications: Certification[] = [
  {
    title: "MLOps Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    icon: FiZap,
    accent: "#a78bfa",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera · Andrew Ng",
    date: "2023",
    icon: FiBookOpen,
    accent: "#22d3ee",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    icon: FiShield,
    accent: "#34d399",
  },
  {
    title: "Top 10% — Computer Engineering",
    issuer: "University of Jammu",
    date: "2023",
    icon: FiAward,
    accent: "#fbbf24",
  },
];

export default function Certifications() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid gap-px bg-white/[0.06] rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
      {certifications.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            className="group relative bg-black p-7 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors duration-500"
            initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
              style={{ background: item.accent }}
            />
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08]"
              style={{ color: item.accent }}
              whileHover={prefersReduced ? undefined : { rotate: 6, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              aria-hidden="true"
            >
              <Icon className="text-lg" />
            </motion.div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-semibold leading-snug text-white group-hover:translate-x-1 transition-transform duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">{item.issuer}</p>
            </div>
            <p
              className="mt-auto text-[10px] uppercase tracking-[0.22em] font-semibold"
              style={{ color: item.accent }}
            >
              {item.date}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
