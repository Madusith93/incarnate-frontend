'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { endSession, login, requireUser } from '@/lib/cms/auth';
import { db } from '@/lib/cms/db';
import { discardUploads, parseItemForm, parsePageForm, type FormState } from '@/lib/cms/forms';
import { hashPassword, verifyPassword } from '@/lib/cms/password';
import {
  collectImages, createItem, deleteItem, getItem, moveItem, savePage, setItemStatus, updateItem,
} from '@/lib/cms/repo';
import { getSectionDef } from '@/lib/cms/sections';

function refresh(section: string) {
  revalidatePath('/admin', 'layout');
  const def = getSectionDef(section);
  if (def?.publicPath) revalidatePath(def.publicPath);
}

function listUrl(section: string, parentId: number | null) {
  return parentId ? `/admin/${section}/${parentId}` : `/admin/${section}`;
}

/* ------------------------------------------------------------------ session */

export async function loginAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = String(fd.get('email') ?? '');
  const password = String(fd.get('password') ?? '');
  if (!email || !password) return { error: 'Enter your email and password.' };
  const result = await login(email, password);
  if (!result.ok) return { error: result.error };
  redirect('/admin');
}

export async function logoutAction() {
  await endSession();
  redirect('/admin/login');
}

export async function changePasswordAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const user = await requireUser();
  const current = String(fd.get('current') ?? '');
  const next = String(fd.get('next') ?? '');
  const confirm = String(fd.get('confirm') ?? '');
  const row = db().prepare('SELECT password_hash FROM users WHERE id = ?').get(user.id) as { password_hash: string };
  if (!verifyPassword(current, row.password_hash)) return { fieldErrors: { current: 'Current password is incorrect.' }, error: 'Password not changed.' };
  if (next.length < 10) return { fieldErrors: { next: 'Use at least 10 characters.' }, error: 'Password not changed.' };
  if (next !== confirm) return { fieldErrors: { confirm: 'The two passwords do not match.' }, error: 'Password not changed.' };
  db().prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(next), user.id);
  return { ok: true, message: 'Password changed.' };
}

/* ------------------------------------------------------------- main content */

export async function savePageAction(section: string, _prev: FormState, fd: FormData): Promise<FormState> {
  await requireUser();
  const def = getSectionDef(section);
  if (!def) return { error: 'Unknown section.' };
  const parsed = await parsePageForm(def, fd);
  if (!parsed.ok) return parsed.state;
  try {
    savePage(section, parsed.input);
  } catch (e) {
    await discardUploads(parsed.created);
    console.error('[cms] savePage failed', e);
    return { error: 'Could not save. Try again.' };
  }
  await discardUploads(parsed.discard);
  refresh(section);
  return { ok: true, message: 'Saved.' };
}

/* -------------------------------------------------------------- sub content */

/** id = null creates a new item (optionally under parentId). */
export async function saveItemAction(
  section: string,
  id: number | null,
  parentId: number | null,
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireUser();
  const def = getSectionDef(section);
  if (!def?.items) return { error: 'Unknown section.' };

  if (id !== null) {
    const existing = getItem(id);
    if (!existing || existing.section !== section) return { error: 'This item no longer exists.' };
  }
  if (parentId !== null) {
    const parent = getItem(parentId);
    if (!parent || parent.section !== section || !def.items.nested) return { error: 'Invalid parent item.' };
  }

  const parsed = await parseItemForm(def.items, fd);
  if (!parsed.ok) return parsed.state;

  try {
    if (id === null) createItem(section, parentId, parsed.input);
    else updateItem(id, parsed.input);
  } catch (e) {
    await discardUploads(parsed.created);
    console.error('[cms] saveItem failed', e);
    return { error: 'Could not save. Try again.' };
  }
  await discardUploads(parsed.discard);
  refresh(section);

  if (id === null) redirect(`${listUrl(section, parentId)}?flash=created`);
  return { ok: true, message: 'Saved.' };
}

export async function deleteItemAction(id: number) {
  await requireUser();
  const item = getItem(id);
  if (!item) return;
  const images = collectImages(id);
  deleteItem(id);
  await discardUploads(images);
  refresh(item.section);
  redirect(`${listUrl(item.section, item.parentId)}?flash=deleted`);
}

export async function toggleStatusAction(id: number) {
  await requireUser();
  const item = getItem(id);
  if (!item) return;
  setItemStatus(id, item.status === 'active' ? 'inactive' : 'active');
  refresh(item.section);
}

export async function moveItemAction(id: number, position: number) {
  await requireUser();
  const item = getItem(id);
  if (!item || !Number.isInteger(position)) return;
  moveItem(id, position);
  refresh(item.section);
}
