import { Router } from "express";
import { db } from "../db/db.js";

const router = Router();

router.get("/", (req, res) => {
  const users = db.prepare(`
    SELECT
      user_id,
      nickname,
      rank_title,
      total_points,
      bounties_completed,
      bounties_requested
    FROM users
    ORDER BY total_points DESC, username COLLATE NOCASE ASC
  `).all();

  res.json({ users });
});

export default router;