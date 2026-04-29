const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* =========================
   🔐 SIGNUP
========================= */
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ❌ VALIDATION
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ❌ CHECK EXISTING USER
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashed
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});


/* =========================
   🔐 LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ VALIDATION
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // 🔍 FIND USER
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔑 CHECK PASSWORD
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // 🔐 GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "7d" } // ✅ expiry added
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
        streak: user.streak,
        achievements: user.achievements
      }
    });

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;