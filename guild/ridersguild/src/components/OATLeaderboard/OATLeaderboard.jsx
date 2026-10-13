import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTable from "./LeaderboardTable";

export default function OATLeaderboard({ users, sortedUsers, error }) {
  return (
    <>
      <main>
        <section className="leaderboard">
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