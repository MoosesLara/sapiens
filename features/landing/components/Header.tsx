'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import logoImg from '../../../public/logo.avif';

export default function Header({ dict, lang }: { dict?: any, lang?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Safe defaults if dict is not provided during transition
  const safeDict = dict || { nav: { home: 'Inicio', pillars: 'Los 3 Pilares', mentor: 'El Mentor', testimonials: 'Testimonios', book: 'Libro Oficial', faq: 'Preguntas Frecuentes' }, cta: 'Inscribirse Ahora' };
  const currentLang = lang || 'es';

  const router = useRouter();
  const pathname = usePathname() || '';
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: safeDict.nav.home, href: '#inicio' },
    { name: safeDict.nav.pillars, href: '#los-3-pilares' },
    { name: safeDict.nav.mentor, href: '#el-mentor' },
    { name: safeDict.nav.testimonials, href: '#testimonios' },
    { name: safeDict.nav.book, href: '#libro-oficial' },
    { name: safeDict.nav.faq, href: '#preguntas-frecuentes' },
  ];

  const languages = [
    { code: 'es', name: 'Español', displayCode: 'ES' },
    { code: 'en', name: 'English', displayCode: 'EN' },
    { code: 'pt', name: 'Português', displayCode: 'PT' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
    // Switch the locale prefix in the pathname
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLocale}`);
    router.push(newPathname || `/${newLocale}`);
  };

  // Smooth scroll to anchor — accounts for the fixed header height
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      const headerHeight = 96;
      const rawTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      // If the destination is within 150px of the very top, snap to 0
      // This prevents stopping "halfway" for sections near the top (e.g. #inicio)
      const top = rawTop <= 150 ? 0 : rawTop;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle body class so CSS can hide floating buttons when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => document.body.classList.remove('mobile-menu-open');
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-carbon-void/95 backdrop-blur-2xl shadow-[0_4px_32px_rgba(0,0,0,0.8)] border-b border-primary/20' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className={`w-[90%] max-w-[1600px] mx-auto flex items-center justify-between gap-4 transition-all duration-500 ${isScrolled ? 'h-20' : 'h-24'}`}>
          
          {/* Logo Section */}
          <a href="#inicio" onClick={(e) => handleSmoothScroll(e, '#inicio')} className="flex items-center gap-4 flex-shrink-0 group">
            <Image 
              src={logoImg} 
              alt="The Sapients Logo" 
              width={240} 
              height={48}  
              className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${isScrolled ? 'h-10 md:h-12' : 'h-16 md:h-20'}`} 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="font-label-md text-label-md uppercase text-on-surface-variant hover:text-on-surface transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Language Dropdown */}
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2.5 bg-carbon-surface/50 px-4 py-2 rounded-none border border-primary/30 text-on-surface-variant hover:text-text-primary hover:border-primary/80 hover:bg-carbon-surface transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="font-label-md text-label-md uppercase tracking-widest font-bold">{languages.find(l => l.code === currentLang)?.displayCode || 'ES'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-carbon-void border border-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.9)] rounded-none py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="w-full flex items-center justify-between px-5 py-3 hover:bg-primary/10 transition-colors"
                    >
                      <span className={`font-body-md text-body-md ${currentLang === lang.code ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{lang.name}</span>
                      {currentLang === lang.code && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <a 
              href="#inscribirse-ahora"
              onClick={(e) => handleSmoothScroll(e, '#inscribirse-ahora')}
              className="hidden md:inline-flex group items-center justify-center gap-2 px-4 py-2 lg:px-6 lg:py-2.5 rounded-none bg-gradient-to-r from-gold-light via-primary-container to-gold-deep text-carbon-void font-label-md lg:font-label-lg text-label-md lg:text-label-lg uppercase tracking-wider shadow-[0_4px_16px_rgba(237,192,111,0.25)] hover:brightness-110 hover:shadow-[0_4px_24px_rgba(237,192,111,0.4)] active:scale-[0.98] transition-all font-bold cursor-pointer"
            >
              <span>{safeDict.cta}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden flex items-center justify-center w-12 h-12 rounded-none bg-carbon-surface/50 border border-primary/30 text-text-primary hover:text-primary hover:bg-carbon-surface transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[49] bg-carbon-void/95 backdrop-blur-xl transition-all duration-300 xl:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-start w-full h-full overflow-y-auto pt-28 pb-12 px-6 gap-8">
          <nav className="flex flex-col items-center gap-6 w-[90%] max-w-[400px]">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="font-headline-md text-headline-md uppercase text-text-primary hover:text-primary transition-colors w-full text-center py-3 border-b border-primary/10 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex flex-col items-center gap-4 mt-8 w-[90%] max-w-[400px]">
            {languages.map((lang) => (
              <button 
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-6 py-4 border border-primary/20 rounded-none transition-colors ${currentLang === lang.code ? 'text-primary font-bold bg-primary/5' : 'text-on-surface-variant hover:bg-carbon-surface'}`}
              >
                <span className="font-label-lg">{lang.name}</span>
                {currentLang === lang.code && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>
            ))}
            
            {/* Mobile CTA Button */}
            <a 
              href="#inscribirse-ahora"
              onClick={(e) => handleSmoothScroll(e, '#inscribirse-ahora')}
              className="mt-6 group w-full flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-none bg-gradient-to-r from-gold-light via-primary-container to-gold-deep text-carbon-void font-label-md md:font-label-lg text-label-md md:text-label-lg uppercase tracking-wider shadow-[0_4px_16px_rgba(237,192,111,0.25)] hover:brightness-110 active:scale-[0.98] transition-all font-bold cursor-pointer"
            >
              <span>{safeDict.cta}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
