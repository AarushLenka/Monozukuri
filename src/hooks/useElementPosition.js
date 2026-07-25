import { useState, useEffect } from 'react';

export function useElementPosition(elementId, startAlign = 'left', gap = 15) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!elementId) return;
    const el = document.getElementById(elementId);
    if (!el) return;

    let animationFrameId = 0;
    let lastPos = null;

    const updatePos = () => {
      animationFrameId = 0;
      const wrapper = el.closest('.origin-top-left');
      if (!wrapper) return;

      const rect = el.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();
      
      // Use the actual rendered width of the wrapper to calculate the true scale ratio
      const scale = wrapperRect.width / 1440;

      const newPos = {
        x: (startAlign === 'right' ? rect.right - wrapperRect.left : rect.left - wrapperRect.left) / scale,
        y: (rect.bottom - wrapperRect.top) / scale + gap,
        left: (rect.left - wrapperRect.left) / scale,
        right: (rect.right - wrapperRect.left) / scale,
      };

      if (
        !lastPos ||
        Math.abs(lastPos.x - newPos.x) > 0.5 ||
        Math.abs(lastPos.y - newPos.y) > 0.5
      ) {
        lastPos = newPos;
        setPosition(newPos);
      }

    };

    const scheduleUpdate = () => {
      if (!animationFrameId) animationFrameId = requestAnimationFrame(updatePos);
    };

    const wrapper = el.closest('.origin-top-left');
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(el);
    if (wrapper) resizeObserver.observe(wrapper);
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [elementId, startAlign, gap]);

  return position;
}
