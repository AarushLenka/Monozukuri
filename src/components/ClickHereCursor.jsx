import React, { useEffect, useRef, useState } from 'react';

export default function ClickHereCursor() {
  const cursorRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const hoveredElRef = useRef(null);

  useEffect(() => {
    let active = false;
    let lastX = -100;
    let lastY = -100;

    const activate = (el) => {
      if (!active) {
        active = true;
        hoveredElRef.current = el;
        setIsActive(true);
      }
    };

    const deactivate = () => {
      if (active) {
        active = false;
        hoveredElRef.current = null;
        setIsActive(false);
      }
    };

    const onMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }

      // e.target respects pointer-events and CSS transforms reliably
      const clickable = e.target.closest ? e.target.closest('[data-cursor="click-here"]') : null;
      if (clickable) {
        activate(clickable);
      } else {
        deactivate();
      }
    };

    // Poll: if scrolling moves the hovered element away from the cursor,
    // its bounding rect will no longer contain (lastX, lastY).
    const pollInterval = setInterval(() => {
      if (!active || !hoveredElRef.current) return;
      const rect = hoveredElRef.current.getBoundingClientRect();
      if (lastX < rect.left || lastX > rect.right || lastY < rect.top || lastY > rect.bottom) {
        deactivate();
      }
    }, 80);

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-300 will-change-transform ${isActive ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="w-[70px] h-[70px] animate-[spin_4s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-black font-mono">
          <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
          <text fontSize="10.5" fontWeight="bold" fill="currentColor" letterSpacing="1.5">
            <textPath href="#circlePath" startOffset="0" textLength="251" lengthAdjust="spacingAndGlyphs">
              CLICK HERE • CLICK HERE • CLICK HERE • 
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
