import { useState, useEffect } from 'react';
import { useElementPosition } from '../hooks/useElementPosition';

export default function AnimatedConnector({ pts, startId, startAlign = 'left', gap = 15 }) {
  const [jitter, setJitter] = useState({ x: 0, y: 0 });
  const startPos = useElementPosition(startId, startAlign, gap);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setJitter({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
      });
    }, 90);

    return () => window.clearInterval(interval);
  }, []);

  const pixelPoints = pts.map((p) => {
    let px = p.x !== undefined ? (p.x / 100) * 1440 : (startPos ? startPos.x : 0);
    let py = p.y !== undefined ? (p.y / 100) * 800 : (startPos ? startPos.y : 0);

    if (p.useStartX && startPos) px = startPos.x;
    if (p.useStartY && startPos) py = startPos.y;
    if (p.useStartLeftX && startPos) px = startPos.left;
    if (p.useStartRightX && startPos) px = startPos.right;

    if (p.jitterX) px += jitter.x;
    if (p.jitterY) py += jitter.y;
    return `${px},${py}`;
  });

  if (startId && !startPos) return null;

  const targetPoint = pts[pts.length - 1];
  const targetPx = (targetPoint.x / 100) * 1440 + (targetPoint.jitterX ? jitter.x : 0);
  const targetPy = (targetPoint.y / 100) * 800 + (targetPoint.jitterY ? jitter.y : 0);

  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-black z-30" style={{ strokeWidth: '1px', fill: 'none' }}>
        <polyline points={pixelPoints.join(' ')} />
      </svg>
      <div
        className="absolute z-30 pointer-events-none flex items-center justify-center border border-black"
        style={{
          width: '16px',
          height: '16px',
          left: `${targetPx}px`,
          top: `${targetPy}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-[6px] h-[6px] bg-black"></div>
      </div>
    </>
  );
}
