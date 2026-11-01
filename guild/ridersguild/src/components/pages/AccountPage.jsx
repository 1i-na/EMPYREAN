import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../account/Profile.jsx";
import Stats from "../account/Stats.jsx";
import Settings from "../account/Settings.jsx";
import "../../styles/AccountPage.css";

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
      </section>
    </main>
  );
}