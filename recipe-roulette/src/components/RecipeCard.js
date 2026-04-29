import { useState } from "react";
import Food3D from "./Food3D";

export default function RecipeCard({ item, onOpenAR }) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300">

      {/* IMAGE + BADGES */}
      <div className="relative">

        <img
          src={item.image}
          alt={item.name}
          className="h-56 w-full object-cover"
        />

        {/* MATCH BADGE */}
        <span className="absolute top-3 left-3 bg-green-500 text-white text-sm px-3 py-1 rounded-full shadow-lg shadow-green-500/50">
          {Math.round((item.matchScore || 0) * 100)}% Match
        </span>

        {/* CHEF POINTER */}
        <div className="absolute -top-8 right-4 flex items-center gap-2">
          <img
            src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
            alt="chef"
            className="w-16 animate-bounce"
          />
          <div className="bg-white text-black px-3 py-1 rounded shadow text-xs font-semibold">
            Your Dish 👨‍🍳
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 text-white">

        {/* TITLE */}
        <h2 className="text-2xl font-bold">
          {item.name}
        </h2>

        {/* COUNT */}
        <p className="text-sm text-gray-300 mt-1">
          {item.ingredients?.length || 0} ingredients
        </p>

        {/* 3D PREVIEW (ONLY VIEW, NO AR HERE) */}
        <div className="mt-4">
          <Food3D image={item.image} />
        </div>

        {/* 👉 AR BUTTON (GLOBAL TRIGGER) */}
        <button
          onClick={() => onOpenAR(item.image)}
          className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg shadow"
        >
          📱 View Dish in AR
        </button>

        {/* INGREDIENTS */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-200 mb-2">
            Ingredients
          </h3>

          <div className="flex flex-wrap gap-2">
            {(item.ingredients || []).slice(0, 6).map((ing, idx) => (
              <span
                key={idx}
                className="bg-white/20 px-3 py-1 rounded-full text-sm"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING */}
        {item.missingIngredients?.length > 0 && (
          <div className="mt-3 text-sm text-red-400">
            <strong>Missing:</strong>{" "}
            {item.missingIngredients.slice(0, 5).join(", ")}
          </div>
        )}

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition text-white py-2 rounded-lg shadow-lg"
        >
          {showSteps ? "Hide Steps" : "View Steps"}
        </button>

        {/* STEPS */}
        {showSteps && (
          <ol className="mt-3 text-sm text-gray-300 list-decimal ml-5 space-y-1">
            {(item.steps || []).slice(0, 8).map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}