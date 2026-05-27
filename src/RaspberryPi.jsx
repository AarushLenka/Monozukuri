import React, { useRef, useEffect } from 'react';
import { Environment, useGLTF, Center } from '@react-three/drei';
import gsap from 'gsap';
import Canvas3DBase from './components/Canvas3DBase';
import { addEdgeLines } from './utils/threeUtils';

function RealPiModel(props) {
  const { scene } = useGLTF('/raspberrypi5.glb');

  useEffect(() => {
    addEdgeLines(scene, { hideSolid: true });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

function PiScene({ onAnimComplete, isLoading }) {
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap.to(groupRef.current.rotation, {
        x: Math.PI / 4,
        y: -Math.PI / 6,
        z: 0,
        duration: 3.5,
        ease: 'power3.inOut',
        delay: 0.2,
        onComplete: () => {
          if (onAnimComplete) onAnimComplete();
        },
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <group ref={groupRef} rotation={[0, -Math.PI, 0]}>
      <React.Suspense fallback={null}>
        <Center>
          <RealPiModel scale={0.04} />
        </Center>
      </React.Suspense>
      <Environment preset="city" />
    </group>
  );
}

export default function RaspberryPiCanvas({ isLoading }) {
  return (
    <Canvas3DBase
      SceneComponent={PiScene}
      sceneProps={{ isLoading }}
      ambientIntensity={0.6}
      directionalLights={[
        { position: [10, 10, 5], intensity: 1.5 },
        { position: [-10, -10, -5], intensity: 0.5 },
      ]}
      orbitProps={{
        maxPolarAngle: Math.PI / 2,
        minPolarAngle: 0,
        autoRotateSpeed: 7.0,
      }}
    />
  );
}
