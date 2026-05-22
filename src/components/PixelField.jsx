import React, { useState, useEffect } from 'react';
import { PIXEL_CONFIG } from '../config/heroConfig';

const { WIDTH, HEIGHT, COLOR, UPDATE_INTERVAL, LOWER_BIAS, DECAY_LOWER, DECAY_UPPER, SPAWN_LOWER, SPAWN_UPPER } = PIXEL_CONFIG;

export default function PixelField() {
  const [pixels, setPixels] = useState(() =>
    Array.from({ length: WIDTH * HEIGHT }, (_, index) => {
      const row = Math.floor(index / WIDTH);
      return row > HEIGHT * LOWER_BIAS ? COLOR : null;
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPixels((current) =>
        current.map((pixel, index) => {
          const row = Math.floor(index / WIDTH);
          const lowerBias = row > HEIGHT * LOWER_BIAS;
          const roll = Math.random();
          if (pixel && roll > (lowerBias ? DECAY_LOWER : DECAY_UPPER)) return null;
          if (!pixel && roll > (lowerBias ? SPAWN_LOWER : SPAWN_UPPER)) return COLOR;
          return pixel;
        })
      );
    }, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="grid h-full w-full bg-transparent"
      style={{
        gridTemplateColumns: `repeat(${WIDTH}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${HEIGHT}, minmax(0, 1fr))`,
      }}
    >
      {pixels.map((pixel, index) => (
        <div
          key={index}
          className="h-full w-full"
          style={{ backgroundColor: pixel || 'transparent' }}
        />
      ))}
    </div>
  );
}
