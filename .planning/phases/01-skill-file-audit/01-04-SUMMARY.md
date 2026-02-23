---
phase: 01-skill-file-audit
plan: 04
subsystem: content
tags: [skill-files, verification, explicaciones, dgt, quality-gates]

# Dependency graph
requires:
  - phase: 01-01
    provides: datos-numericos.md with inline tema_XX.md citations — new rules reference this citation format

provides:
  - verificacion.md with three new verification rules: factual citation, Claude self-contradiction check, monotonic-sequence distractor rule
  - verificacion.md final checklist updated to include all three new rules (no checklist drift)
  - explicaciones.md with level-specific explanation depth guidance for Nivel 1-4
  - explicaciones.md with mandatory distractor explanation rule for Nivel 2+

affects:
  - question-generation (generator reads verificacion.md at final self-check step)
  - explanation-writing (generator reads explicaciones.md before every explanation field)
  - 01-05-PLAN (per-type skill files will reference these updated rules)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Verification rules always have a corresponding checklist item (body + checklist in sync)"
    - "Explanation depth scales with difficulty level: Nivel 1 = 1-2 bullets, Nivel 3+ = all distractors explained"
    - "Nivel 2+ explanations must state what real condition each wrong option describes"

key-files:
  created: []
  modified:
    - .claude/commands/generar-preguntas/verificacion.md
    - .claude/commands/generar-preguntas/explicaciones.md

key-decisions:
  - "Three new rules placed in a dedicated section (Verificacion de exactitud factual) rather than appended to HARD REJECT table — HARD REJECT is for question-type rejects; the new rules are content-accuracy checks applicable during writing"
  - "Checklist items added to bottom of Checklist final por pregunta — maintains Pitfall 6 requirement that body rules and checklist stay in sync"
  - "Level-specific depth guidance uses unaccented text in section headers/labels to avoid encoding issues in grep patterns while keeping accented text in running prose"

patterns-established:
  - "Body rule + checklist item pairing: every new rule in verificacion.md body must have a corresponding checklist item"
  - "Distractor explanation scaling: Nivel 1 no detail required, Nivel 2+ one distractor explained, Nivel 3+ all distractors explained with real conditions"

requirements-completed: [SKILL-03, SKILL-04]

# Metrics
duration: 3min
completed: 2026-02-23
---

# Phase 1 Plan 04: Verification Rules and Explanation Depth Summary

**Three factual-accuracy gates added to verificacion.md (citation, self-contradiction, monotonic-sequence) and level-specific distractor explanation rules added to explicaciones.md**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-23T18:02:31Z
- **Completed:** 2026-02-23T18:04:53Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Added factual citation rule to verificacion.md: no numerical value is kept without a tema_XX.md source identified
- Added Claude self-contradiction check: if correct answer contradicts Claude's general traffic knowledge, question is flagged for human review
- Added monotonic-sequence distractor rule: options forming a simple sequence (70/80/90) from the same table row must be redistributed
- Updated verificacion.md final checklist with all three new rules — body and checklist now in sync
- Added section to explicaciones.md defining explanation depth by difficulty level (Nivel 1 through Nivel 4)
- Added mandatory rule for Nivel 2+: must state what real condition each wrong distractor describes

## Task Commits

Each task was committed atomically:

1. **Task 1: Add three new verification rules and update final checklist in verificacion.md** - `f0df13c` (feat)
2. **Task 2: Review and update explicaciones.md for pedagogical quality gaps** - `22b4d0f` (feat)

## Files Created/Modified
- `.claude/commands/generar-preguntas/verificacion.md` - Added Verificacion de exactitud factual section (3 rules + table) and 3 new checklist items
- `.claude/commands/generar-preguntas/explicaciones.md` - Added Profundidad segun nivel de dificultad section (Nivel 1-4 with distractor rules and examples)

## Decisions Made
- Three new rules placed in a dedicated "Verificacion de exactitud factual" section rather than appended to the HARD REJECT table. HARD REJECT handles question-type structural rejects (dates in stem, trivia, etc.); the new rules are content-accuracy checks that apply during writing, not at the final reject stage.
- Checklist items use the same phrasing as the body rules to prevent interpretation drift.
- explicaciones.md new section uses unaccented Spanish in section headers to avoid encoding issues in grep verification patterns (the plan's own verification grep for "monoton" shows this is a real concern with accented characters in some terminals).

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- verificacion.md now enforces factual accuracy at generation time: numerical values require a temario citation, self-contradictions are flagged, and monotonic sequences are prohibited
- explicaciones.md guides the generator to produce level-appropriate explanations that address distractor reasoning
- Ready for 01-05: creation of per-type skill files (dato.md, directo.md, completar.md, situacional.md)

---
*Phase: 01-skill-file-audit*
*Completed: 2026-02-23*
