"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

type Project = {
  title: string;
  description: string[];
  tech: string[];
  links: {
    live: string;
    repo: string;
  };
};

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
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
      className="group relative py-8 px-6 -mx-2 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse-following spotlight */}
      {!prefersReduced && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Glow accent on hover */}
      <div className="absolute -left-1 top-8 w-1 h-0 bg-[#a78bfa] rounded-full group-hover:h-12 transition-all duration-500 shadow-[0_0_12px_rgba(167,139,250,0.6)]" />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 relative z-10">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-white group-hover:text-[#a78bfa] transition-colors duration-300">
            {project.title}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
            {project.description.map((line, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-[#a78bfa] mt-1 text-xs">▸</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs text-muted-foreground bg-white/[0.04] border border-white/[0.08] rounded-full hover:bg-[#a78bfa]/10 hover:border-[#a78bfa]/30 hover:text-[#a78bfa] transition-all duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 text-sm text-white/60 lg:pt-2 shrink-0">
          <a
            className="inline-flex items-center gap-2 hover:text-[#a78bfa] transition-colors duration-200"
            href={project.links.live}
            aria-label={`Open live project for ${project.title}`}
          >
            <FiExternalLink /> Live
          </a>
          <a
            className="inline-flex items-center gap-2 hover:text-[#a78bfa] transition-colors duration-200"
            href={project.links.repo}
            aria-label={`Open repository for ${project.title}`}
          >
            <FiGithub /> GitHub
          </a>
        </div>
      </div>
    </div>
  );

  if (prefersReduced) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {card}
    </motion.div>
  );
}
