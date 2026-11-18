# Techsphere64 — agency website + cleaning business demo

One React app (Vite, React Router, Tailwind CSS) with three areas:

| Route | What it is |
|---|---|
| `/` (plus `/global-work`, `/services`, `/about`, `/contact`) | Techsphere64 agency website |
| `/demo` | Public website for SparklePro Cleaning Co., a fictional business |
| `/demo/dashboard` | SparklePro's lead management dashboard |

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

## Structure

```text
src/
  app/                 App and router
  layouts/             Agency, cleaning and dashboard layouts
  components/common/   Modal, ConfirmDialog, Field, Reveal, ...
  hooks/ utils/        useForm, validators, date formatting
  data/                Agency content, demo leads and services
  features/
    agency/            Techsphere64 pages and components
    cleaning/          SparklePro public website
    dashboard/         Dashboard pages and components
    leads/             Shared lead store (service, context, selectors)
```

## Demo data

The cleaning website and the dashboard share one store,
`src/features/leads/services/leadService.js`, saved in `localStorage`.
Sample leads are seeded on the first visit only. Reset them from
Dashboard → Settings → Reset demo data. No backend is involved and no
emails or SMS messages are sent.

## Before going live

- Set `enquiryEndpoint` (and optionally `contactEmail`) in
  `src/data/agencyContent.js`. Until then the agency contact form runs in
  preview mode and does not deliver messages.
- Services, pricing and FAQ copy all live in `src/data/agencyContent.js`.
  Social Media Management is a monthly plan shown as "Quoted monthly";
  change `socialMediaPlan.priceLabel` there to publish a price.
- The host must serve `index.html` for every path. `vercel.json` and
  `public/_redirects` (Netlify) are included.
- Photos in `public/images/cleaning/` are from Unsplash.
