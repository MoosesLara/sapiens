'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const testimonialsData = [
  {
    name: 'Thiago Brunet',
    country: 'Brasil',
    role: 'Creador del Método Destiny',
    quote: 'Todos tienen que pasar por The Sapients porque es base fundamental para quienes quieren crear cosas grandes en la Tierra.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0_-1iB8S_tJgorjXljCNIW0ev6Wkdb-Aucg-LUXCRwddCG-Sdd6rQJWWBzSpNk1GwxL0OxEhvmwrH7kK2cWoXdHJnYmAeF6xvX9XtkYrAJ9eqebuc2hiav1NPZOAx60iZsiruOCzppWsEW-jPeV-l0qidB-ajFJk1ehneUMIX64ingw3O893urPOpoXoT3LxsgrOeKIHAfFELThRUBOqgz5uVx-SPybjxifP7PgU'
  },
  {
    name: 'Raquel Tavolazzi',
    country: 'Brasil',
    role: 'Cocreadora de Nitro 10X',
    quote: 'Elegí a Cash Luna como mi mentor porque veo en él integridad y riqueza en todas las áreas: espiritual, familiar, financiera y de salud.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEkKFdrJb8I67X2t6kZI5soK_S8IfURWxlXMzEEnW6itJG-F2HcUyJGY3hXUNa5ZlOosxPh17N1PzZ71icbQ6veDB2L4AHxqcQeXIPKraP_cif1QrMYiFt1JFLAj1u9urg3XtmTFybEg0dYKdKJJCUrhbz-5yGWgd5Eu9KK5c_taLK1aj8R7I1sUDecojwviof3d7i2OuPbLlUP-x4EU9d_oU8O4UGogZOTZ0z8JI'
  },
  {
    name: 'Pyero Tavolazzi',
    country: 'Brasil',
    role: 'Creador de Nitro 10X',
    quote: 'Tuve una expansión en mi mente y claridad sobre la sabiduría en la construcción de riqueza. Me llevó a un nuevo nivel de fe y entendimiento.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_27uBxj_ztkJ5O7kjjjzE7VeSxy_kW-MF11kPLo1mIzCKJ8m1hi0zB5iZB_Nbl3CwbsFMs3TmtSC0Z-e8Lj3HBMzH-f36uvMbhY2YZeCPf9ze2ly1tPemAgSAoPpJV3Fa1vWEtFTpiIpFTS2vWcoHYLbFDvH7glqv8A0ti5hqJgpChPBQ2sDaNvwxnlr5uXlvqFajNVVDpmCuWuAby5ovwrIkl2RYEJVPsKc2KY0'
  },
  {
    name: 'Jorge Martínez',
    country: 'Canadá',
    role: 'Empresario Internacional',
    quote: 'The Sapients va a transformarlo todo. Es algo increíble: te ensancha la mente, te devuelve un sueño, te regresa a todo lo grande que algún día creíste y te da toda esa fuerza de parte de Dios.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoXtiHhRByKnCNTVEVdpTrcrIsZECEbPLO1mt7_h2jo2aT1WXsFqAEgMQMBsdaXbXM9cSK19DL39WHpKbZSx955xHTTZE0s4RHnEjjL9dDdbxIUB7zT8AJ5kkEVk6KwY24JdrMfzdafaHnWSpX-XW5e61xqteghQltpqTzYvMiBsDDmU9hiBgpKDVPJlrG12yZrD7wEfRlBfuYKCcDf2j24xe-oNH-To8EndAyQvA'
  },
  {
    name: 'Chris Méndez',
    country: 'Argentina',
    role: 'Pastor Hillsong América Latina',
    quote: 'Me sentí totalmente desafiado porque uno puede tener fe para creer todo lo que Dios tiene para nosotros, pero la fe tiene que caminar junto a la sabiduría para administrar y cuidar lo que Él nos da.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB36LJR9SszINGIRg6LOre-Nex5GY3rQqyFMNDu8UxkC9Pn0o1a_RjIFSXjhHLH06LcgvTboUKtYIBxOlEAFm4KOayzEPIBbUB8PfFj-Af0h9aRn2BFGK_RqhqIr-bdfjkEztxSebRnLdnsV305dgqJmOVX26BqpxHbaloVTL1c26ROO0MZobeKBAXk8Ejjqkvp7Xw7QjLN6bUfIdEFbe_6HOYs4nPrCFG9W9q-HGQ'
  },
  {
    name: 'Pepe Caceros',
    country: 'Guatemala',
    role: 'Partner Lenovo, HPE & Apple',
    quote: 'Lo más importante es que la información viene de la fuente correcta: no solo de una persona que es testimonio vivo de lo que ha aprendido y de lo que enseña, sino además de la fuente más importante: la sabiduría de Dios.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0EplGaDu09XPb3oBO_rydSbKS_ZoHx2gQ5HvN6mRyvXuWKjm9jRj3ug9Nj3BqY4_NwH24UbnnUGmuJ475Oa8RPBBkx3KAikY-X75OokwmJ5D_lWyIoY9ai9h0PEt0a7ESdieXAKQNGvjjQshb4AbSgElLeExY7zOudrqqN8k9Sb1kRWdOfE38ScHVxj-FR7QldkghiOeLUuWr9ZDs-y6fo5RnZhWdmCGi1-rOpyg'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(3);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(testimonialsData.length - 1, prev + 1));
  };

  return (
    <>
      <section id="testimonios" className="w-full bg-carbon-void py-32 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden flex flex-col justify-center">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none opacity-50 mix-blend-screen" 
             style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 50%)' }} />

        <div className="w-[90%] max-w-[1600px] mx-auto flex flex-col items-center relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.4em] text-primary font-bold">
              Testimonios de Impacto Global
            </span>
            <h2 className="font-headline-xl text-headline-xl uppercase text-white font-medium mt-4 tracking-tight">
              La Voz de los Soberanos
            </h2>
          </div>

          {/* 3D Carousel Slider */}
          <div className="relative w-full h-[450px] md:h-[500px] mt-8 grid place-items-center">
            {testimonialsData.map((t, idx) => {
              const diff = idx - activeIndex;
              const absDiff = Math.abs(diff);
              const isCenter = diff === 0;

              // Hide cards that are too far away
              if (absDiff > 2) return null;

              // Smooth scale down for adjacent cards
              const scale = isCenter ? 1 : 0.85;
              const opacity = isCenter ? 1 : Math.max(1 - (absDiff * 0.5), 0.15);
              const zIndex = 10 - absDiff;

              return (
                <motion.div
                  key={idx}
                  className="col-start-1 row-start-1 w-full max-w-[320px] sm:max-w-[480px] md:max-w-[550px] cursor-pointer"
                  onClick={() => setActiveIndex(idx)}
                  initial={false}
                  animate={{
                    x: `${diff * 105}%`,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: "spring" as any,
                    stiffness: 150,
                    damping: 25,
                    mass: 0.8
                  }}
                >
                  {/* Card Content */}
                  <div className={`w-full bg-[#0c0c0c]/90 backdrop-blur-3xl border p-6 sm:p-10 md:p-14 rounded-3xl flex flex-col justify-between items-center text-center transition-all duration-500
                    ${isCenter ? 'border-primary/40 shadow-[0_0_80px_rgba(212,175,55,0.15)]' : 'border-white/5 shadow-none hover:border-white/15'}`}>
                    
                    <p className={`font-body-lg text-body-lg leading-relaxed mb-10 transition-colors duration-500
                      ${isCenter ? 'text-white' : 'text-white/40'}`}>
                      «{t.quote}»
                    </p>
                    
                    <div className="flex flex-col items-center mt-auto">
                      <div className={`w-16 h-16 rounded-full overflow-hidden mb-5 transition-all duration-500 border border-white/10 ${isCenter ? 'opacity-100 ring-2 ring-primary/30' : 'opacity-60 scale-90'}`}>
                        <Image src={t.image} alt={t.name} width={100} height={100} className="w-full h-full object-cover" />
                      </div>
                      <h4 className={`font-title-lg text-title-lg tracking-wider uppercase transition-colors duration-500 ${isCenter ? 'text-primary' : 'text-white/40'}`}>
                        {t.name}
                      </h4>
                      <p className={`font-label-sm text-micro uppercase tracking-[0.2em] mt-1 transition-colors duration-500 ${isCenter ? 'text-white/80' : 'text-white/20'}`}>
                        {t.country}
                      </p>
                      <p className={`font-label-sm text-micro uppercase tracking-widest mt-1 transition-colors duration-500 ${isCenter ? 'text-white/50' : 'text-white/10'}`}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-20 z-20">
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-14 h-14 flex items-center justify-center rounded-none border border-white/10 bg-carbon-surface hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white/50 hover:text-white"
              aria-label="Anterior testimonio"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              onClick={handleNext}
              disabled={activeIndex === testimonialsData.length - 1}
              className="w-14 h-14 flex items-center justify-center rounded-none border border-white/10 bg-carbon-surface hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white/50 hover:text-white"
              aria-label="Siguiente testimonio"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
