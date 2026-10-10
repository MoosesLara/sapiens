'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import thiagoImg from '../../../public/src/thiago_brunet.jpg';
import raquelImg from '../../../public/src/Raquel_Tavolazzi.png';
import pyeroImg from '../../../public/src/Pyero_Tavolazzi.jpg';
import otonielImg from '../../../public/src/otoniel_font.jpg';
import chrisImg from '../../../public/src/chris_mendez.jpg';
import pepeImg from '../../../public/src/pepe_caceros.jpg';

const testimonialsData = [
  {
    name: 'Thiago Brunet',
    country: 'Brasil',
    role: 'Creador del Método Destiny',
    quote: 'Todos tienen que pasar por The Sapients porque es base fundamental para quienes quieren crear cosas grandes en la Tierra.',
    image: thiagoImg
  },
  {
    name: 'Raquel Tavolazzi',
    country: 'Brasil',
    role: 'Cocreadora de Nitro 10X',
    quote: 'Elegí a Cash Luna como mi mentor porque veo en él integridad y riqueza en todas las áreas: espiritual, familiar, financiera y de salud.',
    image: raquelImg
  },
  {
    name: 'Pyero Tavolazzi',
    country: 'Brasil',
    role: 'Creador de Nitro 10X',
    quote: 'Tuve una expansión en mi mente y claridad sobre la sabiduría en la construcción de riqueza. Me llevó a un nuevo nivel de fe y entendimiento.',
    image: pyeroImg
  },
  {
    name: 'Otoniel Font',
    country: 'Puerto Rico',
    role: 'Pastor y Autor',
    quote: 'The Sapients va a transformarlo todo. Es algo increíble: te ensancha la mente, te devuelve un sueño, te regresa a todo lo grande que algún día creíste y te da toda esa fuerza de parte de Dios.',
    image: otonielImg
  },
  {
    name: 'Chris Méndez',
    country: 'Argentina',
    role: 'Pastor Hillsong América Latina',
    quote: 'Me sentí totalmente desafiado porque uno puede tener fe para creer todo lo que Dios tiene para nosotros, pero la fe tiene que caminar junto a la sabiduría para administrar y cuidar lo que Él nos da.',
    image: chrisImg
  },
  {
    name: 'Pepe Caceros',
    country: 'Guatemala',
    role: 'Partner Lenovo, HPE & Apple',
    quote: 'Lo más importante es que la información viene de la fuente correcta: no solo de una persona que es testimonio vivo de lo que ha aprendido y de lo que enseña, sino además de la fuente más importante: la sabiduría de Dios.',
    image: pepeImg
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
          <div className="relative w-full h-[600px] md:h-[680px] mt-8 grid place-items-center">
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
                  className="col-start-1 row-start-1 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] cursor-pointer"
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
                  <div className={`relative w-full h-[550px] md:h-[620px] rounded-[2.5rem] flex flex-col transition-all duration-500 overflow-hidden bg-gradient-to-br from-carbon-surface to-[#050505]
                    ${isCenter ? 'border border-primary/30 shadow-[0_20px_80px_rgba(212,175,55,0.15)]' : 'border border-white/5 shadow-none'}`}>
                    
                    {/* The Central Portrait Image */}
                    <div className="absolute top-[8%] left-[15%] right-[15%] bottom-[26%] rounded-[2rem] overflow-hidden shadow-2xl z-0 border border-white/5">
                      <Image src={t.image} alt={t.name} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                      {/* Subtle dark gradient overlay at the bottom to ensure text readability if it overlaps */}
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon-void/90 via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 w-full h-full flex flex-col p-6 sm:p-8">
                      
                      {/* Name - Top Left */}
                      <div className="pt-2 sm:pt-4 pointer-events-none">
                        <h3 className="flex flex-col text-left drop-shadow-2xl">
                          <span className="font-serif italic text-4xl sm:text-5xl text-white/90" style={{ fontFamily: 'Georgia, serif' }}>
                            {t.name.split(' ')[0]}
                          </span>
                          <span className="font-headline-sm text-2xl sm:text-3xl text-white font-black uppercase tracking-[0.2em] -mt-1">
                            {t.name.split(' ').slice(1).join(' ')}
                          </span>
                        </h3>
                      </div>

                      {/* Graphic lines container */}
                      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
                        {/* Vertical line: starts below name, goes down */}
                        <div className="absolute left-[36px] sm:left-[44px] top-[100px] sm:top-[115px] bottom-[28%] w-[2px] bg-white"></div>
                        {/* Horizontal line: connects from vertical line to the right role text */}
                        <div className="absolute left-[36px] sm:left-[44px] right-[40%] bottom-[28%] h-[2px] bg-white"></div>
                      </div>

                      {/* Role & Country - Bottom Right of Image */}
                      <div className="absolute bottom-[28%] right-6 sm:right-8 z-10 flex flex-col items-end pointer-events-none">
                        <div className="text-right flex flex-col drop-shadow-2xl max-w-[180px]">
                          <span className="font-bold text-white uppercase text-sm sm:text-base leading-tight tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {t.role}
                          </span>
                          <span className="text-primary text-[10px] sm:text-xs mt-1 font-bold tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {t.country}
                          </span>
                        </div>
                      </div>

                      {/* The Quote - Bottom */}
                      <div className="mt-auto relative z-20 w-full bg-carbon-surface/90 backdrop-blur-xl rounded-2xl border border-white/5 p-4 sm:p-5 shadow-2xl">
                        <svg className="w-5 h-5 text-primary/40 absolute -top-2.5 -left-2 bg-[#050505] rounded-full p-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p className={`font-body-md text-sm sm:text-[15px] leading-relaxed text-center italic transition-colors duration-500 ${isCenter ? 'text-white/90' : 'text-white/40'}`}>
                          "{t.quote}"
                        </p>
                      </div>

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
