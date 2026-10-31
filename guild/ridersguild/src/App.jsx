import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import SignUpPage from './components/SignUp/SignUpPage';

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      const response = await fetch("/api/leaderboard", {
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not load the leaderboard. Please try again.");
      }

      setUsers(result.users);
      setError("");
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

      <SignUpPage 
        users={users}
        sortedUsers={sortedUsers}
        error={error}
      />
    </>
  );
}
