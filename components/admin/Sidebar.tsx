'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ExternalLink, KeyRound, Menu, Minus, Plus, X } from 'lucide-react';

export interface NavSection {
  key: string;
  label: string;
  count: number | null;
}

export default function Sidebar({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();
  const [groupOpen, setGroupOpen] = useState(true);
  const [drawer, setDrawer] = useState(false);

  const current = pathname.split('/')[2] ?? '';

  return (
    <>
      <button
        type="button"
        className="ad-icon-btn ad-menu-btn"
        style={{ position: 'fixed', top: 10, left: 10, zIndex: 40, background: '#fff', border: '1px solid var(--line)' }}
        aria-label="Open menu"
        onClick={() => setDrawer(true)}
      >
        <Menu size={18} />
      </button>

      <aside className="ad-side" data-open={drawer} aria-label="Admin navigation">
        <div className="ad-brand" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <b>Incarnate</b>
            <span>Content manager</span>
          </div>
          <button type="button" className="ad-icon-btn ad-menu-btn" style={{ color: '#fff' }} aria-label="Close menu" onClick={() => setDrawer(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="ad-nav">
          <button type="button" className="ad-group-btn" aria-expanded={groupOpen} onClick={() => setGroupOpen((v) => !v)}>
            Content Management
            {groupOpen ? <Minus size={15} /> : <Plus size={15} />}
          </button>
          {groupOpen && (
            <ul className="ad-links">
              {sections.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/admin/${s.key}`}
                    className="ad-link"
                    aria-current={current === s.key ? 'page' : undefined}
                    onClick={() => setDrawer(false)}
                  >
                    <span>{s.label}</span>
                    {s.count !== null && <span className="ad-count">{s.count}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <div className="ad-side-foot">
          <Link href="/admin/account" className="ad-link" aria-current={current === 'account' ? 'page' : undefined} onClick={() => setDrawer(false)}>
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><KeyRound size={15} /> Change password</span>
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="ad-link">
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><ExternalLink size={15} /> View website</span>
          </a>
        </div>
      </aside>
    </>
  );
}
