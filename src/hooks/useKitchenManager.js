// src/hooks/useKitchenManager.js
import { useState, useEffect, useMemo } from 'react';
import { RECIPE_DATABASE, DAYS_OF_WEEK, MEAL_SLOTS } from '../data/constants';

export function useKitchenManager() {
  // --- STATE ---
  const [view, setView] = useState('match');
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [maxTime, setMaxTime] = useState(120);
  const [plannerDaySelection, setPlannerDaySelection] = useState(null);
  const [plannerMealSelection, setPlannerMealSelection] = useState(null);

  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('recipeBox_checkedItems');
    return saved ? JSON.parse(saved) : [];
  });
  
  const toggleCheckedItem = (item) => {
    setCheckedItems(prev => {
      const updated = prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item];
      localStorage.setItem('recipeBox_checkedItems', JSON.stringify(updated));
      return updated;
    });
  };

  // Persistent Pantry
  const [pantry, setPantry] = useState(() => {
    const saved = localStorage.getItem('theRecipeBox_pantry');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistent Meal Plan
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem('theRecipeBox_plan');
    if (saved) return JSON.parse(saved);
    return DAYS_OF_WEEK.reduce((dayAcc, day) => ({
      ...dayAcc,
      [day]: MEAL_SLOTS.reduce((slotAcc, slot) => ({ ...slotAcc, [slot]: null }), {})
    }), {});
  });

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
    localStorage.setItem('theRecipeBox_pantry', JSON.stringify(pantry));
  }, [pantry]);

  useEffect(() => {
    localStorage.setItem('theRecipeBox_plan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  // --- ACTIONS ---
  const handleAddIngredient = (e, forcedValue) => {
    e.preventDefault();
    const ing = forcedValue || inputValue.trim();
    if (!ing) return;
    setPantry(prev => [...new Set([...prev, ing.toLowerCase()])]);
    setInputValue("");
  };

  const removeIngredient = (ing) => setPantry(pantry.filter(i => i !== ing));
  const clearPantry = () => setPantry([]);

  const startSlotAssignment = (day, mealType) => {
    setPlannerDaySelection(day);
    setPlannerMealSelection(mealType);
    setView('all');
  };

  const cancelAssignment = () => {
    setPlannerDaySelection(null);
    setPlannerMealSelection(null);
    setView('plan');
  };

  const addToPlan = (day, mealType, recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: { ...prev[day], [mealType]: recipe }
    }));
    setSelectedRecipe(null);
    setPlannerDaySelection(null);
    setPlannerMealSelection(null);
    setView('plan');
  };

  const removeFromPlan = (day, mealType) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: { ...prev[day], [mealType]: null }
    }));
  };

  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    if (view !== 'all') {
      setPlannerDaySelection(null);
      setPlannerMealSelection(null);
    }
  };

  // --- DERIVED DATA ---
  const processedRecipes = useMemo(() => {
    let result = RECIPE_DATABASE.map(recipe => {
      // Normalize ingredient names for matching
      const baseIngredients = recipe.ingredients.map(i =>
        typeof i === "string" ? i.toLowerCase() : i.item.toLowerCase()
      );
  
      const owned = baseIngredients.filter(ing => pantry.includes(ing));
      const missing = baseIngredients.filter(ing => !pantry.includes(ing));
      const matchPercentage = Math.round((owned.length / baseIngredients.length) * 100);
  
      return { 
        ...recipe,
        owned,
        missing,
        matchPercentage
      };
    });
  
    // --- FILTERS ---
    // Filter by selected category
    if (selectedCategory !== "All") {
      result = result.filter(r => r.category.includes(selectedCategory));
    }
  
    // Filter by maxTime
    result = result.filter(r => r.time <= maxTime);
  
    // --- SORTING ---
    if (view === 'match') {
      result.sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (view === 'all') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
  
    return result;
  }, [pantry, selectedCategory, maxTime, view]);
  

  const shoppingList = useMemo(() => {
    const allIngredients = {};
    DAYS_OF_WEEK.forEach(day => {
      MEAL_SLOTS.forEach(slot => {
        const recipe = mealPlan[day][slot];
        if (recipe) {
          recipe.ingredients.forEach(ing => {
            const norm = typeof ing === "string" ? ing.toLowerCase() : ing.item.toLowerCase();
            allIngredients[norm] = (allIngredients[norm] || 0) + 1;
          });
        }
      });
    });
    return Object.keys(allIngredients)
      .filter(ing => !pantry.some(p => ing.includes(p) || p.includes(ing)))
      .sort();
  }, [mealPlan, pantry]);

  return {
    // State
    view, setView,
    pantry, inputValue, setInputValue,
    mealPlan, shoppingList,
    selectedCategory, setSelectedCategory,
    maxTime, setMaxTime,
    selectedRecipe, setSelectedRecipe,
    plannerDaySelection, plannerMealSelection, setPlannerDaySelection, setPlannerMealSelection,
    processedRecipes,
    checkedItems, toggleCheckedItem,

    // Actions
    handleAddIngredient, removeIngredient, clearPantry,
    startSlotAssignment, cancelAssignment, addToPlan, removeFromPlan,
    openRecipeDetails
  };
}
