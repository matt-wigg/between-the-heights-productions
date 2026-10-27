# Between The Heights Productions

Portfolio site for Daniel DuVall's production company, built with Next.js (App Router), React and TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local   # add the Resend key and recipient
npm run dev                  # http://localhost:3000
```

Use Node.js 24 LTS. Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Dependency validation

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm audit` before publishing updates. Start the production build with `npm start`, then run `npm run test:smoke` in another terminal. Set `BASE_URL` to check a deployed site. Smoke tests only submit invalid contact requests and never send email.

As of October 27, 2026, ESLint stays at 9.39.5 because the latest `eslint-plugin-react` and `eslint-plugin-import` used by Next.js do not declare ESLint 10 compatibility. TypeScript is updated to 6.0.3; TypeScript 7 is held because `typescript-eslint` requires TypeScript below 6.1.0. Recheck those upstream peer ranges before upgrading; do not bypass peer checks. Node type definitions follow the deployed Node 24 runtime rather than Node 26.

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
