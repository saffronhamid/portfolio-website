"use client";

import { useReducedMotion } from "framer-motion";

const techStack = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Scikit-learn",
  "FastAPI",
  "LangChain",
  "LangGraph",
  "MLflow",
  "Docker",
  "FAISS",
  "MongoDB",
  "PostgreSQL",
  "React",
  "Next.js",
  "Node.js",
  "GitHub Actions",
  "AWS S3",
  "OpenCV",
  "XGBoost",
  "Pandas",
];

function MarqueeRow({ direction = "left" }: { direction?: "left" | "right" }) {
  const items = [...techStack, ...techStack];
  return (
    <div
      className="flex shrink-0 items-center gap-12 whitespace-nowrap"
      style={{
        animation: `marquee-${direction} 60s linear infinite`,
      }}
    >
      {items.map((item, idx) => (
        <span key={`${item}-${idx}`} className="flex items-center gap-12">
          <span className="text-2xl sm:text-3xl font-semibold text-white/30 hover:text-white/80 transition-colors duration-300 tracking-tight">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]/40" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="relative overflow-hidden py-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-6">
          {techStack.map((item) => (
            <span key={item} className="text-sm text-white/40">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-8 group">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track:hover [style*="marquee"] {
          animation-play-state: paused !important;
        }
      `}</style>
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      <div className="marquee-track flex">
        <MarqueeRow direction="left" />
      </div>
    </div>
  );
}
