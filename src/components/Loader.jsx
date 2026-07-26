import { useEffect, useState, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import BackgroundBlobs from './BackgroundBlobs';

const GREETINGS = [
  "Hello",       // English
  "Hola",        // Spanish
  "Bonjour",     // French
  "Ciao",        // Italian
  "নমস্কার",     // Bengali
  "Olá",         // Portuguese
  "नमस्ते",       // Hindi
  "Hej",         // Swedish / Danish
  "ನಮಸ್ಕಾರ",    // Kannada
  "Hallo",       // German
  "வணக்கம்",   // Tamil
  "Hoi",         // Dutch
  "നമസ്കാരം",  // Malayalam
  "Aloha",       // Hawaiian
  "నమస్కారం",   // Telugu
  "Selamat",     // Indonesian / Malay
  "Hei",         // Norwegian / Finnish
  "Hello"        // English (graceful settle)
];

const PRELOAD_IMAGES = [
  '/jojo_arrow.webp',
  '/rose.webp',
  '/robot-680.webp',
  '/pilot.webp',
  '/crowdshield.webp',
  '/nexus.webp',
  '/s400.webp',
  '/vital.webp',
  '/ota.jpg',
  '/neurac.png'
];

export default function Loader({ onLoadingComplete }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef();
  const onLoadingCompleteRef = useRef(onLoadingComplete);

  useEffect(() => {
    onLoadingCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useEffect(() => {
    // Background asset preloading while loader is active
    try {
      useGLTF.preload('/raspberrypi5.glb');
      useGLTF.preload('/esp32.glb');
      PRELOAD_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    } catch (e) {
      console.warn('Background preload error:', e);
    }

    // Step through language greetings every 180ms (0.18s) for pronounced, smooth easing
    const interval = window.setInterval(() => {
      setIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 180);

    // Dismiss loader around 3.5s (after final greeting settles gracefully)
    const timer = window.setTimeout(() => {
      window.clearInterval(interval);
      if (containerRef.current) containerRef.current.classList.add('loader-complete');
      window.setTimeout(() => onLoadingCompleteRef.current(), 220);
    }, 3500);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="loader-container fixed inset-0 flex justify-center items-center overflow-hidden z-[9999]">
      <BackgroundBlobs
        className="absolute inset-0 z-0 bg-[#4a4a4a] overflow-hidden loader-bg-container pointer-events-none"
        noiseOpacity={0.15}
      />
      
      {/* Dynamic Multilingual Greeting Layer */}
      <main className="relative z-10 flex flex-col justify-center items-center select-none px-4 w-full">
        <h1
          key={index}
          className="leading-none text-white text-center w-full whitespace-nowrap overflow-hidden select-none"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Bengali", "Noto Sans Tamil", "Noto Sans Malayalam", "Noto Sans Kannada", "Noto Sans Telugu", "Nirmala UI", "Mukta", "Mangal", "Kohinoor Devanagari", "Kohinoor Bangla", "Kohinoor Telugu", "Kohinoor Tamil", "Kohinoor Malayalam", "Lohit Devanagari", "Lohit Bengali", "Lohit Tamil", "Lohit Telugu", "Lohit Kannada", "Lohit Malayalam", "Vrinda", "Gautami", "Tunga", "Kartika", "AnjaliOldLipi", sans-serif',
            fontSize: 'clamp(3rem, 11vw, 10rem)',
            fontWeight: 700,
            letterSpacing: '0.02em',
            animation: index < GREETINGS.length - 1
              ? 'loader-word-cycle 180ms linear forwards'
              : 'loader-word-final 600ms linear forwards',
          }}
        >
          {GREETINGS[index]}
        </h1>
      </main>
    </div>
  );
}

// Preload models at module execution time for instant caching
try {
  useGLTF.preload('/raspberrypi5.glb');
  useGLTF.preload('/esp32.glb');
} catch (e) {
  // Silent fallback if preloading outside canvas throws in SSR/tests
}

