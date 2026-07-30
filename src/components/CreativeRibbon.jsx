import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useIsMobile';
import { useInViewport } from '../hooks/useInViewport';

const RibbonMesh = ({ renderSide }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Create the canvas texture exactly like the reference
  const texture = useMemo(() => {
    const buzzwords = [
      'CREATIVE VISION',
      'MOTION GRAPHICS DESIGNER',
      '3D DABBLER',
      'POST-PRODUCTION',
    ];

    const canvas = document.createElement('canvas');
    canvas.width = 4096;
    canvas.height = 120; // Thinner continuous ribbon
    const ctx = canvas.getContext('2d');
    
    // Font settings
    let font = '900 70px Siro, Inter, sans-serif';
    let pad = [0, 15, 0, 15]; // Left and right padding for the black badges
    let gap = 25; // Transparent gap between badges
    let boxh = 120;

    ctx.font = font;
    let widths = buzzwords.map(str => ctx.measureText(str).width + pad[1] + pad[3] + gap);
    let totalWidth = widths.reduce((acc, val) => acc + val, 0);

    const scale = canvas.width / (totalWidth * 2); // repeat twice for seamlessness
    ctx.font = `900 ${70*scale}px Siro, Inter, sans-serif`;
    widths = widths.map(w => w * scale);
    pad = pad.map(p => p * scale);
    gap *= scale;
    boxh *= scale;

    const y = (canvas.height - boxh) / 2;
    
    // Clear canvas to ensure transparent gaps
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawWords = (startX) => {
      let x = startX;
      buzzwords.forEach((word, i) => {
        const boxw = widths[i];
  
        // Draw solid BLACK badge for the word
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, 0, boxw - gap, canvas.height);

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
      
      pos.y += sin(angle * 3.0 - uTime * 1.5) * 0.35;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment Shader
  const fragmentShader = `
    uniform sampler2D uTex;
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      // Scroll the texture continuously instead of rotating the mesh!
      vec2 uv = vUv;
      uv.x = fract(uv.x - uTime * 0.01);
      
      vec4 color = texture2D(uTex, uv);
      gl_FragColor = color;
    }
  `;

  // Accumulate our own clock from the per-frame delta rather than reading
  // state.clock.elapsedTime: the canvas parks its frameloop when scrolled out
  // of view, and R3F zeroes clock.elapsedTime whenever the frameloop changes,
  // which would snap the ribbon back to its starting phase. Accumulating means
  // it resumes exactly where it paused. Delta is clamped so the first frame
  // after a long pause cannot jump the wave.
  const timeRef = useRef(0);
  useFrame((_state, delta) => {
    timeRef.current += Math.min(delta, 1 / 30);
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
    }
  });

  return (
    // Diagonal/Vertical tilt
    <mesh ref={meshRef} position={[0, -0.6, 0]} rotation={[0.4, 0, 70]} scale={[0.5, 0.4, 0.3]}>
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

export default function CreativeRibbon({ mousePos = { x: 0, y: 0 } }) {
  const isMobile = useIsMobile();
  const backRef = useRef(null);
  const frontRef = useRef(null);
  // Two 256-segment cylinders with 4096px textures animating forever, even
  // scrolled far offscreen. Parking the loop when out of view is invisible
  // (nothing on screen to redraw) and frees the GPU/main thread for the rest
  // of the page.
  const backVisible = useInViewport(backRef);
  const frontVisible = useInViewport(frontRef);
  const transform = isMobile
    ? 'none'
    : `rotateY(${mousePos.x * 0.02}deg) rotateX(${-mousePos.y * 0.02}deg)`;

  return (
    <>
      {/* Back layer (Behind the gallery) */}
      <div
        ref={backRef}
        className={`absolute inset-0 w-full h-full pointer-events-none z-0 transition-transform duration-[400ms] ease-out ${isMobile ? 'opacity-60' : ''}`}
        style={{ transform, transformStyle: 'preserve-3d' }}
      >
        <Canvas frameloop={backVisible ? 'always' : 'never'} style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 30], fov: 25 }} resize={{ offsetSize: true }} dpr={isMobile ? [1, 1] : [1, 2]}>
          <ambientLight intensity={1} />
          <RibbonMesh renderSide="back" />
        </Canvas>
      </div>

      {/* Front layer (In front of the gallery) */}
      <div
        ref={frontRef}
        className={`absolute inset-0 w-full h-full pointer-events-none z-20 transition-transform duration-[400ms] ease-out ${isMobile ? 'opacity-60' : ''}`}
        style={{ transform, transformStyle: 'preserve-3d' }}
      >
        <Canvas frameloop={frontVisible ? 'always' : 'never'} style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 30], fov: 25 }} resize={{ offsetSize: true }} dpr={isMobile ? [1, 1] : [1, 2]}>
          <ambientLight intensity={1} />
          <RibbonMesh renderSide="front" />
        </Canvas>
      </div>
    </>
  );
}
