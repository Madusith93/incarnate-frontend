import { LogOut } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { requireUser } from '@/lib/cms/auth';
import { countsBySection } from '@/lib/cms/repo';
import { SECTIONS } from '@/lib/cms/sections';
import { logoutAction } from '../actions';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const counts = countsBySection();
  const nav = SECTIONS.map((s) => ({ key: s.key, label: s.label, count: s.items ? (counts[s.key]?.total ?? 0) : null }));

  return (
    <div className="ad-shell">
      <Sidebar sections={nav} />
      <div className="ad-main">
        <header className="ad-top">
          <span style={{ width: 40 }} className="ad-menu-btn" aria-hidden />
          <span style={{ marginLeft: 'auto', color: 'var(--muted)' }}>
            You are logged in as <b style={{ color: 'var(--text)' }}>{user.email}</b>
          </span>
          <form action={logoutAction}>
            <button className="ad-btn ad-btn-sm" type="submit"><LogOut size={14} /> Log out</button>
          </form>
        </header>
        <main className="ad-content">{children}</main>
      </div>
    </div>
  );
}
