import { useEffect, useState } from "react";
import OATLeaderboard from '../OATLeaderboard/OATLeaderboard';

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // load users
  useEffect(() => {
    fetch("/api/leaderboard")
      .then(async response => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not load leaderboard.");
        setUsers(result.users);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // sort users
  const sortedUsers = [...users].sort(
    (a, b) => b.total_points - a.total_points
  );

  if (loading) return <main className="page"><p>Loading leaderboard…</p></main>;

  return (
    <OATLeaderboard
      users={users}
      sortedUsers={sortedUsers}
      error={error}
    />
  );
}