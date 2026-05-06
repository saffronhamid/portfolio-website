"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type NavItem = {
  id: string;
  label: string;
};

export default function Navbar({
  items,
  activeId,
}: {
  items: NavItem[];
  activeId: string;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {!prefersReduced && (
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-white origin-left"
          style={{ width: "100%", scaleX: scrollProgress }}
        />
      )}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-5 sm:px-10">
        <a
          href="#home"
          className="text-mono text-[11px] uppercase tracking-[0.3em] text-foreground"
        >
          <span className="text-muted-foreground">/</span> faizan-hamid
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.22em] md:flex"
        >
          {items.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "page" : undefined}
              className={`nav-link transition-colors ${
                activeId === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-mono mr-1.5 text-[10px] text-muted-foreground/60">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="text-mono inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-white/40 hover:bg-white/[0.04]"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            {!prefersReduced && (
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-[#34d399]"
                style={{ animation: "pulse-soft 2.4s ease-out infinite" }}
              />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34d399]" />
          </span>
          Available
        </a>
      </div>
    </header>
  );
}
