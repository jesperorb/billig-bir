# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React TypeScript SPA for finding the cheapest beer in Stockholm. Built with Vite, TanStack Router, TanStack Query, Mantine UI, Mapbox, and Supabase.

## Commands

```bash
pnpm i                # Install dependencies
pnpm dev              # Dev server (localhost:5173)
pnpm build            # TypeScript check + Vite production build
pnpm lint             # ESLint check
pnpm lint:fix         # Auto-fix lint issues
supabase start        # Start local Supabase (requires Docker)
supabase db reset     # Apply migrations and seed data
supabase stop         # Stop local Supabase
```

## Architecture

### Feature-Based Organization
- `src/feature/` — Self-contained feature modules (admin, auth, landing, map, submissions, table), each with own components, queries, and index.tsx
- `src/common/` — Shared code: api, components, context, types, utils
- `src/routes/` — File-based routing with TanStack Router (auto-generates `routeTree.gen.ts`)

### Key Patterns
- **Imports**: Always use absolute paths — `@common/*` and `@feature/*`, never relative imports
- **Data fetching**: Supabase client wrapped in query functions in feature-specific `queries.ts` files; never use Supabase client directly in components
- **Server state**: TanStack Query with predefined query keys
- **Local/cross-component state**: React hooks + Context providers (MenuContext, PriceTypeContext)
- **Forms**: react-hook-form with separate form data types from entity types (e.g., `BeerLocationFormData` vs `BeerLocation`)
- **Tables**: TanStack Table with Mantine styling; column visibility persisted to localStorage
- **Auth**: `useSession` hook; protected routes redirect to `/login`; admin routes use `ApiClientWrapper`

### File Naming
- Files: kebab-case (`beer-location.form.tsx`)
- Components: PascalCase
- Utilities: camelCase
- Types: PascalCase
- Constants: ALL_CAPS in `constants.ts`

## Environment Variables

Requires `.env` file (copy from `.env.example`):
- `VITE_SUPABASE_URL` — Supabase API endpoint
- `VITE_SUPABASE_ANON_KEY` — Supabase anon key
- `VITE_MAPBOX_TOKEN` — Mapbox access token

## Local Dev

Test user: `test@billigbeer.se` / `billigsomfan`
Supabase Studio: http://localhost:54323
