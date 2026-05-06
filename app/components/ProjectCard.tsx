"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

type Project = {
  title: string;
  year?: string;
  description: string[];
  tech: string[];
  links: {
    live: string;
    repo: string;
  };
};

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      className="group relative grid gap-6 border-t border-white/[0.06] py-10 md:grid-cols-[120px_1fr_auto] md:gap-12 md:py-14"
      initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
        {project.year ?? "—"} / {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-col gap-5">
        <h3 className="text-display text-2xl font-medium text-foreground transition-colors duration-300 sm:text-3xl md:text-4xl">
          <span className="link-underline">{project.title}</span>
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description.join(" ")}
        </p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:flex-col md:items-end md:gap-3">
        {project.links.live && project.links.live !== "#" && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground"
            aria-label={`Visit ${project.title} live site`}
          >
            Live <FiArrowUpRight className="text-sm" />
          </a>
        )}
        <a
          href={project.links.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground"
          aria-label={`View ${project.title} repository`}
        >
          Code <FiGithub className="text-sm" />
        </a>
      </div>
    </motion.article>
  );
}
