---
phase: 01-skill-file-audit
plan: 01
subsystem: content
tags: [datos-numericos, temario, citaciones, velocidades, alcohol, ITV, puntos, emergencia, V-16]

# Dependency graph
requires: []
provides:
  - "datos-numericos.md fully audited with inline temario citations on every numerical value"
  - "Corrected speed table for autobuses: added missing Autobus con pasajeros DE PIE row"
  - "Removed unsourced 150 m triangle rule; replaced with 50m/100m from tema_11.md plus V-16 context"
  - "All 41+ values traced to a specific tema_XX.md source"
affects: [01-02, 01-03, generator, validator]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Inline parenthetical citation format: (tema_XX.md) after each value or at end of table row"
    - "For multi-topic values: (tema_XX.md, tema_YY.md)"

key-files:
  created: []
  modified:
    - ".claude/commands/generar-preguntas/datos-numericos.md"

key-decisions:
  - "Citation format locked: inline parenthetical (tema_XX.md) on same line as value"
  - "Autobús con pasajeros DE PIE added as distinct row — same as normal bus in autopista (100), but 80 in carretera (not 90)"
  - "V-16 emergency section added: mandatory since January 2026 in interurban roads, replaces triangles"
  - "150 m triangle row removed entirely as unsourced — temario specifies 50 m minimum visible at 100 m"
  - "Remolque speed detail section added with explicit tema_03.md citations, separate from the vehículos ligeros table"

patterns-established:
  - "Audit pattern: read current file, read temario source, compare per-row, add citation, note discrepancies"
  - "No value survives in datos-numericos.md without a (tema_XX.md) citation"

requirements-completed: [DATA-01, DATA-02]

# Metrics
duration: 18min
completed: 2026-02-23
---

# Phase 1 Plan 01: Numerical Data Audit Summary

**datos-numericos.md fully corrected with 41 inline temario citations — Autobus con pasajeros DE PIE row added, unsourced 150 m triangle rule removed and replaced with V-16 context from tema_11.md**

## Performance

- **Duration:** 18 min
- **Started:** 2026-02-23T00:00:00Z
- **Completed:** 2026-02-23
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Audited every numerical value in datos-numericos.md against the relevant temario source files (tema_01, 02, 03, 05, 06, 08, 09, 11)
- Added inline (tema_XX.md) citations to all 41+ value references — zero unsourced values remain
- Added the missing "Autobus con pasajeros DE PIE" row to the speed table (Autopista 100, Carretera 80, Urbana 50) with (tema_05.md) citation
- Removed the unsourced "150 m en autopista" triangle rule; replaced the entire emergency signaling section with the correct 50 m/100 m rule plus V-16 mandatory context from tema_11.md
- Verified ITV periods for turismo, motocicleta, and ciclomotor all match tema_02.md exactly
- Verified alcohol limits (General 0,25/0,5 and Novel/Profesional 0,15/0,3) match tema_08.md
- Verified points system (8/12/15) matches tema_01.md
- Verified parking distances (5 m intersection, 15 m bus stop, 1.5 m cyclists) match tema_06.md
- Added standalone remolque speed section with tema_03.md citations for double clarity

## Task Commits

Each task was committed atomically:

1. **Task 1: Audit and correct datos-numericos.md against all 12 temario files** - `9c9cedd` (fix)

**Plan metadata:** (pending — this commit)

## Files Created/Modified

- `.claude/commands/generar-preguntas/datos-numericos.md` — Fully audited and corrected; all values cited; Autobus con pasajeros DE PIE row added; 150 m row removed; V-16 section added; remolque section expanded

## Decisions Made

- Citation format: inline parenthetical (tema_XX.md) immediately after values, or as a standalone citation line at the end of a table block when all rows share the same source — easier to read in table format
- "Autobus con pasajeros DE PIE" values: 100 autopista (same as normal), 80 carretera (10 less than normal) — confirmed directly from tema_05.md table row
- The 150 m figure was nowhere in tema_11.md (or any other tema file) — treated as unsourced per plan instructions and removed entirely
- V-16 added to emergency section as a mandatory device (not optional), per tema_11.md section 45.3

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- datos-numericos.md is now the verified, cited source of truth for all numerical values used by the generator
- Plan 02 (datos-referencia.md sync) can proceed — it must derive from this corrected file
- All citations are to specific tema_XX.md files that can be independently verified

## Self-Check: PASSED

- FOUND: `.claude/commands/generar-preguntas/datos-numericos.md`
- FOUND: `.planning/phases/01-skill-file-audit/01-01-SUMMARY.md`
- FOUND: commit `9c9cedd` — fix(01-01): audit and correct datos-numericos.md with temario citations
- Citation count: 41 (grep -c "(tema_" returns 41)
- 150 m check: 0 results (PASS)
- Pasajeros de pie check: 2 matching rows (PASS)

---
*Phase: 01-skill-file-audit*
*Completed: 2026-02-23*
