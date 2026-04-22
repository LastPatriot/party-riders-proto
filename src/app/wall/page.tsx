"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEventStore } from '@/lib/store';
import { 
  Heart, 
  MessageSquare, 
  Camera, 
  Plus, 
  Activity, 
  ShieldCheck, 
  Sparkles,
  Trophy,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WallPage() {
  const event = useEventStore();
  const [activeFilter, setFilter] = useState('all');
  const [lightboxPost, setLightbox] = useState<any>(null);

  const posts = [
    { id: 1, emoji: '💍', bg: 'linear-gradient(135deg,#18181b,#3f3f46)', name: 'Amaka Okonkwo', time: '2m ago', caption: 'The moment they exchanged rings! Congratulations Simi & Chukwu!', likes: 24, tag: 'Ceremony' },
    { id: 2, emoji: '🥂', bg: 'linear-gradient(135deg,#1c1917,#44403c)', name: 'Tunde Balogun', time: '8m ago', caption: 'Toast to the lovebirds! May your love be sweeter than jollof!', likes: 18, tag: 'Reception' },
    { id: 3, emoji: '💃', bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', name: 'Ngozi Eze', time: '15m ago', caption: 'Nobody told me Aunty Bisi could move like this!', likes: 41, tag: 'Dance Floor' },
    { id: 4, emoji: '👑', bg: 'linear-gradient(135deg,#18181b,#d4af37)', name: 'Chief Adeyemi', time: '22m ago', caption: 'My daughter, you have made us so proud today. God bless this union.', likes: 67, tag: 'Family' },
    { id: 5, emoji: '🎶', bg: 'linear-gradient(135deg,#0c4a6e,#075985)', name: 'Kunle Okafor', time: '30m ago', caption: 'The orchestra is absolutely killing it tonight!!', likes: 29, tag: 'Music' },
    { id: 6, emoji: '✨', bg: 'linear-gradient(135deg,#064e3b,#065f46)', name: 'Folake Adeyemi', time: '1h ago', caption: 'The décor is truly breathtaking. Every corner is a masterpiece.', likes: 52, tag: 'Atmosphere' },
  ];

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 }, colors: ['#18181b', '#d4af37'] });
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-6xl space-y-16">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="space-y-4 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37]">Live Celebration Wall</p>
              <h1 className="text-7xl font-serif italic tracking-tighter leading-none">{event.coupleNames}</h1>
              <div className="flex items-center gap-4 justify-center md:justify-start text-zinc-500 text-sm font-light italic">
                 <Users className="w-4 h-4" /> 148 Guests Active
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={() => { triggerConfetti(); }}
                className="bg-[#d4af37] text-zinc-900 px-8 py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-3 hover:opacity-90 transition-all"
              >
                 Post a Moment <Camera className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
           {['✨ All', '💍 Ceremony', '🎉 Reception', '🕺 Dance Floor'].map(f => (
             <button 
               key={f}
               onClick={() => setFilter(f.toLowerCase().replace('✨ ', ''))}
               className={`px-6 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f.toLowerCase().replace('✨ ', '') ? 'bg-zinc-100 border-zinc-100 text-zinc-900 shadow-xl' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
             >
                {f}
             </button>
           ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
           {posts.map(post => (
             <motion.div 
               key={post.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ y: -8 }}
               onClick={() => setLightbox(post)}
               className="break-inside-avoid bg-zinc-800/50 border border-zinc-800 rounded-[3rem] overflow-hidden cursor-pointer shadow-premium hover:shadow-2xl transition-all duration-700 relative group"
             >
                <div className="aspect-[4/5] flex items-center justify-center relative overflow-hidden" style={{ background: post.bg }}>
                   <span className="text-8xl z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-700">{post.emoji}</span>
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                <div className="p-10 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-zinc-700 grid place-items-center text-[10px] font-black">{post.name.charAt(0)}</div>
                      <div className="flex-1">
                         <p className="text-sm font-bold text-zinc-100">{post.name}</p>
                         <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{post.time}</p>
                      </div>
                   </div>
                   <p className="text-base font-serif italic text-zinc-400 leading-relaxed">&ldquo;{post.caption}&rdquo;</p>
                   <div className="flex items-center justify-between pt-6 border-t border-zinc-700/50">
                      <div className="flex gap-4">
                         <button className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#d4af37] transition-colors">
                            <Heart className="w-4 h-4" /> {post.likes}
                         </button>
                         <button className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#d4af37] transition-colors">
                            <MessageSquare className="w-4 h-4" /> 12
                         </button>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#d4af37]/60">{post.tag}</span>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPost && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] bg-zinc-950/95 backdrop-blur-2xl grid place-items-center p-6"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
               onClick={(e) => e.stopPropagation()}
               className="bg-zinc-900 w-full max-w-xl rounded-[4rem] overflow-hidden border border-zinc-800 shadow-[0_80px_150px_-40px_rgba(0,0,0,0.5)]"
             >
                <div className="aspect-video grid place-items-center relative" style={{ background: lightboxPost.bg }}>
                   <span className="text-[10rem] drop-shadow-2xl">{lightboxPost.emoji}</span>
                   <button onClick={() => setLightbox(null)} className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full grid place-items-center text-white backdrop-blur-md hover:bg-white/20 transition-all">✕</button>
                </div>
                <div className="p-16 space-y-8">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 grid place-items-center text-sm font-black">{lightboxPost.name.charAt(0)}</div>
                      <div>
                         <h3 className="text-xl font-bold">{lightboxPost.name}</h3>
                         <p className="text-xs text-zinc-500 uppercase tracking-widest">{lightboxPost.time}</p>
                      </div>
                   </div>
                   <p className="text-3xl font-serif italic text-zinc-100 leading-tight">&ldquo;{lightboxPost.caption}&rdquo;</p>
                   <div className="flex gap-4 pt-10">
                      <button onClick={triggerConfetti} className="flex-1 bg-[#d4af37] text-zinc-900 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all active:scale-95">React with Love</button>
                      <button className="flex-1 bg-zinc-800 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-zinc-700 transition-all">Comment</button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center opacity-20">
         <p className="text-[10px] font-black uppercase tracking-[0.5em]">PartyRiders Celebration Engine © 2026</p>
      </footer>
    </div>
  );
}
