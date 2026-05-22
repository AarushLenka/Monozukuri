import React from 'react';

export default function GridMarker({ className, style }) {
  return (
    <svg
      className={`absolute -translate-x-1/2 -translate-y-1/2 overflow-visible ${className || ''}`}
      style={style}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="5" x2="10" y2="5" stroke="white" strokeWidth="1.2" />
      <line x1="5" y1="0" x2="5" y2="10" stroke="white" strokeWidth="1.2" />
      <circle cx="5" cy="5" r="2" fill="white" />
    </svg>
  );
}
