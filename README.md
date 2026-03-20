<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6](https://github.com/kurtmorales-tech/JairahWebsite/blob/main/public/Dark.jpeg?raw=true)" />
</div>

This repository contains a complete production-ready demo app for a boutique hair studio. It is optimized for local development and deployment to AI Studio or any static site host.

## About this app

"Braids by Jaira" is a boutique luxury hair styling web experience built as a React + Vite application. It offers an immersive client journey including:

- Professional service portfolio (Knotless Braids, Boho Goddess Locs, Stitch Braids, Fulani Braids). 
- Booking workflow with service selection, date confirmation, client info, terms acknowledgment, and payment simulation (Stripe/PayPal). 
- Live gallery, case-study blog posts, reviews, and curated FAQ content.
- AI-powered digital hairstylist consult via Gemini API (`services/geminiService.ts`).
- Admin dashboard with Supabase auth for managing services, bookings, and data refresh.
- Legal modal flow (Terms, Privacy, Refund) and dark mode UI.

### Core technical features

- React with TypeScript and tailwind-inspired styling utilities.
- Framer Motion for polished animation states and transitions.
- Supabase storage for services and bookings (`lib/supabase.ts`).
- Gemini AI assistant for responsive styling tips based on user prompts.

### Environment variables

Requires `.env.local` with:
- `GEMINI_API_KEY` (Gemini model calls in `services/geminiService.ts`)
- `SUPABASE_URL` (optional fallback uses placeholder)
- `SUPABASE_ANON_KEY` (optional fallback uses placeholder)

## Quick Start (Local)

**Prerequisites**
- Node.js 18+ (or latest LTS)
- Git (optional)

1. Clone repo (optional):
   `git clone <repo-url> && cd <repo-folder>`
2. Install dependencies:
   `npm install`
3. Create `.env.local` with required keys:
   - `GEMINI_API_KEY=<your-key>`
   - `SUPABASE_URL=<your-url>`
   - `SUPABASE_ANON_KEY=<your-anon-key>`
4. Run development server:
   `npm run dev`
5. Open browser at `http://localhost:5173`

## Project structure

- `App.tsx` — single-page navigation, booking flow, data sync, consult interface
- `components/` — UI and layout components (`Button`, `GlassCard`, `Dashboard`, `AuthModal`, `LegalModal`)
- `lib/supabase.ts` — Supabase client setup
- `services/geminiService.ts` — Gemini AI model adapter
- `constants.ts` — seeded dataset (services, gallery, blog, FAQ, testimonials, bookings)
- `types.ts` — TypeScript domain types

## Deployment

- Use Vite build:
  `npm run build`
- Preview production build locally:
  `npm run preview`
- Deploy to providers (Vercel/Netlify/AI Studio) by connecting this repo and setting environment variables.

## Notes

- Admin panel requires authenticated Supabase user.
- Consult requires Gemini endpoint `gemini-3-flash-preview` via `GEMINI_API_KEY`.
- Replace placeholder Supabase URL/key in `lib/supabase.ts` with secure values in env.

## Contributing

1. Fork, create branch, commit changes, open PR.
2. Lint/format with `npm run lint` (if available) and test in local environment.
3. Include screenshots for UI updates and behavior details for feature changes.
