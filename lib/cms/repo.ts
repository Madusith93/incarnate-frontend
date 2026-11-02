import { db } from './db';
import type { Item, ItemInput, PageContent, PageInput, Status } from './types';

/* ------------------------------------------------------------------ helpers */

interface ItemRow {
  id: number; section: string; parent_id: number | null; title: string; slug: string;
  description: string; meta_title: string; meta_description: string; meta_keywords: string;
  image1: string; image2: string; data: string; status: Status; sort_order: number;
  published_at: string; created_at: string; updated_at: string; child_count?: number;
}
interface PageRow {
  section: string; title: string; description: string; meta_title: string; meta_description: string;
  meta_keywords: string; image1: string; image2: string; data: string; updated_at: string;
}

function parseData(raw: string): Record<string, unknown> {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  } catch {
    return {};
  }
}

function toItem(r: ItemRow): Item {
  return {
    id: r.id, section: r.section, parentId: r.parent_id, title: r.title, slug: r.slug,
    description: r.description, metaTitle: r.meta_title, metaDescription: r.meta_description,
    metaKeywords: r.meta_keywords, image1: r.image1, image2: r.image2, data: parseData(r.data),
    status: r.status, sortOrder: r.sort_order, publishedAt: r.published_at,
    createdAt: r.created_at, updatedAt: r.updated_at, childCount: r.child_count,
  };
}

function toPage(r: PageRow): PageContent {
  return {
    section: r.section, title: r.title, description: r.description, metaTitle: r.meta_title,
    metaDescription: r.meta_description, metaKeywords: r.meta_keywords, image1: r.image1,
    image2: r.image2, data: parseData(r.data), updatedAt: r.updated_at,
  };
}

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 90) || 'item'
  );
}

function uniqueSlug(section: string, wanted: string, ignoreId?: number): string {
  const base = slugify(wanted);
  let slug = base;
  let n = 2;
  const stmt = db().prepare('SELECT id FROM items WHERE section = ? AND slug = ?');
  for (;;) {
    const hit = stmt.get(section, slug) as { id: number } | undefined;
    if (!hit || hit.id === ignoreId) return slug;
    slug = `${base}-${n++}`;
  }
}

/* -------------------------------------------------------------------- pages */

export function getPage(section: string): PageContent {
  const row = db().prepare('SELECT * FROM pages WHERE section = ?').get(section) as PageRow | undefined;
  if (row) return toPage(row);
  return {
    section, title: '', description: '', metaTitle: '', metaDescription: '', metaKeywords: '',
    image1: '', image2: '', data: {}, updatedAt: '',
  };
}

export function savePage(section: string, input: PageInput): void {
  db()
    .prepare(
      `INSERT INTO pages (section, title, description, meta_title, meta_description, meta_keywords, image1, image2, data, updated_at)
       VALUES (@section, @title, @description, @metaTitle, @metaDescription, @metaKeywords, @image1, @image2, @data, datetime('now'))
       ON CONFLICT(section) DO UPDATE SET
         title = excluded.title, description = excluded.description, meta_title = excluded.meta_title,
         meta_description = excluded.meta_description, meta_keywords = excluded.meta_keywords,
         image1 = excluded.image1, image2 = excluded.image2, data = excluded.data, updated_at = datetime('now')`,
    )
    .run({ section, ...input, data: JSON.stringify(input.data ?? {}) });
}

/* -------------------------------------------------------------------- items */

export interface ListOptions {
  /** undefined = top level (parent_id IS NULL); a number = children of that item */
  parentId?: number | null;
  q?: string;
  status?: Status | 'all';
}

export function listItems(section: string, opts: ListOptions = {}): Item[] {
  const where: string[] = ['i.section = @section'];
  const params: Record<string, unknown> = { section };
  if (opts.parentId == null) where.push('i.parent_id IS NULL');
  else {
    where.push('i.parent_id = @parentId');
    params.parentId = opts.parentId;
  }
  if (opts.status && opts.status !== 'all') {
    where.push('i.status = @status');
    params.status = opts.status;
  }
  if (opts.q?.trim()) {
    where.push('(i.title LIKE @q OR i.data LIKE @q)');
    params.q = `%${opts.q.trim().replace(/[%_]/g, '')}%`;
  }
  const rows = db()
    .prepare(
      `SELECT i.*, (SELECT COUNT(*) FROM items c WHERE c.parent_id = i.id) AS child_count
       FROM items i WHERE ${where.join(' AND ')} ORDER BY i.sort_order ASC, i.id ASC`,
    )
    .all(params) as ItemRow[];
  return rows.map(toItem);
}

export function getItem(id: number): Item | null {
  const row = db()
    .prepare(
      `SELECT i.*, (SELECT COUNT(*) FROM items c WHERE c.parent_id = i.id) AS child_count FROM items i WHERE i.id = ?`,
    )
    .get(id) as ItemRow | undefined;
  return row ? toItem(row) : null;
}

export function createItem(section: string, parentId: number | null, input: ItemInput): number {
  const max = db()
    .prepare('SELECT COALESCE(MAX(sort_order), 0) AS m FROM items WHERE section = ? AND parent_id IS ?')
    .get(section, parentId) as { m: number };
  const info = db()
    .prepare(
      `INSERT INTO items (section, parent_id, title, slug, description, meta_title, meta_description, meta_keywords,
                          image1, image2, data, status, sort_order, published_at)
       VALUES (@section, @parentId, @title, @slug, @description, @metaTitle, @metaDescription, @metaKeywords,
               @image1, @image2, @data, @status, @sortOrder, @publishedAt)`,
    )
    .run({
      section, parentId, ...input,
      slug: uniqueSlug(section, input.slug || input.title),
      data: JSON.stringify(input.data ?? {}),
      sortOrder: max.m + 1,
    });
  return Number(info.lastInsertRowid);
}

export function updateItem(id: number, input: ItemInput): void {
  const current = getItem(id);
  if (!current) return;
  db()
    .prepare(
      `UPDATE items SET title=@title, slug=@slug, description=@description, meta_title=@metaTitle,
         meta_description=@metaDescription, meta_keywords=@metaKeywords, image1=@image1, image2=@image2,
         data=@data, status=@status, published_at=@publishedAt, updated_at=datetime('now')
       WHERE id=@id`,
    )
    .run({
      id, ...input,
      slug: uniqueSlug(current.section, input.slug || input.title, id),
      data: JSON.stringify(input.data ?? {}),
    });
}

/** Deleting an item also deletes its sub content (ON DELETE CASCADE). Returns the removed item. */
export function deleteItem(id: number): Item | null {
  const item = getItem(id);
  if (!item) return null;
  db().prepare('DELETE FROM items WHERE id = ?').run(id);
  return item;
}

/** All image URLs of an item and everything beneath it (to clean up uploads on delete). */
export function collectImages(id: number): string[] {
  const rows = db()
    .prepare(
      `WITH RECURSIVE tree(id) AS (
         SELECT id FROM items WHERE id = ?
         UNION ALL SELECT i.id FROM items i JOIN tree t ON i.parent_id = t.id)
       SELECT image1, image2 FROM items WHERE id IN (SELECT id FROM tree)`,
    )
    .all(id) as { image1: string; image2: string }[];
  return rows.flatMap((r) => [r.image1, r.image2]).filter(Boolean);
}

export function setItemStatus(id: number, status: Status): void {
  db().prepare(`UPDATE items SET status = ?, updated_at = datetime('now') WHERE id = ?`).run(status, id);
}

/** Move an item to a 1-based position among its siblings and renumber them 1..n. */
export function moveItem(id: number, position: number): void {
  const item = getItem(id);
  if (!item) return;
  const siblings = db()
    .prepare('SELECT id FROM items WHERE section = ? AND parent_id IS ? ORDER BY sort_order ASC, id ASC')
    .all(item.section, item.parentId) as { id: number }[];
  const ids = siblings.map((s) => s.id).filter((x) => x !== id);
  const index = Math.min(Math.max(position - 1, 0), ids.length);
  ids.splice(index, 0, id);
  const upd = db().prepare('UPDATE items SET sort_order = ? WHERE id = ?');
  db().transaction(() => ids.forEach((sid, i) => upd.run(i + 1, sid)))();
}

export function countsBySection(): Record<string, { total: number; active: number }> {
  const rows = db()
    .prepare(
      `SELECT section, COUNT(*) AS total, SUM(status = 'active') AS active FROM items WHERE parent_id IS NULL GROUP BY section`,
    )
    .all() as { section: string; total: number; active: number }[];
  return Object.fromEntries(rows.map((r) => [r.section, { total: r.total, active: r.active ?? 0 }]));
}

export function recentlyUpdated(limit = 6): Item[] {
  return (db().prepare('SELECT * FROM items ORDER BY updated_at DESC, id DESC LIMIT ?').all(limit) as ItemRow[]).map(toItem);
}

export function isEmpty(): boolean {
  const r = db().prepare('SELECT (SELECT COUNT(*) FROM items) + (SELECT COUNT(*) FROM pages) AS n').get() as { n: number };
  return r.n === 0;
}

/* ------------------------------------------------------------------- public */

export interface PublicItem extends Omit<Item, 'sortOrder' | 'createdAt' | 'updatedAt' | 'childCount' | 'status' | 'parentId' | 'section'> {
  children: PublicItem[];
}

function toPublic(item: Item, section: string): PublicItem {
  const kids = listItems(section, { parentId: item.id, status: 'active' }).map((c) => toPublic(c, section));
  return {
    id: item.id, title: item.title, slug: item.slug, description: item.description,
    metaTitle: item.metaTitle, metaDescription: item.metaDescription, metaKeywords: item.metaKeywords,
    image1: item.image1, image2: item.image2, data: item.data, publishedAt: item.publishedAt, children: kids,
  };
}

/** What the public website reads: the page content plus only the ACTIVE items, in display order. */
export function getPublicSection(section: string) {
  const page = getPage(section);
  const items = listItems(section, { status: 'active' }).map((i) => toPublic(i, section));
  return {
    page: {
      title: page.title, description: page.description, metaTitle: page.metaTitle,
      metaDescription: page.metaDescription, metaKeywords: page.metaKeywords,
      image1: page.image1, image2: page.image2, data: page.data,
    },
    items,
  };
}

export function getPublicItem(section: string, slug: string): PublicItem | null {
  const row = db()
    .prepare(`SELECT * FROM items WHERE section = ? AND slug = ? AND status = 'active'`)
    .get(section, slug) as ItemRow | undefined;
  return row ? toPublic(toItem(row), section) : null;
}
