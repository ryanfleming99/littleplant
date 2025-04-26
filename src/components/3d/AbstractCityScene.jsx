// src/components/3d/AboutScene.jsx (or rename to AbstractCityScene.jsx)
import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Plane, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- Configuration ---
const CITY_SIZE = 50; // Area the city covers (e.g., 50x50)
const BUILDING_COUNT = 200;
const MAX_BUILDING_HEIGHT = 8;
const MIN_BUILDING_HEIGHT = 1;
const MOVER_COUNT = 100; // Number of moving lights/cars
const MOVER_SPEED = 0.5;

// --- Building Component (for Instancing) ---
const Building = ({ position, scale }) => {
  return <Instance position={position} scale={scale} />;
};

// --- Mover Component (for Instancing) ---
const Mover = ({ index }) => {
  const ref = useRef();
  // Initialize random state per instance
  const [offsetX, offsetZ] = useMemo(
    () => [
      Math.random() * CITY_SIZE - CITY_SIZE / 2,
      Math.random() * CITY_SIZE - CITY_SIZE / 2,
    ],
    []
  );
  const speed = useMemo(() => (Math.random() + 0.2) * MOVER_SPEED, []);
  const direction = useMemo(() => (Math.random() > 0.5 ? 1 : -1), []); // Move along X or Z
  const axis = useMemo(() => (Math.random() > 0.5 ? "x" : "z"), []); // Axis of movement

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pos = ref.current.position;

    if (axis === "x") {
      pos.x = offsetX + Math.sin(time * speed) * (CITY_SIZE / 2.2) * direction;
      pos.z = offsetZ; // Keep Z constant for this axis
    } else {
      pos.x = offsetX; // Keep X constant for this axis
      pos.z = offsetZ + Math.cos(time * speed) * (CITY_SIZE / 2.2) * direction;
    }

    // Keep movers close to the ground
    pos.y = 0.1;

    // Reset if they somehow go wildly out of bounds (simple clamp)
    pos.x = THREE.MathUtils.clamp(pos.x, -CITY_SIZE / 2, CITY_SIZE / 2);
    pos.z = THREE.MathUtils.clamp(pos.z, -CITY_SIZE / 2, CITY_SIZE / 2);
  });

  return <Instance ref={ref} />;
};

// --- Main City Scene Component ---
const AbstractCityScene = () => {
  const { scene } = useThree(); // Access scene directly for fog

  // Generate building data once
  const buildingData = useMemo(() => {
    const data = [];
    for (let i = 0; i < BUILDING_COUNT; i++) {
      const x = Math.random() * CITY_SIZE - CITY_SIZE / 2;
      const z = Math.random() * CITY_SIZE - CITY_SIZE / 2;
      const height =
        Math.random() * (MAX_BUILDING_HEIGHT - MIN_BUILDING_HEIGHT) +
        MIN_BUILDING_HEIGHT;
      // Ensure buildings aren't too close to the very center (optional clear area)
      // if (Math.abs(x) < 3 && Math.abs(z) < 3) continue;
      data.push({
        key: `b_${i}`,
        position: [x, height / 2, z], // Position based on center bottom
        scale: [0.8 + Math.random() * 0.4, height, 0.8 + Math.random() * 0.4], // Random width/depth too
      });
    }
    return data;
  }, []);

  // Set scene background and fog
  useMemo(() => {
    scene.background = new THREE.Color("#0d0d1a"); // Same as body background
    scene.fog = new THREE.FogExp2("#0d0d1a", 0.035); // Exponential fog
    // scene.fog = new THREE.Fog('#0d0d1a', 10, 50); // Linear fog
  }, [scene]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <hemisphereLight
        skyColor="#556699"
        groundColor="#223344"
        intensity={0.4}
      />
      <directionalLight
        position={[10, 20, 15]}
        intensity={0.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-CITY_SIZE / 2}
        shadow-camera-right={CITY_SIZE / 2}
        shadow-camera-top={CITY_SIZE / 2}
        shadow-camera-bottom={-CITY_SIZE / 2}
      />
      {/* Optional subtle point light for color */}
      <pointLight
        position={[0, 5, 0]}
        color="#8a4ff_f"
        intensity={0.5}
        distance={30}
      />

      {/* Ground Plane */}
      <Plane
        args={[CITY_SIZE, CITY_SIZE]}
        rotation={[-Math.PI / 2, 0, 0]} // Rotate flat
        position={[0, -0.01, 0]} // Slightly below origin
        receiveShadow
      >
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
      </Plane>

      {/* Buildings */}
      <Instances
        limit={buildingData.length}
        range={buildingData.length}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3a3a5e" roughness={0.6} metalness={0.2} />
        {buildingData.map((props) => (
          <Building key={props.key} {...props} />
        ))}
      </Instances>

      {/* Movers (Lights/Cars) */}
      <Instances limit={MOVER_COUNT} range={MOVER_COUNT}>
        <boxGeometry args={[0.3, 0.1, 0.6]} /> {/* Small rectangular shape */}
        {/* Emissive material to make them glow */}
        <meshStandardMaterial
          emissive="#4ff_fa9"
          color="#4ff_fa9"
          roughness={0.8}
          metalness={0.1}
        />
        {Array.from({ length: MOVER_COUNT }).map((_, i) => (
          <Mover key={`m_${i}`} index={i} />
        ))}
      </Instances>

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true} // Panning is useful for cities
        autoRotate={true}
        autoRotateSpeed={0.1} // Very slow auto-rotation
        enableDamping={true}
        dampingFactor={0.05}
        maxDistance={40}
        minDistance={5}
        maxPolarAngle={Math.PI / 2.2} // Don't let user look straight down or under
        minPolarAngle={Math.PI / 6} // Don't let user look too low
        target={[0, 2, 0]} // Target slightly above ground
      />

      {/* Postprocessing Effects */}
      <EffectComposer>
        <Bloom
          intensity={0.8} // Adjust bloom intensity
          luminanceThreshold={0.5} // Bloom brighter things
          luminanceSmoothing={0.3}
          mipmapBlur={true}
          height={480} // Lower resolution for performance boost
        />
      </EffectComposer>
    </>
  );
};

// Make sure to export the correct component name
export default AbstractCityScene;
