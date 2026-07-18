"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

let isPageHidden = false;
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    isPageHidden = document.hidden;
  });
}

const TRAIL_LENGTH = 60;

function initHistory(): THREE.Vector3[] {
  const h: THREE.Vector3[] = [];
  // 倒推时间：预填 60 个真实轨道点，尾部→头部自然衔接 t=0
  for (let i = 0; i < 60; i++) {
    const pastT = -(60 - i) * 0.04;
    h.push(new THREE.Vector3(
      2.5 * Math.sin(pastT * 0.4),
      1.5 * Math.cos(pastT * 0.6),
      2.0 * Math.sin(pastT * 0.3),
    ));
  }
  return h;
}

function generateTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const text = "English Listening & Speaking";

  ctx.font = 'bold 40px "Arial", sans-serif';
  ctx.fillStyle = "#222222";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 赤道正中，随球自转
  const totalWidth = size * 0.65;
  const gap = totalWidth / (text.length - 1);
  const startX = cx - totalWidth / 2;

  for (let i = 0; i < text.length; i++) {
    const x = startX + i * gap;
    ctx.fillText(text[i], x, cy);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function TextSphere() {
  const groupRef = useRef<THREE.Group>(null!);

  const texRef = useRef<THREE.CanvasTexture | null>(null);
  if (texRef.current === null && typeof document !== "undefined") {
    texRef.current = generateTexture();
  }
  const texture = texRef.current;

  useFrame(() => {
    if (groupRef.current && !isPageHidden) {
      groupRef.current.rotation.y -= 0.002;
    }
  });

  if (!texture) return null;

  return (
    <group ref={groupRef} position={[0, 2.2, -5.5]} rotation={[0.4, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function CometTrail() {
  const historyRef = useRef<THREE.Vector3[] | null>(null);
  if (historyRef.current === null) {
    historyRef.current = initHistory();
  }

  const headColor = useMemo(() => new THREE.Color("#FF2A6D"), []);
  const tailColor = useMemo(() => new THREE.Color("#2979FF"), []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(TRAIL_LENGTH * 3);
    // 初始顶点推到极远处（Z=999 远超出 far=20），截头去尾
    for (let i = 0; i < TRAIL_LENGTH * 3; i += 3) {
      pos[i + 2] = 999;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",   new THREE.BufferAttribute(new Float32Array(TRAIL_LENGTH * 3), 3));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.NormalBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        opacity: 0,
      }),
    [],
  );

  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame(({ clock }) => {
    if (isPageHidden) return;
    const hist = historyRef.current;
    if (!hist) return;

    const t = clock.elapsedTime;

    // 首 1.5 秒速度/透明度渐变入，消除初始弹射闪烁
    const ramp = Math.min(t / 1.5, 1.0);
    const spd = ramp;

    const hx = 2.5 * Math.sin(t * 0.4 * spd);
    const hy = 1.5 * Math.cos(t * 0.6 * spd);
    const hz = 2.0 * Math.sin(t * 0.3 * spd);

    hist.push(new THREE.Vector3(hx, hy, hz));
    if (hist.length > TRAIL_LENGTH) hist.shift();
    if (hist.length < 2) return;

    const curve = new THREE.CatmullRomCurve3(hist, false, "catmullrom", 0.5);
    if (curve.getLength() < 0.01) return;

    const pos = geometry.attributes.position.array as Float32Array;
    const col = geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const ratio = i / (TRAIL_LENGTH - 1);
      const p = curve.getPointAt(ratio);

      pos[i * 3]     = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;

      const c = headColor.clone().lerp(tailColor, ratio);
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;

    material.opacity = 0.8 * ramp;
  });

  return <primitive object={line} />;
}

class EB extends React.Component<
  { children: React.ReactNode },
  { err: boolean }
> {
  constructor(props: { children: React.ReactNode }) { super(props); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch() {}
  render() { return this.state.err ? null : this.props.children; }
}

export function ThreeGlobeBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }}>
      <EB>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 20 }}
        >
          <Suspense fallback={null}>
            <TextSphere />
            <CometTrail />
          </Suspense>
        </Canvas>
      </EB>
    </div>
  );
}
