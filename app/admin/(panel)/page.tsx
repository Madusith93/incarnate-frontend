import Link from 'next/link';
import { countsBySection, recentlyUpdated } from '@/lib/cms/repo';
import { SECTIONS, SECTION_MAP } from '@/lib/cms/sections';

export default function Dashboard() {
  const counts = countsBySection();
  const recent = recentlyUpdated(8);
  return (
    <>
      <div className="ad-head">
        <div>
          <h1 className="ad-h1">Content</h1>
          <p className="ad-sub">Pick a section to edit its main content and the items listed under it.</p>
        </div>
      </div>

      <div className="ad-tiles">
        {SECTIONS.map((s) => {
          const c = counts[s.key];
          return (
            <Link key={s.key} href={`/admin/${s.key}`} className="ad-tile">
              <b>{s.label}</b>
              {s.items ? (
                <div className="n">{c?.active ?? 0}<small>active of {c?.total ?? 0} {s.items.plural.toLowerCase()}</small></div>
              ) : (
                <div style={{ color: 'var(--muted)', marginTop: 8 }}>Page content only</div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="ad-card" style={{ marginTop: 28 }}>
        <div className="ad-card-head"><h2>Recently edited</h2></div>
        {recent.length === 0 ? (
          <div className="ad-empty">Nothing here yet. Open a section to add your first item.</div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {recent.map((it) => (
              <li key={it.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 18px', borderTop: '1px solid #eef1ee' }}>
                <Link href={`/admin/${it.section}/${it.id}`} style={{ fontWeight: 600, textDecoration: 'none' }}>{it.title}</Link>
                <span style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>{SECTION_MAP[it.section]?.label} · {it.updatedAt.slice(0, 16).replace('T', ' ')}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
