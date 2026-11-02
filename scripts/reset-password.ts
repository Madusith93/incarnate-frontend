import { db } from '../lib/cms/db';
import { hashPassword } from '../lib/cms/password';

const [email, password] = process.argv.slice(2);
if (!email || !password || password.length < 10) {
  console.error('Usage: npx tsx scripts/reset-password.ts <email> <password of 10+ characters>');
  process.exit(1);
}
const hash = hashPassword(password);
const found = db().prepare('UPDATE users SET password_hash = ? WHERE email = ? COLLATE NOCASE').run(hash, email);
if (!found.changes) db().prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email.toLowerCase(), hash);
console.log(found.changes ? 'Password updated for' : 'User created:', email);
