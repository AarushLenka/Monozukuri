import { useEffect, useRef } from 'react';
import BackgroundBlobs from './BackgroundBlobs';

export default function Loader({ onLoadingComplete }) {
  const containerRef = useRef();
  const onLoadingCompleteRef = useRef(onLoadingComplete);

  useEffect(() => {
    onLoadingCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useEffect(() => {
    // Keep the branded reveal, but never make the visitor wait for a 3D asset.
    // The model is prefetched independently and Suspense handles slow networks.
    const timer = window.setTimeout(() => {
      if (containerRef.current) containerRef.current.classList.add('loader-complete');
      window.setTimeout(() => onLoadingCompleteRef.current(), 220);
    }, 1500);

    return () => window.clearTimeout(timer);
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
          className="loader-title leading-none text-white text-center w-full whitespace-nowrap overflow-hidden"
          style={{
            fontFamily: '"Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
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
