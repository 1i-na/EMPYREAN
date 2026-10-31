import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AccountPage({ user, setUser }) {
  const [checking, setChecking] = useState(true);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // get logged in user's account
  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(async response => {
        if (response.status === 401) return;

        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Could not load user account.");
        
        setUser(result.user);
        setNickname(result.user.nickname);
      })
      .catch(err => setMessage(err.message))
      .finally(() => setChecking(false));
  }, []);

  // update nickname
  async function updateNickname(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/me", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update nickname.");

      setUser(result.user);
      setNickname(result.user.nickname);
      setMessage("Nickname updated.");
    } catch (err) {
      setMessage(err.message);
    }
  }

  // handle logout
  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Could not log out. Please try again.");
    }
  }

  if (checking) return <main className="page"><p>Checking your account…</p></main>;

  if (!user) {
    return (
      <main className="page">
        <section className="card">
          <h1>Your account</h1>
          <p>Log in or create an account to view your profile.</p>
          <Link className="button-link" to="/login">Log in / Sign up</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="card">
        <h1>{user.nickname}'s account</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Rider:</strong> {user.rider ? "Yes" : "No"}</p>

        {user.rider && <p><strong>Section:</strong> {user.section}</p>}
        
        <p><strong>Rank:</strong> {user.rank_title || "Unranked"}</p>
        <p><strong>Total points:</strong> {user.total_points}</p>

        <form onSubmit={updateNickname}>
          <label htmlFor="nickname">Nickname</label>
          <input
            id="nickname"
            value={nickname}
            onChange={event => setNickname(event.target.value)}
            maxLength={80}
            required
          />
          <button type="submit">Save nickname</button>
        </form>

        <p aria-live="polite">{message}</p>

        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </section>
    </main>
  );
}