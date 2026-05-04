"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SkillGroup({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="group py-6 border-b border-white/[0.06] last:border-b-0">
      <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-[#a78bfa] transition-colors duration-300">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => {
          const item = (
            <span
              key={skill}
              className="skill-pill px-4 py-2 text-sm text-muted-foreground bg-white/[0.04] border border-white/[0.08] rounded-full hover:bg-[#a78bfa]/10 hover:text-white hover:border-[#a78bfa]/40 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          );

          if (prefersReduced) return item;

          return (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="skill-pill px-4 py-2 text-sm text-muted-foreground bg-white/[0.04] border border-white/[0.08] rounded-full hover:bg-[#a78bfa]/10 hover:text-white hover:border-[#a78bfa]/40 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-colors duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
