import React from 'react';
import { THREAD_ITEMS } from '../config/heroConfig';
import PixelField from './PixelField';
import MovingSlashBar from './MovingSlashBar';

export default function CoreThreadsPanel({ isMobile }) {
  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center select-none px-4">
        <h2 className="mb-[10px] text-[10px] font-mono font-bold uppercase tracking-widest text-white text-center">
          [ CORE THREADS OF MY WORK ]
        </h2>
        <div className="flex gap-[10px] w-full max-w-[340px]">
          <div className="relative w-[56px] shrink-0 border border-black/70 bg-transparent flex flex-col">
            <div className="relative h-[40px] w-full border-b border-black/70 shrink-0">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 56 40" fill="none" preserveAspectRatio="none">
                <g transform="translate(28 20) scale(0.7)">
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
            <div className="relative flex-1 min-h-[40px]">
              <div className="absolute inset-0">
                <PixelField />
              </div>
            </div>
          </div>

          <div className="flex-1 pt-[1px] min-w-0">
            {THREAD_ITEMS.map((item, index) => (
              <div key={item.id} className="mb-[4px] last:mb-0">
                <div className="mb-[2px] flex items-center gap-[2px]">
                  <div className="bg-white px-[1px] text-[7px] font-mono font-bold uppercase tracking-widest leading-[1.05] text-black whitespace-nowrap">
                    {item.id}{item.tag ? ` ${item.tag}` : ''}
                  </div>
                  <MovingSlashBar width={Math.min(item.barWidth, 80)} animDur={item.animDur} animDelay={item.animDelay} />
                </div>
                <div className="text-[8px] font-mono font-bold uppercase tracking-widest leading-tight text-white pr-2">
                  {item.title}
                </div>
                <div
                  className={`mt-[2px] h-px bg-black/80 ${index === THREAD_ITEMS.length - 1 ? 'w-full' : 'w-full'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop Layout (untouched) ── */
  return (
    <div className="absolute bottom-8 left-8 w-max pointer-events-auto select-none">
      <h2 className="mb-[10px] text-[10px] font-mono font-bold uppercase tracking-widest text-white">
        [ CORE THREADS OF MY WORK ]
      </h2>
      <div className="flex gap-[14px]">
        <div className="relative h-[200px] w-[68px] shrink-0 border border-black/70 bg-transparent">
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
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest leading-none text-white whitespace-nowrap">
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
