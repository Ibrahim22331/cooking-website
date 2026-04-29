const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    /* 🎮 GAMIFICATION */
    points: {
      type: Number,
      default: 0
    },

    streak: {
      type: Number,
      default: 0
    },

    lastCooked: {
      type: Date,
      default: null
    },

    /* 🏆 ACHIEVEMENTS */
    achievements: {
      type: [String],
      default: []
    },

    /* ❤️ FAVORITES (NEW FEATURE) */
    favorites: {
      type: [Object], // you can later improve this to a schema
      default: []
    }
  },
  {
    timestamps: true // ✅ adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);