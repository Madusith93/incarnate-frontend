/**
 * Section registry. This is the ONE place that describes what the admin can edit.
 * Add a section here and it appears in the sidebar, gets list/add/edit screens,
 * and is exposed through the public API automatically.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'url'
  | 'number'
  | 'select'
  | 'combo' // free text with suggestions
  | 'lines' // one value per line, stored as an array
  | 'boolean';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  help?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export interface ItemConfig {
  singular: string;
  plural: string;
  titleLabel: string;
  /** Rich-text field label, or false to hide it */
  description: string | false;
  /** Labels for the image slots (0–2) */
  images: string[];
  fields: Field[];
  meta: boolean;
  /** Label for the date column, or false to hide */
  date: string | false;
  /** Allow "Add sub" (child items under an item) */
  nested: boolean;
  /** Extra data keys shown as columns in the listing */
  columns: { key: string; label: string }[];
}

export interface SectionDef {
  key: string;
  label: string;
  /** Public page that shows this content (used to refresh the site cache) */
  publicPath: string | null;
  page: {
    titleLabel: string;
    description: string | false;
    images: string[];
    meta: boolean;
    fields: Field[];
  };
  items: ItemConfig | null;
}

const ICON_HELP = 'Icon name used by the site (e.g. Globe, Code, Smartphone).';

export const SECTIONS: SectionDef[] = [
  {
    key: 'home',
    label: 'Home',
    publicPath: '/',
    page: {
      titleLabel: 'Hero headline',
      description: 'Hero text',
      images: ['Hero image'],
      meta: true,
      fields: [],
    },
    items: {
      singular: 'service card',
      plural: 'Service cards',
      titleLabel: 'Title',
      description: false,
      images: [],
      meta: false,
      date: false,
      nested: false,
      columns: [{ key: 'tag', label: 'Tag' }],
      fields: [
        { name: 'description', label: 'Short description', type: 'textarea', rows: 3, required: true },
        { name: 'tag', label: 'Tag', type: 'text', placeholder: 'Web & Cloud' },
        { name: 'icon', label: 'Icon', type: 'text', help: ICON_HELP },
      ],
    },
  },
  {
    key: 'featured',
    label: 'Home Projects',
    publicPath: '/',
    page: {
      titleLabel: 'Section heading',
      description: 'Section intro',
      images: [],
      meta: false,
      fields: [],
    },
    items: {
      singular: 'featured project',
      plural: 'Featured projects',
      titleLabel: 'Project name',
      description: false,
      images: ['Project image'],
      meta: false,
      date: false,
      nested: false,
      columns: [
        { key: 'category', label: 'Category' },
        { key: 'location', label: 'Location' },
      ],
      fields: [
        { name: 'category', label: 'Category', type: 'text', placeholder: 'Travel & Tourism' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'Sri Lanka' },
        { name: 'url', label: 'Website URL', type: 'url', placeholder: 'https://' },
      ],
    },
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    publicPath: '/portfolio',
    page: {
      titleLabel: 'Page heading',
      description: 'Intro text',
      images: [],
      meta: true,
      fields: [],
    },
    items: {
      singular: 'project',
      plural: 'Projects',
      titleLabel: 'Project name',
      description: false,
      images: ['Screenshot'],
      meta: false,
      date: false,
      nested: false,
      columns: [
        { key: 'category', label: 'Category' },
        { key: 'domain', label: 'Domain' },
      ],
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'combo',
          required: true,
          options: [
            'Travel & Tourism', 'Hospitality', 'E-Commerce', 'Education', 'Corporate', 'News & Media',
            'Real Estate', 'Healthcare', 'Services', 'Automotive', 'Technology', 'Energy',
            'Sports & Leisure', 'Personal Brand', 'Entertainment', 'Beauty & Lifestyle',
          ],
          help: 'The filter pills on the portfolio page use these.',
        },
        { name: 'domain', label: 'Domain (shown on card)', type: 'text', placeholder: 'www.example.com' },
        { name: 'url', label: 'Website URL', type: 'url', placeholder: 'https://', required: true },
      ],
    },
  },
  {
    key: 'services',
    label: 'Services',
    publicPath: '/services',
    page: {
      titleLabel: 'Page heading',
      description: 'Intro text',
      images: [],
      meta: true,
      fields: [],
    },
    items: {
      singular: 'service',
      plural: 'Services',
      titleLabel: 'Service name',
      description: false,
      images: [],
      meta: true,
      date: false,
      nested: true,
      columns: [{ key: 'category', label: 'Category' }],
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'combo',
          required: true,
          options: ['Development', 'Engineering', 'Artificial Intelligence', 'Digital Strategy', 'Innovation'],
        },
        { name: 'shortDesc', label: 'Short description', type: 'textarea', rows: 2, required: true },
        { name: 'fullDesc', label: 'Full description', type: 'textarea', rows: 5 },
        { name: 'features', label: 'Features', type: 'lines', help: 'One feature per line.' },
        { name: 'icon', label: 'Icon', type: 'text', help: ICON_HELP },
      ],
    },
  },
  {
    key: 'technology',
    label: 'Technology',
    publicPath: '/technology',
    page: {
      titleLabel: 'Page heading',
      description: 'Intro text',
      images: [],
      meta: true,
      fields: [],
    },
    items: {
      singular: 'technology',
      plural: 'Technologies',
      titleLabel: 'Technology name',
      description: false,
      images: [],
      meta: true,
      date: false,
      nested: true,
      columns: [{ key: 'category', label: 'Category' }],
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'combo',
          required: true,
          options: ['Core Web', 'Frontend', 'Backend', 'Integration', 'DevOps', 'Design', 'Cloud'],
        },
        { name: 'shortDesc', label: 'Short description', type: 'textarea', rows: 2, required: true },
        { name: 'fullDesc', label: 'Full description', type: 'textarea', rows: 5 },
        { name: 'features', label: 'Features', type: 'lines', help: 'One feature per line.' },
        { name: 'icon', label: 'Icon', type: 'text', help: ICON_HELP },
      ],
    },
  },
  {
    key: 'about',
    label: 'About Us',
    publicPath: '/about',
    page: {
      titleLabel: 'Page heading',
      description: 'Company story',
      images: ['Banner image'],
      meta: true,
      fields: [],
    },
    items: {
      singular: 'stat',
      plural: 'Stats',
      titleLabel: 'Label',
      description: false,
      images: [],
      meta: false,
      date: false,
      nested: false,
      columns: [{ key: 'value', label: 'Value' }],
      fields: [
        { name: 'value', label: 'Value', type: 'text', placeholder: '220+', required: true },
        { name: 'icon', label: 'Icon', type: 'text', help: ICON_HELP },
      ],
    },
  },
  {
    key: 'team',
    label: 'Our Team',
    publicPath: '/about',
    page: {
      titleLabel: 'Section heading',
      description: 'Section intro',
      images: [],
      meta: false,
      fields: [],
    },
    items: {
      singular: 'team member',
      plural: 'Team members',
      titleLabel: 'Full name',
      description: false,
      images: ['Photo'],
      meta: false,
      date: false,
      nested: false,
      columns: [{ key: 'role', label: 'Role' }],
      fields: [{ name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Tech Lead' }],
    },
  },
  {
    key: 'clients',
    label: 'Clients',
    publicPath: '/',
    page: {
      titleLabel: 'Section heading',
      description: 'Section intro',
      images: [],
      meta: false,
      fields: [],
    },
    items: {
      singular: 'client logo',
      plural: 'Client logos',
      titleLabel: 'Client name',
      description: false,
      images: ['Logo'],
      meta: false,
      date: false,
      nested: false,
      columns: [],
      fields: [],
    },
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    publicPath: '/about',
    page: {
      titleLabel: 'Section heading',
      description: 'Section intro',
      images: [],
      meta: false,
      fields: [],
    },
    items: {
      singular: 'testimonial',
      plural: 'Testimonials',
      titleLabel: 'Person',
      description: false,
      images: ['Photo'],
      meta: false,
      date: false,
      nested: false,
      columns: [{ key: 'role', label: 'Role' }],
      fields: [
        { name: 'role', label: 'Role and company', type: 'text', placeholder: 'CEO – Example (Pvt) Ltd' },
        { name: 'quote', label: 'Quote', type: 'textarea', rows: 6, required: true },
      ],
    },
  },
  {
    key: 'magazine',
    label: 'Magazine',
    publicPath: '/magazine',
    page: {
      titleLabel: 'Page heading',
      description: 'Intro text',
      images: [],
      meta: true,
      fields: [],
    },
    items: {
      singular: 'article',
      plural: 'Articles',
      titleLabel: 'Headline',
      description: 'Article body',
      images: ['Cover image', 'Secondary image'],
      meta: true,
      // The site lists articles newest-first by this date; the three newest are the featured ones.
      date: 'Published',
      nested: true,
      columns: [{ key: 'category', label: 'Category' }],
      fields: [
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3, required: true, help: 'Shown on cards. Keep it under 200 characters.' },
        {
          name: 'category',
          label: 'Category',
          type: 'combo',
          required: true,
          options: ['FEATURED', 'ARTICLE', 'GUIDE', 'TOURISM', 'CYBERSECURITY', 'PROJECT LAUNCH'],
        },
        { name: 'readTime', label: 'Read time', type: 'text', placeholder: '5 min read' },
        {
          name: 'featured',
          label: 'Featured',
          type: 'boolean',
          help: 'Not used for layout: the magazine page always features the three newest articles by publish date.',
        },
      ],
    },
  },
  {
    key: 'contact',
    label: 'Contact',
    publicPath: '/contact',
    page: {
      titleLabel: 'Page heading',
      description: 'Intro text',
      images: [],
      meta: true,
      fields: [
        { name: 'email', label: 'Email', type: 'text', placeholder: 'info@incarnate.lk' },
        { name: 'phone', label: 'Phone', type: 'text', placeholder: '+94 77 196 4066' },
        { name: 'address', label: 'Address', type: 'textarea', rows: 3 },
        { name: 'mapEmbed', label: 'Map embed URL', type: 'url', placeholder: 'https://www.google.com/maps/embed?...' },
      ],
    },
    items: null,
  },
];

export const SECTION_MAP: Record<string, SectionDef> = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

export function getSectionDef(key: string): SectionDef | null {
  return SECTION_MAP[key] ?? null;
}
