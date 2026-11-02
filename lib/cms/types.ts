export type Status = 'active' | 'inactive';

export interface PageContent {
  section: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  image1: string;
  image2: string;
  data: Record<string, unknown>;
  updatedAt: string;
}

export interface Item {
  id: number;
  section: string;
  parentId: number | null;
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  image1: string;
  image2: string;
  data: Record<string, unknown>;
  status: Status;
  sortOrder: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  childCount?: number;
}

export type PageInput = Omit<PageContent, 'section' | 'updatedAt'>;
export type ItemInput = Omit<Item, 'id' | 'section' | 'parentId' | 'sortOrder' | 'createdAt' | 'updatedAt' | 'childCount'>;
