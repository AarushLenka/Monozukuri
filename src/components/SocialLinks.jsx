import React from 'react';

/**
 * Pill-style social link buttons shared by the Hero bio card and the City footer.
 *
 * @param {string}  className   Extra classes on the wrapping flex div.
 * @param {boolean} showEmail   Whether to render the EMAIL link (default false).
 */
export default function SocialLinks({ className = '', showEmail = false }) {
  const linkClass =
    'border border-white px-2 py-0.5 rounded-full text-white hover:bg-white hover:text-black transition-colors';

  return (
    <div className={`flex gap-2 text-[9px] font-mono uppercase tracking-widest ${className}`}>
      <a
        href="https://in.linkedin.com/in/aarush-lenka-11235813fb"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        LINKEDIN
      </a>
      <a
        href="https://github.com/AarushLenka"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        GITHUB
      </a>
      {showEmail && (
        <a href="mailto:lenkaaarush@gmail.com" className={linkClass}>
          EMAIL
        </a>
      )}
    </div>
  );
}
