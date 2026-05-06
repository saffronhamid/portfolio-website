"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import AvailabilityBadge from "./AvailabilityBadge";

const heroLinks = [
  { label: "View work", href: "#work", primary: true },
  { label: "Get in touch", href: "#contact", primary: false },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/faizan-hamid-50b113215/" },
  { label: "GitHub", href: "https://github.com/saffronhamid" },
  { label: "Email", href: "mailto:lone@students.uni-marburg.de" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col justify-between pb-12 pt-16 sm:pt-24"
    >
      <motion.div
        className="flex flex-1 flex-col justify-center gap-10"
        variants={prefersReduced ? undefined : containerVariants}
        initial={prefersReduced ? undefined : "hidden"}
        animate={prefersReduced ? undefined : "visible"}
      >
        <motion.div variants={prefersReduced ? undefined : itemVariants}>
          <AvailabilityBadge />
        </motion.div>

        <motion.div
          className="flex flex-col gap-2"
          variants={prefersReduced ? undefined : itemVariants}
        >
          <span className="text-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Portfolio · 2026
          </span>
        </motion.div>

        <motion.h1
          className="display-xl text-foreground"
          variants={prefersReduced ? undefined : itemVariants}
        >
          Faizan
          <br />
          <span className="text-muted-foreground/60">Hamid.</span>
        </motion.h1>

        <motion.div
          className="grid max-w-3xl gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12"
          variants={prefersReduced ? undefined : itemVariants}
        >
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Machine Learning Engineer focused on{" "}
            <span className="text-foreground">RAG systems</span>,{" "}
            <span className="text-foreground">MLOps</span>, and{" "}
            <span className="text-foreground">scalable AI pipelines</span>.
            Currently pursuing M.Sc. Data Science in Germany — open to
            Werkstudent and full-time roles.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          variants={prefersReduced ? undefined : itemVariants}
        >
          {heroLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={link.primary ? "btn-primary" : "btn-ghost"}
            >
              {link.label}
              <FiArrowUpRight className="text-base" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-16 flex flex-col gap-6 border-t border-white/[0.06] pt-8 md:flex-row md:items-end md:justify-between"
        initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
        animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="link-underline text-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
        </div>
        <a
          href="#about"
          className="group flex items-center gap-3 text-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to about"
        >
          Scroll
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] transition-colors group-hover:border-foreground">
            <FiArrowDown className="text-sm" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
