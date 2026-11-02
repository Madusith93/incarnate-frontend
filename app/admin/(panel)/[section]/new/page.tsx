import { notFound } from 'next/navigation';
import EntityForm from '@/components/admin/EntityForm';
import { Crumbs } from '@/components/admin/ui';
import { getItem } from '@/lib/cms/repo';
import { getSectionDef } from '@/lib/cms/sections';
import { saveItemAction } from '../../../actions';

export default async function NewItemPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ parent?: string }>;
}) {
  const { section } = await params;
  const { parent } = await searchParams;
  const def = getSectionDef(section);
  if (!def?.items) notFound();
  const cfg = def.items;

  const parentItem = parent ? getItem(Number(parent)) : null;
  if (parent && (!parentItem || parentItem.section !== section || !cfg.nested)) notFound();

  const back = parentItem ? `/admin/${section}/${parentItem.id}` : `/admin/${section}`;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Crumbs
        trail={[
          { label: def.label, href: `/admin/${section}` },
          ...(parentItem ? [{ label: parentItem.title, href: back }] : []),
          { label: `Add ${parentItem ? 'sub content' : cfg.singular}` },
        ]}
      />
      <div className="ad-head">
        <div>
          <h1 className="ad-h1">Add {parentItem ? 'sub content' : cfg.singular}</h1>
          {parentItem && <p className="ad-sub">This will be listed under “{parentItem.title}”.</p>}
        </div>
      </div>
      <EntityForm
        action={saveItemAction.bind(null, section, null, parentItem?.id ?? null)}
        titleLabel={cfg.titleLabel}
        descriptionLabel={cfg.description}
        imageLabels={cfg.images}
        fields={cfg.fields}
        meta={cfg.meta}
        publishing={{ dateLabel: cfg.date, showSlug: cfg.meta || cfg.description !== false }}
        values={{
          title: '', slug: '', description: '', metaTitle: '', metaDescription: '', metaKeywords: '',
          image1: '', image2: '', status: 'active', publishedAt: today, data: {},
        }}
        submitLabel={`Save ${cfg.singular}`}
        cancelHref={back}
      />
    </>
  );
}
