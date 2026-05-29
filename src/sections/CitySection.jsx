import React from 'react';
import SocialLinks from '../components/SocialLinks';
import { CITY_PATHS } from '../utils/svgGenerators';

/**
 * City skyline closing section with footer links.
 * Self-contained: no props required from App.
 */
export default function CitySection() {
  return (
    <div id="city-section" className="relative w-full overflow-hidden z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
      {/* Skyline lineart */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.25] text-white mix-blend-screen">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Stars */}
          {CITY_PATHS.stars.map((star, i) => (
            <circle key={i} cx={star.cx} cy={star.cy} r={star.r} fill="currentColor" stroke="none" opacity='8' />
          ))}

          {/* Back Layer */}
          <path d={CITY_PATHS.back.outline} stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none" />

          {/* Mid Layer */}
          <path d={CITY_PATHS.mid.outline} stroke="currentColor" strokeWidth="1.5" opacity="0.8" fill="none" />
          <path d={CITY_PATHS.mid.windows} stroke="none" fill="currentColor" opacity="0.6" />

          {/* Front Layer */}
          <path d={CITY_PATHS.front.outline} stroke="currentColor" strokeWidth="2" opacity="1" fill="none" />
          <path d={CITY_PATHS.front.windows} stroke="none" fill="currentColor" opacity="1" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Centered Heading */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-[48px] sm:text-[68px] md:text-[96px] lg:text-[110px] font-normal tracking-tight text-white text-center select-none" style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", "DotGothic16", sans-serif' }}>
            THAT'S ALL FOR NOW<span className="animate-cursor-blink">_</span>
          </h2>
        </div>

        {/* Footer */}
        <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-0 pointer-events-auto">
          <a href="https://github.com/AarushLenka/Monozukuri" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-white font-mono text-[12px] tracking-widest uppercase transition-colors underline underline-offset-4">
            [ CHECK OUT THIS PROJECT ON GITHUB ]
          </a>

          <div className="flex flex-col items-center gap-2 mt-3">
            <span className="text-white/60 font-mono text-[15px] tracking-widest uppercase">REACH OUT TO ME</span>
            <SocialLinks className="justify-center" showEmail />
          </div>
        </div>
      </div>
    </div>
  );
}
