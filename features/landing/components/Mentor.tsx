'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring" as any, damping: 25, stiffness: 100 } 
  }
};

export default function Mentor() {
  return (
    <>
      {/*  SECTION 5: EL MENTOR & PRODUCTO (TWO-COLUMN SPLIT SHOWCASE)  */}
      <section id="el-mentor" className="w-full bg-carbon-void py-32 px-6 lg:px-12 border-t border-white/5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-[90%] max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          
          {/*  Mentor Bio Column (Left)  */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-primary font-bold">
              El Mentor de Líderes
            </span>
            <h2 className="text-6xl md:text-8xl uppercase text-white font-medium mt-4 mb-6 tracking-tighter">
              Cash Luna
            </h2>
            <p className="text-xl md:text-3xl uppercase tracking-wide text-primary font-light mb-10 leading-snug">
              «Después de Dios, lo más importante son las personas.»
            </p>
            <p className="text-lg text-white/50 font-light leading-relaxed mb-6">
              Reconocido internacionalmente como líder de influencia y mentor multigeneracional. Fundador y pastor general de Casa de Dios en Guatemala, una de las congregaciones más influyentes del mundo hispanohablante con más de 25,000 miembros activos.
            </p>
            <p className="text-lg text-white/50 font-light leading-relaxed mb-16">
              Autor de best-sellers internacionales que han transformado millones de vidas, entre ellos <em className="text-white italic">En honor al Espíritu Santo</em>, <em className="text-white italic">22 días contigo, Espíritu Santo</em> y <em className="text-white italic">No es por vista</em>.
            </p>
            
            {/*  Social Reach Counter Bento (Editorial)  */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-0 border-y border-white/10 py-8 mb-12">
              <div className="text-center border-r border-white/10 last:border-0 sm:last:border-0">
                <div className="text-3xl md:text-4xl text-white font-light tracking-tight">+6.8M</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">Facebook</div>
              </div>
              <div className="text-center sm:border-r border-white/10 last:border-0 sm:last:border-0">
                <div className="text-3xl md:text-4xl text-white font-light tracking-tight">+3.2M</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">Instagram</div>
              </div>
              <div className="text-center border-r border-white/10 last:border-0 sm:last:border-0 pt-6 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <div className="text-3xl md:text-4xl text-white font-light tracking-tight">+2.0M</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">YouTube</div>
              </div>
              <div className="text-center pt-6 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <div className="text-3xl md:text-4xl text-white font-light tracking-tight">+1.2M</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">TikTok</div>
              </div>
            </div>

            <div className="flex items-center">
              <a className="inline-flex items-center gap-2 md:gap-4 px-6 py-4 md:px-8 md:py-5 rounded-none bg-primary text-carbon-void text-xs md:text-base uppercase tracking-[0.2em] font-bold transition-all hover:bg-primary-light hover:scale-[1.02]" href="#inscribirse-ahora">
                <span>Asegurar Asiento con el Mentor</span>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/*  Official Book & Kit Column (Right)  */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col">
            <div className="rounded-none border border-white/5 bg-carbon-surface p-10 lg:p-14 flex flex-col relative overflow-hidden">
              <span className="text-xs uppercase tracking-[0.3em] text-primary/80 font-bold mb-4">Material de Estudio Exclusivo</span>
              <h3 className="text-4xl uppercase text-white font-medium mb-3 tracking-wide">
                Libro Oficial The Sapients
              </h3>
              <p className="text-sm uppercase tracking-[0.1em] text-secondary-fixed mb-10">
                Incluido sin costo con tu registro
              </p>
              
              {/*  Book Graphic Mockup Area  */}
              <div className="w-full aspect-[4/3] rounded-none bg-carbon-void overflow-hidden relative shadow-2xl mb-10 border border-white/5">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt0kgPIWwbnjVq5iq6pLoX0ObKz6gm4KfqCo8A6HEfJCgRZB4o7O6IcLuN9_kCBlP1n_tLex6kX3uEXOO54bNs_9-0AYLfhFi39HSSLPOYcI2RUq1ujqek6hJozR6i8KFiZYlDub2hVZ-zITjTgTytleJWRyRGEaENZbMIXwkpvdbGntXjJoM4Qb4sMypLX3oA40z6bg6oEW43AJUGkBMUGROSJfDqsGIREnNYf9U" alt="Official book 'The Sapients' by Cash Luna" width={1200} height={800} className="w-full h-full object-cover" />
              </div>
              
              <p className="text-base text-white/50 font-light leading-relaxed mb-10">
                Más de 200 páginas de sabiduría práctica estructurada en los tres pilares del método: Riquezas, Honra y Vida. No es teoría académica; es un compendio de errores, aciertos y principios divinos probados a lo largo de 40 años de ministerio y liderazgo.
              </p>
              
              {/*  Kit Deliverables List  */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-4">
                  <div className="text-primary/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 font-light tracking-wide">Libro Físico de Edición Limitada en Tapa Dura</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-primary/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 font-light tracking-wide">Guía Devocional Intensiva: 21 Días de Sabiduría</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-primary/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 font-light tracking-wide">Cuaderno de Trabajo & Notas Estratégicas</span>
                </div>
              </div>
            </div>
          </motion.div>
          
        </motion.div>
      </section>
    </>
  );
}
