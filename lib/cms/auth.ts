import 'server-only';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DATA_DIR, db } from './db';
import { verifyPassword } from './password';

export const SESSION_COOKIE = 'cms_session';
const SESSION_HOURS = 12;

export interface AdminUser {
  id: number;
  email: string;
}

/** SESSION_SECRET from env, otherwise a random secret generated once and kept in the data dir. */
function secret(): string {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const file = path.join(DATA_DIR, '.session-secret');
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const s = crypto.randomBytes(48).toString('base64url');
    fs.writeFileSync(file, s, { mode: 0o600 });
    return s;
  }
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

function encode(uid: number, expires: number): string {
  const payload = Buffer.from(JSON.stringify({ uid, exp: expires })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function decode(token: string | undefined): number | null {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (typeof uid !== 'number' || typeof exp !== 'number' || exp < Date.now()) return null;
    return uid;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const jar = await cookies();
  const uid = decode(jar.get(SESSION_COOKIE)?.value);
  if (uid == null) return null;
  const row = db().prepare('SELECT id, email FROM users WHERE id = ?').get(uid) as AdminUser | undefined;
  return row ?? null;
}

/** Call at the top of every admin page, action and API route. */
export async function requireUser(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');
  return user;
}

export async function startSession(userId: number): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, encode(userId, Date.now() + SESSION_HOURS * 3600_000), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

/* ---- login throttling (in-memory: resets on restart, fine for a single-node admin) ---- */

const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60_000;
const MAX_ATTEMPTS = 6;

async function clientKey(email: string): Promise<string> {
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local';
  return `${ip}|${email.toLowerCase()}`;
}

export async function login(email: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = await clientKey(email);
  const now = Date.now();
  const rec = attempts.get(key);
  if (rec && now - rec.first < WINDOW_MS && rec.count >= MAX_ATTEMPTS) {
    return { ok: false, error: 'Too many attempts. Try again in a few minutes.' };
  }
  const row = db()
    .prepare('SELECT id, password_hash FROM users WHERE email = ? COLLATE NOCASE')
    .get(email.trim()) as { id: number; password_hash: string } | undefined;
  // verify against a dummy hash when the user is missing so timing doesn't reveal valid emails
  const hash = row?.password_hash ?? 'scrypt$AAAAAAAAAAAAAAAAAAAAAA==$' + Buffer.alloc(64).toString('base64');
  const valid = verifyPassword(password, hash) && !!row;
  if (!valid) {
    const fresh = !rec || now - rec.first >= WINDOW_MS;
    attempts.set(key, { count: fresh ? 1 : rec.count + 1, first: fresh ? now : rec.first });
    return { ok: false, error: 'Email or password is incorrect.' };
  }
  attempts.delete(key);
  await startSession(row!.id);
  return { ok: true };
}
