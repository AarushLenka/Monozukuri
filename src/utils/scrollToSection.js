/**
 * Smoothly scrolls the window to a section by id.
 *
 * Uses a custom rAF ease rather than `behavior: 'smooth'` so the glide is
 * guaranteed and consistent across browsers (several of them abort or skip
 * native smooth scrolling for programmatic calls).
 *
 * Sections below the hero mount lazily (DeferredSection) and their canvases
 * resize after mount, so the target's document offset can shift while we are
 * in flight. Each frame therefore re-measures the target and re-aims at it.
 *
 * Document offsets are derived from getBoundingClientRect (not offsetTop)
 * because the desktop canvas is wrapped in a `transform: scale()` container —
 * offsetTop ignores transforms, rects don't.
 *
 * @param {string} id  DOM id of the section wrapper to scroll to.
 */
export function scrollToSection(id, { maxFrames = 90 } = {}) {
  let start = window.scrollY;
  let lastTargetTop = -Infinity;
  let targetTop = start;
  let frames = 0;

  // If the user scrolls by hand, hand control straight back — never fight them.
  let cancelled = false;
  const abort = () => { cancelled = true; };
  window.addEventListener('wheel', abort, { passive: true });
  window.addEventListener('touchstart', abort, { passive: true });
  window.addEventListener('keydown', onKeydown);

  function onKeydown(e) {
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar'];
    if (scrollKeys.includes(e.key)) abort();
  }

  const cleanup = () => {
    window.removeEventListener('wheel', abort);
    window.removeEventListener('touchstart', abort);
    window.removeEventListener('keydown', onKeydown);
  };

  const step = () => {
    if (cancelled) {
      cleanup();
      return;
    }
    frames += 1;

    const el = document.getElementById(id);
    if (el) {
      targetTop = el.getBoundingClientRect().top + window.scrollY;
    }

    // Re-aim: if the target moved underneath us (lazy mount resizing), blend
    // the shift in gradually so the glide stays continuous instead of jumping.
    const shift = targetTop - lastTargetTop;
    if (Number.isFinite(shift) && Math.abs(shift) > 2) {
      window.scrollBy({ top: shift * 0.25, behavior: 'auto' });
      start += shift * 0.75; // keep the eased interpolation aligned
    }
    lastTargetTop = targetTop;

    const progress = Math.min(frames / maxFrames, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    window.scrollTo({ top: start + (targetTop - start) * eased, behavior: 'auto' });

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Land exactly on the target so we never end a few px short.
      window.scrollTo({ top: targetTop, behavior: 'auto' });
      cleanup();
    }
  };

  requestAnimationFrame(step);
}
