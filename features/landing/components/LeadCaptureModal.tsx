'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export default function LeadCaptureModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phoneCode: '+502',
    phone: '',
    email: '',
    country: 'GT Guatemala',
    source: '',
    profile: ''
  });

  const profiles = [
    { 
      id: 'empresario', 
      title: 'Empresario y/o fundador', 
      desc: 'Propietario o socio de una empresa que ya opera y genera ventas.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/> 
    },
    { 
      id: 'emprendedor', 
      title: 'Emprendedor inicial', 
      desc: 'Desarrollador de un negocio que aún no genera ventas.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v8l9-11h-7z"/> 
    },
    { 
      id: 'pastor', 
      title: 'Pastor / Líder espiritual', 
      desc: 'Cabeza de una iglesia, ministerio o comunidad de fe.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/> 
    },
    { 
      id: 'ceo', 
      title: 'CEO / Director / Gerente', 
      desc: 'En una empresa de la que no es propietario.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/> 
    },
    { 
      id: 'profesional', 
      title: 'Profesional independiente', 
      desc: 'Prestación de servicios profesionales por cuenta propia.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> 
    },
    { 
      id: 'otro', 
      title: 'Otro (Especificar)', 
      desc: 'Ninguno de los perfiles anteriores me describe.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/> 
    }
  ];

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValidName = (name: string) => {
    const trimmed = name.trim();
    if (trimmed.length < 4) return false;
    if (!trimmed.includes(' ')) return false; // Requiere al menos nombre y apellido
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmed);
  };

  const isValidPhone = (phone: string) => {
    const numericPhone = phone.replace(/[^0-9]/g, '');
    return numericPhone.length >= 8 && numericPhone.length <= 15;
  };

  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const phoneCodes = [
    { code: '+502', label: 'GT +502' },
    { code: '+1', label: 'US +1' },
    { code: '+52', label: 'MX +52' },
    { code: '+57', label: 'CO +57' },
    { code: '+34', label: 'ES +34' },
    { code: '+54', label: 'AR +54' },
  ];

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countriesList = [
    'GT Guatemala',
    'US Estados Unidos',
    'MX Mexico',
    'CO Colombia',
    'ES España',
    'AR Argentina',
    'OT Otro País',
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 6));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setStep(1);
          setFormData({ name: '', phoneCode: '+502', phone: '', email: '', country: 'GT Guatemala', source: '', profile: '' });
          onClose();
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md cursor-auto"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[95%] max-w-lg bg-[#050505] border border-white/5 p-8 shadow-2xl cursor-auto rounded-none"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {!success ? (
              <div className="flex flex-col">
                {/* Progress Bar */}
                <div className="w-full h-[2px] bg-white/10 mb-8 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#B88E52]"
                    initial={{ width: '16.66%' }}
                    animate={{ width: `${(step / 6) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold mb-2">PASO 1 DE 6</span>
                      <h3 className="font-headline-sm text-3xl uppercase text-[#B88E52] font-medium mb-2">RESERVA TU LUGAR</h3>
                      <p className="text-white/60 text-sm mb-8 font-body-sm">Son 6 preguntas cortas. Menos de un minuto.</p>
                      
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-4 block font-bold">NOMBRE Y APELLIDOS</label>
                      <input 
                        autoFocus
                        value={formData.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        type="text" 
                        className={`w-full bg-transparent border-b pb-2 text-white text-lg focus:outline-none transition-colors placeholder:text-white/20 ${formData.name.trim().length > 0 && !isValidName(formData.name) ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-[#B88E52]'}`} 
                        placeholder="Tu nombre completo" 
                      />
                      <div className="min-h-[20px] mt-2">
                        {formData.name.trim().length > 0 && !isValidName(formData.name) && (
                          <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-red-400 text-xs font-body-sm block">
                            Ingresa tu nombre y apellido (solo letras).
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="mt-8 flex flex-col gap-6">
                        <button 
                          onClick={handleNext}
                          disabled={!isValidName(formData.name)}
                          className="self-start px-8 py-3 bg-[#B88E52] hover:bg-[#a37c44] text-black text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-50"
                        >
                          Continuar
                        </button>
                        <p className="text-xs text-white/40">¿Prefieres escribirnos directo? <a href="https://wa.me/50239601672?text=Hola%2C%20me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20programa%20The%20Sapients.%20Quisiera%20conocer%20los%20detalles%20de%20inscripci%C3%B3n%20y%20los%20pr%C3%B3ximos%20pasos%20para%20asegurar%20mi%20acceso." target="_blank" rel="noopener noreferrer" className="text-[#B88E52] hover:underline">Hablar por WhatsApp</a></p>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold mb-2">PASO 2 DE 6</span>
                      <h3 className="font-headline-sm text-3xl uppercase text-[#B88E52] font-medium mb-2">¿A QUÉ NÚMERO TE CONTACTAMOS?</h3>
                      <p className="text-white/60 text-sm mb-8 font-body-sm">Un asesor te va a escribir por WhatsApp.</p>
                      
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-4 block font-bold">NÚMERO DE TELÉFONO</label>
                      <div className="flex gap-4 items-end relative">
                        {/* Custom Dropdown */}
                        <div className="relative">
                          <button 
                            type="button"
                            onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                            className={`flex items-center gap-2 bg-transparent border-b pb-2 px-1 text-white text-lg focus:outline-none transition-colors w-28 hover:border-white/50 ${isPhoneDropdownOpen ? 'border-[#B88E52]' : 'border-white/20'}`}
                          >
                            <span>{phoneCodes.find(c => c.code === formData.phoneCode)?.label || 'Code'}</span>
                            <svg className={`w-4 h-4 ml-auto transition-transform ${isPhoneDropdownOpen ? 'rotate-180 text-[#B88E52]' : 'text-white/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                          </button>
                          
                          <AnimatePresence>
                            {isPhoneDropdownOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-2 w-36 bg-[#111] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
                              >
                                {phoneCodes.map((item) => (
                                  <button
                                    key={item.code}
                                    type="button"
                                    onClick={() => {
                                      updateForm('phoneCode', item.code);
                                      setIsPhoneDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${formData.phoneCode === item.code ? 'bg-[#B88E52]/20 text-[#B88E52]' : 'text-white hover:bg-white/10'}`}
                                  >
                                    {item.label}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Phone Input */}
                        <div className="flex-1 relative">
                          <input 
                            autoFocus
                            value={formData.phone}
                            onChange={(e) => {
                              // Solo permite números, espacios, guiones y paréntesis
                              const val = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
                              updateForm('phone', val);
                            }}
                            type="tel" 
                            className={`w-full bg-transparent border-b pb-2 text-white text-lg focus:outline-none transition-colors placeholder:text-white/20 ${formData.phone.length > 0 && !isValidPhone(formData.phone) ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-[#B88E52]'}`} 
                            placeholder="5555 5555" 
                          />
                        </div>
                      </div>
                      
                      <div className="min-h-[20px] mt-2">
                        {formData.phone.length > 0 && !isValidPhone(formData.phone) && (
                          <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-red-400 text-xs font-body-sm block">
                            Ingresa un número válido (mínimo 8 dígitos).
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="mt-8 flex items-center gap-6">
                        <button 
                          onClick={handleNext}
                          disabled={!isValidPhone(formData.phone)}
                          className="px-8 py-3 bg-[#B88E52] hover:bg-[#a37c44] text-black text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-50"
                        >
                          Continuar
                        </button>
                        <button onClick={handlePrev} className="text-xs text-white/50 uppercase tracking-widest hover:text-white transition-colors font-bold">Atrás</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold mb-2">PASO 3 DE 6</span>
                      <h3 className="font-headline-sm text-3xl uppercase text-[#B88E52] font-medium mb-2">TU CORREO ELECTRÓNICO</h3>
                      <p className="text-white/60 text-sm mb-8 font-body-sm">Ahí te llega la confirmación de tu inscripción.</p>
                      
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-4 block font-bold">CORREO ELECTRÓNICO</label>
                      <input 
                        autoFocus
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        type="email" 
                        className="w-full bg-[#EBF3FF] px-4 py-3 text-black text-lg focus:outline-none" 
                        placeholder="tu@correo.com" 
                      />
                      
                      <div className="mt-10 flex items-center gap-6">
                        <button 
                          onClick={handleNext}
                          disabled={!formData.email.trim() || !formData.email.includes('@')}
                          className="px-8 py-3 bg-[#B88E52] hover:bg-[#a37c44] text-black text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-50"
                        >
                          Continuar
                        </button>
                        <button onClick={handlePrev} className="text-xs text-white/50 uppercase tracking-widest hover:text-white transition-colors font-bold">Atrás</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold mb-2">PASO 4 DE 6</span>
                      <h3 className="font-headline-sm text-3xl uppercase text-[#B88E52] font-medium mb-2">¿DESDE QUÉ PAÍS NOS ESCRIBES?</h3>
                      <p className="text-white/60 text-sm mb-8 font-body-sm">Lo tomamos de tu número. Corrígelo si no es correcto.</p>
                      
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-4 block font-bold">PAÍS DE RESIDENCIA</label>
                      <div className="relative">
                        <button 
                          type="button"
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          className={`flex items-center gap-2 w-full bg-transparent border-b pb-2 px-1 text-white text-lg focus:outline-none transition-colors hover:border-white/50 ${isCountryDropdownOpen ? 'border-[#B88E52]' : 'border-white/20'}`}
                        >
                          <span>{formData.country || 'Selecciona tu país'}</span>
                          <svg className={`w-5 h-5 ml-auto transition-transform ${isCountryDropdownOpen ? 'rotate-180 text-[#B88E52]' : 'text-white/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        
                        <AnimatePresence>
                          {isCountryDropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 mt-2 w-full bg-[#111] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden max-h-48 overflow-y-auto custom-scrollbar"
                            >
                              {countriesList.map((country) => (
                                <button
                                  key={country}
                                  type="button"
                                  onClick={() => {
                                    updateForm('country', country);
                                    setIsCountryDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${formData.country === country ? 'bg-[#B88E52]/20 text-[#B88E52]' : 'text-white hover:bg-white/10'}`}
                                >
                                  {country}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="mt-10 flex items-center gap-6">
                        <button 
                          onClick={handleNext}
                          disabled={!formData.country}
                          className="px-8 py-3 bg-[#B88E52] hover:bg-[#a37c44] text-black text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-50"
                        >
                          Continuar
                        </button>
                        <button onClick={handlePrev} className="text-xs text-white/50 uppercase tracking-widest hover:text-white transition-colors font-bold">Atrás</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold mb-2">PASO 5 DE 6</span>
                      <h3 className="font-headline-sm text-3xl uppercase text-[#B88E52] font-medium mb-2 leading-tight">¿DÓNDE VISTE EL ANUNCIO?</h3>
                      <p className="text-white/60 text-sm mb-8 font-body-sm">Nos ayuda a saber qué está funcionando.</p>
                      
                      <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {['Facebook', 'Facebook Stories', 'Instagram', 'Instagram Stories', 'LinkedIn', 'YouTube', 'TikTok', 'X / Twitter', 'WhatsApp', 'Google', 'Referido', 'Otro'].map((src) => (
                          <label key={src} className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${formData.source === src ? 'border-[#B88E52] bg-[#B88E52]/10' : 'border-white/10 hover:border-white/30'}`}>
                            <input 
                              type="radio" 
                              name="source" 
                              value={src} 
                              checked={formData.source === src}
                              onChange={(e) => updateForm('source', e.target.value)}
                              className="hidden" 
                            />
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.source === src ? 'border-[#B88E52]' : 'border-white/30'}`}>
                              {formData.source === src && <div className="w-2 h-2 rounded-full bg-[#B88E52]" />}
                            </div>
                            <span className="text-white text-sm">{src}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex items-center gap-6">
                        <button 
                          onClick={handleNext}
                          disabled={!formData.source}
                          className="px-8 py-3 bg-[#B88E52] hover:bg-[#a37c44] text-black text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-50"
                        >
                          Continuar
                        </button>
                        <button onClick={handlePrev} className="text-xs text-white/50 uppercase tracking-widest hover:text-white transition-colors font-bold">Atrás</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 6 && (
                    <motion.div key="step6" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-bold mb-2">PASO 6 DE 6</span>
                      <h3 className="font-headline-sm text-2xl uppercase text-[#B88E52] font-medium mb-1 leading-tight">PERFIL PRINCIPAL</h3>
                      <p className="text-white/60 text-xs mb-6 font-body-sm">Seleccione la actividad a la que dedica más tiempo.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
                        {profiles.map((p) => (
                          <label 
                            key={p.id} 
                            className={`group relative flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-300 border border-white/5 overflow-hidden ${
                              formData.profile === p.title 
                                ? 'border-[#B88E52] bg-[#B88E52]/10 scale-[1.02]' 
                                : 'bg-white/5 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            {formData.profile === p.title && (
                              <motion.div layoutId="activeProfileGlow" className="absolute inset-0 bg-gradient-to-br from-[#B88E52]/20 to-transparent pointer-events-none" />
                            )}
                            
                            <div className="flex items-center gap-3 mb-2 relative z-10">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                                formData.profile === p.title ? 'bg-[#B88E52] text-black' : 'bg-black/50 text-[#B88E52] group-hover:bg-black'
                              }`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {p.icon}
                                </svg>
                              </div>
                              <span className={`text-sm font-bold transition-colors ${formData.profile === p.title ? 'text-white' : 'text-white/80'}`}>
                                {p.title}
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-white/50 leading-relaxed relative z-10 pl-11">
                              {p.desc}
                            </p>
                            
                            <input 
                              type="radio" 
                              name="profile" 
                              value={p.title} 
                              checked={formData.profile === p.title}
                              onChange={(e) => updateForm('profile', e.target.value)}
                              className="hidden" 
                            />
                            
                            {/* Subtle radio indicator */}
                            <div className="absolute top-4 right-4 z-10">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${formData.profile === p.title ? 'border-[#B88E52]' : 'border-white/20 group-hover:border-white/50'}`}>
                                <motion.div 
                                  initial={false}
                                  animate={{ scale: formData.profile === p.title ? 1 : 0 }}
                                  className="w-2 h-2 rounded-full bg-[#B88E52]"
                                />
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex flex-col gap-4">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={handleSubmit}
                            disabled={loading || !formData.profile}
                            className="px-8 py-3 bg-[#B88E52] hover:bg-[#a37c44] text-black text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                          >
                            {loading ? 'Procesando...' : 'RESERVAR MI LUGAR'}
                          </button>
                          <button onClick={handlePrev} className="text-xs text-white/50 uppercase tracking-widest hover:text-white transition-colors font-bold">Atrás</button>
                        </div>
                        <p className="text-[10px] text-white/40 leading-tight">
                          Al reservar tu lugar aceptas que un asesor de The Sapients te contacte por WhatsApp, llamada o correo.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-16 flex flex-col items-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                  className="w-24 h-24 rounded-full border-2 border-[#B88E52] text-[#B88E52] flex items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(184,142,82,0.2)]"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="absolute inset-0 bg-[#B88E52]/10 rounded-full"
                  />
                  <svg className="w-12 h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <motion.path 
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                       strokeLinecap="round" 
                       strokeLinejoin="round" 
                       strokeWidth="2.5" 
                       d="M5 13l4 4L19 7" 
                     />
                  </svg>
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="font-headline-sm text-3xl md:text-4xl uppercase text-[#B88E52] font-medium mb-4"
                >
                  ¡Registro Completado!
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="text-white/70 font-body-lg max-w-sm"
                >
                  Gracias, <strong className="text-white">{formData.name.split(' ')[0]}</strong>. Hemos recibido tu información. Muy pronto un asesor te contactará.
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
