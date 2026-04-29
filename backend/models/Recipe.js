const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  steps: [String],
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  comments: [{ text: String, user: String }],
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Recipe", recipeSchema);