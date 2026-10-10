'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeads() {
      if (!supabase) {
        setError('Faltan credenciales de Supabase');
        setLoading(false);
        return;
      }
      
      const { data, error: sbError } = await supabase
        .from('leads')
        .select('*')
        .order('id', { ascending: false }); // Asumiendo que hay id, o puedes usar created_at

      if (sbError) {
        setError(sbError.message);
      } else {
        setLeads(data || []);
      }
      setLoading(false);
    }
    
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(search.toLowerCase()) || 
    lead.email?.toLowerCase().includes(search.toLowerCase()) ||
    lead.country?.toLowerCase().includes(search.toLowerCase())
  );

  // Estadísticas
  const totalLeads = leads.length;
  
  const getTopItem = (key: string) => {
    if (leads.length === 0) return '-';
    const counts = leads.reduce((acc, lead) => {
      acc[lead[key]] = (acc[lead[key]] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  const topCountry = getTopItem('country');
  const topSource = getTopItem('source');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 font-sans selection:bg-[#B88E52] selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B88E52]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#B88E52]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col h-full">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
              Sapiens <span className="text-[#B88E52]">HQ</span>
            </h1>
            <p className="text-white/50 text-sm tracking-widest uppercase">Base de datos central de Leads</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Buscar lead..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-[#B88E52] transition-colors placeholder:text-white/30"
            />
            <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Registros', value: totalLeads },
            { label: 'País Principal', value: topCountry },
            { label: 'Canal Principal', value: topSource }
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-[#B88E52]/50 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B88E52]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#B88E52]/20 transition-colors" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">{stat.label}</p>
              <p className="text-3xl font-black truncate">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Table Area */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40">
                  <th className="px-6 py-5 text-xs font-bold tracking-widest uppercase text-white/50">Nombre</th>
                  <th className="px-6 py-5 text-xs font-bold tracking-widest uppercase text-white/50">Contacto</th>
                  <th className="px-6 py-5 text-xs font-bold tracking-widest uppercase text-white/50">País</th>
                  <th className="px-6 py-5 text-xs font-bold tracking-widest uppercase text-white/50">Perfil</th>
                  <th className="px-6 py-5 text-xs font-bold tracking-widest uppercase text-white/50">Origen</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-white/50">
                      <div className="w-8 h-8 border-2 border-[#B88E52] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      Cargando base de datos...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-red-400">
                      Error: {error}. (Asegúrate de que RLS esté deshabilitado para lectura en Supabase)
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-white/50">
                      No se encontraron registros.
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredLeads.map((lead, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.02, 0.5) }}
                        key={lead.id || idx} 
                        className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm text-white group-hover:text-[#B88E52] transition-colors">{lead.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-white/90">{lead.email}</p>
                          <p className="text-xs text-white/50 mt-1">{lead.phone_code} {lead.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10">
                            {lead.country}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-white/70">{lead.profile}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-[#B88E52] font-bold uppercase tracking-wider">{lead.source}</p>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
