const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  steps: [String],
  image: String,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      user: String
    }
  ],

  rating: { type: Number, default: 0 }
});
app.post("/recipes/:id/like", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  recipe.likes += 1;
  await recipe.save();

  res.json(recipe);
});
app.post("/recipes/:id/comment", async (req, res) => {
  const { text, user } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  recipe.comments.push({ text, user });

  await recipe.save();

  res.json(recipe);
});
app.post("/recipes/:id/rate", async (req, res) => {
  const { rating } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  recipe.rating = rating;

  await recipe.save();

  res.json(recipe);
});
module.exports = mongoose.model("Recipe", recipeSchema);
app.post("/recipes", async (req, res) => {
  const { name, ingredients, steps, image, userId } = req.body;

  const recipe = new Recipe({
    name,
    ingredients,
    steps,
    image,
    createdBy: userId
  });

  await recipe.save();

  res.json(recipe);
});
const recipes = [
  {
    name: "Garlic Herb Pasta",
    ingredients: ["pasta", "olive oil", "garlic", "herbs", "parmesan", "egg"],
    steps: [
      "Boil pasta until tender",
      "Heat olive oil in a pan",
      "Add garlic and sauté",
      "Add cooked pasta and mix",
      "Add herbs and parmesan",
      "Top with egg and serve"
    ],
    image: "https://images.unsplash.com/photo-1726596159143-15a840d03d3e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Classic Omelette",
    ingredients: ["egg", "salt", "pepper", "oil"],
    steps: [
      "Crack eggs in bowl",
      "Add salt and pepper",
      "Heat oil in pan",
      "Pour egg mixture",
      "Cook and fold"
    ],
    image: "https://images.unsplash.com/photo-1668283653825-37b80f055b05?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Fried Rice",
    ingredients: ["rice", "egg", "soy sauce", "oil", "salt"],
    steps: [
      "Heat oil",
      "Scramble eggs",
      "Add rice",
      "Add soy sauce",
      "Mix and serve"
    ],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Chicken Curry",
    ingredients: ["chicken", "onion", "tomato", "spices", "oil"],
    steps: [
      "Heat oil",
      "Cook onions",
      "Add chicken",
      "Add spices and tomatoes",
      "Cook until tender"
    ],
    image: "https://images.unsplash.com/photo-1708782344490-9026aaa5eec7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Grilled Sandwich",
    ingredients: ["bread", "butter", "cheese"],
    steps: [
      "Spread butter",
      "Add cheese",
      "Grill until golden"
    ],
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?q=80&w=1254&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Vegetable Stir Fry",
    ingredients: ["carrot", "capsicum", "onion", "soy sauce", "oil"],
    steps: [
      "Heat oil",
      "Add vegetables",
      "Stir fry",
      "Add soy sauce",
      "Serve hot"
    ],
    image: "https://plus.unsplash.com/premium_photo-1664478238082-3df93e48c491?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Pancakes",
    ingredients: ["flour", "milk", "egg", "sugar", "butter"],
    steps: [
      "Mix ingredients",
      "Heat pan",
      "Pour batter",
      "Cook both sides"
    ],
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "French Toast",
    ingredients: ["bread", "egg", "milk", "sugar", "butter"],
    steps: [
      "Mix egg and milk",
      "Dip bread",
      "Cook in pan",
      "Serve warm"
    ],
    image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Salad Bowl",
    ingredients: ["lettuce", "tomato", "cucumber", "lemon", "salt"],
    steps: [
      "Chop vegetables",
      "Add salt",
      "Add lemon",
      "Mix and serve"
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  {
    name: "Burger",
    ingredients: ["bread", "chicken", "lettuce", "tomato", "sauce"],
    steps: [
      "Cook chicken",
      "Toast buns",
      "Assemble burger"
    ],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  // ADDING MANY MORE SIMPLE REALISTIC RECIPES

  { name: "Boiled Eggs", ingredients: ["egg", "water"], steps: ["Boil water", "Add eggs", "Cook 10 minutes"], image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Scrambled Eggs", ingredients: ["egg", "butter", "salt"], steps: ["Heat butter", "Add eggs", "Stir continuously"], image: "https://images.unsplash.com/photo-1687630433653-e6c9faec95b3?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Tea", ingredients: ["water", "tea", "milk", "sugar"], steps: ["Boil water", "Add tea", "Add milk and sugar"], image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Coffee", ingredients: ["coffee", "water", "milk"], steps: ["Boil water", "Add coffee", "Mix milk"], image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1637&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Rice", ingredients: ["rice", "water"], steps: ["Boil water", "Add rice", "Cook until soft"], image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Maggi Noodles", ingredients: ["noodles", "water", "masala"], steps: ["Boil water", "Add noodles", "Add masala"], image: "https://images.unsplash.com/photo-1692273212247-f5efb3fc9b87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Milkshake", ingredients: ["milk", "sugar", "ice cream"], steps: ["Blend all ingredients", "Serve cold"], image: "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Fruit Salad", ingredients: ["apple", "banana", "orange"], steps: ["Cut fruits", "Mix together"], image: "https://images.unsplash.com/photo-1658431618300-a69b07fb5782?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Toast", ingredients: ["bread", "butter"], steps: ["Toast bread", "Apply butter"], image: "https://images.unsplash.com/photo-1612827788868-c8632040ab64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Boiled Chicken", ingredients: ["chicken", "water", "salt"], steps: ["Boil water", "Add chicken", "Cook thoroughly"], image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "French Fries", ingredients: ["potato", "oil", "salt"], steps: ["Cut potatoes", "Fry in oil", "Add salt"], image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Pizza", ingredients: ["flour", "cheese", "tomato"], steps: ["Prepare dough", "Add toppings", "Bake"], image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Hot Dog", ingredients: ["bread", "sausage"], steps: ["Cook sausage", "Place in bread"], image: "https://images.unsplash.com/photo-1612392166886-ee8475b03af2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Soup", ingredients: ["water", "vegetables", "salt"], steps: ["Boil water", "Add vegetables", "Cook"], image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Smoothie", ingredients: ["banana", "milk", "honey"], steps: ["Blend all ingredients"], image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Egg Sandwich", ingredients: ["bread", "egg", "butter"], steps: ["Cook egg", "Add to bread", "Toast"], image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?q=80&w=1554&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Chicken Sandwich", ingredients: ["bread", "chicken"], steps: ["Cook chicken", "Assemble sandwich"], image: "https://images.unsplash.com/photo-1700937244987-92488ab2ada5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  { name: "Milk Tea", ingredients: ["milk", "tea", "sugar"], steps: ["Boil milk", "Add tea", "Add sugar"], image: "https://images.unsplash.com/photo-1634299406775-90f32b656536?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }

];

module.exports = recipes;