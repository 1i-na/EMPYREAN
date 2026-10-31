import { Router } from "express";
import { db } from "../db/db.js";
import { returnedUser } from "../utils/auth-utils.js";

const router = Router();

// check if browser has valid login session
router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not logged in." });
  }

  const user = db.prepare(
    "SELECT * FROM users WHERE user_id = ?"
  ).get(req.session.userId);

  if (!user) return res.status(401).json({ error: "Not logged in." });
  return res.json({ user: returnedUser(user) });
});

export default router;