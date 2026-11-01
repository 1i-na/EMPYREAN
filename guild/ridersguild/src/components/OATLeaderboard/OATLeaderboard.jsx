import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTable from "./LeaderboardTable";
import "../../styles/Leaderboard.css";

export default function OATLeaderboard({ users, sortedUsers, error }) {
  return (
    <>
      <main className="page leaderboard-page">
        <section className="leaderboard card">
          <LeaderboardHeader 
            users={users} 
            error={error}
          />
          <LeaderboardTable 
            users={users}
            sortedUsers={sortedUsers}
            error={error}
          />
        </section>
      </main>
    </>
  );
}