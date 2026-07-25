import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import { useOrbitSnapBack } from './hooks/useOrbitSnapBack';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useSceneMeshes } from './hooks/useSceneMeshes';
import { addEdgeLines, setMeshOpacity } from './utils/threeUtils';

function ESPModel({ scrollProgress, ...props }) {
  // useMeshopt=true wires EXT_meshopt_compression decoding; useDraco left at default.
  const { scene } = useGLTF('/esp32.glb', undefined, true);
  const meshesRef = useSceneMeshes(scene, () => {
    addEdgeLines(scene, { transparent: true });
  });

  useFrame(() => {
    const meshes = meshesRef.current;
    if (!meshes.length) return;

    const maxSpread = 0.0025;
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

export default function ESP32Canvas({ isMobile }) {
  const scrollProgress = useScrollProgress('about-section');
  const { controlsRef, handleInteractionStart, handleInteractionEnd } = useOrbitSnapBack();

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 6], fov: 45 }}
      className={`w-full h-full ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}`}
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
      resize={{ offsetSize: true }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: false }}
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
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={!isMobile}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />
    </Canvas>
  );
}
