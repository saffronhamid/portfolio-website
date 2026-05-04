"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary aurora orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, #a78bfa 0%, #7c3aed 40%, transparent 70%)",
          filter: "blur(80px)",
          top: "10%",
          left: "15%",
        }}
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -100, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Secondary cyan orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, #22d3ee 0%, #0891b2 40%, transparent 70%)",
          filter: "blur(80px)",
          top: "50%",
          right: "10%",
        }}
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -120, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Tertiary warm orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, #f472b6 0%, #db2777 40%, transparent 70%)",
          filter: "blur(100px)",
          bottom: "20%",
          left: "40%",
        }}
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -60, 100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
