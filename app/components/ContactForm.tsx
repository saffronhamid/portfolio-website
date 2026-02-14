"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ContactForm() {
  const prefersReduced = useReducedMotion();

  const form = (
    <form
      className="space-y-6"
      aria-label="Contact form"
      action="https://formspree.io/f/xdaaodyn"
      method="POST"
    >
      <input type="hidden" name="_subject" value="New portfolio message" />
      <label className="block space-y-2 text-sm text-muted">
        <span className="text-xs uppercase tracking-widest text-white/60">Name</span>
        <input
          type="text"
          name="name"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#a78bfa] focus:bg-white/[0.06] placeholder:text-white/20"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </label>
      <label className="block space-y-2 text-sm text-muted">
        <span className="text-xs uppercase tracking-widest text-white/60">Email</span>
        <input
          type="email"
          name="email"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#a78bfa] focus:bg-white/[0.06] placeholder:text-white/20"
          placeholder="you@email.com"
          autoComplete="email"
          required
        />
      </label>
      <label className="block space-y-2 text-sm text-muted">
        <span className="text-xs uppercase tracking-widest text-white/60">Message</span>
        <textarea
          rows={4}
          name="message"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#a78bfa] focus:bg-white/[0.06] placeholder:text-white/20 resize-none"
          placeholder="Tell me about your project..."
          required
        />
      </label>
      <button
        type="submit"
        className="w-full sm:w-auto rounded-lg bg-[#a78bfa] px-8 py-3 text-sm font-semibold text-black uppercase tracking-widest transition-all duration-300 hover:bg-[#c4b5fd] hover:shadow-[0_0_30px_rgba(167,139,250,0.3)]"
        aria-label="Send message"
      >
        Send Message
      </button>
    </form>
  );

  if (prefersReduced) return form;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {form}
    </motion.div>
  );
}
