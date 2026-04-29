
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Food3D from "./Food3D";

export default function IngredientInput() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [arDish, setArDish] = useState(null);

  const token = localStorage.getItem("token");

  /* =========================
     🔐 FETCH USER
  ========================= */
  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/user", {
        headers: {
          Authorization: token
        }
      });

      if (!res.ok) return;

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* =========================
     ADD INGREDIENT
  ========================= */
  const addIngredient = () => {
    if (!input.trim()) return;

    setIngredients(prev => [...prev, input.toLowerCase().trim()]);
    setInput("");
  };

  const removeIngredient = (i) => {
    setIngredients(prev => prev.filter((_, index) => index !== i));
  };

  /* =========================
     GENERATE RECIPES
  ========================= */
  const generateRecipe = async () => {
    if (!ingredients.length) {
      alert("Add at least one ingredient");
      return;
    }

    if (!token) {
      alert("⚠️ Please login first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ ingredients })
      });

      const data = await res.json();
      setRecipes(Array.isArray(data) ? data : []);

      await fetchUser();
    } catch (err) {
      console.error("Generate error:", err);
    }

    setLoading(false);
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="relative min-h-screen text-white p-6 overflow-hidden">

      {/* 🌄 BLUR BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
        alt="food"
        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 -z-10"
      />

      {/* 🌑 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 -z-10"></div>

      {/* 🔥 HERO */}
      <div className="relative h-[260px] rounded-2xl overflow-hidden mb-6 max-w-6xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
          alt="chef"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl font-bold">🍳 Recipe Roulette</h1>
          <p className="mt-2 text-gray-200 max-w-xl">
            Discover restaurant-quality meals using ingredients you already have
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto items-start">

        {/* LEFT PANEL */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">

          {/* AUTH / USER */}
          <div className="flex justify-end gap-3 mb-4">
            {!user ? (
              <>
                <Link to="/login" className="bg-blue-600 px-4 py-2 rounded-lg">
                  Login
                </Link>
                <Link to="/signup" className="bg-green-600 px-4 py-2 rounded-lg">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <span className="bg-white/20 px-3 py-2 rounded-lg">
                  👋 {user.username}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* PROGRESS */}
          {user && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl mb-4">
              <h2 className="font-bold">🔥 Your Progress</h2>
              <p>⭐ Points: {user.points}</p>
              <p>🔥 Streak: {user.streak}</p>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {user?.achievements?.length > 0 && (
            <div className="bg-white/10 p-4 rounded-xl mb-4 border border-white/20">
              <h3 className="font-semibold mb-2">🏆 Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {user.achievements.map((a, i) => (
                  <span
                    key={i}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* INPUT */}
          <h3 className="font-semibold mb-2">Enter Ingredients</h3>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/20 border border-white/30 p-3 rounded-lg"
              placeholder="e.g. rice, chicken, garlic..."
            />
            <button
              onClick={addIngredient}
              className="bg-teal-500 px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-3">
            {ingredients.map((item, i) => (
              <span
                key={i}
                onClick={() => removeIngredient(i)}
                className="bg-yellow-400 text-black px-3 py-1 rounded-full cursor-pointer"
              >
                {item} ✖
              </span>
            ))}
          </div>

          {/* GENERATE */}
          <button
            onClick={generateRecipe}
            disabled={loading}
            className="w-full mt-6 bg-orange-500 py-3 rounded-lg"
          >
            {loading ? "Generating..." : "🎡 Generate Recipe"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl h-[80vh] overflow-y-auto">

          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-black/50 p-2 rounded">
            🍽️ Recipe Results
          </h2>

          {!loading && recipes.length === 0 && (
            <p className="text-gray-300">
              No recipes yet — ⚠️ Login and generate recipes 🍳
            </p>
          )}

          <div className="space-y-6">
            {recipes.map((r, i) => (
              <RecipeCard
                key={i}
                item={r}
                onOpenAR={setArDish}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 GLOBAL AR */}
      {arDish && (
        <div className="fixed inset-0 bg-black z-[9999]">
          <Food3D
            image={arDish}
            fullScreen
            onClose={() => setArDish(null)}
          />
        </div>
      )}
    </div>
  );
}