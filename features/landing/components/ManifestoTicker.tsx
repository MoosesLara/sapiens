import Image from 'next/image';

export default function ManifestoTicker({ dict }: { dict: any }) {
  const words = dict.words;
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <section aria-label="Valores del movimiento" className="w-full overflow-hidden bg-carbon-void py-6 md:py-10 border-y border-white/5 relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      
      {/* Ticker Container - Must be wide enough to hold two identical halves */}
      <div className="flex w-max animate-marquee">
        
        {/* First Half */}
        <div className="flex whitespace-nowrap items-center px-10">
          {repeatedWords.map((word, idx) => (
            <span key={`first-${idx}`} className="text-2xl md:text-4xl uppercase tracking-[0.3em] font-medium text-primary/90 mx-10">
              {word}
            </span>
          ))}
        </div>
        
        {/* Second Half (Exact Duplicate for Seamless Loop) */}
        <div className="flex whitespace-nowrap items-center px-10">
          {repeatedWords.map((word, idx) => (
            <span key={`second-${idx}`} className="text-2xl md:text-4xl uppercase tracking-[0.3em] font-medium text-primary/90 mx-10">
              {word}
            </span>
          ))}
        </div>
        
      </div>
    </section>
  );
}
