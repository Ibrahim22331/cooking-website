import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ ADDED

import IngredientInput from "./components/IngredientInput";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>

      {/* 🔥 GLOBAL NAVBAR */}
      <Navbar />

      {/* 🔄 ROUTES */}
      <Routes>
        <Route path="/" element={<IngredientInput />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* OPTIONAL fallback */}
        <Route path="*" element={<IngredientInput />} />
      </Routes>

      {/* 🔥 GLOBAL FOOTER */}
      <Footer />

    </Router>
  );
}

export default App;