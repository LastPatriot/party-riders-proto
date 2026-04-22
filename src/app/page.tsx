"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEventStore } from '@/lib/store';
import { 
  Heart, 
  CheckCircle2,
  Lock,
  Globe,
  Building2,
  Utensils,
  Camera,
  Music4,
  Sparkles,
  ArrowRight,
  Users,
  Plus,
  ChevronRight,
  Search,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Gift,
  Calendar,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

type AppState = 'marketing' | 'auth' | 'setup';
type SetupStep = 1 | 2 | 3 | 4;

const PrimaryButton = ({ onClick, children, variant = 'primary', className = '', disabled = false }: any) => {
  const styles: any = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800",
    secondary: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50",
    gold: "bg-[#d4af37] text-zinc-900 hover:opacity-90"
  };
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-[1.2rem] text-sm font-bold transition-all shadow-subtle flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-zinc-50 font-serif italic text-2xl tracking-tighter">PartyRiders...</div>}>
      <LandingContent />
    </Suspense>
  );
}

function LandingContent() {
  const [appState, setAppState] = useState<AppState>('marketing');
  const [setupStep, setSetupStep] = useState<SetupStep>(1);
  const [role, setRole] = useState<'guest' | 'host'>('guest');
  const [newCatName, setNewCatName] = useState('');
  const [newCatAmount, setNewCatAmount] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const event = useEventStore();

  useEffect(() => {
    if (searchParams.get('state') === 'setup') {
      setAppState('setup');
    }
  }, [searchParams]);

  const handleLaunch = () => {
    event.updateEventDetails({ hasInitialized: true, hasCreatedEvent: true });
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 }, colors: ['#18181b', '#d4af37'] });
    setTimeout(() => router.push('/dashboard'), 600);
  };

  const handleHostLogin = () => {
    if (event.hasInitialized) {
      router.push('/dashboard');
    } else {
      setAppState('setup');
    }
  };

  const handleJoinAsGuest = () => {
    router.push('/rsvp');
  };


  const handleInitBlueprint = (budget: number) => {
    const lines = [
      { name: 'Venue', budgeted: budget * 0.40, spent: 0, color: '#18181b', status: 'Unpaid' },
      { name: 'Catering', budgeted: budget * 0.30, spent: 0, color: '#c5a059', status: 'Unpaid' },
      { name: 'Photography', budgeted: budget * 0.15, spent: 0, color: '#71717a', status: 'Unpaid' },
      { name: 'Decor', budgeted: budget * 0.15, spent: 0, color: '#d4d4d8', status: 'Unpaid' },
    ];
    event.updateEventDetails({ totalBudget: budget, budgetCategories: lines as any });
    setSetupStep(3);
  };

  const handleAddBudgetRow = () => {
    if (!newCatName || !newCatAmount) return;
    event.addBudgetCategory({
      name: newCatName,
      budgeted: parseInt(newCatAmount),
      spent: 0,
      color: '#71717a',
      status: 'Unpaid'
    });
    setNewCatName('');
    setNewCatAmount('');
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 selection:bg-zinc-200 overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* Marketing View */}
        {appState === 'marketing' && (
          <motion.div 
            key="marketing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
             {/* Hero Section */}
             <section className="max-w-7xl mx-auto px-6 py-32 md:py-48 flex flex-col items-center text-center space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-100 rounded-full border border-zinc-200 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"
                >
                   <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Nigeria&apos;s Premium Event OS
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-[0.9] max-w-5xl"
                >
                   Plan your union with <span className="text-[#d4af37]">absolute</span> clarity.
                </motion.h1>
                
                <motion.p 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                   className="text-zinc-500 text-xl md:text-2xl font-light italic max-w-2xl leading-relaxed"
                >
                   From high-fidelity budget blueprints to seamless guest admissions. PartyRiders is the sovereign workspace for the modern couple.
                </motion.p>
                
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                   className="flex flex-wrap justify-center gap-6 pt-8"
                >
                   <PrimaryButton className="!px-10 py-5 !rounded-[2rem] text-lg shadow-2xl" onClick={() => router.push('/login')}>
                      Enter the Workspace <ArrowRight className="w-5 h-5" />
                   </PrimaryButton>
                   <button 
                     onClick={() => router.push('/discover')}
                     className="px-10 py-5 rounded-[2rem] border border-zinc-200 font-bold text-lg hover:bg-zinc-100 transition-all flex items-center gap-2"
                   >
                      Discover Events <Globe className="w-5 h-5 text-zinc-300" />
                   </button>
                </motion.div>
             </section>

             {/* Features Grid */}
             <section className="w-full max-w-7xl mx-auto px-6 py-32 border-t border-zinc-100">
                <div className="grid md:grid-cols-3 gap-12">
                   {[
                     { icon: Zap, title: 'Budget Engine', desc: 'Excel-style financial planning with real-time liquidity tracking and allocation.' },
                     { icon: ShieldCheck, title: 'Gate Analytics', desc: 'Secure admission protocol with real-time guest enrollment and QR verification.' },
                     { icon: Gift, title: 'Registry Pool', desc: 'A sophisticated wishlist where patronage instantly converts to operational capital.' }
                   ].map((f, i) => (
                     <div key={i} className="space-y-6 group cursor-default">
                        <div className="w-14 h-14 bg-white border border-zinc-100 rounded-2xl grid place-items-center shadow-subtle group-hover:bg-zinc-900 transition-all duration-500">
                           <f.icon className="w-7 h-7 text-zinc-400 group-hover:text-white" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">{f.title}</h3>
                        <p className="text-zinc-500 leading-relaxed font-light italic">{f.desc}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Discover Segment */}
             <section className="w-full max-w-7xl mx-auto px-6 py-32 border-t border-zinc-100 space-y-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                   <div className="space-y-4 text-center md:text-left">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37]">Live Proclamations</p>
                      <h2 className="text-5xl font-serif italic tracking-tighter">Ongoing Celebrations</h2>
                   </div>
                   <button 
                     onClick={() => router.push('/discover')}
                     className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2"
                   >
                      View All Proclamations <ArrowRight className="w-4 h-4" />
                   </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                   {event.discoverableEvents.slice(0, 3).map((proclamation, i) => (
                     <motion.div 
                       key={proclamation.id}
                       whileHover={{ y: -10 }}
                       onClick={() => {
                          event.setActiveEvent(proclamation.id);
                          router.push('/rsvp');
                       }}
                       className="bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden cursor-pointer group shadow-subtle hover:shadow-premium transition-all duration-700"
                     >
                        <div className="aspect-[4/3] overflow-hidden relative">
                           <img src={proclamation.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt={proclamation.coupleNames} />
                           <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-40" />
                        </div>
                        <div className="p-8 space-y-4">
                           <h3 className="text-2xl font-serif italic font-bold tracking-tight text-zinc-900">{proclamation.coupleNames}</h3>
                           <div className="flex items-center gap-4 text-zinc-400 text-xs italic">
                              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(proclamation.date).toLocaleDateString()}</div>
                              <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {proclamation.venue.split(',')[0]}</div>
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </section>

             {/* Join Section */}
             <section className="w-full bg-zinc-900 py-32 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20">
                   <div className="space-y-6 text-center md:text-left flex-1">
                      <h2 className="text-white text-5xl font-serif italic tracking-tighter leading-tight">Ready to witness <br/> a celebration?</h2>
                      <p className="text-zinc-400 text-lg font-light italic">Search for a royal proclamation or enter your secure invite code to access the guest portal.</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] w-full max-w-md backdrop-blur-xl space-y-8">
                      <div className="relative">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                         <input 
                           placeholder="Search couple name..." 
                           className="w-full bg-white/5 border-none outline-none pl-12 pr-4 py-5 rounded-2xl text-white font-bold placeholder:text-white/10 focus:ring-1 focus:ring-[#d4af37] transition-all" 
                         />
                      </div>
                       <PrimaryButton variant="gold" className="w-full py-5 !rounded-2xl" onClick={() => router.push('/discover')}>
                          Explore Proclamations <ArrowUpRight className="w-5 h-5" />
                       </PrimaryButton>
                   </div>
                </div>
             </section>
             
             <footer className="py-20 text-center opacity-30">
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">PartyRiders Ecosystem © 2026 · Lagos · London</p>
             </footer>
          </motion.div>
        )}

        {/* Auth View */}
        {appState === 'auth' && (
          <motion.div 
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 grid place-items-center bg-zinc-50 z-50 p-6"
          >
            <div className="w-full max-w-[440px] relative">
              <button 
                onClick={() => setAppState('marketing')}
                className="absolute -top-20 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-zinc-900 font-bold uppercase text-[10px] tracking-widest transition-all"
              >
                 ← Back to Website
              </button>
              
              <div className="bg-white border border-zinc-200 rounded-[2.5rem] shadow-premium overflow-hidden p-10 space-y-8">
                 <div className="flex bg-zinc-50 p-1.5 rounded-2xl border border-zinc-100">
                    <button 
                      onClick={() => setRole('guest')}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'guest' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'}`}
                    >
                       I&apos;m a Guest
                    </button>
                    <button 
                      onClick={() => setRole('host')}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'host' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'}`}
                    >
                       I&apos;m the Host
                    </button>
                 </div>

                 <AnimatePresence mode="wait">
                    {role === 'guest' ? (
                      <motion.div key="guest-flow" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                         <div className="space-y-2 text-center">
                            <h3 className="text-xl font-bold tracking-tight">Join a Celebration</h3>
                            <p className="text-xs text-zinc-400 font-light italic">Search by couple name or secure invite link.</p>
                         </div>
                         <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                            <input 
                              placeholder="e.g. Sebastian & Claire" 
                              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-zinc-50 border-none outline-none focus:ring-1 focus:ring-zinc-900 transition-all text-sm font-bold placeholder:text-zinc-200" 
                            />
                         </div>
                         <PrimaryButton className="w-full py-5 !rounded-2xl shadow-xl" onClick={() => router.push('/rsvp')}>
                            Access Portal
                         </PrimaryButton>
                      </motion.div>
                    ) : (
                      <motion.div key="host-flow" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                         <div className="space-y-5">
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-300 ml-1">Identity Signature</label>
                               <input type="email" placeholder="sovereign@union.io" className="w-full px-5 py-4 rounded-xl bg-zinc-50 border-none outline-none focus:ring-1 focus:ring-zinc-900 transition-all text-sm font-bold" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-300 ml-1">Secret Key</label>
                               <input type="password" placeholder="••••••••" className="w-full px-5 py-4 rounded-xl bg-zinc-50 border-none outline-none focus:ring-1 focus:ring-zinc-900 transition-all text-sm font-bold" />
                            </div>
                         </div>
                         <PrimaryButton className="w-full py-5 !rounded-2xl shadow-xl" onClick={handleHostLogin}>
                            Manage Workspace
                         </PrimaryButton>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* Setup Wizard */}
        {appState === 'setup' && (
          <motion.div 
            key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white z-[60] overflow-y-auto no-scrollbar py-20"
          >
             <div className="max-w-5xl mx-auto px-12 flex flex-col items-center">
                {/* Global Stepper Header */}
                <header className="w-full flex justify-between items-center mb-32">
                   <div className="font-serif italic text-3xl tracking-tighter">PartyRiders</div>
                   <div className="flex gap-6 items-center">
                      {[1, 2, 3, 4].map(step => (
                        <button 
                          key={step}
                          onClick={() => setSetupStep(step as any)}
                          className={`flex items-center gap-2 group transition-all ${setupStep === step ? 'opacity-100' : 'opacity-30'}`}
                        >
                           <span className={`w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-xs font-medium ${setupStep === step ? 'bg-zinc-900 text-white' : ''}`}>
                              {step}
                           </span>
                           <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                              {['Identity', 'Scaling', 'Blueprint', 'Visibility'][step-1]}
                           </span>
                        </button>
                      ))}
                   </div>
                </header>

                <div className="w-full flex justify-center">
                  <AnimatePresence mode="wait">
                    {setupStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-2xl space-y-20">
                         <div className="space-y-3 mb-12 text-center">
                           <h2 className="text-6xl font-serif italic tracking-tighter leading-none text-zinc-900">The Proclamation</h2>
                           <p className="text-zinc-400 text-xl font-light italic text-zinc-500">Define the core particulars of your sovereign union.</p>
                         </div>
                         <div className="space-y-16">
                            <div className="space-y-6">
                               <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-300 ml-2">Royal Couple Names</label>
                               <input 
                                 value={event.coupleNames}
                                 onChange={(e) => event.updateEventDetails({ coupleNames: e.target.value })}
                                 placeholder="e.g. Sebastian & Claire" 
                                 className="text-6xl font-serif italic border-b-2 border-zinc-100 w-full pb-8 outline-none focus:border-zinc-900 transition-all placeholder:text-zinc-100" 
                               />
                            </div>
                            <div className="grid grid-cols-2 gap-20">
                               <div className="space-y-6">
                                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-300 ml-2">The Appointed Day</label>
                                  <input type="date" value={event.eventDate} onChange={(e) => event.updateEventDetails({ eventDate: e.target.value })} className="text-2xl font-bold border-b-2 border-zinc-100 w-full pb-6 outline-none focus:border-zinc-900 transition-all" />
                               </div>
                               <div className="space-y-6">
                                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-300 ml-2">The Grand Venue</label>
                                  <input placeholder="Lagos, Nigeria" value={event.venue} onChange={(e) => event.updateEventDetails({ venue: e.target.value })} className="text-2xl font-bold border-b-2 border-zinc-100 w-full pb-6 outline-none focus:border-zinc-900 transition-all italic" />
                               </div>
                            </div>
                         </div>
                         <PrimaryButton 
                           onClick={() => setSetupStep(2)}
                           disabled={!event.coupleNames}
                           className="w-full py-8 text-2xl !rounded-[2rem]"
                         >
                           Continue to Scaling <ArrowRight className="w-8 h-8" />
                         </PrimaryButton>
                      </motion.div>
                    )}

                    {setupStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-4xl space-y-20">
                         <div className="space-y-3 mb-12 text-center">
                           <h2 className="text-6xl font-serif italic tracking-tighter leading-none text-zinc-900">The Magnitude</h2>
                           <p className="text-zinc-400 text-xl font-light italic text-zinc-500">Select the foundational reach of your royal assembly.</p>
                         </div>
                         <div className="grid md:grid-cols-2 gap-10">
                            {[
                              { name: 'Standard Landmark', budget: 15000000, guests: 250, desc: 'A curated grand assembly for the closest of kin.' },
                              { name: 'Imperial Estate', budget: 55000000, guests: 600, desc: 'An ultra-exclusive monumental experience of luxury.' }
                            ].map(t => (
                              <div 
                                key={t.name}
                                onClick={() => { event.updateEventDetails({ guestCount: t.guests }); handleInitBlueprint(t.budget); }}
                                className="bg-zinc-50/50 border border-zinc-100 p-14 rounded-[4rem] cursor-pointer group hover:bg-zinc-900 hover:text-white transition-all duration-700 hover:shadow-2xl"
                              >
                                 <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-12 shadow-sm group-hover:rotate-12 transition-transform">
                                    <Sparkles className="w-8 h-8 text-zinc-900" />
                                 </div>
                                 <h3 className="text-4xl font-serif italic mb-4 group-hover:text-white transition-colors">{t.name}</h3>
                                 <p className="text-zinc-400 text-lg mb-12 leading-relaxed italic group-hover:text-zinc-500">{t.desc}</p>
                                 <div className="text-5xl font-bold tracking-tighter group-hover:text-[#d4af37] transition-colors">₦{(t.budget/1000000).toFixed(0)}M</div>
                              </div>
                            ))}
                         </div>
                         <div className="flex justify-start">
                            <PrimaryButton variant="secondary" onClick={() => setSetupStep(1)}>
                               <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Back
                            </PrimaryButton>
                         </div>
                      </motion.div>
                    )}

                    {setupStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-6xl space-y-20">
                         <div className="text-center">
                            <h2 className="text-6xl font-serif italic tracking-tighter leading-none text-zinc-900">The Blueprint</h2>
                            <p className="text-zinc-400 text-xl font-light italic text-zinc-500">Your itemized sovereign financial allocations.</p>
                         </div>
                         <div className="grid lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-7 space-y-6">
                               {event.budgetCategories.map((line: any) => (
                                 <div key={line.name} className="flex items-center justify-between p-8 bg-zinc-50 rounded-[3rem] border border-zinc-100 hover:border-zinc-900 transition-all duration-500 group">
                                    <div className="flex items-center gap-8">
                                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: line.color }} />
                                       </div>
                                       <div>
                                          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-2 leading-none">{line.category || 'Allocation'}</p>
                                          <p className="text-2xl font-serif italic font-bold tracking-tight">{line.name}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                       <span className="text-[10px] font-black text-zinc-300 uppercase">₦</span>
                                       <input 
                                         type="number"
                                         value={line.budgeted}
                                         onChange={(e) => event.updateBudgetCategory(line.name, parseInt(e.target.value) || 0)}
                                         className="bg-transparent text-3xl font-bold tracking-tighter text-right outline-none w-40"
                                       />
                                    </div>
                                 </div>
                               ))}
                               <div className="p-8 bg-zinc-50 rounded-[3rem] border border-zinc-100 flex items-center gap-8">
                                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                     <Plus className="w-7 h-7 text-zinc-200" />
                                  </div>
                                  <input 
                                    placeholder="Add custom allocation..."
                                    value={newCatName}
                                    onChange={(e) => setNewCatName(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-2xl font-serif italic placeholder:text-zinc-200"
                                  />
                                  <div className="flex items-center gap-4">
                                     <input 
                                       placeholder="0"
                                       type="number"
                                       value={newCatAmount}
                                       onChange={(e) => setNewCatAmount(e.target.value)}
                                       onKeyDown={(e) => e.key === 'Enter' && handleAddBudgetRow()}
                                       className="bg-white border border-zinc-100 rounded-xl px-4 py-2 text-xl font-bold w-32 text-right"
                                     />
                                     <button onClick={handleAddBudgetRow} className="p-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all"><Plus className="w-5 h-5" /></button>
                                  </div>
                               </div>
                            </div>
                            <div className="lg:col-span-5">
                               <div className="bg-zinc-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
                                  <div className="relative z-10 space-y-12">
                                     <div>
                                        <label className="text-[11px] font-black uppercase tracking-[0.4em] opacity-30">Total Reservoir</label>
                                        <div className="text-6xl font-bold tracking-tighter text-[#d4af37] mt-4">₦{event.totalBudget.toLocaleString()}</div>
                                     </div>
                                     <div className="h-px bg-white/10" />
                                     <div className="space-y-10">
                                        <div>
                                           <label className="text-[11px] font-black uppercase tracking-[0.4em] opacity-30">Patronage Goal</label>
                                           <input 
                                             type="number" 
                                             value={event.guestCount}
                                             onChange={(e) => event.updateEventDetails({ guestCount: parseInt(e.target.value) || 0 })}
                                             className="bg-transparent text-5xl font-bold border-b-2 border-white/10 w-full outline-none focus:border-[#d4af37] py-2 mt-4" 
                                           />
                                        </div>
                                        <div>
                                           <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4af37]/60">Minimum Patronage</label>
                                           <div className="text-4xl font-bold tracking-tighter mt-2">₦{Math.round(event.totalBudget / (event.guestCount || 1)).toLocaleString()}</div>
                                        </div>
                                     </div>
                                  </div>
                                  <button onClick={() => setSetupStep(4)} className="relative z-10 w-full bg-white text-zinc-900 py-6 rounded-[2rem] font-bold text-xl mt-20 hover:bg-[#d4af37] transition-all">Seal & Proceed</button>
                                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37] opacity-10 blur-[120px] rounded-full" />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {setupStep === 4 && (
                      <motion.div key="step4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="w-full max-w-4xl space-y-20">
                         <div className="space-y-3 mb-12 text-center">
                           <h2 className="text-6xl font-serif italic tracking-tighter leading-none text-zinc-900">Visibility Policy</h2>
                           <p className="text-zinc-400 text-xl font-light italic text-zinc-500">Define the digital accessibility of your union.</p>
                         </div>
                         <div className="grid gap-10">
                            <div 
                              onClick={() => event.updateEventDetails({ isPublic: true })}
                              className={`p-14 rounded-[4rem] border-2 transition-all duration-700 flex items-center gap-12 cursor-pointer ${event.isPublic ? 'bg-zinc-900 border-zinc-900 text-white shadow-2xl scale-[1.03]' : 'bg-zinc-50 border-transparent hover:bg-zinc-100'}`}
                            >
                               <div className={`w-20 h-16 rounded-[2rem] flex items-center justify-center ${event.isPublic ? 'bg-accent/20 text-accent' : 'bg-white border border-zinc-100 shadow-sm'}`}>
                                  <Globe className="w-10 h-10" />
                               </div>
                               <div className="flex-1 text-left">
                                  <h3 className="text-3xl font-bold tracking-tight mb-2">Public Stream</h3>
                                  <p className={`text-lg font-light italic ${event.isPublic ? 'text-zinc-400' : 'text-zinc-500'}`}>The proclamation is discoverable for global patronage and funding.</p>
                               </div>
                               {event.isPublic && <CheckCircle2 className="w-10 h-10 text-accent" />}
                            </div>
                            <div 
                              onClick={() => event.updateEventDetails({ isPublic: false })}
                              className={`p-14 rounded-[4rem] border-2 transition-all duration-700 flex items-center gap-12 cursor-pointer ${!event.isPublic ? 'bg-zinc-900 border-zinc-900 text-white shadow-2xl scale-[1.03]' : 'bg-zinc-50 border-transparent hover:bg-zinc-100'}`}
                            >
                               <div className={`w-20 h-16 rounded-[2rem] flex items-center justify-center ${!event.isPublic ? 'bg-accent/20 text-accent' : 'bg-white border border-zinc-100 shadow-sm'}`}>
                                  <Lock className="w-10 h-10" />
                               </div>
                               <div className="flex-1 text-left">
                                  <h3 className="text-3xl font-bold tracking-tight mb-2">Encrypted Session</h3>
                                  <p className={`text-lg font-light italic ${!event.isPublic ? 'text-zinc-400' : 'text-zinc-500'}`}>Restricted access via unique, sovereign encrypted invite links only.</p>
                               </div>
                               {!event.isPublic && <CheckCircle2 className="w-10 h-10 text-accent" />}
                            </div>
                         </div>
                         <button 
                           onClick={handleLaunch}
                           className="w-full bg-zinc-900 text-white py-8 rounded-[2rem] text-3xl font-serif italic tracking-tight hover:shadow-2xl transition-all mt-10"
                         >
                           Enter Command Center
                         </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
