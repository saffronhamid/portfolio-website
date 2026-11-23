"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * One point cloud, six "figures". Every point owns a slot in each figure
 * and eases toward the active one at its own speed, so transitions
 * dissolve rather than snap.
 *
 * 0 loss landscape · 1 agent pipeline · 2 embedding clusters
 * 3 tracked trajectories · 4 confusion matrix · 5 signal ribbon
 */

const N = 8192;
const TAU = Math.PI * 2;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Data = ReturnType<typeof build>;

function build() {
  const rand = mulberry32(20260823);
  const gauss = () => {
    const u = Math.max(1e-6, rand());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * rand());
  };

  const speed = new Float32Array(N);
  const jitter = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    speed[i] = 0.035 + rand() * 0.07;
    jitter[i * 3] = gauss() * 0.012;
    jitter[i * 3 + 1] = gauss() * 0.012;
    jitter[i * 3 + 2] = gauss() * 0.012;
  }

  /* 1 — agent pipeline: 6 stations on a loop, packets between them, hub spokes */
  const STATIONS = 6;
  const stations = Array.from({ length: STATIONS }, (_, k) => {
    const th = (k / STATIONS) * TAU - Math.PI / 2;
    return new THREE.Vector3(Math.cos(th) * 2.5, Math.sin(k * 1.7) * 0.18, Math.sin(th) * 1.35);
  });
  // kind: 0 station shell, 1 station orbit, 2 loop packet, 3 hub spoke, 4 hub core
  const agKind = new Uint8Array(N);
  const agStation = new Uint8Array(N);
  const agU = new Float32Array(N);
  const agOff = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = rand();
    const st = Math.floor(rand() * STATIONS);
    agStation[i] = st;
    agU[i] = rand();
    if (r < 0.16) {
      agKind[i] = 0;
      const rad = 0.13 + rand() * 0.03;
      const th = rand() * TAU;
      const ph = Math.acos(2 * rand() - 1);
      agOff[i * 3] = rad * Math.sin(ph) * Math.cos(th);
      agOff[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
      agOff[i * 3 + 2] = rad * Math.cos(ph);
    } else if (r < 0.26) {
      agKind[i] = 1;
    } else if (r < 0.78) {
      agKind[i] = 2;
      agOff[i * 3] = gauss() * 0.035;
      agOff[i * 3 + 1] = gauss() * 0.035;
      agOff[i * 3 + 2] = gauss() * 0.035;
    } else if (r < 0.95) {
      agKind[i] = 3;
      agOff[i * 3] = gauss() * 0.02;
      agOff[i * 3 + 1] = gauss() * 0.02;
      agOff[i * 3 + 2] = gauss() * 0.02;
    } else {
      agKind[i] = 4;
      const rad = 0.22 * Math.cbrt(rand());
      const th = rand() * TAU;
      const ph = Math.acos(2 * rand() - 1);
      agOff[i * 3] = rad * Math.sin(ph) * Math.cos(th);
      agOff[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
      agOff[i * 3 + 2] = rad * Math.cos(ph);
    }
  }

  /* 2 — embedding clusters */
  const centers = Array.from({ length: 7 }, (_, k) => {
    const y = 1 - (k / 6) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = k * 2.399963;
    return new THREE.Vector3(Math.cos(th) * r * 1.7, y * 1.2, Math.sin(th) * r * 1.7);
  });
  const emb = new Float32Array(N * 3);
  const embAccent = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const k = i % 7;
    const c = centers[k];
    const s = 0.18 + (k % 3) * 0.06;
    emb[i * 3] = c.x + gauss() * s;
    emb[i * 3 + 1] = c.y + gauss() * s;
    emb[i * 3 + 2] = c.z + gauss() * s;
    embAccent[i] = k === 2 ? 1 : 0;
  }

  /* 3 — trajectories */
  const TRACKS = 42;
  const tracks = Array.from({ length: TRACKS }, () => ({
    a1: 0.3 + rand() * 0.6,
    f1: 0.4 + rand() * 1.1,
    p1: rand() * TAU,
    a2: rand() * 0.25,
    f2: 1.5 + rand() * 2,
    p2: rand() * TAU,
    b: 0.4 + rand() * 0.9,
    fz: 0.3 + rand() * 0.8,
    pz: rand() * TAU,
    y0: (rand() - 0.5) * 2.2,
    v: 0.025 + rand() * 0.05,
  }));
  const trkId = new Uint16Array(N);
  const trkU = new Float32Array(N);
  const trkAccent = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    trkId[i] = i % TRACKS;
    trkU[i] = rand();
    trkAccent[i] = trkId[i] % 9 === 4 ? 1 : 0;
  }

  /* 4 — confusion matrix as a 3D bar field */
  const C = 8;
  const cell = 0.58;
  const heights: number[] = [];
  for (let r = 0; r < C; r++)
    for (let c = 0; c < C; c++)
      heights.push(r === c ? 1.5 + rand() * 0.5 : rand() < 0.3 ? rand() * 0.45 : rand() * 0.08);
  const total = heights.reduce((s, h) => s + h, 0);
  const mat = new Float32Array(N * 3);
  const matAccent = new Float32Array(N);
  {
    let i = 0;
    heights.forEach((h, idx) => {
      const r = Math.floor(idx / C);
      const c = idx % C;
      const count = idx === heights.length - 1 ? N - i : Math.round((h / total) * N);
      for (let n = 0; n < count && i < N; n++, i++) {
        mat[i * 3] = (c - (C - 1) / 2) * cell + (rand() - 0.5) * cell * 0.78;
        mat[i * 3 + 1] = -1 + rand() * h;
        mat[i * 3 + 2] = (r - (C - 1) / 2) * cell + (rand() - 0.5) * cell * 0.78;
        matAccent[i] = r === c ? 1 : 0;
      }
    });
  }

  /* 5 — ribbon */
  const ribU = new Float32Array(N);
  const ribW = new Float32Array(N);
  const ribAccent = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    ribU[i] = rand();
    ribW[i] = rand() * 2 - 1;
    ribAccent[i] = Math.abs(ribW[i]) > 0.94 ? 1 : 0;
  }

  /* 0 — terrain accent: sparse */
  const terAccent = new Float32Array(N);
  for (let i = 0; i < N; i++) terAccent[i] = rand() < 0.015 ? 1 : 0;

  return {
    speed, jitter,
    stations, agKind, agStation, agU, agOff,
    emb, embAccent,
    tracks, trkId, trkU, trkAccent,
    mat, matAccent,
    ribU, ribW, ribAccent,
    terAccent,
  };
}

/** Writes the target position of point i for figure `shape` at time t into out. */
function target(d: Data, shape: number, i: number, t: number, px: number, py: number, rot: { c: number; s: number }, out: number[]) {
  switch (shape) {
    case 0: {
      const gx = i % 128;
      const gz = Math.floor(i / 128);
      const x = (gx / 127 - 0.5) * 6;
      const z = (gz / 63 - 0.5) * 3.4;
      let y =
        0.32 * Math.sin(x * 1.3 + t * 0.6) * Math.cos(z * 1.9 - t * 0.4) +
        0.14 * Math.sin(x * 2.7 - z * 1.3 + t * 0.9) +
        0.08 * (x * x + z * z) * 0.25 - 0.35;
      const dx = x - px * 3;
      const dz = z + py * 1.7;
      const dist = Math.sqrt(dx * dx + dz * dz);
      y += 0.22 * Math.exp(-dist * dist * 1.4) * Math.sin(dist * 7 - t * 4);
      out[0] = x; out[1] = y; out[2] = z;
      return;
    }
    case 1: {
      const j = i * 3;
      const st = d.stations[d.agStation[i]];
      const kind = d.agKind[i];
      if (kind === 0) {
        out[0] = st.x + d.agOff[j]; out[1] = st.y + d.agOff[j + 1]; out[2] = st.z + d.agOff[j + 2];
      } else if (kind === 1) {
        const th = d.agU[i] * TAU + t * (d.agStation[i] % 2 ? 1.4 : -1.4);
        out[0] = st.x + Math.cos(th) * 0.3;
        out[1] = st.y + Math.sin(th) * 0.3 * 0.35;
        out[2] = st.z + Math.sin(th) * 0.3;
      } else if (kind === 2) {
        const nx = d.stations[(d.agStation[i] + 1) % d.stations.length];
        const u = (d.agU[i] + t * 0.22) % 1;
        // packets bunch into small groups: quantise u softly
        const g = Math.floor(u * 7) / 7 + ((u * 7) % 1) * 0.045;
        out[0] = st.x + (nx.x - st.x) * g + d.agOff[j];
        out[1] = st.y + (nx.y - st.y) * g + Math.sin(g * Math.PI) * 0.55 + d.agOff[j + 1];
        out[2] = st.z + (nx.z - st.z) * g + d.agOff[j + 2];
      } else if (kind === 3) {
        const u = (d.agU[i] + t * 0.3) % 1;
        const w = d.agStation[i] % 2 ? u : 1 - u;
        out[0] = st.x * w + d.agOff[j];
        out[1] = st.y * w + Math.sin(w * Math.PI) * 0.25 + d.agOff[j + 1];
        out[2] = st.z * w + d.agOff[j + 2];
      } else {
        const pulse = 1 + Math.sin(t * 2.2) * 0.08;
        out[0] = d.agOff[j] * pulse; out[1] = d.agOff[j + 1] * pulse + 0.05; out[2] = d.agOff[j + 2] * pulse;
      }
      return;
    }
    case 2: {
      const j = i * 3;
      const x = d.emb[j];
      const z = d.emb[j + 2];
      out[0] = x * rot.c - z * rot.s;
      out[1] = d.emb[j + 1];
      out[2] = x * rot.s + z * rot.c;
      return;
    }
    case 3: {
      const k = d.tracks[d.trkId[i]];
      const u = (d.trkU[i] + t * k.v) % 1;
      out[0] = (u - 0.5) * 6.2;
      out[1] = k.y0 * 0.7 + k.a1 * Math.sin(u * k.f1 * TAU + k.p1) * 0.6 + k.a2 * Math.sin(u * k.f2 * TAU + k.p2);
      out[2] = k.b * Math.sin(u * k.fz * TAU + k.pz);
      return;
    }
    case 4: {
      const j = i * 3;
      out[0] = d.mat[j]; out[1] = d.mat[j + 1]; out[2] = d.mat[j + 2];
      return;
    }
    default: {
      const u = d.ribU[i];
      const w = d.ribW[i];
      const th = u * Math.PI * 3 + t * 0.35;
      out[0] = (u - 0.5) * 6.4;
      out[1] = Math.sin(u * TAU * 1.25 + t * 0.6) * 0.55 + w * 0.42 * Math.cos(th);
      out[2] = w * 0.42 * Math.sin(th);
    }
  }
}

function accentOf(d: Data, shape: number, i: number, t = 0) {
  switch (shape) {
    case 0: return d.terAccent[i];
    case 1: {
      const kind = d.agKind[i];
      if (kind === 4) return 1;
      const active = Math.floor(t * 0.9) % d.stations.length;
      if (d.agStation[i] !== active) return 0;
      return kind <= 2 ? 1 : 0;
    }
    case 2: return d.embAccent[i];
    case 3: return d.trkAccent[i];
    case 4: return d.matAccent[i];
    default: return d.ribAccent[i];
  }
}

// Per-figure group orientation (x tilt, y yaw)
const POSE: [number, number][] = [
  [0.62, 0],
  [0.42, 0],
  [0.18, 0],
  [0.32, -0.4],
  [0.58, 0.62],
  [0.18, 0],
];

type CloudProps = { shape: number; dark: boolean; active: boolean; reduced: boolean };

function Cloud({ shape, dark, active, reduced }: CloudProps) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const clock = useRef(0);
  const assembled = useRef(false);
  const data = useMemo(() => build(), []);

  const { geometry, material, scatter } = useMemo(() => {
    const rand = mulberry32(shape * 97 + 11);
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const sc = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 3 + rand() * 5;
      const th = rand() * TAU;
      const ph = Math.acos(2 * rand() - 1);
      sc[i * 3] = r * Math.sin(ph) * Math.cos(th);
      sc[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      sc[i * 3 + 2] = r * Math.cos(ph) - 2;
    }
    pos.set(sc);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aAccent", new THREE.BufferAttribute(new Float32Array(N), 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uInk: { value: new THREE.Color(dark ? "#f5f5f7" : "#1d1d1f") },
        uAccent: { value: new THREE.Color(dark ? "#2997ff" : "#0071e3") },
        uPixelRatio: { value: 1 },
        uOpacity: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float aAccent;
        uniform float uPixelRatio;
        varying float vAccent;
        varying float vDepth;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float size = mix(2.0, 3.4, aAccent);
          gl_PointSize = size * uPixelRatio * (7.0 / -mv.z);
          vAccent = aAccent;
          vDepth = clamp((-mv.z - 4.5) / 5.0, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uInk;
        uniform vec3 uAccent;
        uniform float uOpacity;
        varying float vAccent;
        varying float vDepth;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.3, d);
          vec3 col = mix(uInk, uAccent, vAccent);
          float alpha = a * mix(0.85, 0.25, vDepth) * mix(1.0, 1.15, vAccent) * uOpacity;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    return { geometry: geo, material: mat, scatter: sc };
  }, [shape, dark]);

  useFrame((state, delta) => {
    const tmp = [0, 0, 0];
    const pts = points.current;
    const grp = group.current;
    if (!pts || !grp) return;
    if (active) assembled.current = true;
    const dt = Math.min(delta, 1 / 12);
    if (!reduced) clock.current += dt;
    const t = clock.current;
    const { pointer, viewport, gl } = state;
    const frameScale = dt * 60;
    const formed = assembled.current;

    const u = (pts.material as THREE.ShaderMaterial).uniforms;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uOpacity.value += ((formed ? 1 : 0.35) - u.uOpacity.value) * (reduced ? 1 : 0.04 * frameScale);

    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    const acc = pts.geometry.attributes.aAccent as THREE.BufferAttribute;
    const p = pos.array as Float32Array;
    const a = acc.array as Float32Array;
    const rot = { c: Math.cos(t * 0.12), s: Math.sin(t * 0.12) };

    for (let i = 0; i < N; i++) {
      const j = i * 3;
      if (formed) {
        target(data, shape, i, t, pointer.x, pointer.y, rot, tmp);
      } else {
        tmp[0] = scatter[j]; tmp[1] = scatter[j + 1]; tmp[2] = scatter[j + 2];
      }
      const k = reduced ? 1 : 1 - Math.pow(1 - data.speed[i], frameScale);
      p[j] += (tmp[0] + data.jitter[j] - p[j]) * k;
      p[j + 1] += (tmp[1] + data.jitter[j + 1] - p[j + 1]) * k;
      p[j + 2] += (tmp[2] + data.jitter[j + 2] - p[j + 2]) * k;
      a[i] += ((formed ? accentOf(data, shape, i, t) : 0) - a[i]) * k;
    }
    pos.needsUpdate = true;
    acc.needsUpdate = true;

    const [rx, ry] = POSE[shape] ?? POSE[0];
    const ease = reduced ? 1 : 1 - Math.pow(0.95, frameScale);
    grp.rotation.x += (rx - pointer.y * 0.1 - grp.rotation.x) * ease;
    grp.rotation.y += (ry + pointer.x * 0.22 - grp.rotation.y) * ease;
    const fit = Math.min(1.1, viewport.width / 6.6, viewport.height / 3.6);
    grp.scale.setScalar(grp.scale.x + (fit - grp.scale.x) * ease);
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

export default function FigureScene({
  shape,
  dark = false,
  active,
  reduced = false,
}: {
  shape: number;
  dark?: boolean;
  active: boolean;
  reduced?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 7.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <Cloud shape={shape} dark={dark} active={active} reduced={reduced} />
    </Canvas>
  );
}
