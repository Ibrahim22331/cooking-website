const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Recipe = require("./models/Recipe");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipeRoutes");
const authMiddleware = require("./middleware/auth");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

/* =========================
   👤 GET CURRENT USER
========================= */
app.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("USER ERROR:", err);
    res.status(500).json({ error: "User fetch error" });
  }
});

/* =========================
   ❤️ SAVE FAVORITE
========================= */
app.post("/favorite", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites.push(req.body.recipe);

    await user.save();

    res.json({ message: "Recipe saved ❤️" });

  } catch (err) {
    console.error("FAVORITE ERROR:", err);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

/* =========================
   🎡 GENERATE RECIPES
========================= */
app.post("/generate", authMiddleware, async (req, res) => {
  try {
    const userIngredients = (req.body.ingredients || []).map(i =>
      i.toLowerCase().trim()
    );

    console.log("🟡 USER INGREDIENTS:", userIngredients);

    const recipes = await Recipe.find();

    console.log("🟢 RECIPES IN DB:", recipes.length);

    /* =========================
       🟢 FALLBACK DATA (FIXED)
    ========================= */
    if (!recipes.length) {
      return res.json([
        {
          title: "Simple Rice Bowl",
          ingredients: ["rice", "salt"],
          instructions: "Cook rice and add salt.",
          image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
        },
        {
          title: "Basic Omelette",
          ingredients: ["egg", "oil"],
          instructions: "Beat eggs and fry.",
          image: "https://images.unsplash.com/photo-1512058564366-c9e3e04698b5"
        }
      ]);
    }

    /* =========================
       🔧 BETTER MATCH LOGIC
    ========================= */
    const normalize = (text) => text.toLowerCase().trim();

    const results = recipes.map(recipe => {
      const recipeIngredients = (recipe.ingredients || []).map(i =>
        i.toLowerCase().trim()
      );

      const matched = recipeIngredients.filter(i =>
        userIngredients.some(userIng =>
          i.includes(userIng) || userIng.includes(i)
        )
      );

      const missing = recipeIngredients.filter(i =>
        !userIngredients.some(userIng =>
          i.includes(userIng) || userIng.includes(i)
        )
      );

      const score =
        recipeIngredients.length > 0
          ? matched.length / recipeIngredients.length
          : 0;

      return {
        ...recipe._doc,
        title: recipe.title || recipe.name, // ✅ compatibility fix
        instructions:
          recipe.instructions ||
          (Array.isArray(recipe.steps) ? recipe.steps.join(". ") : ""),
        image:
          recipe.image ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        matchScore: score,
        missingIngredients: missing
      };
    });

    const sorted = results.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    /* =========================
       🎮 GAMIFICATION (FIXED)
    ========================= */
    const user = await User.findById(req.user.id);

    if (user) {
      user.points = (user.points || 0) + 10;

      const today = new Date();
      const last = user.lastCooked;

      if (last) {
        const diff =
          (new Date() - new Date(last)) / (1000 * 60 * 60 * 24);

        user.streak = diff < 2 ? (user.streak || 0) + 1 : 1;
      } else {
        user.streak = 1;
      }

      user.lastCooked = today;

      // Achievements
      user.achievements = user.achievements || [];

      if (user.points >= 50 && !user.achievements.includes("Beginner Chef")) {
        user.achievements.push("Beginner Chef");
      }

      if (user.points >= 100 && !user.achievements.includes("Master Chef")) {
        user.achievements.push("Master Chef");
      }

      if (user.streak >= 5 && !user.achievements.includes("5 Day Streak")) {
        user.achievements.push("5 Day Streak");
      }

      if (user.streak >= 10 && !user.achievements.includes("10 Day Streak")) {
        user.achievements.push("10 Day Streak");
      }

      await user.save();
    }

    res.json(sorted.slice(0, 5));

  } catch (err) {
    console.error("❌ GENERATE ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/* =========================
   🥇 LEADERBOARD
========================= */
app.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find()
      .select("username points streak achievements")
      .sort({ points: -1 });

    res.json(users);
  } catch (err) {
    console.error("LEADERBOARD ERROR:", err);
    res.status(500).json({ error: "Leaderboard error" });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});