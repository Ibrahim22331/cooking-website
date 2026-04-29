import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/leaderboard")
      .then(res => res.json())
      .then(setUsers);
  }, []);

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