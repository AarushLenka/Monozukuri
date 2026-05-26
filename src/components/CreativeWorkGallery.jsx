import React, { useState, useRef } from 'react';

export default function CreativeWorkGallery({ mousePos = { x: 0, y: 0 } }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const containerRef = useRef(null);

  const REELS = Array.from({ length: 20 }).map((_, i) => i + 1);
  const n = REELS.length;

  return (
    <div
      ref={containerRef}
      className="relative pointer-events-auto mt-12"
      style={{
        perspective: '1500px',
        height: 'calc(var(--logical-vh) * 0.55)',
        '--active-w': 'calc(var(--logical-vh) * 0.55 * 0.5625)',
        '--gap': '12px',
        '--inactive-w': '30px',
        width: `calc(var(--active-w) + ${n - 1} * (var(--inactive-w) + var(--gap)))`
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-[400ms] ease-out"
        style={{
          transform: `rotateY(${mousePos.x * 0.02}deg) rotateX(${-mousePos.y * 0.02}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {REELS.map((reel, index) => {
          const isActive = hoveredIndex === index;
          const leftStr = index <= hoveredIndex
            ? `calc(${index} * (var(--inactive-w) + var(--gap)))`
            : `calc(${index - 1} * (var(--inactive-w) + var(--gap)) + var(--active-w) + var(--gap))`;

          return (
            <div
              key={`creative-${reel}`}
              onMouseEnter={() => setHoveredIndex(index)}
              className="absolute top-0 h-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-[#1e1e1e] cursor-pointer border border-black/10"
              style={{
                left: leftStr,
                width: isActive ? 'var(--active-w)' : 'var(--inactive-w)',
              }}
            >
              <img
                src={`https://placehold.co/1080x1920/222/888?text=Reel+${reel}`}
                alt={`Reel ${reel}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ${isActive ? 'grayscale-0 opacity-100 mix-blend-normal' : 'grayscale opacity-40 mix-blend-luminosity'}`}
              />
              <div className={`absolute bottom-6 left-6 transition-opacity duration-500 delay-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <p className="font-mono text-white text-xs uppercase tracking-widest bg-black/50 px-2 py-1">Reel {reel}</p>
              </div>
            </div>
          );
        })}

        {/* Floating White Outline (without corners) */}
        <div
          className="absolute transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-10"
          style={{
            top: '-4px',
            height: 'calc(100% + 8px)',
            left: `calc(${hoveredIndex} * (var(--inactive-w) + var(--gap)))`,
            width: `calc(var(--active-w) )`
          }}
        >
          {/* Top Line */}
          <div className="absolute top-0 left-[16px] right-[16px] h-[2px] bg-white"></div>
          {/* Bottom Line */}
          <div className="absolute bottom-0 left-[16px] right-[16px] h-[2px] bg-white"></div>
          {/* Left Line */}
          <div className="absolute left-0 top-[16px] bottom-[16px] w-[2px] bg-white"></div>
          {/* Right Line */}
          <div className="absolute right-0 top-[16px] bottom-[16px] w-[2px] bg-white"></div>
        </div>
      </div>
    </div>
  );
}
