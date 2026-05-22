import { useState, useEffect } from 'react';

export function useScrollProgress(elementId) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distScrolled = viewportHeight - rect.top;
      const calculated = Math.min(Math.max(distScrolled / viewportHeight, 0), 1);
      setProgress(calculated);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementId]);

  return progress;
}
