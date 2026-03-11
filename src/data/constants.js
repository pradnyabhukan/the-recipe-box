import Sheera from '../assets/Sheera.png';
import Idli from '../assets/Idli.png';
import WhiteSauce from '../assets/WhiteSauce.png';
import ChickenBiryani from '../assets/ChickenBiryani.png';
import SpicyRice from '../assets/SpicyRice.png';
import ChickenCurry from '../assets/ChickenCurry.png';
import AlooParatha from '../assets/AlooParatha.png';
import DalKanda from '../assets/DalKanda.png';

export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MEAL_SLOTS = ['Breakfast', 'Lunch', 'Dinner'];

const recipes = [
  {
    title: "Classic Rava Sheera",
    category: ["Dessert", "Breakfast"],
    time: 20,
    calories: 450,
    image: Sheera,
    ingredients: [
      { item: "Semolina", detail: "1 cup" },
      { item: "Sugar", detail: "1 cup" },
      { item: "Water", detail: "3 cup" },
      { item: "Ghee", detail: "1/2 cup" },
      { item: "Mixed dry fruits" }
    ],
    instructions: [
      "Fry the rava in a pan until it becomes golden brown.",
      "Add dry fruits and roast lightly.",
      "Add ghee and fry for a minute to coat everything well.",
      "Pour in hot water and mix continuously.",
      "Let the mixture cook and absorb all the water.",
      "Add sugar and stir until well combined and the sheera becomes soft and glossy."
    ]
  },
  {
    title: "Chicken Over Rice – White Sauce",
    category: ["Lunch", "Dinner"],
    time: 10,
    calories: 320,
    image: WhiteSauce,
    ingredients: [
      { item: "Sour cream", detail: "2 cups" },
      { item: "Mayonnaise", detail: "1 cup" },
      { item: "Garlic powder", detail: "1 tbsp" },
      { item: "Cilantro leaves", detail: "1 tbsp, chopped" },
      { item: "Sugar", detail: "1 tbsp" },
      { item: "Salt", detail: "to taste" },
      { item: "Lemon juice" },
      { item: "Black pepper", detail: "½ tsp" }
    ],
    instructions: [
      "Add sour cream and mayonnaise to a mixing bowl.",
      "Mix in garlic powder, chopped cilantro, sugar, salt, and black pepper.",
      "Add lemon juice to taste and whisk until smooth.",
      "Refrigerate for at least 30 minutes to allow the flavors to blend.",
      "Serve chilled over chicken and rice."
    ]
  },
  {
    title: "Chicken Biryani",
    category: ["Lunch", "Dinner"],
    time: 90,
    calories: 650,
    image: ChickenBiryani,
    ingredients: [
      { item: "Chicken" },
      { item: "Dahi" },
      { item: "Yogurt" },
      { item: "Ginger-garlic paste" },
      { item: "Haldi" },
      { item: "Turmeric" },
      { item: "Red chili powder" },
      { item: "Biryani masala" },
      { item: "Coriander powder" },
      { item: "Tomato" },
      { item: "Salt" },
      { item: "Fried onions" },
      { item: "Oil" },
      { item: "Jeera" },
      { item: "Basmati rice", detail: "soaked 25 mins" },
      { item: "Cloves" },
      { item: "Cinnamon" },
      { item: "Black pepper" },
      { item: "Bay leaf" },
      { item: "Cardamom" },
      { item: "Ghee" },
      { item: "Extra fried onions" }
    ],
    instructions: [
      "Marinate chicken with dahi, ginger-garlic paste, haldi, red chili powder, biryani masala, coriander powder, chopped tomato, salt, and fried onions. Rest for 30–60 minutes.",
      "Heat oil in a cooker and add jeera. Add the marinated chicken.",
      "Add 1/4 glass water, cover, and cook for about 30 minutes on low flame until chicken is tender.",
      "Meanwhile, soak rice for 25 minutes. Keep water heating to a boil.",
      "Boil the rice for 5 minutes with jeera, cloves, cinnamon, black pepper, bay leaf, cardamom, and salt until it is 70% cooked.",
      "Drain the rice but save some of the boiling water.",
      "Add the partially cooked rice over the chicken in the cooker.",
      "Sprinkle 4 tbsp of the saved boiling water over the rice.",
      "Add ghee and fried onions on top.",
      "Close the cooker lid without whistle and cook on low heat for 10–12 minutes (dum)."
    ]
  },
  {
    title: "Soft Homemade Idli",
    category: ["Breakfast"],
    time: 20,
    calories: 220,
    image: Idli,
    ingredients: [
      { item: "Urad dal", detail: "1 cup" },
      { item: "Chana dal", detail: "4 tbsp" },
      { item: "Fenugreek seeds", detail: "1 tbsp" },
      { item: "Idli rava" },
      { item: "Water", detail: "for soaking" }
    ],
    instructions: [
      "Soak urad dal, chana dal, and fenugreek seeds for 6 hours.",
      "Grind into a smooth batter.",
      "Soak idli rava separately for 5–10 minutes.",
      "Mix soaked idli rava into the batter.",
      "Ferment the batter for at least 2 hours.",
      "Use the batter to steam soft idlis.",
      "For 8 idlis: use 1 small vati idli rava + half vati urad dal."
    ]
  },
  {
    title: "Tikhat Bhat",
    category: ["Lunch", "Dinner"],
    time: 25,
    calories: 400,
    image: SpicyRice,
    ingredients: [
      { item: "Jeera" },
      { item: "Mustard seeds" },
      { item: "Onion" },
      { item: "Ginger-garlic paste" },
      { item: "Tomato" },
      { item: "Mixed vegetables" },
      { item: "Red chili powder" },
      { item: "Biryani masala" },
      { item: "Rice" },
      { item: "Hot water" },
      { item: "Salt" },
      { item: "Chicken leg pieces", detail: "optional – 2 pieces" }
    ],
    instructions: [
      "Heat oil and add jeera and mustard seeds.",
      "Add chopped onion and sauté until soft.",
      "Add ginger-garlic paste, tomatoes, and veggies. Cook well.",
      "Mix in red chili powder and biryani masala.",
      "Add washed rice, hot water, and salt.",
      "Pressure cook for 2 whistles on flame setting 4.",
      "For chicken version: add 2 leg pieces while cooking the rice."
    ]
  },
  {
    title: "Chicken Curry",
    category: ["Lunch", "Dinner"],
    time: 60,
    calories: 700,
    image: ChickenCurry,
    ingredients: [
      { item: "Oil" },
      { item: "Jeera" },
      { item: "Onion" },
      { item: "Ginger-garlic paste" },
      { item: "Coriander + fresh coconut paste", detail: "1 tbsp" },
      { item: "Haldi (turmeric)" },
      { item: "Chicken", detail: "2 leg pieces" },
      { item: "Salt" },
      { item: "Dry coconut" },
      { item: "Fresh coconut", detail: "optional" },
      { item: "Kala masala", detail: "1 tsp" },
      { item: "Red chili powder", detail: "1 tsp" },
      { item: "Chicken masala or chicken sukha masala", detail: "2 tsp" }
    ],
    instructions: [
      "Heat oil in a cooker and add jeera.",
      "Add onions and fry until golden.",
      "Add a little ginger-garlic and the coriander–fresh coconut paste. Fry well.",
      "Add haldi.",
      "Apply ginger-garlic paste and haldi to the chicken, then add it to the cooker.",
      "Add salt and mix well.",
      "Place a plate over the chicken with some water on top and cook for 10 minutes.",
      "Add more water if needed. Pressure cook for 3–4 whistles.",
      "In a pan, fry onions until brown.",
      "Blend fried onions, dry coconut, and a little fresh coconut into a paste.",
      "Heat oil again and add this masala paste.",
      "Add ginger-garlic paste, haldi, red chili, kala masala, and chicken masala. Fry well.",
      "Add cooked chicken with its stock. Add more water if needed.",
      "Simmer until curry thickens."
    ]
  },
  {
    title: "Aloo Paratha",
    category: ["Breakfast","Lunch", "Dinner"],
    time: 45,
    calories: 320,
    image: AlooParatha,
    ingredients: [
      { item: "Ginger", detail: "1 inch" },
      { item: "Green chillies", detail: "2-3" },
      { item: "Boiled & mashed potatoes", detail: "4-5 medium" },
      { item: "Ajwain", detail: "1/4 tsp" },
      { item: "Crushed coriander seeds", detail: "2 tbsp" },
      { item: "Jeera powder", detail: "1 tsp" },
      { item: "Red chili powder", detail: "1 tsp" },
      { item: "Amchur powder", detail: "1 tbsp" },
      { item: "Anardana powder", detail: "1 tsp" },
      { item: "Fresh mint", detail: "1 tbsp, chopped" },
      { item: "Fresh coriander", detail: "1 tbsp, chopped" },
      { item: "Kasuri methi", detail: "1 tsp" },
      { item: "Onion", detail: "1 medium, optional" },
      { item: "Wheat flour", detail: "2 cups" },
      { item: "Salt", detail: "1/2 tsp" },
      { item: "Water", detail: "as needed" },
      { item: "Oil", detail: "1 tbsp, for dough" },
      { item: "Dry wheat flour", detail: "for dusting" },
      { item: "Ghee / Oil / Butter", detail: "for cooking" }
    ],
    instructions: [
      "Crush ginger and green chillies coarsely.",
      "Add boiled, mashed potatoes to a bowl.",
      "Add crushed ginger–chilli, ajwain, crushed coriander seeds, powdered spices, kasuri methi, mint, and coriander.",
      "Mix well ensuring no chunks remain. Add optional onions only before making parathas.",
      "Mix wheat flour and salt, add water gradually to form a semi-soft dough.",
      "Add oil and knead until smooth. Cover with a damp cloth and rest 30 minutes.",
      "Knead again and divide into equal dough balls.",
      "Flatten a dough ball and shape it into a small cup.",
      "Fill generously with aloo mixture, press lightly, and seal the edges.",
      "Dust with flour and roll gently in counter-clockwise direction without applying too much pressure.",
      "Alternative method: Make two rotis and sandwich the filling between them, sealing edges.",
      "Heat a tawa on medium flame and place the rolled paratha.",
      "Cook until light golden, flip, apply ghee/oil/butter, and cook both sides until golden brown and slightly puffed.",
      "Repeat with all parathas and serve with butter, pickle, or yogurt."
    ]
  },
  {
    title: "Dal Kanda",
    category: ["Lunch", "Dinner"],
    time: 35,
    calories: 250,
    image: DalKanda,
    ingredients: [
      { item: "Chana dal", detail: "1/2 cup, soaked 2–3 hours" },
      { item: "Onions", detail: "2, finely chopped" },
      { item: "Red chili powder", detail: "1 tsp" },
      { item: "Salt", detail: "to taste" },
      { item: "Kanda lasun masala", detail: "1 tsp" },
      { item: "Oil", detail: "2 tbsp" },
      { item: "Mustard seeds", detail: "1/2 tsp" },
      { item: "Cumin seeds", detail: "1/2 tsp" },
      { item: "Dry red chilies", detail: "2–3" },
      { item: "Garlic", detail: "7–8 cloves, finely chopped" },
      { item: "Curry leaves", detail: "10–12" }
    ],
    instructions: [
      "Wash chana dal and soak it in enough water for 2–3 hours.",
      "Heat oil in a cooker.",
      "Add mustard seeds and let them pop.",
      "Add cumin seeds and let them splutter.",
      "Add dry red chilies, garlic, and curry leaves. Mix and fry briefly.",
      "Add chopped onions and fry until golden.",
      "Add kanda lasun masala and red chili powder. Mix well.",
      "(Optional) Substitute with goda masala, kala masala, or varhadi masala if desired.",
      "Add soaked chana dal along with its water.",
      "Add extra water as needed and salt to taste.",
      "Mix well and pressure cook for 1 whistle on medium heat.",
      "Serve hot with bhakri or chapati."
    ]
  } 
];

export const RECIPE_DATABASE = recipes.map((recipe, index) => ({
  id: index + 1,
  ...recipe
}));
