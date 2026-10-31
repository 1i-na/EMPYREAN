import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../db/db.js";
import { authLimiter } from "./auth-limiter.js";

const router = Router();

// return a user from db
function returnedUser(row) {
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

// login
router.post("/", authLimiter, async (req, res) => {
  const { username, password } = req.body ?? {};

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Enter your username and password." });
  }

  const user = db.prepare(
    "SELECT * FROM users WHERE username = ?"
  ).get(username.trim());

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  // regenerate session id
  req.session.regenerate((err) => {
    if (err) {
      return res.status(500).json({ error: "Could not start session." });
    }

    req.session.userId = user.user_id;
    return res.json({ user: returnedUser(user) });
  });
});

export default router;