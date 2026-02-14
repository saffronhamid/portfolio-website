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

  const card = (
    <div className="group relative pl-8 py-8 border-b border-white/[0.06] last:border-b-0">
      {/* Timeline dot */}
      <div className="absolute left-0 top-10 w-3 h-3 rounded-full border-2 border-[#a78bfa] bg-black group-hover:bg-[#a78bfa] transition-colors duration-300" />
      {/* Timeline line */}
      <div className="absolute left-[5px] top-[3.8rem] w-[2px] h-[calc(100%-3rem)] bg-white/[0.06]" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-[#a78bfa] transition-colors duration-300">
            {experience.role}
          </h3>
          <p className="text-sm text-muted mt-1">{experience.company}</p>
          <p className="text-xs text-white/30 mt-1">{experience.location}</p>
        </div>
        <p className="text-sm text-muted shrink-0">{experience.date}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted leading-relaxed">
        {experience.bullets.map((line, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-[#a78bfa] mt-1 text-xs">▸</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (prefersReduced) return card;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {card}
    </motion.div>
  );
}
