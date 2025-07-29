# billig bir

## Getting started

### Prerequisites

1. Install [pnpm](https://pnpm.io/)
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and make sure it's running
3. Install [Supabase CLI](https://supabase.com/docs/guides/cli/
4. Create a Mapbox account and get your access token from [Access tokens page](https://console.mapbox.com/account/access-tokens/)

### Running locally

1. **Install dependencies**
   ```bash
   pnpm i
   ```

2. **Start Supabase locally**
   ```bash
   supabase start
   ```
   > This will start the local Supabase stack using Docker.
   
   After it starts, you'll see output with local URLs and credentials:
   ```
   API URL: http://localhost:54321
   GraphQL URL: http://localhost:54321/graphql/v1
   DB URL: postgresql://postgres:postgres@localhost:54322/postgres
   Studio URL: http://localhost:54323
   Inbucket URL: http://localhost:54324
   JWT secret: your-jwt-secret
   anon key: your-anon-key
   service_role key: your-service-role-key
   ```

3. **Run migrations and seed data**
   ```bash
   supabase db reset
   ```
   > This will apply all migrations and run the seed data from the `./supabase`-directory.

4. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Mapbox token: `VITE_MAPBOX_TOKEN=your_mapbox_token`
   - Add Supabase local credentials (from step 2 output):
     ```
     VITE_SUPABASE_URL=http://localhost:54321
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Visit the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Supabase Studio (database admin): [http://localhost:54323](http://localhost:54323)

### Test User

The seed data includes a test user for development:
- **Email**: `test@billigbeer.se`
- **Password**: `billigsomfan`

### Stopping the local stack

When you're done developing:
```bash
supabase stop
```

