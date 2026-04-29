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

    // ✅ VALIDATION
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ CHECK EXISTING USER
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER WITH DEFAULTS (IMPORTANT)
    const user = new User({
      username,
      email,
      password: hashedPassword,
      points: 0,
      streak: 0,
      achievements: []
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (err) {
    console.error("🔥 Signup Error FULL:", err); // IMPORTANT LOG
    res.status(500).json({ message: err.message }); // show real error
  }
});

/* =========================
   🔐 LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points || 0,
        streak: user.streak || 0,
        achievements: user.achievements || []
      }
    });

  } catch (err) {
    console.error("🔥 Login Error FULL:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;