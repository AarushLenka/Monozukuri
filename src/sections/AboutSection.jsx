import { useEffect, useRef } from 'react';
import ESP32Canvas from '../ESP32';
import DecorativeCard from '../components/DecorativeCard';

function ViewportVideo({ src, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const start = () => {
      if (!video.src) {
        video.src = src;
        video.load();
      }
      video.play().catch(() => {});
    };

    if (!('IntersectionObserver' in window)) {
      start();
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      start();
    }, { rootMargin: '2500px' });
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={videoRef} loop muted playsInline preload="none" className={className} />;
}

/**
 * About section — second full-height screen.
 * Self-contained: no props required from App (except isMobile).
 */
export default function AboutSection({ isMobile }) {

  /* ── Mobile Layout ── */
  if (isMobile) {
    return (
      <div id="about-section" className="relative w-full z-[2] px-4 pt-8 pb-2">
        {/* ESP32 canvas with background lineart */}
        <div className="relative w-full flex flex-col items-center mb-6">
          {/* Background lineart — scaled down */}
          <div className="absolute top-[-10px] left-[-30px] w-[110%] h-[110%] pointer-events-none z-10 opacity-30 text-white mix-blend-screen">
            <svg viewBox="0 0 1000 1000" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
              <defs>
                <marker id="arrow-mobile" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" stroke="none" />
                </marker>
              </defs>

              <line x1="0" y1="400" x2="1000" y2="400" />
              <line x1="400" y1="0" x2="400" y2="1000" />
              <line x1="750" y1="0" x2="750" y2="1000" />
              <line x1="0" y1="750" x2="1000" y2="750" />

              <line x1="400" y1="400" x2="950" y2="150" strokeDasharray="4 4" />
              <line x1="400" y1="400" x2="100" y2="850" strokeDasharray="2 6" />

              <circle cx="400" cy="400" r="120" />
              <circle cx="400" cy="400" r="180" />
              <circle cx="400" cy="400" r="280" />
              <circle cx="400" cy="400" r="320" strokeDasharray="6 6" />
              <circle cx="400" cy="400" r="350" />

              <g className="font-mono text-[10px] uppercase">
                {Array.from({ length: 72 }).map((_, i) => {
                  const angle = i * 5;
                  const isMajor = angle % 15 === 0;
                  return (
                    <g key={`tick-m-${i}`} transform={`rotate(${angle} 400 400)`}>
                      <line x1="400" y1="120" x2="400" y2={isMajor ? "90" : "110"} />
                      {isMajor && (
                        <text x="400" y="75" textAnchor="middle" fill="currentColor" stroke="none">
                          {angle}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>

              <path d="M 150,600 A 350,350 0 0,0 600,900" strokeDasharray="5 5" markerEnd="url(#arrow-mobile)" />

              <g transform="translate(250 1000)">
                <path d="M -180 0 A 180 180 0 0 1 180 0" />
                <path d="M -180 0 A 180 70 0 0 1 180 0" />
                <path d="M -180 0 A 180 25 0 0 1 180 0" />
                <line x1="0" y1="0" x2="0" y2="-180" />
                <line x1="0" y1="0" x2="-100" y2="-150" />
                <line x1="0" y1="0" x2="100" y2="-150" />
              </g>
            </svg>
          </div>

          {/* 3D ESP32 canvas */}
          <div className="relative w-[130vw] h-[80vw] shrink-0 bg-transparent overflow-hidden z-20 pointer-events-none flex items-center justify-center scale-[1.15]">
            <ESP32Canvas isMobile={isMobile} />
          </div>
        </div>



        {/* Main copy */}
        <div className="z-20 w-full select-none mb-6 relative pb-10">
          <p className="relative z-10 text-white text-[22px] font-serif leading-[1.2] tracking-tight">
            I craft{' '}
            <svg className="inline-block align-middle mx-0 animate-splat-pulse" width="28" height="28" viewBox="0 0 100 100" fill="#10e7d9b0">
              <polygon points="50.00,0.00 59.06,16.19 75.00,6.70 74.75,25.25 93.30,25.00 83.81,40.94 100.00,50.00 83.81,59.06 93.30,75.00 74.75,74.75 75.00,93.30 59.06,83.81 50.00,100.00 40.94,83.81 25.00,93.30 25.25,74.75 6.70,75.00 16.19,59.06 0.00,50.00 16.19,40.94 6.70,25.00 25.25,25.25 25.00,6.70 40.94,16.19" />
            </svg>
            {' '}interactive ecosystems that
            redefine how we experience the
            digital world.
            <img loading="lazy" decoding="async" src="/jojo_arrow.webp" alt="Arrow" className="inline-block align-middle ml-1 h-[55px] -my-[20px] w-auto object-contain hover:opacity-90 transition-opacity" data-tooltip="I, AARUSH LENKA, HAVE A DREAM" />
          </p>
          <p className="relative z-10 text-white text-[22px] font-serif leading-[1.2] tracking-tight mt-4 pr-[80px]">
            From generative algorithms to
            bespoke hardware, my <span className="relative inline-block">practice</span>
            <img loading="lazy" decoding="async" src="/rose.webp" alt="Rose" className="inline-block align-middle ml-1 mr-0.5 h-[35px] -my-[14px] w-auto object-contain" />
            sits at the crossroads of art and
            engineering.
          </p>
          <img loading="lazy" decoding="async" src="/robot-680.webp" alt="Robot" className="absolute right-[-50px] bottom-[90px] h-[160px] w-auto max-w-none object-contain" data-tooltip="HOLA, ISTE 👋" />
        </div>


      </div>
    );
  }

  /* ── Desktop Layout (untouched) ── */
  return (
    <div id="about-section" className="relative w-full z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
      <div className="relative w-full h-full z-10 pointer-events-none">

        {/* Background technical lineart — compass / angle diagram */}
        <div className="absolute top-[20px] left-[-20px] w-[770px] h-[780px] pointer-events-none z-10 opacity-50 text-white mix-blend-screen">
          <svg viewBox="0 0 1000 1000" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" stroke="none" />
              </marker>
            </defs>

            <line x1="0" y1="400" x2="1000" y2="400" />
            <line x1="400" y1="0" x2="400" y2="1000" />
            <line x1="750" y1="0" x2="750" y2="1000" />
            <line x1="0" y1="750" x2="1000" y2="750" />

            <line x1="400" y1="400" x2="950" y2="150" strokeDasharray="4 4" />
            <line x1="400" y1="400" x2="100" y2="850" strokeDasharray="2 6" />

            <circle cx="400" cy="400" r="120" />
            <circle cx="400" cy="400" r="180" />
            <circle cx="400" cy="400" r="280" />
            <circle cx="400" cy="400" r="320" strokeDasharray="6 6" />
            <circle cx="400" cy="400" r="350" />

            <g className="font-mono text-[10px] uppercase">
              {Array.from({ length: 72 }).map((_, i) => {
                const angle = i * 5;
                const isMajor = angle % 15 === 0;
                return (
                  <g key={`tick-${i}`} transform={`rotate(${angle} 400 400)`}>
                    <line x1="400" y1="120" x2="400" y2={isMajor ? "90" : "110"} />
                    {isMajor && (
                      <text x="400" y="75" textAnchor="middle" fill="currentColor" stroke="none">
                        {angle}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            <g transform="translate(750 250)">
              <rect x="-12" y="-12" width="24" height="24" fill="none" />
              <line x1="-6" y1="0" x2="6" y2="0" />
              <line x1="0" y1="-6" x2="0" y2="6" />
            </g>

            <g transform="translate(900 400)">
              <rect x="-12" y="-12" width="24" height="24" fill="none" />
              <rect x="-5" y="-5" width="10" height="10" fill="currentColor" stroke="none" />
            </g>

            <g transform="translate(250 750)">
              <circle cx="0" cy="0" r="4" fill="currentColor" stroke="none" />
            </g>

            <path d="M 150,600 A 350,350 0 0,0 600,900" strokeDasharray="5 5" markerEnd="url(#arrow)" />

            <g transform="translate(250 1000)">
              <path d="M -180 0 A 180 180 0 0 1 180 0" />
              <path d="M -180 0 A 180 70 0 0 1 180 0" />
              <path d="M -180 0 A 180 25 0 0 1 180 0" />
              <line x1="0" y1="0" x2="0" y2="-180" />
              <line x1="0" y1="0" x2="-100" y2="-150" />
              <line x1="0" y1="0" x2="100" y2="-150" />
            </g>
          </svg>
        </div>

        {/* 3D ESP32 canvas */}
        <div className="absolute top-[20px] left-[2px] w-[540px] h-[620px] bg-transparent overflow-hidden z-20 pointer-events-auto">
          <ESP32Canvas />
        </div>

        {/* ESP32 info card */}
        <DecorativeCard
          className="absolute top-[10%] left-[1%] pointer-events-auto z-30"
          style={{ width: '220px', height: '120px' }}
        >
          <div className="font-mono text-[9px] font-bold uppercase tracking-widest leading-tight text-black">
            <p>
              ESP32 SITS AT THE center of how I think about
            </p>
            <div className="mt-[3px] flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
              <span>– Embedded</span>
              <span className="border border-black rounded-[6px] px-1.5 py-[1px] leading-none mt-[1px]">Design</span>
              <span></span>
            </div>
          </div>
        </DecorativeCard>

        {/* Main copy */}
        <div className="absolute top-[12%] left-[38%] z-20 w-[780px] select-none pointer-events-auto">

          <p className="relative z-10 text-white text-[48px] font-serif leading-[1.15] tracking-tight whitespace-nowrap">
            I craft{' '}
            <svg className="inline-block align-middle mx-0 animate-splat-pulse" width="44" height="44" viewBox="0 0 100 100" fill="#10e7d9b0">
              <polygon points="50.00,0.00 59.06,16.19 75.00,6.70 74.75,25.25 93.30,25.00 83.81,40.94 100.00,50.00 83.81,59.06 93.30,75.00 74.75,74.75 75.00,93.30 59.06,83.81 50.00,100.00 40.94,83.81 25.00,93.30 25.25,74.75 6.70,75.00 16.19,59.06 0.00,50.00 16.19,40.94 6.70,25.00 25.25,25.25 25.00,6.70 40.94,16.19" />
            </svg>
            {' '}interactive ecosystems that<br />
            redefine how we experience the<br />
            digital world.
            <img loading="lazy" decoding="async" src="/jojo_arrow.webp" alt="Arrow" className="inline-block align-middle ml-0 h-[100px] w-auto object-contain -my-4 hover:opacity-90 transition-opacity" data-tooltip="I, AARUSH LENKA, HAVE A DREAM" />
          </p>
          <p className="relative z-10 text-white text-[48px] font-serif leading-[1.15] tracking-tight mt-6 whitespace-nowrap">
            From generative algorithms to<br />
            bespoke hardware, my <span className="relative inline-block">
              practice
              <img loading="lazy" decoding="async" src="/robot-680.webp" alt="Robot" className="absolute left-[70%] bottom-[-40%] h-[340px] w-auto max-w-none object-contain hover:scale-105 transition-transform duration-300" data-tooltip="HOLA, ISTE 👋" />
            </span><br />
            <img loading="lazy" decoding="async" src="/rose.webp" alt="Rose" className="inline-block align-middle mx-1 h-[60px] w-auto object-contain" />
            sits at the crossroads of art and<br />
            engineering.
          </p>
        </div>

        {/* ASCII Art Video Box */}
        <div className="absolute top-[81%] left-[82%] w-[250px] z-40 pointer-events-auto shadow-2xl bg-[#e5e5e5] border border-black p-[6px] -translate-x-1/2 -translate-y-1/2">
          <button className="absolute -top-1.5 -right-1.5 w-1 h-1 bg-white border border-black flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
            <svg width="6" height="6" viewBox="0 0 14 14" fill="none" stroke="black" strokeWidth="2">
              <path d="M1 1L13 13M1 13L13 1" />
            </svg>
          </button>
          <ViewportVideo src="/asciiart.mp4" className="w-full h-auto block" />
        </div>

      </div>
    </div>
  );
}
