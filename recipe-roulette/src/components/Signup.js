import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ USE ENV VARIABLE (IMPORTANT)
  const API_URL = process.env.REACT_APP_API_URL;

  const signup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful 🎉");
      navigate("/login");

    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-[#1c1c1c] via-[#2c2c2c] to-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <img
        src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
        alt="chef"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 z-[1]"></div>

      {/* CONTENT */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-[360px]">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account 👨‍🍳
        </h2>

        <input
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="w-full bg-gradient-to-r from-green-500 to-green-700 py-3 rounded-lg font-semibold"
        >
          Signup
        </button>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}