import React, { useEffect, useRef, useState } from 'react';

export default function CursorTooltip() {
  const tooltipRef = useRef(null);
  const [tooltipData, setTooltipData] = useState({ active: false, text: '' });
  const hoveredElRef = useRef(null);

  useEffect(() => {
    let active = false;
    let lastX = -100;
    let lastY = -100;

    const activate = (el, text) => {
      active = true;
      hoveredElRef.current = el;
      setTooltipData({ active: true, text });
    };

    const deactivate = () => {
      if (active) {
        active = false;
        hoveredElRef.current = null;
        setTooltipData(prev => ({ ...prev, active: false }));
      }
    };

    const onMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (tooltipRef.current) {
        // Offset slightly above and right of cursor
        tooltipRef.current.style.transform = `translate3d(calc(${e.clientX}px + 14px), calc(${e.clientY}px - 100% - 14px), 0)`;
      }

      // e.target respects pointer-events and CSS transforms reliably
      const target = e.target.closest ? e.target.closest('[data-tooltip]') : null;
      if (target) {
        const text = target.getAttribute('data-tooltip');
        if (text) {
          activate(target, text);
        }
      } else {
        deactivate();
      }
    };

    // Poll: if scrolling moves the hovered element away from the cursor
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
      ref={tooltipRef}
      className={`hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-200 will-change-transform ${
        tooltipData.active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-white border border-black px-2.5 py-1.5 text-black text-[10px] uppercase font-mono font-bold tracking-widest leading-none shadow-md whitespace-nowrap">
        {tooltipData.text}
      </div>
    </div>
  );
}
