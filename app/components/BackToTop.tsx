"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setVisible(y > 600);
      setProgress(total > 0 ? Math.min(1, y / total) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(id);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 group"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={prefersReduced ? undefined : { y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative h-12 w-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-[#a78bfa]/40 transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <svg
              className="absolute inset-0 -rotate-90"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.15s linear" }}
              />
            </svg>
            <FiArrowUp className="text-base text-white/80 group-hover:text-white transition-colors duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
