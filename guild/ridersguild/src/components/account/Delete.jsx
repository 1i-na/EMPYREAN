import { useNavigate } from "react-router-dom";

export default function Delete({ setMessage, setUser}){
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setMessage("");

    try {
      const response = await fetch("/api/me", {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.error || "Could not delete account.");

      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <section className="account-danger-zone" aria-labelledby="delete-account-heading">
      <div>
        <h2 id="delete-account-heading">Leave the guild</h2>
        <p>Permanently delete your account and all associated data.</p>
      </div>

      <button
        className="delete-account-button"
        type="button"
        onClick={handleDeleteAccount}
      >
        Delete account
      </button>
    </section>
  );
}