import { useState } from "react";
import Food3D from "./Food3D";

export default function RecipeCard({ item, onOpenAR }) {
  const [showSteps, setShowSteps] = useState(false);

  /* =========================
     SAFE DATA HANDLING
  ========================= */
  const title = item.title || item.name || "Untitled Dish";

  const image =
    item.image ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";

  const ingredients = Array.isArray(item.ingredients)
    ? item.ingredients
    : [];

  const stepsArray = Array.isArray(item.steps)
    ? item.steps
    : item.instructions
    ? item.instructions.split(". ").filter(Boolean)
    : [];

  const matchPercent = Math.round((item.matchScore || 0) * 100);

  /* =========================
     UI
  ========================= */
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-t-2xl"
        />

        {/* MATCH BADGE */}
        <span className="absolute top-3 left-3 bg-green-500 text-white text-sm px-3 py-1 rounded-full shadow">
          {matchPercent}% Match
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 text-white">

        {/* TITLE */}
        <h2 className="text-xl font-bold">{title}</h2>

        {/* INFO */}
        <p className="text-sm text-gray-300 mt-1">
          {ingredients.length} ingredients
        </p>

        {/* 3D PREVIEW */}
        <div className="mt-3">
          <Food3D image={image} />
        </div>

        {/* AR BUTTON */}
        <button
          onClick={() => onOpenAR(image)}
          className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
        >
          📱 View in AR
        </button>

        {/* INGREDIENTS */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-200 mb-2">
            Ingredients
          </h3>

          <div className="flex flex-wrap gap-2">
            {ingredients.slice(0, 6).map((ing, idx) => (
              <span
                key={idx}
                className="bg-white/20 px-3 py-1 rounded-full text-sm"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING INGREDIENTS */}
        {item.missingIngredients?.length > 0 && (
          <div className="mt-3 text-sm text-red-400">
            <strong>Missing:</strong>{" "}
            {item.missingIngredients.slice(0, 5).join(", ")}
          </div>
        )}

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
        >
          {showSteps ? "Hide Steps" : "View Steps"}
        </button>

        {/* STEPS */}
        {showSteps && (
          <div className="mt-3">
            {stepsArray.length > 0 ? (
              <ol className="text-sm text-gray-300 list-decimal ml-5 space-y-1">
                {stepsArray.slice(0, 8).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-400 text-sm">
                No steps available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}