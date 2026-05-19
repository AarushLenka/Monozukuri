import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, useGLTF, Center } from '@react-three/drei';
import gsap from 'gsap';

function RealPiModel(props) {
  const { scene } = useGLTF('/raspberrypi5.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Prevent adding multiple edges if useEffect runs twice
        const hasEdges = child.children.some(c => c.type === 'LineSegments');
        if (!hasEdges) {
          // Create feature edges with a 15-degree threshold to avoid dense wireframes
          const edges = new THREE.EdgesGeometry(child.geometry, 15);
          const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: '#ffffff' })
          );
          child.add(line);
        }

        // Hide the original solid mesh
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => { mat.visible = false; });
          } else {
            child.material.visible = false;
          }
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

function Scene({ onAnimComplete }) {
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;

    // Initial Side View (Looking at it edge-on)
    groupRef.current.rotation.set(0, -Math.PI, 0);
    groupRef.current.position.set(0, 0, 0);

    const ctx = gsap.context(() => {
      // Animate to top-angled view after a short delay
      gsap.to(groupRef.current.rotation, {
        x: Math.PI / 4,    // Tilt down to see top
        y: -Math.PI / 6,   // Slight rotation to see side and top
        z: 0,
        duration: 3.5,
        ease: "power3.inOut",
        delay: 0.5,
        onComplete: () => {
          if (onAnimComplete) onAnimComplete();
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef}>
      <React.Suspense fallback={null}>
        <Center>
          <RealPiModel scale={0.04} />
        </Center>
      </React.Suspense>

      <Environment preset="city" />
    </group>
  );
}

export default function RaspberryPiCanvas() {
  const [autoRotate, setAutoRotate] = useState(false);
  const controlsRef = useRef();

  const handleInteractionStart = () => {
    if (controlsRef.current) {
      gsap.killTweensOf(controlsRef.current.object.position);
    }
  };

  const handleInteractionEnd = () => {
    setAutoRotate(false);
    if (controlsRef.current) {
      const camera = controlsRef.current.object;

      // Use spherical coordinates to prevent straight-line clipping (which looks like zooming)
      const spherical = new THREE.Spherical().setFromVector3(camera.position);

      // Calculate the shortest path to the front view (0 or multiple of 2PI)
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
        },
        onComplete: () => setAutoRotate(true)
      });
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Scene onAnimComplete={() => setAutoRotate(true)} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        autoRotate={autoRotate}
        autoRotateSpeed={7.0}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />
    </Canvas>
  );
}
