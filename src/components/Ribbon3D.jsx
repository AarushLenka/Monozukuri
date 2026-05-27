import React from 'react';

export default function Ribbon3D() {
  //const text = "AARUSH LENKA  •  MOTION GRAPHICS DESIGNER  •  EX-MG HEAD, ISTE-VIT  •  ".repeat(2);
  const chars = text.split('');
  const radius = 350; // Larger radius to wrap around the whole gallery
  const charWidth = 27; // Slightly larger than calculated to ensure overlap and a solid black ribbon

  return (
    <>
      <style>
        {`
          @keyframes ribbon-spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
        `}
      </style>
      <div 
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translate3d(-50%, -50%, 0) rotateX(15deg) rotateZ(-8deg)', // The wavy tilt
          zIndex: 50
        }}
      >
        <div 
          style={{ 
            transformStyle: 'preserve-3d',
            animation: 'ribbon-spin 25s linear infinite'
          }}
        >
          {chars.map((char, i) => {
            const angle = i * (360 / chars.length);
            return (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 font-serif text-white text-xl flex items-center justify-center"
                style={{
                  width: `${charWidth}px`,
                  height: '40px', // Ribbon height
                  backgroundColor: 'black',
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'visible',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
