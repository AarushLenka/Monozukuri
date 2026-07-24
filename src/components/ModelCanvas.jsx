import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { addEdgeLines } from '../utils/threeUtils';
import { Box3, Vector3 } from 'three';

function Model({ url, initialRotation, scale = 1, wireframe = false, wireframeColor = '#ffffff' }) {
  // useMeshopt=true wires EXT_meshopt_compression decoding; useDraco left at default.
  const { scene } = useGLTF(url, undefined, true);
  const outerGroupRef = useRef();
  const innerGroupRef = useRef();

  const clonedScene = useMemo(() => {
    // Clone scene and materials to prevent HMR caching bugs
    const cloned = scene.clone(true);
    if (wireframe) {
      cloned.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material = node.material.clone();
          node.material.visible = false;
        }
      });
      addEdgeLines(cloned, { hideSolid: true, transparent: true, color: wireframeColor });
    }
    return cloned;
  }, [scene, wireframe]);

  useEffect(() => {
    if (innerGroupRef.current) {
      // 1. Reset scale and position to measure true intrinsic size
      innerGroupRef.current.scale.setScalar(1);
      innerGroupRef.current.position.set(0, 0, 0);
      innerGroupRef.current.updateMatrixWorld(true);

      // 2. Measure bounds
      const box = new Box3().setFromObject(innerGroupRef.current);
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      // 3. Apply normalization scale
      if (maxDim > 0) {
        const normalizedScale = (10 / maxDim) * scale;
        innerGroupRef.current.scale.setScalar(normalizedScale);
      }
      
      // 4. Center it perfectly
      innerGroupRef.current.updateMatrixWorld(true);
      const newBox = new Box3().setFromObject(innerGroupRef.current);
      const center = newBox.getCenter(new Vector3());
      
      innerGroupRef.current.position.sub(center);
    }
  }, [clonedScene, scale]);

  return (
    <group ref={outerGroupRef} rotation={initialRotation}>
      <group ref={innerGroupRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

export default function ModelCanvas({ url, rotation = [0, 0, 0], scale = 1, wireframe = false, wireframeColor = '#ffffff', isMobile }) {
  return (
    <Canvas
      frameloop="demand"
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
      resize={{ offsetSize: true }}
      camera={{ position: [0, 0, 16], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: false }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 10]} intensity={3} />
      <directionalLight position={[-10, -10, -10]} intensity={1} />
      <Model url={url} initialRotation={rotation} scale={scale} wireframe={wireframe} wireframeColor={wireframeColor} />
    </Canvas>
  );
}
