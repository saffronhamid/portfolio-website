"use client";

import { useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const card = (
    <div
      ref={ref}
      className="group relative pl-8 py-8 border-b border-white/[0.06] last:border-b-0 rounded-lg transition-colors duration-500"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse spotlight */}
      {!prefersReduced && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 rounded-lg"
          style={{
            left: mousePos.x - 120,
            top: mousePos.y - 120,
            width: 240,
            height: 240,
            background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Timeline dot with glow */}
      <div className="absolute left-0 top-10 w-3 h-3 rounded-full border-2 border-[#a78bfa] bg-black group-hover:bg-[#a78bfa] group-hover:shadow-[0_0_12px_rgba(167,139,250,0.6)] transition-all duration-300" />
      {/* Timeline line */}
      <div className="absolute left-[5px] top-[3.8rem] w-[2px] h-[calc(100%-3rem)] bg-white/[0.06]" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 relative z-10">
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-[#a78bfa] transition-colors duration-300">
            {experience.role}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{experience.company}</p>
          <p className="text-xs text-white/30 mt-1">{experience.location}</p>
        </div>
        <p className="text-sm text-muted-foreground shrink-0">{experience.date}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed relative z-10">
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
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {card}
    </motion.div>
  );
}
