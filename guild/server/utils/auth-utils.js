import { rateLimit } from "express-rate-limit";

// rate-limit requests to signup/login (allow 10 requests per IP per 15 mins)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
});

// return a user from db
export function returnedUser(row) {
  return {
    user_id: row.user_id,
    username: row.username,
    nickname: row.nickname,
    verified: Boolean(row.verified),
    rider: Boolean(row.rider),
    section: row.section,
    rank_title: row.rank_title,
    total_points: row.total_points,
    bounties_completed: row.bounties_completed,
    bounties_requested: row.bounties_requested
  };
}

// check if user is logged in
export function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not logged in." });
  }
  next();
}