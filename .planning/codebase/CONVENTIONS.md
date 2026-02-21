# Coding Conventions

**Analysis Date:** 2026-02-21

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `FailedQuestionCard.tsx`, `StatsCard.tsx`)
- Utility/hook files: camelCase (e.g., `useTimer.ts`, `consulta-nota.ts`)
- Type definition files: lowercase (e.g., `test.ts`, `user.ts`, `api.ts`)
- Action files: lowercase (e.g., `admin.ts`, `test.ts`, `user.ts`)

**Functions:**
- Exported functions: camelCase (e.g., `createClient()`, `submitTestResults()`)
- Internal/private functions: camelCase (e.g., `requireAdmin()`, `formatTime()`)
- React component functions: PascalCase (e.g., `TestSession`, `LoginPage`, `Navbar`)

**Variables:**
- Regular variables: camelCase (e.g., `secondsRef`, `displayRef`, `isMobile`)
- Constants: CONSTANT_CASE (e.g., `QUESTION_TYPES`, `TEST_CONFIG`, `CLASES_PERMISO`)
- Boolean variables: prefix with `is` or `show` (e.g., `isSelected`, `showFeedback`, `isCorrect`)
- Ref variables: suffix with `Ref` (e.g., `secondsRef`, `displayRef`, `intervalRef`)

**Types:**
- Interfaces: PascalCase, descriptive (e.g., `StatsCardProps`, `TestQuestion`, `ApiResponse<T>`)
- Type aliases: PascalCase (e.g., `QuestionType`, `TestMode`, `ImageType`)
- Generic types use single letters: `<T>`, `<K>`, `<V>`

## Code Style

**Formatting:**
- No Prettier config — use IDE defaults with ESLint
- Indentation: 2 spaces (TypeScript standard)
- Line length: Typically 80-100 characters, no hard limit
- Trailing commas: Used in multi-line structures
- Semicolons: Always present (enforced by TypeScript)

**Linting:**
- ESLint config: `eslint.config.mjs` using `eslint-config-next`
- Rules: Next.js Core Web Vitals + TypeScript strict mode
- No custom rules beyond defaults
- No `.eslintignore` — uses integrated Next.js ignores

**Quotes:**
- Double quotes for strings (enforced by ESLint)
- Template literals for interpolation (e.g., `` `${origin}/auth/callback` ``)

## Import Organization

**Order:**
1. React and Next.js imports (hooks, navigation, components)
2. Third-party imports (lucide-react, zod, sonner, etc.)
3. UI component imports from `@/components/ui/`
4. Feature/domain component imports from `@/components/[feature]/`
5. Utility imports from `@/lib/`
6. Type imports from `@/types/`

**Example:**
```typescript
import { useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FailedQuestionCard } from "@/components/dashboard/FailedQuestionCard";
import { createClient } from "@/lib/supabase/server";
import type { FailedQuestion } from "@/types/user";
```

**Path Aliases:**
- `@/*` maps to `./src/*` (defined in `tsconfig.json`)
- Always use `@/` prefix for src-relative imports, never `../`

**Type Imports:**
- Use `import type { ... }` for type-only imports to avoid circular dependencies
- Exceptions: TypeScript automatically detects type-only and optimizes imports

## Error Handling

**Patterns:**
- Server actions return `ApiResponse<T>` wrapper with `success`, `data`, and `error` fields
- Client-side: Catch errors and use `toast.error(message)` for user feedback
- Database errors: Log to console with `console.error()`, return generic error message to user
- No try-catch wrapping of simple conditional checks

**Example Pattern:**
```typescript
// Server action pattern
export async function submitTestResults(
  data: SubmitTestData
): Promise<ApiResponse<{ testRealizadoId: string }>> {
  const supabase = await createClient();

  if (!user) {
    return { success: false, error: "No autenticado" };
  }

  const { data: result, error } = await supabase.from("table").insert(...);

  if (error) {
    console.error("Failed operation:", error);
    return { success: false, error: "User-friendly message" };
  }

  return { success: true, data: result };
}
```

**Client-side error handling:**
```typescript
// In a component
function onSubmit(values: LoginInput) {
  startTransition(async () => {
    const result = await login(values);
    if (result?.error) {
      toast.error(result.error);
    }
  });
}
```

**Validation:**
- Input validation: Zod schemas in `src/lib/auth/schemas.ts`, `src/lib/dgt/schemas.ts`
- Form validation: react-hook-form with zodResolver
- All Spanish error messages should include accents and proper grammar

## Logging

**Framework:** `console.error()` and `console.log()` (no logging library)

**Patterns:**
- Log errors with context: `console.error("Operation failed:", error)`
- No logging in happy paths (no `console.log("Success!")`)
- Server-side only — no console logs visible in browser
- Use descriptive messages referencing specific operations

## Comments

**When to Comment:**
- Complex logic or non-obvious algorithms (e.g., useTimer hook)
- Trade-offs or design decisions
- Unusual patterns (e.g., DOM ref updates to avoid re-renders)
- DO NOT comment obvious code (e.g., `const x = 5; // set x to 5`)

**JSDoc/TSDoc:**
- Used sparingly for public functions in hooks
- Single-line summary + detailed explanation
- Example from `useTimer.ts`:
```typescript
/**
 * Timer hook that updates via DOM ref (no re-renders on each tick).
 * Attach `displayRef` to a <span> to show the formatted time.
 * Read `secondsRef.current` for the current value.
 */
```

**Inline Comments:**
- Used to explain module-level structures: `/* ── Module-level sub-components ── */`
- Mark sections of code: `// 1. Insert test data`, `// 2. Update progress`

## Function Design

**Size:**
- Typical: 20-50 lines
- Maximum: 200-400 lines (e.g., `TestSession.tsx` is largest at ~600 lines due to complexity)
- Larger functions: Consider extracting sub-components or helper functions

**Parameters:**
- Single object parameter for 2+ arguments: `{ userId, testId, mode }`
- Use destructuring in function signature
- Type all parameters explicitly

**Return Values:**
- Functions return typed values (never implicit `undefined`)
- Server actions return `ApiResponse<T>` wrapper
- Custom hooks return object with named properties: `{ secondsRef, displayRef, stop }`
- Event handlers implicitly return `void`

## Module Design

**Exports:**
- Named exports preferred: `export function FailedQuestionCard() { ... }`
- Default exports for page components only: `export default function LoginPage() { ... }`
- Type exports: `export type LoginInput = z.infer<typeof loginSchema>;`

**Barrel Files:**
- Not used — import from specific files directly
- E.g., import from `@/lib/supabase/server.ts`, not `@/lib/supabase/`

**Component Organization:**
- Sub-components defined at module level before main component (prevents remounting)
- Example in `TestSession.tsx`: `AnswerOption`, `FeedbackMessage` sub-components defined above main export

## Server vs Client Code

**"use server" directives:**
- Placed at top of action files: `src/lib/auth/actions.ts`, `src/lib/actions/test.ts`
- All server actions are async functions
- Accessed from client components via transition hooks or direct function calls

**"use client" directives:**
- Placed at top of interactive components: `src/app/(auth)/login/page.tsx`, `TestSession.tsx`
- Hooks (useState, useTransition, useEffect) only in "use client" components
- Props accept both server and client data (serializable types only)

## TypeScript Configuration

**Strict Mode:** Enabled
- All types must be explicit
- No implicit `any`
- Null/undefined checks required
- Non-null assertion (!) used only when necessary

**Target:** ES2017
**Module:** ESNext
**Lib:** dom, dom.iterable, esnext

---

*Convention analysis: 2026-02-21*
