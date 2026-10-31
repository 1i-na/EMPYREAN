import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, sections } from "../db/db.js";
import { authLimiter } from "../utils/auth-utils.js";
import { isValidUsername, isValidPassword } from "../utils/validation.js";

const router = Router();

// signup/create new user account
router.post("/", authLimiter, async (req, res) => {
  const { username, nickname, password, isRider, section } = req.body ?? {};
  
  if (
    typeof username !== "string" ||
    typeof nickname !== "string" ||
    typeof password !== "string" ||
    typeof isRider !== "boolean"
  ) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  const validUsername = isValidUsername(username);
  const validNickname = nickname.trim();
  
  // validate username
  if (!validUsername) {
    return res.status(400).json({
      error: "Enter a valid Discord username."
    });
  }

  // validate nickname
  if (!validNickname || validNickname.length > 80) {
    return res.status(400).json({ error: "Nickname is invalid." });
  }

  // validate password
  if (!isValidPassword(password)) {
    return res.status(400).json({ 
      error: "Password must be at least 7 characters and contain no whitespace." 
    });
  }

  // validate section
  const validSection = isRider ? section : null;

  if (isRider && !sections.has(validSection)) {
    return res.status(400).json({ error: "Choose a valid rider section." });
  }

  // hash password
  try {
    const passwordHash = await bcrypt.hash(password, 7);

    const result = db.prepare(`
      INSERT INTO users (username, nickname, password_hash, rider, section)
      VALUES (?, ?, ?, ?, ?)
    `).run(validUsername, validNickname, passwordHash, isRider ? 1 : 0, validSection);

    const userId = Number(result.lastInsertRowid);

    // regenerate session id
    req.session.regenerate((err) => {
      if (err) {
        console.error("Could not regenerate signup session:", err);
        return res.status(500).json({ error: "Account created, but could not start a session." });
      }

      req.session.userId = userId;

      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Could not save signup session:", saveErr);
          return res.status(500).json({ error: "Account created, but could not start a session." });
        }

        return res.status(201).json({ user: { user_id: userId } });
      });
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({ error: "Username already exists." });
    }
    console.error(error);
    return res.status(500).json({ error: "Could not create account." });
  }
});

export default router;