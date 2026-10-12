# Chloe

A family-activity discovery platform for the UAE and the wider Gulf region — helping parents find age-appropriate, indoor/outdoor, free/paid things to do with their kids.

## Features

- **Browse family activities** across the UAE's 7 Emirates plus 5 other Gulf countries (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)
- **Rich activity filtering** by category, age range, indoor/outdoor, free/paid pricing, and region/area
- **Full-text search** over activity name, description, region, and area (MongoDB text index with field weighting)
- **Favorites** so signed-in users can save activities they're interested in
- **Email/password authentication** via [better-auth](https://www.better-auth.com/), backed by MongoDB
- **Business partner subscriptions** — a "For Business" flow where venues submit an inquiry (with photo uploads) and subscribe to Professional/Premium listing plans via Stripe Checkout and webhooks
- **File uploads** for business inquiry photos via Vercel Blob
- **Basic product analytics** — activity views/interactions recorded to a dedicated `AnalyticsEvent` collection, with simple aggregate stats endpoints
- **Recommendations** endpoint for related/suggested activities
- **SEO basics** — dynamic `sitemap.ts` and `robots.ts`

> Feature list reflects what's implemented in the codebase today (see `src/app/api` and `src/lib/db/schema.ts`), not a product roadmap.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript |
| Database | MongoDB via [Mongoose](https://mongoosejs.com/) (and the `mongodb` driver directly for auth) |
| Auth | [better-auth](https://www.better-auth.com/) (email/password, MongoDB adapter) |
| Payments | [Stripe](https://stripe.com/) (Checkout Sessions + webhooks) |
| File storage | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| Styling | Tailwind CSS v4, `tailwindcss-animate`, `class-variance-authority` |
| UI components | Radix UI primitives, shadcn-style components in `src/components/ui`, Lucide/Tabler/React Icons |
| Animation | Framer Motion / `motion`, GSAP, Embla Carousel |
| Forms & validation | `react-hook-form`, `@hookform/resolvers`, `zod` |
| Charts | Recharts |
| Linting | ESLint 9 (`eslint-config-next`) |
| Package manager | [Bun](https://bun.sh/) |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A MongoDB database (e.g. MongoDB Atlas)
- A Stripe account (for payment features)
- A Vercel Blob store (for file upload features)

### Setup

```bash
git clone <repo-url>
cd chloe-app
bun install
cp .env.example .env.local
```

Then fill in `.env.local` with the variables below.

### Environment variables

These are defined in `.env.example`:

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (e.g. a MongoDB Atlas URI) used by both the app's data layer and better-auth |
| `BETTER_AUTH_SECRET` | Random secret (32+ chars) used by better-auth to sign sessions |
| `BETTER_AUTH_URL` | Base URL better-auth uses for auth callbacks (e.g. `http://localhost:3000` in dev) |
| `STRIPE_SECRET_KEY` | Stripe secret API key, used server-side to create Checkout Sessions |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for verifying incoming Stripe webhook events |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token for business inquiry photo uploads |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the app, used to build Stripe success/cancel redirect URLs |

Run the dev server:

```bash
bun run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Database Setup

The app uses Mongoose models defined in `src/lib/db/schema.ts` (`Country`, `Region`, `Category`, `Activity`, `BusinessInquiry`, `Favorite`, `AnalyticsEvent`). To seed MongoDB with initial countries, regions, categories, and activity data (sourced from `src/lib/data/activities.ts` and `src/lib/data/destinations.ts`), run:

```bash
bun run db:seed
```

This connects to `MONGODB_URI` and upserts the seed data, so it's safe to run more than once.

## Available Scripts

From `package.json`:

| Script | Command | Description |
| --- | --- | --- |
| `bun run dev` | `next dev --turbopack` | Start the dev server with Turbopack |
| `bun run build` | `next build` | Build the production bundle |
| `bun run start` | `next start` | Start the production server (after `build`) |
| `bun run lint` | `eslint .` | Run ESLint over the project |
| `bun run db:seed` | `bun run src/lib/db/seed.ts` | Seed MongoDB with initial country/region/category/activity data |

## Project Structure

```
src/
├── app/                  # Next.js App Router: pages and API routes
│   ├── api/              # Route handlers (see below)
│   ├── explore/          # Activity browsing/search page
│   ├── forbusiness/      # Business partner landing + Stripe subscription flow
│   ├── login/            # Sign-in page
│   ├── signup/           # Sign-up page
│   ├── policies/         # Policies page
│   ├── terms/            # Terms page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home/landing page
│   ├── sitemap.ts        # Dynamic sitemap
│   └── robots.ts         # robots.txt
├── components/
│   ├── sections/         # Page-level sections (Hero, ActivityExplorer, Navigation, Footer, FAQ, etc.)
│   ├── ui/               # Reusable UI primitives (Radix-based, shadcn-style)
│   └── animations/       # Animation-related components
├── hooks/                # Shared React hooks
└── lib/
    ├── db/               # Mongoose connection, schema, queries, and the seed script
    ├── data/             # Static/source activity & destination data used for seeding
    ├── animations/        # Animation helpers
    ├── hooks/            # Lib-level hooks
    ├── auth.ts           # better-auth configuration
    └── stripe.ts         # Stripe client + subscription plan definitions
```

### API routes (`src/app/api`)

| Route | Purpose |
| --- | --- |
| `GET /api/activities` | List/search/filter activities |
| `GET /api/activities/[slug]` | Get a single activity by slug |
| `GET /api/categories` | List activity categories |
| `GET /api/countries` | List supported countries |
| `GET /api/regions` | List regions |
| `GET/POST /api/favorites` | Get/add a user's favorite activities |
| `POST /api/recommendations` | Related/suggested activities |
| `POST /api/analytics` | Record an analytics event |
| `GET /api/stats` / `GET /api/stats/regions` | Aggregate stats |
| `POST /api/business-inquiry` | Submit a business partner inquiry |
| `POST /api/upload` | Upload a file to Vercel Blob (used for business inquiry photos) |
| `POST /api/stripe/checkout` | Create a Stripe Checkout Session for a Professional/Premium plan |
| `POST /api/stripe/webhook` | Handle Stripe webhook events (checkout completed, subscription cancelled) |
| `ALL /api/auth/[...all]` | better-auth's catch-all auth handler |

Note: the Stripe webhook handler currently logs `checkout.session.completed` and `customer.subscription.deleted` events but has `TODO`s for actually persisting subscription status against a business inquiry/account — worth knowing if you're extending the billing flow.

## Deployment

The app is a standard Next.js project and deploys cleanly to [Vercel](https://vercel.com/):

1. Push the repository to GitHub (or your Git provider of choice) and import it into Vercel.
2. Configure all the environment variables listed above in the Vercel project's **Settings → Environment Variables** (for Production, and Preview/Development as needed).
3. Point `STRIPE_WEBHOOK_SECRET` at a Stripe webhook endpoint configured to hit `https://<your-domain>/api/stripe/webhook`.
4. Vercel will run `bun run build` automatically on push; no special build configuration is required beyond the environment variables.
5. Seeding (`bun run db:seed`) is a one-off operation — run it locally or via a one-off script against your production `MONGODB_URI`, it is not part of the build/deploy pipeline.

## License

No `LICENSE` file is present in this repository. Treat this project as proprietary/all rights reserved unless the repository owner adds an explicit license.
