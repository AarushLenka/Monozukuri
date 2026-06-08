import React, { useState, useEffect } from 'react';
import AnimatedConnector from '../components/AnimatedConnector';
import CoreThreadsPanel from '../components/CoreThreadsPanel';
import RaspberryPiCanvas from '../RaspberryPi';
import SocialLinks from '../components/SocialLinks';
import { CONNECTOR_CONFIG } from '../config/heroConfig';

/**
 * The landing hero section (first visible screen).
 *
 * @param {boolean} isLoading  True while the Loader is still visible; passed to RaspberryPiCanvas.
 * @param {string}  time       Formatted local time string from App state.
 */
export default function HeroSection({ isLoading, time }) {
  return (
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

        <div id="text-deep-roots" className="absolute top-[37%] left-[16%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
          EXPERIMENT FIRST<br />EXPLAIN LATER
        </div>

        <div id="text-imagination" className="absolute top-[18.7%] left-[58%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
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

        <div id="text-foundation" className="absolute top-[85.7%] left-[55.5%] w-max text-[9px] uppercase font-mono tracking-widest leading-relaxed text-black z-20">
          CREATIVITY <br />WITH A SIDE<br />OF CHAOS
        </div>

        <div id="card-monozukuri"
          className="absolute top-[29.8%] right-[7.6%] bg-[#e5e5e5] pointer-events-auto"
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
          <div className="relative w-[290px] h-[190px]" data-tooltip="NICE TO MEET YOU!">
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
          <SocialLinks className="justify-end mt-4" />
        </div>

      </div>
    </div>
  );
}
