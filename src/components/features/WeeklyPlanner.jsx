// src/components/features/WeeklyPlanner.jsx
import React from 'react';
import { CalendarDays, ShoppingCart, Plus, X } from 'lucide-react';
import { DAYS_OF_WEEK, MEAL_SLOTS } from '../../data/constants';

export default function WeeklyPlanner({ mealPlan, shoppingCount, onViewShopping, onRemoveFromPlan, onSlotClick, onRecipeClick }) {
  
  // Helper to flatten meal plan for rendering
  const getRecipe = (day, type) => mealPlan[day]?.[type];

  return (
    <div className="animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <CalendarDays className="text-emerald-600" size={32} /> Weekly Meal Plan
          </h2>
          <p className="text-slate-500">Click an empty slot to assign a recipe.</p>
        </div>
        <button onClick={onViewShopping} className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
          <ShoppingCart size={18} /> View Shopping List 
          <span className="bg-emerald-500 text-xs px-2 py-0.5 rounded-full text-white font-bold ml-1">{shoppingCount}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-x-auto pb-2">
        <div className="grid grid-cols-[100px_repeat(7,_1fr)] border-b border-slate-200 bg-slate-50 min-w-[800px] lg:min-w-full">
          <div className="h-12"></div>
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-slate-700 border-l border-slate-200">{day}</div>
          ))}
        </div>
        
        {MEAL_SLOTS.map(mealType => (
          <div key={mealType} className="grid grid-cols-[100px_repeat(7,_1fr)] border-t border-slate-200 min-w-[800px] lg:min-w-full">
            <div className="flex items-center justify-center p-3 font-bold text-emerald-700 text-sm bg-emerald-50/50">{mealType}</div>
            {DAYS_OF_WEEK.map(day => {
              const recipe = getRecipe(day, mealType);
              return (
                <div key={`${day}-${mealType}`} className={`p-1.5 border-l border-slate-200 min-h-[140px] flex items-center justify-center transition-all ${recipe ? 'bg-emerald-50/30' : 'bg-white hover:bg-slate-50'}`}>
                  {recipe ? (
                    <div className="w-full h-full p-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col group relative" onClick={() => onRecipeClick(recipe)}>
                        <div className="relative h-16 w-full rounded-md overflow-hidden bg-slate-200 mb-2">
                            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">{recipe.title}</h4>
                        <button onClick={(e) => { e.stopPropagation(); onRemoveFromPlan(day, mealType); }} className="absolute -top-1 -right-1 bg-white text-red-500 shadow-sm border border-slate-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                            <X size={12} />
                        </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full text-slate-300 cursor-pointer hover:text-emerald-600 transition-colors" onClick={() => onSlotClick(day, mealType)}>
                      <Plus size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}