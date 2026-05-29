import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import RaspberryPiCanvas from './RaspberryPi';
import AnimatedConnector from './components/AnimatedConnector';
import ESP32Canvas from './ESP32';
import GridMarker from './components/GridMarker';
import CoreThreadsPanel from './components/CoreThreadsPanel';
import { CONNECTOR_CONFIG, GRID_CONFIG } from './config/heroConfig';
import ZigzagPattern from './components/ZigzagPattern';
import CreativeWorkGallery from './components/CreativeWorkGallery';
import CreativeRibbon from './components/CreativeRibbon';
import Loader from './components/Loader';
import ModelCanvas from './components/ModelCanvas';

const PROJECTS_DATA = [
  { id: '01', title: 'Neuracc', desc: 'Neural Network MAC Accelerator', top: '22%', left: '26%', w: '160px', h: '160px', numPos: 'bottom-0 -left-[22px]', model: '/Ryzen 7 9850X3D2.glb', bgTransparent: true },
  { id: '02', title: 'Nexus', desc: 'Home Automation Bot', top: '26%', left: '46%', w: '120px', h: '180px', numPos: 'bottom-0 -left-[22px]', image: '/home automation.png', bgTransparent: true },
  { id: '03', title: 'Argus', desc: 'PID-Controlled S-400 Air Defense System Simulation', top: '22%', left: '68%', w: '200px', h: '120px', numPos: 'bottom-0 -left-[22px]', image: '/milk-missile-missile.gif' },
  { id: '04', title: 'Vitalyse', desc: 'Intelligent Remote Patient Care Assistant', top: '48%', left: '12%', w: '140px', h: '140px', numPos: 'bottom-0 -left-[22px]', image: '/image 11.png', bgTransparent: true },
  { id: '05', title: 'FirmwarePilot', desc: 'AI Agent for Automated Over-the-Air Updates', top: '55%', left: '32%', w: '120px', h: '185px', numPos: 'bottom-0 -left-[22px]', video: '/ota.mp4' },
  { id: '06', title: 'EXTENDING ABILITIES', desc: 'RESTORING ABILITIES', top: '52%', left: '52%', w: '180px', h: '100px', numPos: 'bottom-0 -left-[22px]', image: '/vlsi3.png' },
];

const generateAMPaths = () => {
  const amPts = [];
  const envLeftPts = [];
  const envRightPts = [];

  for (let y = 0; y <= 610; y += 2) {
    const t = y / 610;
    const env = 60 + 40 * Math.sin(t * Math.PI * 5);
    const carrier = Math.sin(t * Math.PI * 70);
    const x = env * carrier;
    amPts.push(`${x.toFixed(1)},${y}`);

    if (y % 6 === 0) {
      envLeftPts.push(`${(-env).toFixed(1)},${y}`);
      envRightPts.push(`${env.toFixed(1)},${y}`);
    }
  }

  return {
    wave: `M ${amPts.join(' L ')}`,
    envLeft: `M ${envLeftPts.join(' L ')}`,
    envRight: `M ${envRightPts.join(' L ')}`,
  };
};

const AM_PATHS = generateAMPaths();

const generateCityPaths = () => {
  const drawLayer = (buildings, doWindows = false) => {
    // Smooth out deep narrow valleys/dips in the skyline
    let smoothedBuildings = [...buildings];
    for (let iter = 0; iter < 3; iter++) {
      for (let i = 1; i < smoothedBuildings.length - 1; i++) {
        const b = smoothedBuildings[i];
        const leftH = smoothedBuildings[i - 1].h;
        const rightH = smoothedBuildings[i + 1].h;
        if (b.h > leftH && b.h > rightH) {
          smoothedBuildings[i] = { ...b, h: Math.max(leftH, rightH) };
        }
      }
    }

    let outline = 'M 0 900 ';
    let x = 0;
    let windows = '';
    for (let b of smoothedBuildings) {
      if (b.type === "flat") {
        outline += `L ${x} ${b.h} L ${x + b.w} ${b.h} `;
      } else if (b.type === "spire") {
        outline += `L ${x} ${b.h} L ${x + b.w / 2 - 2} ${b.h} L ${x + b.w / 2} ${b.h - b.spire} L ${x + b.w / 2 + 2} ${b.h} L ${x + b.w} ${b.h} `;
      } else if (b.type === "step") {
        outline += `L ${x} ${b.h} L ${x + b.w / 4} ${b.h} L ${x + b.w / 4} ${b.h - b.step} L ${x + 3 * b.w / 4} ${b.h - b.step} L ${x + 3 * b.w / 4} ${b.h} L ${x + b.w} ${b.h} `;
      }

      if (doWindows && b.w > 20 && b.h < 850) {
        let seed = x * b.h;
        const pseudoRand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        for (let wy = b.h + 20; wy < 880; wy += 20) {
          if (pseudoRand() > 0.4) {
            windows += `M ${x + 8} ${wy} L ${x + b.w - 8} ${wy} `;
          }
        }
      }
      x += b.w;
    }
    outline += `L 1440 900 Z`;
    return { outline, windows };
  };

  const front = drawLayer([
    { w: 50, h: 880, type: 'flat' }, { w: 30, h: 800, type: 'flat' }, { w: 20, h: 850, type: 'flat' },
    { w: 40, h: 780, type: 'flat' }, { w: 60, h: 720, type: 'step', step: 40 }, { w: 30, h: 820, type: 'flat' },
    { w: 40, h: 650, type: 'step', step: 30 }, { w: 20, h: 800, type: 'flat' }, { w: 50, h: 550, type: 'spire', spire: 60 },
    { w: 40, h: 700, type: 'flat' }, { w: 30, h: 600, type: 'flat' }, { w: 30, h: 750, type: 'flat' },
    { w: 20, h: 820, type: 'flat' }, { w: 80, h: 620, type: 'step', step: 50 }, { w: 40, h: 750, type: 'flat' },
    { w: 20, h: 830, type: 'flat' }, { w: 70, h: 400, type: 'spire', spire: 150 }, { w: 30, h: 750, type: 'flat' },
    { w: 60, h: 650, type: 'step', step: 40 }, { w: 40, h: 800, type: 'flat' }, { w: 50, h: 500, type: 'spire', spire: 80 },
    { w: 30, h: 700, type: 'flat' }, { w: 60, h: 620, type: 'flat' }, { w: 40, h: 750, type: 'flat' },
    { w: 70, h: 450, type: 'step', step: 60 }, { w: 30, h: 700, type: 'flat' }, { w: 50, h: 800, type: 'flat' },
    { w: 40, h: 650, type: 'flat' }, { w: 60, h: 600, type: 'step', step: 40 }, { w: 50, h: 750, type: 'flat' },
    { w: 30, h: 820, type: 'flat' }, { w: 40, h: 780, type: 'flat' }, { w: 50, h: 850, type: 'step', step: 20 },
    { w: 40, h: 880, type: 'flat' }
  ], true);

  const mid = drawLayer([
    { w: 80, h: 800, type: 'flat' }, { w: 50, h: 700, type: 'step', step: 30 }, { w: 60, h: 550, type: 'flat' },
    { w: 40, h: 750, type: 'flat' }, { w: 70, h: 400, type: 'spire', spire: 80 }, { w: 50, h: 650, type: 'flat' },
    { w: 80, h: 480, type: 'step', step: 40 }, { w: 60, h: 700, type: 'flat' }, { w: 90, h: 300, type: 'spire', spire: 120 },
    { w: 60, h: 600, type: 'flat' }, { w: 50, h: 450, type: 'step', step: 50 }, { w: 80, h: 680, type: 'flat' },
    { w: 70, h: 350, type: 'spire', spire: 90 }, { w: 60, h: 550, type: 'flat' }, { w: 80, h: 420, type: 'step', step: 60 },
    { w: 50, h: 720, type: 'flat' }, { w: 90, h: 320, type: 'spire', spire: 100 }, { w: 60, h: 650, type: 'flat' },
    { w: 70, h: 500, type: 'step', step: 40 }, { w: 50, h: 750, type: 'flat' }, { w: 60, h: 600, type: 'flat' },
    { w: 80, h: 800, type: 'flat' }
  ], true);

  const back = drawLayer([
    { w: 120, h: 750, type: 'flat' }, { w: 90, h: 600, type: 'step', step: 50 }, { w: 80, h: 450, type: 'flat' },
    { w: 100, h: 300, type: 'spire', spire: 100 }, { w: 110, h: 550, type: 'flat' }, { w: 90, h: 400, type: 'step', step: 60 },
    { w: 120, h: 250, type: 'spire', spire: 150 }, { w: 100, h: 500, type: 'flat' }, { w: 90, h: 350, type: 'step', step: 70 },
    { w: 110, h: 600, type: 'flat' }, { w: 100, h: 280, type: 'spire', spire: 110 }, { w: 80, h: 480, type: 'flat' },
    { w: 90, h: 650, type: 'step', step: 40 }, { w: 160, h: 750, type: 'flat' }
  ], false);

  const stars = [];
  let seed = 42;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 50; i++) {
    stars.push({
      cx: rand() * 1440,
      cy: rand() * 400,
      r: rand() * 1.5,
      opacity: rand() * 0.5 + 0.2
    });
  }

  return { front, mid, back, stars };
};

const CITY_PATHS = generateCityPaths();

export default function App() {
  const [time, setTime] = useState('00:43 AM');
  const [scale, setScale] = useState(typeof window !== 'undefined' ? window.innerWidth / 1440 : 1);
  const [outerHeight, setOuterHeight] = useState('auto');
  const [creativeMousePos, setCreativeMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const wrapperRef = React.useRef(null);
  const creativeSectionRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const spikyPoints = React.useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const angle = (i * Math.PI) / 16;
      const radius = i % 2 === 0 ? 50 : 20;
      return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
    }).join(' ');
  }, []);

  const handleCreativeMouseMove = (e) => {
    if (!creativeSectionRef.current) return;
    const rect = creativeSectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCreativeMousePos({ x, y });
  };

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
    <>
      {/* Fixed bg — outside all transforms so it's always viewport-fixed */}
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] pointer-events-none z-0 overflow-hidden bg-[#3a3a3a]">
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-red-700/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[700px] bg-gray-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-red-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-zinc-600/40 rounded-[70%_30%_50%_50%/30%_30%_70%_70%] blur-[110px] mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-rose-700/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-[80px] mix-blend-screen"></div>
        <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] bg-stone-400/20 rounded-[40%_60%_30%_70%/60%_40%_70%_30%] blur-[90px] mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {isLoading && <Loader onLoadingComplete={() => {
        setHeroVisible(true);
        setTimeout(() => setIsLoading(false), 400);
      }} />}
      <div
        className="w-full"
        style={{
          opacity: heroVisible ? 1 : 0,
          filter: heroVisible ? 'none' : 'blur(20px) brightness(2)',
          transform: heroVisible ? 'scale(1)' : 'scale(1.012)',
          transition: heroVisible ? 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)' : 'none',
          minHeight: '100vh',
          height: outerHeight !== 'auto' ? Math.max(outerHeight, typeof window !== 'undefined' ? window.innerHeight : 0) : '100vh',
          overflow: 'hidden'
        }}
      >

      <div
        ref={wrapperRef}
        className="origin-top-left relative z-[2] text-[#111] font-body selection:bg-black selection:text-white overflow-hidden"
        style={{
          width: '1440px',
          transform: `scale(${scale})`
        }}
      >

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

        <div className="relative w-full overflow-hidden z-[2]" style={{ height: 'var(--logical-vh)' }}>
          <div className="relative w-full h-full z-10 pointer-events-none">

            <header className="absolute top-2 left-6 right-6 flex justify-between items-start pointer-events-auto">
              <div className="text-sm font-medium tracking-widest absolute left-0 top-0">MONOZUKURI</div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="bg-white border border-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-1">
                  SAY HELLO
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

            <div className="absolute top-[12%] left-6 w-[500px] h-[148px] flex flex-col justify-center">
              <h1 className="text-[61px] leading-[0.84] font-normal tracking-tight text-black whitespace-nowrap" style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", "DotGothic16", sans-serif' }}>
                LICENSED <br />BEEP-BOOP MECHANIC.
              </h1>
            </div>

            <div id="text-deep-roots" className="absolute top-[41%] left-[16%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
              EXPERIMENT FIRST<br />EXPLAIN LATER
            </div>

            <div id="text-imagination" className="absolute top-[21%] left-[58%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
              PROFESSIONAL <br />"WHY ISN'T THIS WORKING"<br />SPECIALIST
            </div>

            {CONNECTOR_CONFIG.map((c) => (
              <AnimatedConnector key={c.id} startId={c.id} gap={c.gap} startAlign={c.startAlign} pts={c.pts} />
            ))}

            <CoreThreadsPanel />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-auto z-20">
              <div className="relative w-[600px] h-[650px] flex items-center justify-center pointer-events-auto">
                <RaspberryPiCanvas isLoading={isLoading} />
              </div>
            </div>

            <div id="text-foundation" className="absolute top-[87%] left-[55%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
              CREATIVITY <br />WITH A SIDE<br />OF CHAOS
            </div>

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

            <div className="absolute bottom-8 right-8 w-[290px] pointer-events-auto">
              <div className="relative w-[290px] h-[190px]">
                <div className="absolute -top-[18px] left-0 z-20 bg-black px-1.5 py-[2px] text-white text-[12px] uppercase font-mono font-bold tracking-widest leading-none">
                  ME, I GUESS
                </div>
                <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 28px 100%, 0 calc(100% - 28px))' }} />
                <svg className="absolute -inset-px pointer-events-none overflow-visible" width="292" height="192" viewBox="0 0 292 192">
                  <path d="M 1.5,48 L 1.5,1.5 L 135,1.5 M 155,1.5 L 290.5,1.5 L 290.5,190.5 L 29.5,190.5 L 1.5,162.5 L 1.5,112 M 1.5,96 L 1.5,64" fill="none" stroke="black" strokeWidth="1" />
                </svg>
                <p className="absolute inset-0 z-10 px-4 py-4 text-[11px] font-mono font-bold leading-[1.02] text-black flex items-center">
                  Hi! I'm Aarush Lenka, a final-year ECE undergraduate at VIT Vellore specializing in microcontroller firmware and sensor fusion. Parallel to engineering, I serve on the Advisory Board for ISTE VIT, providing strategic oversight to the creative team following my tenure leading the motion graphics division. I specialize in post-production, dynamic asset creation, and visual storytelling.
                </p>
              </div>
              <div className="flex justify-end gap-2 text-[9px] font-mono uppercase tracking-widest mt-4">
                <a href="https://in.linkedin.com/in/aarush-lenka-11235813fb" target="_blank" rel="noopener noreferrer" className="border border-white px-2 py-0.5 rounded-full text-white hover:bg-white hover:text-black transition-colors">LINKEDIN</a>
                <a href="https://github.com/AarushLenka" target="_blank" rel="noopener noreferrer" className="border border-white px-2 py-0.5 rounded-full text-white hover:bg-white hover:text-black transition-colors">GITHUB</a>
              </div>
            </div>

          </div>
        </div>

        <div id="about-section" className="relative w-full overflow-hidden z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
          <div className="relative w-full h-full z-10 pointer-events-none">

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

            <div className="absolute top-[20px] left-[2px] w-[540px] h-[620px] bg-transparent overflow-hidden z-20 pointer-events-auto">
              <ESP32Canvas />
            </div>

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
                  <ZigzagPattern squareSize={10} gap={10} color="black" />
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

            <div className="absolute top-[15%] left-[39%] z-20 w-[750px] select-none pointer-events-auto">
              <img src="/robot.png" alt="Robot" className="absolute right-[-17%] bottom-[24%] h-[301px] w-auto object-contain pointer-events-none" />

              <p className="text-white text-[52px] font-serif leading-[1.12] tracking-tight whitespace-nowrap">
                I craft{' '}
                <svg className="inline-block align-middle mx-0 animate-splat-pulse" width="48" height="48" viewBox="0 0 100 100" fill="#10e7d9b0">
                  <polygon points="50.00,0.00 59.06,16.19 75.00,6.70 74.75,25.25 93.30,25.00 83.81,40.94 100.00,50.00 83.81,59.06 93.30,75.00 74.75,74.75 75.00,93.30 59.06,83.81 50.00,100.00 40.94,83.81 25.00,93.30 25.25,74.75 6.70,75.00 16.19,59.06 0.00,50.00 16.19,40.94 6.70,25.00 25.25,25.25 25.00,6.70 40.94,16.19" />
                </svg>
                {' '}interactive ecosystems that<br />
                redefine how we experience the<br />
                digital world.
                <img src="/jojo_arrow.png" alt="Arrow" className="inline-block align-middle ml-0 h-[110px] w-auto object-contain -my-4" />
              </p>
              <p className="text-white text-[52px] font-serif leading-[1.12] tracking-tight mt-6 whitespace-nowrap">
                From generative algorithms to<br />
                bespoke hardware, my practice<br />
                <img src="/rose.png" alt="Rose" className="inline-block align-middle mx-1 h-[70px] w-auto object-contain" />
                sits at the crossroads of art and<br />
                engineering.
              </p>
            </div>

            {/* ASCII Art Video Box placed below the robot */}
            <div className="absolute top-[84%] left-[79%] w-64 z-40 pointer-events-auto shadow-2xl bg-[#e5e5e5] border border-black p-[6px] -translate-x-1/2 -translate-y-1/2">
              <button className="absolute -top-1.5 -right-1.5 w-1 h-1 bg-white border border-black flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                <svg width="6" height="6" viewBox="0 0 14 14" fill="none" stroke="black" strokeWidth="2">
                  <path d="M1 1L13 13M1 13L13 1" />
                </svg>
              </button>
              <video
                src="/asciiart.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
            </div>

          </div>
        </div>

        <div id="projects-section" className="relative w-full overflow-hidden z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
          <div className="relative w-full h-full z-10 pointer-events-none">

            <div className="absolute top-[8%] left-0 w-full flex flex-col items-center justify-center pointer-events-auto z-10">
              <h2 className="text-[72px] leading-none tracking-tight text-black" style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", "DotGothic16", sans-serif' }}>
                Some Projects I have worked on
              </h2>
            </div>
            {/* Background Technical Lineart */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20 text-white mix-blend-screen">
              <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
                <defs>
                  <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4">
                    <circle cx="5" cy="5" r="5" fill="currentColor" stroke="none" />
                  </marker>
                </defs>

                {/* Base Grid */}
                <line x1="0" y1="450" x2="1440" y2="450" strokeDasharray="4 8" />
                <line x1="720" y1="0" x2="720" y2="900" strokeDasharray="4 8" />
                <line x1="0" y1="225" x2="1440" y2="225" strokeDasharray="1 10" opacity="0.5" />
                <line x1="0" y1="675" x2="1440" y2="675" strokeDasharray="1 10" opacity="0.5" />
                <line x1="360" y1="0" x2="360" y2="900" strokeDasharray="1 10" opacity="0.5" />
                <line x1="1080" y1="0" x2="1080" y2="900" strokeDasharray="1 10" opacity="0.5" />

                {/* Central Motif */}
                <g transform="translate(720, 450)">
                  <circle r="110" strokeDasharray="2 6" />
                  <circle r="150" />
                  <circle r="210" strokeDasharray="1 4" opacity="0.5" />
                  <circle r="270" strokeDasharray="10 20" />
                  <circle r="360" />

                  {/* Angle Ticks */}
                  {Array.from({ length: 36 }).map((_, i) => {
                    const angle = i * 10;
                    return (
                      <g key={i} transform={`rotate(${angle})`}>
                        <line x1="0" y1="140" x2="0" y2="160" />
                        {i % 3 === 0 && (
                          <text x="0" y="130" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.7">
                            {angle}°
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* Target Corners */}
                <path d="M 100 100 L 150 100 M 100 100 L 100 150" strokeWidth="2" />
                <path d="M 1340 100 L 1290 100 M 1340 100 L 1340 150" strokeWidth="2" />
                <path d="M 100 800 L 150 800 M 100 800 L 100 750" strokeWidth="2" />
                <path d="M 1340 800 L 1290 800 M 1340 800 L 1340 750" strokeWidth="2" />

                <circle cx="100" cy="100" r="4" fill="currentColor" stroke="none" />
                <circle cx="1340" cy="100" r="4" fill="currentColor" stroke="none" />
                <circle cx="100" cy="800" r="4" fill="currentColor" stroke="none" />
                <circle cx="1340" cy="800" r="4" fill="currentColor" stroke="none" />

                {/* Decorative Tech Lines */}
                <path d="M 200 450 L 300 350 L 500 350" markerStart="url(#dot)" strokeDasharray="5 5" />
                <path d="M 1240 450 L 1140 550 L 940 550" markerStart="url(#dot)" strokeDasharray="5 5" />

                <text x="310" y="340" fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.7">SECTOR-7G</text>
                <text x="1130" y="540" textAnchor="end" fontSize="12" fontFamily="monospace" fill="currentColor" stroke="none" opacity="0.7">SYS.RADIAL</text>
              </svg>
            </div>
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="absolute pointer-events-auto group cursor-pointer"
                style={{ top: proj.top, left: proj.left, width: proj.w, height: proj.h }}
                onClick={() => setSelectedProject(proj)}
              >
                <div className={`absolute font-mono text-[12px] font-bold text-black ${proj.numPos}`}>
                  {proj.id}.
                </div>
                <div className={`w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 ${proj.bgTransparent ? 'bg-transparent group-hover:bg-transparent' : 'bg-[#1e1e1e] group-hover:bg-[#111]'}`}>
                  {proj.model ? (
                    <div className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto">
                      <React.Suspense fallback={<div className="w-full h-full bg-[#1e1e1e] animate-pulse" />}>
                        <ModelCanvas url={proj.model} />
                      </React.Suspense>
                    </div>
                  ) : proj.video ? (
                    <video
                      src={proj.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`w-full h-full opacity-90 ${proj.objectFit ? `object-${proj.objectFit}` : 'object-cover'}`}
                    />
                  ) : (
                    <img
                      src={proj.image || `https://placehold.co/400x400/222/aaa?text=Project+${proj.id}`}
                      alt={proj.title}
                      className={`w-full h-full opacity-90 ${proj.objectFit ? `object-${proj.objectFit}` : 'object-cover'}`}
                    />
                  )}
                </div>
              </div>
            ))}

            


            <div className="absolute top-[41%] left-[82%] pointer-events-auto z-30" style={{ width: '220px', height: '120px' }}>

              <div className="absolute top-[100px] right-[190px] w-60 z-40 pointer-events-auto shadow-2xl bg-white border border-black p-[6px]">
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

              <div className="absolute inset-0 bg-[#e5e5e5]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))'
                }}>
                <svg className="absolute -inset-px pointer-events-none overflow-visible" width="222" height="122" viewBox="0 0 222 122">
                  <path d="M 1.5,40 L 1.5,1.5 L 200,1.5 M 221,25 L 221,106 L 204.5,121 L 100,121 M 70,121 L 16.5,121 L 1.5,105.5 L 1.5,75" fill="none" stroke="black" strokeWidth="1" />
                </svg>
                <div className="relative z-10 px-3 py-2">
                  <div className="flex justify-between items-start">
                    <ZigzagPattern squareSize={10} gap={10} color="black" />
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

        <div
          id="creative-work-section"
          ref={creativeSectionRef}
          onMouseMove={handleCreativeMouseMove}
          onMouseLeave={() => setCreativeMousePos({ x: 0, y: 0 })}
          className="relative w-full overflow-hidden z-[2] -mt-[2px]"
          style={{ height: 'var(--logical-vh)', perspective: '1500px' }}
        >
          <div className="relative w-full h-full z-10 pointer-events-none flex flex-col items-center justify-center">

            {/* Background Technical Lineart: Fibonacci Spiral */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.25] text-white mix-blend-screen">
              <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
                <g transform="translate(12, 220)">
                  {/* Fibonacci Squares */}
                  <g strokeDasharray="2 4" opacity="1.4">
                    <rect x="0" y="0" width="610" height="610" />
                    <rect x="610" y="0" width="377" height="377" />
                    <rect x="754" y="377" width="233" height="233" />
                    <rect x="610" y="466" width="144" height="144" />
                    <rect x="610" y="377" width="89" height="89" />
                    <rect x="699" y="377" width="55" height="55" />
                    <rect x="720" y="432" width="34" height="34" />
                    <rect x="699" y="445" width="21" height="21" />
                    <rect x="699" y="432" width="13" height="13" />
                  </g>

                  {/* Golden Spiral */}
                  <path d="
                    M 0 610 
                    A 610 610 0 0 1 610 0
                    A 377 377 0 0 1 987 377
                    A 233 233 0 0 1 754 610
                    A 144 144 0 0 1 610 466
                    A 89 89 0 0 1 699 377
                    A 55 55 0 0 1 754 432
                    A 34 34 0 0 1 720 466
                    A 21 21 0 0 1 699 445
                    A 13 13 0 0 1 712 432
                  " strokeWidth="2" />

                  {/* Technical Lines & Text */}
                  <line x1="0" y1="0" x2="987" y2="610" strokeDasharray="1 6" opacity="1.3" />
                  <line x1="0" y1="610" x2="987" y2="0" strokeDasharray="1 6" opacity="1.3" />

                  <circle cx="610" cy="610" r="4" fill="currentColor" />
                  <circle cx="610" cy="377" r="4" fill="currentColor" />
                  <circle cx="754" cy="377" r="4" fill="currentColor" />
                  <circle cx="754" cy="466" r="4" fill="currentColor" />
                  <circle cx="699" cy="466" r="4" fill="currentColor" />
                  <circle cx="699" cy="432" r="4" fill="currentColor" />

                  {/* Dimensions */}
                  <g fontFamily="monospace" fontSize="10" opacity="0.7">
                    <text x="305" y="600" textAnchor="middle">R=610</text>
                    <text x="798" y="10" textAnchor="middle">R=377</text>
                    <text x="870" y="493" textAnchor="middle">R=233</text>
                    <text x="590" y="538" textAnchor="end">R=144</text>
                    <text x="987" y="-10" textAnchor="end">PHI = 1.61803398875</text>
                    <text x="0" y="-10" textAnchor="start">FIBONACCI.SEQUENCE</text>
                  </g>

                  {/* Decorative Crosses at main junctions */}
                  <path d="M 610 0 L 610 10 M 605 5 L 615 5" />
                  <path d="M 987 377 L 977 377 M 982 372 L 982 382" />
                  <path d="M 754 610 L 754 600 M 749 605 L 759 605" />

                </g>

                {/* Vertical AM Wave to the right */}
                <g transform="translate(1320, 220)">
                  {/* Grid / Axis */}
                  <line x1="0" y1="0" x2="0" y2="610" strokeDasharray="4 4" opacity="0.8" />

                  {/* Ticks */}
                  {Array.from({ length: 13 }).map((_, i) => {
                    const y = i * 50;
                    return (
                      <g key={i}>
                        <line x1="-8" y1={y} x2="8" y2={y} opacity="0.6" />
                        {i % 2 === 0 && (
                          <text x="12" y={y + 3} fontFamily="monospace" fontSize="8" fill="currentColor" stroke="none" opacity="0.6">
                            {(y / 100).toFixed(1)}V
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Envelope lines */}
                  <path d={AM_PATHS.envLeft} strokeDasharray="2 4" opacity="0.9" />
                  <path d={AM_PATHS.envRight} strokeDasharray="2 4" opacity="0.9" />

                  {/* Modulated Wave */}
                  <path d={AM_PATHS.wave} strokeWidth="1.2" />

                  {/* Accents / Text */}
                  <g fontFamily="monospace" fontSize="9" opacity="0.7">
                    <text x="-95" y="0" textAnchor="end">s(t) = Ac[1 + m*cos(2πfmt)]cos(2πfct)</text>
                    <text x="-95" y="15" textAnchor="end">m = 0.57 (MOD.INDEX)</text>
                    <text x="-95" y="30" textAnchor="end">fc = 200 kHz</text>
                    <text x="-95" y="45" textAnchor="end">fm = 8.5 kHz</text>

                    <text x="-200" y="570" textAnchor="start">SIGNAL.AM.MODULATED</text>
                    <text x="-200" y="585" textAnchor="start">ARCTIC MONKEYS</text>
                  </g>

                  {/* Crosshairs at bounds */}
                  <path d="M -15 0 L 15 0 M 0 -15 L 0 15" opacity="0.5" />
                  <path d="M -15 610 L 15 610 M 0 595 L 0 625" opacity="0.5" />
                </g>
              </svg>
            </div>

            <CreativeRibbon mousePos={creativeMousePos} />

            <div className="absolute top-[8%] left-0 w-full flex flex-col items-center justify-center pointer-events-auto z-10">
              <h2 className="text-[72px] leading-none tracking-tight text-black" style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", "DotGothic16", sans-serif' }}>
                Ideas in Motion
              </h2>
            </div>

            <CreativeWorkGallery mousePos={creativeMousePos} />

          </div>
        </div>

        <div id="city-section" className="relative w-full overflow-hidden z-[2] -mt-[2px]" style={{ height: 'var(--logical-vh)' }}>
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
            
            {/* Footer at the bottom */}
            <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-0 pointer-events-auto">
              <a href="https://github.com/AarushLenka/Monozukuri" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-white font-mono text-[12px] tracking-widest uppercase transition-colors underline underline-offset-4">
                [ CHECK OUT THIS PROJECT ON GITHUB ]
              </a>
              
              <div className="flex flex-col items-center gap-2 mt-3">
                <span className="text-white/60 font-mono text-[15px] tracking-widest uppercase">REACH OUT TO ME</span>
                <div className="flex justify-center gap-2 text-[9px] font-mono uppercase tracking-widest">
                  <a href="https://in.linkedin.com/in/aarush-lenka-11235813fb" target="_blank" rel="noopener noreferrer" className="border border-white px-2 py-0.5 rounded-full text-white hover:bg-white hover:text-black transition-colors">LINKEDIN</a>
                  <a href="https://github.com/AarushLenka" target="_blank" rel="noopener noreferrer" className="border border-white px-2 py-0.5 rounded-full text-white hover:bg-white hover:text-black transition-colors">GITHUB</a>
                  <a href="mailto:lenkaaarush@gmail.com" className="border border-white px-2 py-0.5 rounded-full text-white hover:bg-white hover:text-black transition-colors">EMAIL</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <AnimatePresence>
      {selectedProject && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto cursor-default"
          onClick={() => setSelectedProject(null)}
        >
          {/* Terminal Window */}
          <motion.div 
            initial={{ scale: 0.7, opacity: 0, y: 80 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 80 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220, mass: 1 }}
            className="w-[85vw] h-[75vh] max-w-5xl rounded-lg bg-[#111111]/80 backdrop-blur-md border border-white/20 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content Area */}
            <div className="p-6 flex-1 overflow-y-auto font-mono text-sm leading-normal selection:bg-white/20">
              <div className="flex text-white/90">
                <span>~/Monozukuri&gt;</span>
              </div>
              <div className="mt-0 text-white/90">
                <span className="text-white/50">└─&gt;</span> cat project.txt
              </div>
              
              <div className="mt-6 flex flex-col md:flex-row gap-8">
                {/* ASCII Art Placeholder */}
                <div className="w-full md:w-80 shrink-0 border border-dashed border-white/20 bg-white/5 rounded-md p-4 flex items-center justify-center">
                  <pre className="text-white/30 text-[10px] leading-tight font-mono text-center">
{`    ___    
  //   \\\\  
 //     \\\\ 
|| ASCII ||
 \\\\     // 
  \\\\___//  `}
                  </pre>
                </div>

                {/* Project Details */}
                <div className="space-y-2 flex-1">
                  <div>
                    <span className="text-white/50">PROJECT:</span> <span className="text-white/90">{selectedProject.title}</span>
                  </div>
                  <div>
                    <span className="text-white/50">ROLE:</span> <span className="text-white/90">{selectedProject.desc}</span>
                  </div>
                  <div className="pt-0">
                    <span className="text-white/50">DESCRIPTION:</span>
                    <div className="mt-0 text-white/70 leading-normal">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <SpeedInsights />
    </>
  );
}
