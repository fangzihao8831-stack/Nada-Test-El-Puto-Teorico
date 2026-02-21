# Codebase Concerns

**Analysis Date:** 2026-02-21

## Tech Debt

**Type Safety Gaps in Supabase Data Loading:**
- Issue: Multiple data loading functions use `eslint-disable @typescript-eslint/no-explicit-any` to bypass type safety
- Files: `src/lib/data/tests.ts` (line 80), `src/lib/data/user.ts` (lines 76, 150+), `src/lib/data/admin.ts`, `src/lib/data/content.ts`
- Impact: Untyped data transformations make refactoring risky; errors could surface at runtime only
- Fix approach: Create proper TypeScript interfaces for each Supabase response shape. Generate types from Supabase schema using type generators rather than casting to `any`

**Question Bank Size Limit:**
- Issue: `src/lib/question-bank.ts` is 4,064 lines (auto-generated, not edited manually)
- Files: `src/lib/question-bank.ts`
- Impact: Single monolithic file difficult to navigate; future import performance concerns as question count grows from current ~1,000 to desired 2,000+
- Fix approach: Split into multiple files by `temaId` (e.g., `src/lib/question-bank/tema_01.ts`, `tema_02.ts`), export from barrel file

**Mock Data vs Real Data Transition:**
- Issue: Application still uses `src/lib/mock-test-data.ts` (495 lines) with hardcoded Todotest image URLs (`https://www.todotest.com/tests/imgs/*.jpg`)
- Files: `src/lib/mock-test-data.ts`, `src/components/test/TestSession.tsx`, `src/lib/data/tests.ts`
- Impact: Demo relies on third-party domain (Todotest); images could break if external host changes
- Fix approach: Migrate all question content to Supabase. Use Cloudinary exclusively for image hosting per technical.md. Remove mock data file once database fully populated

**Admin Authorization Check Placement:**
- Issue: Every admin action in `src/lib/actions/admin.ts` calls `requireAdmin()` individually (lines 7-17)
- Files: `src/lib/actions/admin.ts`
- Impact: Authorization logic duplicated across 10+ functions; hard to audit; easy to forget
- Fix approach: Create a middleware/wrapper that enforces admin check at the Server Action entry point or database level with RLS policies

---

## Known Bugs

**Image Display in TestSession:**
- Symptoms: `unoptimized` flag set on all Next.js Image components (line 241 of `src/components/test/TestSession.tsx`)
- Files: `src/components/test/TestSession.tsx` (line 235-242)
- Trigger: When questions have `imageSrc` URLs (both mock and production)
- Impact: Next.js image optimization bypassed; larger payloads, slower mobile performance
- Workaround: Cloudinary integration documented in requirements but not fully utilized; images bypass optimization pipeline
- Fix: Remove `unoptimized` and ensure all image sources are optimized through Next.js Image component or Cloudinary transforms

**Potential SQL Injection in Test Query:**
- Symptoms: String concatenation in `src/lib/data/tests.ts` line 107
- Files: `src/lib/data/tests.ts` (line 107)
- Code: ``query.not("id", "in", `(${takenIds.join(",")})`)``
- Trigger: When user has taken many tests, `takenIds` array is joined as string
- Impact: Supabase client library escapes values, but pattern is fragile and non-standard
- Fix approach: Supabase doesn't support direct array filters for `in` operator with join; use `.in("id", takenIds)` method instead (if Supabase API supports array filtering)

**Missing Error Boundaries:**
- Symptoms: No error boundary component in `src/app/` routes (see `src/app/error.tsx` only has default export stub)
- Files: `src/app/error.tsx`
- Impact: Client-side errors in exam flow (TestSession) could crash entire session without graceful recovery
- Fix approach: Wrap `TestSession.tsx` and `ResultsView.tsx` with proper error boundary; add fallback UI

---

## Security Considerations

**External Image Domain Reliance:**
- Risk: Mock test data uses hardcoded Todotest images; production will use Cloudinary. If either domain is compromised or HTTPS not enforced, XSS vectors possible
- Files: `src/lib/mock-test-data.ts` (multiple `imageSrc` lines), Next Image component in `src/components/test/TestSession.tsx`
- Current mitigation: Next.js Image component provides some protection; strict CSP not visible in config
- Recommendations:
  - Add Content Security Policy header to `next.config.ts` restricting image-src to Cloudinary and self only
  - Remove Todotest domain from mock data before production
  - Document Cloudinary domain in CSP whitelist

**DGT Nota Consultation Web Scraping:**
- Risk: `src/lib/dgt/consulta-nota.ts` scrapes DGT website using ViewState extraction and session cookies (lines 74-86)
- Files: `src/lib/dgt/consulta-nota.ts`, `src/app/api/dgt/consulta-nota/route.ts`
- Impact: DGT terms of service may prohibit scraping; if DGT changes form structure, endpoint breaks silently
- Current mitigation: Error handling returns user-friendly messages; user data not logged
- Recommendations:
  - Contact DGT to request official API or authorized scraping permission
  - Add monitoring/alerting for ViewState extraction failures
  - Consider backup method (user uploads DGT document instead)
  - Document GDPR compliance: NIF/birth date passed to external service (DGT website) — add privacy policy notice

**Missing Rate Limiting (Auth Endpoints):**
- Risk: Login/register endpoints in `src/lib/auth/actions.ts` have no rate limiting
- Files: `src/lib/auth/actions.ts` (lines 7, 22, 52)
- Impact: Brute force attacks possible; DDoS via registration spam
- Fix approach: Implement rate limiting using:
  - Middleware for per-IP limits (e.g., 5 login attempts per minute)
  - Supabase Auth rate limiting if available (check docs)
  - CAPTCHA on register form after N failures

**Admin Role Stored in App Metadata:**
- Risk: Admin role in `app_metadata?.role` (line 14 of `src/lib/actions/admin.ts`) could be client-modifiable if auth tokens not properly validated
- Files: `src/lib/actions/admin.ts` (line 14), Supabase Auth setup
- Current mitigation: Server Actions run server-side; Supabase validates session
- Recommendations:
  - Verify Supabase RLS policies enforce admin role checks at DB level, not just app code
  - Add audit log for admin actions (create/update/delete operations)
  - Use Supabase JWT claims instead of app_metadata if available

**No CSRF Protection Visible:**
- Risk: Server Actions don't show explicit CSRF validation (relies on Next.js built-in, but worth confirming)
- Files: All Server Actions in `src/lib/actions/` and `src/lib/auth/`
- Fix approach: Document CSRF protection strategy in CONVENTIONS.md; consider adding explicit token validation if Next.js built-in not sufficient

---

## Performance Bottlenecks

**Nested Supabase Joins in User Progress:**
- Problem: `getUserProgress()` in `src/lib/data/user.ts` (lines 45-95) performs nested joins through 4 table levels (respuestas → preguntas → subtemas → temas) without explicit select limits
- Files: `src/lib/data/user.ts` (lines 51-65)
- Cause: For user with 100+ completed tests, this query could return 3,000+ rows that are then aggregated in memory
- Improvement path:
  - Add database view in Supabase to pre-aggregate by tema
  - Add `.limit()` to subqueries
  - Cache result for 1 hour per user

**Large Component File (TestSession):**
- Problem: `src/components/test/TestSession.tsx` is 599 lines with multiple sub-components and complex state logic
- Files: `src/components/test/TestSession.tsx`
- Cause: All test session functionality (timer, question navigation, answer state, results) in one file
- Improvement path:
  - Extract `AnswerOption`, `QuestionImage`, `TipoPreguntaBadge`, `HintBox` to separate files in `src/components/test/`
  - Create custom hook for test session state logic (`useTestSessionState()`)
  - Reduces cognitive load and improves reusability

**Multiple Cloudinary Integration Points:**
- Problem: Cloudinary image URLs passed through component props without client-side caching or CDN optimization parameters
- Files: `src/components/test/TestSession.tsx` (line 236), `src/lib/data/tests.ts` (line 33)
- Improvement path:
  - Add Cloudinary transformation parameters (auto-format, width, quality) to image URLs at data layer
  - Implement Next.js Image loader for Cloudinary (built-in support available)
  - Add image caching headers

---

## Fragile Areas

**DGT Web Form Parsing:**
- Files: `src/lib/dgt/consulta-nota.ts` (lines 74-86, 103-113)
- Why fragile: ViewState extraction uses regex `javax\.faces\.ViewState` (line 75-76); DGT could change form structure or field names
- Safe modification:
  - Add test case with actual DGT HTML structure
  - Add fallback detection for alternate ViewState formats
  - Log extraction failures for monitoring
- Test coverage: No unit tests visible for `consulta-nota.ts`

**Test Question Ordering:**
- Files: `src/lib/data/tests.ts` (lines 73-82)
- Why fragile: Assumes `preguntaIds` array order must be preserved; if Supabase query returns results in different order, answers map to wrong questions
- Safe modification:
  - Verify Supabase doesn't reorder results (add `.order("id", { ascending: true })` to enforce consistent order)
  - Add test with >30 questions to verify ordering logic
  - Consider storing question order as explicit index in tests table

**Admin Authorization Without Audit:**
- Files: `src/lib/actions/admin.ts` (entire file)
- Why fragile: No logging of admin actions; if authorization check is bypassed, changes go undetected
- Safe modification:
  - Add audit table in Supabase schema
  - Log all create/update/delete operations with user ID, timestamp, data changed
  - Add admin page to view audit trail

**SessionStorage Dependency in ResultsView:**
- Files: `src/components/test/ResultsView.tsx` (lines 39-50)
- Why fragile: Relies on `sessionStorage` being available (could be disabled by browser settings or fail on certain devices)
- Safe modification:
  - Add fallback to server-side session if sessionStorage unavailable
  - Test on Safari private mode (disables sessionStorage)
  - Display warning if result cannot be found

---

## Scaling Limits

**Question Bank File Growth:**
- Current capacity: ~4,064 lines, ~1,000 questions
- Limit: File will exceed 10,000 lines when question count reaches 2,500+
- Expected timeline: 3-6 months at current generation rate
- Scaling path:
  - Split into multiple files per tema
  - Move to database-backed question selection (remove static bank file)
  - Implement lazy-loading of questions in UI

**Supabase Query Cost:**
- Current capacity: ~100 concurrent users on free tier
- Limit: Each test session triggers 3+ queries (get test, get questions, save answers, load progress)
- Expected timeline: Hit limits when user base reaches 1,000+ active users
- Scaling path:
  - Upgrade to Supabase Pro ($25/month)
  - Implement query caching layer (Redis via Vercel KV)
  - Batch answer submissions (save every 5 answers instead of 1-by-1)

**DGT Nota API Rate Limiting:**
- Current capacity: No documented limit from DGT
- Limit: If DGT implements rate limiting per IP, queries will fail after ~5-10 checks per day
- Current safeguard: Rate limit to 5 per day per user (line 7 of `src/app/api/dgt/consulta-nota/route.ts`)
- Scaling path:
  - Request official rate limit documentation from DGT
  - Implement distributed rate limiting (Redis) if multiple servers
  - Add queue system for bulk checks

---

## Dependencies at Risk

**Supabase Auth + SSR Package:**
- Risk: `@supabase/ssr` v0.8.0 used; major version 1.0+ may have breaking changes
- Impact: Auth flow (login, register, OAuth) could break on upgrade
- Migration plan:
  - Monitor Supabase releases for v1.0 announcement
  - Test upgrade in staging environment first
  - Check migration guide for Server Actions compatibility

**OpenAI API (Image Generation):**
- Risk: Usage requires `OPENAI_API_KEY` env var; no fallback if API is down
- Impact: DGT question-image generation will fail; existing images safe but no new ones can be created
- Current mitigation: Images can be generated from DALL-E 3 offline
- Migration plan:
  - Implement fallback to stock images library (Unsplash, Pexels)
  - Add feature flag to disable image generation if API cost becomes prohibitive
  - Document cost: ~$0.04 per image via DALL-E 3

**Cloudinary Image Hosting:**
- Risk: Cloudinary account required for production image serving
- Impact: If account is deleted or API key revoked, all question images break
- Current mitigation: Documented in `technical.md`; images can be re-hosted on another CDN
- Migration plan:
  - Backup all Cloudinary images locally
  - Document CDN switch process
  - Monitor Cloudinary billing to prevent service suspension

---

## Missing Critical Features

**No Offline Mode:**
- Problem: Users cannot practice tests without internet connection (important for mobile)
- Blocks: Mobile app feature (planned); local study on commute
- Current workaround: None; users must have active internet
- Impact: ~10% of user base likely wants offline practice

**No Test History Export:**
- Problem: Users cannot download/export their test results as PDF or CSV
- Blocks: Users who want to track progress externally or share results with teachers
- Current status: Results stored in Supabase but no export API

**No Email Notifications:**
- Problem: No email reminders for exam date, daily goals, or failed questions
- Blocks: User engagement; increased dropout rate
- Current infrastructure: No email service configured (no SendGrid, Resend, etc.)
- Impact: 30-40% lower engagement vs competitors (Todotest, Autoescuela.net)

**No Dark Mode:**
- Problem: Application hardcoded to light theme (no dark mode toggle)
- Blocks: Users with accessibility needs or nighttime study preference
- Current status: `CLAUDE.md` explicitly states "Light theme is the default and only theme"
- Framework support: `next-themes` installed but not configured

---

## Test Coverage Gaps

**No Unit Tests for Data Transformations:**
- What's not tested: `transformPreguntaToTestQuestion()` in `src/lib/data/tests.ts` (lines 7-36)
- Files: `src/lib/data/tests.ts`
- Risk: Field mapping errors (e.g., swapped option keys) would only surface in manual testing
- Priority: High (core data pipeline)

**No Tests for DGT Scraper:**
- What's not tested: Form extraction, ViewState parsing, result parsing in `src/lib/dgt/consulta-nota.ts`
- Files: `src/lib/dgt/consulta-nota.ts`
- Risk: Silent failures if DGT HTML structure changes; would not be caught until user reports
- Priority: High (external integration)

**E2E Tests Not Comprehensive:**
- What's not tested: Failed questions flow, admin operations, rate limiting
- Files: `e2e/` directory (only 6 test files for large codebase)
- Test files: `admin.spec.ts` (2.7 KB), `auth.spec.ts` (2.6 KB), `dashboard.spec.ts` (3.6 KB), `test-flow.spec.ts` (4.8 KB)
- Risk: Critical user flows could regress without detection
- Priority: Medium (good happy path coverage, gaps in edge cases)

**No Integration Tests for Server Actions:**
- What's not tested: Question save/load logic, progress calculation, admin data mutations
- Files: `src/lib/actions/`, `src/lib/auth/`
- Risk: Backend logic changes could break database consistency
- Priority: Medium (most critical paths have E2E coverage via `test-flow.spec.ts`)

**No Performance Tests:**
- What's not tested: Query performance with large datasets, page load time, image optimization
- Risk: Scaling issues (large question banks, many users) won't be caught until production
- Priority: Low (address after hitting 10K+ questions)

---

## Incomplete Implementation

**DGT Nota Historial Not Persisted:**
- Issue: `src/components/dgt/historial-notas.tsx` displays consulta history but no storage mechanism visible
- Files: `src/components/dgt/historial-notas.tsx`, `src/app/api/dgt/consulta-nota/route.ts`
- Impact: User sees empty history after page refresh; feature appears incomplete
- Fix: Add `consultas_dgt` table in Supabase to persist query results with user_id, timestamp, result

**Admin Panel Limited Functionality:**
- Issue: Admin pages exist (`src/app/admin/`) but many operations incomplete
- Files: `src/app/admin/` (5 pages: page.tsx, preguntas/, tests/, materiales/, usuarios/)
- Impact: Admins cannot easily manage content; question import/export not visible
- Fix: Review and complete all admin CRUD operations with proper UI/UX

**Image Generation Pipeline In Pipeline Documentation Only:**
- Issue: `content-pipeline.md` describes Skill 4 (image generation) as "pending" with no implementation
- Files: `src/components/test/TestSession.tsx` expects `imageSrc` but no auto-generation
- Impact: Questions with `requiere_imagen=true` but `imagen_url=null` will fail to display
- Fix: Implement image generation or auto-fill with placeholder Cloudinary URL

---

*Concerns audit: 2026-02-21*
