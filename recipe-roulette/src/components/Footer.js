import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 bg-black/80 backdrop-blur border-t border-white/10 text-gray-300">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* 🍳 BRAND */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-3">
            🍳 Recipe Roulette
          </h2>
          <p className="text-sm text-gray-400">
            Discover smart recipes with AI-powered ingredient matching.
            Cook smarter, eat better.
          </p>
        </div>

        {/* ❤️ HEALTH TIPS */}
        <div>
          <h3 className="font-semibold text-white mb-3">
            💚 Healthy Picks
          </h3>

          <ul className="space-y-2 text-sm">
            <li>🥑 Best foods for heart health</li>
            <li>🥦 High-fiber meals for digestion</li>
            <li>🍗 Protein-rich foods for strength</li>
            <li>🍎 Low-calorie snacks for weight loss</li>
            <li>🥛 Calcium-rich foods for bones</li>
            <li>🍊 Vitamin C foods for immunity</li>
          </ul>
        </div>

        {/* 👨‍🍳 CREATOR */}
        <div>
          <h3 className="font-semibold text-white mb-3">
            👨‍🍳 Creator
          </h3>

          <p className="text-sm">
            Created with ❤️ by{" "}
            <span className="text-orange-400 font-semibold">
              Nadine
            </span>
          </p>

          <p className="text-xs mt-2 text-gray-500">
            © {new Date().getFullYear()} Recipe Roulette. All rights reserved.
          </p>

          {/* OPTIONAL LINKS */}
          <div className="mt-3 flex gap-3 text-sm">
            <Link to="/" className="hover:text-orange-400">Home</Link>
            <Link to="/login" className="hover:text-orange-400">Login</Link>
            <Link to="/signup" className="hover:text-orange-400">Signup</Link>
          </div>
        </div>

      </div>

      {/* 🔥 BOTTOM BAR */}
      <div className="text-center text-xs text-gray-500 pb-4">
        Built for smarter cooking 🍽️
      </div>

    </footer>
  );
}