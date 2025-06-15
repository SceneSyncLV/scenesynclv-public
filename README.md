# SceneSyncLV

A Next.js 14 app for Las Vegas event discovery and admin editing.

## Getting Started

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase project values:

```sh
cp .env.local.example .env.local
# Edit .env.local with your Supabase project URL and anon key
```

2. Install dependencies (using pnpm):

```sh
pnpm install
```

3. Run the development server:

```sh
pnpm dev
```

4. Build for production:

```sh
pnpm build
```

5. (Optional) Generate Supabase types:

```sh
pnpm supabase:gen
```

## Features
- Event listing with genre/date/cheap filters
- Ad slots every 4th event
- Usage demo: ![Demo GIF](demo.gif)
- Leaflet map of events
- Admin page with Supabase Auth (email + OTP)
- Event editing and flyer upload
- Ad-slot placeholders every 4th event (see `EventCard`)

## UI Hooks
- Genre dropdown and "Cheap only" toggle powered by Supabase events table (see `Filters`)
- Ad-slot skeletons: every 4th event card reserves a 300×250 slot (see `EventCard`)

## Usage

- Use the genre dropdown and "Cheap only" checkbox to filter the event list in real time.
- Events are fetched live from Supabase and sorted by date.
- Each event card shows title, venue, date, price, and flyer thumbnail (if available).
- To enable alerts, sign in with GitHub and save your alert preferences using the form at the top of the event list.

📂 Requires public Supabase storage bucket named flyers (already created).

---

- Built with Next.js 14, TailwindCSS, Supabase, Leaflet
