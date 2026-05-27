import React, { useEffect, useRef, useState } from 'react';
import { createTimeline, animate, scrambleText } from 'animejs';
import { useProgress } from '@react-three/drei';

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
      
      {/* Replicated App.jsx Background */}
      <div className="absolute inset-0 z-0 bg-[#4a4a4a] overflow-hidden loader-bg-container pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-red-700/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[700px] bg-gray-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-red-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-zinc-600/40 rounded-[70%_30%_50%_50%/30%_30%_70%_70%] blur-[110px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-rose-700/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-[80px] mix-blend-screen"></div>
        <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] bg-stone-400/20 rounded-[40%_60%_30%_70%/60%_40%_70%_30%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>
      
      {/* Minimalist Text Content Layer */}
      <main className="relative z-10 flex flex-col justify-center items-center select-none">
        <h1 
          className="loader-title opacity-0 text-[80px] sm:text-[100px] md:text-[160px] lg:text-[200px] xl:text-[250px] leading-none text-white tracking-[0.1em] mb-2 md:mb-6 text-center whitespace-nowrap" 
          style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", sans-serif' }}
        >
          ものづくり
        </h1>
        <p className="loader-subtitle opacity-0 text-[14px] md:text-[18px] text-white/70 font-mono tracking-widest uppercase">
          BY AARUSH LENKA
        </p>
      </main>
    </div>
  );
}
