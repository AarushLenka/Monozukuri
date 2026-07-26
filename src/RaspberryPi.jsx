import React, { useRef, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import Canvas3DBase from './components/Canvas3DBase';
import { addEdgeLines } from './utils/threeUtils';

function RealPiModel({ isMobile, ...props }) {
  // useMeshopt=true wires EXT_meshopt_compression decoding; useDraco left at default.
  const { scene } = useGLTF('/raspberrypi5.glb', undefined, true);

  useEffect(() => {
    if (isMobile) {
      addEdgeLines(scene, { hideSolid: true, opacity: 0.3, color: '#ffffff', linewidth: 0.5 });
    } else {
      addEdgeLines(scene, { hideSolid: true });
    }
  }, [scene, isMobile]);

  return <primitive object={scene} {...props} />;
}

function PiScene({ onAnimComplete, isLoading, isMobile }) {
  const groupRef = useRef();
  const { invalidate } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(groupRef.current.rotation, {
        x: Math.PI / 4,
        y: -Math.PI / 6,
        z: 0,
        duration: 3.5,
        ease: 'power3.inOut',
        delay: 0.2,
        onComplete: () => {
          if (onAnimComplete) onAnimComplete();
          invalidate();
        },
      });
      tween.eventCallback('onUpdate', invalidate);
    });

    return () => ctx.revert();
  }, [invalidate, isLoading, onAnimComplete]);

  return (
    <group ref={groupRef} rotation={[0, -Math.PI, 0]}>
      <React.Suspense fallback={null}>
        <Center>
          <RealPiModel scale={0.04} isMobile={isMobile} />
        </Center>
      </React.Suspense>
    </group>
  );
}

export default function RaspberryPiCanvas({ isLoading, isMobile }) {
  return (
    <Canvas3DBase
      SceneComponent={PiScene}
      sceneProps={{ isLoading, isMobile }}
      ambientIntensity={0.6}
      directionalLights={[
        { position: [10, 10, 5], intensity: 1.5 },
        { position: [-10, -10, -5], intensity: 0.5 },
      ]}
      orbitProps={{
        maxPolarAngle: Math.PI / 2,
        minPolarAngle: 0,
        autoRotateSpeed: 7.0,
        enableRotate: !isMobile,
      }}
    />
  );
}
