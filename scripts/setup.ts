/**
 * npm run cms:setup            → create the database, the first admin user, and import the existing site content
 * npm run cms:import           → wipe all CMS content and re-import it from the source files (asks nothing, use with care)
 *
 * Env:  ADMIN_EMAIL, ADMIN_PASSWORD  (otherwise a random password is generated and printed once)
 */
import crypto from 'node:crypto';
import { db } from '../lib/cms/db';
import { hashPassword } from '../lib/cms/password';
import { isEmpty } from '../lib/cms/repo';
import { importExisting } from './import-existing';

const args = new Set(process.argv.slice(2));
const conn = db();

// 1. first admin user
const users = (conn.prepare('SELECT COUNT(*) AS n FROM users').get() as { n: number }).n;
if (users === 0) {
  const email = (process.env.ADMIN_EMAIL || 'admin@incarnate.lk').trim().toLowerCase();
  const generated = !process.env.ADMIN_PASSWORD;
  const password = process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64url');
  if (password.length < 10) throw new Error('ADMIN_PASSWORD must be at least 10 characters.');
  conn.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hashPassword(password));
  console.log('\n✔ Admin user created');
  console.log(`  email:    ${email}`);
  console.log(`  password: ${generated ? password + '   (generated, shown once. Change it under Change password)' : '(from ADMIN_PASSWORD)'}`);
} else {
  console.log('• Admin user already exists, skipped');
}

// 2. content import
if (args.has('--force')) {
  conn.exec('DELETE FROM items; DELETE FROM pages;');
  console.log('• Existing CMS content wiped');
}
if (isEmpty()) {
  const counts = importExisting();
  console.log('\n✔ Imported existing site content');
  for (const [k, v] of Object.entries(counts)) console.log(`  ${k.padEnd(14)} ${v}`);
} else {
  console.log('• Content already present, import skipped (use "npm run cms:import" to wipe and re-import)');
}
console.log('\nDone. Start the site with "npm run dev" and open /admin\n');
