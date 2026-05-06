"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years building ML systems" },
  { value: 12, suffix: "+", label: "Production pipelines shipped" },
  { value: 3, label: "Research collaborations" },
  { value: 99, suffix: "%", label: "Uptime on deployed services" },
];

function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [animated, setAnimated] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, prefersReduced]);

  const value = prefersReduced ? to : animated;
  return <span ref={ref}>{value}</span>;
}

export default function Stats() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 md:gap-x-12">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          className="flex flex-col gap-3 border-t border-white/[0.08] pt-5"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-display text-5xl font-medium tracking-tight tabular-nums text-foreground sm:text-6xl">
            <CountUp to={stat.value} />
            {stat.suffix && (
              <span className="text-muted-foreground">{stat.suffix}</span>
            )}
          </div>
          <p className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
