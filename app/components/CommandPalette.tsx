"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiArrowRight, FiCommand, FiSearch } from "react-icons/fi";

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  href: string;
  external?: boolean;
};

const items: CommandItem[] = [
  { id: "home", label: "Home", hint: "Hero & intro", href: "#home" },
  { id: "about", label: "About", hint: "Background & focus", href: "#about" },
  { id: "stats", label: "Stats", hint: "Metrics at a glance", href: "#stats" },
  { id: "focus", label: "Focus Areas", hint: "Current work", href: "#focus" },
  { id: "skills", label: "Skills", hint: "Tech stack", href: "#skills" },
  { id: "projects", label: "Projects", hint: "Selected work", href: "#projects" },
  { id: "experience", label: "Experience", hint: "Roles & research", href: "#experience" },
  { id: "education", label: "Education", hint: "Academic background", href: "#education" },
  { id: "contact", label: "Contact", hint: "Send a message", href: "#contact" },
  {
    id: "github",
    label: "GitHub",
    hint: "github.com/saffronhamid",
    href: "https://github.com/saffronhamid",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    hint: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/faizan-hamid-50b113215/",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    hint: "lone@students.uni-marburg.de",
    href: "mailto:lone@students.uni-marburg.de",
    external: true,
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const runItem = useCallback((item: CommandItem) => {
    setOpen(false);
    setQuery("");
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    const el = document.querySelector(item.href);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", item.href);
    } else {
      window.location.hash = item.href;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((idx) => Math.min(filtered.length - 1, idx + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((idx) => Math.max(0, idx - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIdx];
        if (item) runItem(item);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIdx, runItem]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-6 left-6 z-40 group hidden sm:flex items-center gap-2 h-10 px-3 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs text-muted-foreground hover:text-white hover:border-[#a78bfa]/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <FiSearch className="text-sm" />
        <span className="uppercase tracking-[0.2em]">Search</span>
        <kbd className="ml-1 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[10px] font-mono text-white/70">
          {isMac ? <FiCommand className="text-[10px]" /> : "Ctrl"}
          <span>K</span>
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                <FiSearch className="text-muted-foreground text-base shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section, project, or link..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-muted-foreground/60 outline-none"
                  aria-label="Search commands"
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[10px] font-mono text-white/60">
                  ESC
                </kbd>
              </div>

              <ul className="max-h-[60vh] overflow-y-auto py-2" role="listbox">
                {filtered.length === 0 ? (
                  <li className="px-5 py-8 text-center text-sm text-muted-foreground">
                    No matches for &quot;{query}&quot;
                  </li>
                ) : (
                  filtered.map((item, idx) => {
                    const active = idx === activeIdx;
                    return (
                      <li key={item.id} role="option" aria-selected={active}>
                        <button
                          type="button"
                          onClick={() => runItem(item)}
                          onMouseEnter={() => setActiveIdx(idx)}
                          className={`w-full flex items-center justify-between gap-4 px-5 py-3 text-left transition-colors duration-150 ${
                            active
                              ? "bg-white/[0.04]"
                              : "hover:bg-white/[0.02]"
                          }`}
                        >
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-sm text-white truncate">
                              {item.label}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                              {item.hint}
                            </span>
                          </div>
                          <FiArrowRight
                            className={`shrink-0 text-sm transition-all duration-200 ${
                              active
                                ? "text-[#a78bfa] translate-x-0 opacity-100"
                                : "text-muted-foreground/40 -translate-x-1 opacity-0"
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="flex items-center gap-4 px-5 py-3 border-t border-white/[0.06] text-[11px] text-muted-foreground/70 uppercase tracking-[0.18em]">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] font-mono normal-case tracking-normal">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] font-mono normal-case tracking-normal">↵</kbd>
                  Select
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
