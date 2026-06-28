import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  ContactShadows,
  Instances,
  Instance,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

const MAT_W = 4;
const MAT_D = 2.4;

// Layer definitions (bottom -> top). y = resting center; explodeY = target offset when exploded
const LAYERS = [
  { key: "base", thickness: 0.42, color: "#13351f", roughness: 0.9, metalness: 0.0, explode: 0.0 },
  { key: "springs", thickness: 0.5, color: "#b9c2bd", roughness: 0.35, metalness: 0.85, explode: 1.5 },
  { key: "comfort", thickness: 0.34, color: "#f3efe4", roughness: 0.95, metalness: 0.0, explode: 3.0 },
  { key: "cover", thickness: 0.22, color: "#cfe8b8", roughness: 0.8, metalness: 0.05, explode: 4.5 },
];

function computeRestingY() {
  const total = LAYERS.reduce((s, l) => s + l.thickness, 0);
  let cursor = -total / 2;
  return LAYERS.map((l) => {
    const y = cursor + l.thickness / 2;
    cursor += l.thickness;
    return y;
  });
}
const RESTING_Y = computeRestingY();

function Springs({ thickness }) {
  const cols = 8;
  const rows = 5;
  const positions = useMemo(() => {
    const arr = [];
    const padX = 0.45;
    const padZ = 0.4;
    const usableW = MAT_W - padX * 2;
    const usableD = MAT_D - padZ * 2;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = -usableW / 2 + (usableW / (cols - 1)) * i;
        const z = -usableD / 2 + (usableD / (rows - 1)) * j;
        arr.push([x, 0, z]);
      }
    }
    return arr;
  }, []);

  return (
    <Instances limit={positions.length} castShadow receiveShadow>
      <cylinderGeometry args={[0.12, 0.12, thickness * 0.9, 16, 1, true]} />
      <meshStandardMaterial color="#c2cbc6" roughness={0.3} metalness={0.9} side={THREE.DoubleSide} />
      {positions.map((p, idx) => (
        <Instance key={idx} position={p} />
      ))}
    </Instances>
  );
}

function MattressGroup({ explodeRef }) {
  const groupRefs = useRef([]);

  useFrame(() => {
    const e = explodeRef.current ?? 0;
    LAYERS.forEach((layer, i) => {
      const mesh = groupRefs.current[i];
      if (!mesh) return;
      const target = RESTING_Y[i] + layer.explode * e;
      mesh.position.y += (target - mesh.position.y) * 0.12;
      // slight horizontal drift on the cover & comfort for an organic exploded feel
      const targetZ = i >= 2 ? layer.explode * e * 0.15 : 0;
      mesh.position.z += (targetZ - mesh.position.z) * 0.12;
    });
  });

  return (
    <group>
      {LAYERS.map((layer, i) => (
        <group
          key={layer.key}
          ref={(el) => (groupRefs.current[i] = el)}
          position={[0, RESTING_Y[i], 0]}
        >
          {layer.key === "springs" ? (
            <Springs thickness={layer.thickness} />
          ) : (
            <RoundedBox
              args={[MAT_W, layer.thickness, MAT_D]}
              radius={Math.min(0.14, layer.thickness / 2 - 0.01)}
              smoothness={4}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color={layer.color}
                roughness={layer.roughness}
                metalness={layer.metalness}
              />
            </RoundedBox>
          )}
        </group>
      ))}
    </group>
  );
}

function Scene({ explodeRef, offsetX }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#a6e08a" />
      <pointLight position={[0, 4, 6]} intensity={0.6} />

      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4} floatingRange={[0, 0.15]}>
        <group position={[offsetX, 0, 0]}>
          <MattressGroup explodeRef={explodeRef} />
        </group>
      </Float>

      <ContactShadows
        position={[offsetX, -1.4, 0]}
        opacity={0.35}
        scale={12}
        blur={2.6}
        far={4}
        color="#0b2016"
      />

      <OrbitControls
        target={[offsetX, 0, 0]}
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={1.1}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.9}
        makeDefault
      />
    </>
  );
}

export default function Mattress3D({ explodeRef }) {
  const [offsetX, setOffsetX] = useState(0);
  useEffect(() => {
    const compute = () => setOffsetX(0);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <Canvas
      className="canvas-grab"
      shadows
      dpr={[1, 2]}
      camera={{ position: [offsetX, 2.2, 9], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      data-testid="mattress-3d-canvas"
    >
      <Suspense fallback={null}>
        <Scene explodeRef={explodeRef} offsetX={offsetX} />
      </Suspense>
    </Canvas>
  );
}
