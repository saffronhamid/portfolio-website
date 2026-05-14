"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useCallback } from "react";
interface GlobeProps {
  className?: string;
  size?: number;
  dotColor?: string;
  arcColor?: string;
  markerColor?: string;
  autoRotateSpeed?: number;
  connections?: { from: [number, number]; to: [number, number] }[];
  markers?: { lat: number; lng: number; label?: string }[];
}
const DEFAULT_MARKERS = [
  { lat: 37.78, lng: -122.42, label: "San Francisco" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 35.68, lng: 139.69, label: "Tokyo" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 55.76, lng: 37.62, label: "Moscow" },
  { lat: -23.55, lng: -46.63, label: "Sao Paulo" },
  { lat: 19.43, lng: -99.13, label: "Mexico City" },
  { lat: 28.61, lng: 77.21, label: "Delhi" },
  { lat: 36.19, lng: 44.01, label: "Erbil" },
];

const DEFAULT_CONNECTIONS: { from: [number, number]; to: [number, number] }[] =
  [
    { from: [37.78, -122.42], to: [51.51, -0.13] },
    { from: [51.51, -0.13], to: [35.68, 139.69] },
    { from: [35.68, 139.69], to: [-33.87, 151.21] },
    { from: [37.78, -122.42], to: [1.35, 103.82] },
    { from: [51.51, -0.13], to: [28.61, 77.21] },
    { from: [37.78, -122.42], to: [-23.55, -46.63] },
    { from: [1.35, 103.82], to: [-33.87, 151.21] },
    { from: [28.61, 77.21], to: [36.19, 44.01] },
    { from: [51.51, -0.13], to: [36.19, 44.01] },
  ];

function latLngToXYZ(
  lat: number,
  lng: number,
  radius: number
): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  fov: number
): [number, number, number] {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy, z];
}

export function Component({
  className,
  size = 600,
  dotColor = "rgba(120, 200, 255, ALPHA)",
  arcColor = "rgba(140, 200, 255, 0.55)",
  markerColor = "rgba(180, 230, 255, 1)",
  autoRotateSpeed = 0.002,
  connections = DEFAULT_CONNECTIONS,
  markers = DEFAULT_MARKERS,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0.4);
  const rotXRef = useRef(0.3);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startRotY: number;
    startRotX: number;
  }>({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const velocityRef = useRef({ vy: 0, vx: 0 });

  const dotsRef = useRef<[number, number, number][]>([]);
  const starsRef = useRef<{ x: number; y: number; r: number; tw: number }[]>(
    []
  );

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = 1400;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);
      dots.push([x, y, z]);
    }
    dotsRef.current = dots;

    const stars: { x: number; y: number; r: number; tw: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.1 + 0.2,
        tw: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.36;
    const fov = 600;

    if (!dragRef.current.active) {
      rotYRef.current += velocityRef.current.vy + autoRotateSpeed;
      rotXRef.current = Math.max(
        -1,
        Math.min(1, rotXRef.current + velocityRef.current.vx)
      );
      velocityRef.current.vy *= 0.94;
      velocityRef.current.vx *= 0.94;
      if (Math.abs(velocityRef.current.vy) < 0.0001) velocityRef.current.vy = 0;
      if (Math.abs(velocityRef.current.vx) < 0.0001) velocityRef.current.vx = 0;
    }

    timeRef.current += 0.015;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Twinkling starfield (behind everything)
    const stars = starsRef.current;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const sx = s.x * w;
      const sy = s.y * h;
      const dxg = sx - cx;
      const dyg = sy - cy;
      const distFromCenter = Math.sqrt(dxg * dxg + dyg * dyg);
      if (distFromCenter < radius * 1.05) continue;
      const tw = (Math.sin(time * 1.5 + s.tw) + 1) / 2;
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${0.25 + tw * 0.55})`;
      ctx.fill();
    }

    // Outer atmospheric halo
    const halo = ctx.createRadialGradient(
      cx,
      cy,
      radius * 0.95,
      cx,
      cy,
      radius * 1.7
    );
    halo.addColorStop(0, "rgba(120, 180, 255, 0.22)");
    halo.addColorStop(0.4, "rgba(100, 140, 255, 0.08)");
    halo.addColorStop(1, "rgba(80, 100, 220, 0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);

    // Inner sphere fill — soft radial shading for depth
    const sphere = ctx.createRadialGradient(
      cx - radius * 0.35,
      cy - radius * 0.35,
      radius * 0.1,
      cx,
      cy,
      radius
    );
    sphere.addColorStop(0, "rgba(40, 90, 160, 0.18)");
    sphere.addColorStop(0.6, "rgba(15, 35, 80, 0.22)");
    sphere.addColorStop(1, "rgba(5, 10, 30, 0.35)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphere;
    ctx.fill();

    // Rim light
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(160, 210, 255, 0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const ry = rotYRef.current;
    const rx = rotXRef.current;

    // Surface dots
    const dots = dotsRef.current;
    for (let i = 0; i < dots.length; i++) {
      let [x, y, z] = dots[i];
      x *= radius;
      y *= radius;
      z *= radius;

      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);

      if (z > 0) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depthAlpha = Math.max(0.08, 1 - (z + radius) / (2 * radius));
      const dotSize = 0.9 + depthAlpha * 0.9;

      ctx.beginPath();
      ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
      ctx.fill();
    }

    // Arcs + traveling pulses
    for (let ci = 0; ci < connections.length; ci++) {
      const conn = connections[ci];
      const [lat1, lng1] = conn.from;
      const [lat2, lng2] = conn.to;

      let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
      let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);

      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);

      if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1;
      const arcHeight = radius * 1.3;
      const elevX = (midX / midLen) * arcHeight;
      const elevY = (midY / midLen) * arcHeight;
      const elevZ = (midZ / midLen) * arcHeight;
      const [scx, scy] = project(elevX, elevY, elevZ, cx, cy, fov);

      // Gradient stroke (cyan -> violet) for the arc
      const arcGrad = ctx.createLinearGradient(sx1, sy1, sx2, sy2);
      arcGrad.addColorStop(0, "rgba(120, 220, 255, 0.65)");
      arcGrad.addColorStop(0.5, "rgba(180, 160, 255, 0.55)");
      arcGrad.addColorStop(1, "rgba(255, 140, 220, 0.55)");

      ctx.shadowColor = "rgba(140, 200, 255, 0.55)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = arcGrad;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Traveling pulse — repeats across the arc, with a short trail
      const cycle = ((time * 0.35 + ci * 0.17) % 1 + 1) % 1;
      const trailSteps = 8;
      for (let s = 0; s < trailSteps; s++) {
        const tt = cycle - s * 0.025;
        if (tt <= 0 || tt >= 1) continue;
        const tx =
          (1 - tt) * (1 - tt) * sx1 + 2 * (1 - tt) * tt * scx + tt * tt * sx2;
        const ty =
          (1 - tt) * (1 - tt) * sy1 + 2 * (1 - tt) * tt * scy + tt * tt * sy2;
        const fade = 1 - s / trailSteps;
        ctx.beginPath();
        ctx.arc(tx, ty, 1.6 + fade * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 240, 255, ${fade * 0.85})`;
        ctx.fill();
      }
    }

    // Markers — multi-ring pulse + glowing core
    for (const marker of markers) {
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);

      if (z > radius * 0.1) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);

      // Two staggered rings rippling outward
      for (let r = 0; r < 2; r++) {
        const phase = (time * 0.9 + marker.lat * 0.1 + r * 0.5) % 1;
        const ringR = 3 + phase * 16;
        const ringA = (1 - phase) * 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 230, 255, ${ringA.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Glowing core
      ctx.shadowColor = "rgba(180, 230, 255, 0.9)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sx, sy, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = markerColor;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (marker.label) {
        ctx.font = "10px system-ui, sans-serif";
        ctx.fillStyle = markerColor.replace("1)", "0.7)");
        ctx.fillText(marker.label, sx + 9, sy + 3);
      }
    }
  }, [dotColor, arcColor, markerColor, autoRotateSpeed, connections, markers]);

  useEffect(() => {
    const loop = () => {
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    velocityRef.current = { vy: 0, vx: 0 };
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRotY: rotYRef.current,
      startRotX: rotXRef.current,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const newRotY = dragRef.current.startRotY + dx * 0.005;
    const newRotX = Math.max(
      -1,
      Math.min(1, dragRef.current.startRotX + dy * 0.005)
    );
    const dvy = newRotY - rotYRef.current;
    const dvx = newRotX - rotXRef.current;
    velocityRef.current.vy = velocityRef.current.vy * 0.7 + dvy * 0.3;
    velocityRef.current.vx = velocityRef.current.vx * 0.7 + dvx * 0.3;
    rotYRef.current = newRotY;
    rotXRef.current = newRotX;
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "h-full w-full cursor-grab active:cursor-grabbing",
        className
      )}
      style={{ width: size, height: size }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
}
