import React, { useEffect, useState } from 'react';
import RaspberryPiCanvas from './RaspberryPi';
import AnimatedConnector from './components/AnimatedConnector';
import ESP32Canvas from './ESP32';
import GridMarker from './components/GridMarker';
import CoreThreadsPanel from './components/CoreThreadsPanel';
import { CONNECTOR_CONFIG, GRID_CONFIG } from './config/heroConfig';

export default function App() {
  const [time, setTime] = useState('00:43 AM');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-[#4a4a4a] text-[#111] font-body selection:bg-black selection:text-white">

      {/* ═══════ GLOBAL BACKGROUND ═══════ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-red-700/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[700px] bg-gray-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-red-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-zinc-600/40 rounded-[70%_30%_50%_50%/30%_30%_70%_70%] blur-[110px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-rose-700/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-[80px] mix-blend-screen"></div>
        <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] bg-stone-400/20 rounded-[40%_60%_30%_70%/60%_40%_70%_30%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* ═══════ GLOBAL GRID ═══════ */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {GRID_CONFIG.VERTICAL_POSITIONS.map((pos) => (
          <div key={pos} className="absolute top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/20" style={{ left: pos }} />
        ))}
        {GRID_CONFIG.HORIZONTAL_POSITIONS.map((pos) => (
          <div key={pos} className="absolute left-0 right-0 h-[1px] -translate-y-1/2 bg-white/20" style={{ top: pos }} />
        ))}
        {GRID_CONFIG.MARKER_POSITIONS.map((pos, i) => (
          <GridMarker key={i} style={{ left: pos.left, top: pos.top }} />
        ))}
      </div>

      {/* ═══════ HERO SECTION ═══════ */}
      <div className="relative w-full h-screen overflow-hidden z-[2]">
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
      </div>{/* end hero */}

      {/* ═══════ SECTION 2 — ABOUT / PHILOSOPHY ═══════ */}
      <section id="about-section" className="relative w-full min-h-screen overflow-hidden py-24 px-8 md:px-16 z-[2]">

        {/* ESP32 Model: Top-left */}
        <div className="absolute top-[-50px] left-[2px] w-[540px] h-[620px] bg-transparent overflow-hidden z-20 pointer-events-auto">
          <ESP32Canvas />
        </div>

        {/* Large Typography Block */}
        <div className="relative z-20 ml-[39%] mt-[-20%] max-w-[660px] select-none">
          <p className="text-white text-[42px] md:text-[52px] font-serif leading-[1.12] tracking-tight">
            Lorem{' '}
            <svg className="inline-block align-middle mx-1" width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" /></svg>
            {' '}ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            dolor sit amet consectetur
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
