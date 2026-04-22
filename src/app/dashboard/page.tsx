"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEventStore } from '@/lib/store';
import { 
  LayoutDashboard, Gift, Store, BarChart3, Settings,
  ShieldCheck, Wallet, ArrowRight, ArrowUpRight, Copy,
  CheckCircle2, Users, Building2, Utensils, Camera, MapPin, Calendar, Activity, Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

type OperationalView = 'overview' | 'blueprint' | 'registry' | 'vendors' | 'analytics' | 'settings';

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<OperationalView>('overview');
  const event = useEventStore();
  const router = useRouter();
  
  // Security Guard: Redirect if not initialized
  useEffect(() => {
    if (!event.hasInitialized) {
      router.push('/');
    }
  }, [event.hasInitialized, router]);

  const [wallet, setWallet] = useState(0);
  const [guestsPresent, setGuestsPresent] = useState(0);

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 }, colors: ['#18181b', '#c5a059'] });
  };

  const NavItem = ({ active, onClick, icon: Icon, label }: any) => (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all w-full text-sm font-medium ${
        active 
        ? 'bg-zinc-100 text-zinc-900' 
        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-zinc-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 fixed top-24 bottom-0 left-0 flex flex-col z-40">
         <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <p className="px-3 text-xs font-semibold text-zinc-400 mb-2">Workspace</p>
            <NavItem active={currentView === 'overview'} onClick={() => setCurrentView('overview')} icon={LayoutDashboard} label="Overview" />
            <NavItem active={currentView === 'blueprint'} onClick={() => setCurrentView('blueprint')} icon={Wallet} label="Budget & Expenses" />
            <NavItem active={currentView === 'registry'} onClick={() => setCurrentView('registry')} icon={Gift} label="Registry" />
            <NavItem active={currentView === 'vendors'} onClick={() => setCurrentView('vendors')} icon={Store} label="Vendors" />
            <NavItem active={currentView === 'analytics'} onClick={() => setCurrentView('analytics')} icon={BarChart3} label="Guest Analytics" />
         </div>
         <div className="p-4 border-t border-zinc-200">
            <NavItem active={currentView === 'settings'} onClick={() => setCurrentView('settings')} icon={Settings} label="Settings" />
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 pt-24 min-h-screen">
         <div className="max-w-5xl mx-auto">
           <AnimatePresence mode="wait">
              {currentView === 'overview' && (
                <motion.div key="view-overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                   
                   {/* Header Row */}
                   <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-1">Overview</h1>
                        <div className="flex items-center gap-3 text-sm text-zinc-500">
                           <MapPin className="w-4 h-4" /> {event.venue}
                           <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                           <Calendar className="w-4 h-4" /> {new Date(event.eventDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-3">
                         <button className="px-4 py-2 bg-white border border-zinc-200 shadow-subtle rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors">
                            Copy Invite Link
                         </button>
                         <button className="px-4 py-2 bg-zinc-900 text-white shadow-subtle rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
                            Go Live <ArrowUpRight className="w-4 h-4" />
                         </button>
                      </div>
                   </div>

                   {/* Key Metrics */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-subtle flex flex-col justify-between">
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-zinc-500">Total Budget</span>
                            <Wallet className="w-4 h-4 text-zinc-400" />
                         </div>
                         <div>
                            <div className="text-2xl font-semibold tracking-tight">₦{event.totalBudget.toLocaleString()}</div>
                            <div className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
                               <Activity className="w-3 h-3" /> On Track
                            </div>
                         </div>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-subtle flex flex-col justify-between">
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-zinc-500">Event Wallet</span>
                            <ShieldCheck className="w-4 h-4 text-zinc-400" />
                         </div>
                         <div>
                            <div className="text-2xl font-semibold tracking-tight">₦{wallet.toLocaleString()}</div>
                            <div className="text-xs font-medium text-zinc-500 mt-1">Available Liquidity</div>
                         </div>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-subtle flex flex-col justify-between">
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-zinc-500">RSVP Status</span>
                            <Users className="w-4 h-4 text-zinc-400" />
                         </div>
                         <div>
                            <div className="text-2xl font-semibold tracking-tight">{event.guests.length} / {event.guestCount}</div>
                            <div className="w-full h-1.5 bg-zinc-100 rounded-full mt-2 overflow-hidden">
                               <motion.div initial={{ width: 0 }} animate={{ width: `${(event.guests.length / (event.guestCount || 1)) * 100}%` }} className="h-full bg-zinc-900" />
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Budget Categories & Activity */}
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-8">
                         <div className="bg-white border border-zinc-200 rounded-xl shadow-subtle overflow-hidden h-full">
                            <div className="px-5 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                               <h3 className="text-sm font-semibold text-zinc-900">Financial Allocations</h3>
                               <button onClick={() => setCurrentView('blueprint')} className="text-xs font-medium text-zinc-500 hover:text-zinc-900">View All</button>
                            </div>
                            <div className="divide-y divide-zinc-100">
                               {event.budgetCategories.map(line => (
                                 <div key={line.name} className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: line.color }} />
                                       </div>
                                       <div>
                                          <p className="text-sm font-medium text-zinc-900">{line.name}</p>
                                          <p className="text-xs text-zinc-500">{line.status}</p>
                                       </div>
                                    </div>
                                    <p className="text-sm font-semibold text-zinc-900">₦{line.budgeted.toLocaleString()}</p>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="lg:col-span-4">
                         <div className="bg-white border border-zinc-200 rounded-xl shadow-subtle overflow-hidden h-full flex flex-col">
                            <div className="px-5 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                               <h3 className="text-sm font-semibold text-zinc-900">Recent Patronage</h3>
                               <Gift className="w-4 h-4 text-[#c5a059]" />
                            </div>
                            <div className="p-4 flex-1 space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                               {event.contributions.length === 0 ? (
                                 <div className="py-20 text-center">
                                    <Heart className="w-8 h-8 text-zinc-100 mx-auto mb-3" />
                                    <p className="text-xs text-zinc-400 italic">Awaiting first patronage.</p>
                                 </div>
                               ) : (
                                 event.contributions.map(c => (
                                   <div key={c.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg group hover:bg-zinc-900 hover:text-white transition-all duration-500">
                                      <div className="flex items-center gap-3">
                                         <div className="w-8 h-8 rounded-full bg-white border border-zinc-100 grid place-items-center text-zinc-400 group-hover:text-zinc-900"><Heart className="w-3 h-3" /></div>
                                         <div>
                                            <p className="text-xs font-bold leading-none mb-1">{c.guestName}</p>
                                            <p className="text-[9px] font-medium opacity-50 uppercase tracking-widest">{event.registryItems.find(i => i.id === c.itemId)?.name || 'Gift'}</p>
                                         </div>
                                      </div>
                                      <p className="text-xs font-black tracking-tight">₦{c.amount.toLocaleString()}</p>
                                   </div>
                                 ))
                               )}
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {currentView === 'registry' && (
                <motion.div key="view-registry" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                   <div className="flex justify-between items-end mb-8">
                      <div>
                         <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-1">Registry Pool</h2>
                         <p className="text-sm text-zinc-500">Manage incoming gifts and liquidity.</p>
                      </div>
                      <div className="px-4 py-2 bg-white border border-zinc-200 rounded-lg shadow-subtle">
                         <span className="text-xs font-medium text-zinc-500 mr-3">Available</span>
                         <span className="text-lg font-semibold">₦{wallet.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-6">
                      {event.registryItems.map(item => (
                        <div key={item.id} className="bg-white border border-zinc-200 rounded-xl shadow-subtle overflow-hidden flex flex-col group">
                           <div className="h-48 overflow-hidden relative">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              {item.status === 'completed' && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
                                   <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                                   <p className="text-sm font-semibold text-zinc-900">Liquidated</p>
                                </div>
                              )}
                           </div>
                           <div className="p-5 flex flex-col flex-1">
                              <div className="flex justify-between items-start mb-4">
                                 <div>
                                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Gift Item</p>
                                    <h3 className="text-base font-semibold text-zinc-900 line-clamp-1">{item.name}</h3>
                                 </div>
                                 <span className="text-xs font-medium bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">Received</span>
                              </div>
                              <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                                 <p className="text-lg font-semibold tracking-tight">₦{item.price.toLocaleString()}</p>
                                 <button 
                                   onClick={() => {
                                     event.liquidateRegistryItem(item.id);
                                     setWallet(w => w + item.price);
                                     triggerConfetti();
                                   }} 
                                   className="px-3 py-1.5 bg-zinc-900 text-white rounded-md text-xs font-medium hover:bg-zinc-800 transition-colors"
                                 >
                                    Liquidate
                                 </button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {currentView === 'analytics' && (
                <motion.div key="view-analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                   <div className="flex justify-between items-end">
                      <div>
                         <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-1">Gate Analytics</h2>
                         <p className="text-sm text-zinc-500">Real-time admission tracking.</p>
                      </div>
                      <div className="flex gap-3">
                         <button 
                           onClick={() => {
                              event.addGuest({ name: `Guest ${event.guests.length + 1}`, side: "Bride's", access: 'VIP', rsvp: 'Yes' });
                           }}
                           className="px-4 py-2 bg-white border border-zinc-200 shadow-subtle rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors"
                         >
                            Add Mock Guest
                         </button>
                         <button 
                           onClick={() => {
                             if (guestsPresent < event.guests.length) {
                               setGuestsPresent(p => p + 1);
                               triggerConfetti();
                             }
                           }} 
                           className="px-4 py-2 bg-zinc-900 text-white shadow-subtle rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
                         >
                            Simulate Scan
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-subtle">
                         <label className="text-sm font-medium text-zinc-500">Total RSVPs</label>
                         <div className="text-3xl font-semibold tracking-tight mt-2">{event.guests.length}</div>
                      </div>
                      <div className="bg-zinc-900 p-5 rounded-xl shadow-elevated">
                         <label className="text-sm font-medium text-zinc-400">Admitted Guests</label>
                         <div className="text-3xl font-semibold tracking-tight text-white mt-2">{guestsPresent}</div>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-subtle">
                         <label className="text-sm font-medium text-zinc-500">Turnout Rate</label>
                         <div className="text-3xl font-semibold tracking-tight mt-2">{event.guests.length > 0 ? Math.round((guestsPresent / event.guests.length) * 100) : 0}%</div>
                      </div>
                   </div>

                   <div className="bg-white border border-zinc-200 rounded-xl shadow-subtle overflow-hidden">
                      <div className="px-5 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                         <h3 className="text-sm font-semibold text-zinc-900">Recent Activity</h3>
                         <span className="flex items-center gap-1.5 text-xs font-medium text-green-600"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Live</span>
                      </div>
                      <div className="divide-y divide-zinc-100 max-h-[400px] overflow-y-auto">
                         {event.guests.length === 0 ? (
                           <div className="p-8 text-center text-sm text-zinc-500">No guests registered yet.</div>
                         ) : (
                           event.guests.map((g, i) => (
                             <div key={g.id} className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                   <div className={`w-2 h-2 rounded-full ${i < guestsPresent ? 'bg-green-500' : 'bg-zinc-300'}`} />
                                   <div>
                                      <p className="text-sm font-medium text-zinc-900">{g.name}</p>
                                      <p className="text-xs text-zinc-500">{g.access} Access</p>
                                   </div>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded ${i < guestsPresent ? 'bg-green-50 text-green-700' : 'bg-zinc-100 text-zinc-600'}`}>
                                   {i < guestsPresent ? 'Admitted' : 'Pending'}
                                </span>
                             </div>
                           ))
                         )}
                      </div>
                   </div>
                </motion.div>
              )}

              {/* Empty States for Mocked Views */}
              {(currentView === 'blueprint' || currentView === 'vendors' || currentView === 'settings') && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
                   <div className="w-16 h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-subtle mb-6">
                      <Settings className="w-6 h-6 text-zinc-400" />
                   </div>
                   <h2 className="text-xl font-semibold tracking-tight text-zinc-900 mb-2">View not fully implemented</h2>
                   <p className="text-sm text-zinc-500 max-w-sm mb-6">This section is currently under development. Return to the overview to manage your event.</p>
                   <button onClick={() => setCurrentView('overview')} className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">Return to Overview</button>
                </motion.div>
              )}

           </AnimatePresence>
         </div>
      </main>
    </div>
  );
}
