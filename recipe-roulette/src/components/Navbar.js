import { Link, useNavigate } from "react-router-dom";
<nav className="fixed top-0 left-0 w-full z-50 ..."></nav>

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur text-white shadow-md">

      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-orange-400">
        🍳 Recipe Roulette
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex gap-4 items-center">

        {/* ✅ THIS MUST BE LINK */}
        <Link to="/" className="hover:text-orange-400 transition">
          Home
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="bg-white/20 px-3 py-2 rounded">
              👋 {user.username}
            </span>

            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}