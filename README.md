# Between The Heights Productions

Portfolio site for Daniel DuVall's production company, built with Next.js (App Router), React and TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the SES values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Structure

- `app/` routes: home, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, and the `/api/sendEmail` route handler.
- `components/` header, footer, project card, hero media and the contact form.
- `lib/projects.ts` is the single source of truth for the project list shown on the work pages.
- `lib/site.ts` holds contact details, social links and navigation.

## Contact form

Submissions POST to `/api/sendEmail`, which sends through AWS SES using the environment variables listed in `.env.example`.
