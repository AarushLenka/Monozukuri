import React, { useEffect, useRef, useState } from 'react';
import { createTimeline, animate, scrambleText } from 'animejs';
import { useProgress } from '@react-three/drei';
import BackgroundBlobs from './BackgroundBlobs';

export default function Loader({ onLoadingComplete }) {
  const containerRef = useRef();
  const [fading, setFading] = useState(false);
  const { progress } = useProgress();
  const animComplete = useRef(false);

  const startFadeOut = () => {
    if (window.__FADING_OUT__) return;
    window.__FADING_OUT__ = true;
    setFading(true);
    
    animate(containerRef.current, {
      opacity: [1, 0],
      easing: 'easeInQuart',
      duration: 200,
      onComplete: () => {
        onLoadingComplete();
      }
    });
  };

  useEffect(() => {
    if (progress === 100) {
      window.__R3F_LOADED__ = true;
      if (animComplete.current && !window.__FADING_OUT__) {
        
        startFadeOut();
      }
    }
  }, [progress]);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      window.__R3F_LOADED__ = true;
      if (animComplete.current && !window.__FADING_OUT__) {
        startFadeOut();
      }
    }, 20000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    window.__FADING_OUT__ = false;
    
    const anim = createTimeline();

    // 1. Scramble Japanese Text
    anim.add('.loader-title', {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 4000,
      easing: 'easeOutExpo',
      innerHTML: scrambleText({
        text: 'ものづくり',
        chars: '#!%░_01ものづくり',
        ease: 'inQuad',
        override: false,
        from: 'center',
        duration: 4000,
        perturbation: .25,
      })
    });

    // 2. Scramble Subtitle
    anim.add('.loader-subtitle', {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 4000,
      easing: 'easeOutExpo',
      innerHTML: scrambleText({
        text: 'BY AARUSH LENKA',
        chars: '#!%░▒▓_01',
        ease: 'inQuad',
        override: false,
        from: 'center',
        duration: 4000,
        perturbation: .25,
      })
    }, '-=4000'); // overlap

    // 3. Hold for exactly 2s with static text, then signal ready to fade
    anim.add({}, {
      duration: 2000,
      onComplete: () => {
        animComplete.current = true;
        if (window.__R3F_LOADED__ && !window.__FADING_OUT__) {
          startFadeOut();
        }
      }
    });

    anim.init();

    return () => {
      anim.pause();
    };
  }, []);

  return (
    <div ref={containerRef} className="loader-container fixed inset-0 flex justify-center items-center overflow-hidden z-[9999]">
      
      <BackgroundBlobs
        className="absolute inset-0 z-0 bg-[#4a4a4a] overflow-hidden loader-bg-container pointer-events-none"
        noiseOpacity={0.15}
      />
      
      {/* Minimalist Text Content Layer */}
      <main className="relative z-10 flex flex-col justify-center items-center select-none px-4 w-full">
        <h1
          className="loader-title opacity-0 leading-none text-white text-center w-full whitespace-nowrap overflow-hidden"
          style={{
            fontFamily: '"MotoyaExCedar", sans-serif',
            fontSize: 'clamp(2rem, 13vw, 14rem)',
            letterSpacing: '0.05em',
            marginBottom: 'clamp(0.25rem, 1.5vw, 1.5rem)',
          }}
        >
          ものづくり
        </h1>
        <p
          className="loader-subtitle opacity-0 text-white/70 font-mono uppercase tracking-widest text-center"
          style={{ fontSize: 'clamp(0.6rem, 1.4vw, 1.1rem)' }}
        >
          BY AARUSH LENKA
        </p>
      </main>
    </div>
  );
}
