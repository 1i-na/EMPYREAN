import Database from "better-sqlite3";

export const db = new Database("guild.sqlite");

// all emp sections
export const sections = new Set([
  "Scale", "Tail", "Heart", "Flame", "Fang",
  "Claw", "Gem", "Sol", "Nova", "Luna", "Dawn",
]);

// create users db table
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