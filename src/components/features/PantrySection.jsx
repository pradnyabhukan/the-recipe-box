import React, { useState } from 'react';
import { Search, X, Trash2 } from 'lucide-react';
import { ALL_INGREDIENTS } from "../../data/allIngredients";

export default function PantrySection({
  pantry,
  inputValue,
  setInputValue,
  onAdd,
  onRemove,
  onClear
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter suggestions from ALL_INGREDIENTS based on input
  const filteredSuggestions =
    inputValue.trim().length === 0
      ? []
      : ALL_INGREDIENTS.filter(item =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        ).slice(0, 8);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-10 animate-in fade-in slide-in-from-bottom-2">
      <div className="p-8 md:p-12 text-center bg-gradient-to-b from-emerald-50/50 to-white relative">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          What's in your kitchen?
        </h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Enter ingredients you have (e.g., "eggs, milk, tomato"), and we'll tell you what you can make.
        </p>

        <div className="max-w-xl mx-auto relative z-10">
          <form onSubmit={onAdd} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                placeholder="Add ingredients..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full shadow-lg shadow-slate-200/50 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-lg"
              />
              <Search className="absolute left-4 text-slate-400" size={20} />

              <button
                type="submit"
                className="absolute right-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-full transition-colors"
              >
                Add
              </button>
            </div>

            {/* Dropdown suggestions */}
            {showDropdown && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-20">
                {filteredSuggestions.map((item) => (
                  <div
                    key={item}
                    onMouseDown={() => {
                      // Force adding ingredient string
                      onAdd({ preventDefault: () => {} }, item.toLowerCase());
                      setInputValue("");
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 text-left cursor-pointer hover:bg-emerald-50 capitalize"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Pantry list */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 min-h-[40px] max-w-3xl mx-auto">
          {pantry.length === 0 && (
            <span className="text-slate-400 text-sm italic">
              No ingredients added yet...
            </span>
          )}

          {pantry.map((ing) => (
            <span
              key={ing}
              className="animate-in fade-in zoom-in duration-200 inline-flex items-center gap-1.5 px-3 py-1 
                bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium capitalize"
            >
              {ing}
              <button
                onClick={() => onRemove(ing)}
                className="hover:text-emerald-950 p-0.5 rounded-full hover:bg-emerald-200/50"
              >
                <X size={14} />
              </button>
            </span>
          ))}

          {pantry.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-red-500 underline ml-2 flex items-center gap-1"
            >
              <Trash2 size={12} /> Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
