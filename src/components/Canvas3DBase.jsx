import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useOrbitSnapBack } from '../hooks/useOrbitSnapBack';

export default function Canvas3DBase({
  SceneComponent,
  cameraPosition = [0, 0, 6],
  fov = 45,
  ambientIntensity = 0.6,
  directionalLights = [
    { position: [10, 10, 5], intensity: 1.5 },
    { position: [-10, -10, -5], intensity: 0.5 },
  ],
  environmentPreset = 'city',
  orbitProps = {},
  sceneProps = {},
}) {
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
    <Canvas
      camera={{ position: cameraPosition, fov }}
      className={`w-full h-full ${sceneProps?.isMobile ? '' : 'cursor-grab active:cursor-grabbing'}`}
      style={{ pointerEvents: sceneProps?.isMobile ? 'none' : 'auto' }}
      resize={{ offsetSize: true }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: false }}
    >
      <ambientLight intensity={ambientIntensity} />
      {directionalLights.map((light, idx) => (
        <directionalLight key={idx} position={light.position} intensity={light.intensity} />
      ))}
      <SceneComponent
        onAnimComplete={() => setAutoRotate(true)}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        {...sceneProps}
      />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={7.0}
        onStart={handleDragStart}
        onEnd={handleDragEnd}
        {...orbitProps}
      />
      <Environment preset={environmentPreset} />
    </Canvas>
  );
}
