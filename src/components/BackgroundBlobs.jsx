import React from 'react';

const NOISE_SVG = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")';

/**
 * The six ambient colour blobs + grain noise overlay shared by the app background
 * and the loader screen.
 *
 * Uses `will-change: transform` to promote the entire blob container onto a GPU
 * compositing layer so the expensive blur filters are rasterised once rather than
 * recomputed on every paint.
 *
 * @param {string} className  Classes applied to the outer wrapper div.
 * @param {number} noiseOpacity  Opacity of the grain overlay (default 0.2).
 */
export default function BackgroundBlobs({ className = '', noiseOpacity = 0.2 }) {
  return (
    <div className={className} style={{ willChange: 'transform' }}>
      {/* blur-[60px] on mobile (< 768px), full blur on desktop via CSS classes */}
      <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-red-700/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[60px] md:blur-[100px] mix-blend-screen"></div>
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[700px] bg-gray-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[60px] md:blur-[120px] mix-blend-screen"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-red-500/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[50px] md:blur-[90px] mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-zinc-600/40 rounded-[70%_30%_50%_50%/30%_30%_70%_70%] blur-[60px] md:blur-[110px] mix-blend-screen"></div>
      <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-rose-700/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-[50px] md:blur-[80px] mix-blend-screen"></div>
      <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] bg-stone-400/20 rounded-[40%_60%_30%_70%/60%_40%_70%_30%] blur-[50px] md:blur-[90px] mix-blend-screen"></div>
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ opacity: noiseOpacity, backgroundImage: NOISE_SVG }}
      ></div>
    </div>
  );
}
