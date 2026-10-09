'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import logoImage from '../../../public/src/fondo2.jpg';
// Module-level flag: resets to false on every full page reload (JS module re-evaluated),
// but stays true during client-side navigation (language switches) since the module
// remains loaded in memory. This is the correct pattern for "show once per page load".
let hasSeenLoaderThisLoad = false;

export default function ScrollRevealLoader({ children }: { children: React.ReactNode }) {
  const [loaderState, setLoaderState] = useState<'show' | 'hidden'>(() => {
    if (typeof window === 'undefined') return 'show';
    return hasSeenLoaderThisLoad ? 'hidden' : 'show';
  });

  // No longer need this useEffect to set initial state since it's done synchronously above.

  const handleEnter = () => {
    hasSeenLoaderThisLoad = true;
    setLoaderState('hidden');
  };

  const isShowingLoader = loaderState === 'show';

  // Lock scroll while loader is active
  useEffect(() => {
    if (isShowingLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 1000);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isShowingLoader]);

  return (
    <>
      <AnimatePresence>
        {isShowingLoader && (
          <motion.div 
            className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => handleEnter()}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
          >
            {/* Logo Container */}
            <motion.div 
              className="relative w-full h-full -mt-16 md:-mt-32"
              initial={{ scale: 1 }}
              exit={{ scale: 80, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <Image 
                src={logoImage} 
                alt="The Sapients Logo High Res" 
                fill 
                className="object-contain" 
                priority 
              />
            </motion.div>

            {/* Click to Enter */}
            <motion.div 
              className="absolute bottom-12 text-white/50 uppercase tracking-[0.4em] text-[10px] md:text-xs font-light flex flex-col items-center gap-3"
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center mb-1"
              >
                <div className="w-1 h-1 bg-primary rounded-full"></div>
              </motion.div>
              <span>Haz clic para entrar</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full">
        {children}
      </div>
    </>
  );
}
