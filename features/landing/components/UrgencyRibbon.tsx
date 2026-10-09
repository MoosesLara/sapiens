'use client';
import { motion } from 'framer-motion';

export default function UrgencyRibbon({ dict }: { dict: any }) {
  return (
    <>
      {/*  TOP URGENCY / SOLD OUT NOTICE RIBBON (EDITORIAL TICKER)  */}
      <aside aria-label="Aviso de disponibilidad" className="w-full bg-[#050505] py-2 md:py-2.5 border-b border-white/5 relative z-40 overflow-hidden flex items-center">
        
        {/* Fading gradients on edges for a smooth entrance/exit of text */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap overflow-hidden w-full">
          <motion.div
            className="flex whitespace-nowrap items-center"
            animate={{ x: ["0%", "-25%"] }}
            transition={{ ease: "linear", duration: 50, repeat: Infinity }}
          >
            {/* Render 8 blocks, animate to -25% (shifting exactly 2 blocks) for a flawless ultra-wide loop */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                
                <span className="text-[10px] md:text-[11px] text-white/40 uppercase tracking-[0.3em] font-medium mx-4 md:mx-8 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  {dict.soldOutPrefix} <span className="text-white/70 line-through decoration-white/30">{dict.soldOutBadge}</span>
                </span>
                
                <span className="text-primary/30 mx-2 md:mx-4 text-[8px]">✦</span>
                
                <span className="text-[10px] md:text-[11px] text-primary/80 uppercase tracking-[0.3em] font-light mx-4 md:mx-8 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></span>
                  {dict.nextDatePrefix} <span className="text-primary font-bold">{dict.nextDate}</span>
                </span>
                
                <span className="text-primary/30 mx-2 md:mx-4 text-[8px]">✦</span>
                
                <span className="text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.3em] font-light mx-4 md:mx-8">
                  {dict.modality}
                </span>

                <span className="text-primary/30 mx-2 md:mx-4 text-[8px]">✦</span>
                
                <span className="text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.3em] font-light mx-4 md:mx-8">
                  {dict.scarcity}
                </span>

                <span className="text-primary/30 mx-2 md:mx-4 text-[8px]">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </aside>
    </>
  );
}
