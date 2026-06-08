import { useState, useEffect } from 'react';

export function useElementPosition(elementId, startAlign = 'left', gap = 15) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!elementId) return;
    const el = document.getElementById(elementId);
    if (!el) return;

    let animationFrameId;
    let lastPos = null;

    const updatePos = () => {
      const wrapper = el.closest('.origin-top-left');
      if (!wrapper) {
        animationFrameId = requestAnimationFrame(updatePos);
        return;
      }

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

      animationFrameId = requestAnimationFrame(updatePos);
    };

    animationFrameId = requestAnimationFrame(updatePos);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [elementId, startAlign, gap]);

  return position;
}
