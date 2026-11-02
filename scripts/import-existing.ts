/**
 * One-time import of the content that is hardcoded in the Next.js site into the CMS database.
 * It reads the real source files (so nothing is retyped) and evaluates the arrays in them.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { db } from '../lib/cms/db';
import { cleanHtml } from '../lib/cms/sanitize';
import { createItem, savePage, slugify } from '../lib/cms/repo';
import type { ItemInput } from '../lib/cms/types';

const ROOT = process.cwd();
const req = createRequire(path.join(ROOT, 'package.json'));
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/** Pull `const <name> = [...]` out of a TSX file and evaluate it (icons become their names). */
function extract<T = unknown>(rel: string, varName: string): T {
  const src = read(rel);
  const sf = ts.createSourceFile(rel, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let init: ts.Expression | undefined;
  const icons: string[] = [];
  sf.forEachChild((n) => {
    if (ts.isVariableStatement(n)) {
      for (const d of n.declarationList.declarations) if (ts.isIdentifier(d.name) && d.name.text === varName) init = d.initializer;
    }
    if (ts.isImportDeclaration(n) && (n.moduleSpecifier as ts.StringLiteral).text === 'lucide-react') {
      const nb = n.importClause?.namedBindings;
      if (nb && ts.isNamedImports(nb)) nb.elements.forEach((e) => icons.push(e.name.text));
    }
  });
  if (!init) throw new Error(`Could not find "${varName}" in ${rel}`);
  const js = ts.transpileModule(`module.exports = (${init.getText(sf)});`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} as unknown };
  new Function('require', 'module', 'exports', 'React', ...icons, js)(req, mod, mod.exports, req('react'), ...icons);
  return mod.exports as T;
}

function renderNode(node: unknown): string {
  const { renderToStaticMarkup } = req('react-dom/server') as typeof import('react-dom/server');
  const html = renderToStaticMarkup(node as React.ReactElement)
    .replace(/<div class="flex flex-wrap[^"]*">([\s\S]*?)<\/div>/g, '<p>$1</p>') // hashtag rows
    .replace(/<\/span>\s*<span/g, '</span> <span') // they were laid out with flex-gap
    .replace(/<\/div>\s*<div/g, '</div>\n<div');
  return cleanHtml(html);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = (s: unknown) => String(s ?? '').replace(/\s+/g, ' ').trim();

const blank = (o: Partial<ItemInput> & { title: string }): ItemInput => ({
  slug: '', description: '', metaTitle: '', metaDescription: '', metaKeywords: '',
  image1: '', image2: '', data: {}, status: 'active', publishedAt: new Date().toISOString().slice(0, 10), ...o,
});

const page = (section: string, title: string, description = '', extra: Record<string, unknown> = {}) =>
  savePage(section, { title, description, metaTitle: '', metaDescription: '', metaKeywords: '', image1: '', image2: '', data: extra });

export function importExisting(): Record<string, number> {
  const counts: Record<string, number> = {};
  const add = (section: string, rows: ItemInput[]) => {
    rows.forEach((r) => createItem(section, null, r));
    counts[section] = rows.length;
  };

  db().transaction(() => {
    /* ---- page-level copy (taken from the current headings) ---- */
    const about = read('app/about/page.tsx');
    const story = about.match(/Our Story\s*<\/h3>\s*<p[^>]*>\s*([\s\S]*?)\s*<\/p>\s*<p[^>]*>\s*([\s\S]*?)\s*<\/p>/);
    page('home', 'We build amazing websites and robust software applications');
    page('featured', 'Recent Projects');
    page('portfolio', 'Transforming Ideas Into Digital Success', '<p>From concept to launch, we build impactful digital experiences that drive engagement and business growth.</p>');
    page('services', 'Our Modern Services', '<p>From high-impact web design to cutting-edge AI and growth strategies, we deliver future-ready solutions designed to elevate your brand.</p>');
    page('technology', 'Technologies We Master', '<p>From web standards and server infrastructure to modern cloud services and DevOps tooling, we build robust systems engineered for long-term scalability.</p>');
    page('about', 'About Incarnate',
      story ? `<h3>Our Story</h3><p>${esc(clean(story[1]))}</p><p>${esc(clean(story[2]))}</p>` : '<p>We build innovative digital experiences, empowering businesses with cutting-edge web development, software engineering, and digital growth strategies.</p>');
    page('team', 'Meet Our Team', '<p>A passionate group of professionals dedicated to delivering exceptional digital experiences.</p>');
    page('clients', 'Brands that work with us', "<p>A few of the innovative companies we've helped build, launch, and grow.</p>");
    page('testimonials', 'What our clients say');
    page('magazine', 'Our Magazine', '<p>Discover stories, expert insights, and digital strategies driving modern brands.</p>');
    page('contact', 'Let’s Build Something Great Together', '<p>Have a project in mind or need assistance? Reach out to our team today.</p>', {
      email: 'info@incarnate.lk', phone: '+94 77 196 4066', address: 'No 71/A, Rosavilla, Badulla Road, Hali-Ela, Sri Lanka', mapEmbed: '',
    });

    /* ---- home: service cards ---- */
    type HomeService = { icon: string; title: string; description: string; tag: string };
    add('home', extract<HomeService[]>('components/Services.tsx', 'services').map((s) =>
      blank({ title: s.title, data: { description: s.description, tag: s.tag, icon: s.icon } })));

    /* ---- home: featured projects ---- */
    type Featured = { title: string; category: string; location: string; image: string; url: string };
    add('featured', extract<Featured[]>('components/Projects.tsx', 'projects').map((p) =>
      blank({ title: p.title, image1: p.image, data: { category: p.category, location: p.location, url: p.url } })));

    /* ---- portfolio ---- */
    type Port = { title: string; domain: string; url: string; category: string; image: string };
    add('portfolio', extract<Port[]>('app/portfolio/page.tsx', 'portfolioItems').map((p) =>
      blank({ title: p.title, image1: p.image, data: { category: p.category, domain: p.domain, url: p.url } })));

    /* ---- services & technology ---- */
    type Svc = { id: string; title: string; category: string; shortDesc: string; fullDesc: string; icon: string; features: string[] };
    const svc = (s: Svc) => blank({ title: s.title, slug: s.id, data: { category: s.category, shortDesc: s.shortDesc, fullDesc: s.fullDesc, features: s.features, icon: s.icon } });
    add('services', extract<Svc[]>('app/services/page.tsx', 'services').map(svc));
    add('technology', extract<Svc[]>('app/technology/page.tsx', 'technologies').map(svc));

    /* ---- about stats & team ---- */
    type Stat = { value: string; label: string; icon: string };
    add('about', extract<Stat[]>('app/about/page.tsx', 'stats').map((s) => blank({ title: s.label, data: { value: s.value, icon: s.icon } })));
    type Member = { name: string; role: string; image: string };
    add('team', extract<Member[]>('app/about/page.tsx', 'teamMembers').map((m) => blank({ title: m.name, image1: m.image, data: { role: m.role } })));

    /* ---- clients ---- */
    type Logo = { name: string; logo: string };
    add('clients', extract<Logo[]>('components/ClientLogos.tsx', 'brandLogos').map((l) => blank({ title: l.name, image1: l.logo })));
    counts.testimonials = 0;

    /* ---- magazine (JSX → clean HTML) ---- */
    type Article = {
      slug: string; title: string; subtitle?: string; excerpt: string; category: string; date: string;
      readTime: string; image: string; featured?: boolean; content: unknown;
    };
    add('magazine', extract<Article[]>('scripts/legacy/magazine-page.tsx', 'ARTICLES_DATA').map((a) =>
      blank({
        title: a.title,
        slug: a.slug || slugify(a.title),
        description: renderNode(a.content),
        image1: a.image.trim(),
        publishedAt: a.date,
        metaTitle: a.title,
        metaDescription: clean(a.excerpt),
        data: { subtitle: a.subtitle ?? '', excerpt: a.excerpt, category: a.category, readTime: a.readTime, featured: !!a.featured },
      })));
  })();

  return counts;
}
