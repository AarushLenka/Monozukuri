import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Center } from '@react-three/drei';
import { useOrbitSnapBack } from './hooks/useOrbitSnapBack';
import { addEdgeLines, setMeshOpacity } from './utils/threeUtils';

function ESPModel({ scrollProgress, ...props }) {
  const { scene } = useGLTF('/esp32.glb');
  const meshesRef = useRef([]);

  useEffect(() => {
    const meshes = [];

    scene.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;

      if (!child.userData.originalPosition) {
        child.userData.originalPosition = child.position.clone();
      }

      // Clone material to avoid modifying shared cache
      if (child.material && !child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
        child.material = Array.isArray(child.material)
          ? child.material.map((mat) => mat.clone())
          : child.material.clone();
      }

      meshes.push(child);
    });

    // Add edge lines with transparency support for the fade animation
    addEdgeLines(scene, { transparent: true });

    // Sort by original Z to create a layered stack order
    meshes.sort((a, b) => a.userData.originalPosition.z - b.userData.originalPosition.z);
    meshes.forEach((mesh, index) => {
      mesh.userData.sortedIndex = index;
    });

    meshesRef.current = meshes;
  }, [scene]);

  useFrame(() => {
    const meshes = meshesRef.current;
    if (!meshes.length) return;

    const maxSpread = 0.0017;
    const spread = maxSpread * (1 - scrollProgress) * 0.5;

    // Solid mesh starts at low opacity and ramps up to fully opaque on scroll
    const BASE_OPACITY = 0.08;
    const solidOpacity = BASE_OPACITY + (1 - BASE_OPACITY) * Math.pow(scrollProgress, 3);

    meshes.forEach((mesh) => {
      const origPos = mesh.userData.originalPosition;
      const sortedIdx = mesh.userData.sortedIndex;
      const middleIdx = (meshes.length - 1) / 2;

      // Explode layers along Z
      mesh.position.z = origPos.z + (sortedIdx - middleIdx) * spread;

      // Solid mesh always visible, fades from near-transparent to opaque
      setMeshOpacity(mesh, solidOpacity);

      // Outlines fade out as the solid model fades in
      const wireframeOpacity = 1 - Math.pow(scrollProgress, 3);
      const line = mesh.userData.lineSegments;
      if (line) {
        if (wireframeOpacity < 0.01) {
          line.visible = false;
        } else {
          line.visible = true;
          line.material.opacity = wireframeOpacity;
        }
      }
    });
  });

  return <primitive object={scene} {...props} />;
}

export default function ESP32Canvas() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { controlsRef, handleInteractionStart, handleInteractionEnd } = useOrbitSnapBack();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about-section');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distScrolled = viewportHeight - rect.top;
      const progress = Math.min(Math.max(distScrolled / viewportHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.0} />
      <directionalLight position={[10, 10, 5]} intensity={0.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />
      <React.Suspense fallback={null}>
        <group position={[0, -0.2, 0]} rotation={[Math.PI / 7, Math.PI / 4, Math.PI / 6]}>
          <Center>
            <ESPModel scrollProgress={scrollProgress} scale={25} />
          </Center>
        </group>
      </React.Suspense>
      <Environment preset="city" environmentIntensity={0.3} intensity={0.4} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />
    </Canvas>
  );
}
