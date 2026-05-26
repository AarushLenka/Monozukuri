import React, { useEffect, useState } from 'react';
import RaspberryPiCanvas from './RaspberryPi';
import AnimatedConnector from './components/AnimatedConnector';
import ESP32Canvas from './ESP32';
import GridMarker from './components/GridMarker';
import CoreThreadsPanel from './components/CoreThreadsPanel';
import { CONNECTOR_CONFIG, GRID_CONFIG } from './config/heroConfig';
import ZigzagPattern from './components/ZigzagPattern';
import CreativeWorkGallery from './components/CreativeWorkGallery';
import CreativeRibbon from './components/CreativeRibbon';
const PROJECTS_DATA = [
  { id: '01', title: 'META INTERACTION SDK', desc: 'SOFTWARE FOR XR DEVS', top: '22%', left: '26%', w: '160px', h: '160px', numPos: 'bottom-0 -left-[22px]' },
  { id: '02', title: 'META HORIZON OS', desc: 'HUMAN INTERFACE GUIDELINE', top: '26%', left: '46%', w: '120px', h: '180px', numPos: 'bottom-0 -left-[22px]' },
  { id: '03', title: 'META REALITY LABS', desc: 'INPUT & INTERACTION TEAM', top: '22%', left: '68%', w: '200px', h: '120px', numPos: 'bottom-0 -left-[22px]' },
  { id: '04', title: 'HANDS', desc: 'RESEARCH, EXPLORATIONS AND DESIGN', top: '48%', left: '12%', w: '140px', h: '140px', numPos: 'bottom-0 -left-[22px]' },
  { id: '05', title: 'AFCA.AG', desc: 'MR & CLOUD COMPUTING SOLUTIONS', top: '55%', left: '32%', w: '150px', h: '150px', numPos: 'bottom-0 -left-[22px]' },
  { id: '06', title: 'EXTENDING ABILITIES', desc: 'RESTORING ABILITIES', top: '52%', left: '52%', w: '180px', h: '100px', numPos: 'bottom-0 -left-[22px]' },
];

export default function App() {
  const [time, setTime] = useState('00:43 AM');
  const [scale, setScale] = useState(typeof window !== 'undefined' ? window.innerWidth / 1440 : 1);
  const [outerHeight, setOuterHeight] = useState('auto');
  const wrapperRef = React.useRef(null);

  const spikyPoints = React.useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const angle = (i * Math.PI) / 16;
      const radius = i % 2 === 0 ? 50 : 20;
      return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
    }).join(' ');
  }, []);

  const sigilPath = "M 250,95 L 276,189 L 309,243 L 275,280 L 250,318 M 250,95 L 223,189 L 190,243 L 224,280 L 250,318 M 250,171 L 359,212 L 405,272 L 301,329 L 250,393 M 250,171 L 140,212 L 94,272 L 198,329 L 250,393 M 250,184 L 359,269 L 401,344 L 326,371 L 250,433 M 250,184 L 140,269 L 98,344 L 173,371 L 250,433 M 250,146 L 276,176 L 278,221 L 324,269 L 250,342 M 250,146 L 223,176 L 221,221 L 175,269 L 250,342 M 250,124 L 386,152 L 441,183 L 293,210 L 250,262 M 250,124 L 113,152 L 58,183 L 206,210 L 250,262 M 250,176 L 311,247 L 383,280 L 326,361 L 250,389 M 250,176 L 188,247 L 116,280 L 173,361 L 250,389";

  useEffect(() => {
    const handleResize = () => {
      const newScale = window.innerWidth / 1440;
      setScale(newScale);
      document.documentElement.style.setProperty('--scale', newScale);
      document.documentElement.style.setProperty('--logical-vh', '800px');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver(() => {
      if (wrapperRef.current) {
        setOuterHeight(Math.ceil(wrapperRef.current.offsetHeight * scale) + 1);
      }
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [scale]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#4a4a4a]" style={{ minHeight: '100vh', height: outerHeight !== 'auto' ? Math.max(outerHeight, typeof window !== 'undefined' ? window.innerHeight : 0) : '100vh', overflow: 'hidden' }}>

      {/* ═══════ GLOBAL BACKGROUND (Fixed to window, properly scaled) ═══════ */}
      <div
        className="fixed top-0 left-0 origin-top-left pointer-events-none z-0"
        style={{ width: '1440px', height: 'calc(100vh / var(--scale))', transform: `scale(${scale})` }}
      >
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-red-700/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[700px] bg-gray-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-red-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-zinc-600/40 rounded-[70%_30%_50%_50%/30%_30%_70%_70%] blur-[110px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-rose-700/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-[80px] mix-blend-screen"></div>
        <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] bg-stone-400/20 rounded-[40%_60%_30%_70%/60%_40%_70%_30%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* ═══════ SCROLLABLE CONTENT ═══════ */}
      <div
        ref={wrapperRef}
        className="origin-top-left relative z-[2] text-[#111] font-body selection:bg-black selection:text-white"
        style={{
          width: '1440px',
          transform: `scale(${scale})`
        }}
      >

        {/* ═══════ GLOBAL GRID ═══════ */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {GRID_CONFIG.VERTICAL_POSITIONS.map((pos) => (
            <div key={pos} className="absolute top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/20 fixed-line" style={{ left: pos }} />
          ))}
          {GRID_CONFIG.HORIZONTAL_POSITIONS.map((pos) => (
            <div key={pos} className="absolute left-0 right-0 h-[1px] -translate-y-1/2 bg-white/20 fixed-line" style={{ top: pos }} />
          ))}
          {GRID_CONFIG.MARKER_POSITIONS.map((pos, i) => (
            <GridMarker key={i} style={{ left: pos.left, top: pos.top }} className="fixed-marker" />
          ))}
        </div>

        {/* ═══════ HERO SECTION ═══════ */}
        <div className="relative w-full overflow-hidden z-[2]" style={{ height: 'var(--logical-vh)' }}>
          <div className="relative w-full h-full z-10 pointer-events-none">

            {/* Header */}
            <header className="absolute top-2 left-6 right-6 flex justify-between items-start pointer-events-auto">
              <div className="text-sm font-medium tracking-widest absolute left-0 top-0">MONOZUKURI</div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="bg-white border border-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-1">
                  CHANGE REALITY
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <div className="absolute right-0 top-0 text-[10px] uppercase font-mono tracking-widest text-right leading-tight">
                LOCAL TIME<br />IND {time}
              </div>
            </header>

            {/* Big Title */}
            <div className="absolute top-[12%] left-6 w-[500px] h-[148px] flex flex-col justify-center">
              <h1 className="text-[66px] leading-[0.84] font-normal tracking-tight text-black whitespace-nowrap" style={{ fontFamily: '"Neue Haas Grotesk Text Pro 55 Roman", "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, sans-serif' }}>
                REFINEMENT<br />IS ENDLESS.
              </h1>
            </div>

            {/* Subtext 1 (Left) */}
            <div id="text-deep-roots" className="absolute top-[41%] left-[16%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
              FROM DEEP ROOTS,<br />CREATIVITY DRAWS ITS<br />STRENGTH
            </div>

            {/* Subtext 3 (Top Right) */}
            <div id="text-imagination" className="absolute top-[21%] left-[58%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
              WHERE IMAGINATION<br />BRANCHES INTO A<br />LANDSCAPE OF<br />ENDLESS DIVERSITY
            </div>

            {/* Animated Connectors */}
            {CONNECTOR_CONFIG.map((c) => (
              <AnimatedConnector key={c.id} startId={c.id} gap={c.gap} startAlign={c.startAlign} pts={c.pts} />
            ))}

            <CoreThreadsPanel />

            {/* Floating Island Centerpiece */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-auto z-20">
              <div className="relative w-[600px] h-[650px] flex items-center justify-center pointer-events-auto">
                <RaspberryPiCanvas />
              </div>
            </div>

            {/* Subtext 2 (Foundation) */}
            <div id="text-foundation" className="absolute top-[87%] left-[55%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
              FOUNDATION<br />DESIGNED FOR<br />GROWTH
            </div>

            {/* Tag Card (MONOZUKURI) */}
            <div id="card-monozukuri"
              className="absolute top-[32%] right-[8%] bg-[#e5e5e5] pointer-events-auto"
              style={{
                width: '172px',
                height: '114px',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
              }}>
              <svg className="absolute -inset-px pointer-events-none overflow-visible" width="174" height="116" viewBox="0 0 174 116">
                <path d="M 1.5,69 L 1.5,1.5 L 154,1.5 M 172.5,20 L 172.5,102.5 L 160.5,114.5 L 97,114.5 M 77,114.5 L 1.5,114.5 L 1.5,87"
                  fill="none" stroke="black" strokeWidth="1" />
              </svg>
              <div className="relative z-10 pl-[14px] pt-2 pr-3 pb-3 select-none">
                <div>
                  <div className="bg-[#f0f0f0] px-[3px] -ml-[3px] py-[1px]">
                    <span className="font-bold text-[13px] tracking-wider text-black leading-none block">MONOZUKURI</span>
                  </div>
                  <div className="font-bold text-[11px] tracking-widest text-black leading-none mt-1.5" style={{ fontFamily: '"Hiragino Kaku Gothic", "Hiragino Sans", "Yu Gothic", sans-serif' }}>
                    ものづくり
                  </div>
                </div>
                <div className="text-[8px] font-mono tracking-widest leading-[1.25] text-black/90 mt-1.5">
                  MONO (THING)<br />+ ZUKURI (MAKING)
                </div>
                <div className="text-[8px] font-mono tracking-widest leading-none text-black whitespace-nowrap mt-1.5">
                  THE MAKING OF THINGS
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="absolute bottom-8 right-8 w-[286px] pointer-events-auto">
              <div className="relative w-[286px] h-[168px]">
                <div className="absolute -top-[18px] left-0 z-20 bg-black px-1.5 py-[2px] text-white text-[10px] uppercase font-mono font-bold tracking-widest leading-none">
                  ME, I GUESS
                </div>
                <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 28px 100%, 0 calc(100% - 28px))' }} />
                <svg className="absolute -inset-px pointer-events-none overflow-visible" width="288" height="170" viewBox="0 0 288 170">
                  <path d="M 1.5,48 L 1.5,1.5 L 146,1.5 M 166,1.5 L 286.5,1.5 L 286.5,168.5 L 29.5,168.5 L 1.5,140.5 L 1.5,112 M 1.5,96 L 1.5,64" fill="none" stroke="black" strokeWidth="1" />
                </svg>
                <p className="absolute inset-0 z-10 px-4 py-4 text-[9px] font-mono font-bold leading-[1.02] text-black flex items-center">
                  Hi! I'm Aarush Lenka, a final-year ECE undergraduate at VIT Vellore specializing in microcontroller firmware and sensor fusion. Parallel to engineering, I serve on the Advisory Board for ISTE VIT, providing strategic oversight to the creative team following my tenure leading the motion graphics division. I specialize in post-production, dynamic asset creation, and visual storytelling.
                </p>
              </div>
              <div className="flex justify-end gap-2 text-[9px] font-mono uppercase tracking-widest mt-4">
                <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">LINKEDIN</a>
                <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">GITHUB</a>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ SECTION 2 — ABOUT / PHILOSOPHY ═══════ */}
        <div id="about-section" className="relative w-full overflow-hidden z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
          <div className="relative w-full h-full z-10 pointer-events-none">

            {/* Technical Line Art Background Underneath ESP32 */}
            <div className="absolute top-[-20px] left-[-20px] w-[770px] h-[780px] pointer-events-none z-10 opacity-50 text-white mix-blend-screen">
              <svg viewBox="0 0 1000 1000" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" stroke="none" />
                  </marker>
                </defs>

                {/* Main Grid Lines */}
                <line x1="0" y1="400" x2="1000" y2="400" />
                <line x1="400" y1="0" x2="400" y2="1000" />
                <line x1="750" y1="0" x2="750" y2="1000" />
                <line x1="0" y1="750" x2="1000" y2="750" />

                {/* Angle Lines */}
                <line x1="400" y1="400" x2="950" y2="150" strokeDasharray="4 4" />
                <line x1="400" y1="400" x2="100" y2="850" strokeDasharray="2 6" />

                {/* Protractor Circles */}
                <circle cx="400" cy="400" r="120" />
                <circle cx="400" cy="400" r="180" />
                <circle cx="400" cy="400" r="280" />
                <circle cx="400" cy="400" r="320" strokeDasharray="6 6" />
                <circle cx="400" cy="400" r="350" />

                {/* Tick Marks & Numbers */}
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

                {/* Nodes and Crosshairs */}
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

                {/* Curved Arrows */}
                <path d="M 150,600 A 350,350 0 0,0 600,900" strokeDasharray="5 5" markerEnd="url(#arrow)" />

                {/* Globe wireframe at bottom left */}
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

            {/* ESP32 Model: Top-left */}
            <div className="absolute top-[20px] left-[2px] w-[540px] h-[620px] bg-transparent overflow-hidden z-20 pointer-events-auto">
              <ESP32Canvas />
            </div>

            {/* ESP32 Info Card */}
            <div className="absolute top-[10%] left-[1%] bg-[#e5e5e5] pointer-events-auto z-30"
              style={{
                width: '220px',
                height: '120px',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))'
              }}>
              <svg className="absolute -inset-px pointer-events-none overflow-visible" width="222" height="122" viewBox="0 0 222 122">
                <path d="M 1.5,40 L 1.5,1.5 L 200,1.5 M 221,25 L 221,106 L 204.5,121 L 100,121 M 70,121 L 16.5,121 L 1.5,105.5 L 1.5,75" fill="none" stroke="black" strokeWidth="1" />
              </svg>
              <div className="relative z-10 px-3 py-2">
                <div className="flex justify-between items-start">
                  {/* Zigzag Pattern */}
                  <ZigzagPattern squareSize={10} gap={10} color="black" />
                  {/* Spiky Ball */}
                  <svg viewBox="0 0 100 100" width="20" height="20" className="animate-spiky-spin -mt-0.5">
                    <polygon points={spikyPoints} fill="black" />
                  </svg>
                </div>

                <div className="w-full h-[1px] bg-black/20 my-[5px]"></div>

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
              </div>
            </div>

            {/* Large Typography Block */}
            <div className="absolute top-[15%] left-[39%] z-20 max-w-[750px] select-none pointer-events-auto">
              {/* Floating Robot */}
              <img src="/robot.png" alt="Robot" className="absolute right-[-17%] bottom-[24%] h-[301px] w-auto object-contain pointer-events-none" />

              <p className="text-white text-[52px] font-serif leading-[1.12] tracking-tight">
                I craft{' '}
                <svg className="inline-block align-middle mx-0 animate-splat-pulse" width="48" height="48" viewBox="0 0 100 100" fill="#499580">
                  <polygon points="50.00,0.00 59.06,16.19 75.00,6.70 74.75,25.25 93.30,25.00 83.81,40.94 100.00,50.00 83.81,59.06 93.30,75.00 74.75,74.75 75.00,93.30 59.06,83.81 50.00,100.00 40.94,83.81 25.00,93.30 25.25,74.75 6.70,75.00 16.19,59.06 0.00,50.00 16.19,40.94 6.70,25.00 25.25,25.25 25.00,6.70 40.94,16.19" />
                </svg>
                {' '}interactive ecosystems that redefine how we experience the digital world.
                <img src="/jojo_arrow.png" alt="Arrow" className="inline-block align-middle ml-0 h-[110px] w-auto object-contain -my-4" />
              </p>
              <p className="text-white text-[52px] font-serif leading-[1.12] tracking-tight mt-3">
                From generative algorithms to bespoke hardware, my practice <br />
                <img src="/rose.png" alt="Rose" className="inline-block align-middle mx-1 h-[70px] w-auto object-contain" />
                sits at the crossroads of art and engineering.
              </p>
            </div>

          </div>
        </div>

        {/* ═══════ SECTION 3 — PROJECTS ═══════ */}
        <div id="projects-section" className="relative w-full overflow-hidden z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
          <div className="relative w-full h-full z-10 pointer-events-none">

            {/* Header */}
            <div className="absolute top-[8%] left-0 w-full flex flex-col items-center justify-center pointer-events-auto">
              <h2 className="text-[72px] font-body leading-none tracking-tight text-black">
                Some Projects I have worked on
              </h2>
            </div>

            {/* Project Images */}
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="absolute pointer-events-auto group cursor-pointer"
                style={{ top: proj.top, left: proj.left, width: proj.w, height: proj.h }}
              >
                {/* Number */}
                <div className={`absolute font-mono text-[10px] font-bold text-black ${proj.numPos}`}>
                  {proj.id}.
                </div>
                {/* Image Placeholder */}
                <div className="w-full h-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:bg-[#111]">
                  <img
                    src={`https://placehold.co/400x400/222/aaa?text=Project+${proj.id}`}
                    alt={proj.title}
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                  />
                </div>
              </div>
            ))}

            {/* Project Info Card (Added to the right of project 6) */}
            {/* Project Info Card (Added to the right of project 6) */}
            <div className="absolute top-[41%] left-[82%] pointer-events-auto z-30" style={{ width: '220px', height: '120px' }}>

              {/* Pilot Image Overlapping Bottom Left */}
              <div className="absolute top-[100px] right-[190px] w-60 z-40 pointer-events-auto shadow-2xl bg-white border border-black p-[6px]">
                {/* Close Button */}
                <button className="absolute -top-1.5 -right-1.5 w-1 h-1 bg-white border border-black flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                  <svg width="6" height="6" viewBox="0 0 14 14" fill="none" stroke="black" strokeWidth="2">
                    <path d="M1 1L13 13M1 13L13 1" />
                  </svg>
                </button>
                <img
                  src="/pilot.png"
                  alt="Pilot"
                  className="w-full h-auto block"
                />
              </div>

              {/* Card Container with Clip Path */}
              <div className="absolute inset-0 bg-[#e5e5e5]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))'
                }}>
                <svg className="absolute -inset-px pointer-events-none overflow-visible" width="222" height="122" viewBox="0 0 222 122">
                  <path d="M 1.5,40 L 1.5,1.5 L 200,1.5 M 221,25 L 221,106 L 204.5,121 L 100,121 M 70,121 L 16.5,121 L 1.5,105.5 L 1.5,75" fill="none" stroke="black" strokeWidth="1" />
                </svg>
                <div className="relative z-10 px-3 py-2">
                  <div className="flex justify-between items-start">
                    {/* Zigzag Pattern */}
                    <ZigzagPattern squareSize={10} gap={10} color="black" />
                    {/* Spiky Ball */}
                    <svg viewBox="0 0 100 100" width="20" height="20" className="animate-spiky-spin -mt-0.5">
                      <polygon points={spikyPoints} fill="black" />
                    </svg>
                  </div>

                  <div className="w-full h-[1px] bg-black/20 my-[5px]"></div>

                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest leading-tight text-black text-right flex flex-col items-end">
                    <p>I like building stuff,</p>
                    <p>sometimes even though I</p>
                    <div className="mt-[3px] flex items-center justify-end gap-x-1.5">
                      <span>don't know</span>
                      <span className="border border-black rounded-[6px] px-1.5 py-[1px] leading-none mt-[1px]">how to</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Footer List */}
            <div className="absolute bottom-[5%] left-0 w-full flex justify-center pointer-events-auto">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-1 w-max">
                {PROJECTS_DATA.map((proj) => (
                  <div key={`footer-${proj.id}`} className="font-mono text-[9px] font-bold uppercase tracking-tighter text-white/80 flex items-center">
                    <span>{proj.id}. {proj.title}</span>
                    <span className="text-white/50 mx-1">-</span>
                    <span className="text-white/60">{proj.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ SECTION 4 — CREATIVE WORK ═══════ */}
        <div id="creative-work-section" className="relative w-full overflow-hidden z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
          <div className="relative w-full h-full z-10 pointer-events-none flex flex-col items-center justify-center">

            <CreativeRibbon />

            {/* Header */}
            <div className="absolute top-[8%] left-0 w-full flex flex-col items-center justify-center pointer-events-auto z-10">
              <h2 className="text-[72px] font-body leading-none tracking-tight text-black">
                Creative Work
              </h2>
            </div>

            {/* Accordion Gallery Component */}
            <CreativeWorkGallery />

          </div>
        </div>

      </div>
    </div>
  );
}
