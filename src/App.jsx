// src/App.jsx
import React from 'react';
import { useKitchenManager } from './hooks/useKitchenManager';
import Header from './components/layout/Header';
import PantrySection from './components/features/PantrySection';
import RecipeGrid from './components/features/RecipeGrid';
import WeeklyPlanner from './components/features/WeeklyPlanner';
import ShoppingList from './components/features/ShoppingList';
import RecipeModal from './components/features/RecipeModal';

export default function App() {
  const km = useKitchenManager();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 pb-20">
      
      <Header view={km.view} setView={km.setView} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: Pantry + Cook Now */}
        {km.view === 'match' && (
          <PantrySection 
            pantry={km.pantry}
            inputValue={km.inputValue}
            setInputValue={km.setInputValue}
            onAdd={km.handleAddIngredient}
            onRemove={km.removeIngredient}
            onClear={km.clearPantry}
          />
        )}
        
        {/* VIEW: Recipe Grid (Match or All) */}
        {(km.view === 'match' || km.view === 'all') && (
          <RecipeGrid 
            recipes={km.processedRecipes}
            view={km.view}
            filters={{
              category: km.selectedCategory, setCategory: km.setSelectedCategory,
              maxTime: km.maxTime, setMaxTime: km.setMaxTime
            }}
            assignmentState={{
              active: !!km.plannerDaySelection,
              day: km.plannerDaySelection,
              setDay: km.setPlannerDaySelection,
              meal: km.plannerMealSelection,
              setMeal: km.setPlannerMealSelection
            }}            
            onRecipeClick={(recipe) => {
              if (km.plannerDaySelection) {
                km.addToPlan(km.plannerDaySelection, km.plannerMealSelection, recipe);
              } else {
                km.openRecipeDetails(recipe);
              }
            }}
            onCancelAssignment={km.cancelAssignment}
          />
        )}

        {/* VIEW: Planner */}
        {km.view === 'plan' && (
          <WeeklyPlanner 
            mealPlan={km.mealPlan}
            shoppingCount={km.shoppingList.length - km.checkedItems.filter(i => km.shoppingList.includes(i)).length}
            onViewShopping={() => km.setView('shopping')}
            onRemoveFromPlan={km.removeFromPlan}
            onSlotClick={km.startSlotAssignment}
            onRecipeClick={km.openRecipeDetails}
          />
        )}

        {/* VIEW: Shopping List */}
        {km.view === 'shopping' && (
          <ShoppingList
          list={km.shoppingList}
          checked={km.checkedItems}
          onToggle={km.toggleCheckedItem}
          onBack={() => km.setView('plan')}
        />
        )}

      </main>

      {/* Shared Modal */}
      {km.selectedRecipe && (
        <RecipeModal 
          recipe={km.selectedRecipe}
          onClose={() => km.setSelectedRecipe(null)}
          pantry={km.pantry}
          viewMode={km.view}
          plannerSelection={{
            day: km.plannerDaySelection,
            setDay: km.setPlannerDaySelection,
            addToPlan: km.addToPlan
          }}
        />
      )}
    </div>
  );
}