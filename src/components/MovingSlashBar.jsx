import React from 'react';

export default function MovingSlashBar({ width, animDur, animDelay }) {
  const slashGap = 6;
  const slashCount = Math.ceil((width + 24) / slashGap);

  return (
    <div className="relative h-[10px] overflow-hidden" style={{ width }}>
      <svg
        className="thread-hatch absolute inset-y-0 -left-[10px] w-[calc(100%+20px)]"
        viewBox={`0 0 ${width + 20} 10`}
        preserveAspectRatio="none"
        style={{ animationDuration: animDur, animationDelay: animDelay }}
      >
        {Array.from({ length: slashCount }).map((_, index) => {
          const x = index * slashGap + 1;
          return (
            <line
              key={index}
              x1={x}
              y1="9"
              x2={x + 5}
              y2="1"
              stroke="#101010"
              strokeWidth="2.1"
              strokeLinecap="square"
            />
          );
        })}
      </svg>
    </div>
  );
}
