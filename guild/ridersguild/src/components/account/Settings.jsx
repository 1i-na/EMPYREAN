export default function Settings({ 
  nickname, setNickname, message, 
  setMessage, setUser 
}) {
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

  return (
    <section className="account-section account-actions" aria-labelledby="settings-heading">
      <h2 id="settings-heading">Account settings</h2>

      <form className="nickname-form" onSubmit={updateNickname}>
        <label htmlFor="nickname">Change nickname</label>
        <div className="nickname-controls">
          <input
            id="nickname"
            value={nickname}
            onChange={event => setNickname(event.target.value)}
            maxLength={80}
            required
          />
          <button type="submit">Update</button>
        </div>
      </form>

      <p className="account-message" aria-live="polite">{message}</p>

      <button type="button" className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    </section>
  );
}