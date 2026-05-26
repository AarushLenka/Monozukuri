import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RibbonMesh = ({ renderSide }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Create the canvas texture exactly like the reference
  const texture = useMemo(() => {
    const buzzwords = [
      'AARUSH LENKA',
      'MOTION GRAPHICS DESIGNER',
      'EX-MG HEAD, ISTE-VIT',
    ];

    const canvas = document.createElement('canvas');
    canvas.width = 4096;
    canvas.height = 120; // Thinner continuous ribbon
    const ctx = canvas.getContext('2d');
    
    // Font settings
    let font = '900 70px Inter, sans-serif';
    let pad = [0, 60, 0, 60];
    let gap = 60;
    let boxh = 120;

    ctx.font = font;
    let widths = buzzwords.map(str => ctx.measureText(str).width + pad[1] + pad[3] + gap);
    let totalWidth = widths.reduce((acc, val) => acc + val, 0);

    const scale = canvas.width / (totalWidth * 2); // repeat twice for seamlessness
    ctx.font = `900 ${70*scale}px Inter, sans-serif`;
    widths = widths.map(w => w * scale);
    pad = pad.map(p => p * scale);
    gap *= scale;
    boxh *= scale;

    const y = (canvas.height - boxh) / 2;
    
    // Draw solid BLACK ribbon background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawWords = (startX) => {
      let x = startX;
      buzzwords.forEach((word, i) => {
        const boxw = widths[i];
  
        // Draw white text
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'middle';
        ctx.fillText(buzzwords[i], x + pad[3], y + boxh / 2);
  
        x += boxw;
      });
      return x;
    };

    let nextX = drawWords(0);
    drawWords(nextX);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.anisotropy = 16;
    return tex;
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTex: { value: texture }
  }), [texture]);

  // Vertex Shader for Wavy Ribbon
  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Calculate angle around cylinder
      float angle = atan(pos.z, pos.x);
      
      // Wavy displacement - vastly reduced wobble
      float wave = sin(angle * 2.0 + uTime * 0.8) * 0.2;
      pos.y += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment Shader
  const fragmentShader = `
    uniform sampler2D uTex;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(uTex, vUv);
      gl_FragColor = color;
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      // Slowly rotate the ribbon
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    // Diagonal/Vertical tilt: rotate Z significantly
    <mesh ref={meshRef} rotation={[0.1, 0, 20]} scale={[0.45, 0.45, 0.45]}>
      {/* 256 radial segments for smooth waves */}
      <cylinderGeometry args={[12, 12, 1.5, 256, 1, true]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={renderSide === 'front' ? THREE.FrontSide : THREE.BackSide}
        transparent={true}
      />
    </mesh>
  );
};

export default function CreativeRibbon() {
  return (
    <>
      {/* Back layer (Behind the gallery) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 30], fov: 25 }}>
          <ambientLight intensity={1} />
          <RibbonMesh renderSide="back" />
        </Canvas>
      </div>

      {/* Front layer (In front of the gallery) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <Canvas camera={{ position: [0, 0, 30], fov: 25 }}>
          <ambientLight intensity={1} />
          <RibbonMesh renderSide="front" />
        </Canvas>
      </div>
    </>
  );
}
