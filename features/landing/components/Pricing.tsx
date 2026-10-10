'use client';
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import LeadCaptureModal from './LeadCaptureModal';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring" as any, damping: 25, stiffness: 100 } 
  }
};

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target Date: Nov 18, 2026, 09:00:00 (Guatemala Time / UTC-6)
    const targetDate = new Date('2026-11-18T09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/*  SECTION 8: PRICING & REGISTRATION PASS TIER (FULL DESKTOP CONVERSION)  */}
      <section id="inscribirse-ahora" className="w-full bg-carbon-void py-32 px-6 lg:px-12 relative overflow-hidden">
        {/*  Atmospheric background flares  */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative z-10 w-[90%] max-w-[1600px] mx-auto flex flex-col items-center"
        >
          
          {/*  Pre-heading  */}
          <motion.span variants={itemVariants} className="font-label-sm text-label-sm uppercase tracking-[0.4em] text-primary font-bold">
            Asegura Tu Entrada Oficial
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-headline-xl text-headline-xl uppercase text-white font-medium text-center mt-6 mb-8 tracking-tight">
            Inscripción The Sapients 2026
          </motion.h2>
          <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-2xl mb-16">
            3 Días de Inmersión Total • 18, 19 y 20 de Noviembre • Las Cumbres Convention Center, Guatemala
          </motion.p>

          {/*  LIVE COUNTDOWN TIMER MODULE  */}
          <motion.div variants={itemVariants} className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
            <div className="border border-white/10 rounded-none p-6 md:p-8 text-center bg-carbon-surface/50 backdrop-blur-sm">
              <div className="text-5xl md:text-7xl text-primary font-light tracking-tighter" id="cd-days">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 mt-4 font-bold">Días</div>
            </div>
            <div className="border border-white/10 rounded-none p-6 md:p-8 text-center bg-carbon-surface/50 backdrop-blur-sm">
              <div className="text-5xl md:text-7xl text-primary font-light tracking-tighter" id="cd-hours">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 mt-4 font-bold">Horas</div>
            </div>
            <div className="border border-white/10 rounded-none p-6 md:p-8 text-center bg-carbon-surface/50 backdrop-blur-sm">
              <div className="text-5xl md:text-7xl text-primary font-light tracking-tighter" id="cd-mins">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 mt-4 font-bold">Minutos</div>
            </div>
            <div className="border border-white/10 rounded-none p-6 md:p-8 text-center bg-carbon-surface/50 backdrop-blur-sm">
              <div className="text-5xl md:text-7xl text-primary font-light tracking-tighter" id="cd-secs">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/40 mt-4 font-bold">Segundos</div>
            </div>
          </motion.div>

          {/*  THE MASTER PASS CONTAINER  */}
          <motion.div variants={itemVariants} className="w-full max-w-5xl border border-white/10 bg-carbon-surface p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden rounded-none shadow-2xl">
            <div className="text-secondary-fixed font-label-sm text-label-sm uppercase tracking-[0.4em] font-medium mb-10">
              Cupo Estrictamente Limitado • Solo Presencial
            </div>
            
            <h3 className="font-headline-lg text-headline-lg uppercase text-white font-medium tracking-wide">
              Pase de Acceso Total
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-6 mb-12">
              Experiencia completa de 3 días con enseñanza directa de Cash Luna y entrega de acreditación.
            </p>

            {/*  Deliverables Checklist (2 Columns on Desktop)  */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left mb-16 border-t border-b border-white/5 py-12">
              {[
                "Acceso presencial a las 18 Master Classes intensivas (3 días completos)",
                "Libro oficial impreso The Sapients® (200+ páginas de enseñanza)",
                "Acceso exclusivo al devocional intensivo: 21 Días de Sabiduría",
                "Coffee Break ejecutivo servido durante todos los días del evento",
                "Parqueo seguro reservado en Las Cumbres Convention Center",
                "Asiento ergonómico con visual privilegiada directa al escenario",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-primary mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface">{text}</span>
                </div>
              ))}
              <div className="flex items-start gap-4 md:col-span-2 md:justify-center md:max-w-xl md:mx-auto">
                <div className="text-primary mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="font-body-md text-body-md text-on-surface">
                  Traducción simultánea en tiempo real disponible (Inglés / Portugués)
                </span>
              </div>
            </div>

            {/*  Conversion Action  */}
            <button onClick={() => setIsModalOpen(true)} className="group w-full max-w-lg inline-flex items-center justify-center gap-2 md:gap-4 px-4 py-4 md:px-8 md:py-6 rounded-none bg-primary hover:bg-primary-light text-carbon-void text-xs md:text-base uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold transition-all hover:scale-[1.02] cursor-none text-center">
              <span>Inscribirse Ahora — Cupo Limitado</span>
              <div className="relative w-4 h-4 md:w-6 md:h-6 overflow-hidden flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 md:w-6 md:h-6 absolute transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
                <svg className="w-4 h-4 md:w-6 md:h-6 absolute -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
            </button>
            
          </motion.div>
        </motion.div>
      </section>

      {/* LEAD CAPTURE MODAL FOR DEMO */}
      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
