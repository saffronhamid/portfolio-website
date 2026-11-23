"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Shared scroll / pointer state (read inside useFrame, no re-renders) */
/* ------------------------------------------------------------------ */

function useSmoothScroll() {
  const scroll = useRef(0);
  useFrame(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = window.scrollY / max;
    scroll.current += (target - scroll.current) * 0.08;
  });
  return scroll;
}

/** Deterministic PRNG so geometry stays stable across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/*  GLSL: 3D simplex noise (Ashima / Stefan Gustavson, MIT)            */
/* ------------------------------------------------------------------ */

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/* ------------------------------------------------------------------ */
/*  Core: noise-displaced orb with fresnel rim                         */
/* ------------------------------------------------------------------ */

function CoreOrb() {
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color("#0b0b0d") },
          uColorB: { value: new THREE.Color("#34d399") },
          uColorC: { value: new THREE.Color("#e4e4e7") },
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vView;
          varying float vNoise;
          ${noise}
          void main(){
            float n = snoise(position * 1.1 + vec3(uTime * 0.18));
            vNoise = n;
            vec3 displaced = position + normal * n * 0.16;
            vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorC;
          varying vec3 vNormal;
          varying vec3 vView;
          varying float vNoise;
          void main(){
            float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
            vec3 col = mix(uColorA, uColorB, smoothstep(0.15, 0.9, fres) * 0.55);
            col = mix(col, uColorC, pow(fres, 3.0) * 0.6);
            col += uColorB * smoothstep(0.35, 0.9, vNoise) * 0.08;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.material.uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={mesh} material={material}>
      <icosahedronGeometry args={[1, 48]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Network shell: nodes + edges on an icosahedron lattice             */
/* ------------------------------------------------------------------ */

function NetworkShell() {
  const { positions, edges } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.55, 2);
    const pos = geo.getAttribute("position");
    // dedupe vertices
    const key = (x: number, y: number, z: number) =>
      `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
    const map = new Map<string, THREE.Vector3>();
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      map.set(key(v.x, v.y, v.z), v);
    }
    const unique = Array.from(map.values());
    const nodePositions = new Float32Array(unique.length * 3);
    unique.forEach((v, i) => v.toArray(nodePositions, i * 3));

    const edgesGeo = new THREE.EdgesGeometry(geo, 1);
    const edgePositions = edgesGeo.getAttribute("position").array as Float32Array;
    geo.dispose();
    return { positions: nodePositions, edges: edgePositions };
  }, []);

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a1a1aa" transparent opacity={0.14} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#fafafa"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbit rings                                                        */
/* ------------------------------------------------------------------ */

function OrbitRings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (a.current) a.current.rotation.z += d * 0.12;
    if (b.current) b.current.rotation.z -= d * 0.08;
  });
  return (
    <>
      <mesh ref={a} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.15, 0.0035, 8, 200]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.45} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.8, -0.5, 0.3]}>
        <torusGeometry args={[2.45, 0.0025, 8, 200]} />
        <meshBasicMaterial color="#fafafa" transparent opacity={0.18} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Data packets travelling along the outer ring                       */
/* ------------------------------------------------------------------ */

function Packets({ count = 6 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ offset: (i / count) * Math.PI * 2, speed: 0.25 + (i % 3) * 0.08 })),
    [count]
  );
  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    g.children.forEach((child, i) => {
      const s = seeds[i];
      const angle = s.offset + t * s.speed;
      child.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0);
    });
  });
  return (
    <group rotation={[Math.PI / 2.4, 0.2, 0]}>
      <group ref={group}>
        {seeds.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshBasicMaterial color="#6ee7b7" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Starfield / particle dust                                          */
/* ------------------------------------------------------------------ */

function Dust({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + rand() * 18;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 6;
    }
    return arr;
  }, [count]);

  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.01;
      ref.current.rotation.x += d * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4d4d8"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene composition: pointer parallax + scroll choreography          */
/* ------------------------------------------------------------------ */

function Rig() {
  const scroll = useSmoothScroll();
  const core = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  useFrame(({ camera, size, pointer }, delta) => {
    const s = scroll.current;
    const isWide = size.width >= 900;

    // Hero: sits right of the headline. Scrolling: drifts to centre-back and recedes.
    const heroX = isWide ? 2.3 : 0;
    const heroY = isWide ? 0.1 : 1.1;
    const p = Math.min(1, s * 6); // 0 → 1 over first ~1/6 of page
    const targetX = THREE.MathUtils.lerp(heroX, 0, p);
    const targetY = THREE.MathUtils.lerp(heroY, 0, p) + Math.sin(s * Math.PI * 4) * 0.25;
    const targetScale = THREE.MathUtils.lerp(isWide ? 1 : 0.8, 1.6, p);

    if (core.current) {
      core.current.position.x += (targetX - core.current.position.x) * 0.06;
      core.current.position.y += (targetY - core.current.position.y) * 0.06;
      const targetZ = THREE.MathUtils.lerp(0, -11, p);
      core.current.position.z += (targetZ - core.current.position.z) * 0.06;
      const sc = core.current.scale.x + (targetScale - core.current.scale.x) * 0.06;
      core.current.scale.setScalar(sc);
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x = s * Math.PI * 1.5;
    }

    if (tilt.current) {
      tilt.current.rotation.x += (pointer.y * 0.25 - tilt.current.rotation.x) * 0.05;
      tilt.current.rotation.y += (pointer.x * 0.35 - tilt.current.rotation.y) * 0.05;
    }

    // Gentle camera dolly with scroll
    const camZ = 7 + s * 2.5;
    camera.position.z += (camZ - camera.position.z) * 0.05;
    camera.position.x += (pointer.x * 0.3 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Dust />
      <group ref={core}>
        <group ref={tilt}>
          <CoreOrb />
          <NetworkShell />
          <OrbitRings />
          <Packets />
        </group>
      </group>
    </>
  );
}

export default function NeuralScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <fog attach="fog" args={["#0a0a0a", 9, 26]} />
      <Rig />
    </Canvas>
  );
}
