export default function LeaderboardHeader({ users, error }) {
  return (
    <>
      <h2>Leaderboard</h2>
      <p>Top scoring riders of all time</p>

      {error && <p role="alert">{error}</p>}

      {!error && users.length === 0 && (
          <p>Loading leaderboard...</p>
      )}
    </>
  );
}