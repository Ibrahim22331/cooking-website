import { useState, useEffect, useCallback } from "react";
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

  const API_URL = process.env.REACT_APP_API_URL;

  const getToken = () => localStorage.getItem("token");

  /* =========================
     🔐 FETCH USER (FIXED)
  ========================= */
  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ FIXED
        }
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("User fetch failed:", data);
        return;
      }

      setUser(data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
     GENERATE RECIPES (FIXED)
  ========================= */
  const generateRecipe = async () => {
    const token = getToken();

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
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // ✅ FIXED
        },
        body: JSON.stringify({ ingredients })
      });

      const data = await res.json();

      console.log("🔥 Generate response:", data);

      if (!res.ok) {
        alert(data.error || data.message || "Generate failed");
        setLoading(false);
        return;
      }

      setRecipes(Array.isArray(data) ? data : []);

      await fetchUser();

    } catch (err) {
      console.error("Generate error:", err);
      alert("Server error while generating");
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

      <img
        src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
        alt="food"
        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 -z-10"
      />

      <div className="absolute inset-0 bg-black/70 -z-10"></div>

      <div className="relative h-[260px] rounded-2xl overflow-hidden mb-6 max-w-6xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
          alt="chef"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl font-bold">🍳 Recipe Roulette</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* LEFT */}
        <div className="bg-white/10 p-6 rounded-2xl">

          <div className="flex justify-end gap-3 mb-4">
            {!user ? (
              <>
                <Link to="/login" className="bg-blue-600 px-4 py-2 rounded-lg">Login</Link>
                <Link to="/signup" className="bg-green-600 px-4 py-2 rounded-lg">Signup</Link>
              </>
            ) : (
              <>
                <span className="bg-white/20 px-3 py-2 rounded-lg">
                  👋 {user.username}
                </span>
                <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-lg">
                  Logout
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-white/20"
              placeholder="e.g. rice, chicken"
            />
            <button onClick={addIngredient} className="bg-teal-500 px-4 rounded-lg">
              Add
            </button>
          </div>

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

          <button
            onClick={generateRecipe}
            disabled={loading}
            className="w-full mt-6 bg-orange-500 py-3 rounded-lg"
          >
            {loading ? "Generating..." : "🎡 Generate Recipe"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-white/10 p-6 rounded-2xl h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">🍽️ Results</h2>

          {recipes.length === 0 && !loading && (
            <p>No recipes yet</p>
          )}

          {recipes.map((r, i) => (
            <RecipeCard key={i} item={r} onOpenAR={setArDish} />
          ))}
        </div>
      </div>

      {arDish && (
        <div className="fixed inset-0 bg-black">
          <Food3D image={arDish} fullScreen onClose={() => setArDish(null)} />
        </div>
      )}
    </div>
  );
}