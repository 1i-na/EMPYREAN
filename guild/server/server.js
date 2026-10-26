import express from "express";
import path from 'node:path';
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import session from "express-session";
import { rateLimit } from "express-rate-limit";

const app = express();
const db = new Database("guild.sqlite");

const sections = new Set([
  "Scale", "Tail", "Heart", "Flame", "Fang",
  "Claw", "Gem", "Sol", "Nova", "Luna", "Dawn",
]);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL COLLATE NOCASE UNIQUE,
    nickname TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    verified INTEGER NOT NULL DEFAULT 0,
    rider INTEGER NOT NULL DEFAULT 0,
    section TEXT,
    rank_title TEXT NOT NULL DEFAULT '',
    total_points INTEGER NOT NULL DEFAULT 0,
    bounties_completed INTEGER NOT NULL DEFAULT 0,
    bounties_requested INTEGER NOT NULL DEFAULT 0
  )
`);

app.use(express.json());

// use session cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-this",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// rate-limit requests to signup/login (allow 10 requests per IP per 15 mins)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
});

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

app.post("/api/signup", authLimiter, async (req, res) => {
  const { username, nickname, password, isRider, section } = req.body ?? {};
  
  if (
    typeof username !== "string" ||
    typeof nickname !== "string" ||
    typeof password !== "string" ||
    typeof isRider !== "boolean"
  ) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  const cleanUsername = username.trim();
  const cleanNickname = nickname.trim();

  if (!cleanUsername || cleanUsername.length > 80 ||
      !cleanNickname || cleanNickname.length > 80) {
    return res.status(400).json({ error: "Username or nickname is invalid." });
  }

  if (password.length < 7 || password.length > 200) {
    return res.status(400).json({ error: "Password must be at least 7 characters." });
  }

  const cleanSection = isRider ? section : null;

  if (isRider && !sections.has(cleanSection)) {
    return res.status(400).json({ error: "Choose a valid rider section." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 7);

    const result = db.prepare(`
      INSERT INTO users (username, nickname, password_hash, rider, section)
      VALUES (?, ?, ?, ?, ?)
    `).run(cleanUsername, cleanNickname, passwordHash, isRider ? 1 : 0, cleanSection);

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

app.post("/api/login", authLimiter, async (req, res) => {
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

// check if browser has valid login session
app.get("/api/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not logged in." });
  }

  const user = db.prepare(
    "SELECT * FROM users WHERE user_id = ?"
  ).get(req.session.userId);

  if (!user) return res.status(401).json({ error: "Not logged in." });
  return res.json({ user: returnedUser(user) });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out." });
  });
});

// server react app
app.use(express.static(path.resolve('../ridersguild/dist')));

app.use((req, res) => {
  res.status(404).json({message: 'Page not found'});
});

export default app;