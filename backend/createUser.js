const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/recipeDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

async function createUser() {
  try {
    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash("123456", 10);

    // ❗ OPTIONAL: prevent duplicate user
    const existingUser = await User.findOne({ email: "test@test.com" });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return mongoose.connection.close();
    }

    // ✅ CREATE USER
    const user = new User({
      username: "testUser",
      email: "test@test.com",
      password: hashedPassword,
      points: 0,
      streak: 0,
      achievements: []
    });

    await user.save();

    console.log("✅ User created successfully");
    mongoose.connection.close();

  } catch (err) {
    console.log("❌ Error creating user:", err);
    mongoose.connection.close();
  }
}

createUser();