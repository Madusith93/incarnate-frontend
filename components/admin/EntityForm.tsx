'use client';

import Link from 'next/link';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronDown, Loader2, TriangleAlert } from 'lucide-react';
import type { Field } from '@/lib/cms/sections';
import type { FormState } from '@/lib/cms/forms';
import RichTextEditor from './RichTextEditor';

export interface FormValues {
  title: string;
  slug?: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  image1: string;
  image2: string;
  status?: 'active' | 'inactive';
  publishedAt?: string;
  data: Record<string, unknown>;
}

interface Props {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  titleLabel: string;
  descriptionLabel: string | false;
  imageLabels: string[];
  fields: Field[];
  meta: boolean;
  /** Item forms only: status, date and slug controls */
  publishing?: { dateLabel: string | false; showSlug: boolean };
  values: FormValues;
  submitLabel: string;
  cancelHref?: string;
}

const EMPTY: FormState = {};

export default function EntityForm({ action, titleLabel, descriptionLabel, imageLabels, fields, meta, publishing, values, submitLabel, cancelHref }: Props) {
  const [state, run, pending] = useActionState(action, EMPTY);
  // "dirty" = edited since the last save result. A new result object from the action makes it clean again.
  const [editedAt, setEditedAt] = useState<FormState | null>(null);
  const dirty = editedAt === state;
  const markDirty = () => setEditedAt(state);
  const bannerRef = useRef<HTMLDivElement>(null);
  // a field's error disappears as soon as that field is edited
  const [dismissed, setDismissed] = useState<{ for: FormState; keys: string[] }>({ for: EMPTY, keys: [] });
  const gone = dismissed.for === state ? dismissed.keys : [];
  const errors = Object.fromEntries(Object.entries(state.fieldErrors ?? {}).filter(([k]) => !gone.includes(k)));

  useEffect(() => {
    if (state.error) bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [state]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => run(fd));
  }

  const err = (k: string) => errors[k] && <div className="ad-err" role="alert">{errors[k]}</div>;

  return (
    <form onSubmit={onSubmit} onChange={(e) => {
        markDirty();
        const name = (e.nativeEvent.target as HTMLInputElement).name;
        if (name) setDismissed((d) => ({ for: state, keys: [...(d.for === state ? d.keys : []), name] }));
      }}
      noValidate
    >
      <div ref={bannerRef}>
        {state.error && <div className="ad-banner err" role="alert"><TriangleAlert size={16} /> {state.error}</div>}
      </div>

      <div className="ad-card"><div className="ad-card-body" style={{ paddingTop: 4, paddingBottom: 4 }}>
        <div className="ad-row">
          <label className="ad-label" htmlFor="f-title">{titleLabel}<span className="ad-req" aria-hidden>*</span></label>
          <div>
            <input id="f-title" name="title" className="ad-input" defaultValue={values.title} aria-invalid={!!errors.title} autoComplete="off" />
            {err('title')}
          </div>
        </div>

        {fields.map((f) => (
          <FieldRow key={f.name} field={f} value={values.data[f.name]} error={errors[`f_${f.name}`]} />
        ))}

        {descriptionLabel && (
          <div className="ad-row">
            <span className="ad-label" id="lbl-desc">{descriptionLabel}</span>
            <div style={{ minWidth: 0 }}>
              <RichTextEditor name="description" initialHtml={values.description} onDirty={markDirty} />
            </div>
          </div>
        )}

        {imageLabels.map((label, i) => (
          <ImageRow key={i} n={i + 1} label={label} current={i === 0 ? values.image1 : values.image2} error={errors[`image${i + 1}_file`]} />
        ))}

        {publishing && (
          <>
            <div className="ad-row">
              <label className="ad-label" htmlFor="f-status">Status<small>Inactive items are hidden from the website.</small></label>
              <div className="ad-split">
                <select id="f-status" name="status" className="ad-select" defaultValue={values.status ?? 'active'}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {publishing.dateLabel && (
                  <div>
                    <input name="publishedAt" type="date" aria-label={publishing.dateLabel} className="ad-input" defaultValue={values.publishedAt} aria-invalid={!!errors.publishedAt} />
                    {err('publishedAt')}
                  </div>
                )}
              </div>
            </div>
            {publishing.showSlug && (
              <div className="ad-row">
                <label className="ad-label" htmlFor="f-slug">Page address<small>Leave blank to build it from the title.</small></label>
                <div>
                  <input id="f-slug" name="slug" className="ad-input" defaultValue={values.slug} placeholder="my-article-title" aria-invalid={!!errors.slug} autoComplete="off" />
                  {err('slug')}
                </div>
              </div>
            )}
          </>
        )}
      </div></div>

      {meta && (
        <details className="ad-card ad-meta">
          <summary><ChevronDown size={16} /> SEO and meta data</summary>
          <div className="ad-card-body" style={{ paddingTop: 4, paddingBottom: 4 }}>
            <div className="ad-row">
              <label className="ad-label" htmlFor="f-mt">Meta title<small>Shown in browser tabs and search results. About 60 characters.</small></label>
              <textarea id="f-mt" name="metaTitle" className="ad-textarea" rows={2} defaultValue={values.metaTitle} />
            </div>
            <div className="ad-row">
              <label className="ad-label" htmlFor="f-md">Meta description<small>About 155 characters.</small></label>
              <textarea id="f-md" name="metaDescription" className="ad-textarea" rows={3} defaultValue={values.metaDescription} />
            </div>
            <div className="ad-row">
              <label className="ad-label" htmlFor="f-mk">Meta keywords<small>Separate with commas.</small></label>
              <textarea id="f-mk" name="metaKeywords" className="ad-textarea" rows={2} defaultValue={values.metaKeywords} />
            </div>
          </div>
        </details>
      )}

      <div className="ad-savebar">
        <button type="submit" className="ad-btn ad-btn-primary" disabled={pending}>
          {pending && <Loader2 size={15} className="animate-spin" />} {pending ? 'Saving…' : submitLabel}
        </button>
        {cancelHref && <Link href={cancelHref} className="ad-btn">Back to list</Link>}
        <span aria-live="polite" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {state.ok && !dirty && <span className="ad-status-msg ok"><CheckCircle2 size={15} style={{ verticalAlign: '-3px' }} /> {state.message ?? 'Saved.'}</span>}
          {dirty && !pending && <span className="ad-dirty">Unsaved changes</span>}
        </span>
      </div>
    </form>
  );
}

function FieldRow({ field: f, value, error }: { field: Field; value: unknown; error?: string }) {
  const id = `f_${f.name}`;
  const label = (
    <label className="ad-label" htmlFor={id}>
      {f.label}
      {f.required && <span className="ad-req" aria-hidden>*</span>}
      {f.help && f.type !== 'boolean' && <small>{f.help}</small>}
    </label>
  );
  let input: React.ReactNode;
  switch (f.type) {
    case 'textarea':
      input = <textarea id={id} name={id} className="ad-textarea" rows={f.rows ?? 4} defaultValue={String(value ?? '')} placeholder={f.placeholder} aria-invalid={!!error} />;
      break;
    case 'lines':
      input = <textarea id={id} name={id} className="ad-textarea" rows={f.rows ?? 5} defaultValue={Array.isArray(value) ? value.join('\n') : ''} placeholder={f.placeholder} aria-invalid={!!error} />;
      break;
    case 'select':
      input = (
        <select id={id} name={id} className="ad-select" defaultValue={String(value ?? '')} aria-invalid={!!error}>
          <option value="">Choose…</option>
          {f.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      );
      break;
    case 'combo':
      input = (
        <>
          <input id={id} name={id} className="ad-input" list={`${id}-list`} defaultValue={String(value ?? '')} placeholder={f.placeholder} aria-invalid={!!error} autoComplete="off" />
          <datalist id={`${id}-list`}>{f.options?.map((o) => <option key={o} value={o} />)}</datalist>
        </>
      );
      break;
    case 'boolean':
      input = (
        <label className="ad-check">
          <input type="checkbox" name={id} defaultChecked={value === true} /> {f.help ?? f.label}
        </label>
      );
      break;
    default:
      input = (
        <input
          id={id} name={id} className="ad-input" type={f.type === 'number' ? 'number' : 'text'} inputMode={f.type === 'url' ? 'url' : undefined}
          defaultValue={value == null ? '' : String(value)} placeholder={f.placeholder} aria-invalid={!!error} autoComplete="off"
        />
      );
  }
  return (
    <div className="ad-row">
      {label}
      <div>
        {input}
        {error && <div className="ad-err" role="alert">{error}</div>}
      </div>
    </div>
  );
}

function ImageRow({ n, label, current, error }: { n: number; label: string; current: string; error?: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const shown = preview ?? (removed ? '' : current);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  return (
    <div className="ad-row">
      <label className="ad-label" htmlFor={`image${n}_file`}>{label}<small>JPG, PNG, WebP, GIF or AVIF, up to 8 MB.</small></label>
      <div className="ad-image">
        <div className="ad-thumb" style={shown ? { backgroundImage: `url("${shown}")` } : undefined} role="img" aria-label={shown ? `${label} preview` : `No ${label.toLowerCase()} chosen`}>
          {!shown && 'No image'}
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <input type="hidden" name={`image${n}_current`} value={current} />
          <input
            id={`image${n}_file`} name={`image${n}_file`} type="file" className="ad-file"
            accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setPreview(f ? URL.createObjectURL(f) : null);
              if (f) setRemoved(false);
            }}
          />
          {current && (
            <label className="ad-check" style={{ display: 'flex' }}>
              <input type="checkbox" name={`image${n}_remove`} checked={removed} onChange={(e) => { setRemoved(e.target.checked); if (e.target.checked) setPreview(null); }} /> Remove current image
            </label>
          )}
          {current && <div className="ad-help" style={{ wordBreak: 'break-all' }}>{current}</div>}
          {error && <div className="ad-err" role="alert">{error}</div>}
        </div>
      </div>
    </div>
  );
}
