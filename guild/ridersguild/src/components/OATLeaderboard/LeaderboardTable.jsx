export default function LeaderboardTable({ users, sortedUsers }) {
  return (
    <>
      {users.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Nickname</th>
                  <th>Bounties Completed</th>
                  <th>Bounties Requested</th>
                  <th>Total Points</th>
                  <th>Rank Title</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => (
                  <tr key={user.user_id}>
                    <td>{index + 1}</td>
                    <td>{user.nickname}</td>
                    <td>{user.bounties_completed}</td>
                    <td>{user.bounties_requested}</td>
                    <td className="points">{user.total_points}</td>
                    <td>{user.rank_title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}
    </>
  )
}