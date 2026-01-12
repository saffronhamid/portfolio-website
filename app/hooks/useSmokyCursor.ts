"use client";
import { useState, useEffect } from "react";

const DURATION = 0.5;
const STEP = 0.05;
const TOTAL_DOTS = DURATION / STEP;
const TAIL_LENGTH = 5;

export const useSmokyCursor = () => {
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const newDot = { x: clientX, y: clientY };
      setDots((prevDots) => {
        const nextDots = [newDot];
        for (let i = 0; i < prevDots.length && i < TAIL_LENGTH - 1; i++) {
          nextDots.push(prevDots[i]);
        }
        return nextDots;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return dots;
};
