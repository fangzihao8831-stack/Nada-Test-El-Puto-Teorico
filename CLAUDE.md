# CLAUDE.md — Nadatest

## Project Overview

Nadatest is a web platform for preparing the theoretical driving exam (permiso B) from DGT, Spain. Users practice with 30-question tests that simulate the real exam format.

**Stack**: Next.js 16+ / TypeScript / Tailwind CSS v4 / shadcn/ui / Supabase (PostgreSQL + Auth) / Vercel

**Key docs** (read these for full context):
- `README.md` — Project overview, content pipeline, topic index
- `requirements.md` — Product requirements, navigation, UX specs
- `technical.md` — Stack, folder structure, components, API endpoints, SQL schema
- `content-pipeline.md` — Content generation pipeline, skills, image strategy
- `temario_permiso_b_v3.md` — Official driving theory content (source of truth)

## Critical Rules

- **UI text in Spanish** — All user-facing text must be in proper Spanish with accents (a, e, i, o, u, n) and opening question marks
- **Code in English** — Variables, functions, comments, file names in English
- **No emojis** in code, comments, or commit messages
- **shadcn/ui first** — Always use shadcn/ui components before creating custom UI
- **Mobile-first** — Design for mobile, then scale up to desktop
- **Security and performance rules** — Follow `~/.claude/rules/security.md` and `~/.claude/rules/performance.md`

## Code Organization

- Many small files over few large files
- 200-400 lines typical, 800 max per file
- Organize by feature/domain, not by type
- Follow the folder structure in `technical.md`

```
src/
├── app/              # Next.js App Router (pages, layouts)
├── components/       # UI components (ui/, test/, navigation/, dashboard/)
├── hooks/            # Custom React hooks
├── lib/              # Utilities, Supabase clients, constants
└── types/            # TypeScript type definitions
```

## Design System

Light theme with blue primary, matching requirements.md specs.

| Token | Value |
|-------|-------|
| Background | `#F8FAFC` (slate-50, cool off-white) |
| Card / Surface | `#FFFFFF` (pure white) |
| Primary (accent) | `#3B82F6` (blue-500) |
| Destructive | `#EF4444` (red-500) |
| Warning | `#F59E0B` (amber-500) |
| Success | `#10B981` (emerald-500) |
| Text primary | `#0F172A` (slate-900) |
| Text muted | `#64748B` (slate-500) |
| Border | `#E2E8F0` (slate-200) |
| Font | Geist Sans |
| Icons | Lucide (from shadcn) |
| Corners | 8-12px rounded |
| Shadows | Soft, subtle |
| Feedback | Green (correct) / Red (incorrect) |

Light theme is the default and only theme.

## Testing

- **TDD**: Write tests first, then implement
- **80% minimum coverage**
- **Unit tests** for utilities, hooks, and pure functions
- **Integration tests** for API routes and server actions
- **E2E tests** for critical flows: test-taking, results review, authentication
- Run `npm test` before every commit

## Content Pipeline

Questions follow the JSON format defined in `content-pipeline.md`. Six question types:

| Type | Key |
|------|-----|
| Direct short question | `directa` |
| Situational / conditional | `situacional` |
| Complete the sentence | `completar` |
| Image-based (signal/situation) | `imagen` |
| Concrete data point | `dato` |
| Trick with absolutes | `trampa` |

Source of truth for all driving content: `temario_permiso_b_v3.md`

## Page Routing

| Route | Auth | Description |
|-------|------|-------------|
| `/` | No | Landing page with "Examen de prueba" + "Registrate" CTAs. Redirects to `/dashboard` if authenticated. |
| `/login` | No | Login form (email + Google OAuth) |
| `/register` | No | Registration form |
| `/demo` | No | Trial test (30 questions, no account needed) |
| `/dashboard` | Yes | Authenticated home with stats, recent tests, CTA |
| `/progreso` | Yes | Progress by topic |
| `/fallos` | Yes | Failed questions review |
| `/test/[id]` | Yes | Active test page |
| `/resultado/[id]` | Yes | Test results page |
| `/admin` | Yes (admin) | Admin dashboard |

## Key Patterns

### API Response

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Error Handling

```typescript
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  console.error("Operation failed:", error);
  return { success: false, error: "User-friendly message" };
}
```

### Supabase Client

```typescript
// Client-side: lib/supabase/client.ts
// Server-side: lib/supabase/server.ts
// See technical.md for full setup
```

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# OpenAI (image generation)
OPENAI_API_KEY=
```

## Git Workflow

- **Conventional commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- Never commit to `main` directly
- PRs require review
- All tests must pass before merge
- No secrets in commits (check `~/.claude/rules/security.md`)

## Database

See `technical.md` for the full SQL schema. Key tables:

- `profiles` — Extended user data
- `temas` / `subtemas` — 12 topics, 58 subtopics
- `preguntas` — Question bank
- `tests` — Pre-built 30-question tests
- `tests_realizados` / `respuestas_test` — User test history and answers
- `preguntas_falladas` — Failed questions for review
