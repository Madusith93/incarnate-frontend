import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import EntityForm from '@/components/admin/EntityForm';
import { Crumbs, Flash, ItemTable, SearchBar, ViewOnSite } from '@/components/admin/ui';
import { getPage, listItems } from '@/lib/cms/repo';
import { getSectionDef } from '@/lib/cms/sections';
import type { Status } from '@/lib/cms/types';
import { savePageAction } from '../../actions';

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ q?: string; status?: string; flash?: string }>;
}) {
  const { section } = await params;
  const { q, status, flash } = await searchParams;
  const def = getSectionDef(section);
  if (!def) notFound();

  const page = getPage(section);
  const cfg = def.items;
  const all = cfg ? listItems(section) : [];
  const rows = cfg ? listItems(section, { q, status: (status as Status | 'all') ?? 'all' }) : [];

  return (
    <>
      <Crumbs trail={[{ label: def.label }]} />
      <div className="ad-head">
        <div>
          <h1 className="ad-h1">{def.label}</h1>
          <p className="ad-sub">Main content for this section{cfg ? `, then the ${cfg.plural.toLowerCase()} listed under it` : ''}.</p>
        </div>
        {def.publicPath && <ViewOnSite href={def.publicPath} />}
      </div>

      <Flash flash={flash} noun={cfg?.singular ?? 'item'} />

      <EntityForm
        action={savePageAction.bind(null, section)}
        titleLabel={def.page.titleLabel}
        descriptionLabel={def.page.description}
        imageLabels={def.page.images}
        fields={def.page.fields}
        meta={def.page.meta}
        values={{
          title: page.title, description: page.description, metaTitle: page.metaTitle,
          metaDescription: page.metaDescription, metaKeywords: page.metaKeywords,
          image1: page.image1, image2: page.image2, data: page.data,
        }}
        submitLabel="Save"
      />

      {cfg && (
        <section className="ad-card" style={{ marginTop: 32 }} aria-labelledby="sub-h">
          <div className="ad-card-head">
            <h2 id="sub-h">{cfg.plural} <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({all.length})</span></h2>
            <Link href={`/admin/${section}/new`} className="ad-btn ad-btn-primary ad-btn-sm"><Plus size={14} /> Add {cfg.singular}</Link>
          </div>
          {all.length > 6 && <SearchBar q={q} status={status} />}
          <ItemTable section={section} cfg={cfg} all={all} rows={rows} filtered={!!q || (!!status && status !== 'all')} />
        </section>
      )}
    </>
  );
}
