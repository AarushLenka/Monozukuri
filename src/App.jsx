import React, { useEffect, useState } from 'react';


export default function App() {
  const [time, setTime] = useState("00:43 AM");

  useEffect(() => {
    // Simple clock update for effect
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#4a4a4a] text-[#111] overflow-hidden font-body selection:bg-black selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-600/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Grid Lines */}
      {/* Vertical Lines */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/20"></div>
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20"></div>
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/20"></div>

      {/* Horizontal Lines */}
      <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-white/20"></div>
      <div className="absolute left-0 right-0 top-[66.66%] h-[1px] bg-white/20"></div>

      {/* Grid Intersections & Markers */}
      <div className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white flex items-center justify-center text-[10px] leading-none text-black font-bold">+</div>
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-black bg-transparent"></div>
      <div className="absolute left-3/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white flex items-center justify-center text-[10px] leading-none text-black font-bold">+</div>
      
      <div className="absolute left-1/4 top-[66.66%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white flex items-center justify-center text-[10px] leading-none text-black font-bold">+</div>
      <div className="absolute left-1/2 top-[66.66%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-black bg-transparent"></div>
      <div className="absolute left-3/4 top-[66.66%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white flex items-center justify-center text-[10px] leading-none text-black font-bold">+</div>

      {/* Connecting Path Vectors (SVG overlays to match the design) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-black/50" style={{ strokeWidth: '1px', fill: 'none' }}>
        {/* Left side path */}
        <path d="M 20vw 38vh L 30vw 38vh L 35vw 45vh L 37.5vw 45vh" />
        <rect x="37.5vw" y="44.5vh" width="6" height="6" fill="black" />
        {/* Top right path */}
        <path d="M 52vw 31vh L 52vw 20vh L 60vw 20vh" />
        {/* Right side path */}
        <path d="M 64.5vw 52vh L 70vw 52vh L 76vw 42vh L 78vw 42vh" />
        <rect x="64.2vw" y="51.5vh" width="6" height="6" fill="black" />
      </svg>

      {/* Main Content Overlay */}
      <div className="relative w-full h-full z-10 pointer-events-none">
        {/* Header */}
        <header className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-auto">
          <div className="w-4 h-4 bg-white/80 rounded-sm"></div>
          <div className="text-sm font-medium tracking-widest absolute left-12 top-0">SUTÉRA</div>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-white border border-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
            Change Reality
          </div>
          <div className="text-[10px] uppercase font-mono tracking-widest text-right leading-tight">
            LOCAL TIME<br />ZUR {time}
          </div>
        </header>

        {/* Big Title */}
        <div className="absolute top-[18%] left-[4%]">
          <h1 className="text-[7vw] leading-[0.85] font-normal tracking-tight text-black">
            REALITY,<br />BY DESIGN.
          </h1>
        </div>

        {/* Subtext 1 */}
        <div className="absolute top-[38%] left-[16%] w-48 text-[9px] uppercase font-mono tracking-widest leading-relaxed">
          FROM DEEP ROOTS, CREATIVITY DRAWS ITS STRENGTH
        </div>

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
          <div className="relative w-[500px] h-[350px] flex items-center justify-center">
            {/* Outline Glow */}
            <div className="absolute inset-0 bg-white/20 blur-[20px] rounded-full pointer-events-none"></div>
            {/* The Island Placeholder Image */}
            <img 
              src="https://images.unsplash.com/photo-1550053982-f5979bc8405d?auto=format&fit=crop&q=80&w=600" 
              alt="Floating Island" 
              className="relative w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
              style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}
            />
            {/* UI overlay on island */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-12 h-12 border border-white/40 bg-white/10 backdrop-blur-md"></div>
              <div className="w-12 h-12 border border-white/40 bg-white/10 backdrop-blur-md"></div>
            </div>
            {/* Small red flower marker */}
            <div className="absolute top-[20%] left-[52%] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
            <div className="absolute top-[18%] left-[52%] border border-black bg-white w-1.5 h-1.5"></div>
          </div>
        </div>

        {/* Subtext 2 (Foundation) */}
        <div className="absolute bottom-[25%] left-[62%] w-32 text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black">
          FOUNDATION DESIGNED FOR GROWTH
        </div>

        {/* Tag Card (SUTERA /25) */}
        <div className="absolute top-[32%] right-[8%] bg-[#e5e5e5] border border-black p-4 w-64 pointer-events-auto" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
          <div className="flex justify-between items-start font-bold border-b border-black pb-2 mb-3">
            <span className="tracking-widest">SUTÉRA</span>
            <span className="text-[10px]">/25</span>
          </div>
          <div className="text-[10px] font-mono tracking-widest leading-relaxed">
            SU (UNDERNEATH)<br />
            + TERA (EARTH)<br />
            <br />
            → UNDERNEATH THE EARTH
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
