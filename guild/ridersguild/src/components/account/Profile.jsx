export default function Profile({ user }) {
  return (
    <section className="account-section" aria-labelledby="profile-heading">
      <h2 id="profile-heading">Profile</h2>

      <dl className="account-grid">
        <div className="account-field">
          <dt>Username</dt>
          <dd>{user.username}</dd>
        </div>
        <div className="account-field">
          <dt>Rider</dt>
          <dd>{user.rider ? "Yes" : "No"}</dd>
        </div>
        {user.rider && (
          <div className="account-field">
            <dt>Section</dt>
            <dd>{user.section}</dd>
          </div>
        )}
        <div className="account-field">
          <dt>Rank</dt>
          <dd>{user.rank_title || "Unranked"}</dd>
        </div>
      </dl>
    </section>
  );
}