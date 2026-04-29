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
   DATABASE CONNECTION (FIXED)
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
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

/* =========================
   🎡 GENERATE + GAMIFICATION
========================= */
app.post("/generate", authMiddleware, async (req, res) => {
  try {
    const userIngredients = (req.body.ingredients || []).map(i =>
      i.toLowerCase().trim()
    );

    const recipes = await Recipe.find();

    if (!recipes.length) {
      return res.json([]);
    }

    const normalize = (text) =>
      text.toLowerCase().replace(/[^a-z]/g, "");

    const results = recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map(i =>
        i.toLowerCase().trim()
      );

      const matched = recipeIngredients.filter(i =>
        userIngredients.some(userIng =>
          normalize(i).includes(normalize(userIng)) ||
          normalize(userIng).includes(normalize(i))
        )
      );

      const missing = recipeIngredients.filter(i =>
        !userIngredients.some(userIng =>
          normalize(i).includes(normalize(userIng)) ||
          normalize(userIng).includes(normalize(i))
        )
      );

      const score =
        recipeIngredients.length > 0
          ? matched.length / recipeIngredients.length
          : 0;

      return {
        ...recipe._doc,
        matchScore: score,
        missingIngredients: missing
      };
    });

    const filtered = results.filter(r => r.matchScore > 0.2);
    const finalResults = filtered.length > 0 ? filtered : results;

    const sorted = finalResults.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    /* =========================
       🎮 GAMIFICATION SYSTEM
    ========================= */
    const user = await User.findById(req.user.id);

    if (user) {
      user.points += 10;

      const today = new Date();
      const last = user.lastCooked;

      if (last) {
        const diff = (today - last) / (1000 * 60 * 60 * 24);
        user.streak = diff < 2 ? user.streak + 1 : 1;
      } else {
        user.streak = 1;
      }

      user.lastCooked = today;

      // Points achievements
      if (user.points >= 50 && !user.achievements.includes("Beginner Chef")) {
        user.achievements.push("Beginner Chef");
      }

      if (user.points >= 100 && !user.achievements.includes("Master Chef")) {
        user.achievements.push("Master Chef");
      }

      // Streak achievements
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
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/* =========================
   🥇 LEADERBOARD
========================= */
app.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Leaderboard error" });
  }
});

/* =========================
   START SERVER (FIXED)
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});