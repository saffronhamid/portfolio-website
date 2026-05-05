"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  accent: string;
};

const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years building ML systems", accent: "#a78bfa" },
  { value: 12, suffix: "+", label: "Production pipelines shipped", accent: "#22d3ee" },
  { value: 3, label: "Research collaborations", accent: "#34d399" },
  { value: 99, suffix: "%", label: "Uptime on deployed services", accent: "#fbbf24" },
];

function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [value, setValue] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setValue(to);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, prefersReduced]);

  return <span ref={ref}>{value}</span>;
}

export default function Stats() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          className="group relative bg-black p-8 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors duration-500"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
            style={{ background: stat.accent }}
          />
          <div className="text-5xl sm:text-6xl font-bold tracking-tight tabular-nums">
            <span style={{ color: stat.accent }}>
              <CountUp to={stat.value} />
              {stat.suffix ?? ""}
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80 font-medium leading-relaxed">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
