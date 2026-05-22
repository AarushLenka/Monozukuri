import { useState, useEffect } from 'react';

export function useElementPosition(elementId, startAlign = 'left', gap = 15) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!elementId) return;

    const updatePos = () => {
      const el = document.getElementById(elementId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      setPosition({
        x: (startAlign === 'right' ? rect.right : rect.left) + scrollX,
        y: rect.bottom + gap + scrollY,
        left: rect.left + scrollX,
        right: rect.right + scrollX,
      });
    };

    setTimeout(updatePos, 100);
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos);

    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos);
    };
  }, [elementId, startAlign, gap]);

  return position;
}
