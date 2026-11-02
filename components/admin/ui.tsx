import Link from 'next/link';
import { CheckCircle2, ExternalLink, Pencil, Plus } from 'lucide-react';
import { toggleStatusAction } from '@/app/admin/actions';
import type { ItemConfig } from '@/lib/cms/sections';
import type { Item } from '@/lib/cms/types';
import { DeleteButton, OrderSelect } from './RowControls';

export function Crumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  const all = [{ label: 'Home', href: '/admin' }, { label: 'Content Management' }, ...trail];
  return (
    <nav className="ad-crumbs" aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
      {all.map((c, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
          {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current={i === all.length - 1 ? 'page' : undefined}>{c.label}</span>}
          {i < all.length - 1 && <span aria-hidden>›</span>}
        </span>
      ))}
    </nav>
  );
}

export function Flash({ flash, noun }: { flash?: string; noun: string }) {
  if (flash !== 'created' && flash !== 'deleted') return null;
  return (
    <div className="ad-banner ok" role="status">
      <CheckCircle2 size={16} /> {noun.charAt(0).toUpperCase() + noun.slice(1)} {flash === 'created' ? 'added.' : 'deleted.'}
    </div>
  );
}

interface TableProps {
  section: string;
  cfg: ItemConfig;
  /** every sibling, unfiltered, in display order (positions come from here) */
  all: Item[];
  /** the rows to show (after search/filter) */
  rows: Item[];
  /** parent of the rows, so "Add sub" links and returns work */
  filtered: boolean;
}

export function ItemTable({ section, cfg, all, rows, filtered }: TableProps) {
  if (rows.length === 0) {
    return (
      <div className="ad-empty">
        <b>{filtered ? `No ${cfg.plural.toLowerCase()} match your search.` : `No ${cfg.plural.toLowerCase()} yet.`}</b>
        {filtered ? 'Clear the search or change the status filter.' : `Add the first ${cfg.singular} to get started.`}
      </div>
    );
  }
  const position = new Map(all.map((it, i) => [it.id, i + 1]));
  return (
    <div className="ad-tablewrap">
      <table className="ad-table">
        <thead>
          <tr>
            <th scope="col">Listings</th>
            <th scope="col">{cfg.date || 'Added'}</th>
            {cfg.columns.map((c) => <th key={c.key} scope="col">{c.label}</th>)}
            <th scope="col">Status</th>
            <th scope="col">Display order</th>
            <th scope="col"><span style={{ position: 'absolute', left: -9999 }}>Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((it) => (
            <tr key={it.id}>
              <td>
                <Link href={`/admin/${section}/${it.id}`} className="t-title">{it.title}</Link>
                {cfg.nested && (it.childCount ?? 0) > 0 && (
                  <Link href={`/admin/${section}/${it.id}`} className="ad-chip" title="Open sub content">{it.childCount} sub</Link>
                )}
              </td>
              <td style={{ whiteSpace: 'nowrap', color: 'var(--muted)' }}>{cfg.date ? it.publishedAt : it.createdAt.slice(0, 10)}</td>
              {cfg.columns.map((c) => <td key={c.key}>{String(it.data[c.key] ?? '')}</td>)}
              <td>
                <form action={toggleStatusAction.bind(null, it.id)}>
                  <button
                    type="submit"
                    className="ad-dot-btn"
                    title={it.status === 'active' ? 'Active. Click to hide from the website' : 'Inactive. Click to show on the website'}
                  >
                    <span className={`ad-dot ${it.status === 'active' ? '' : 'off'}`} aria-hidden />
                    {it.status === 'active' ? 'Active' : 'Inactive'}
                  </button>
                </form>
              </td>
              <td><OrderSelect id={it.id} position={position.get(it.id) ?? 1} total={all.length} /></td>
              <td>
                <div className="t-actions">
                  {cfg.nested && (
                    <Link href={`/admin/${section}/new?parent=${it.id}`} className="ad-btn ad-btn-sm" style={{ marginRight: 6 }}>
                      <Plus size={13} /> Add sub
                    </Link>
                  )}
                  <Link href={`/admin/${section}/${it.id}`} className="ad-icon-btn" title="Edit" aria-label={`Edit ${it.title}`}><Pencil size={16} /></Link>
                  <DeleteButton id={it.id} title={it.title} hasChildren={(it.childCount ?? 0) > 0} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SearchBar({ q, status, withStatus = true }: { q?: string; status?: string; withStatus?: boolean }) {
  return (
    <form className="ad-toolbar" role="search" method="get">
      <input name="q" className="ad-input" defaultValue={q} placeholder="Search by title" aria-label="Search by title" />
      {withStatus && (
        <select name="status" className="ad-select" defaultValue={status ?? 'all'} aria-label="Filter by status">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      )}
      <button className="ad-btn ad-btn-sm" type="submit">Search</button>
      {(q || (status && status !== 'all')) && <Link href="?" className="ad-btn ad-btn-sm">Clear</Link>}
    </form>
  );
}

export function ViewOnSite({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="ad-btn ad-btn-sm">
      <ExternalLink size={14} /> View on site
    </a>
  );
}
