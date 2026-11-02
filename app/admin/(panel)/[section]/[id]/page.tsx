import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import EntityForm from '@/components/admin/EntityForm';
import { Crumbs, Flash, ItemTable, SearchBar } from '@/components/admin/ui';
import { getItem, listItems } from '@/lib/cms/repo';
import { getSectionDef } from '@/lib/cms/sections';
import type { Item, Status } from '@/lib/cms/types';
import { saveItemAction } from '../../../actions';

export default async function EditItemPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string; id: string }>;
  searchParams: Promise<{ q?: string; status?: string; flash?: string }>;
}) {
  const { section, id } = await params;
  const { q, status, flash } = await searchParams;
  const def = getSectionDef(section);
  if (!def?.items) notFound();
  const cfg = def.items;

  const item = getItem(Number(id));
  if (!item || item.section !== section) notFound();

  const ancestors: Item[] = [];
  for (let p = item.parentId ? getItem(item.parentId) : null; p; p = p.parentId ? getItem(p.parentId) : null) ancestors.unshift(p);
  const back = item.parentId ? `/admin/${section}/${item.parentId}` : `/admin/${section}`;

  const all = cfg.nested ? listItems(section, { parentId: item.id }) : [];
  const rows = cfg.nested ? listItems(section, { parentId: item.id, q, status: (status as Status | 'all') ?? 'all' }) : [];

  return (
    <>
      <Crumbs
        trail={[
          { label: def.label, href: `/admin/${section}` },
          ...ancestors.map((a) => ({ label: a.title, href: `/admin/${section}/${a.id}` })),
          { label: item.title },
        ]}
      />
      <div className="ad-head">
        <div>
          <h1 className="ad-h1">{item.title}</h1>
          <p className="ad-sub">Editing {item.parentId ? 'sub content' : cfg.singular}. Last saved {item.updatedAt.slice(0, 16).replace('T', ' ')} UTC.</p>
        </div>
      </div>

      <Flash flash={flash} noun="sub content" />

      <EntityForm
        key={item.updatedAt}
        action={saveItemAction.bind(null, section, item.id, item.parentId)}
        titleLabel={cfg.titleLabel}
        descriptionLabel={cfg.description}
        imageLabels={cfg.images}
        fields={cfg.fields}
        meta={cfg.meta}
        publishing={{ dateLabel: cfg.date, showSlug: cfg.meta || cfg.description !== false }}
        values={{
          title: item.title, slug: item.slug, description: item.description, metaTitle: item.metaTitle,
          metaDescription: item.metaDescription, metaKeywords: item.metaKeywords, image1: item.image1,
          image2: item.image2, status: item.status, publishedAt: item.publishedAt, data: item.data,
        }}
        submitLabel="Save"
        cancelHref={back}
      />

      {cfg.nested && (
        <section className="ad-card" style={{ marginTop: 32 }} aria-labelledby="sub-h">
          <div className="ad-card-head">
            <h2 id="sub-h">Sub content <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({all.length})</span></h2>
            <Link href={`/admin/${section}/new?parent=${item.id}`} className="ad-btn ad-btn-primary ad-btn-sm"><Plus size={14} /> Add sub content</Link>
          </div>
          {all.length > 6 && <SearchBar q={q} status={status} />}
          <ItemTable section={section} cfg={cfg} all={all} rows={rows} filtered={!!q || (!!status && status !== 'all')} />
        </section>
      )}
    </>
  );
}
