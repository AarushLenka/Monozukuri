import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Terminal-style project detail modal.
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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto cursor-default bg-black/60"
          onClick={onClose}
        >
          {/* Terminal Window */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320, mass: 0.8 }}
            className="w-[95vw] max-w-none max-h-[95vh] rounded-lg bg-[#080808] border-[1.5px] border-white flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightweight High-Performance Gradient instead of expensive heavy blur blobs */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-br from-[#1a1a1b] via-[#0d0d0d] to-[#050505] opacity-90" />

            {/* Content Area */}
            <div className="relative z-10 p-6 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] font-['Monospaceland',_monospace] font-bold not-italic text-sm leading-normal selection:bg-white/20">
              <div className="flex text-white/90">
                <span><span className="text-white/50">~/Monozukuri&gt;</span> cat {project.title.toLowerCase().replace(/\s+/g, '-')}.txt</span>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                {/* Image / ASCII Area */}
                <div className="w-full md:w-[50%] shrink-0 flex items-center justify-center min-h-[160px]">
                  {project.modalImage ? (
                    <img src={project.modalImage} alt={project.title} decoding="async" loading="eager" className="w-full h-auto object-contain transition-opacity duration-300" />
                  ) : (
                    <pre className="text-white/50 text-xs md:text-sm leading-tight font-mono text-center py-8">
{`    ___    
  //   \\\\  
 //     \\\\ 
|| ASCII ||
 \\\\     // 
  \\\\___//  `}
                    </pre>
                  )}
                </div>

                {/* Project Details */}
                <div className="flex-1 flex flex-col justify-start space-y-2">
                  <div className="flex flex-col space-y-2 shrink-0">
                    <div>
                      <span className="text-white/50">PROJECT:</span> <span className="text-white/90">{project.title}</span>
                    </div>
                    <div>
                      <span className="text-white/50">ROLE:</span> <span className="text-white/90">{project.desc}</span>
                    </div>
                  </div>

                  {parseDescription(project.modalDesc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.").map((section, idx) => (
                    <div key={idx} className="shrink-0">
                      <span className="text-white/50 block">{section.title}:</span>
                      <div className="text-white/70 leading-normal whitespace-pre-wrap">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
