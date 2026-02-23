---
phase: 01-skill-file-audit
plan: 02
subsystem: content
tags: [datos-referencia, validator, check-4, velocidades, puntos, alcohol, V-16, emergencia]

# Dependency graph
requires:
  - phase: 01-01
    provides: "datos-numericos.md fully corrected with inline temario citations"
provides:
  - "datos-referencia.md synced to datos-numericos.md — zero contradictions"
  - "Puntos del permiso section added with 8/12/15 + alcohol penalty points (4/6)"
  - "Autobus con pasajeros DE PIE row added to validator speed table"
  - "150 m triangle distance removed as reference value; V-16 section added"
  - "SRI 135 cm section added; Pesos section added; Zonas especiales added"
affects: [validator, check-4-datos, 01-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "datos-referencia.md is a validator-focused subset of datos-numericos.md — shared values must be identical, citations omitted for compactness"

key-files:
  created: []
  modified:
    - ".claude/commands/validar-preguntas/datos-referencia.md"

key-decisions:
  - "150 m triangle distance retained only as a 'No usar' warning note — not as a reference value — to prevent validators from using the incorrect figure"
  - "Alcohol penalty points added to Puntos section (4 pts for 0.25-0.50 mg/l, 6 pts for >0.50 mg/l) to give CHECK 4 a lookup source for points questions"
  - "SRI, Pesos, and Zonas especiales sections added as compact entries — validator encounters these categories and had no reference"
  - "Citations omitted from datos-referencia.md — it is a lookup table, not a documented source; citations live in datos-numericos.md"

patterns-established:
  - "Sync pattern: read both files in full, compare category by category, update datos-referencia.md to match datos-numericos.md for all shared values"

requirements-completed: [DATA-03]

# Metrics
duration: 2min
completed: 2026-02-23
---

# Phase 1 Plan 02: Validator Reference Sync Summary

**datos-referencia.md synced to corrected datos-numericos.md — 150 m triangle removed, Autobus con pasajeros DE PIE added, and puntos section expanded with alcohol penalty points for CHECK 4 validator lookups**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-23T18:02:21Z
- **Completed:** 2026-02-23T18:03:40Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Removed the unsourced "150 m en autopista" triangle distance from datos-referencia.md (was the root cause of validator accepting wrong answers); replaced with a clear warning note "No usar 150 m"
- Added the "Autobus con pasajeros DE PIE" row to the heavy vehicle speed table (Autopista 100, Carretera 80) — was missing after Plan 01-01 added it to datos-numericos.md
- Expanded the "Puntos del permiso" section to include alcohol penalty points (4 pts for 0.25-0.50 mg/l aire, 6 pts for >0.50 mg/l aire) — validator had no lookup source for these values
- Added V-16 baliza luminosa to emergency signaling section, consistent with the mandatory-since-January-2026 correction from Plan 01-01
- Added SRI 135 cm threshold section, Pesos section (3,500 kg / 750 kg), and Zonas especiales (zona 30 / zona 20) — all were missing from datos-referencia.md despite being testable categories
- Verified all shared values are identical between datos-referencia.md and datos-numericos.md (remolque ligero 90, autobus 100, alcohol novel 0,15, etc.)

## Task Commits

Each task was committed atomically:

1. **Task 1: Sync datos-referencia.md to match corrected datos-numericos.md** - `17ab7f8` (fix)

**Plan metadata:** (pending — this commit)

## Files Created/Modified

- `.claude/commands/validar-preguntas/datos-referencia.md` — Synced to datos-numericos.md: 150 m removed, DE PIE row added, puntos section expanded with alcohol penalty points, SRI/Pesos/Zonas especiales sections added, V-16 added to emergency section

## Decisions Made

- Kept "150 m" only as a "No usar 150 m" warning note — active enough to prevent validator from accepting that figure, but not asserting it as a valid value
- Citations intentionally omitted from datos-referencia.md — the validator needs a compact lookup table, not a documented source; full citations live in datos-numericos.md
- Alcohol penalty points added alongside the 8/12/15 values in Puntos section — CHECK 4 encounters points questions and previously had no reference for the penalty values

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added SRI, Pesos, and Zonas especiales sections**
- **Found during:** Task 1 (sync process)
- **Issue:** datos-referencia.md was missing three sections that datos-numericos.md contains and the validator might encounter (SRI 135 cm threshold, vehicle weight limits 3,500/750 kg, special zone speeds 30/20 km/h)
- **Fix:** Added compact versions of all three sections to datos-referencia.md
- **Files modified:** .claude/commands/validar-preguntas/datos-referencia.md
- **Verification:** Sections present in final file; all values match datos-numericos.md
- **Committed in:** 17ab7f8 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (missing critical sections)
**Impact on plan:** The added sections are in scope per the plan's discretion clause — "Include a section if the Haiku validator is likely to encounter questions from that domain." No scope creep.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- datos-referencia.md is now a clean, consistent subset of datos-numericos.md with no contradictions
- CHECK 4 validator has a complete lookup reference covering speeds, alcohol, distances, ITV, SRI, pesos, and points (including alcohol penalty points)
- Plan 03 (validator command audit) can proceed with confidence that the reference data is accurate

## Self-Check: PASSED

- FOUND: `.claude/commands/validar-preguntas/datos-referencia.md`
- FOUND: `.planning/phases/01-skill-file-audit/01-02-SUMMARY.md`
- FOUND: commit `17ab7f8` — fix(01-02): sync datos-referencia.md to corrected datos-numericos.md
- puntos check: PASS (section present with 8/12/15 and alcohol penalty values)
- 150 m check: only in warning note "No usar 150 m" — not as a reference value (PASS)
- Autobus con pasajeros DE PIE: PASS (row present in speed table)
- V-16: PASS (present in emergency signaling section)

---
*Phase: 01-skill-file-audit*
*Completed: 2026-02-23*
