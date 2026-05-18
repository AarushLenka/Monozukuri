import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';

// Placeholder representation of a Raspberry Pi 5 using basic shapes
// To use a real 3D model, you would use the useGLTF hook from '@react-three/drei':
// import { useGLTF } from '@react-three/drei';
// function RealPiModel(props) {
//   const { scene } = useGLTF('/raspberry_pi_5.glb');
//   return <primitive object={scene} {...props} />;
// }

function PlaceholderPi(props) {
  return (
    <group {...props}>
      {/* PCB */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.4, 0.1, 2.2]} />
        <meshStandardMaterial color="#206020" roughness={0.7} />
      </mesh>
      {/* CPU */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#222" roughness={0.5} />
      </mesh>
      {/* USB/Ethernet Ports */}
      <mesh position={[1.5, 0.2, 0.6]}>
        <boxGeometry args={[0.5, 0.4, 0.6]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.5, 0.2, -0.2]}>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* GPIO Pins */}
      <mesh position={[0, 0.2, -0.9]}>
        <boxGeometry args={[2.5, 0.3, 0.2]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Scene() {
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;
    
    // Initial Side View (Looking at it edge-on)
    groupRef.current.rotation.set(0, Math.PI / 2, 0); 
    groupRef.current.position.set(0, 0, 0);

    // Animate to top-angled view after a short delay
    gsap.to(groupRef.current.rotation, {
      x: Math.PI / 4,    // Tilt down to see top
      y: -Math.PI / 6,   // Slight rotation to see side and top
      z: 0,
      duration: 3.5,
      ease: "power3.inOut",
      delay: 0.5
    });

  }, []);

  return (
    <group ref={groupRef}>
      <PlaceholderPi />
      {/* To use a real model: */}
      {/* <React.Suspense fallback={null}> */}
      {/*   <RealPiModel /> */}
      {/* </React.Suspense> */}

      <Environment preset="city" />
      <ContactShadows position={[0, -0.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} resolution={256} color="#000000" />
    </group>
  );
}

export default function RaspberryPiCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
    </Canvas>
  );
}
