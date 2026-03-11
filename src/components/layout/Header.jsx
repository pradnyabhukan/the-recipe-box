// src/components/layout/Header.jsx
import React from 'react';
import { ChefHat, CalendarDays } from 'lucide-react';

export default function Header({ view, setView }) {
  const navClass = (active) => `px-3 py-1.5 rounded-full transition-all cursor-pointer ${
    active ? 'bg-white text-emerald-600 shadow-sm' : 'hover:text-emerald-600'
  }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-700 cursor-pointer" onClick={() => setView('match')}>
          <ChefHat size={28} />
          <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden md:block">
            The  <span className="text-emerald-600">Recipe</span> Box
          </h1>
        </div>
        
        <nav className="flex gap-1 md:gap-6 text-sm font-medium text-slate-500 bg-slate-100/50 p-1 rounded-full">
          <button onClick={() => setView('match')} className={navClass(view === 'match')}>
            Cook Now
          </button>
          <button onClick={() => setView('all')} className={navClass(view === 'all')}>
            Recipes
          </button>
          <button onClick={() => setView('plan')} className={`${navClass(view === 'plan' || view === 'shopping')} flex items-center gap-2`}>
            <CalendarDays size={16}/> Planner
          </button>
        </nav>
      </div>
    </header>
  );
}