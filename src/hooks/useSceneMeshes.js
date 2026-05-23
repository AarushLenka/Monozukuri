import { useRef, useEffect } from 'react';

/**
 * Traverses a Three.js scene, clones materials, stores original positions,
 * sorts meshes by Z, and assigns sortedIndex. Optionally calls onSetup(meshes)
 * after setup (e.g. to add edge lines).
 *
 * @param {THREE.Object3D} scene
 * @param {(meshes: THREE.Mesh[]) => void} [onSetup]
 * @returns {React.MutableRefObject<THREE.Mesh[]>}
 */
export function useSceneMeshes(scene, onSetup = null) {
  const meshesRef = useRef([]);

  useEffect(() => {
    if (!scene) return;

    const meshes = [];

    scene.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;

      if (!child.userData.originalPosition) {
        child.userData.originalPosition = child.position.clone();
      }

      if (child.material && !child.userData.originalMaterial) {
        child.userData.originalMaterial = child.material;
        child.material = Array.isArray(child.material)
          ? child.material.map((mat) => mat.clone())
          : child.material.clone();
      }

      meshes.push(child);
    });

    meshes.sort((a, b) => a.userData.originalPosition.z - b.userData.originalPosition.z);
    meshes.forEach((mesh, index) => {
      mesh.userData.sortedIndex = index;
    });

    meshesRef.current = meshes;
    onSetup?.(meshes);
  }, [scene]);

  return meshesRef;
}
