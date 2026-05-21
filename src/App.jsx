import React, { useEffect, useState } from 'react';
import RaspberryPiCanvas from './RaspberryPi';
import AnimatedConnector from './components/AnimatedConnector';
import ESP32Canvas from './ESP32';

const GridMarker = ({ className }) => (
  <svg
    className={`absolute -translate-x-1/2 -translate-y-1/2 overflow-visible ${className}`}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0" y1="5" x2="10" y2="5" stroke="white" strokeWidth="1.2" />
    <line x1="5" y1="0" x2="5" y2="10" stroke="white" strokeWidth="1.2" />
    <circle cx="5" cy="5" r="2" fill="white" />
  </svg>
);

const THREAD_ITEMS = [
  { id: '01.', tag: 'MICROCONTROLLER', title: 'ESP32', barWidth: 132, animDur: '5s', animDelay: '-0.54s' },
  { id: '02.', tag: 'VLSI', title: 'VERILOG, PHYSICAL DESIGN, CMOS', barWidth: 160, animDur: '5s', animDelay: '-1.18s' },
  { id: '03.', tag: 'AI AUTOMATION', title: 'N8N, LANGCHAIN, MCP', barWidth: 106, animDur: '5s', animDelay: '-2.07s' },
  { id: '04.', tag: 'IOT', title: 'AWS, AZURE, FIREBASE', barWidth: 138, animDur: '5s', animDelay: '-1.46s' },
  { id: '05.', tag: 'LOREM IPSUM', title: 'DOLOR SIT AMET', barWidth: 116, animDur: '5s', animDelay: '-2.41s' },
  { id: '06.', tag: 'CONSECTETUR', title: 'ADIPISCING ELIT', barWidth: 126, animDur: '5s', animDelay: '-0.89s' },
  { id: '07.', tag: 'SED DO', title: 'EIUSMOD TEMPOR', barWidth: 102, animDur: '5s', animDelay: '-1.73s' }

];

const PIXEL_W = 7;
const PIXEL_H = 13;
const PIXEL_COLOR = '#f1f1f1';

function PixelField() {
  const [pixels, setPixels] = useState(() =>
    Array.from({ length: PIXEL_W * PIXEL_H }, (_, index) => {
      const row = Math.floor(index / PIXEL_W);
      return row > PIXEL_H * 0.58 ? PIXEL_COLOR : null;
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPixels((current) =>
        current.map((pixel, index) => {
          const row = Math.floor(index / PIXEL_W);
          const lowerBias = row > PIXEL_H * 0.58;
          const roll = Math.random();
          if (pixel && roll > (lowerBias ? 0.985 : 0.82)) return null;
          if (!pixel && roll > (lowerBias ? 0.78 : 0.94)) return PIXEL_COLOR;
          return pixel;
        })
      );
    }, 220);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="grid h-full w-full bg-transparent"
      style={{
        gridTemplateColumns: `repeat(${PIXEL_W}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${PIXEL_H}, minmax(0, 1fr))`
      }}
    >
      {pixels.map((pixel, index) => (
        <div
          key={index}
          className="h-full w-full"
          style={{ backgroundColor: pixel || 'transparent' }}
        />
      ))}
    </div>
  );
}

function MovingSlashBar({ width, animDur, animDelay }) {
  const slashGap = 6;
  const slashCount = Math.ceil((width + 24) / slashGap);

  return (
    <div className="relative h-[10px] overflow-hidden" style={{ width }}>
      <svg
        className="thread-hatch absolute inset-y-0 -left-[10px] w-[calc(100%+20px)]"
        viewBox={`0 0 ${width + 20} 10`}
        preserveAspectRatio="none"
        style={{
          animationDuration: animDur,
          animationDelay: animDelay
        }}
      >
        {Array.from({ length: slashCount }).map((_, index) => {
          const x = index * slashGap + 1;
          return (
            <line
              key={index}
              x1={x}
              y1="9"
              x2={x + 5}
              y2="1"
              stroke="#101010"
              strokeWidth="2.1"
              strokeLinecap="square"
            />
          );
        })}
      </svg>
    </div>
  );
}

function CoreThreadsPanel() {
  return (
    <div className="absolute bottom-8 left-8 w-[322px] pointer-events-auto select-none">
      <h2 className="mb-[10px] text-[10px] font-mono font-bold uppercase tracking-widest text-black">
        [ CORE THREADS OF MY WORK ]
      </h2>
      <div className="flex gap-[14px]">
        <div className="relative h-[200px] w-[68px] border border-black/70 bg-transparent">
          <div className="absolute inset-x-0 top-0 h-[47px] border-b border-black/70">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 68 47" fill="none" preserveAspectRatio="none">
              <g transform="translate(34 23.5) scale(0.82)">
                <g className="tesseract-spin" transform="rotate(-18)">
                  <rect x="-12" y="-12" width="20" height="20" stroke="black" strokeWidth="1.3" />
                  <rect x="-2" y="-16" width="20" height="20" stroke="black" strokeWidth="1.3" />
                  <path d="M-12 -12L-2 -16M8 -12L18 -16M-12 8L-2 4M8 8L18 4" stroke="black" strokeWidth="1.3" />
                  <path d="M-12 -12L-12 8M8 -12L8 8M-2 -16L-2 4M18 -16L18 4" stroke="black" strokeWidth="1.1" />
                  <path d="M-7 -7H11M-7 -1H11M-7 -7L-7 -1M11 -7L11 -1" stroke="black" strokeWidth="1" />
                </g>
              </g>
            </svg>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-[47px]">
            <PixelField />
          </div>
        </div>

        <div className="flex-1 pt-[1px]">
          {THREAD_ITEMS.map((item, index) => (
            <div key={item.id} className="mb-[5px] last:mb-0">
              <div className="mb-[2px] flex items-center gap-[2px]">
                <div className="bg-white px-[1px] text-[8px] font-mono font-bold uppercase tracking-widest leading-[1.05] text-black whitespace-nowrap">
                  {item.id}{item.tag ? ` ${item.tag}` : ''}
                </div>
                <MovingSlashBar width={item.barWidth} animDur={item.animDur} animDelay={item.animDelay} />
              </div>
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest leading-none text-black whitespace-nowrap">
                {item.title}
              </div>
              <div
                className={`mt-[3px] h-px bg-black/80 ${index === THREAD_ITEMS.length - 1 ? 'ml-[-82px] w-[296px]' : 'w-[214px]'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState("00:43 AM");

  useEffect(() => {
    // Simple clock update for effect
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-[#4a4a4a] text-[#111] font-body selection:bg-black selection:text-white">

      {/* ═══════ GLOBAL BACKGROUND (continuous across all sections) ═══════ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Ink Swirls */}
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-red-700/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[700px] bg-gray-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-red-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-zinc-600/40 rounded-[70%_30%_50%_50%/30%_30%_70%_70%] blur-[110px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-rose-700/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-[80px] mix-blend-screen"></div>
        <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] bg-stone-400/20 rounded-[40%_60%_30%_70%/60%_40%_70%_30%] blur-[90px] mix-blend-screen"></div>
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* ═══════ GLOBAL GRID (continuous across all sections) ═══════ */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* Vertical Lines */}
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] -translate-x-1/2 bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] -translate-x-1/2 bg-white/20"></div>
        {/* Horizontal Lines */}
        <div className="absolute left-0 right-0 top-1/3 h-[1px] -translate-y-1/2 bg-white/20"></div>
        <div className="absolute left-0 right-0 top-[66.66%] h-[1px] -translate-y-1/2 bg-white/20"></div>
        {/* Grid Intersections & Markers */}
        <GridMarker className="left-1/4 top-1/3" />
        <GridMarker className="left-1/2 top-1/3" />
        <GridMarker className="left-3/4 top-1/3" />
        <GridMarker className="left-1/4 top-[66.66%]" />
        <GridMarker className="left-1/2 top-[66.66%]" />
        <GridMarker className="left-3/4 top-[66.66%]" />
      </div>

      {/* ═══════ HERO SECTION ═══════ */}
      <div className="relative w-full h-screen overflow-hidden z-[2]">



        {/* Main Content Overlay */}
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
          <AnimatedConnector startId="text-deep-roots" gap={4} startAlign="left" pts={[
            {},
            { useStartRightX: true, useStartY: true },
            { x: 35, y: 52, jitterY: true },
            { x: 40, y: 52, jitterX: true, jitterY: true }
          ]} />
          <AnimatedConnector startId="text-imagination" gap={4} startAlign="right" pts={[
            {},
            { useStartLeftX: true, useStartY: true },
            { x: 45, y: 40, jitterY: true },
            { x: 40, y: 40, jitterX: true, jitterY: true }
          ]} />
          <AnimatedConnector startId="card-monozukuri" gap={0} pts={[
            {},
            { x: 75, useStartY: true },
            { x: 65, y: 56, jitterY: true },
            { x: 60, y: 56, jitterX: true, jitterY: true }
          ]} />
          <AnimatedConnector startId="text-foundation" gap={4} startAlign="right" pts={[
            {},
            { useStartLeftX: true, useStartY: true },
            { x: 50, y: 78, jitterY: true },
            { x: 43, y: 72, jitterX: true, jitterY: true }
          ]} />

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

          {/* Tag Card (MONOZUKURI /25) */}
          <div id="card-monozukuri"
            className="absolute top-[32%] right-[8%] bg-[#e5e5e5] pointer-events-auto"
            style={{
              width: '172px',
              height: '114px',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
            }}>

            {/* Broken Outline SVG */}
            <svg className="absolute -inset-px pointer-events-none overflow-visible" width="174" height="116" viewBox="0 0 174 116">
              <path d="M 1.5,69 L 1.5,1.5 L 154,1.5 M 172.5,20 L 172.5,102.5 L 160.5,114.5 L 97,114.5 M 77,114.5 L 1.5,114.5 L 1.5,87"
                fill="none" stroke="black" strokeWidth="1" />
            </svg>

            {/* Content */}
            <div className="relative z-10 pl-[14px] pt-2 pr-3 pb-3 select-none">
              {/* Header */}
              <div>
                <div className="bg-[#f0f0f0] px-[3px] -ml-[3px] py-[1px]">
                  <span className="font-bold text-[13px] tracking-wider text-black leading-none block">MONOZUKURI</span>
                </div>
                <div
                  className="font-bold text-[11px] tracking-widest text-black leading-none mt-1.5"
                  style={{ fontFamily: '"Hiragino Kaku Gothic", "Hiragino Sans", "Yu Gothic", sans-serif' }}
                >
                  ものづくり
                </div>
              </div>

              {/* Meaning text */}
              <div className="text-[8px] font-mono tracking-widest leading-[1.25] text-black/90 mt-1.5">
                MONO (THING)<br />
                + ZUKURI (MAKING)
              </div>

              {/* Result */}
              <div className="text-[8px] font-mono tracking-widest leading-none text-black whitespace-nowrap mt-1.5">
                THE MAKING OF THINGS
              </div>
            </div>
          </div>

          {/* Info Card (NOT A STUDIO) */}
          <div className="absolute bottom-8 right-8 w-[286px] pointer-events-auto">
            <div className="relative w-[286px] h-[168px]">
              <div className="absolute -top-[18px] left-0 z-20 bg-black px-1.5 py-[2px] text-white text-[10px] uppercase font-mono font-bold tracking-widest leading-none">
                ME, I GUESS
              </div>
              <div
                className="absolute inset-0 bg-white"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 28px 100%, 0 calc(100% - 28px))' }}
              />
              <svg className="absolute -inset-px pointer-events-none overflow-visible" width="288" height="170" viewBox="0 0 288 170">
                <path
                  d="M 1.5,48 L 1.5,1.5 L 146,1.5 M 166,1.5 L 286.5,1.5 L 286.5,168.5 L 29.5,168.5 L 1.5,140.5 L 1.5,112 M 1.5,96 L 1.5,64"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                />
              </svg>
              <p className="absolute inset-0 z-10 px-4 py-4 text-[9px] font-mono font-bold leading-[1.02] text-black flex items-center">
                Hi! I’m Aarush Lenka, a final-year ECE undergraduate at VIT Vellore specializing in microcontroller firmware and sensor fusion. Parallel to engineering, I serve on the Advisory Board for ISTE VIT, providing strategic oversight to the creative team following my tenure leading the motion graphics division. I specialize in post-production, dynamic asset creation, and visual storytelling.
              </p>
            </div>
            <div className="flex justify-end gap-2 text-[9px] font-mono uppercase tracking-widest mt-4">
              <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">LINKEDIN</a>
              <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">GITHUB</a>

            </div>
          </div>

        </div>
      </div>{/* end hero */}

      {/* ═══════ SECTION 2 — ABOUT / PHILOSOPHY ═══════ */}
      <section id="about-section" className="relative w-full min-h-screen overflow-hidden py-24 px-8 md:px-16 z-[2]">

        {/* ── ESP32 Model: Top-left ── */}
        <div className="absolute top-[-50px] left-[2px] w-[540px] h-[620px] bg-transparent overflow-hidden z-20 pointer-events-auto">
          <ESP32Canvas />
        </div>


        {/* ── Large Typography Block ── */}
        <div className="relative z-20 ml-[39%] mt-[-20%] max-w-[660px] select-none">
          <p className="text-white text-[42px] md:text-[52px] font-serif leading-[1.12] tracking-tight">
            Lorem{' '}
            <svg className="inline-block align-middle mx-1" width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" /></svg>
            {' '}ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            dolor sit amet consectetur
            {/* Chain link icon */}
            <svg className="inline-block align-middle ml-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <circle cx="9" cy="12" r="5" />
              <circle cx="15" cy="12" r="5" />
            </svg>
          </p>

          <p className="text-white text-[42px] md:text-[52px] font-serif leading-[1.12] tracking-tight mt-6">
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Quisquam, quod.
            {' '}
            <svg className="inline-block align-middle mx-1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" /></svg>
            {' '}elit.<br />
            Quisquam, quod.<br />
            <span className="text-orange-400">🌺</span> Lorem Ipsum.
          </p>
        </div>

        

      </section>

    </div>
  );
}
