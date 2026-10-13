export default function LeaderboardHeader({ users, error }) {
  return (
    <>
      <h2>Leaderboard</h2>
      <p>Top scoring riders of all time</p>

      {error && <p>{error}</p>}

      {!error && users.length === 0 && (
          <p>Loading leaderboard...</p>
      )}
    </>
  );
}