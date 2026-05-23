import React from 'react';

/**
 * Renders a two-row zigzag/checkerboard dot pattern.
 * Row 0: N squares with gaps between them.
 * Row 1: offset by one gap, N-1 squares.
 */
export default function ZigzagPattern({ squareSize = 10, gap = 10, color = 'black' }) {
  const cell = squareSize + gap;

  return (
    <div className="flex flex-col" style={{ gap: 0 }}>
      {/* Row 0 — 5 squares */}
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <React.Fragment key={i}>
            <div style={{ width: squareSize, height: squareSize, backgroundColor: color }} />
            {i < 4 && <div style={{ width: gap, height: squareSize }} />}
          </React.Fragment>
        ))}
      </div>
      {/* Row 1 — offset by one cell, 4 squares */}
      <div className="flex">
        <div style={{ width: cell, height: squareSize }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <React.Fragment key={i}>
            <div style={{ width: squareSize, height: squareSize, backgroundColor: color }} />
            {i < 3 && <div style={{ width: gap, height: squareSize }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
