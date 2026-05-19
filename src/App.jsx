import React, { useEffect, useState } from 'react';
import RaspberryPiCanvas from './RaspberryPi';
import AnimatedConnector from './components/AnimatedConnector';
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
    <div className="relative w-full h-screen bg-[#4a4a4a] text-[#111] overflow-hidden font-body selection:bg-black selection:text-white">
      {/* Background Ink Swirls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Dark Red */}
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-red-700/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] mix-blend-screen"></div>
        {/* Blob 2: Gray */}
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[700px] bg-gray-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] mix-blend-screen"></div>
        {/* Blob 3: Bright Red */}
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-red-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[90px] mix-blend-screen"></div>
        {/* Blob 4: Dark Gray */}
        <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-zinc-600/40 rounded-[70%_30%_50%_50%/30%_30%_70%_70%] blur-[110px] mix-blend-screen"></div>
        {/* Blob 5: Crimson */}
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-rose-700/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-[80px] mix-blend-screen"></div>
        {/* Blob 6: Light Gray */}
        <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] bg-stone-400/20 rounded-[40%_60%_30%_70%/60%_40%_70%_30%] blur-[90px] mix-blend-screen"></div>
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Grid Lines */}
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
        <div className="absolute top-[10%] left-6 w-[360px] h-[116px] flex flex-col justify-center">
          <h1 className="text-[54px] leading-[0.85] font-normal tracking-tight text-black" style={{ fontFamily: '"Neue Haas Grotesk Text Pro 55 Roman", "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, sans-serif' }}>
            REFINEMENT<br />IS ENDLESS.
          </h1>
        </div>

        {/* Subtext 1 (Left) */}
        <div className="absolute top-[38%] left-[16%] w-48 text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
          FROM DEEP ROOTS,<br/>CREATIVITY DRAWS ITS<br/>STRENGTH
        </div>

        {/* Subtext 3 (Top Right) */}
        <div className="absolute top-[18%] left-[58%] w-48 text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
          WHERE IMAGINATION<br/>BRANCHES INTO A<br/>LANDSCAPE OF<br/>ENDLESS DIVERSITY
        </div>
        
        {/* Animated Connectors */}
        <AnimatedConnector pts={[
          { x: 16, y: 44.5 },
          { x: 26, y: 44.5 },
          { x: 32, y: 50, jitterY: true },
          { x: 35, y: 50, jitterX: true, jitterY: true }
        ]} />
        <AnimatedConnector pts={[
          { x: 68, y: 25.5 },
          { x: 58, y: 25.5 },
          { x: 45, y: 38, jitterY: true },
          { x: 40, y: 38, jitterX: true, jitterY: true }
        ]} />
        <AnimatedConnector pts={[
          { x: 82, y: 46 },
          { x: 75, y: 46 },
          { x: 65, y: 56, jitterY: true },
          { x: 60, y: 56, jitterX: true, jitterY: true }
        ]} />

        {/* Core Threads Menu */}
        <div className="absolute bottom-8 left-8 w-64 pointer-events-auto">
          <h2 className="text-[10px] uppercase font-mono font-bold tracking-widest mb-4">[ CORE THREADS OF MY WORK ]</h2>
          <div className="space-y-0 text-[10px] font-mono tracking-widest uppercase">
            <div className="flex gap-2 border-b border-black/20 pb-1 pt-2 hover:bg-white/10 cursor-pointer">
              <span className="w-6">01.</span>
              <div>
                <span className="opacity-50">(XR/MR/VR)</span> //////////<br />
                PERCEPTUAL INTERFACES
              </div>
            </div>
            <div className="flex gap-2 border-b border-black/20 pb-1 pt-2 hover:bg-white/10 cursor-pointer">
              <span className="w-6">02.</span>
              <div>
                //////////<br />
                EMBODIMENT
              </div>
            </div>
            <div className="flex gap-2 border-b border-black/20 pb-1 pt-2 hover:bg-white/10 cursor-pointer">
              <span className="w-6">03.</span>
              <div>
                //////////<br />
                IA & AI
              </div>
            </div>
            <div className="flex gap-2 border-b border-black/20 pb-1 pt-2 hover:bg-white/10 cursor-pointer">
              <span className="w-6">04.</span>
              <div>
                //////////<br />
                SYSTEM AND TOOLS
              </div>
            </div>
          </div>
        </div>

        {/* Floating Island Centerpiece */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-auto z-20">
          <div className="relative w-[600px] h-[650px] flex items-center justify-center pointer-events-auto">
            <RaspberryPiCanvas />
          </div>
        </div>

        {/* Subtext 2 (Foundation) */}
        <div className="absolute bottom-[25%] left-[62%] w-32 text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black">
          FOUNDATION DESIGNED FOR GROWTH
        </div>

        {/* Tag Card (MONOZUKURI /25) */}
        <div className="absolute top-[32%] right-[8%] bg-[#e5e5e5] border border-black p-4 w-64 pointer-events-auto" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
          <div className="flex justify-between items-start font-bold border-b border-black pb-2 mb-3">
            <span className="tracking-widest">MONOZUKURI</span>
            <span className="text-[10px]">/25</span>
          </div>
          <div className="text-[10px] font-mono tracking-widest leading-relaxed">
            // MONO (OBJECT/THING)<br />
            // ZUKURI (MAKING)<br />
            <br />
            → THE MAKING OF OBJECTS
          </div>
        </div>

        {/* Info Card (NOT A STUDIO) */}
        <div className="absolute bottom-8 right-8 bg-white border border-black p-4 w-72 pointer-events-auto" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[10px] uppercase font-mono font-bold tracking-widest">NOT A STUDIO — JUST ME</h3>
            <button className="w-3 h-3 border border-black flex items-center justify-center text-[8px]">×</button>
          </div>
          <p className="text-[10px] font-mono leading-relaxed mb-4">
            I'm Stella Mühlhaus and I currently work at Meta. On the side I give talks, workshops, and mentor, as well as writing on design and technology. This site is simply a collection of what I do and share info along the way.
          </p>
          <div className="flex gap-2 text-[9px] font-mono uppercase tracking-widest">
            <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">MEDIUM</a>
            <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">INSTAGRAM</a>
          </div>
        </div>

      </div>
    </div>
  );
}
