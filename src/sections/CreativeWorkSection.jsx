import React, { useState, useRef } from 'react';
import CreativeRibbon from '../components/CreativeRibbon';
import CreativeWorkGallery from '../components/CreativeWorkGallery';
import { AM_PATHS } from '../utils/svgGenerators';

/**
 * Creative Work section — owns its own mouse-tracking state so App stays clean.
 */
export default function CreativeWorkSection({ isMobile }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current || isMobile) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  /* ── Mobile Layout ── */
  if (isMobile) {
    return (
      <div
        id="creative-work-section"
        ref={sectionRef}
        className="relative w-full overflow-hidden z-[2] px-4 py-8"
        style={{ minHeight: '80vh' }}
      >
        {/* Background Technical Lineart: Fibonacci Spiral (mobile) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.25] text-white mix-blend-screen">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
            <g transform="translate(12, 220)">
              {/* Fibonacci Squares */}
              <g strokeDasharray="2 4" opacity="1.4">
                <rect x="0" y="0" width="610" height="610" />
                <rect x="610" y="0" width="377" height="377" />
                <rect x="754" y="377" width="233" height="233" />
                <rect x="610" y="466" width="144" height="144" />
                <rect x="610" y="377" width="89" height="89" />
                <rect x="699" y="377" width="55" height="55" />
                <rect x="720" y="432" width="34" height="34" />
                <rect x="699" y="445" width="21" height="21" />
                <rect x="699" y="432" width="13" height="13" />
              </g>

              {/* Golden Spiral */}
              <path d="
                M 0 610
                A 610 610 0 0 1 610 0
                A 377 377 0 0 1 987 377
                A 233 233 0 0 1 754 610
                A 144 144 0 0 1 610 466
                A 89 89 0 0 1 699 377
                A 55 55 0 0 1 754 432
                A 34 34 0 0 1 720 466
                A 21 21 0 0 1 699 445
                A 13 13 0 0 1 712 432
              " strokeWidth="2" />

              {/* Technical Lines */}
              <line x1="0" y1="0" x2="987" y2="610" strokeDasharray="1 6" opacity="1.3" />
              <line x1="0" y1="610" x2="987" y2="0" strokeDasharray="1 6" opacity="1.3" />

              <circle cx="610" cy="610" r="4" fill="currentColor" />
              <circle cx="610" cy="377" r="4" fill="currentColor" />
              <circle cx="754" cy="377" r="4" fill="currentColor" />
              <circle cx="754" cy="466" r="4" fill="currentColor" />
              <circle cx="699" cy="466" r="4" fill="currentColor" />
              <circle cx="699" cy="432" r="4" fill="currentColor" />

              {/* Decorative Crosses at main junctions */}
              <path d="M 610 0 L 610 10 M 605 5 L 615 5" />
              <path d="M 987 377 L 977 377 M 982 372 L 982 382" />
              <path d="M 754 610 L 754 600 M 749 605 L 759 605" />
            </g>

            {/* Vertical AM Wave to the right */}
            <g transform="translate(1320, 220)">
              {/* Grid / Axis */}
              <line x1="0" y1="0" x2="0" y2="610" strokeDasharray="4 4" opacity="0.8" />

              {/* Ticks */}
              {Array.from({ length: 13 }).map((_, i) => {
                const y = i * 50;
                return (
                  <g key={i}>
                    <line x1="-8" y1={y} x2="8" y2={y} opacity="0.6" />
                  </g>
                );
              })}

              {/* Envelope lines */}
              <path d={AM_PATHS.envLeft} strokeDasharray="2 4" opacity="0.9" />
              <path d={AM_PATHS.envRight} strokeDasharray="2 4" opacity="0.9" />

              {/* Modulated Wave */}
              <path d={AM_PATHS.wave} strokeWidth="1.2" />
            </g>
          </svg>
        </div>

        <div className="relative w-full z-10 flex flex-col items-center">
          {/* Title */}
          <h2
            className="text-[28px] leading-[1.1] tracking-tight text-black text-center mb-4 z-10"
            style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", "DotGothic16", sans-serif' }}
          >
            Ideas in Motion
          </h2>

          {/* Ribbon + Gallery container */}
          <div className="relative w-full" style={{ minHeight: '60vh' }}>
            <CreativeRibbon mousePos={mousePos} />
            <CreativeWorkGallery mousePos={mousePos} />
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop Layout (untouched) ── */
  return (
    <div
      id="creative-work-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full overflow-hidden z-[2] -mt-[2px]"
      style={{ height: 'var(--logical-vh)', perspective: '1500px' }}
    >
      <div className="relative w-full h-full z-10 pointer-events-none flex flex-col items-center justify-center">

        {/* Background Technical Lineart: Fibonacci Spiral */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.25] text-white mix-blend-screen">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
            <g transform="translate(12, 220)">
              {/* Fibonacci Squares */}
              <g strokeDasharray="2 4" opacity="1.4">
                <rect x="0" y="0" width="610" height="610" />
                <rect x="610" y="0" width="377" height="377" />
                <rect x="754" y="377" width="233" height="233" />
                <rect x="610" y="466" width="144" height="144" />
                <rect x="610" y="377" width="89" height="89" />
                <rect x="699" y="377" width="55" height="55" />
                <rect x="720" y="432" width="34" height="34" />
                <rect x="699" y="445" width="21" height="21" />
                <rect x="699" y="432" width="13" height="13" />
              </g>

              {/* Golden Spiral */}
              <path d="
                M 0 610 
                A 610 610 0 0 1 610 0
                A 377 377 0 0 1 987 377
                A 233 233 0 0 1 754 610
                A 144 144 0 0 1 610 466
                A 89 89 0 0 1 699 377
                A 55 55 0 0 1 754 432
                A 34 34 0 0 1 720 466
                A 21 21 0 0 1 699 445
                A 13 13 0 0 1 712 432
              " strokeWidth="2" />

              {/* Technical Lines & Text */}
              <line x1="0" y1="0" x2="987" y2="610" strokeDasharray="1 6" opacity="1.3" />
              <line x1="0" y1="610" x2="987" y2="0" strokeDasharray="1 6" opacity="1.3" />

              <circle cx="610" cy="610" r="4" fill="currentColor" />
              <circle cx="610" cy="377" r="4" fill="currentColor" />
              <circle cx="754" cy="377" r="4" fill="currentColor" />
              <circle cx="754" cy="466" r="4" fill="currentColor" />
              <circle cx="699" cy="466" r="4" fill="currentColor" />
              <circle cx="699" cy="432" r="4" fill="currentColor" />

              {/* Dimensions */}
              <g fontFamily="monospace" fontSize="10" opacity="0.7">
                <text x="305" y="600" textAnchor="middle">R=610</text>
                <text x="798" y="10" textAnchor="middle">R=377</text>
                <text x="870" y="493" textAnchor="middle">R=233</text>
                <text x="590" y="538" textAnchor="end">R=144</text>
                <text x="987" y="-10" textAnchor="end">PHI = 1.61803398875</text>
                <text x="0" y="-10" textAnchor="start">FIBONACCI.SEQUENCE</text>
              </g>

              {/* Decorative Crosses at main junctions */}
              <path d="M 610 0 L 610 10 M 605 5 L 615 5" />
              <path d="M 987 377 L 977 377 M 982 372 L 982 382" />
              <path d="M 754 610 L 754 600 M 749 605 L 759 605" />
            </g>

            {/* Vertical AM Wave to the right */}
            <g transform="translate(1320, 220)">
              {/* Grid / Axis */}
              <line x1="0" y1="0" x2="0" y2="610" strokeDasharray="4 4" opacity="0.8" />

              {/* Ticks */}
              {Array.from({ length: 13 }).map((_, i) => {
                const y = i * 50;
                return (
                  <g key={i}>
                    <line x1="-8" y1={y} x2="8" y2={y} opacity="0.6" />
                    {i % 2 === 0 && (
                      <text x="12" y={y + 3} fontFamily="monospace" fontSize="8" fill="currentColor" stroke="none" opacity="0.6">
                        {(y / 100).toFixed(1)}V
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Envelope lines */}
              <path d={AM_PATHS.envLeft} strokeDasharray="2 4" opacity="0.9" />
              <path d={AM_PATHS.envRight} strokeDasharray="2 4" opacity="0.9" />

              {/* Modulated Wave */}
              <path d={AM_PATHS.wave} strokeWidth="1.2" />

              {/* Accents / Text */}
              <g fontFamily="monospace" fontSize="9" opacity="0.7">
                <text x="-95" y="0" textAnchor="end">s(t) = Ac[1 + m*cos(2πfmt)]cos(2πfct)</text>
                <text x="-95" y="15" textAnchor="end">m = 0.57 (MOD.INDEX)</text>
                <text x="-95" y="30" textAnchor="end">fc = 200 kHz</text>
                <text x="-95" y="45" textAnchor="end">fm = 8.5 kHz</text>

                <text x="-200" y="570" textAnchor="start">SIGNAL.AM.MODULATED</text>
                <text x="-200" y="585" textAnchor="start">ARCTIC MONKEYS</text>
              </g>

              {/* Crosshairs at bounds */}
              <path d="M -15 0 L 15 0 M 0 -15 L 0 15" opacity="0.5" />
              <path d="M -15 610 L 15 610 M 0 595 L 0 625" opacity="0.5" />
            </g>
          </svg>
        </div>

        <CreativeRibbon mousePos={mousePos} />

        <div className="absolute top-[8%] left-0 w-full flex flex-col items-center justify-center pointer-events-auto z-10">
          <h2 className="text-[72px] leading-none tracking-tight text-black" style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", "DotGothic16", sans-serif' }}>
            Ideas in Motion
          </h2>
        </div>

        <CreativeWorkGallery mousePos={mousePos} />

      </div>
    </div>
  );
}
