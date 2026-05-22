import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Center } from '@react-three/drei';
import gsap from 'gsap';
import { useOrbitSnapBack } from './hooks/useOrbitSnapBack';
import { addEdgeLines } from './utils/threeUtils';

function RealPiModel(props) {
  const { scene } = useGLTF('/raspberrypi5.glb');

  useEffect(() => {
    addEdgeLines(scene, { hideSolid: true });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

function Scene({ onAnimComplete }) {
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.set(0, -Math.PI, 0);
    groupRef.current.position.set(0, 0, 0);

    const ctx = gsap.context(() => {
      gsap.to(groupRef.current.rotation, {
        x: Math.PI / 4,
        y: -Math.PI / 6,
        z: 0,
        duration: 3.5,
        ease: 'power3.inOut',
        delay: 0.5,
        onComplete: () => {
          if (onAnimComplete) onAnimComplete();
        },
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

  const { controlsRef, handleInteractionStart, handleInteractionEnd } = useOrbitSnapBack(
    () => setAutoRotate(true)
  );

  const handleDragStart = () => {
    handleInteractionStart();
  };

  const handleDragEnd = () => {
    setAutoRotate(false);
    handleInteractionEnd();
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
        onStart={handleDragStart}
        onEnd={handleDragEnd}
      />
    </Canvas>
  );
}
