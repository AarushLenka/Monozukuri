import React, { useState, useEffect, useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

export default function AnimatedConnector({ pts }) {
  const [jitter, setJitter] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1000, h: typeof window !== 'undefined' ? window.innerHeight : 800 });
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame((t) => {
    // Snap to a new random position occasionally to create sudden, sporadic movement
    if (t - lastUpdateRef.current > 50 + Math.random() * 300) {
      lastUpdateRef.current = t;
      setJitter({ 
        x: (Math.random() - 0.5) * 20, 
        y: (Math.random() - 0.5) * 20 
      });
    }
  });

  const pixelPoints = pts.map(p => {
    let px = (p.x / 100) * windowSize.w;
    let py = (p.y / 100) * windowSize.h;
    if (p.jitterX) px += jitter.x;
    if (p.jitterY) py += jitter.y;
    return `${px},${py}`;
  });

  const targetPoint = pts[pts.length - 1];
  const targetPx = (targetPoint.x / 100) * windowSize.w + (targetPoint.jitterX ? jitter.x : 0);
  const targetPy = (targetPoint.y / 100) * windowSize.h + (targetPoint.jitterY ? jitter.y : 0);

  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-black z-30" style={{ strokeWidth: '1px', fill: 'none' }}>
        <polyline points={pixelPoints.join(' ')} />
      </svg>
      {/* Target Box */}
      <div 
        className="absolute z-30 pointer-events-none flex items-center justify-center border border-black"
        style={{ 
          width: '16px', 
          height: '16px',
          left: `${targetPx}px`, 
          top: `${targetPy}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-[6px] h-[6px] bg-black"></div>
      </div>
    </>
  );
}
