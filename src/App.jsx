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
        <div id="text-deep-roots" className="absolute top-[41%] left-[16%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
          FROM DEEP ROOTS,<br/>CREATIVITY DRAWS ITS<br/>STRENGTH
        </div>

        {/* Subtext 3 (Top Right) */}
        <div id="text-imagination" className="absolute top-[21%] left-[58%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
          WHERE IMAGINATION<br/>BRANCHES INTO A<br/>LANDSCAPE OF<br/>ENDLESS DIVERSITY
        </div>
        
        {/* Animated Connectors */}
        <AnimatedConnector startId="text-deep-roots" gap={4} startAlign="left" pts={[
          { },
          { useStartRightX: true, useStartY: true },
          { x: 35, y: 52, jitterY: true },
          { x: 40, y: 52, jitterX: true, jitterY: true }
        ]} />
        <AnimatedConnector startId="text-imagination" gap={4} startAlign="right" pts={[
          { },
          { useStartLeftX: true, useStartY: true },
          { x: 45, y: 40, jitterY: true },
          { x: 40, y: 40, jitterX: true, jitterY: true }
        ]} />
        <AnimatedConnector startId="card-monozukuri" gap={0} pts={[
          { },
          { x: 75, useStartY: true },
          { x: 65, y: 56, jitterY: true },
          { x: 60, y: 56, jitterX: true, jitterY: true }
        ]} />
        <AnimatedConnector startId="text-foundation" gap={4} startAlign="right" pts={[
          { },
          { useStartLeftX: true, useStartY: true },
          { x: 54, y: 78, jitterY: true },
          { x: 50, y: 72, jitterX: true, jitterY: true }
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
        <div id="text-foundation" className="absolute top-[87%] left-[55%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
          FOUNDATION<br/>DESIGNED FOR<br/>GROWTH
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
            <p className="relative z-10 pt-7 px-3 text-[10px] font-mono font-bold leading-[1.02] text-black">
              I’m Aarush Lenka and I am a final year student at VIT, Vellore. On the side I give talks, workshops, and mentor, as well as writing on design and technology. This site is simply a collection of what I do and share info along the way.
            </p>
          </div>
          <div className="flex justify-end gap-2 text-[9px] font-mono uppercase tracking-widest mt-4">
            <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="border border-black px-2 py-0.5 rounded-full hover:bg-black hover:text-white transition-colors">GITHUB</a>
            
          </div>
        </div>

      </div>
    </div>
  );
}
