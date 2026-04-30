const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    ingredients: {
      type: [String],
      required: true
    },

    instructions: {
      type: String, // ✅ better than steps array for your current UI
      required: true
    },

    // Optional: keep steps if you want detailed UI later
    steps: {
      type: [String],
      default: []
    },

    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    likes: {
      type: Number,
      default: 0
    },

    comments: [
      {
        text: String,
        user: String
      }
    ],

    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);