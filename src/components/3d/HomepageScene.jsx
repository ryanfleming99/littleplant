import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Edges, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const HomepageScene = () => {
  const meshRef = useRef();
  const edgesRef = useRef();
  const particlesRef = useRef();
  const { size, viewport } = useThree(); // Get viewport info for mouse mapping
  const aspect = size.width / viewport.width;

  // Generate positions for particles
  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const distanceFactor = 15; // How far particles spread
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * distanceFactor;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Rotate the central shape and its edges
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current.rotation); // Sync rotation
    }

    // Animate particles based on mouse position
    if (particlesRef.current) {
      const { pointer } = state;
      // Map pointer coords (-1 to 1) to rotation angles
      const targetRotationY = pointer.x * 0.3;
      const targetRotationX = -pointer.y * 0.3;

      // Smoothly interpolate particle rotation towards target
      particlesRef.current.rotation.y = THREE.MathUtils.lerp(
        particlesRef.current.rotation.y,
        targetRotationY,
        0.1 // Smoothing factor
      );
      particlesRef.current.rotation.x = THREE.MathUtils.lerp(
        particlesRef.current.rotation.x,
        targetRotationX,
        0.1 // Smoothing factor
      );

      // Add a subtle independent drift
      particlesRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} />
      {/* Subtle colored point light for atmosphere */}
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4a90e2" />

      {/* Central Geometric Shape */}
      <Icosahedron ref={meshRef} args={[1.5, 0]} position={[0, 0, 0]}>
        {/* Use PhysicalMaterial for more realistic options like transmission */}
        <meshPhysicalMaterial
          color="#FFFFFF" // Base color (can be subtle)
          metalness={0.1}
          roughness={0.1}
          transmission={0.95} // Make it glass-like / transparent
          thickness={0.5} // Required for transmission
          ior={1.5} // Index of refraction
          transparent={true}
          opacity={0.8}
        />
      </Icosahedron>

      {/* Edges for the wireframe effect */}
      <Edges
        ref={edgesRef}
        geometry={meshRef.current?.geometry} // Use geometry from the mesh
        threshold={1} // Display all edges
      >
        <lineBasicMaterial color="#666666" linewidth={1} />
      </Edges>

      {/* Particle Field */}
      <Points
        ref={particlesRef}
        positions={particles}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#888888" // Muted particle color
          size={0.015} // Adjust particle size
          sizeAttenuation={true}
          depthWrite={false} // Important for blending
        />
      </Points>
    </>
  );
};

export default HomepageScene;
