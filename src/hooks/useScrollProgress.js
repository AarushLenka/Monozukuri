import { useState, useEffect } from 'react';

export function useScrollProgress(elementId) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let previous = -1;

    const update = () => {
      frame = 0;
      const element = document.getElementById(elementId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distScrolled = viewportHeight - rect.top;
      const calculated = Math.min(Math.max(distScrolled / viewportHeight, 0), 1);
      if (Math.abs(calculated - previous) > 0.001) {
        previous = calculated;
        setProgress(calculated);
      }
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementId]);

  return progress;
}
