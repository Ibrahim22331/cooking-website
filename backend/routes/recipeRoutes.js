const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// GET ALL RECIPES
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// LIKE
router.post("/:id/like", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  recipe.likes += 1;
  await recipe.save();
  res.json(recipe);
});

// COMMENT
router.post("/:id/comment", async (req, res) => {
  const { text, user } = req.body;
  const recipe = await Recipe.findById(req.params.id);

  recipe.comments.push({ text, user });
  await recipe.save();

  res.json(recipe);
});

// RATE
router.post("/:id/rate", async (req, res) => {
  const { rating } = req.body;
  const recipe = await Recipe.findById(req.params.id);

  recipe.rating = rating;
  await recipe.save();

  res.json(recipe);
});

module.exports = router;