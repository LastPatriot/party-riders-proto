"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEventStore } from '@/lib/store';
import { Gift, Heart, ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function GuestRegistryPage() {
  const event = useEventStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amount, setAmount] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');

  const handleContribute = () => {
    if (!selectedItem || !amount || !guestName) return;
    
    event.contributeToRegistry({
      guestName,
      amount: parseInt(amount),
      itemId: selectedItem.id
    });

    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setSelectedItem(null);
    setAmount('');
    setGuestName('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="space-y-4 text-center md:text-left">
              <Link href="/rsvp" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-2 mb-8">
                 <ChevronLeft className="w-3 h-3" /> Back to Invitation
              </Link>
              <h1 className="text-6xl font-serif italic tracking-tighter leading-none">The Registry</h1>
              <p className="text-zinc-400 text-xl font-light italic">Support the union of {event.coupleNames}.</p>
           </div>
           <div className="bg-white border border-zinc-200 p-8 rounded-[2.5rem] shadow-subtle text-center md:text-right min-w-[240px]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-2">Total Contributions</p>
              <p className="text-4xl font-bold tracking-tighter leading-none italic">
                 ₦{event.registryItems.reduce((acc, i) => acc + i.contributed, 0).toLocaleString()}
              </p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
           {event.registryItems.map(item => (
             <div key={item.id} className="bg-white rounded-[4rem] workspace-border p-0 group relative overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-700">
                <div className="flex flex-col xl:flex-row h-full">
                   <div className="w-full xl:w-2/5 overflow-hidden h-[300px] xl:h-auto relative">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[3s]" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                   </div>
                   <div className="w-full xl:w-3/5 p-12 flex flex-col justify-between relative bg-white">
                      <div className="space-y-6">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-200 leading-none">Wishlist Item</span>
                         </div>
                         <div>
                            <h3 className="text-4xl font-serif italic mb-2 tracking-tight leading-none">{item.name}</h3>
                            <div className="mt-6 space-y-2">
                               <div className="flex justify-between items-end">
                                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Progress</p>
                                  <p className="text-sm font-bold tracking-tight">
                                     ₦{item.contributed.toLocaleString()} <span className="text-zinc-300 font-normal">/ ₦{item.price.toLocaleString()}</span>
                                  </p>
                               </div>
                               <div className="h-1.5 w-full bg-zinc-50 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${Math.min((item.contributed/item.price)*100, 100)}%` }} 
                                    className="h-full bg-zinc-900" 
                                  />
                               </div>
                            </div>
                         </div>
                      </div>
                      <button 
                        onClick={() => setSelectedItem(item)}
                        className="w-full bg-zinc-900 text-white py-6 rounded-[2rem] shadow-2xl hover:bg-zinc-800 font-bold uppercase tracking-[0.2em] text-xs transition-all active:scale-95 mt-10"
                      >
                         Contribute to Item
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="pt-20 border-t border-zinc-100">
           <div className="max-w-2xl mx-auto space-y-12">
              <h2 className="text-3xl font-serif italic text-center">Recent Contributions</h2>
              <div className="space-y-4">
                 {event.contributions.length === 0 ? (
                   <p className="text-center text-zinc-300 italic py-10">Be the first to contribute to their new life together.</p>
                 ) : (
                   event.contributions.map(c => (
                     <div key={c.id} className="bg-white p-6 rounded-2xl workspace-border flex justify-between items-center shadow-subtle">
                        <div className="flex items-center gap-5">
                           <div className="w-10 h-10 bg-zinc-50 rounded-full grid place-items-center"><Heart className="w-4 h-4 text-zinc-300" /></div>
                           <div>
                              <p className="text-sm font-bold text-zinc-900">{c.guestName}</p>
                              <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest italic">Contributed to {event.registryItems.find(i => i.id === c.itemId)?.name}</p>
                           </div>
                        </div>
                        <p className="text-lg font-bold tracking-tighter">₦{c.amount.toLocaleString()}</p>
                     </div>
                   ))
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Contribution Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-zinc-900/90 backdrop-blur-md grid place-items-center p-6"
          >
             <motion.div 
               initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
               className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent opacity-[0.05] blur-3xl rounded-full" />
                <h3 className="text-3xl font-serif italic mb-8 tracking-tight">Contribute Fund</h3>
                <div className="space-y-6 relative z-10">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 ml-1">Your Name</label>
                      <input 
                        value={guestName} onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Chief Emmanuel Adeyemi" className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none outline-none focus:ring-1 focus:ring-zinc-900 transition-all font-bold text-sm" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 ml-1">Amount (₦)</label>
                      <input 
                        type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                        placeholder="50,000" className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none outline-none focus:ring-1 focus:ring-zinc-900 transition-all font-bold text-sm" 
                      />
                   </div>
                   <div className="pt-4 flex gap-3">
                      <button onClick={() => setSelectedItem(null)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Cancel</button>
                      <button 
                        onClick={handleContribute}
                        className="flex-[2] bg-zinc-900 text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-zinc-800 transition-all"
                      >
                         Seal Contribution
                      </button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
