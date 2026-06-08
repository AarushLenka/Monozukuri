import React, { useEffect, useState, useRef } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import BackgroundBlobs from './components/BackgroundBlobs';
import GridMarker from './components/GridMarker';
import Loader from './components/Loader';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import CreativeWorkSection from './sections/CreativeWorkSection';
import CitySection from './sections/CitySection';
import ProjectModal from './sections/ProjectModal';
import ClickHereCursor from './components/ClickHereCursor';
import CursorTooltip from './components/CursorTooltip';
import { GRID_CONFIG } from './config/heroConfig';

export default function App() {
  const [time, setTime] = useState('00:43 AM');
  const [scale, setScale] = useState(typeof window !== 'undefined' ? window.innerWidth / 1440 : 1);
  const [outerHeight, setOuterHeight] = useState('auto');
  const [isLoading, setIsLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const wrapperRef = useRef(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keep CSS scale var and scale state in sync with viewport width
  useEffect(() => {
    const handleResize = () => {
      const newScale = window.innerWidth / 1440;
      setScale(newScale);
      document.documentElement.style.setProperty('--scale', newScale);
      document.documentElement.style.setProperty('--logical-vh', '800px');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track the scaled wrapper's actual pixel height for the outer container
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver(() => {
      if (wrapperRef.current) {
        setOuterHeight(Math.ceil(wrapperRef.current.offsetHeight * scale) + 1);
      }
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [scale]);

  // Live clock (updates every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Viewport-fixed background — outside all transforms */}
      <BackgroundBlobs className="fixed top-0 left-0 w-[100vw] h-[100vh] pointer-events-none z-0 overflow-hidden bg-[#3a3a3a]" />

      {isLoading && (
        <Loader onLoadingComplete={() => {
          setHeroVisible(true);
          setTimeout(() => setIsLoading(false), 400);
        }} />
      )}

      {/* Outer reveal wrapper — handles the initial blur/scale-in animation */}
      <div
        className="w-full"
        style={{
          opacity: heroVisible ? 1 : 0,
          filter: heroVisible ? 'none' : 'blur(20px) brightness(2)',
          transform: heroVisible ? 'scale(1)' : 'scale(1.012)',
          transition: heroVisible ? 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)' : 'none',
          minHeight: '100vh',
          height: outerHeight !== 'auto' ? Math.max(outerHeight, typeof window !== 'undefined' ? window.innerHeight : 0) : '100vh',
          overflow: 'hidden',
        }}
      >
        {/* 1440px-wide scaled inner canvas */}
        <div
          ref={wrapperRef}
          className="origin-top-left relative z-[2] text-[#111] font-body selection:bg-black selection:text-white overflow-hidden"
          style={{ width: '1440px', transform: `scale(${scale})` }}
        >
          {/* Global grid overlay — spans all sections */}
          <div className="absolute inset-0 pointer-events-none z-[1]">
            {GRID_CONFIG.VERTICAL_POSITIONS.map((pos) => (
              <div key={pos} className="absolute top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/20 fixed-line" style={{ left: pos }} />
            ))}
            {GRID_CONFIG.HORIZONTAL_POSITIONS.map((pos) => (
              <div key={pos} className="absolute left-0 right-0 h-[1px] -translate-y-1/2 bg-white/20 fixed-line" style={{ top: pos }} />
            ))}
            {GRID_CONFIG.MARKER_POSITIONS.map((pos, i) => (
              <GridMarker key={i} style={{ left: pos.left, top: pos.top }} className="fixed-marker" />
            ))}
          </div>

          <HeroSection time={time} isLoading={isLoading} />
          <AboutSection />
          <ProjectsSection onProjectSelect={setSelectedProject} />
          <CreativeWorkSection />
          <CitySection />
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ClickHereCursor />
      <CursorTooltip />

      <SpeedInsights />
    </>
  );
}
