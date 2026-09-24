import React, { useEffect } from 'react';

/**
 * Terminal-style project detail modal — macOS terminal window aesthetic:
 * traffic-light title bar, ink canvas, lime shell prompt, blinking cursor
 * status bar. Purely visual — no commands or interactive chips.
 *
 * @param {object|null} project   The selected project object, or null when closed.
 * @param {function}    onClose   Callback to close the modal.
 */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) {
      // Push a state to the history so the back button has something to pop
      window.history.pushState({ modalId: 'projectModal' }, '');

      const handlePopState = () => {
        // When the back button is pressed, close the modal
        onClose();
      };

      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
        // If the modal was closed via UI (e.g., clicking the backdrop), 
        // the pushed state is still in history. We need to pop it.
        if (window.history.state && window.history.state.modalId === 'projectModal') {
          window.history.back();
        }
      };
    }
  }, [project, onClose]);

  const parseDescription = (text) => {
    if (!text) return [];
    
    const regex = /^(Overview|Key Features|Technical Stack|Skills Demonstrated|Impact):?/gm;
    const sections = [];
    const matchArr = [...text.matchAll(regex)];
    
    if (matchArr.length === 0) {
      return [{ title: 'DESCRIPTION', content: text.trim() }];
    }
    
    if (matchArr[0].index > 0) {
      sections.push({
        title: 'DESCRIPTION',
        content: text.substring(0, matchArr[0].index).trim()
      });
    }
    
    for (let i = 0; i < matchArr.length; i++) {
      let header = matchArr[i][1].toUpperCase();
      if (header === 'OVERVIEW') header = 'DESCRIPTION';
      
      const start = matchArr[i].index + matchArr[i][0].length;
      const end = i + 1 < matchArr.length ? matchArr[i+1].index : text.length;
      
      sections.push({
        title: header,
        content: text.substring(start, end).trim()
      });
    }
    
    return sections;
  };

  if (!project) return null;

  const fileSlug = project.title.toLowerCase().replace(/\s+/g, '-');

  const ASCII_FALLBACK = `    ___    
  //   \\\\  
 //     \\\\ 
|| ASCII ||
 \\\\     // 
  \\\\___//  `;

  return (
    <div
      className="modal-backdrop-in fixed inset-0 z-[100] flex items-center justify-center p-[12px] sm:p-[24px] bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      {/* Terminal Window */}
      <div
        className="modal-window-in w-full max-w-[906px] md:max-w-[1162px] h-[calc(85svh+80px)] max-h-[95vh] md:h-[640px] md:max-h-none rounded-2xl border border-white/25 bg-[#0b0b0b]/80 backdrop-blur-2xl backdrop-saturate-150 flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden font-['Monospaceland',_monospace] font-bold not-italic text-sm leading-normal selection:bg-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar — 30px. NOTE: arbitrary values are mandatory
            here — this project's tailwind.config overrides the spacing scale,
            so h-5 renders 48px and h-2 renders 29px. */}
        <div className="relative z-20 shrink-0 flex items-center justify-between px-[10px] h-[30px] border-b border-white/10 bg-white/[0.04] select-none">
          <div className="flex items-center gap-[6px] min-w-0">
            <button
              onClick={onClose}
              className="group relative flex h-[8px] w-[8px] items-center justify-center shrink-0"
              title="Close (Esc)"
              aria-label="Close"
            >
              {/* Invisible expanded hit area — does not affect layout spacing */}
              <span className="absolute -inset-[4px]" />
              <span className="flex h-[8px] w-[8px] items-center justify-center rounded-full bg-[#ff5f56]">
                <svg width="5" height="5" viewBox="0 0 14 14" fill="none" stroke="black" strokeWidth="3" className="opacity-0 group-hover:opacity-100">
                  <path d="M1 1L13 13M1 13L13 1" />
                </svg>
              </span>
            </button>
            <span className="h-[8px] w-[8px] rounded-full bg-[#ffbd2e] shrink-0" />
            <span className="h-[8px] w-[8px] rounded-full bg-[#27c93f] shrink-0" />

            <span className="ml-[4px] text-[8px] leading-none text-white/60 truncate">
              guest@monozukuri:~
            </span>
          </div>

          <span className="text-[8px] leading-none text-white/35 hidden sm:inline shrink-0">
            [esc to close]
          </span>
        </div>

        {/* Terminal Scrollable Output Area */}
        <div className="relative z-10 flex-1 p-[16px] sm:p-[20px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-[10px] sm:text-xs leading-relaxed space-y-[10px]">
          {/* Shell command line */}
          <div className="whitespace-pre-wrap break-words">
            <span className="text-[#bef264]">guest@monozukuri:~$ </span>
            <span className="text-white/90">cat {fileSlug}.txt</span>
          </div>

          <div className="mt-[10px] flex flex-col md:flex-row gap-[16px] md:gap-[24px]">
            {/* Image / ASCII Area */}
            <div className="w-full md:w-[45%] shrink-0 flex items-center justify-center min-h-[140px]">
              {project.modalImage ? (
                <img
                  src={project.modalImage}
                  alt={project.title}
                  decoding="async"
                  loading="eager"
                  className="w-auto h-auto max-w-full max-h-[38svh] md:max-h-[440px] object-contain"
                />
              ) : (
                <pre className="text-white/40 text-[10px] md:text-xs leading-tight text-center py-[24px]">{ASCII_FALLBACK}</pre>
              )}
            </div>

            {/* Project Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-start space-y-[8px]">
              <div className="flex flex-col space-y-[8px] shrink-0">
                <div className="break-words">
                  <span className="text-white/40">PROJECT:</span> <span className="text-white/90">{project.title}</span>
                </div>
                <div className="break-words">
                  <span className="text-white/40">ROLE:</span> <span className="text-white/90">{project.desc}</span>
                </div>
              </div>

              {parseDescription(project.modalDesc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.").map((section, idx) => (
                <div key={idx} className="shrink-0">
                  <span className="text-white/40 block">{section.title}:</span>
                  <div className="text-white/70 leading-normal whitespace-pre-wrap break-words">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar — 30px per spec */}
        <div className="shrink-0 px-[12px] h-[30px] border-t border-white/10 bg-white/[0.03] flex items-center justify-between gap-[12px] select-none">
          <span className="flex items-center gap-[6px] text-[10px] text-white/35 tracking-wider min-w-0">
            <span className="text-[#bef264] shrink-0">guest@monozukuri:~$</span>
            <span className="inline-block w-[6px] h-[11px] bg-[#bef264] animate-cursor-blink shrink-0" />
          </span>
          <span className="flex items-center gap-[12px] text-[10px] text-white/35 tracking-wider min-w-0">
            <span className="hidden sm:inline shrink-0">[esc to close]</span>
            <span className="truncate">{fileSlug}.txt</span>
          </span>
        </div>
      </div>
    </div>
  );
}
