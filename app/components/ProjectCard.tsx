"use client";

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

  const card = (
    <div className="group relative py-8 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors duration-500 px-2 -mx-2 rounded-lg">
      {/* Glow accent on hover */}
      <div className="absolute -left-3 top-8 w-1 h-0 bg-[#a78bfa] rounded-full group-hover:h-12 transition-all duration-500" />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-white group-hover:text-[#a78bfa] transition-colors duration-300">
            {project.title}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted leading-relaxed">
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
                className="px-3 py-1 text-xs text-muted bg-white/[0.04] border border-white/[0.08] rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 text-sm text-white/60 lg:pt-2 shrink-0">
          <a
            className="inline-flex items-center gap-2 hover:text-white transition-colors duration-200"
            href={project.links.live}
            aria-label={`Open live project for ${project.title}`}
          >
            <FiExternalLink /> Live
          </a>
          <a
            className="inline-flex items-center gap-2 hover:text-white transition-colors duration-200"
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {card}
    </motion.div>
  );
}
