/**
 * Server-side helpers for the PUBLIC site. Import these from server components
 * (pages, layouts, generateMetadata) instead of reading hardcoded arrays.
 *
 *   import { getSection } from '@/lib/cms/content';
 *   const { page, items } = getSection('portfolio');
 */
import 'server-only';
export { getPublicSection as getSection, getPublicItem as getSectionItem } from './repo';
export type { PublicItem } from './repo';
