'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import templocasaImg from '../../../public/src/templocasa.jpg';
export default function Hero({ dict }: { dict: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax physics mapped to scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Master choreography variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, // wait for the loader to finish fading out
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, filter: 'blur(12px)' },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: { type: "spring" as any, damping: 25, stiffness: 120, mass: 0.8 } 
    }
  };

  const imageVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as any, damping: 30, stiffness: 80, delay: 0.8 } 
    }
  };

  return (
    <section ref={sectionRef} id="inicio" className="relative w-full overflow-hidden bg-carbon-void flex flex-col items-center justify-center text-center px-6 lg:px-12 py-20 lg:py-28 shadow-xl">
      
      {/*  Atmospheric Mesh Gradient / Aurora Glows  */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -left-[10%] w-[60%] h-[80%] bg-primary/20 rounded-full blur-[140px] opacity-70"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[50%] h-[90%] bg-gold-deep/20 rounded-full blur-[160px] opacity-60"
        />
        <div className="absolute top-[30%] left-[25%] w-[50%] h-[40%] bg-gold-light/10 rounded-full blur-[120px] opacity-50"></div>
      </div>
      
      {/* Dark overlay to ensure text contrast remains perfect */}
      <div className="absolute inset-0 bg-carbon-void/40 pointer-events-none z-0"></div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: yParallax, opacity: opacityParallax, scale: scaleParallax }}
        className="relative z-10 w-[90%] max-w-[1600px] mx-auto flex flex-col items-center origin-top"
      >
        {/*  Exclusivity Label  */}
        <motion.span variants={itemVariants} className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary/80 font-bold mb-6 block">
          {dict.badge}
        </motion.span>
        
        {/*  Main Crest Title  */}
        <motion.h1 variants={itemVariants} className="font-headline-xl text-[12vw] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] leading-[0.85] text-white font-black uppercase tracking-tighter w-full">
          {dict.titlePrefix} <span className="text-primary">{dict.titleHighlight}</span>
        </motion.h1>
        
        <motion.span variants={itemVariants} className="font-headline-lg text-headline-md uppercase tracking-[0.2em] text-white/90 mt-6 md:mt-8 block">
          {dict.subtitle}
        </motion.span>
        
        {/*  Core Value Proposition  */}
        <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-8 md:mt-10">
          {dict.descriptionPart1} <span className="text-primary font-medium italic">{dict.descriptionHighlight}</span> {dict.descriptionPart2}
        </motion.p>
        
        {/*  Event Logistics Pill Strip  */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-12">
          <div className="flex items-center gap-4 px-6 py-5 rounded-none bg-carbon-surface/80 shadow-md border border-white/5 text-left backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-micro uppercase text-on-surface-variant">{dict.dateLabel}</span>
              <span className="font-body-md text-body-md text-on-surface font-medium">{dict.dateValue}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-5 rounded-none bg-carbon-surface/80 shadow-md border border-white/5 text-left backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-micro uppercase text-on-surface-variant">{dict.locationLabel}</span>
              <span className="font-body-md text-body-md text-on-surface font-medium">{dict.locationValue}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-5 rounded-none bg-carbon-surface/80 shadow-md border border-white/5 text-left backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-micro uppercase text-on-surface-variant">{dict.modalityLabel}</span>
              <span className="font-body-md text-body-md text-on-surface font-medium">{dict.modalityValue}</span>
            </div>
          </div>
        </motion.div>
        
        {/*  Hero Scroll Down Indicator  */}
        <motion.div variants={itemVariants} className="flex justify-center mt-14 w-full">
          <motion.a 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.2, filter: "drop-shadow(0px 0px 8px rgba(184,142,82,0.6))" }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center text-primary hover:text-primary-light transition-all cursor-none p-4" 
            href="#inscribirse-ahora"
            aria-label="Ir a inscripción"
          >
            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </motion.a>
        </motion.div>
        
        {/*  Scarcity Microlabel  */}
        <motion.p variants={itemVariants} className="font-body-sm text-body-sm text-text-muted mt-4">
          {dict.disclaimer}
        </motion.p>
      </motion.div>

      {/*  Hero Atmospheric Stage Image Frame  */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={imageVariants}
        className="relative z-10 w-[90%] max-w-[1600px] mt-20 mb-10 rounded-none overflow-hidden shadow-2xl bg-surface-container-lowest border border-white/5"
      >
        <div className="min-h-[380px] sm:min-h-[450px] lg:min-h-0 lg:aspect-[21/9] w-full bg-cover bg-center relative" style={{ backgroundImage: `url('${templocasaImg.src}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-void via-carbon-void/60 to-transparent flex flex-col sm:flex-row items-start sm:items-end justify-end sm:justify-between p-6 sm:p-12 gap-6">
            <div className="text-left flex flex-col">
              <span className="font-label-sm text-xs sm:text-label-sm uppercase text-primary font-bold mb-2 sm:mb-3">
                {dict.imageBadge}
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-headline-xl text-white uppercase drop-shadow-lg font-black leading-tight sm:leading-none">
                {dict.imageTitle}
              </h3>
              <p className="text-xs sm:text-sm md:text-body-md text-on-surface-variant uppercase mt-3 sm:mt-4 tracking-[0.15em]">
                {dict.imageLocation}
              </p>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-none bg-carbon-void/80 backdrop-blur-md border border-white/5 shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white/90">
                {dict.imageHighlight}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
