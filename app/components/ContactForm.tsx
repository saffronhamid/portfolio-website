"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function ContactForm() {
  const prefersReduced = useReducedMotion();

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-white/[0.1] px-0 py-3 text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-foreground";

  const form = (
    <form
      className="flex flex-col gap-8"
      aria-label="Contact form"
      action="https://formspree.io/f/xdaaodyn"
      method="POST"
    >
      <input type="hidden" name="_subject" value="New portfolio message" />
      <label className="flex flex-col gap-2">
        <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Name
        </span>
        <input
          type="text"
          name="name"
          className={inputClasses}
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Email
        </span>
        <input
          type="email"
          name="email"
          className={inputClasses}
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Message
        </span>
        <textarea
          rows={4}
          name="message"
          className={`${inputClasses} resize-none`}
          placeholder="Tell me about the role or project."
          required
        />
      </label>
      <button
        type="submit"
        className="btn-primary self-start mt-2"
        aria-label="Send message"
      >
        Send message
        <FiArrowUpRight className="text-base" />
      </button>
    </form>
  );

  if (prefersReduced) return form;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {form}
    </motion.div>
  );
}
