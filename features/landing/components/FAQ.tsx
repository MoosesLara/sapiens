'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: '¿Cuánto dura The Sapients® y cuándo es?',
    answer: (
      <>
        <strong className="text-white">Duración:</strong> 3 días intensivos de inmersión total.<br/>
        <strong className="text-white">Próxima fecha:</strong> 18, 19 y 20 de noviembre de 2026.<br/>
        <strong className="text-white">Horario:</strong> De 9:00 a.m. a 5:00 p.m. cada jornada.
      </>
    )
  },
  {
    question: '¿En dónde será realizado el evento?',
    answer: (
      <>
        <strong className="text-white">Lugar:</strong> Las Cumbres Convention Center, km. 17 a San José Pinula, Guatemala.<br/>
        <strong className="text-white">Modalidad:</strong> 100% presencial para preservar la transferencia de sabiduría y networking de alto nivel.
      </>
    )
  },
  {
    question: '¿Cuáles son las formas de pago?',
    answer: (
      <>El sistema de admisión procesa pagos seguros internacionales a través de tarjeta de crédito o débito (Visa, Mastercard, American Express). Si requieres soporte de facturación o pago corporativo, puedes coordinarlo vía <a href="https://wa.me/50239601672?text=Hola%2C%20me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20programa%20The%20Sapients.%20Quisiera%20conocer%20los%20detalles%20de%20inscripci%C3%B3n%20y%20los%20pr%C3%B3ximos%20pasos%20para%20asegurar%20mi%20acceso." target="_blank" rel="noopener noreferrer" className="text-[#B88E52] hover:underline">WhatsApp</a>.</>
    )
  },
  {
    question: '¿Qué incluye tu inscripción oficial?',
    answer: (
      <ul className="text-base text-white/50 font-light space-y-2 mt-2">
        <li>• Libro físico oficial The Sapients® (200+ páginas).</li>
        <li>• Acceso al devocional digital de 21 días de sabiduría.</li>
        <li>• Acceso presencial a las 18 Master Classes.</li>
        <li>• Coffee Break ejecutivo los 3 días del evento.</li>
        <li>• Parqueo seguro incluido durante todo el evento.</li>
        <li>• Asiento cómodo con excelente visual y acústica.</li>
        <li>• Traducción simultánea (si aplica).</li>
      </ul>
    )
  }
];

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
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring" as any, damping: 25, stiffness: 100 } 
  }
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // All items closed by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/*  SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQ INTERACTIVO)  */}
      <section id="preguntas-frecuentes" className="w-full bg-carbon-surface py-32 px-6 lg:px-12 border-t border-white/5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-[90%] max-w-[1200px] mx-auto"
        >
          
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-primary font-bold">
              Claridad Absoluta
            </span>
            <h2 className="text-4xl md:text-6xl uppercase text-white font-medium mt-6 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg md:text-xl text-white/50 mt-6 font-light">
              Respuestas a las consultas sobre la experiencia The Sapients 2026.
            </p>
          </motion.div>

          {/*  Accordion List - Editorial Design  */}
          <motion.div variants={itemVariants} className="border-t border-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-white/10 transition-colors hover:bg-white/[0.02]">
                  <button 
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-8 px-4 md:px-8 text-left"
                  >
                    <h3 className="text-lg md:text-2xl uppercase text-white font-medium tracking-wide pr-8">
                      {faq.question}
                    </h3>
                    <div className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 md:px-8 pb-8 text-base md:text-lg text-white/50 font-light leading-relaxed max-w-4xl">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
          
        </motion.div>
      </section>
    </>
  );
}
