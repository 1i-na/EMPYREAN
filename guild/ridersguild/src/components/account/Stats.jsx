export default function Stats({ user }) {
  return (
    <section className="account-section" aria-labelledby="stats-heading">
      <h2 id="stats-heading">Leaderboard stats</h2>
      <dl className="account-grid stats-grid">
        <div className="account-field">
          <dt>Bounties requested</dt>
          <dd>{user.bounties_requested}</dd>
        </div>
        <div className="account-field">
          <dt>Bounties completed</dt>
          <dd>{user.bounties_completed}</dd>
        </div>
        <div className="account-field account-field--highlight">
          <dt>Total points</dt>
          <dd>{user.total_points}</dd>
        </div>
      </dl>
    </section>
  );
}