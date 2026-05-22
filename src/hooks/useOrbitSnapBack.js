import { useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Shared hook for OrbitControls snap-back behaviour.
 * Returns { controlsRef, handleInteractionStart, handleInteractionEnd }
 * onSnapComplete is an optional callback fired when the camera finishes snapping back.
 */
export function useOrbitSnapBack(onSnapComplete) {
  const controlsRef = useRef();

  const handleInteractionStart = () => {
    if (controlsRef.current) {
      gsap.killTweensOf(controlsRef.current.object.position);
    }
  };

  const handleInteractionEnd = () => {
    if (!controlsRef.current) return;

    const camera = controlsRef.current.object;
    const spherical = new THREE.Spherical().setFromVector3(camera.position);
    const targetTheta = Math.round(spherical.theta / (Math.PI * 2)) * Math.PI * 2;

    gsap.to(spherical, {
      radius: 6,
      phi: Math.PI / 2,
      theta: targetTheta,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.position.setFromSpherical(spherical);
        controlsRef.current.update();
      },
      onComplete: () => {
        if (onSnapComplete) onSnapComplete();
      },
    });
  };

  return { controlsRef, handleInteractionStart, handleInteractionEnd };
}
