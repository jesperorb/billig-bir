# Copilot Instructions for Billig Bir

## Architecture Overview

This is a React TypeScript application for finding the cheapest beer in Stockholm. Built with Vite, using TanStack Router for routing, TanStack Query for data fetching, Mantine for UI components, and Supabase as the backend.

## Key Architectural Patterns

### Feature-Based Organization
- Features live in `src/feature/` with self-contained modules (admin, auth, landing, map, submissions, table)
- Each feature has its own `index.tsx`, queries, components, and pages
- Common utilities in `src/common/` with organized subfolders: api, components, types, utils

### Import Path Conventions
- Use `@common/*` for shared utilities, types, and components
- Use `@feature/*` for feature-specific imports
- Always prefer absolute imports over relative imports

### Component Structure
- React functional components with TypeScript
- Mantine UI components for consistent styling
- Complex tables use TanStack Table with custom column helpers
- Form handling with react-hook-form

### Data Flow & State Management
- TanStack Query for server state with predefined query keys in `queries.ts` files
- Local state with React hooks
- Context providers for cross-component state (MenuContext, PriceTypeContext)
- Supabase client wrapped in query functions, not used directly in components

## Critical Development Patterns

### Route Structure
- File-based routing with TanStack Router
- Routes in `src/routes/` mirror URL structure
- Root route provides authentication context
- Feature routes import from `@feature/*` index files

### Authentication Flow
- Session management via `useSession` hook
- Protected routes redirect to `/login` when unauthenticated
- Admin routes wrapped with `ApiClientWrapper` for authenticated API calls

## Development Workflow

### Setup Commands
```bash
pnpm i                    # Install dependencies
pnpm dev                  # Development server (localhost:5173)
pnpm build               # Production build
pnpm lint                # ESLint check
pnpm lint:fix           # Auto-fix linting issues
```

### Type Safety Conventions
- Strict TypeScript with comprehensive type definitions in `src/common/types/`
- Database types generated from Supabase schema
- Utility functions with proper return type inference
- Form data types separate from entity types (e.g., `BeerLocationFormData` vs `BeerLocation`)

## Integration Points

### Supabase Integration
- Client creation in `api-client.ts` with typed Database interface
- Query functions in feature-specific `queries.tsx` files use fetch API directly
- Authentication managed through Supabase session

### Map Integration
- Mapbox GL JS with react-map-gl wrapper
- Map state managed in `@feature/map` with context providers

### Table Integration
- TanStack Table with Mantine UI styling
- Reusable table component with configurable columns and actions
- Column visibility persisted to localStorage
- Multi-level filtering (text search, district selection, price type)

## File Naming & Structure
- Files: Always use kebab-case for file names
- Components: PascalCase for component names with `.tsx` extension
- Utilities: camelCase for utility names with `.ts` extension
- Types: PascalCase for Types with `.ts` extension
- Constants: ALL_CAPS in `constants.ts` files
