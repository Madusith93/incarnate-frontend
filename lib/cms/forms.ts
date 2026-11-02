import 'server-only';
import { cleanHtml } from './sanitize';
import { removeUploaded, saveImage, UploadError } from './uploads';
import type { Field, ItemConfig, SectionDef } from './sections';
import type { ItemInput, PageInput, Status } from './types';

export interface FormState {
  ok?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim();

function isUrlish(v: string) {
  return /^https?:\/\//i.test(v) || v.startsWith('/');
}

/** Read custom fields (f_<name>) according to the section config. */
function readFields(fd: FormData, fields: Field[], errors: Record<string, string>): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const f of fields) {
    const key = `f_${f.name}`;
    switch (f.type) {
      case 'boolean':
        data[f.name] = fd.get(key) === 'on';
        break;
      case 'lines':
        data[f.name] = String(fd.get(key) ?? '')
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        if (f.required && !(data[f.name] as string[]).length) errors[key] = `${f.label} is required.`;
        break;
      case 'number': {
        const raw = str(fd, key);
        data[f.name] = raw === '' ? null : Number(raw);
        if (raw !== '' && Number.isNaN(data[f.name])) errors[key] = `${f.label} must be a number.`;
        else if (f.required && raw === '') errors[key] = `${f.label} is required.`;
        break;
      }
      default: {
        const v = str(fd, key);
        data[f.name] = v;
        if (f.required && !v) errors[key] = `${f.label} is required.`;
        if (f.type === 'url' && v && !isUrlish(v)) errors[key] = `${f.label} must start with https:// or /.`;
        if (f.type === 'select' && v && f.options && !f.options.includes(v)) errors[key] = `Choose one of the listed ${f.label.toLowerCase()} options.`;
      }
    }
  }
  return data;
}

interface ImageResult {
  images: [string, string];
  /** Old uploads to delete once the database write succeeded */
  discard: string[];
  /** New uploads to delete if the database write fails */
  created: string[];
}

async function readImages(fd: FormData, slots: number, errors: Record<string, string>): Promise<ImageResult> {
  const out: ImageResult = { images: ['', ''], discard: [], created: [] };
  for (let i = 0; i < 2; i++) {
    const n = i + 1;
    const current = str(fd, `image${n}_current`);
    if (i >= slots) {
      out.images[i] = '';
      if (current) out.discard.push(current);
      continue;
    }
    const file = fd.get(`image${n}_file`);
    const remove = fd.get(`image${n}_remove`) === 'on';
    if (file instanceof File && file.size > 0) {
      try {
        const url = await saveImage(file);
        out.created.push(url);
        out.images[i] = url;
        if (current) out.discard.push(current);
      } catch (e) {
        errors[`image${n}_file`] = e instanceof UploadError ? e.message : 'Upload failed.';
        out.images[i] = current;
      }
    } else if (remove) {
      out.images[i] = '';
      if (current) out.discard.push(current);
    } else {
      out.images[i] = current;
    }
  }
  return out;
}

export async function discardUploads(urls: string[]) {
  await Promise.all(urls.map((u) => removeUploaded(u)));
}

export type Parsed<T> =
  | { ok: true; input: T; discard: string[]; created: string[] }
  | { ok: false; state: FormState; created: string[] };

export async function parsePageForm(def: SectionDef, fd: FormData): Promise<Parsed<PageInput>> {
  const errors: Record<string, string> = {};
  const title = str(fd, 'title');
  if (!title) errors.title = `${def.page.titleLabel} is required.`;
  const imgs = await readImages(fd, def.page.images.length, errors);
  const data = readFields(fd, def.page.fields, errors);
  if (Object.keys(errors).length) {
    await discardUploads(imgs.created);
    return { ok: false, created: [], state: { error: 'Fix the highlighted fields and save again.', fieldErrors: errors } };
  }
  return {
    ok: true,
    discard: imgs.discard,
    created: imgs.created,
    input: {
      title,
      description: def.page.description ? cleanHtml(String(fd.get('description') ?? '')) : '',
      metaTitle: def.page.meta ? str(fd, 'metaTitle') : '',
      metaDescription: def.page.meta ? str(fd, 'metaDescription') : '',
      metaKeywords: def.page.meta ? str(fd, 'metaKeywords') : '',
      image1: imgs.images[0],
      image2: imgs.images[1],
      data,
    },
  };
}

export async function parseItemForm(cfg: ItemConfig, fd: FormData): Promise<Parsed<ItemInput>> {
  const errors: Record<string, string> = {};
  const title = str(fd, 'title');
  if (!title) errors.title = `${cfg.titleLabel} is required.`;
  const status: Status = str(fd, 'status') === 'inactive' ? 'inactive' : 'active';
  const publishedAt = str(fd, 'publishedAt') || new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt) || Number.isNaN(Date.parse(publishedAt))) errors.publishedAt = 'Use a valid date.';
  const slug = str(fd, 'slug');
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.slug = 'Use lowercase letters, numbers and hyphens only.';
  const imgs = await readImages(fd, cfg.images.length, errors);
  const data = readFields(fd, cfg.fields, errors);
  if (Object.keys(errors).length) {
    await discardUploads(imgs.created);
    return { ok: false, created: [], state: { error: 'Fix the highlighted fields and save again.', fieldErrors: errors } };
  }
  return {
    ok: true,
    discard: imgs.discard,
    created: imgs.created,
    input: {
      title,
      slug,
      description: cfg.description ? cleanHtml(String(fd.get('description') ?? '')) : '',
      metaTitle: cfg.meta ? str(fd, 'metaTitle') : '',
      metaDescription: cfg.meta ? str(fd, 'metaDescription') : '',
      metaKeywords: cfg.meta ? str(fd, 'metaKeywords') : '',
      image1: imgs.images[0],
      image2: imgs.images[1],
      data,
      status,
      publishedAt,
    },
  };
}
