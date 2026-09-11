# Between The Heights Productions

Portfolio site for Daniel DuVall's production company, built with Next.js (App Router), React and TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local   # add the Resend key and recipient
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Structure

- `app/` routes: home, `/work`, `/work/[slug]`, `/services`, `/studio`, `/contact`, and the `/api/sendEmail` route handler.
- `components/` header, footer, project card, hero media and the contact form.
- `lib/projects.ts` is the single source of truth for the project list shown on the work pages.
- `lib/site.ts` holds contact details, social links and navigation.

## Contact form

Submissions POST to `/api/sendEmail`, which delivers through [Resend](https://resend.com) using the environment variables listed in `.env.example`:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | API key from the Resend dashboard |
| `CONTACT_TO_EMAIL` | yes | Where submissions are delivered |
| `RESEND_FROM_EMAIL` | no | Sender address; defaults to Resend's `onboarding@resend.dev`, which can only deliver to the Resend account owner. Use an address on a verified domain to deliver anywhere. |
| `CONTACT_CC_EMAIL` | no | CC recipient |
| `CONTACT_SUBJECT` | no | Subject prefix, defaults to "New website message" |

When a send fails the JSON response includes a `code` with Resend's error name so the problem can be read from the browser's network tab.
