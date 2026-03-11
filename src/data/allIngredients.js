import { RECIPE_DATABASE } from "./constants";

export const ALL_INGREDIENTS = Array.from(
  new Set(
    RECIPE_DATABASE.flatMap(r => 
      r.ingredients.map(i => typeof i === "string" ? i.toLowerCase() : i.item.toLowerCase())
    )
  )
).sort();
