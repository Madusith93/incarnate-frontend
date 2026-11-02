import 'server-only';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOAD_DIR } from './db';

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const UPLOAD_URL_PREFIX = '/uploads/';

/** Detect the real image type from the file's bytes — never trust the filename or MIME header. */
function detectType(b: Buffer): 'jpg' | 'png' | 'gif' | 'webp' | 'avif' | null {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpg';
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (b.subarray(0, 4).toString('ascii') === 'GIF8') return 'gif';
  if (b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP') return 'webp';
  if (b.subarray(4, 8).toString('ascii') === 'ftyp' && ['avif', 'avis'].includes(b.subarray(8, 12).toString('ascii'))) return 'avif';
  return null;
}

export const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif',
};

export class UploadError extends Error {}

/** Saves an uploaded image and returns its public URL (/uploads/2026/11/<random>.png). */
export async function saveImage(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError(`"${file.name}" is larger than 8 MB.`);
  const buf = Buffer.from(await file.arrayBuffer());
  const type = detectType(buf);
  if (!type) throw new UploadError(`"${file.name}" is not a JPG, PNG, GIF, WebP or AVIF image.`);
  const now = new Date();
  const rel = path.posix.join(
    String(now.getUTCFullYear()),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    `${crypto.randomBytes(9).toString('hex')}.${type}`,
  );
  const abs = path.join(UPLOAD_DIR, ...rel.split('/'));
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, buf);
  return UPLOAD_URL_PREFIX + rel;
}

/** Resolve a /uploads/… URL to a file inside UPLOAD_DIR, or null if it escapes the directory. */
export function resolveUpload(rel: string): string | null {
  const abs = path.resolve(UPLOAD_DIR, rel);
  return abs.startsWith(path.resolve(UPLOAD_DIR) + path.sep) ? abs : null;
}

/** Remove an uploaded file when its image is replaced or its item is deleted. Ignores non-uploads (e.g. /projects/x.jpg). */
export async function removeUploaded(url: string | undefined | null): Promise<void> {
  if (!url || !url.startsWith(UPLOAD_URL_PREFIX)) return;
  const abs = resolveUpload(url.slice(UPLOAD_URL_PREFIX.length));
  if (abs) await fs.rm(abs, { force: true });
}
