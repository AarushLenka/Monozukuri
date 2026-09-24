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
      className="modal-backdrop-in fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      {/* Terminal Window */}
      <div
        className="modal-window-in w-full max-w-3xl md:max-w-4xl h-[85svh] max-h-[95vh] md:h-[560px] md:max-h-none rounded-2xl border border-white/20 bg-[#0b0b0b] flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden font-['Monospaceland',_monospace] font-bold not-italic text-sm leading-normal selection:bg-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.04] select-none">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onClose}
              className="h-3 w-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity flex items-center justify-center group shrink-0"
              title="Close (Esc)"
              aria-label="Close"
            >
              <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="black" strokeWidth="2" className="opacity-0 group-hover:opacity-100">
                <path d="M1 1L13 13M1 13L13 1" />
              </svg>
            </button>
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shrink-0" title="Minimize/Expand" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shrink-0" title="Maximize" />

            <span className="ml-3 text-xs text-white/90 flex items-center gap-1.5 font-bold min-w-0">
              <svg className="text-[#bef264] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span className="truncate">guest@monozukuri:~</span>
            </span>
          </div>

          <span className="text-[0.68rem] text-white/35 hidden sm:inline shrink-0">
            [ESC to close]
          </span>
        </div>

        {/* Terminal Scrollable Output Area */}
        <div className="relative z-10 flex-1 p-4 sm:p-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-xs sm:text-sm leading-relaxed space-y-3">
          {/* Shell command line */}
          <div className="whitespace-pre-wrap break-words">
            <span className="text-[#bef264]">guest@monozukuri:~$ </span>
            <span className="text-white/90">cat {fileSlug}.txt</span>
          </div>

          <div className="mt-2 flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Image / ASCII Area */}
            <div className="w-full md:w-[50%] shrink-0 flex items-center justify-center min-h-[140px]">
              {project.modalImage ? (
                <img
                  src={project.modalImage}
                  alt={project.title}
                  decoding="async"
                  loading="eager"
                  className="w-auto h-auto max-w-full max-h-[38svh] md:max-h-[440px] object-contain"
                />
              ) : (
                <pre className="text-white/40 text-xs md:text-sm leading-tight text-center py-8">{ASCII_FALLBACK}</pre>
              )}
            </div>

            {/* Project Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-start space-y-2">
              <div className="flex flex-col space-y-2 shrink-0">
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

        {/* Status Bar */}
        <div className="shrink-0 px-4 py-2.5 border-t border-white/10 bg-white/[0.03] flex items-center justify-between select-none">
          <span className="flex items-center gap-1.5 text-[0.65rem] text-white/35 uppercase tracking-wider">
            <span className="text-[#bef264] normal-case">guest@monozukuri:~$</span>
            <span className="inline-block w-[7px] h-[12px] bg-[#bef264] animate-cursor-blink" />
          </span>
          <span className="text-[0.65rem] text-white/35 uppercase tracking-wider hidden sm:inline truncate">
            {fileSlug}.txt — read-only
          </span>
        </div>
      </div>
    </div>
  );
}
