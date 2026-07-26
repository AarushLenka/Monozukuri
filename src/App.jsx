import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import BackgroundBlobs from './components/BackgroundBlobs';
import GridMarker from './components/GridMarker';
import Loader from './components/Loader';
import HeroSection from './sections/HeroSection';
import { useIsMobile } from './hooks/useIsMobile';
import { GRID_CONFIG } from './config/heroConfig';

// Keep below-the-fold code split, and do not even start the import until the
// section is close to the viewport. Rendering a lazy component immediately
// still downloads its chunk on the first paint.
const loadAboutSection = () => import('./sections/AboutSection');
const loadProjectsSection = () => import('./sections/ProjectsSection');
const loadCreativeWorkSection = () => import('./sections/CreativeWorkSection');
const loadCitySection = () => import('./sections/CitySection');
const ProjectModal = lazy(() => import('./sections/ProjectModal'));
const ClickHereCursor = lazy(() => import('./components/ClickHereCursor'));
const CursorTooltip = lazy(() => import('./components/CursorTooltip'));

// Preload all section bundles directly after initial Javascript evaluation
// so zero network delays occur during mobile scroll while the Loader is active.
if (typeof window !== 'undefined') {
  setTimeout(() => {
    loadAboutSection();
    loadProjectsSection();
    loadCreativeWorkSection();
    loadCitySection();
  }, 100);
}

function DeferredSection({ load, isMobile, minHeight = '100vh', sectionProps = {}, children }) {
  const sectionRef = useRef(null);
  const [Section, setSection] = useState(null);

  useEffect(() => {
    if (Section || !sectionRef.current) return undefined;

    const loadSection = () => {
      load().then((module) => setSection(() => module.default));
    };

    if (!('IntersectionObserver' in window) || isMobile) {
      // On mobile, mount eagerly once JS module is fetched so scroll never hits an empty or delayed DOM
      loadSection();
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      loadSection();
    }, { rootMargin: '2500px 0px' });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [Section, load, isMobile]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ minHeight: isMobile ? minHeight : 'var(--logical-vh)' }}
    >
      {Section ? (
        <Suspense fallback={children || null}>
          <Section isMobile={isMobile} {...sectionProps} />
        </Suspense>
      ) : children || null}
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState('00:43 AM');
  const [scale, setScale] = useState(typeof window !== 'undefined' ? window.innerWidth / 1440 : 1);
  const [outerHeight, setOuterHeight] = useState('auto');
  const [isLoading, setIsLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const wrapperRef = useRef(null);
  const isMobile = useIsMobile();

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

  // Track the scaled wrapper's actual pixel height for the outer container (desktop only)
  useEffect(() => {
    if (isMobile) return;
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver(() => {
      if (wrapperRef.current) {
        setOuterHeight(Math.ceil(wrapperRef.current.offsetHeight * scale) + 1);
      }
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [scale, isMobile]);

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
          ...(isMobile
            ? { minHeight: '100vh' }
            : {
                minHeight: '100vh',
                height: outerHeight !== 'auto' ? Math.max(outerHeight, typeof window !== 'undefined' ? window.innerHeight : 0) : '100vh',
                overflow: 'hidden',
              }
          ),
        }}
      >
        {/* 1440px-wide scaled inner canvas (desktop) / full-width flow (mobile) */}
        <div
          ref={wrapperRef}
          className={`relative z-[2] text-[#111] font-body selection:bg-black selection:text-white ${isMobile ? 'w-full overflow-x-hidden' : 'origin-top-left overflow-hidden'}`}
          style={isMobile ? {} : { width: '1440px', transform: `scale(${scale})` }}
        >
          {/* Global grid overlay — spans all sections (desktop only) */}
          {!isMobile && (
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
          )}

          {/* Mobile grid overlay — 3 columns, very faint, 2x row height */}
          {isMobile && (
            <>
              <div
                className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
                  backgroundSize: '33.333% 200px',
                }}
              />
              {/* Intersection crosshair markers at each vertical × horizontal line crossing (faint) */}
              <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-30">
                {['33.333%', '66.666%'].flatMap((left) =>
                  Array.from({ length: 60 }, (_, i) => i * 200).map((top) => (
                    <GridMarker key={`${left}-${top}`} style={{ left, top: `${top}px` }} />
                  ))
                )}
              </div>
            </>
          )}

          <HeroSection time={time} isLoading={isLoading} isMobile={isMobile} />
          <DeferredSection load={loadAboutSection} isMobile={isMobile} minHeight="100vh" />
          <DeferredSection load={loadProjectsSection} isMobile={isMobile} minHeight="100vh" sectionProps={{ onProjectSelect: setSelectedProject }} />
          <DeferredSection load={loadCreativeWorkSection} isMobile={isMobile} minHeight="80vh" />
          <DeferredSection load={loadCitySection} isMobile={isMobile} minHeight="100vh" />
        </div>
      </div>

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Suspense>
      )}
      {/* Hide ClickHereCursor and CursorTooltip on mobile */}
      {!isMobile && (
        <Suspense fallback={null}>
          <ClickHereCursor isModalOpen={!!selectedProject} />
          <CursorTooltip />
        </Suspense>
      )}

      <SpeedInsights />
    </>
  );
}
