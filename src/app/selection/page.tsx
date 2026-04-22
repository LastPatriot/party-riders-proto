"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEventStore } from '@/lib/store';
import { Plus, Search, Sparkles, Globe, Lock, Heart } from 'lucide-react';

export default function SelectionPage() {
  const router = useRouter();
  const event = useEventStore();

  const handleHostAction = () => {
    if (event.hasInitialized) {
      router.push('/dashboard');
    } else {
      // Transition to a view where they start setup
      // For simplicity in this prototype, we'll mark as setup started
      router.push('/?state=setup'); // Redirect back to root with setup flag
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-16">
        <div className="text-center space-y-4">
           <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Heart className="w-6 h-6 text-[#d4af37]" fill="currentColor" />
           </div>
           <h1 className="text-6xl font-serif italic tracking-tighter leading-none">Choose your path</h1>
           <p className="text-zinc-400 text-xl font-light italic">Are you hosting a masterpiece or joining a celebration?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
           {/* HOST CARD */}
           <motion.div 
             whileHover={{ y: -12, scale: 1.02 }}
             onClick={handleHostAction}
             className="bg-zinc-900 rounded-[4rem] p-16 cursor-pointer group shadow-2xl relative overflow-hidden"
           >
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center backdrop-blur-xl group-hover:rotate-6 transition-all duration-500">
                    <Plus className="w-8 h-8 text-[#d4af37]" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-white text-4xl font-serif italic tracking-tight">Host an Event</h2>
                    <p className="text-zinc-400 text-lg font-light leading-relaxed italic">Initialize a new sovereign workspace. Create your registry, manage your budget, and proclaim your union.</p>
                 </div>
                 <div className="pt-8">
                    <span className="bg-[#d4af37] text-zinc-900 px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl">Start Proclamation</span>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37] opacity-[0.08] blur-[120px] rounded-full" />
           </motion.div>

           {/* GUEST CARD */}
           <motion.div 
             whileHover={{ y: -12, scale: 1.02 }}
             onClick={() => router.push('/rsvp')}
             className="bg-white border border-zinc-100 rounded-[4rem] p-16 cursor-pointer group shadow-premium relative overflow-hidden"
           >
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-zinc-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500">
                    <Search className="w-8 h-8" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-zinc-900 text-4xl font-serif italic tracking-tight">Join a Celebration</h2>
                    <p className="text-zinc-500 text-lg font-light leading-relaxed italic">Search for existing proclamations. RSVP to attend, browse the registry, and post to the celebration wall.</p>
                 </div>
                 <div className="pt-8">
                    <span className="bg-zinc-900 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl">Find Event</span>
                 </div>
              </div>
           </motion.div>
        </div>

        <div className="text-center pt-10 opacity-30 flex items-center justify-center gap-10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">PartyRiders OS</p>
           <div className="w-1 h-1 bg-zinc-400 rounded-full" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">Synchronized Session</p>
        </div>
      </div>
    </div>
  );
}
