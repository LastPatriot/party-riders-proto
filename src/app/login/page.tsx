"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEventStore } from '@/lib/store';
import { Heart, ArrowRight, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const event = useEventStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      event.updateEventDetails({ isAuthenticated: true });
      router.push('/selection');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-[1.2rem] flex items-center justify-center mb-8 shadow-2xl rotate-3">
            <Heart className="w-7 h-7 text-[#d4af37]" fill="currentColor" />
          </div>
          <h2 className="text-4xl font-serif italic tracking-tighter mb-3 leading-none">The Sovereign Union</h2>
          <p className="text-zinc-400 text-sm font-medium italic tracking-tight">Private Identity Authentication</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-200 rounded-[2.5rem] shadow-premium overflow-hidden p-10"
        >
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 ml-1">Identity Signature</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                  <input 
                    required
                    type="email" 
                    placeholder="you@sovereign.io" 
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-zinc-50 border-none outline-none focus:ring-1 focus:ring-zinc-900 transition-all text-sm font-bold placeholder:text-zinc-200" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 ml-1">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-zinc-50 border-none outline-none focus:ring-1 focus:ring-zinc-900 transition-all text-sm font-bold placeholder:text-zinc-200" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : (
                <>Enter Workspace <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-50 text-center">
            <p className="text-xs text-zinc-400 font-medium">New to PartyRiders? <span className="text-zinc-900 font-bold cursor-pointer hover:underline underline-offset-4">Register Identity</span></p>
          </div>
        </motion.div>
        
        <p className="text-center text-[10px] text-zinc-300 font-bold uppercase tracking-widest mt-12 opacity-50">
          Secured by PartyRiders Cryptographic Protocol
        </p>
      </div>
    </div>
  );
}
