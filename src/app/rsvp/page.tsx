"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEventStore } from '@/lib/store';
import { 
  Heart, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Users, 
  ChevronRight, 
  ArrowRight,
  Gift,
  Search,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function RSVPPage() {
  const [screen, setScreen] = useState(1);
  const [attendance, setAttendance] = useState('yes');
  const [dietary, setDietary] = useState<string[]>(['Halal']);
  const [name, setName] = useState('Chief Emmanuel Adeyemi');

  const event = useEventStore();
  const activeProclamation = event.discoverableEvents.find(e => e.id === event.activeEventId) || event.discoverableEvents[0];

  const toggleDietary = (item: string) => {
    setDietary(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleConfirm = () => {
    if (attendance === 'yes') {
      event.addGuest({
        name,
        side: "Bride's",
        access: 'Gen',
        rsvp: 'Yes'
      });
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#18181b', '#d4af37'] });
      setScreen(3);
    } else {
      setScreen(1);
    }
  };

  const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="space-y-3 mb-12 text-center">
      <h2 className="text-5xl font-serif italic tracking-tighter leading-none">{title}</h2>
      <p className="text-zinc-400 text-lg font-light italic">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-3xl space-y-16">
        
        {/* Progress Nav */}
        <div className="flex justify-center gap-10 items-center mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex items-center gap-3 transition-all ${screen === s ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${screen >= s ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-300'}`}>
                {screen > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                {['Invitation', 'RSVP', 'Access Ticket'][s-1]}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {screen === 1 && (
            <motion.div key="invitation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
              <div className="bg-zinc-900 text-white p-16 rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
                 <div className="relative z-10 space-y-8">
                    <Heart className="w-12 h-12 text-[#d4af37] mx-auto animate-pulse" />
                    <h1 className="text-6xl font-serif italic tracking-tighter leading-tight text-white">
                      {activeProclamation.coupleNames.split(' & ')[0]} <span className="text-[#d4af37]">&</span> {activeProclamation.coupleNames.split(' & ')[1]}
                    </h1>
                    <p className="text-zinc-400 text-sm uppercase tracking-[0.4em] font-bold">Request the pleasure of your company</p>
                    <div className="h-px bg-white/10 w-24 mx-auto" />
                    <div className="flex justify-center gap-12 pt-4">
                       <div className="text-center">
                          <p className="text-3xl font-bold tracking-tighter text-white">{new Date(activeProclamation.date).getDate()}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]">{new Date(activeProclamation.date).toLocaleString('default', { month: 'short' })}</p>
                       </div>
                       <div className="text-center">
                          <p className="text-3xl font-bold tracking-tighter text-white">{new Date(activeProclamation.date).getFullYear()}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]">Year</p>
                       </div>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37] opacity-[0.08] blur-[120px] rounded-full" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="bg-white p-10 rounded-[3rem] workspace-border shadow-subtle space-y-6 text-zinc-900">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-zinc-50 rounded-xl grid place-items-center border border-zinc-100"><MapPin className="w-5 h-5 text-zinc-400" /></div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">The Venue</p>
                          <p className="text-lg font-serif italic font-bold">{activeProclamation.venue}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-zinc-50 rounded-xl grid place-items-center"><Users className="w-5 h-5 text-zinc-400" /></div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">Your Admission</p>
                          <p className="text-lg font-serif italic font-bold">Imperial Access · Table reserved</p>
                       </div>
                    </div>
                 </div>
                 <div className="flex flex-col justify-center gap-4">
                    <button onClick={() => setScreen(2)} className="w-full bg-zinc-900 text-white py-6 rounded-[2rem] font-bold text-xl shadow-2xl hover:bg-zinc-800 transition-all">
                       Accept Invitation <ArrowRight className="w-5 h-5 inline ml-2" />
                    </button>
                    <button className="w-full bg-white border border-zinc-200 py-4 rounded-[1.5rem] font-bold text-sm text-zinc-400 hover:text-zinc-900 transition-all">
                       Regretfully Decline
                    </button>
                 </div>
              </div>
            </motion.div>
          )}

          {screen === 2 && (
            <motion.div key="rsvp-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto w-full space-y-12">
               <SectionTitle title="Confirm Attendance" subtitle="Finalize your registry and dietary requirements." />
               
               <div className="bg-white border border-zinc-100 p-12 rounded-[4rem] shadow-premium space-y-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 ml-1">Full Legal Name</label>
                     <input 
                       value={name} onChange={(e) => setName(e.target.value)}
                       className="w-full text-4xl font-serif italic border-b-2 border-zinc-100 bg-transparent pb-4 outline-none focus:border-zinc-900 transition-all" 
                     />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                     <div 
                       onClick={() => setAttendance('yes')}
                       className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 text-center ${attendance === 'yes' ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl' : 'bg-zinc-50 border-transparent hover:bg-zinc-100'}`}
                     >
                        <Sparkles className={`w-8 h-8 mx-auto mb-4 ${attendance === 'yes' ? 'text-[#d4af37]' : 'text-zinc-300'}`} />
                        <span className="text-xs font-black uppercase tracking-widest">Attending</span>
                     </div>
                     <div 
                       onClick={() => setAttendance('no')}
                       className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 text-center ${attendance === 'no' ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl' : 'bg-zinc-50 border-transparent hover:bg-zinc-100'}`}
                     >
                        <Heart className={`w-8 h-8 mx-auto mb-4 ${attendance === 'no' ? 'text-[#d4af37]' : 'text-zinc-300'}`} />
                        <span className="text-xs font-black uppercase tracking-widest">Regrets</span>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 ml-1">Dietary Preferences</label>
                     <div className="flex flex-wrap gap-3">
                        {['Standard', 'Halal', 'Vegetarian', 'Vegan'].map(opt => (
                          <button 
                            key={opt}
                            onClick={() => toggleDietary(opt)}
                            className={`px-6 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${dietary.includes(opt) ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-300'}`}
                          >
                             {opt}
                          </button>
                        ))}
                     </div>
                  </div>
                  
                  <button onClick={handleConfirm} className="w-full bg-zinc-900 text-white py-6 rounded-[2rem] font-bold text-xl shadow-2xl hover:bg-zinc-800 transition-all mt-6">
                     Verify & Request Ticket
                  </button>
               </div>
            </motion.div>
          )}

          {screen === 3 && (
            <motion.div key="ticket" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto w-full space-y-12">
               <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full grid place-items-center mx-auto mb-6 shadow-xl shadow-green-500/20 animate-bounce">
                     <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-5xl font-serif italic tracking-tighter">You are Enrolled</h2>
                  <p className="text-zinc-400 italic">Ticket dispatched to your secure identity.</p>
               </div>

               <div className="bg-zinc-900 rounded-[4rem] p-1 shadow-2xl border-4 border-[#d4af37]/20">
                  <div className="bg-zinc-900 rounded-[3.8rem] p-10 space-y-12 relative overflow-hidden">
                     <div className="text-center relative z-10">
                        <Heart className="text-[#d4af37] w-10 h-10 mx-auto mb-6" fill="currentColor" />
                        <h3 className="text-white text-2xl font-serif italic tracking-tight">{event.coupleNames}</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37] mt-3">Sovereign Admission Pass</p>
                     </div>
                     
                     <div className="bg-white p-8 rounded-[3rem] shadow-inner grid place-items-center">
                        {/* Mock QR Code */}
                        <div className="w-48 h-48 bg-zinc-900 rounded-3xl p-6 grid grid-cols-4 gap-2 opacity-90">
                           {Array(16).fill(0).map((_, i) => (
                             <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-white/10'}`} />
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6 relative z-10">
                        <div className="flex justify-between border-b border-white/5 pb-4">
                           <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Patron</span>
                           <span className="text-sm font-bold text-white uppercase tracking-tight">{name}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Access</span>
                           <span className="text-sm font-bold text-[#d4af37] uppercase tracking-widest italic">Imperial Tier</span>
                        </div>
                     </div>
                     
                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] opacity-[0.05] blur-[80px] rounded-full" />
                  </div>
               </div>

               <div className="space-y-4">
                  <Link href="/registry" className="w-full bg-[#d4af37] text-zinc-900 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                     Visit Gift Registry <Gift className="w-5 h-5" />
                  </Link>
                  <button onClick={() => setScreen(1)} className="w-full text-zinc-400 font-bold uppercase text-[10px] tracking-widest hover:text-zinc-900 transition-colors">
                     Back to Invitation
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
