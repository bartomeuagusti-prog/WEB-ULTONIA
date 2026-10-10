import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  ContactShadows,
  Instances,
  Instance,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

const MAT_W = 4.3;
const MAT_D = 2.7;
const EXPLODE_K = 1.15;

/* ---------- Procedural textures ---------- */
function makeQuiltTexture() {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f4f3ee";
  ctx.fillRect(0, 0, s, s);
  const step = s / 6;
  ctx.strokeStyle = "rgba(110,110,100,0.38)";
  ctx.lineWidth = 6;
  for (let i = -6; i <= 12; i++) {
    ctx.beginPath();
    ctx.moveTo(i * step, 0);
    ctx.lineTo(i * step + s, s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i * step, s);
    ctx.lineTo(i * step + s, 0);
    ctx.stroke();
  }
  // tuft dimples at diamond centers
  for (let x = 0; x <= 6; x++) {
    for (let y = 0; y <= 6; y++) {
      ctx.fillStyle = "rgba(80,80,70,0.45)";
      ctx.beginPath();
      ctx.arc(x * step, y * step, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // faint BIOCERAMICS branding text
  ctx.fillStyle = "rgba(120,120,110,0.32)";
  ctx.font = "bold 22px Arial";
  ctx.textAlign = "center";
  for (let row = 0; row < 4; row++) {
    ctx.save();
    ctx.translate(s / 2, 70 + row * 130);
    ctx.fillText("BIOCERAMICS", 0, 0);
    ctx.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 2.4);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeCoirTexture() {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#8a4f29";
  ctx.fillRect(0, 0, s, s);
  const palette = ["#6d3c1b", "#a4693c", "#7d4622", "#b87b46", "#5c3216"];
  for (let i = 0; i < 4200; i++) {
    const x = Math.random() * s;
    const y = Math.random() * s;
    const len = 6 + Math.random() * 18;
    const ang = (Math.random() - 0.5) * 0.9;
    ctx.strokeStyle = palette[(Math.random() * palette.length) | 0];
    ctx.globalAlpha = 0.5 + Math.random() * 0.5;
    ctx.lineWidth = 1 + Math.random() * 1.4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 2);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ---------- Layers (bottom -> top), symmetric like the reference ---------- */
const BOX_LAYERS = [
  { key: "cover-b", t: 0.16, kind: "quilt" },
  { key: "sep-b", t: 0.07, kind: "felt" },
  { key: "foam-b", t: 0.18, kind: "foam" },
  { key: "coir-b", t: 0.16, kind: "coir" },
  { key: "core", t: 0.62, kind: "core" },
  { key: "coir-t", t: 0.16, kind: "coir" },
  { key: "foam-t", t: 0.18, kind: "foam" },
  { key: "sep-t", t: 0.07, kind: "felt" },
  { key: "cover-t", t: 0.16, kind: "quilt" },
];

function computeRestingY() {
  const total = BOX_LAYERS.reduce((s, l) => s + l.t, 0);
  let cursor = -total / 2;
  return BOX_LAYERS.map((l) => {
    const y = cursor + l.t / 2;
    cursor += l.t;
    return y;
  });
}
const RESTING_Y = computeRestingY();

/* ---------- Metal coil spring (a few exposed in the centre) ---------- */
function Coil({ position, height, radius }) {
  const rings = 5;
  return (
    <group position={position}>
      {Array.from({ length: rings }).map((_, k) => (
        <mesh key={k} position={[0, -height / 2 + (height / (rings - 1)) * k, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, radius * 0.16, 8, 18]} />
          <meshStandardMaterial color="#c7ccca" roughness={0.28} metalness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Spring core (teal sides + white centre + metal coils, grey frame + handle) ---------- */
function SpringCore({ thickness }) {
  const cols = 15;
  const rows = 9;
  const built = useMemo(() => {
    const springs = [];
    const padX = 0.42;
    const padZ = 0.42;
    const usableW = MAT_W - padX * 2;
    const usableD = MAT_D - padZ * 2;
    const spacingX = usableW / (cols - 1);
    const spacingZ = usableD / (rows - 1);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = -usableW / 2 + spacingX * i;
        const z = -usableD / 2 + spacingZ * j;
        const teal = i <= 1 || i >= cols - 2;
        springs.push({ pos: [x, 0, z], color: teal ? "#1f9d93" : "#eef0ea", teal });
      }
    }
    return { springs, spacingX, spacingZ, usableD };
  }, []);

  const springH = thickness * 0.99;
  const radius = Math.min(built.spacingX, built.spacingZ) * 0.46;

  // beaded "pocket spring" profile (stacked bulges) via a lathe geometry
  const beadGeom = useMemo(() => {
    const pts = [];
    const seg = 48;
    const beads = 4;
    pts.push(new THREE.Vector2(0.001, -springH / 2));
    for (let k = 0; k <= seg; k++) {
      const ty = k / seg;
      const y = -springH / 2 + ty * springH;
      const bulge = 0.66 + 0.34 * Math.abs(Math.sin(ty * Math.PI * beads));
      pts.push(new THREE.Vector2(radius * bulge, y));
    }
    pts.push(new THREE.Vector2(0.001, springH / 2));
    return new THREE.LatheGeometry(pts, 16);
  }, [radius, springH]);

  // a few bare metal coils sitting in the front-centre, in place of some white springs
  const coils = useMemo(() => {
    const out = [];
    const frontZ = built.usableD / 2;
    for (let n = 0; n < 5; n++) {
      out.push([(-2 + n) * built.spacingX, 0, frontZ - built.spacingZ * 0.1]);
    }
    return out;
  }, [built]);

  return (
    <group>
      <Instances limit={built.springs.length} range={built.springs.length} castShadow receiveShadow>
        <primitive object={beadGeom} attach="geometry" />
        <meshStandardMaterial roughness={0.58} metalness={0.05} />
        {built.springs.map((d, idx) => (
          <Instance key={idx} position={d.pos} color={d.color} />
        ))}
      </Instances>

      {coils.map((p, idx) => (
        <Coil key={idx} position={p} height={springH} radius={radius * 0.9} />
      ))}

      {/* dark grey tray under the springs */}
      <RoundedBox args={[MAT_W, 0.07, MAT_D]} radius={0.03} smoothness={3} position={[0, -springH / 2 - 0.03, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#3c4548" roughness={0.85} metalness={0.05} />
      </RoundedBox>

      {/* back and right upholstered grey walls (front + left stay open, exposing the core) */}
      <RoundedBox args={[MAT_W, springH + 0.06, 0.07]} radius={0.02} smoothness={3} position={[0, 0, -MAT_D / 2 + 0.02]} castShadow receiveShadow>
        <meshStandardMaterial color="#3c4548" roughness={0.82} metalness={0.05} />
      </RoundedBox>
      <RoundedBox args={[0.07, springH + 0.06, MAT_D]} radius={0.02} smoothness={3} position={[MAT_W / 2 - 0.02, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#3c4548" roughness={0.82} metalness={0.05} />
      </RoundedBox>

      {/* side fabric handle on the right wall */}
      <group position={[MAT_W / 2 + 0.06, 0, 0]}>
        <RoundedBox args={[0.1, 0.2, 0.8]} radius={0.05} smoothness={3} castShadow>
          <meshStandardMaterial color="#454f52" roughness={0.8} metalness={0.05} />
        </RoundedBox>
        <mesh position={[0.03, 0, 0.36]}>
          <boxGeometry args={[0.1, 0.14, 0.06]} />
          <meshStandardMaterial color="#c9cdcb" roughness={0.35} metalness={0.85} />
        </mesh>
        <mesh position={[0.03, 0, -0.36]}>
          <boxGeometry args={[0.1, 0.14, 0.06]} />
          <meshStandardMaterial color="#c9cdcb" roughness={0.35} metalness={0.85} />
        </mesh>
      </group>
    </group>
  );
}

function Layer({ layer, quiltTex, coirTex }) {
  if (layer.kind === "core") return <SpringCore thickness={layer.t} />;

  let material;
  if (layer.kind === "quilt") {
    material = <meshStandardMaterial map={quiltTex} bumpMap={quiltTex} bumpScale={0.04} color="#ffffff" roughness={0.9} metalness={0.02} />;
  } else if (layer.kind === "coir") {
    material = <meshStandardMaterial map={coirTex} color="#ffffff" roughness={1.0} metalness={0.0} />;
  } else if (layer.kind === "felt") {
    material = <meshStandardMaterial color="#6f7673" roughness={0.85} metalness={0.05} />;
  } else {
    material = <meshStandardMaterial color="#e8dab6" roughness={0.96} metalness={0.0} />;
  }

  return (
    <RoundedBox
      args={[MAT_W, layer.t, MAT_D]}
      radius={Math.min(0.06, layer.t / 2 - 0.004)}
      smoothness={4}
      castShadow
      receiveShadow
    >
      {material}
    </RoundedBox>
  );
}

function MattressGroup({ explodeRef, reducedMotion }) {
  const refs = useRef([]);
  const quiltTex = useMemo(() => makeQuiltTexture(), []);
  const coirTex = useMemo(() => makeCoirTexture(), []);

  useFrame((_, delta) => {
    const e = explodeRef.current ?? 0;
    // Time-based so the pose still settles when frames are slow. ~0.1 at 60fps.
    const blend = reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, 0.1) / 0.12);
    BOX_LAYERS.forEach((layer, i) => {
      const g = refs.current[i];
      if (!g) return;
      const target = RESTING_Y[i] * (1 + EXPLODE_K * e);
      g.position.y += (target - g.position.y) * blend;
    });
  });

  return (
    <group rotation={[0, -0.15, 0]}>
      {BOX_LAYERS.map((layer, i) => (
        <group
          key={layer.key}
          ref={(el) => {
            if (el && refs.current[i] !== el) el.position.y = RESTING_Y[i];
            refs.current[i] = el;
          }}
        >
          <Layer layer={layer} quiltTex={quiltTex} coirTex={coirTex} />
        </group>
      ))}
    </group>
  );
}

function stackExtent(explode) {
  const scale = 1 + EXPLODE_K * explode;
  let minY = Infinity;
  let maxY = -Infinity;
  RESTING_Y.forEach((y, i) => {
    const center = y * scale;
    const half = BOX_LAYERS[i].t / 2;
    minY = Math.min(minY, center - half);
    maxY = Math.max(maxY, center + half);
  });
  return { minY, maxY };
}

function FitCamera() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const controls = useThree((state) => state.controls);
  const fitted = useRef("");

  useFrame(() => {
    if (!controls) return;
    const key = `${Math.round(size.width)}x${Math.round(size.height)}`;
    if (fitted.current === key) return;

    const { minY, maxY } = stackExtent(1);
    const span = maxY - minY;
    // Sit the stack slightly above center so the top layers stay clear of the panel edge.
    const centerY = (minY + maxY) / 2 - span * 0.05;
    const vFov = (camera.fov * Math.PI) / 180;
    const aspect = Math.max(0.35, size.width / Math.max(1, size.height));
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    // 0.7 / 0.88 leave padding inside the canvas on both axes.
    const distV = span / 2 / Math.tan(vFov / 2) / 0.7;
    const distH = 5.05 / 2 / Math.tan(hFov / 2) / 0.88;
    const dist = Math.max(distV, distH);

    const offset = camera.position.clone().sub(controls.target);
    if (offset.lengthSq() < 0.01) offset.set(5.2, 5.2, 8.6);
    offset.setLength(dist);
    controls.target.set(0, centerY, 0);
    camera.position.copy(controls.target).add(offset);
    camera.lookAt(controls.target);
    controls.update();
    fitted.current = key;
  });

  return null;
}

function Scene({ explodeRef, reducedMotion }) {
  const mattress = <MattressGroup explodeRef={explodeRef} reducedMotion={reducedMotion} />;
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 10, 6]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-7, 5, -5]} intensity={0.4} color="#cfe9c0" />
      <pointLight position={[0, 6, 8]} intensity={0.45} />

      {reducedMotion ? (
        mattress
      ) : (
        <Float speed={1.0} rotationIntensity={0} floatIntensity={0.3} floatingRange={[0, 0.1]}>
          {mattress}
        </Float>
      )}

      <ContactShadows position={[0, -2.05, 0]} opacity={0.3} scale={14} blur={2.8} far={5} color="#0b2016" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.46}
        makeDefault
      />
      <FitCamera />
    </>
  );
}

export default function Mattress3D({ explodeRef, reducedMotion = false }) {
  return (
    <Canvas
      className="canvas-grab"
      shadows
      dpr={[1, 2]}
      camera={{ position: [5.2, 6.4, 8.6], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      data-testid="mattress-3d-canvas"
    >
      <Suspense fallback={null}>
        <Scene explodeRef={explodeRef} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
