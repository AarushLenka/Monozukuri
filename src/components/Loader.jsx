import { useEffect, useState, useRef } from 'react';
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
  '/otain.webp',
  '/neurac.png',
  '/neuracc.webp'
];

// Warm the HTTP cache for the about-section model (the hero one is a <link
// rel=preload> in index.html). Plain fetch keeps the loader chunk free of
// three.js — importing drei here dragged the entire three + fiber +
// GLTFLoader graph into the entry bundle and blocked first paint.
const PRELOAD_MODELS = ['/esp32.glb'];

const isLatinScript = (text) => /^[a-zA-Z]+$/.test(text);

export default function Loader({ onLoadingComplete }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef();
  const onLoadingCompleteRef = useRef(onLoadingComplete);

  useEffect(() => {
    onLoadingCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useEffect(() => {
    // Background asset preloading while loader is active. Models go first at
    // high priority — they are needed the instant the loader dismisses, and
    // previously lost the bandwidth race to ~2.4 MB of modal images.
    PRELOAD_MODELS.forEach((src) => {
      fetch(src, { priority: 'high' }).catch(() => {});
    });
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.fetchPriority = 'low';
      img.src = src;
    });

    // Step through language greetings every 180ms (0.18s) for pronounced, smooth easing.
    // Derive the index from elapsed wall-clock time on each frame rather than
    // counting setInterval ticks: the greeting's CSS animation is also 180ms and
    // ends at opacity 0, so a single late tick left the word invisible and
    // flashed a blank frame. A timestamp-derived index cannot drift — a slow
    // frame skips ahead instead of falling behind.
    const start = performance.now();
    let shown = 0;
    let frame = requestAnimationFrame(function step(now) {
      const next = Math.min(Math.floor((now - start) / 180), GREETINGS.length - 1);
      if (next > shown) {
        shown = next;
        setIndex(next);
      }
      if (next < GREETINGS.length - 1) frame = requestAnimationFrame(step);
    });

    // Dismiss loader around 3.5s (after final greeting settles gracefully)
    const timer = window.setTimeout(() => {
      cancelAnimationFrame(frame);
      if (containerRef.current) containerRef.current.classList.add('loader-complete');
      window.setTimeout(() => onLoadingCompleteRef.current(), 220);
    }, 3500);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  const currentWord = GREETINGS[index];
  const useRecoleta = isLatinScript(currentWord);

  return (
    <div ref={containerRef} className="loader-container fixed inset-0 flex justify-center items-center overflow-hidden z-[9999]">
      {/* Hidden Font Warm-Up Container: Instantaneously instantiates & shapes all script glyphs in memory so animations never stall on font switches */}
      <div className="fixed -top-96 left-0 opacity-0 pointer-events-none select-none -z-50 whitespace-pre font-bold" aria-hidden="true" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Bengali", "Noto Sans Tamil", "Noto Sans Malayalam", "Noto Sans Kannada", "Noto Sans Telugu", sans-serif' }}>
        {GREETINGS.join(' ')}
      </div>

      <BackgroundBlobs
        className="absolute inset-0 z-0 bg-[#4a4a4a] overflow-hidden loader-bg-container pointer-events-none"
        noiseOpacity={0.15}
      />
      
      {/* Dynamic Multilingual Greeting Layer with expanded vertical padding for mobile */}
      <main className="relative z-10 flex flex-col justify-center items-center select-none px-4 w-full min-h-[45vh] md:min-h-[320px]">
        <h1
          key={index}
          className="text-white text-center w-full whitespace-nowrap select-none py-8 md:py-4 leading-normal"
          style={{
            fontFamily: useRecoleta
              ? "'Recoleta', system-ui, -apple-system, sans-serif"
              : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", "Noto Sans Bengali", "Noto Sans Tamil", "Noto Sans Malayalam", "Noto Sans Kannada", "Noto Sans Telugu", "Nirmala UI", "Mukta", "Mangal", "Kohinoor Devanagari", "Kohinoor Bangla", "Kohinoor Telugu", "Kohinoor Tamil", "Kohinoor Malayalam", "Lohit Devanagari", "Lohit Bengali", "Lohit Tamil", "Lohit Telugu", "Lohit Kannada", "Lohit Malayalam", "Vrinda", "Gautami", "Tunga", "Kartika", "AnjaliOldLipi", sans-serif',
            fontSize: 'clamp(3.2rem, 11vw, 10rem)',
            fontWeight: 700,
            letterSpacing: '0.02em',
            willChange: 'transform, opacity',
            animation: index < GREETINGS.length - 1
              ? 'loader-word-cycle 180ms linear forwards'
              : 'loader-word-final 600ms linear forwards',
          }}
        >
          {currentWord}
        </h1>
      </main>
    </div>
  );
}

