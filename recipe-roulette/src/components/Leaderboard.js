import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  // ✅ Use environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}/leaderboard`);
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Leaderboard error:", err);
      }
    };

    fetchLeaderboard();
  }, [API_URL]);

  return (
    <div className="p-6 text-white min-h-screen bg-black">

      <h1 className="text-3xl font-bold mb-6 text-center">
        🏆 Leaderboard
      </h1>

      <div className="max-w-xl mx-auto space-y-3">
        {users.map((u, i) => (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-lg flex justify-between"
          >
            <span>{i + 1}. {u.username}</span>
            <span>{u.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}