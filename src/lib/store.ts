import { create } from 'zustand';

interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
  color: string;
  status: 'Paid' | 'Partial' | 'Unpaid';
}

interface Guest {
  id: string;
  name: string;
  side: "Bride's" | "Groom's";
  access: 'VIP' | 'Gen';
  rsvp: 'Yes' | 'No' | 'Pending';
}

interface RegistryItem {
  id: string;
  name: string;
  price: number;
  contributed: number;
  image: string;
  status: 'pending' | 'completed';
}

interface Contribution {
  id: string;
  guestName: string;
  amount: number;
  itemId: string;
  timestamp: string;
}

export interface Proclamation {
  id: string;
  coupleNames: string;
  date: string;
  venue: string;
  image: string;
  isPublic: boolean;
}

interface EventState {
  // User Session
  isAuthenticated: boolean;
  hasInitialized: boolean;
  hasCreatedEvent: boolean;

  // Discoverable Events (Mock Database)
  discoverableEvents: Proclamation[];
  activeEventId: string | null;

  // Active Managed Event (Host View)
  coupleNames: string;
  eventDate: string;
  venue: string;
  daysToEvent: number;
  guestCount: number;
  isPublic: boolean;
  totalBudget: number;
  budgetCategories: BudgetCategory[];
  guests: Guest[];
  registryItems: RegistryItem[];
  contributions: Contribution[];

  // Actions
  updateEventDetails: (details: Partial<Pick<EventState, 'coupleNames' | 'eventDate' | 'venue' | 'totalBudget' | 'budgetCategories' | 'hasInitialized' | 'guestCount' | 'isPublic' | 'isAuthenticated' | 'hasCreatedEvent'>>) => void;
  setActiveEvent: (id: string | null) => void;
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  liquidateRegistryItem: (id: string) => void;
  updateBudgetLine: (categoryName: string, spent: number) => void;
  updateBudgetCategory: (name: string, budgeted: number) => void;
  addBudgetCategory: (category: BudgetCategory) => void;
  contributeToRegistry: (contribution: Omit<Contribution, 'id' | 'timestamp'>) => void;
}

export const useEventStore = create<EventState>((set) => ({
  isAuthenticated: false,
  hasInitialized: false,
  hasCreatedEvent: false,
  activeEventId: null,

  discoverableEvents: [
    { id: 'ev1', coupleNames: 'Sebastian & Claire', date: '2025-06-14', venue: 'The Grand Landmark, Lagos', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800', isPublic: true },
    { id: 'ev2', coupleNames: 'Tunde & Amaka', date: '2025-08-22', venue: 'Eko Hotels, VI', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', isPublic: true },
    { id: 'ev3', coupleNames: 'David & Chioma', date: '2025-12-05', venue: 'Oriental Hotel, Lagos', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800', isPublic: true },
  ],

  coupleNames: 'Sebastian & Claire',
  eventDate: '2025-06-14',
  venue: 'The Grand Landmark, Lagos',
  daysToEvent: 47,
  guestCount: 250,
  isPublic: false,
  totalBudget: 15000000,
  budgetCategories: [
    { name: 'Venue', budgeted: 6000000, spent: 0, color: '#18181b', status: 'Unpaid' },
    { name: 'Catering', budgeted: 4500000, spent: 0, color: '#c5a059', status: 'Unpaid' },
    { name: 'Photography', budgeted: 2250000, spent: 0, color: '#71717a', status: 'Unpaid' },
    { name: 'Decor', budgeted: 2250000, spent: 0, color: '#d4d4d8', status: 'Unpaid' },
  ],
  guests: [],
  registryItems: [
    { id: '1', name: 'Leica Q3 Camera System', price: 6200000, contributed: 0, status: 'pending', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Hermès Home Suite', price: 2800000, contributed: 0, status: 'pending', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
  ],
  contributions: [],

  updateEventDetails: (details) => set((state) => ({ ...state, ...details })),
  setActiveEvent: (id) => set({ activeEventId: id }),
  
  addGuest: (guest) => set((state) => ({
    guests: [...state.guests, { ...guest, id: Math.random().toString(36).substring(7) }]
  })),

  liquidateRegistryItem: (id) => set((state) => {
    return {
      registryItems: state.registryItems.map(i => i.id === id ? { ...i, status: 'completed' } : i) as any
    };
  }),

  updateBudgetLine: (name, spent) => set((state) => ({
    budgetCategories: state.budgetCategories.map(cat => 
      cat.name === name ? { ...cat, spent, status: spent >= cat.budgeted ? 'Paid' : spent > 0 ? 'Partial' : 'Unpaid' } : cat
    )
  })),

  updateBudgetCategory: (name, budgeted) => set((state) => {
    const newCategories = state.budgetCategories.map(cat => 
      cat.name === name ? { ...cat, budgeted } : cat
    );
    return {
      budgetCategories: newCategories,
      totalBudget: newCategories.reduce((acc, cat) => acc + cat.budgeted, 0)
    };
  }),

  addBudgetCategory: (category) => set((state) => {
    const newCategories = [...state.budgetCategories, category];
    return {
      budgetCategories: newCategories,
      totalBudget: newCategories.reduce((acc, cat) => acc + cat.budgeted, 0)
    };
  }),

  contributeToRegistry: (data) => set((state) => {
    const newContribution = {
      ...data,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString()
    };
    
    return {
      contributions: [newContribution, ...state.contributions],
      registryItems: state.registryItems.map(item => 
        item.id === data.itemId 
          ? { ...item, contributed: item.contributed + data.amount } 
          : item
      )
    };
  }),
}));
