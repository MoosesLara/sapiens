'use client';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as any, damping: 25, stiffness: 120 } 
  }
};

export default function Pillars() {
  return (
    <>
      {/*  SECTION 4: THE 3 PILLARS (LOS 3 PILARES ESENCIALES)  */}
      <section id="los-3-pilares" className="w-full bg-carbon-void py-32 px-6 lg:px-12 relative overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-[90%] max-w-[1600px] mx-auto relative z-10"
        >
          
          {/*  Section Header  */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto mb-24">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-primary font-bold">
              Fundamento Bíblico y Financiero
            </span>
            <h2 className="text-5xl md:text-7xl uppercase text-white font-medium mt-6 tracking-tight">
              Los 3 Pilares<br />Esenciales
            </h2>
            <p className="text-xl md:text-2xl text-white/50 mt-8 font-light leading-relaxed max-w-2xl mx-auto">
              Dios te da el poder de generar riquezas de manera honorable, sin perder la vida.
            </p>
          </motion.div>

          {/*  3-Column Luxury Desktop Grid  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/*  Pillar I: Riquezas  */}
            <motion.article 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { type: "spring" as any, stiffness: 300 } }}
              className="rounded-none border border-white/5 bg-carbon-surface p-10 md:p-14 flex flex-col justify-between group hover:border-primary/30 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between mb-12">
                  <span className="text-6xl text-primary font-light tracking-tighter">01</span>
                  <div className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-primary/80 font-bold">Pilar I</span>
                <h3 className="text-3xl uppercase text-white font-medium mt-3 mb-6 tracking-wide">
                  Riquezas
                </h3>
                <p className="text-base text-white/50 font-light leading-relaxed mb-6">
                  Este pilar te enseñará que Dios les dio a las personas el poder de crear las riquezas y que estas no son malas cuando se conoce el propósito por el cual Él las pone en nuestras manos.
                </p>
                <p className="text-base text-white/50 font-light leading-relaxed">
                  Las riquezas se sienten cómodas en las manos de quienes saben para qué las da Dios; de lo contrario, les salen alas y vuelan. Aprenderás a valorar todo aquello que el dinero jamás podrá comprar.
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-2">Principio de Enfoque</span>
                <p className="text-sm uppercase tracking-[0.1em] text-primary font-bold">Mayordomía con Propósito Divino</p>
              </div>
            </motion.article>

            {/*  Pillar II: Honra  */}
            <motion.article 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { type: "spring" as any, stiffness: 300 } }}
              className="rounded-none border border-white/5 bg-carbon-surface p-10 md:p-14 flex flex-col justify-between group hover:border-secondary-fixed/30 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between mb-12">
                  <span className="text-6xl text-secondary-fixed font-light tracking-tighter">02</span>
                  <div className="text-secondary-fixed opacity-80 group-hover:opacity-100 transition-opacity">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-secondary-fixed/80 font-bold">Pilar II</span>
                <h3 className="text-3xl uppercase text-white font-medium mt-3 mb-6 tracking-wide">
                  Honra
                </h3>
                <p className="text-base text-white/50 font-light leading-relaxed mb-6">
                  La prosperidad que proviene de Dios consiste en mantener un perfecto equilibrio entre generar riquezas, vivir honorablemente y llevar una vida plena.
                </p>
                <p className="text-base text-white/50 font-light leading-relaxed">
                  Este pilar te enseñará que tu reputación y un buen nombre excede a todo lo material. Sin honra, cualquier acumulación material es efímera y autodestructiva.
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-2">Principio de Enfoque</span>
                <p className="text-sm uppercase tracking-[0.1em] text-secondary-fixed font-bold">Reputación y Buen Nombre</p>
              </div>
            </motion.article>

            {/*  Pillar III: Vida  */}
            <motion.article 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { type: "spring" as any, stiffness: 300 } }}
              className="rounded-none border border-white/5 bg-carbon-surface p-10 md:p-14 flex flex-col justify-between group hover:border-gold-light/30 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between mb-12">
                  <span className="text-6xl text-gold-light font-light tracking-tighter">03</span>
                  <div className="text-gold-light opacity-80 group-hover:opacity-100 transition-opacity">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-gold-light/80 font-bold">Pilar III</span>
                <h3 className="text-3xl uppercase text-white font-medium mt-3 mb-6 tracking-wide">
                  Vida
                </h3>
                <p className="text-base text-white/50 font-light leading-relaxed mb-6">
                  Descubrirás el verdadero sentido de la plenitud. Tu conciencia será liberada para gozar de una vida abundante en la tierra y eterna en los cielos.
                </p>
                <p className="text-base text-white/50 font-light leading-relaxed">
                  Disfrutar de la familia, la salud, los negocios y sus ganancias es un regalo de Dios que con The Sapients® aprenderás a destapar sin remordimiento ni culpa.
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-2">Principio de Enfoque</span>
                <p className="text-sm uppercase tracking-[0.1em] text-gold-light font-bold">Plenitud Familiar y Paz Mental</p>
              </div>
            </motion.article>

          </div>

          {/*  Scriptural Anchor Callout  */}
          <motion.div variants={itemVariants} className="mt-24 rounded-none border-t border-b border-primary/20 bg-gradient-to-r from-transparent via-primary/5 to-transparent py-16 px-8 text-center max-w-5xl mx-auto">
            <p className="text-2xl md:text-4xl text-primary font-light italic leading-relaxed">
              «Riquezas, honra y vida son la remuneración de la humildad y del temor de Jehová.»
            </p>
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-white/60 font-bold block mt-8">
              — Proverbios 22:4 RV1960
            </span>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
