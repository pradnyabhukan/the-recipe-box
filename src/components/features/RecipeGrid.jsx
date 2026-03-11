// src/components/features/RecipeGrid.jsx
import React from 'react';
import { Filter, Clock, Utensils, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function RecipeGrid({ 
  recipes, 
  view, 
  filters, // { category, maxTime, setCategory, setMaxTime }
  assignmentState, // { day, meal, active, setDay, setMeal }
  onRecipeClick, 
  onCancelAssignment 
}) {
  const { category, maxTime, setCategory, setMaxTime } = filters;
  const { day, meal, active: isAssignmentMode, setMeal } = assignmentState;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-8">
          {/* Category Filter */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
              <Filter size={18} /> Meal Type
            </h3>
            <div className="space-y-2">
              {['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${category === cat ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Max Time Filter */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
              <Clock size={18} /> Max Time (<span className="text-emerald-600 font-bold">{maxTime}m</span>)
            </h3>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>5m</span><span>120m+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Recipe Grid */}
      <div className="lg:col-span-3">
        {/* Assignment Mode Banner */}
        {isAssignmentMode && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-6 flex flex-col md:flex-row items-start md:items-center justify-between animate-in fade-in">
            <p className="font-semibold flex items-center gap-2 mb-2 md:mb-0">
              <Utensils size={20} /> Selecting for: <span className="font-bold">{day} - {meal}</span>
            </p>
            <div className="flex gap-2 mb-2 md:mb-0">
              {['Breakfast','Lunch','Dinner'].map(slot => (
                <button 
                  key={slot} 
                  onClick={() => setMeal(slot)} 
                  className={`px-2 py-1 rounded text-sm ${meal === slot ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button 
              onClick={onCancelAssignment} 
              className="text-sm font-medium underline hover:no-underline text-emerald-700"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">{view === 'match' ? 'Matching Recipes' : 'All Recipes'} ({recipes.length})</h3>
          <span className="text-sm text-slate-500">Sorted by {view === 'match' ? 'Match %' : 'Alphabetical'}</span>
        </div>

        {/* No Recipes */}
        {recipes.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-slate-500">No recipes match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                view={view} 
                isAssignmentMode={isAssignmentMode}
                onClick={() => onRecipeClick(recipe)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------
// Recipe Card Component
// -----------------
function RecipeCard({ recipe, view, isAssignmentMode, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full ${isAssignmentMode ? 'border-2 border-emerald-300 ring-2 ring-emerald-100' : ''}`}
    >
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
          <Clock size={12} /> {recipe.time}m
        </div>

        {view === 'match' && (
          <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${recipe.matchPercentage === 100 ? 'bg-emerald-500 text-white' : recipe.matchPercentage >= 50 ? 'bg-yellow-400 text-yellow-900' : 'bg-slate-800 text-white'}`}>
            {recipe.matchPercentage === 100 
              ? <><CheckCircle2 size={12} /> Perfect Match</> 
              : <><ShoppingBag size={12} /> Have {recipe.owned.length}/{recipe.ingredients.length}</>}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          {/* Display all categories */}
          <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
            {recipe.category.join(", ")}
          </span>
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{recipe.title}</h4>

        {view === 'match' && recipe.missing.length > 0 && (
          <div className="mt-auto pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-1">Missing:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missing.slice(0, 3).map(m => <span key={m} className="text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded">{m}</span>)}
              {recipe.missing.length > 3 && <span className="text-xs text-slate-400">+{recipe.missing.length - 3} more</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
