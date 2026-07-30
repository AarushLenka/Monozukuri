import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is within (or near) the viewport.
 *
 * Used to park each Canvas's render loop while it is scrolled away — three
 * always-on WebGL loops rendering offscreen geometry pegged the main thread
 * and made the first modal click take seconds to register.
 *
 * Measures getBoundingClientRect rather than using an IntersectionObserver on
 * purpose: the desktop page lives inside an `overflow:hidden` wrapper, and
 * IntersectionObserver factors in ancestor clipping, so a not-yet-measured
 * wrapper reports everything below the fold as invisible. Rect math ignores
 * ancestor clipping and cannot get stranded that way.
 *
 * @param {object}  ref     Ref to the element to track.
 * @param {number}  margin  Extra px above/below the viewport that still counts.
 */
export function useInViewport(ref, margin = 200) {
  const [inViewport, setInViewport] = useState(true);
  const current = useRef(true);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.bottom > -margin && rect.top < window.innerHeight + margin;
      if (visible !== current.current) {
        current.current = visible;
        setInViewport(visible);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref, margin]);

  return inViewport;
}
