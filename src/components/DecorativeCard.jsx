import React from 'react';
import ZigzagPattern from './ZigzagPattern';

/**
 * Pre-computed constant — no deps, never changes.
 * Placed at module level to avoid re-computing on every render.
 */
const SPIKY_POINTS = Array.from({ length: 32 }).map((_, i) => {
  const angle = (i * Math.PI) / 16;
  const radius = i % 2 === 0 ? 50 : 20;
  return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
}).join(' ');

/**
 * Clipped-corner info card shell used in the About and Projects sections.
 *
 * The clip-path, SVG border stroke, ZigzagPattern header, spinning spiky
 * polygon, and divider are always identical.  Pass `children` for the text
 * body below the divider.
 *
 * @param {string}    className  Classes applied to the outer wrapper.
 * @param {object}    style      Inline styles applied to the outer wrapper.
 * @param {ReactNode} children   Content rendered below the card divider.
 */
export default function DecorativeCard({ className = '', style = {}, children }) {
  return (
    <div
      className={`bg-[#e5e5e5] ${className}`}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))',
        ...style,
      }}
    >
      <svg className="absolute -inset-px pointer-events-none overflow-visible" width="222" height="122" viewBox="0 0 222 122">
        <path d="M 1.5,40 L 1.5,1.5 L 200,1.5 M 221,25 L 221,106 L 204.5,121 L 100,121 M 70,121 L 16.5,121 L 1.5,105.5 L 1.5,75" fill="none" stroke="black" strokeWidth="1" />
      </svg>
      <div className="relative z-10 px-3 py-2">
        <div className="flex justify-between items-start">
          <ZigzagPattern squareSize={10} gap={10} color="black" />
          <svg viewBox="0 0 100 100" width="20" height="20" className="animate-spiky-spin -mt-0.5">
            <polygon points={SPIKY_POINTS} fill="black" />
          </svg>
        </div>
        <div className="w-full h-[1px] bg-black/20 my-[5px]"></div>
        {children}
      </div>
    </div>
  );
}
