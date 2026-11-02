import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Where the CMS keeps its database and uploaded files.
 * Override with CMS_DATA_DIR (point it at a persistent disk in production).
 */
export const DATA_DIR = process.env.CMS_DATA_DIR
  ? path.resolve(process.env.CMS_DATA_DIR)
  : path.join(process.cwd(), 'data');
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One row per section: the "main content" form (title, description, meta, images)
CREATE TABLE IF NOT EXISTS pages (
  section          TEXT PRIMARY KEY,
  title            TEXT NOT NULL DEFAULT '',
  description      TEXT NOT NULL DEFAULT '',
  meta_title       TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  meta_keywords    TEXT NOT NULL DEFAULT '',
  image1           TEXT NOT NULL DEFAULT '',
  image2           TEXT NOT NULL DEFAULT '',
  data             TEXT NOT NULL DEFAULT '{}',
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

-- "Sub content": the listing under a section. parent_id gives the "Add sub" nesting.
CREATE TABLE IF NOT EXISTS items (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  section          TEXT NOT NULL,
  parent_id        INTEGER REFERENCES items(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  meta_title       TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  meta_keywords    TEXT NOT NULL DEFAULT '',
  image1           TEXT NOT NULL DEFAULT '',
  image2           TEXT NOT NULL DEFAULT '',
  data             TEXT NOT NULL DEFAULT '{}',
  status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
  sort_order       INTEGER NOT NULL DEFAULT 0,
  published_at     TEXT NOT NULL DEFAULT (date('now')),
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_items_section ON items(section, parent_id, sort_order);
CREATE UNIQUE INDEX IF NOT EXISTS idx_items_slug ON items(section, slug);
`;

declare global {
  var __cmsDb: Database.Database | undefined;
}

function open(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const conn = new Database(path.join(DATA_DIR, 'cms.db'));
  conn.pragma('journal_mode = WAL');
  conn.pragma('foreign_keys = ON');
  conn.exec(SCHEMA);
  return conn;
}

/** Singleton connection (survives hot reload in dev). */
export function db(): Database.Database {
  return (globalThis.__cmsDb ??= open());
}
