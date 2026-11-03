# Incarnate Content Manager

Admin panel for the website's content, built into this Next.js app at **`/admin`**.
It replaces the old PHP "Content Management" screens with the same structure:
a section list in the sidebar, a main-content form per section, and a sub-content
table (status, edit, delete, display order, "Add sub").

## Run it

```bash
npm install
cp .env.example .env.local      # set ADMIN_PASSWORD (10+ chars)
npm run cms:setup               # creates data/cms.db, the admin user, and imports the current site content
npm run dev                     # open http://localhost:3000/admin
```

`cms:setup` is safe to re-run: it skips anything that already exists.
`npm run cms:import` **wipes** all CMS content and re-imports from the source files.

## What's in the admin

| Sidebar entry | Main content | Sub content (listing) |
|---|---|---|
| Home | hero headline/text | service cards |
| Home Projects | section heading | featured projects slider |
| Portfolio | heading, intro | projects (category, domain, URL, screenshot) |
| Services | heading, intro | services (+ "Add sub") |
| Technology | heading, intro | technologies (+ "Add sub") |
| About Us | story text, banner | stats |
| Our Team | heading, intro | team members |
| Clients | heading, intro | logos |
| Testimonials | heading | testimonials |
| Magazine | heading, intro | articles (rich text, cover image, SEO, + "Add sub") |
| Contact | heading, intro, email, phone, address, map | – |

Every item has: status (active/inactive), display order, optional SEO meta fields,
and images. Inactive items never reach the public site.

## Using the content on the website

Server components read it directly:

```tsx
// app/portfolio/page.tsx  (server component)
import { getSection } from '@/lib/cms/content';

export default function Portfolio() {
  const { page, items } = getSection('portfolio');   // active items only, in display order
  return items.map((p) => <Card key={p.id} title={p.title} image={p.image1} {...p.data} />);
}
```

Rich text (`description`) is stored as sanitized HTML. Render it with the shared typography class:

```tsx
<div className="cms-prose" dangerouslySetInnerHTML={{ __html: article.description }} />
```

(`app/cms-prose.css` is already imported by `globals.css`.)

There is also a JSON API: `GET /api/public/<section>` and `GET /api/public/<section>/<slug>`.

> The public pages still use their hardcoded arrays until you switch them over
> section by section. Interactive pages (`'use client'`) need a thin server wrapper
> that fetches with `getSection()` and passes the data in as props.

## Adding or changing a section

Everything is described in **`lib/cms/sections.ts`**. Add an entry (or a field) there and the
sidebar, list, add/edit forms, validation and public API all pick it up. No other file changes.

## Security notes

- Passwords: scrypt. Sessions: signed, HttpOnly, SameSite=Lax cookies (12 h), Secure in production.
- Every page, server action and API route re-verifies the session; `proxy.ts` only redirects.
- Login attempts are rate-limited (6 per 15 min per IP + email).
- Rich text is sanitized on save (scripts, event handlers, `javascript:` links are removed).
- Uploads: JPG/PNG/GIF/WebP/AVIF only (checked by file signature, not file name), max 8 MB, random file names.
  SVG is deliberately not allowed.

## Deploying

The database is a SQLite file, and uploads are files, both under `CMS_DATA_DIR` (default `./data`).
That needs a **server with a persistent disk** (VPS, cPanel Node app, Docker volume).
It will **not** persist on Vercel/serverless; for that, swap `lib/cms/db.ts` + `repo.ts` to Postgres
and uploads to S3/R2. The rest of the code does not touch the database directly.

Back up the `data/` folder.
