import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

const envPath = path.resolve(import.meta.dirname, '.env');
process.loadEnvFile(envPath);

const db = new Database("guild.sqlite", { readonly: true });

// file headers
const headers = [
  "user_id",
  "username",
  "nickname",
  "verified",
  "rider",
  "section",
  "rank_title",
  "total_points",
  "bounties_completed",
  "bounties_requested"
];

// format values to csv-safe fields
function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

try {
  const users = db.prepare(`
    SELECT
      user_id,
      username,
      nickname,
      verified,
      rider,
      section,
      rank_title,
      total_points,
      bounties_completed,
      bounties_requested
    FROM users
    ORDER BY username ASC
  `).all();

  // get valid users
  const rows = users.map(user =>
    headers.map(header => {
      if (header === "verified" || header === "rider") {
        return escapeCsv(Boolean(user[header]));
      }
      return escapeCsv(user[header]);
    }).join(",")
  );

  // format csv file with contents
  const csv = [headers.join(","), ...rows].join("\r\n") + "\r\n";

  // generate and export file
  const outputDir = process.env.EXPORT_DIR || path.join(os.homedir(), "Downloads");
  const outputFile = path.join(outputDir, "guild_users_info.txt");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, csv, "utf8");

  console.log(`Exported ${users.length} users to ${outputDir}`);
} finally {
  db.close();
}