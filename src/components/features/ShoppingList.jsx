// src/components/features/ShoppingList.jsx
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ShoppingList({ list, checked, onToggle, onBack }) {

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowRight className="rotate-180" size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Shopping List</h2>
          <p className="text-slate-500">Based on your weekly meal plan vs. pantry.</p>
        </div>
      </div>

      {/* Empty State */}
      {list.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">You're all set!</h3>
          <p className="text-slate-500">You have all the ingredients needed for this week's plan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-700">
              Items to Buy ({list.length - checked.length} remaining)
            </span>
            <button onClick={() => window.print()} className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              Print List
            </button>
          </div>

          {/* Items */}
          <div className="divide-y divide-slate-100">
            {list.map((ing, idx) => {
              const displayText = typeof ing === 'string' ? ing : `${ing.item}${ing.detail ? ` (${ing.detail})` : ''}`;
              const isChecked = checked.includes(displayText);
              return (
                <div
                  key={idx}
                  onClick={() => onToggle(displayText)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${isChecked ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                    {isChecked && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className={`font-medium capitalize transition-colors ${isChecked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {displayText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}