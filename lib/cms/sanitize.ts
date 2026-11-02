import sanitizeHtml from 'sanitize-html';

/**
 * Rich-text HTML is stored sanitized, so the public site can render it with
 * dangerouslySetInnerHTML without trusting whatever was pasted into the editor.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br', 'hr', 'h2', 'h3', 'h4', 'blockquote', 'pre', 'code',
    'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'span',
    'ul', 'ol', 'li', 'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'colgroup', 'col',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    th: ['colspan', 'rowspan', 'colwidth', 'style'],
    td: ['colspan', 'rowspan', 'colwidth', 'style'],
    col: ['style'],
    p: ['style'],
    h2: ['style'],
    h3: ['style'],
    h4: ['style'],
    span: ['style'],
  },
  allowedStyles: {
    '*': {
      'text-align': [/^(left|right|center|justify)$/],
      color: [/^#[0-9a-f]{3,8}$/i, /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i],
      width: [/^\d+(\.\d+)?(px|%)$/],
    },
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => {
      const out = { ...attribs };
      if (out.target === '_blank') out.rel = 'noopener noreferrer';
      return { tagName, attribs: out };
    },
  },
  // allow site-relative image/link paths such as /uploads/… and /magazine
  exclusiveFilter: undefined,
};

export function cleanHtml(input: string): string {
  const html = (input ?? '').trim();
  if (!html || html === '<p></p>') return '';
  return sanitizeHtml(html, {
    ...OPTIONS,
    // sanitize-html treats "/path" as relative and keeps it; this keeps javascript: out
    allowedSchemesAppliedToAttributes: ['href', 'src'],
  });
}

export function plainText(input: string, max = 0): string {
  const t = sanitizeHtml(input ?? '', { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, ' ').trim();
  return max && t.length > max ? t.slice(0, max - 1) + '…' : t;
}
