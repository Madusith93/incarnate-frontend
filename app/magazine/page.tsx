import type { Metadata } from 'next';
import { connection } from 'next/server';
import { getSection } from '@/lib/cms/content';
import MagazineClient from './MagazineClient';

/** Reads the magazine from the CMS on every request, so new articles appear immediately. */
export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const { page } = getSection('magazine');
  return {
    title: page.metaTitle || page.title || 'Our Magazine',
    description: page.metaDescription || undefined,
    keywords: page.metaKeywords || undefined,
  };
}

const text = (v: unknown) => (typeof v === 'string' ? v : '');

export default async function MagazinePage() {
  await connection();
  const { page, items } = getSection('magazine');

  // Newest first: the three most recent articles fill the featured layout.
  // Same-day articles: the one added last comes first.
  const newestFirst = [...items].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.id - a.id,
  );

  const articles = newestFirst.map((a) => ({
    id: String(a.id),
    slug: a.slug,
    title: a.title,
    subtitle: text(a.data.subtitle) || undefined,
    excerpt: text(a.data.excerpt),
    category: text(a.data.category),
    date: a.publishedAt,
    readTime: text(a.data.readTime),
    image: a.image1 || '/logo.webp',
    featured: a.data.featured === true,
    content: a.description,
  }));

  return (
    <MagazineClient
      articles={articles}
      heading={page.title || 'Our Magazine'}
      introHtml={page.description}
    />
  );
}
