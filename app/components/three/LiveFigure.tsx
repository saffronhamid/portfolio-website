"use client";

import { Component, type ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const FigureScene = dynamic(() => import("./FigureScene"), { ssr: false });

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

let webglSupport: boolean | null = null;
function supportsWebGL() {
  if (webglSupport !== null) return webglSupport;
  try {
    const c = document.createElement("canvas");
    webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/**
 * A live Three.js figure that only renders while on screen. The points
 * assemble the first time the figure scrolls into view.
 */
export default function LiveFigure({
  shape,
  dark = false,
  className,
  label,
}: {
  shape: number;
  dark?: boolean;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting && supportsWebGL()) setMounted(true);
      },
      { rootMargin: "-12% 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} role="img" aria-label={label}>
      {mounted && (
        <Boundary>
          <FigureScene shape={shape} dark={dark} active={visible} reduced={reduced} />
        </Boundary>
      )}
    </div>
  );
}
