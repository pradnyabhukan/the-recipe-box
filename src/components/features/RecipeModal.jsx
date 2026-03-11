// src/components/shared/RecipeModal.jsx
import React from 'react';
import { X, Clock, Flame, ShoppingBag, CheckCircle2, ChefHat, CalendarDays } from 'lucide-react';
import { DAYS_OF_WEEK, MEAL_SLOTS } from '../../data/constants';

export default function RecipeModal({ 
  recipe, onClose, pantry, viewMode, 
  plannerSelection, // { day, setDay, addToPlan }
}) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-slate-100 rounded-full transition-colors z-10 shadow-sm backdrop-blur-sm">
          <X size={20} />
        </button>

        {/* Image header */}
        <div className="h-72 relative bg-slate-200">
          <img src={recipe.image} className="w-full h-full object-cover" alt={recipe.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
          <div className="absolute bottom-6 left-8 text-white max-w-xl">
            <span className="bg-emerald-500 text-xs font-bold px-2 py-1 rounded text-white uppercase tracking-wider mb-2 inline-block">
              {recipe.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h2>
            <div className="flex gap-4 text-sm font-medium text-slate-200">
              <span className="flex items-center gap-1"><Clock size={16} /> {recipe.time} mins</span>
              {recipe.calories && <span className="flex items-center gap-1"><Flame size={16} /> {recipe.calories} cal</span>}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Ingredients */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ShoppingBag className="text-emerald-600" size={20} /> Ingredients
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => {
                  // normalized ingredient object or string
                  const name = typeof ing === 'string' ? ing : ing.item;
                  const hasIt = pantry.some(p => 
                    typeof p === 'string' ? name.toLowerCase().includes(p.toLowerCase()) : name.toLowerCase().includes(p.item.toLowerCase())
                  );

                  return (
                    <li key={idx} className="flex items-center justify-between text-sm group p-2 rounded hover:bg-slate-50 transition-colors">
                      <span className={`capitalize ${viewMode === 'match' && hasIt ? "text-slate-800 font-medium" : "text-slate-500"}`}>
                        {typeof ing === 'string' ? ing : `${ing.item}${ing.detail ? ` (${ing.detail})` : ''}`}
                      </span>
                      {viewMode === 'match' && (
                        hasIt 
                        ? <CheckCircle2 size={18} className="text-emerald-500" /> 
                        : <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">Missing</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ChefHat className="text-emerald-600" size={20} /> Instructions
              </h3>
              <div className="space-y-6">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center">{idx + 1}</span>
                    <p className="text-slate-600 text-sm leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Planner controls */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="relative w-full">
              <button 
                onClick={() => plannerSelection.setDay(plannerSelection.day ? null : DAYS_OF_WEEK[0])}
                className={`w-full md:w-auto px-6 py-3 font-medium rounded-xl transition-colors flex items-center justify-center gap-2 border ${plannerSelection.day ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}`}
              >
                <CalendarDays size={18} /> {plannerSelection.day ? 'Close Planner' : 'Add to Plan'}
              </button>

              {plannerSelection.day && (
                <div className="absolute bottom-full mb-2 left-0 w-full md:w-80 bg-white border border-slate-200 shadow-xl rounded-xl p-4 z-20 animate-in fade-in zoom-in-95">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Day</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {DAYS_OF_WEEK.map(d => (
                      <button key={d} onClick={() => plannerSelection.setDay(d)} className={`text-xs p-1.5 rounded border ${plannerSelection.day === d ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 hover:border-emerald-400'}`}>{d.substring(0,3)}</button>
                    ))}
                  </div>

                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Meal</p>
                  <div className="grid grid-cols-3 gap-2">
                    {MEAL_SLOTS.map(m => (
                      <button key={m} onClick={() => plannerSelection.addToPlan(plannerSelection.day, m, recipe)} className="text-xs py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium rounded border border-slate-200">{m}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
