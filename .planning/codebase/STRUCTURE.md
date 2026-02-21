# Codebase Structure

**Analysis Date:** 2026-02-21

## Directory Layout

```
nadatest/
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, API routes)
│   │   ├── (auth)/             # Route group: login, register pages
│   │   ├── (dashboard)/        # Route group: authenticated user dashboard, tests, progress
│   │   ├── (exam)/             # Route group: public demo and test execution
│   │   ├── admin/              # Admin panel pages (materials, questions, tests, users)
│   │   ├── api/                # API routes (only DGT consultation implemented)
│   │   ├── auth/               # Auth callback handlers
│   │   ├── layout.tsx          # Root layout, global styles, Toaster
│   │   ├── page.tsx            # Landing page
│   │   ├── error.tsx           # Global error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   ├── favicon.ico         # Favicon
│   │   └── globals.css         # Global styles (Tailwind + custom animations)
│   │
│   ├── components/             # React components organized by feature
│   │   ├── ui/                 # shadcn/ui components (Button, Card, Dialog, etc.)
│   │   ├── test/               # Test execution components
│   │   │   ├── TestActiveClient.tsx     # Entry point for test taking
│   │   │   ├── TestSession.tsx          # Main test UI with timer, questions, answers
│   │   │   ├── QuestionGrid.tsx         # Question navigation grid
│   │   │   └── ResultsView.tsx          # Results display after test submission
│   │   ├── dashboard/          # Dashboard feature components
│   │   │   ├── StatsCard.tsx           # Statistics display cards
│   │   │   ├── RecentTestsList.tsx     # List of recent test attempts
│   │   │   ├── ProgressBar.tsx         # Progress visualization
│   │   │   ├── FailedQuestionCard.tsx  # Failed questions review
│   │   │   ├── ThemeAccordion.tsx      # Topic-based question display
│   │   │   └── MaterialItem.tsx        # Learning material item
│   │   ├── navigation/         # Navigation components
│   │   │   ├── Navbar.tsx              # Top navigation bar
│   │   │   ├── Sidebar.tsx             # Sidebar for authenticated users
│   │   │   └── MobileMenu.tsx          # Mobile navigation menu
│   │   ├── shared/             # Shared components used across features
│   │   │   ├── PageHeader.tsx          # Standard page header
│   │   │   └── EmptyState.tsx          # Empty state placeholder
│   │   ├── dgt/                # DGT grade lookup components
│   │   │   ├── consulta-nota-form.tsx  # Form to enter NIF, exam date, etc.
│   │   │   ├── resultado-nota.tsx      # Display DGT grade result
│   │   │   └── historial-notas.tsx     # History of grade lookups
│   │   └── objetivo/           # Learning goal components
│   │       ├── DailyGoalCard.tsx       # Daily study goal
│   │       └── ExamDateCard.tsx        # Target exam date
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useTimer.ts         # Timer state management for exam mode
│   │
│   ├── lib/                    # Utilities and business logic
│   │   ├── actions/            # Server Actions (mutations)
│   │   │   ├── test.ts         # submitTestResults, test management
│   │   │   ├── user.ts         # User profile mutations
│   │   │   └── admin.ts        # Admin operations
│   │   ├── auth/               # Authentication logic
│   │   │   ├── actions.ts      # login, register, logout, signInWithGoogle
│   │   │   ├── test-actions.ts # Test-specific auth flows
│   │   │   └── schemas.ts      # Zod validation schemas for forms
│   │   ├── data/               # Data fetching functions (queries)
│   │   │   ├── tests.ts        # getTestById, getTestQuestions, etc.
│   │   │   ├── user.ts         # User profile, stats queries
│   │   │   ├── content.ts      # Question bank queries
│   │   │   └── admin.ts        # Admin data queries
│   │   ├── supabase/           # Supabase client initialization
│   │   │   ├── server.ts       # Server-side client with SSR adapter
│   │   │   ├── client.ts       # Client-side client (unused, for reference)
│   │   │   └── admin.ts        # Admin client with service role key
│   │   ├── dgt/                # DGT API integration
│   │   │   ├── consulta-nota.ts      # consultarNotaDGT() function
│   │   │   └── validate-nif.ts       # validateNIF() for NIF format
│   │   ├── constants.ts        # TEST_CONFIG, TEMAS, CLASES_PERMISO, etc.
│   │   ├── utils.ts            # Shared utilities (cn, formatTime, etc.)
│   │   ├── build-test.ts       # buildTest() for 30-question test generation
│   │   ├── question-bank.ts    # questionBank array (auto-generated, do not edit)
│   │   ├── mock-test-data.ts   # Fallback sample questions when bank is empty
│   │   ├── nav-items.ts        # Navigation menu configuration
│   │   └── [other utilities]   # Other shared helpers
│   │
│   └── types/                  # TypeScript interfaces and types
│       ├── api.ts              # ApiResponse<T> generic wrapper
│       ├── test.ts             # QuestionType, TestQuestion, TestMode, TestResult, etc.
│       ├── database.ts         # Database row types (User, Test, Question, etc.)
│       ├── user.ts             # User profile types
│       └── dgt.ts              # ConsultaNotaInput, ConsultaNotaResult types
│
├── supabase/                   # Supabase migrations and config
│   ├── migrations/             # SQL migrations for schema
│   └── config.toml             # Supabase local dev config
│
├── e2e/                        # End-to-end tests (Playwright)
│
├── public/                     # Static assets (images, fonts, etc.)
│
├── scripts/                    # Utility scripts
│   └── generate-question-bank.mjs  # Generates src/lib/question-bank.ts from content
│
├── .next/                      # Build output (git-ignored)
├── node_modules/               # Dependencies (git-ignored)
├── .env.example                # Template for environment variables
├── .eslintrc.mjs               # ESLint configuration
├── eslint.config.mjs           # Alternative ESLint config
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs           # PostCSS configuration (Tailwind)
├── components.json             # shadcn/ui component registry
├── playwright.config.ts        # E2E test configuration
├── package.json                # Dependencies and scripts
├── package-lock.json           # Lock file
├── README.md                   # Project overview
└── CLAUDE.md                   # Claude AI instructions
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router with all routes, layouts, API endpoints
- Contains: Page components (TSX), layout files, error boundaries, API route handlers
- Key files: `page.tsx` (entry point per route), `layout.tsx` (composition and nesting)
- Route groups (`(auth)`, `(dashboard)`, `(exam)`) organize routes visually without affecting URL

**`src/components/`:**
- Purpose: All React components, organized by feature
- Contains: UI components from shadcn/ui, feature-specific components
- Key pattern: Each component is a single file; larger features get subdirectories
- Subdirectories: `ui/` (design system), `test/` (test-taking), `dashboard/` (stats and progress), `navigation/` (site nav), `shared/` (reused), `dgt/` (grade lookup), `objetivo/` (goals)

**`src/lib/actions/`:**
- Purpose: Server Actions for mutations
- Contains: Async functions marked "use server" for form submissions, database writes
- Key files: `test.ts` (test submission), `user.ts` (profile updates), `admin.ts` (admin operations)

**`src/lib/auth/`:**
- Purpose: Authentication logic
- Contains: Server Actions (`login`, `register`, `logout`), OAuth integration, validation schemas
- Key files: `actions.ts` (auth endpoints), `schemas.ts` (Zod form validation)

**`src/lib/data/`:**
- Purpose: Data fetching/query functions
- Contains: Async functions that query Supabase, transform responses to internal types
- Key files: `tests.ts` (test queries), `user.ts` (user queries), `content.ts` (question queries)

**`src/lib/supabase/`:**
- Purpose: Supabase client configuration
- Contains: Client factory functions with correct environment setup
- Key files: `server.ts` (SSR-safe server client), `admin.ts` (service role for scripts)

**`src/types/`:**
- Purpose: Single source of truth for TypeScript interfaces
- Contains: All type definitions, exported for use throughout codebase
- Key files: `test.ts` (test/question types), `api.ts` (API response wrapper), `database.ts` (Supabase row types)

**`src/hooks/`:**
- Purpose: Custom React hooks
- Contains: Encapsulated state and effect logic
- Key files: `useTimer.ts` (countdown timer for exam mode)

**`supabase/`:**
- Purpose: Database schema and configuration
- Contains: SQL migrations, local dev config
- Key files: Migrations that define tables, functions (RPC), policies

**`e2e/`:**
- Purpose: End-to-end tests using Playwright
- Contains: Test scripts for critical user flows
- Runs before deployment to catch regressions

**`scripts/`:**
- Purpose: Automation and code generation
- Key files: `generate-question-bank.mjs` (generates `src/lib/question-bank.ts` from content pipeline)

## Key File Locations

**Entry Points:**

- `src/app/layout.tsx` - Root layout (metadata, Toaster, skip link)
- `src/app/page.tsx` - Landing page with feature overview
- `src/app/(auth)/login/page.tsx` - Login form
- `src/app/(auth)/register/page.tsx` - Registration form

**Configuration:**

- `tsconfig.json` - Compiler options, path aliases (`@/*` → `src/*`)
- `next.config.ts` - Next.js config (image remotePatterns for todotest.com)
- `.env.example` - Template for required environment variables
- `components.json` - shadcn/ui registry

**Core Logic:**

- `src/lib/actions/test.ts` - Test submission and result storage
- `src/lib/auth/actions.ts` - Login, registration, OAuth
- `src/lib/data/tests.ts` - Test and question fetching
- `src/lib/build-test.ts` - Test generation with DGT distribution
- `src/lib/question-bank.ts` - Question bank (auto-generated, 79,000+ lines)

**Testing:**

- `src/components/test/TestSession.tsx` - Main test UI component
- `src/app/(exam)/test/[id]/page.tsx` - Test execution page
- `src/app/(dashboard)/test/resultado/[id]/page.tsx` - Results page

**Types:**

- `src/types/test.ts` - TestQuestion, TestResult, QuestionType
- `src/types/api.ts` - ApiResponse<T>
- `src/types/database.ts` - Database schema types

## Naming Conventions

**Files:**

- Component files: `PascalCase.tsx` (e.g., `TestSession.tsx`, `StatsCard.tsx`)
- Action/utility files: `camelCase.ts` (e.g., `submitTestResults`, `buildTest.ts`)
- API route files: `route.ts` (Next.js convention, e.g., `src/app/api/dgt/consulta-nota/route.ts`)
- Type files: `[domain].ts` in `src/types/` (e.g., `test.ts`, `api.ts`)

**Directories:**

- Feature directories: `lowercase` (e.g., `src/components/test/`, `src/lib/actions/`)
- Special Next.js groups: `(group-name)` (e.g., `(auth)`, `(dashboard)`)

**Variables & Functions:**

- React components: `PascalCase` (e.g., `TestSession`, `AnswerOption`)
- Functions/utilities: `camelCase` (e.g., `submitTestResults`, `buildTest`, `formatDate`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `TEST_CONFIG`, `DISTRIBUTION`, `STORAGE_KEY`)
- Types/interfaces: `PascalCase` (e.g., `TestQuestion`, `ApiResponse`, `QuestionResult`)

## Where to Add New Code

**New Feature (e.g., "Peer Learning"):**

1. Create feature directory: `src/components/peer-learning/`
   - `PeerCard.tsx` - Main display component
   - `PeerForm.tsx` - Creation/edit form

2. Create types: `src/types/peer-learning.ts`
   - Define `PeerQuestion`, `PeerSession`, etc.

3. Create page: `src/app/(dashboard)/peer-learning/page.tsx`
   - Server Component fetching data
   - Compose feature components

4. Create actions: `src/lib/actions/peer-learning.ts`
   - `submitPeerQuestion()`, `joinPeerSession()`, etc.

5. Create data queries: `src/lib/data/peer-learning.ts`
   - `getPeerQuestions()`, `getPeerSessions()`, etc.

6. Add navigation: Update `src/lib/nav-items.ts` and `src/components/navigation/Sidebar.tsx`

7. Add database schema: Create Supabase migration in `supabase/migrations/`

**New Component/Module:**

- UI component: `src/components/[feature]/[ComponentName].tsx`
- Shared utility component: `src/components/shared/[ComponentName].tsx`
- Reusable hook: `src/hooks/use[Feature].ts`

**Utilities:**

- Shared helpers: `src/lib/utils.ts`
- Domain-specific utilities: `src/lib/[domain]/[utility].ts` (e.g., `src/lib/dgt/validate-nif.ts`)

## Special Directories

**`src/lib/question-bank.ts`:**
- Purpose: Question bank (auto-generated, do NOT edit manually)
- Generated: By `scripts/generate-question-bank.mjs`
- Source: Content pipeline output
- Used by: `buildTest()` to construct 30-question exams
- Commit: Yes (committed to git for reproducibility)

**`src/app/api/`:**
- Purpose: API route handlers
- Currently: Only DGT grade lookup (`src/app/api/dgt/consulta-nota/route.ts`)
- Future: Add more endpoints as needed (other API integrations)
- Pattern: Each endpoint is a directory with `route.ts` file

**`supabase/migrations/`:**
- Purpose: Database schema evolution
- Contains: SQL files that define tables, functions, policies
- Pattern: Named by timestamp and feature (e.g., `20240101_create_tests.sql`)
- Apply: Via `supabase migration up` in local dev

**`src/app/auth/callback`:**
- Purpose: OAuth callback handler for Google sign-in
- File: `src/app/auth/callback/route.ts` (if needed)
- Pattern: Handles redirect from OAuth provider

---

*Structure analysis: 2026-02-21*
