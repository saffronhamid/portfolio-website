"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  certificate?: string;
};

const certifications: Certification[] = [
  {
    title: "Ultimate RAG Bootcamp — LangChain, LangGraph & LangSmith",
    issuer: "Udemy · Krish Naik",
    date: "2026",
    certificate: "/certificates/ultimate-rag-bootcamp.pdf",
  },
  { title: "MLOps Specialization", issuer: "DeepLearning.AI", date: "2024" },
  { title: "Deep Learning Specialization", issuer: "Coursera · Andrew Ng", date: "2023" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2023" },
  { title: "Top 10% — Computer Engineering", issuer: "University of Jammu", date: "2023" },
];

export default function Certifications() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState<Certification | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      <ul className="flex flex-col">
        {certifications.map((item, idx) => {
          const hasCert = Boolean(item.certificate);
          const Row = (
            <motion.li
              key={item.title}
              className={`group relative grid gap-2 border-t border-white/[0.06] py-6 last:border-b md:grid-cols-[80px_1fr_auto] md:items-baseline md:gap-12 ${
                hasCert ? "cursor-pointer" : ""
              }`}
              initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: idx * 0.06, duration: 0.5, ease: "easeOut" }}
              onClick={hasCert ? () => setActive(item) : undefined}
              role={hasCert ? "button" : undefined}
              tabIndex={hasCert ? 0 : undefined}
              onKeyDown={
                hasCert
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(item);
                      }
                    }
                  : undefined
              }
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 rounded-2xl bg-gradient-to-r from-white/[0.02] via-white/[0.015] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground/90">
                {item.date}
              </span>
              <h3 className="text-display text-lg font-medium text-foreground">
                <span className="link-underline inline-flex items-center gap-2">
                  {item.title}
                  {hasCert && (
                    <FiExternalLink
                      aria-hidden="true"
                      className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                    />
                  )}
                </span>
              </h3>
              <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 transition-colors duration-300 group-hover:text-foreground/90">
                {item.issuer}
              </span>
            </motion.li>
          );
          return Row;
        })}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} certificate`}
            style={{ perspective: 1600 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />

            {!prefersReduced && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div
                  className="h-[70vh] w-full max-w-5xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 30%, transparent 70%)",
                  }}
                />
              </motion.div>
            )}

            <motion.div
              className="relative z-10 flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-white/10 bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_60px_-10px_rgba(255,255,255,0.05)]"
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 40, scale: 0.92, rotateX: -12 }
              }
              animate={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1, rotateX: 0 }
              }
              exit={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, scale: 0.96, rotateX: -8 }
              }
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: "preserve-3d" }}
            >
              {!prefersReduced && (
                <>
                  {[
                    "left-2 top-2 border-l border-t",
                    "right-2 top-2 border-r border-t",
                    "left-2 bottom-2 border-l border-b",
                    "right-2 bottom-2 border-r border-b",
                  ].map((pos, i) => (
                    <motion.span
                      key={pos}
                      aria-hidden="true"
                      className={`pointer-events-none absolute z-20 h-5 w-5 border-foreground/40 ${pos}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.45 + i * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}

              <motion.header
                className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4"
                initial={prefersReduced ? undefined : { opacity: 0, y: -8 }}
                animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              >
                <div className="min-w-0">
                  <h3 className="truncate text-display text-sm font-medium text-foreground">
                    {active.title}
                  </h3>
                  <p className="text-mono mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                    {active.issuer} · {active.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={active.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="text-mono inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
                  >
                    Open
                    <FiExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    aria-label="Close"
                    className="rounded-md border border-white/10 p-1.5 text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
                  >
                    <FiX className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.header>

              <motion.div
                className="relative flex-1 overflow-hidden bg-black"
                initial={prefersReduced ? undefined : { opacity: 0 }}
                animate={prefersReduced ? undefined : { opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              >
                {!prefersReduced && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.55,
                      ease: "easeOut",
                    }}
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                    }}
                  />
                )}
                <iframe
                  title={`${active.title} certificate`}
                  src={active.certificate}
                  className="h-full w-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
