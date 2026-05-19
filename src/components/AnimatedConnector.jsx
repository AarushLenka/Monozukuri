import React, { useState, useEffect, useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

export default function AnimatedConnector({ pts, startId, startAlign = 'left', gap = 15 }) {
  const [jitter, setJitter] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1000, h: typeof window !== 'undefined' ? window.innerHeight : 800 });
  const [startPos, setStartPos] = useState(null);
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

  useEffect(() => {
    if (!startId) return;
    const updatePos = () => {
      const el = document.getElementById(startId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setStartPos({
          x: startAlign === 'right' ? rect.right : rect.left,
          y: rect.bottom + gap,
          left: rect.left,
          right: rect.right
        });
      }
    };
    // Small delay to ensure layout is complete
    setTimeout(updatePos, 100);
    window.addEventListener('resize', updatePos);
    return () => window.removeEventListener('resize', updatePos);
  }, [startId, startAlign, gap, windowSize]);

  const pixelPoints = pts.map(p => {
    let px = p.x !== undefined ? (p.x / 100) * windowSize.w : (startPos ? startPos.x : 0);
    let py = p.y !== undefined ? (p.y / 100) * windowSize.h : (startPos ? startPos.y : 0);
    
    if (p.useStartX && startPos) px = startPos.x;
    if (p.useStartY && startPos) py = startPos.y;
    if (p.useStartLeftX && startPos) px = startPos.left;
    if (p.useStartRightX && startPos) px = startPos.right;

    if (p.jitterX) px += jitter.x;
    if (p.jitterY) py += jitter.y;
    return `${px},${py}`;
  });

  if (startId && !startPos) return null; // Wait for DOM measurement

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
