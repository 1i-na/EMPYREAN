import fs from 'node:fs/promises';
import { parse } from 'csv-parse/sync';

// load user data from csv file
async function loadUserData() {
  const content = await fs.readFile('./data/guild_users_info.txt', 'utf-8');
  return parse(content, {
    columns: true,
    skipEmptyLines: true
  });
}