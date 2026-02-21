# Architecture

**Analysis Date:** 2026-02-21

## Pattern Overview

**Overall:** Next.js App Router with Server Components as default, Client Components for interactive UI, Server Actions for mutations.

**Key Characteristics:**
- Server-first architecture with selective client interactivity
- Layered separation: Pages (routes) → Components → Hooks → Actions (server mutations) → Lib (utilities) → Types
- Supabase as single source of truth for data persistence and authentication
- Type-safe interfaces throughout with TypeScript and Zod validation
- Async data fetching at page/component level using Server Components

## Layers

**UI Layer (Components):**
- Purpose: Render interface, handle user interaction via client-side state and event handlers
- Location: `src/components/` (organized by feature: `test/`, `dashboard/`, `dgt/`, `navigation/`, `shared/`, `ui/`)
- Contains: React components (TSX), both Client Components ("use client") and Server Components
- Depends on: Design system (shadcn/ui), Hooks, Types, Utils
- Used by: Pages and other components

**Page/Route Layer:**
- Purpose: Assemble pages, fetch server-side data, compose components
- Location: `src/app/` (Next.js App Router structure with route groups)
- Contains: Server Components by default, route handlers (API routes), layouts, error boundaries
- Depends on: Components, Actions, Data functions, Server client
- Used by: Router and user navigation

**Action Layer (Server Mutations):**
- Purpose: Handle form submissions, state mutations, database writes
- Location: `src/lib/actions/` (organized by domain: `test.ts`, `user.ts`, `admin.ts`) and `src/lib/auth/`
- Contains: "use server" functions that execute in Node runtime with database access
- Depends on: Server Supabase client, Types, Validation schemas
- Used by: Pages, Client Components via form actions

**Data Layer (Queries):**
- Purpose: Fetch and transform data from Supabase
- Location: `src/lib/data/` (organized by domain: `tests.ts`, `user.ts`, `content.ts`, `admin.ts`)
- Contains: Async functions that query Supabase, transform responses to internal types
- Depends on: Server Supabase client, Types
- Used by: Pages, Components (via SSR or direct calls from Server Components)

**Utilities Layer:**
- Purpose: Pure functions, constants, helpers, client initialization
- Location: `src/lib/` (constants.ts, utils.ts, supabase/, dgt/, build-test.ts, question-bank.ts)
- Contains: Shared logic, question generation, DGT API integration, Supabase setup
- Depends on: Types, External packages
- Used by: All layers

**Type Layer:**
- Purpose: Single source of truth for TypeScript interfaces
- Location: `src/types/` (api.ts, test.ts, database.ts, user.ts, dgt.ts)
- Contains: Interface and type definitions
- Depends on: None (dependency terminus)
- Used by: All layers

**Hook Layer:**
- Purpose: Encapsulate client-side state and effect logic
- Location: `src/hooks/` (useTimer.ts)
- Contains: Custom React hooks for stateful client logic
- Depends on: React, Types
- Used by: Client Components

## Data Flow

**Test-Taking Flow:**

1. User navigates to `/test/[id]?mode=examen|estudio` (page at `src/app/(dashboard)/test/[id]/page.tsx`)
2. Server Component fetches test questions using `getTestQuestions()` from `src/lib/data/tests.ts`
3. Page composes `TestActiveClient` component, passing questions as props
4. `TestActiveClient` renders `TestSession` (Client Component) with local state management via `useState`, `useRef`
5. `TestSession` manages timer via `useTimer` hook, answer selection, and UI rendering
6. On submission, `TestSession` calls Server Action `submitTestResults` from `src/lib/actions/test.ts`
7. Server Action:
   - Authenticates user via Supabase
   - Inserts test record into `tests_realizados` table
   - Batch inserts answers into `respuestas_test` table
   - Updates `preguntas_falladas` table via RPC for failed questions
   - Returns test result ID
8. Results page at `src/app/(dashboard)/test/resultado/[id]/page.tsx` fetches and displays results

**Authentication Flow:**

1. User submits form on `/login` or `/register` pages
2. Form calls Server Action (`login()`, `register()`, `signInWithGoogle()`) from `src/lib/auth/actions.ts`
3. Server Action uses Supabase Auth client to authenticate
4. On success, action redirects to `/dashboard`
5. Subsequent requests include Supabase session cookie (managed by SSR adapter)
6. Protected pages check authentication via `supabase.auth.getUser()` in Server Components

**Question Bank Generation:**

1. Pre-built question bank from `src/lib/question-bank.ts` (auto-generated, not edited manually)
2. On test creation or demo, `buildTest()` from `src/lib/build-test.ts` selects 30 questions
3. Selection respects DGT topic distribution (e.g., tema_07: 6 questions, tema_06: 4)
4. Questions are shuffled within topics, then overall order randomized
5. Final 30-question array passed to UI component

**DGT Grade Lookup Flow:**

1. User submits form at `/notas-dgt` with NIF, exam date, license class
2. Form calls API route `POST /api/dgt/consulta-nota` from `src/app/api/dgt/consulta-nota/route.ts`
3. Route validates input (NIF format, dates), rate-limits user (5 checks/day)
4. Calls `consultarNotaDGT()` utility from `src/lib/dgt/consulta-nota.ts` (integrates with external DGT service)
5. On success, stores hashed result in `consultas_dgt` table for audit
6. Returns result to client component for display

**State Management:**

- **Server state:** Persisted in Supabase, fetched in Server Components via async functions
- **Client state:** Local component state (useState) for UI interactivity, temporary form values
- **Session state:** Supabase session cookie (secure, httpOnly)
- **Form state:** react-hook-form for validation and submission
- **Client-side storage:** localStorage for test results display in TestSession component (STORAGE_KEY = "nadatest_last_result")

## Key Abstractions

**TestQuestion:**
- Purpose: Represents a single exam question with all metadata
- Examples: `src/lib/mock-test-data.ts`, `src/lib/question-bank.ts`, `src/types/test.ts`
- Pattern: Interface defining shape, implementations in question bank (auto-generated) and mock data (fallback)

**ApiResponse<T>:**
- Purpose: Standardized API response wrapper
- Examples: `src/types/api.ts`
- Pattern: Generic type with `success` boolean, optional `data`, optional `error` string

**Server Actions:**
- Purpose: Encapsulate mutations (form submissions, state changes) with automatic CSRF protection
- Examples: `submitTestResults()`, `login()`, `register()`
- Pattern: Async functions marked "use server", imported directly by Client Components and Server Components

**Supabase Client Initialization:**
- Purpose: Separate client setup for server (with cookie handling) vs. admin operations
- Examples: `src/lib/supabase/server.ts`, `src/lib/supabase/client.ts`, `src/lib/supabase/admin.ts`
- Pattern: Factory functions that return configured Supabase instances, checking env vars at runtime

**Test Session State:**
- Purpose: Capture user answers, timer, scoring
- Examples: `TestState`, `QuestionResult`, `TestResult` in `src/types/test.ts`
- Pattern: Interfaces defining shape; state managed locally in TestSession component with hook (useTimer)

## Entry Points

**Web Application:**
- Location: `src/app/layout.tsx`
- Triggers: HTTP request to any route
- Responsibilities: Root layout, global styles (globals.css), Toaster component, skip-to-main link

**Landing Page:**
- Location: `src/app/page.tsx`
- Triggers: GET `/` when unauthenticated
- Responsibilities: Marketing page, redirects authenticated users to `/dashboard`, CTAs to demo and registration

**Authentication:**
- Location: `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`
- Triggers: GET `/login`, GET `/register`
- Responsibilities: Login/registration forms using Server Actions from `src/lib/auth/actions.ts`

**Dashboard (Protected):**
- Location: `src/app/(dashboard)/dashboard/page.tsx`
- Triggers: GET `/dashboard` when authenticated
- Responsibilities: Server Component fetches user stats, recent tests; composes StatsCard, RecentTestsList components

**Test Execution:**
- Location: `src/app/(dashboard)/test/page.tsx` (test selection), `src/app/(exam)/test/[id]/page.tsx` (test taking)
- Triggers: GET `/test` (selection), GET `/test/[id]?mode=examen|estudio` (execution)
- Responsibilities: First page fetches test from DB; second page fetches questions and composes interactive TestSession component

**API Routes:**
- Location: `src/app/api/**/route.ts`
- Triggers: HTTP requests to `/api/*` endpoints
- Responsibilities: Only DGT grade lookup at `src/app/api/dgt/consulta-nota/route.ts`; validates input, calls external service, rate-limits, stores audit log

**Error Handling:**
- Location: `src/app/error.tsx` (global), route-specific error boundaries
- Triggers: Uncaught errors in components or Server Components
- Responsibilities: Display error page without crashing entire app

## Error Handling

**Strategy:** Try-catch blocks with user-friendly error messages; console.error for debugging.

**Patterns:**

- **Server Actions:** Return object with `{ success: false, error: string }` on failure
- **API Routes:** Return NextResponse with status code (400, 401, 429, 500) and error message in JSON body
- **Server Components:** Gracefully degrade (return null, empty list) if query fails; not recommended to throw from fetch
- **Client Components:** Catch errors in event handlers, update UI state to display error toast

**Examples:**
- `src/lib/actions/test.ts` line 45: `return { success: false, error: "Error al guardar el test" }`
- `src/app/api/dgt/consulta-nota/route.ts` line 31: `return NextResponse.json({ success: false, error: "..." }, { status: 400 })`

## Cross-Cutting Concerns

**Logging:** Simple `console.error()` for errors; `console.log()` for debugging. No structured logging framework.

**Validation:**
- **Zod schemas** in `src/lib/auth/schemas.ts` for form input
- **Manual validation** in API routes (e.g., NIF format check in consulta-nota)
- **Type safety** enforced by TypeScript at compile time

**Authentication:**
- Supabase Auth (email/password, Google OAuth)
- Session stored in secure httpOnly cookie via SSR adapter
- User context accessed via `supabase.auth.getUser()` in Server Components
- Protected routes check auth manually (no middleware-based protection)

**Rate Limiting:**
- DGT grade lookup limited to 5 checks per day per user
- Implemented in API route using `supabase.from("consultas_dgt").select()` with date filter

**Internationalization:**
- UI text in Spanish (hardcoded in components)
- Code in English (variables, functions, comments)
- Locale set to "es-ES" in some utilities (e.g., dashboard date formatting)

---

*Architecture analysis: 2026-02-21*
