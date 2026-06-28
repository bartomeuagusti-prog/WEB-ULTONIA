import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  ContactShadows,
  Instances,
  Instance,
  Float,
} from "@react-three/drei";

const MAT_W = 4.2;
const MAT_D = 2.6;
const EXPLODE_K = 1.8;

// Symmetric premium build (bottom -> top), inspired by the reference exploded mattress.
const LAYERS = [
  { key: "cover-b", type: "box", t: 0.16, color: "#f8f8f4", rough: 0.85, metal: 0.02 },
  { key: "fiber-b", type: "box", t: 0.12, color: "#f1f1ec", rough: 1.0, metal: 0.0 },
  { key: "visco-b", type: "box", t: 0.18, color: "#e7ddc4", rough: 0.95, metal: 0.0 },
  { key: "foam-b", type: "box", t: 0.2, color: "#d3d8d2", rough: 0.95, metal: 0.0 },
  { key: "sep-b", type: "box", t: 0.05, color: "#a7afaa", rough: 0.5, metal: 0.12 },
  { key: "springs", type: "springs", t: 0.62 },
  { key: "sep-t", type: "box", t: 0.05, color: "#a7afaa", rough: 0.5, metal: 0.12 },
  { key: "foam-t", type: "box", t: 0.2, color: "#d3d8d2", rough: 0.95, metal: 0.0 },
  { key: "visco-t", type: "box", t: 0.18, color: "#e7ddc4", rough: 0.95, metal: 0.0 },
  { key: "fiber-t", type: "box", t: 0.12, color: "#f1f1ec", rough: 1.0, metal: 0.0 },
  { key: "cover-t", type: "box", t: 0.16, color: "#f8f8f4", rough: 0.85, metal: 0.02 },
];

function computeRestingY() {
  const total = LAYERS.reduce((s, l) => s + l.t, 0);
  let cursor = -total / 2;
  return LAYERS.map((l) => {
    const y = cursor + l.t / 2;
    cursor += l.t;
    return y;
  });
}
const RESTING_Y = computeRestingY();

function Springs({ thickness }) {
  const cols = 13;
  const rows = 8;
  const data = useMemo(() => {
    const arr = [];
    const padX = 0.4;
    const padZ = 0.36;
    const usableW = MAT_W - padX * 2;
    const usableD = MAT_D - padZ * 2;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = -usableW / 2 + (usableW / (cols - 1)) * i;
        const z = -usableD / 2 + (usableD / (rows - 1)) * j;
        const border = i === 0 || i === cols - 1 || j === 0 || j === rows - 1;
        arr.push({ pos: [x, 0, z], color: border ? "#1c8a78" : "#f2f3ef" });
      }
    }
    return arr;
  }, []);

  return (
    <Instances limit={data.length} castShadow receiveShadow>
      <cylinderGeometry args={[0.135, 0.135, thickness * 0.95, 14]} />
      <meshStandardMaterial roughness={0.7} metalness={0.05} />
      {data.map((d, idx) => (
        <Instance key={idx} position={d.pos} color={d.color} />
      ))}
    </Instances>
  );
}

function MattressGroup({ explodeRef }) {
  const refs = useRef([]);
  useFrame(() => {
    const e = explodeRef.current ?? 0;
    LAYERS.forEach((layer, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const target = RESTING_Y[i] * (1 + EXPLODE_K * e);
      mesh.position.y += (target - mesh.position.y) * 0.1;
    });
  });

  return (
    <group rotation={[0, -0.35, 0]}>
      {LAYERS.map((layer, i) => (
        <group key={layer.key} ref={(el) => (refs.current[i] = el)} position={[0, RESTING_Y[i], 0]}>
          {layer.type === "springs" ? (
            <Springs thickness={layer.t} />
          ) : (
            <RoundedBox
              args={[MAT_W, layer.t, MAT_D]}
              radius={Math.min(0.07, layer.t / 2 - 0.005)}
              smoothness={4}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial color={layer.color} roughness={layer.rough} metalness={layer.metal} />
            </RoundedBox>
          )}
        </group>
      ))}
    </group>
  );
}

function Scene({ explodeRef }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 9, 5]} intensity={1.7} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 5, -4]} intensity={0.45} color="#bfe9a8" />
      <pointLight position={[0, 5, 7]} intensity={0.5} />

      <Float speed={1.1} rotationIntensity={0} floatIntensity={0.35} floatingRange={[0, 0.12]}>
        <MattressGroup explodeRef={explodeRef} />
      </Float>

      <ContactShadows position={[0, -2.0, 0]} opacity={0.32} scale={13} blur={2.8} far={5} color="#0b2016" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate
        autoRotateSpeed={1.0}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 1.95}
        makeDefault
      />
    </>
  );
}

export default function Mattress3D({ explodeRef }) {
  return (
    <Canvas
      className="canvas-grab"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.4, 10.5], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      data-testid="mattress-3d-canvas"
    >
      <Suspense fallback={null}>
        <Scene explodeRef={explodeRef} />
      </Suspense>
    </Canvas>
  );
}
