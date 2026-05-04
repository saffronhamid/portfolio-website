"use client";

import { useMemo, useEffect, useState } from "react";
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
  const renderedItems = useMemo(() => items, [items]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#000000]/80 backdrop-blur-xl">
      {/* Scroll progress bar */}
      {!prefersReduced && (
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#a78bfa] via-[#22d3ee] to-[#f472b6]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      )}
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6">
        <a
          href="#home"
          className="text-sm font-semibold uppercase tracking-[0.38em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Faizan Hamid
        </a>
        <nav
          aria-label="Primary"
          className="flex w-full flex-wrap items-center gap-4 text-sm text-muted-foreground sm:w-auto sm:gap-6"
        >
          {renderedItems.map((item) => {
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "page" : undefined}
                className="nav-link text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex w-full items-center justify-between gap-4 text-sm text-muted-foreground sm:w-auto sm:justify-end">
          <a
            href="#contact"
            className="btn-ghost inline-flex px-4 py-2 text-xs uppercase tracking-[0.24em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact
          </a>
          <button
            type="button"
            className="btn-ghost inline-flex px-3 py-2 text-xs uppercase tracking-[0.24em]"
            aria-label="Switch language"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
