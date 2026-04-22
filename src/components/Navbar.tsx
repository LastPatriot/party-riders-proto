"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, LayoutDashboard, Ticket, Camera, Settings, User, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEventStore } from '@/lib/store';

export default function Navbar() {
  const pathname = usePathname();
  const event = useEventStore();
  
  // Normalize pathname to handle trailing slashes
  const normalizedPath = pathname?.replace(/\/$/, '') || '/';
  
  const isMarketing = normalizedPath === '/' || 
                      normalizedPath === '' ||
                      normalizedPath === '/login' || 
                      normalizedPath === '/selection' || 
                      normalizedPath === '/discover';
                      
  const isSetup = normalizedPath === '/' && !event.hasInitialized && event.isAuthenticated;

  const navItems = [
    { name: 'Discover', href: '/discover', icon: Globe },
    { name: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
    { name: 'RSVP Portal', href: '/rsvp', icon: Ticket },
    { name: 'Celebration Wall', href: '/wall', icon: Camera },
  ];

  // Logic: Show restricted nav only if we are NOT on a marketing page AND NOT in setup mode
  const shouldShowRestrictedNav = !isMarketing && !isSetup;

  return (
    <nav className={`fixed top-0 inset-x-0 h-24 z-[100] transition-all duration-700 ${isMarketing ? 'bg-transparent' : 'glass-header shadow-sm'}`}>
      <div className="max-w-7xl mx-auto h-full px-12 flex items-center justify-between">
        <Link href="/" className="font-serif italic text-3xl font-bold tracking-tighter flex items-center gap-4 group text-zinc-900">
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl grid place-items-center shadow-2xl group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
             <Heart className="text-[#d4af37] w-6 h-6" fill="currentColor" />
          </div>
          <span>PartyRiders</span>
        </Link>
        
        {/* Navigation Items - Explicitly hidden on marketing and setup pages */}
        {shouldShowRestrictedNav && (
          <div className="hidden lg:flex items-center gap-2 bg-white/50 backdrop-blur-md border border-zinc-100 p-1.5 rounded-[2rem] shadow-sm">
            {navItems.map((item) => {
              const isActive = normalizedPath === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`relative px-6 py-2.5 rounded-[1.5rem] flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-900 hover:bg-white'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav"
                      className="absolute inset-0 bg-zinc-900 rounded-[1.5rem] -z-10 shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4af37]' : 'text-zinc-300'}`} />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Discover link for Landing page ONLY */}
        {(normalizedPath === '/' && !isSetup) && (
           <Link href="/discover" className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">
              <Globe className="w-4 h-4" /> Discover
           </Link>
        )}

        <div className="flex items-center gap-6">
          {event.isAuthenticated ? (
            <>
              {!isMarketing && (
                <button className="w-10 h-10 rounded-full border border-zinc-100 grid place-items-center text-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              )}
              <div className="h-10 w-10 rounded-xl bg-zinc-900 grid place-items-center shadow-lg hover:scale-105 transition-transform cursor-pointer border border-white/10">
                 <User className="text-[#d4af37] w-5 h-5" />
              </div>
            </>
          ) : (
             normalizedPath !== '/login' && (
               <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">
                  Sign In
               </Link>
             )
          )}
        </div>
      </div>
    </nav>
  );
}
