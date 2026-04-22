"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEventStore, Proclamation } from '@/lib/store';
import { Search, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function DiscoverPage() {
  const router = useRouter();
  const eventStore = useEventStore();

  const handleSelectEvent = (proclamation: Proclamation) => {
    eventStore.setActiveEvent(proclamation.id);
    router.push('/rsvp');
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
           <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full border border-zinc-200 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                 <Sparkles className="w-3 h-3 text-[#d4af37]" /> Active Proclamations
              </div>
              <h1 className="text-7xl font-serif italic tracking-tighter leading-none">Find a Celebration</h1>
              <p className="text-zinc-400 text-xl font-light italic">Witness the union of sovereign houses across the network.</p>
           </div>
           <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
              <input 
                placeholder="Search by couple name..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-zinc-100 outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all text-sm font-bold shadow-sm"
              />
           </div>
        </div>

        {/* Proclamation Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           {eventStore.discoverableEvents.map((proclamation, i) => (
             <motion.div 
               key={proclamation.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ y: -10 }}
               onClick={() => handleSelectEvent(proclamation)}
               className="bg-white rounded-[3rem] border border-zinc-100 overflow-hidden cursor-pointer group shadow-premium hover:shadow-2xl transition-all duration-700"
             >
                <div className="aspect-[4/3] overflow-hidden relative">
                   <img src={proclamation.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt={proclamation.coupleNames} />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-60" />
                   <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl border border-zinc-100">
                      Live RSVP
                   </div>
                </div>
                <div className="p-10 space-y-6">
                   <div className="space-y-2">
                      <h3 className="text-3xl font-serif italic font-bold tracking-tight text-zinc-900">{proclamation.coupleNames}</h3>
                      <div className="flex flex-col gap-1 text-zinc-400 text-sm font-medium italic">
                         <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" /> {new Date(proclamation.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                         </div>
                         <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" /> {proclamation.venue}
                         </div>
                      </div>
                   </div>
                   <div className="pt-6 border-t border-zinc-50 flex justify-between items-center group-hover:translate-x-2 transition-transform duration-500">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]">Witness Proclamation</span>
                      <ArrowRight className="w-5 h-5 text-zinc-900" />
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="py-20 text-center border-t border-zinc-100 opacity-20">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">PartyRiders Discovery Protocol · v1.0.4</p>
        </div>
      </div>
    </div>
  );
}
