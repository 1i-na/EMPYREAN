import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../db/db.js";
import { authLimiter, returnedUser } from "../utils/auth-utils.js";

const router = Router();

// login
router.post("/", authLimiter, async (req, res, next) => {
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
    if (err) return next(err);

    req.session.userId = user.user_id;

    req.session.save(err => {
      if (err) return next(err);
      return res.json({ user: returnedUser(user) });
    });
  });
});

export default router;