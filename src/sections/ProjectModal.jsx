import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Terminal-style project detail modal.
 *
 * @param {object|null} project   The selected project object, or null when closed.
 * @param {function}    onClose   Callback to close the modal.
 */
export default function ProjectModal({ project, onClose }) {
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
            className="w-[85vw] h-[75vh] max-w-5xl rounded-lg bg-[#111111]/80 backdrop-blur-md border border-white/20 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content Area */}
            <div className="p-6 flex-1 overflow-y-auto font-mono text-sm leading-normal selection:bg-white/20">
              <div className="flex text-white/90">
                <span><span className="text-white/50">~/Monozukuri&gt;</span> cat {project.title.toLowerCase().replace(/\s+/g, '-')}.txt</span>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-8">
                {/* Image Placeholder */}
                <div className="w-full md:w-80 shrink-0 border border-dashed border-white/20 bg-white/5 rounded-md p-4 flex items-center justify-center overflow-hidden">
                  {project.modalImage ? (
                    <img src={project.modalImage} alt={project.title} className="w-full h-full object-contain" />
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
                <div className="space-y-2 flex-1">
                  <div>
                    <span className="text-white/50">PROJECT:</span> <span className="text-white/90">{project.title}</span>
                  </div>
                  <div>
                    <span className="text-white/50">ROLE:</span> <span className="text-white/90">{project.desc}</span>
                  </div>
                  <div className="pt-0">
                    <span className="text-white/50">DESCRIPTION:</span>
                    <div className="mt-0 text-white/70 leading-normal whitespace-pre-wrap">
                      {project.modalDesc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
