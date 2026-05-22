import React from 'react';
import { THREAD_ITEMS } from '../config/heroConfig';
import PixelField from './PixelField';
import MovingSlashBar from './MovingSlashBar';

export default function CoreThreadsPanel() {
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
