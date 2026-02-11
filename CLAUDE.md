# CLAUDE.md — Nadatest

## Project Overview

Nadatest is a web platform for preparing the theoretical driving exam (permiso B) from DGT, Spain. Users practice with 30-question tests that simulate the real exam format.

**Stack**: Next.js 14+ / TypeScript / Tailwind CSS / shadcn/ui / Supabase (PostgreSQL + Auth) / Vercel

**Key docs** (read these for full context):
- `README.md` — Project overview, content pipeline, topic index
- `technical.md` — Stack, folder structure, components, API endpoints, SQL schema
- `tasks.md` — Task checklist by phase
- `content-pipeline.md` — Content generation pipeline, skills, image strategy
- `temario_permiso_b_v3.md` — Official driving theory content (source of truth)

## Critical Rules

- **UI text in Spanish** — All user-facing text must be in proper Spanish with accents (á, é, í, ó, ú, ñ) and opening question marks (¿)
- **Code in English** — Variables, functions, comments, file names in English
- **No emojis** in code, comments, or commit messages
- **shadcn/ui first** — Always use shadcn/ui components before creating custom UI
- **Mobile-first** — Design for mobile, then scale up to desktop
- **Security and performance rules** — Follow `~/.claude/rules/security.md` and `~/.claude/rules/performance.md`

## Code Organization

- Many small files over few large files
- 200–400 lines typical, 800 max per file
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

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` |
| Card / Surface | `#171717` |
| Primary (accent) | `#10b981` (emerald) |
| Secondary | `#3b82f6` (blue) |
| Destructive | `#ef4444` (red) |
| Warning | `#f59e0b` (amber) |
| Text primary | `#fafafa` |
| Text muted | `#a1a1aa` |
| Border | `#27272a` |
| Font | Inter / system stack |
| Icons | Lucide (from shadcn) |

Dark theme is the default and only theme.

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

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

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

## Available Commands

| Command | Description |
|---------|-------------|
| `/generar-preguntas` | Generate DGT exam questions from temario |
| `/commit` | Create a git commit |
| `/commit-push` | Commit and push to GitHub |
| `/commit-push-pr` | Commit, push, and open a PR |
| `/plan` | Create implementation plan |
| `/code-review` | Review code quality |
| `/frontend-design` | Build polished frontend interfaces |
| `/tdd` | Test-driven development workflow |
| `/feature-dev` | Guided feature development |
| `/fix-bug` | Guided bug fixing with investigation |
| `/review-pr` | Comprehensive PR review |
| `/e2e` | Generate and run E2E tests with Playwright |

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
