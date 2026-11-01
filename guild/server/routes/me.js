import { Router } from "express";
import { db } from "../db/db.js";
import { returnedUser, requireAuth } from "../utils/auth-utils.js";

const router = Router();

// check if browser has valid login session
router.get("/", requireAuth, (req, res) => {
  const user = db.prepare(
    "SELECT * FROM users WHERE user_id = ?"
  ).get(req.session.userId);

  if (!user) return res.status(401).json({ error: "Not logged in." });
  return res.json({ user: returnedUser(user) });
});

// allow users to change their nickname
router.patch("/", requireAuth, (req, res) => {
  // get new nickname
  const nickname =
    typeof req.body?.nickname === "string" ? req.body.nickname.trim() : "";

  if (!nickname || nickname.length > 80) {
    return res.status(400).json({
      error: "Nickname must be between 1 and 80 characters.",
    });
  }

  // set new nickname
  db.prepare("UPDATE users SET nickname = ? WHERE user_id = ?")
    .run(nickname, req.session.userId);

  // set new user as logged in
  const user = db.prepare("SELECT * FROM users WHERE user_id = ?")
    .get(req.session.userId);

  return res.json({ user: returnedUser(user) });
});

// delete user
router.delete("/", requireAuth, (req, res, next) => {
  try {
    const userId = req.session.userId;

    const result = db.prepare("DELETE FROM users WHERE user_id = ?").run(userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Account not found." });
    }

    // destroy session and clear cookie
    req.session.destroy(err => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      return res.status(204).end();
    });
  } catch (err) {
    next(err);
  }
});

export default router;