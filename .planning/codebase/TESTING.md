# Testing Patterns

**Analysis Date:** 2026-02-21

## Test Framework

**Runner:**
- Playwright v1.58.2
- Config: `playwright.config.ts`

**Assertion Library:**
- Playwright's built-in assertions (`expect()`)

**Run Commands:**
```bash
npx playwright test              # Run all tests
npx playwright test --watch      # Watch mode (not used in current setup)
npx playwright test --ui         # UI mode for debugging
```

**Environment:**
- Base URL: `http://localhost:3002`
- Headless: true
- Retries: 0
- Workers: 2 (parallel execution)
- Timeout per test: 30 seconds

## Test File Organization

**Location:**
- All E2E tests in `e2e/` directory (parallel to `src/`)
- Test files: `e2e/[name].spec.ts`
- Helpers: `e2e/helpers.ts` (re-exports Playwright test and expect)

**Naming:**
- Pattern: `[feature].spec.ts`
- Examples: `landing.spec.ts`, `auth.spec.ts`, `test-flow.spec.ts`, `dashboard.spec.ts`

**Structure:**
```
e2e/
├── admin.spec.ts        # Admin panel features
├── auth.spec.ts         # Login and register flows
├── dashboard.spec.ts    # Authenticated dashboard
├── landing.spec.ts      # Landing page (public)
├── test-flow.spec.ts    # Exam taking flow (demo, study, exam modes)
└── helpers.ts           # Shared test utilities
```

## Test Structure

**Suite Organization:**
```typescript
import { test, expect } from "./helpers";

test.describe("Feature name", () => {
  test("specific behavior", async ({ page }, testInfo) => {
    // Test implementation
  });

  test("another behavior", async ({ page }, testInfo) => {
    // Test implementation
  });
});
```

**Patterns:**
- Use `test.describe()` to group related tests
- Use descriptive test names in past tense: "renders hero, features, steps, and footer"
- Access `page` fixture from test context
- Access `testInfo` fixture to detect project (desktop/mobile)

**Project-aware Testing:**
```typescript
test("loads test page", async ({ page }, testInfo) => {
  if (testInfo.project.name === "desktop") {
    // Desktop-specific assertions
    await expect(page.getByText("0/30")).toBeVisible();
  } else {
    // Mobile-specific assertions
    await expect(page.getByText("1/30")).toBeVisible();
  }
});
```

## Assertion Patterns

**Common Assertions:**
```typescript
// Visibility
await expect(page.getByText("Text")).toBeVisible();
await expect(page.locator("header")).toBeVisible();

// Text content
await expect(page.getByRole("heading", { level: 1 })).toContainText("Title");
await expect(page.getByText("Correcto").nth(0)).toBeVisible();

// Attributes
await expect(page.getByRole("link")).toHaveAttribute("href", "/register");
await expect(page.getByRole("button")).toHaveAttribute("aria-label", "Label");

// Input values
await expect(page.getByLabel("Email")).toHaveValue("test@example.com");

// URL navigation
await page.waitForURL(/resultado/);
await expect(page).toHaveURL("/register");

// OR conditions
await expect(page.getByText("Correcto").or(page.getByText("Incorrecto"))).toBeVisible();
```

## Selectors Strategy

**Preferred Order:**
1. Semantic roles: `page.getByRole("button", { name: "Text" })`
2. Labels: `page.getByLabel("Email")`
3. Text: `page.getByText("Text")`
4. Locators: `page.locator("header")`, `page.locator("main p span")`
5. Avoid: CSS selectors, XPath (too fragile)

**Example:**
```typescript
// Good: Uses semantic role
await page.getByRole("button", { name: "Iniciar sesion" }).click();

// Good: Uses label
await page.getByLabel("Correo electronico").fill("test@example.com");

// Acceptable: Uses visible text
await expect(page.getByText("Tests reales")).toBeVisible();

// Last resort: Locator with CSS
await expect(page.locator("main p span.text-primary").first()).toContainText("2.");
```

## Test Types and Coverage

**E2E Tests (only type used):**
- Scope: User workflows from browser entry to completion
- Approach: Click buttons, fill forms, navigate pages, check visible outcomes
- No backend setup or API mocking — tests against real running application

**Test Categories:**

1. **Landing Page** (`landing.spec.ts`)
   - Renders all UI sections
   - Navigation links work
   - CTAs point to correct routes

2. **Authentication** (`auth.spec.ts`)
   - Login form renders and accepts input
   - Register form with password confirmation
   - Navigation between login/register pages

3. **Test Taking** (`test-flow.spec.ts`)
   - Test loads with question 1
   - Answer selection and feedback in study mode
   - Navigation between questions
   - Test completion and results page
   - Differences between study and exam modes

4. **Dashboard** (`dashboard.spec.ts`)
   - Protected route authentication
   - User stats display
   - Recent tests list
   - Progress visualization

5. **Admin** (`admin.spec.ts`)
   - Admin-only routes
   - Question management
   - Test management

## Browser Coverage

**Projects:**
- Desktop: 1280x800 viewport
- Mobile: 390x844 viewport (iPhone SE size)

**Key Difference:**
- Desktop layout includes header with answered count "0/30"
- Mobile layout includes mobile progress bar with question position "1/30"

**Tests account for both:** Use `testInfo.project.name` to apply project-specific assertions

## Fixtures and Data

**Test Data:**
- No database setup required
- Uses existing seeded data in development/test environment
- Example: Test `/test/1` uses pre-loaded questions from `test-1`

**Navigation:**
- Tests use direct URL navigation: `await page.goto("/login")`
- Some tests navigate via clicking links to verify href attributes

## Async Patterns

**Waiting for Elements:**
```typescript
// Explicit wait for visibility (30 second timeout)
await expect(page.getByText("Correcto")).toBeVisible({ timeout: 5000 });

// Wait for URL change
await page.waitForURL(/resultado/);

// Click and wait implicitly — Playwright waits for element to be actionable
await page.getByRole("button", { name: "Click" }).click();
```

**Timeout Handling:**
- Default timeout: 30 seconds (from config)
- Override per assertion: `{ timeout: 5000 }`
- Example: Feedback display has 5 second timeout in test-flow because feedback needs time to render

## Flaky Test Prevention

**Patterns Used:**
1. **Avoid hardcoded delays** — use explicit waits instead
2. **Use nth() for duplicate elements** — `page.getByText("Text").nth(0)` for multiple instances
3. **Use OR conditions** — `page.getByText("A").or(page.getByText("B"))` when outcome varies
4. **Wait for URL changes** — `page.waitForURL(/pattern/)` before checking page content
5. **Test across viewports** — Both desktop and mobile projects catch layout-specific bugs

## Common Test Scenarios

**Form Testing:**
```typescript
test("inputs accept text", async ({ page }) => {
  await page.goto("/login");

  // Fill input
  await page.getByLabel("Correo electronico").fill("test@example.com");

  // Verify
  await expect(page.getByLabel("Correo electronico")).toHaveValue("test@example.com");
});
```

**Navigation Testing:**
```typescript
test("CTA links navigate correctly", async ({ page }) => {
  await page.goto("/");

  const link = page.getByRole("link", { name: "Registrate" });
  await expect(link).toHaveAttribute("href", "/register");

  await link.click();
  await expect(page).toHaveURL("/register");
});
```

**Modal/Dialog Testing:**
```typescript
test("renders all sections", async ({ page }) => {
  await page.goto("/");

  // Check each section renders
  await expect(page.locator("header")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});
```

**Dynamic Content Testing:**
```typescript
test("can answer and see feedback", async ({ page }, testInfo) => {
  await page.goto("/test/1?mode=estudio");

  // Select answer
  await page.getByRole("button", { name: /^B\s/ }).first().click();

  // Project-aware selector
  const nth = testInfo.project.name === "desktop" ? 0 : 1;

  // Wait for feedback (may take time to render)
  await expect(
    page.getByText("Correcto").nth(nth).or(page.getByText("Incorrecto").nth(nth))
  ).toBeVisible({ timeout: 5000 });
});
```

## Before/After Hooks

**Current Setup:**
- No global `beforeEach`/`afterEach` hooks
- Each test is independent
- Browser session reset between tests
- No database cleanup needed (read-only operations)

**If Needed:**
```typescript
test.beforeEach(async ({ page }) => {
  // Setup before each test
});

test.afterEach(async ({ page }) => {
  // Cleanup after each test
});
```

## Coverage Goals

**Current Status:**
- Only E2E testing (no unit/integration tests)
- Core user flows covered: landing → auth → test-taking → results
- Mobile and desktop viewports tested
- No coverage metrics enforced

**Critical Flows Tested:**
- Public landing page (no auth)
- Authentication (login/register)
- Test taking with study/exam modes
- Results display
- Demo test flow (no account needed)
- Admin panel access

## Running Tests

**Before Running:**
1. Start dev server: `npm run dev`
2. Ensure app runs on `http://localhost:3002` (configured in `playwright.config.ts`)

**Execute:**
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test e2e/landing.spec.ts

# Run tests matching pattern
npx playwright test --grep "Landing"

# Run in UI mode (interactive)
npx playwright test --ui

# Debug mode (step through)
npx playwright test --debug
```

**Debug Output:**
- Screenshots on failure: Saved in `test-results/` directory
- Retries: Disabled (retries: 0) — failing tests don't auto-retry

## Maintenance

**When Adding New Pages:**
1. Create new `.spec.ts` file in `e2e/`
2. Group tests with `test.describe()`
3. Test user journey through the page
4. Include project-specific assertions if layout differs

**When Changing UI:**
1. Update selectors in affected tests
2. Prefer role-based selectors to survive CSS changes
3. Add new assertions for new functionality
4. Test both desktop and mobile layouts

---

*Testing analysis: 2026-02-21*
