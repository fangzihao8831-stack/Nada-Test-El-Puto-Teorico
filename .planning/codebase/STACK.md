# Technology Stack

**Analysis Date:** 2026-02-21

## Languages

**Primary:**
- TypeScript 5.9.3 - All source code in `src/`, type-safe application development
- TSX/JSX - React component files in `src/components/` and `src/app/`
- JavaScript - Build configuration files (`next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`)

**Secondary:**
- SQL - Database queries and migrations in `supabase/` directory

## Runtime

**Environment:**
- Node.js (version not specified, inferred from @types/node ^20)
- Browser environment (React 19.2.3)

**Package Manager:**
- npm (inferred from package.json structure)
- Lockfile: `package-lock.json` (presence assumed, not verified)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack framework with App Router and Server Actions
  - Location: `src/app/` for pages and routes
  - Uses: Server Components, Server Actions in `src/lib/actions/`, `src/lib/auth/`
  - Turbopack for dev bundling

**UI & Styling:**
- React 19.2.3 - UI component framework
- Tailwind CSS v4 - Utility-first styling with `@tailwindcss/postcss` plugin
- shadcn/ui 3.8.4 - Pre-built accessible components (19 components in `src/components/ui/`)
- Radix UI 1.4.3 - Headless component primitives (underlying shadcn/ui)

**Form Handling:**
- React Hook Form 7.71.1 - Form state management in `src/components/`
- Zod 4.3.6 - Schema validation for forms and API inputs (validators in `src/lib/auth/schemas.ts`)

**Utilities:**
- lucide-react 0.563.0 - Icon library for UI components
- Geist Sans 1.7.0 - Font family (San Francisco typeface)
- clsx 2.1.1 - Conditional CSS class utility
- tailwind-merge 3.4.0 - Merge Tailwind class conflicts
- class-variance-authority 0.7.1 - Component variant utility
- sonner 2.0.7 - Toast notifications

**Theming:**
- next-themes 0.4.6 - Theme management (light theme only, configured in `src/app/layout.tsx`)

## Testing

**E2E Testing:**
- Playwright 1.58.2 - End-to-end tests in `e2e/` directory
  - Config: `playwright.config.ts`
  - Projects: Desktop (1280x800) and Mobile (390x844) viewports
  - Test files: `e2e/auth.spec.ts`, `e2e/admin.spec.ts`, `e2e/dashboard.spec.ts`, `e2e/landing.spec.ts`, `e2e/test-flow.spec.ts`
  - Run command: `npx playwright test`

**Unit/Integration Testing:**
- Not configured (no Jest, Vitest, or other test runner found in devDependencies)

## Key Dependencies

**Database:**
- @supabase/supabase-js 2.97.0 - PostgreSQL client and query builder
  - Clients: `src/lib/supabase/client.ts` (browser), `src/lib/supabase/server.ts` (server)
  - Admin client: `src/lib/supabase/admin.ts`

**Authentication:**
- @supabase/ssr 0.8.0 - Server-side session management with cookies
  - Integrates Supabase Auth with Next.js App Router
  - Handles: Email/password login, Google OAuth signup/signin

**Form Resolution:**
- @hookform/resolvers 5.2.2 - Integration between React Hook Form and Zod validation

## Build & Development

**Build Tool:**
- Next.js 16.1.6 built-in build system with Turbopack
  - Config: `next.config.ts`
  - Dev command: `npm run dev`
  - Build command: `npm run build`
  - Start command: `npm run start`

**Linting:**
- ESLint 9 - Code quality with `eslint.config.mjs`
  - Configs: `eslint-config-next` (TypeScript and Core Web Vitals rules)
  - Run command: `npm run lint`

**TypeScript Compilation:**
- TypeScript 5.9.3 - Strict type checking
  - Config: `tsconfig.json` with strict mode enabled
  - Path aliases: `@/*` → `./src/*`
  - Compiler plugins: Next.js plugin for optimal build integration

**CSS Processing:**
- PostCSS with Tailwind CSS plugin
  - Config: `postcss.config.mjs`
  - Processes: Global styles in `src/app/globals.css`

**Font:**
- Geist Sans 1.7.0 - Modern system font family

## Configuration Files

**Next.js:**
- `next.config.ts` - Image remote patterns (allows images from `www.todotest.com`)

**TypeScript:**
- `tsconfig.json` - ES2017 target, strict mode, ESNext modules

**Tailwind CSS:**
- Configured via `@tailwindcss/postcss` plugin in `postcss.config.mjs`

**Environment:**
- `.env.local` - Local development secrets (not committed)
- `.env.example` - Template with required variables

## Environment Variables

**Required:**
```
NEXT_PUBLIC_SUPABASE_URL=              # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=         # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=             # Supabase service role (server-side only)
GOOGLE_CLIENT_ID=                      # Google OAuth (configured in Supabase dashboard)
GOOGLE_CLIENT_SECRET=                  # Google OAuth (configured in Supabase dashboard)
```

## Platform Requirements

**Development:**
- Node.js 20+ (inferred)
- npm or compatible package manager
- Modern browser with ES2017+ support

**Production:**
- Vercel (primary deployment platform)
  - Framework preset: Next.js 16
  - Serverless functions for API routes and Server Actions
  - Edge runtime support for middleware

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES2017 JavaScript features

---

*Stack analysis: 2026-02-21*
