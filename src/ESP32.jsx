import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Center } from '@react-three/drei';
import gsap from 'gsap';

function ESPModel({ scrollProgress, ...props }) {
  const { scene } = useGLTF('/esp32.glb');
  const meshesRef = useRef([]);

  useEffect(() => {
    const meshes = [];
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Save original position
        if (!child.userData.originalPosition) {
          child.userData.originalPosition = child.position.clone();
        }

        // Clone material to avoid modifying shared cache
        if (child.material && !child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
          if (Array.isArray(child.material)) {
            child.material = child.material.map(mat => mat.clone());
          } else {
            child.material = child.material.clone();
          }
        }

        // Create feature edges with a 15-degree threshold to avoid dense wireframes
        let line = child.children.find(c => c.userData.isWireframeOutline);
        if (!line) {
          const edges = new THREE.EdgesGeometry(child.geometry, 15);
          line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 1 })
          );
          line.userData.isWireframeOutline = true;
          child.add(line);
        }
        child.userData.lineSegments = line;

        meshes.push(child);
      }
    });

    // Sort meshes by their original Z coordinate to create a layered stack order
    meshes.sort((a, b) => a.userData.originalPosition.z - b.userData.originalPosition.z);

    // Assign sorted index
    meshes.forEach((mesh, index) => {
      mesh.userData.sortedIndex = index;
    });

    meshesRef.current = meshes;
  }, [scene]);

  useFrame(() => {
    const meshes = meshesRef.current;
    if (!meshes.length) return;

    // Disassembly spread factor: maximum Z separation when scrollProgress = 0
    // Spreading out layers along the Z-axis (board thickness axis)
    const maxSpread = 0.0014; // Adjust spacing as needed
    const disassembly = 1 - scrollProgress;
    const spread = maxSpread * disassembly * 0.5;

    meshes.forEach((mesh) => {
      const origPos = mesh.userData.originalPosition;
      const sortedIdx = mesh.userData.sortedIndex;
      const middleIdx = (meshes.length - 1) / 2;

      // Translate along the local Z axis for explosion effect
      mesh.position.z = origPos.z + (sortedIdx - middleIdx) * spread;

      const line = mesh.userData.lineSegments;

      // Smooth cubic curve transition (no hard jumps)
      // Keeps the wireframe visible longer and makes the solid model fade-in extremely smooth
      const solidOpacity = Math.pow(scrollProgress, 3);
      const wireframeOpacity = 1 - Math.pow(scrollProgress, 3);

      // 1. Smoothly fade solid model
      if (mesh.material) {
        if (solidOpacity < 0.001) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => { mat.visible = false; });
          } else {
            mesh.material.visible = false;
          }
        } else {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              mat.visible = true;
              if (solidOpacity >= 0.99) {
                mat.transparent = false;
                mat.opacity = 1.0;
              } else {
                mat.transparent = true;
                mat.opacity = solidOpacity;
              }
            });
          } else {
            mesh.material.visible = true;
            if (solidOpacity >= 0.99) {
              mesh.material.transparent = false;
              mesh.material.opacity = 1.0;
            } else {
              mesh.material.transparent = true;
              mesh.material.opacity = solidOpacity;
            }
          }
        }
      }

      // 2. Smoothly fade wireframe outline
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
  const controlsRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about-section');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress of Section 2 entering/scrolling into viewport
      // 0: top of Section 2 is at bottom of viewport (just entering)
      // 1: top of Section 2 reaches top of viewport (fully in view)
      const totalDist = viewportHeight;
      const distScrolled = viewportHeight - rect.top;
      const progress = Math.min(Math.max(distScrolled / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInteractionStart = () => {
    if (controlsRef.current) {
      gsap.killTweensOf(controlsRef.current.object.position);
    }
  };

  const handleInteractionEnd = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;

      // Find spherical coordinates of camera position
      const spherical = new THREE.Spherical().setFromVector3(camera.position);

      // Find nearest multiple of 2PI for shortest spin back
      const targetTheta = Math.round(spherical.theta / (Math.PI * 2)) * Math.PI * 2;

      gsap.to(spherical, {
        radius: 6,
        phi: Math.PI / 2,
        theta: targetTheta,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.position.setFromSpherical(spherical);
          controlsRef.current.update();
        }
      });
    }
  };

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
