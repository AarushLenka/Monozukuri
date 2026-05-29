import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const group = useRef();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && !child.userData.hasEdges) {
          child.userData.hasEdges = true;
          
          child.castShadow = false;
          child.receiveShadow = false;

          // Hide the extremely dense CAD mesh faces completely
          child.material.transparent = true;
          child.material.opacity = 0;
          child.material.depthWrite = false;

          // Compute clean hard edges (threshold angle: 25 degrees)
          const edges = new THREE.EdgesGeometry(child.geometry, 1);
          const line = new THREE.LineSegments(
            edges, 
            new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })
          );
          child.add(line);
        }
      });
    }
  }, [scene]);

  return (
    <group ref={group} rotation={[0.6, 0.6, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelCanvas({ url }) {
  return (
    <Canvas camera={{ position: [0, 0, 140], fov: 45 }}>
      <Stage environment={null} intensity={0} shadows={false} adjustCamera={1.}>
        <Model url={url} />
      </Stage>
    </Canvas>
  );
}
