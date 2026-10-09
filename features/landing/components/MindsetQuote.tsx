import Image from 'next/image';

export default function MindsetQuote() {
  return (
    <section className="w-full bg-carbon-void py-32 px-6 lg:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background massive quotation mark for editorial depth */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[40rem] leading-none text-white/5 font-serif select-none pointer-events-none">
        «
      </div>

      <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Top Quote Line */}
        <p className="text-lg md:text-2xl uppercase tracking-[0.15em] text-primary/80 font-light leading-relaxed max-w-4xl">
          Has conquistado mucho por fe: no<br className="hidden md:block" />
          lo pierdas por falta de sabiduría.
        </p>

        {/* Elegant Gradient Separator */}
        <div className="w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-10"></div>
        
        {/* Main Brand Statement */}
        <h2 className="text-2xl md:text-4xl uppercase tracking-[0.1em] text-primary font-medium leading-relaxed max-w-4xl">
          The Sapients® te ayudará<br className="hidden md:block" />
          a adquirir sabiduría para<br className="hidden md:block" />
          administrar aquello que<br className="hidden md:block" />
          conquistaste mediante la fe.
        </h2>
        
        {/* Signature */}
        <div className="mt-16 flex flex-col items-center">
          <span className="font-serif italic text-5xl md:text-7xl text-primary font-light -mb-2 pr-8">Cash</span>
          <span className="text-sm md:text-base uppercase tracking-[0.4em] text-primary font-bold">Luna</span>
        </div>

        {/* Thesis Banner - Radical Redesign (Zero rounded corners) */}
        <div className="w-full mt-32 border-t border-b border-white/10 bg-carbon-surface/30 py-16 px-8 md:px-16 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Transformación Estructural</span>
              <h2 className="text-4xl md:text-5xl text-white font-black uppercase tracking-tighter leading-none mb-6">Una Mentalidad Inusual</h2>
              <p className="text-lg text-white/60 font-light">
                El salto cuántico entre el esfuerzo exhaustivo y la mayordomía soberana.
              </p>
            </div>
            
            <div className="lg:col-span-7 pl-0 lg:pl-16 lg:border-l border-white/10">
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light italic">
                «Piensa, actúa y vive de manera diferente. Si deseas resultados inusuales, tendrás que convertirte en una persona inusual. <br/><br/><strong className="text-primary font-medium not-italic uppercase tracking-[0.15em] text-base md:text-lg block mt-4">The Sapients afectará tu estructura mental para que lo logres.</strong>»
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
