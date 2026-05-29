import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import { addEdgeLines } from '../utils/threeUtils';

function Model({ url }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      addEdgeLines(scene, { transparent: true });
    }
  }, [scene]);

  return (
    <group rotation={[0.6, 0.6, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelCanvas({ url }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 140], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: false }}
    >
      <Stage environment={null} intensity={0} shadows={false} adjustCamera={1.}>
        <Model url={url} />
      </Stage>
    </Canvas>
  );
}
