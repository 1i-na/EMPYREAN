import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import OATLeaderboard from './components/OATLeaderboard/OATLeaderboard';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      const response = await fetch("/guild_users_info.txt");

      if (!response.ok) {
        throw new Error("Could not load the leaderboard. Please try again.");
      }

      const csv = await response.text();
      const lines = csv.trim().split(/\r?\n/);
      const headers = lines[0].split(",");

      const userList = lines.slice(1).map(line => {
        const values = line.split(",");
        const user = {};

        // create users
        headers.forEach((header, index) => {
            user[header.trim()] = values[index]?.trim() ?? "";
        });

        // convert values to appropriate types
        user.user_id = Number(user.user_id);
        user.verified = user.verified.toLowerCase() === "true";
        user.rider = user.rider.toLowerCase() === "true";

        if (user.section === "" || user.section.toLowerCase() === "null") 
          user.section = null;

        user.total_points = Number(user.total_points);
        user.bounties_completed = Number(user.bounties_completed);
        user.bounties_requested = Number(user.bounties_requested);

        return user;
      });

      setUsers(userList);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const sortedUsers = [...users].sort(
    (a, b) => b.total_points - a.total_points
  );

  return (
    <>
      <NavBar />

      <OATLeaderboard 
        users={users}
        sortedUsers={sortedUsers}
        error={error}
      />
    </>
  );
}

export default App
