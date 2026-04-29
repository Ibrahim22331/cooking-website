import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Login successful");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-[#1c1c1c] via-[#2c2c2c] to-black text-white overflow-hidden">

      {/* ✅ BACKGROUND */}
      <img
        src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
        alt="chef"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* ✅ DARK OVERLAY (better visibility) */}
      <div className="absolute inset-0 bg-black/50 z-[1]"></div>

      {/* ✅ CONTENT */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-[360px]">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome Back 👨‍🍳
        </h2>

        <input
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition py-3 rounded-lg shadow-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-300 mt-4">
          New user?{" "}
          <Link
            to="/signup"
            className="text-green-400 hover:underline font-semibold"
          >
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}