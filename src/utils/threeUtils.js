import * as THREE from 'three';

const EDGE_THRESHOLD_DEG = 4;
const WIREFRAME_COLOR = '#ffffff';

/**
 * Adds edge-line overlays to every mesh in a scene.
 * Skips meshes that already have edge lines to avoid duplicates on hot-reload.
 * Optionally hides the solid mesh surface (wireframe-only mode).
 *
 * @param {THREE.Object3D} scene
 * @param {{ hideSolid?: boolean, transparent?: boolean, color?: string }} options
 */
export function addEdgeLines(scene, { hideSolid = false, transparent = false, color = WIREFRAME_COLOR } = {}) {
  scene.traverse((child) => {
    if (!child.isMesh || !child.geometry) return;

    const alreadyAdded = child.children.some(
      (c) => c.userData.isWireframeOutline || c.type === 'LineSegments'
    );

    if (!alreadyAdded) {
      const edges = new THREE.EdgesGeometry(child.geometry, EDGE_THRESHOLD_DEG);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: color,
          transparent,
          opacity: transparent ? 1 : undefined,
        })
      );
      line.userData.isWireframeOutline = true;
      child.add(line);
      child.userData.lineSegments = line;
    }

    if (hideSolid && child.material) {
      const hide = (mat) => { mat.visible = false; };
      Array.isArray(child.material)
        ? child.material.forEach(hide)
        : hide(child.material);
    }
  });
}

/**
 * Applies a function to all materials on a mesh (handles array and single).
 */
const applyToMaterials = (mesh, fn) => {
  if (!mesh.material) return;
  Array.isArray(mesh.material)
    ? mesh.material.forEach(fn)
    : fn(mesh.material);
};

/**
 * Applies material opacity to a single mesh's material(s).
 *
 * @param {THREE.Mesh} mesh
 * @param {number} opacity  0–1
 */
export function setMeshOpacity(mesh, opacity) {
  applyToMaterials(mesh, (mat) => {
    if (opacity < 0.001) {
      mat.visible = false;
      return;
    }
    mat.visible = true;
    mat.transparent = opacity < 0.99;
    mat.opacity = opacity < 0.99 ? opacity : 1.0;
  });
}
