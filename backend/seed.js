const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

mongoose.connect("mongodb://localhost:27017/recipeDB")
  .then(() => console.log("MongoDB Connected for seeding"))
  .catch(err => console.log(err));

// ✅ helper
const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

const data = [

  // 🍝 GARLIC PASTA
  {
    name: "Garlic Herb Pasta",
    ingredients: [
      "Pasta",
      "Olive oil",
      "Garlic",
      "Parmesan cheese",
      "Fresh herbs",
      "Salt",
      "Black pepper"
    ],
    steps: [
      "Bring a large pot of salted water to a boil",
      "Add pasta and cook until al dente",
      "Reserve 1 cup of pasta water before draining",
      "Heat olive oil in a large pan over medium heat",
      "Add minced garlic and sauté until fragrant",
      "Add cooked pasta into the pan",
      "Mix well and add reserved pasta water gradually",
      "Stir in parmesan cheese and fresh herbs",
      "Season with salt and black pepper",
      "Cook for another 2 minutes while stirring",
      "Turn off heat and let rest for a minute",
      "Serve hot with extra cheese on top"
    ],
    image: img("photo-1525755662778-989d0524087e")
  },

  // 🍳 OMELETTE
  {
    name: "Classic Omelette",
    ingredients: [
      "Eggs",
      "Salt",
      "Black pepper",
      "Butter",
      "Milk",
      "Onion",
      "Capsicum"
    ],
    steps: [
      "Crack eggs into a bowl",
      "Add milk, salt, and pepper",
      "Whisk until fully combined",
      "Heat butter in a non-stick pan",
      "Add chopped onions and capsicum",
      "Cook vegetables for 2 minutes",
      "Pour egg mixture into the pan",
      "Let it cook on low heat",
      "Gently lift edges to allow uncooked egg to flow",
      "Cook until mostly set",
      "Fold omelette in half",
      "Serve warm"
    ],
    image: img("photo-1551183053-bf91a1d81141")
  },

  // 🍚 FRIED RICE
  {
    name: "Vegetable Fried Rice",
    ingredients: [
      "Cooked rice",
      "Egg",
      "Soy sauce",
      "Garlic",
      "Carrot",
      "Spring onion",
      "Oil"
    ],
    steps: [
      "Heat oil in a wok",
      "Add minced garlic and sauté",
      "Add chopped carrots and cook",
      "Push vegetables to one side",
      "Crack egg and scramble",
      "Add cooked rice into wok",
      "Mix everything well",
      "Add soy sauce",
      "Stir fry on high heat",
      "Add spring onions",
      "Cook for another 2 minutes",
      "Serve hot"
    ],
    image: img("photo-1603133872878-684f208fb84b")
  },

  // 🍔 BURGER
  {
    name: "Chicken Burger",
    ingredients: [
      "Burger buns",
      "Chicken patty",
      "Lettuce",
      "Tomato",
      "Cheese slice",
      "Mayonnaise",
      "Ketchup"
    ],
    steps: [
      "Heat pan and cook chicken patty",
      "Flip patty and cook evenly",
      "Toast burger buns lightly",
      "Spread mayonnaise on bottom bun",
      "Place lettuce on bun",
      "Add cooked chicken patty",
      "Add cheese slice",
      "Place tomato slices",
      "Add ketchup",
      "Cover with top bun",
      "Press gently",
      "Serve hot"
    ],
    image: img("photo-1568901346375-23c9450c58cd")
  },

  // 🍕 PIZZA
  {
    name: "Homemade Pizza",
    ingredients: [
      "Flour",
      "Yeast",
      "Warm water",
      "Tomato sauce",
      "Cheese",
      "Olive oil",
      "Salt"
    ],
    steps: [
      "Mix flour, yeast, and salt",
      "Add warm water and knead dough",
      "Let dough rest for 1 hour",
      "Preheat oven to 220°C",
      "Roll dough into flat base",
      "Spread tomato sauce evenly",
      "Add cheese on top",
      "Drizzle olive oil",
      "Add toppings of choice",
      "Bake for 12-15 minutes",
      "Remove from oven",
      "Slice and serve"
    ],
    image: img("photo-1513104890138-7c749659a591")
  },

  // 🥞 PANCAKES
  {
    name: "Fluffy Pancakes",
    ingredients: [
      "Flour",
      "Milk",
      "Egg",
      "Sugar",
      "Butter",
      "Baking powder",
      "Salt"
    ],
    steps: [
      "Mix flour, sugar, baking powder, and salt",
      "Add milk and egg",
      "Whisk until smooth batter forms",
      "Heat butter in pan",
      "Pour batter into pan",
      "Cook until bubbles form",
      "Flip pancake",
      "Cook other side",
      "Remove from pan",
      "Repeat for remaining batter",
      "Stack pancakes",
      "Serve with syrup"
    ],
    image: img("photo-1528207776546-365bb710ee93")
  },

  // 🔥 MORE AUTO GENERATED (QUALITY VERSION)
  ...Array.from({ length: 20 }).map((_, i) => ({
    name: "Chef Special " + (i + 1),
    ingredients: [
      "Oil",
      "Garlic",
      "Onion",
      "Salt",
      "Pepper",
      "Vegetables",
      "Protein"
    ],
    steps: [
      "Prepare all ingredients",
      "Heat oil in a pan",
      "Add garlic and sauté",
      "Add onions and cook",
      "Add vegetables",
      "Add protein source",
      "Season with salt and pepper",
      "Cook on medium heat",
      "Stir occasionally",
      "Cook until fully done",
      "Taste and adjust seasoning",
      "Serve hot"
    ],
    image: img("photo-1504674900247-0877df9cc836")
  }))
];

async function seed() {
  await Recipe.deleteMany();
  await Recipe.insertMany(data);
  console.log("✅ High-quality recipes inserted!");
  mongoose.connection.close();
}

seed();