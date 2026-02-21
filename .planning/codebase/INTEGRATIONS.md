# External Integrations

**Analysis Date:** 2026-02-21

## APIs & External Services

**DGT (Dirección General de Tráfico) - Spain Driving Authority:**
- Official exam results lookup service for Spanish driving licenses
- What it's used for: Query real exam scores and results from DGT's official portal
- Integration: Custom HTTP scraping client
  - SDK/Client: Built-in `fetch()` with JSoup-style HTML parsing
  - Implementation: `src/lib/dgt/consulta-nota.ts`
  - API Endpoint: `/api/dgt/consulta-nota` (POST only)
  - Form submission to `https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces`
  - Handles: ViewState extraction, session cookies, form parsing
  - Rate limit: 5 queries per user per day (enforced in route handler)

**Google OAuth:**
- Provider for user authentication and account creation
- What it's used for: Alternative login/signup method alongside email/password
- Integration: Via Supabase Auth
  - SDK/Client: `@supabase/ssr` and `@supabase/supabase-js`
  - Configuration: `src/lib/auth/actions.ts` → `signInWithOAuth({ provider: "google" })`
  - Configured in: Supabase dashboard (not in code)
  - Redirect: `{origin}/auth/callback` for OAuth callback handling

## Data Storage

**Databases:**
- PostgreSQL (hosted on Supabase)
  - Connection: Via `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Client: `@supabase/supabase-js` 2.97.0
  - Client instances:
    - Browser: `src/lib/supabase/client.ts` → `createBrowserClient()`
    - Server: `src/lib/supabase/server.ts` → `createServerClient()` with cookie-based session
    - Admin: `src/lib/supabase/admin.ts` (service role operations)
  - Tables:
    - `profiles` - Extended user data (nome, avatar, exam objective, streak)
    - `temas` / `subtemas` - 12 topics, 58 subtopics of DGT syllabus
    - `preguntas` - Question bank (30,000+ questions)
    - `tests` - Pre-built 30-question test sets
    - `tests_realizados` - Test completion history
    - `respuestas_test` - Individual question answers
    - `preguntas_falladas` - Failed questions for review
    - `materiales` - Study materials (PDFs, videos)
    - `consultas_dgt` - History of DGT score lookups (hashed NIF)

**File Storage:**
- Cloudinary (image optimization and delivery)
  - What it's used for: Image transformation and caching for question images and signals
  - Environment variables: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - Note: Variables listed in `technical.md` but not referenced in codebase yet (placeholder)
  - Remote image patterns allowed: `www.todotest.com/tests/imgs/**` (configured in `next.config.ts`)

**Caching:**
- None detected (no Redis or caching layer configured)

## Authentication & Identity

**Auth Provider:**
- Supabase Auth (PostgreSQL with auth.users table)
- Implementation:
  - Email/password: `src/lib/auth/actions.ts` → `signInWithPassword()`, `signUp()`
  - Google OAuth: `src/lib/auth/actions.ts` → `signInWithOAuth({ provider: "google" })`
  - Session management: Cookies via `@supabase/ssr`
  - Protected routes: Server Components verify `supabase.auth.getUser()`
  - Schema validation: `src/lib/auth/schemas.ts` with Zod

**User Data Model:**
- `profiles` table extends `auth.users` with additional fields
  - Structure: ID (UUID), email, nombre, avatar_url, permiso_objetivo, racha_dias, ultimo_acceso, timestamps

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry, Rollbar, or error tracking service)

**Logs:**
- Browser console: `console.error()` and `console.log()` throughout codebase
  - DGT integration errors logged in: `src/lib/dgt/consulta-nota.ts`, `src/app/api/dgt/consulta-nota/route.ts`
  - Auth errors logged in: `src/lib/auth/actions.ts`
  - Server logs: Next.js built-in logging to Vercel

**Application Insights:**
- Not configured

## CI/CD & Deployment

**Hosting:**
- Vercel (specified in `technical.md`)
  - Deployment: Automatic from main branch (inferred)
  - Runtime: Node.js on Vercel Serverless Functions
  - Environment variables: Set in Vercel dashboard (not in code)

**CI Pipeline:**
- None detected (no GitHub Actions, GitLab CI, or other CI config found)
  - Note: Playwright E2E tests exist but no automation configured

**Build Process:**
- Next.js 16 built-in (`npm run build`)
- Outputs: `.next/` directory for Vercel deployment

## Environment Configuration

**Required env vars for development:**
1. `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (public)
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anonymous API key (public, safe for client)
3. `SUPABASE_SERVICE_ROLE_KEY` - Server-only admin key (SECRET - never expose)
4. `GOOGLE_CLIENT_ID` - Google OAuth (configured in Supabase, may not need explicit env var)
5. `GOOGLE_CLIENT_SECRET` - Google OAuth (configured in Supabase, may not need explicit env var)

**Optional env vars (mentioned but not required):**
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Placeholder (not used yet)
- `CLOUDINARY_API_KEY` - Placeholder (not used yet)
- `CLOUDINARY_API_SECRET` - Placeholder (not used yet)
- `OPENAI_API_KEY` - Mentioned in `technical.md` for image generation skill (not implemented)

**Secrets location:**
- Local: `.env.local` (Git-ignored)
- Production: Vercel environment variables dashboard
- Template: `.env.example` (tracked in Git)

## Webhooks & Callbacks

**Incoming:**
- `/auth/callback` - OAuth callback route (implicitly handled by Supabase/Next.js)
- `/api/dgt/consulta-nota` - POST endpoint for DGT score queries

**Outgoing:**
- None detected (no outbound webhooks to external services)
- Google OAuth redirect: `{origin}/auth/callback` (implicit)

## Data Privacy & Security

**NIF Hashing:**
- DGT lookups: Spanish ID numbers (NIF) are hashed using SHA-256 before storage
  - Implementation: `src/app/api/dgt/consulta-nota/route.ts` → `hashNIF()` function
  - Stored as: `nif_hash` in `consultas_dgt` table (never raw NIF)

**Session Security:**
- Supabase Auth cookies with secure flags (managed by @supabase/ssr)
- Protected API routes require authenticated session

**Rate Limiting:**
- DGT API: 5 queries per user per day
  - Enforced: `src/app/api/dgt/consulta-nota/route.ts` line 72-79

---

*Integration audit: 2026-02-21*
