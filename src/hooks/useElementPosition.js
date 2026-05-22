import { useState, useEffect } from 'react';

export function useElementPosition(elementId, startAlign = 'left', gap = 15) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!elementId) return;

    const el = document.getElementById(elementId);
    if (!el) return;

    const updatePos = () => {
      const rect = el.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const scale = window.innerWidth / 1440;

      setPosition({
        x: ((startAlign === 'right' ? rect.right : rect.left) + scrollX) / scale,
        y: (rect.bottom + scrollY) / scale + gap,
        left: (rect.left + scrollX) / scale,
        right: (rect.right + scrollX) / scale,
      });
    };

    const observer = new ResizeObserver(updatePos);
    observer.observe(el);
    
    // Also observe the document body for global layout shifts (like font loads)
    observer.observe(document.body);

    updatePos();

    return () => {
      observer.disconnect();
    };
  }, [elementId, startAlign, gap]);

  return position;
}
