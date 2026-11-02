'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteItemAction, moveItemAction } from '@/app/admin/actions';

/** "Display order" dropdown: picking a position re-numbers the siblings. */
export function OrderSelect({ id, position, total }: { id: number; position: number; total: number }) {
  const [pending, start] = useTransition();
  return (
    <select
      className="ad-order"
      aria-label="Display order"
      value={position}
      disabled={pending}
      onChange={(e) => start(() => moveItemAction(id, Number(e.target.value)))}
    >
      {Array.from({ length: total }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
    </select>
  );
}

export function DeleteButton({ id, title, hasChildren }: { id: number; title: string; hasChildren: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className="ad-icon-btn danger"
      title="Delete"
      aria-label={`Delete ${title}`}
      disabled={pending}
      onClick={() => {
        const extra = hasChildren ? '\n\nIts sub content will be deleted too.' : '';
        if (window.confirm(`Delete “${title}”? This cannot be undone.${extra}`)) start(() => deleteItemAction(id));
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
