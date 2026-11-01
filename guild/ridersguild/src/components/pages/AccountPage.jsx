import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../account/Profile.jsx";
import Stats from "../account/Stats.jsx";
import Settings from "../account/Settings.jsx";
import "../../styles/AccountPage.css";
import Delete from "../account/Delete.jsx";

export default function AccountPage({ user, setUser }) {
  const [checking, setChecking] = useState(true);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

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

  if (checking) return <main className="page"><p>Checking your account…</p></main>;

  if (!user) {
    return (
      <main className="page signed-out-page">
        <section className="card signed-out-card">
          <p className="account-eyebrow">A place awaits you</p>
          <h1>Your account</h1>
          <p className="signed-out-copy">Log in or create an account to view your profile and continue your journey.</p>
          <Link className="button-link signout-out-link" to="/login">Log in / Sign up</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page account-page">
      <section className="card account-card">
        <header className="account-header">
          <p className="account-eyebrow">Rider's record</p>
          <h1>{user.nickname}'s account</h1>
        </header>

        <div className="account-sections">
          <Profile user={user} />
          <Stats user={user} />
          <Settings 
            nickname={nickname} 
            setNickname={setNickname} 
            message={message} 
            setMessage={setMessage} 
            setUser={setUser} 
          />
        </div>

        <Delete setMessage={setMessage} setUser={setUser} />
        
        <p className="account-message" aria-live="polite">{message}</p>
      </section>
    </main>
  );
}