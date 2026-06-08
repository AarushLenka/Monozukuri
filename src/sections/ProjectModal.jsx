import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Terminal-style project detail modal.
 *
 * @param {object|null} project   The selected project object, or null when closed.
 * @param {function}    onClose   Callback to close the modal.
 */
export default function ProjectModal({ project, onClose }) {
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto cursor-default"
          onClick={onClose}
        >
          {/* Terminal Window */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 80 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 80 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220, mass: 1 }}
            className="w-[95vw] max-w-none max-h-[95vh] rounded-lg bg-[#111111]/80 backdrop-blur-md border border-white/20 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content Area */}
            <div className="p-6 flex-1 overflow-y-auto font-['Monospaceland',_monospace] font-bold not-italic text-sm leading-normal selection:bg-white/20">
              <div className="flex text-white/90">
                <span><span className="text-white/50">~/Monozukuri&gt;</span> cat {project.title.toLowerCase().replace(/\s+/g, '-')}.txt</span>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                {/* Image Placeholder */}
                <div className="w-full md:w-[50%] shrink-0 flex items-center justify-center">
                  {project.modalImage ? (
                    <img src={project.modalImage} alt={project.title} className="w-full h-auto object-contain" />
                  ) : (
                    <pre className="text-white/30 text-[10px] leading-tight font-mono text-center">
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
