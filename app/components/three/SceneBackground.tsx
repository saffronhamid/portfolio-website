"use client";

import { Component, type ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const NeuralScene = dynamic(() => import("./NeuralScene"), { ssr: false });

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function SceneBackground() {
  const reduced = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only capability check
    setReady(hasWebGL());
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {ready && (
        <div className="scene-fade-in absolute inset-0">
          <WebGLBoundary>
            <NeuralScene reduced={reduced} />
          </WebGLBoundary>
        </div>
      )}
      {/* Readability vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.55)_100%)]" />
    </div>
  );
}
