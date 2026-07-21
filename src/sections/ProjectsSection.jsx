import React from 'react';
import ModelCanvas from '../components/ModelCanvas';
import DecorativeCard from '../components/DecorativeCard';
import ZigzagPattern from '../components/ZigzagPattern';
import { PROJECTS_DATA } from '../constants/projects';

/**
 * Projects section — third full-height screen.
 *
 * @param {function} onProjectSelect  Callback invoked with the project object when a card is clicked.
 * @param {boolean}  isMobile         True when viewport ≤ 768px.
 */
export default function ProjectsSection({ onProjectSelect, isMobile }) {

  /* ── Mobile Layout ── */
  if (isMobile) {
    return (
      <div id="projects-section" className="relative w-full z-[2] px-4 pt-0 pb-8">
        {/* Title */}
        <div className="w-full flex flex-col items-center mb-6">
          <h2
            className="text-[28px] leading-[1.1] tracking-tight text-black text-center"
            style={{ fontFamily: '"ndot-57", "Ndot-57", "Ndot57", "DotGothic16", sans-serif' }}
          >
            Some Projects I have worked on
          </h2>
        </div>

        {/* 2-column project grid */}
        <div className="mb-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
          {PROJECTS_DATA.map((proj) => (
            <div
              key={proj.id}
              data-cursor="click-here"
              className="relative group cursor-pointer flex items-center"
              onClick={() => onProjectSelect(proj)}
            >
              {/* Project number */}
              <div className="font-mono text-[11px] font-bold text-black mr-2 shrink-0">
                {proj.id}.
              </div>
              {/* Card */}
              <div className={`flex-1 aspect-square flex items-center justify-center overflow-hidden transition-transform duration-500 active:scale-95 ${proj.bgTransparent ? 'bg-transparent' : 'bg-[#1e1e1e]'}`}>
                {proj.model ? (
                  <div className="w-full h-full pointer-events-none">
                    <React.Suspense fallback={<div className="w-full h-full bg-[#1e1e1e] animate-pulse" />}>
                      <ModelCanvas url={proj.model} rotation={proj.modelRotation || [0, 0, 0]} scale={proj.modelScale || 1} wireframe={proj.wireframe} wireframeColor={proj.wireframeColor} isMobile={isMobile} />
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
        </div>

        {/* Project index footer */}
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-y-1 w-full">
            {PROJECTS_DATA.map((proj) => (
              <div key={`footer-m-${proj.id}`} className="font-mono text-[8px] font-bold uppercase tracking-tighter text-white/80 flex items-center">
                <span>{proj.id}. {proj.title}</span>
                <span className="text-white/50 mx-1">-</span>
                <span className="text-white/60">{proj.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop Layout (untouched) ── */
  return (
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

        {/* Project cards */}
        {PROJECTS_DATA.map((proj) => (
          <div
            key={proj.id}
            data-cursor="click-here"
            className="absolute pointer-events-auto group cursor-pointer"
            style={{ top: proj.top, left: proj.left, width: proj.w, height: proj.h }}
            onClick={() => onProjectSelect(proj)}
          >
            <div className={`absolute font-mono text-[12px] font-bold text-black ${proj.numPos}`}>
              {proj.id}.
            </div>
            <div className={`w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 ${proj.bgTransparent ? 'bg-transparent group-hover:bg-transparent' : 'bg-[#1e1e1e] group-hover:bg-[#111]'}`}>
              {proj.model ? (
                <div className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto">
                  <React.Suspense fallback={<div className="w-full h-full bg-[#1e1e1e] animate-pulse" />}>
                    <ModelCanvas url={proj.model} rotation={proj.modelRotation || [0, 0, 0]} scale={proj.modelScale || 1} wireframe={proj.wireframe} wireframeColor={proj.wireframeColor} />
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

        {/* Side info card + pilot image */}
        <div className="absolute top-[41%] left-[82%] pointer-events-auto z-30" style={{ width: '220px', height: '120px' }}>
          <div className="absolute top-[100px] right-[190px] w-60 z-40 pointer-events-auto shadow-2xl bg-white border border-black p-[6px]">
            <button className="absolute -top-1.5 -right-1.5 w-1 h-1 bg-white border border-black flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
              <svg width="6" height="6" viewBox="0 0 14 14" fill="none" stroke="black" strokeWidth="2">
                <path d="M1 1L13 13M1 13L13 1" />
              </svg>
            </button>
            <img src="/pilot.png" alt="Pilot" className="w-full h-auto block" />
          </div>

          <DecorativeCard className="absolute inset-0">
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest leading-tight text-black text-right flex flex-col items-end">
              <p>I like building stuff,</p>
              <p>sometimes even though I</p>
              <div className="mt-[3px] flex items-center justify-end gap-x-1.5">
                <span>don't know</span>
                <span className="border border-black rounded-[6px] px-1.5 py-[1px] leading-none mt-[1px]">how to</span>
              </div>
            </div>
          </DecorativeCard>
        </div>

        {/* Project index footer */}
        <div className="absolute bottom-[8%] left-0 w-full flex justify-center pointer-events-auto">
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
  );
}
