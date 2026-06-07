import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { addEdgeLines } from '../utils/threeUtils';
import * as THREE from 'three';

function Model({ url, initialRotation, scale = 1, wireframe = false }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();

  // Compute robust centering and scaling synchronously
  const { clonedScene, finalScale, centerOffset } = useMemo(() => {
    // Clone to prevent HMR from mutating the globally cached scene object across reloads
    const cloned = scene.clone(true);
    
    // Force transform matrix updates so bounding box calculations aren't 0 on first frame
    cloned.updateMatrixWorld(true);
    
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Target base size of 10 units. If scale is 0.5, it becomes 5 units.
    const calculatedScale = maxDim > 0 ? (10 / maxDim) * scale : scale;
    
    if (wireframe) {
      addEdgeLines(cloned, { hideSolid: true, transparent: true });
    }
    
    return { 
      clonedScene: cloned,  
      finalScale: calculatedScale,
      centerOffset: center.multiplyScalar(-1) 
    };
  }, [scene, scale]);

  return (
    <group ref={groupRef} rotation={initialRotation} scale={finalScale}>
      <primitive object={clonedScene} position={centerOffset} />
    </group>
  );
}

export default function ModelCanvas({ url, rotation = [0, 0, 0], scale = 1, wireframe = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: false }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 10]} intensity={3} />
      <directionalLight position={[-10, -10, -10]} intensity={1} />
      <Model url={url} initialRotation={rotation} scale={scale} wireframe={wireframe} />
    </Canvas>
  );
}
