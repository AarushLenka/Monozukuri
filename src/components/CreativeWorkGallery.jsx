import React, { useState, useRef, useEffect } from 'react';

const HoverVideo = ({ src, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isActive) {
      videoRef.current.play().catch(e => console.log('Video play prevented:', e));
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={`/footage/${src}#t=0.001`}
      loop
      muted
      playsInline
      preload="metadata"
      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ${isActive ? 'grayscale-0 opacity-100 mix-blend-normal' : 'grayscale opacity-40 mix-blend-luminosity'}`}
    />
  );
};

const VIDEO_SOURCES = [
  "final_1.mp4",
  "HackRevealthethird.mp4",
  "15chomuthefifth.mp4",
  "Domains reel.mp4",
  "GravitasBTStheninth.mp4",
  "Mg_head_ki_pehli_dihadi3.mp4",
  "c++.mp4",
  "celestia.mp4",
  "helixmotionposterportrait.mp4",
  "horizonteaser.mp4",
  "python.mp4",
  "quantatheeleventh.mp4",
  "recapthethird.mp4",
  "spectra motion poster.mp4",
  "spectra.mp4",
  "scroll.mp4"
];



export default function CreativeWorkGallery({ mousePos = { x: 0, y: 0 } }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const containerRef = useRef(null);

  const REELS = React.useMemo(() => {
    return [...VIDEO_SOURCES];
  }, []);

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
        {REELS.map((reelVid, index) => {
          const isActive = hoveredIndex === index;
          const leftStr = index <= hoveredIndex
            ? `calc(${index} * (var(--inactive-w) + var(--gap)))`
            : `calc(${index - 1} * (var(--inactive-w) + var(--gap)) + var(--active-w) + var(--gap))`;

          return (
            <div
              key={`creative-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              className="absolute top-0 h-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-[#1e1e1e] cursor-pointer border border-black/10 flex items-center justify-center"
              style={{
                left: leftStr,
                width: isActive ? 'var(--active-w)' : 'var(--inactive-w)',
              }}
            >
              {reelVid ? (
                <HoverVideo src={reelVid} isActive={isActive} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs text-center px-2">
                  [ EMPTY ]
                </div>
              )}
            </div>
          );
        })}

        {/* Floating White Outline (without corners) */}
        <div
          className="absolute transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-10"
          style={{
            top: '0px',
            height: 'calc(100% + 3px)',
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
