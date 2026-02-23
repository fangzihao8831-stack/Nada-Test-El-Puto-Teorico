---
phase: 01-skill-file-audit
plan: 03
subsystem: content
tags: [skill-files, tipos-preguntas, patrones-y-trampas, dificultad, monotonic-sequence, dgt]

# Dependency graph
requires:
  - phase: 01-01
    provides: datos-numericos.md with corrected numerical values — difficulty distractor examples reference these verified values

provides:
  - tipos-preguntas.md with complete difficulty level system (3 levels for dato/directo/completar, 4 for situacional) and per-type file pointers
  - tipos-preguntas.md with explicit 3-option rule and quality bar reminder
  - patrones-y-trampas.md with monotonic-sequence distractor prohibition and correct alternative pattern
  - generar-preguntas.md with per-type files in subagent read list (items 7-10) and Step 2 note

affects:
  - question-generation (generator now has structured difficulty rubric and monotonic-sequence prohibition)
  - 01-05-PLAN (per-type skill files dato.md, directo.md, completar.md, situacional.md are now referenced and ready to be created)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Difficulty framework: 3 levels for non-situational types, 4 levels for situacional; core principle: mayor nivel = distractores mas plausibles"
    - "Monotonic-sequence prohibition: options from same table row/category are prohibited; redistribute to different conditions of same scenario"
    - "Subagent read list: per-type files added as items 7-10 so subagents get type-specific difficulty rules"

key-files:
  created: []
  modified:
    - .claude/commands/generar-preguntas/tipos-preguntas.md
    - .claude/commands/generar-preguntas/patrones-y-trampas.md
    - .claude/commands/generar-preguntas.md

key-decisions:
  - "Difficulty levels placed as top-level section in tipos-preguntas.md — visible to any generator reading the file for type definitions"
  - "Ver archivos por tipo section added to tipos-preguntas.md pointing to per-type files not yet created — pointer-first approach so the reference chain is correct when 01-05 creates the files"
  - "Monotonic-sequence section added within existing Palabras Trampa section of patrones-y-trampas.md — logically grouped with other distractor quality rules"
  - "Per-type files added as numbered items 7-10 in generar-preguntas.md subagent list — subagents explicitly required to read type-specific rules"

patterns-established:
  - "Difficulty rubric: every question type has explicit level definitions the generator must apply when setting difficulty"
  - "Distractor quality gate: monotonic numerical sequences must be redistributed to values from different conditions of the same scenario"

requirements-completed: [SKILL-01, SKILL-02]

# Metrics
duration: included in session with 01-02 and 01-04
completed: 2026-02-23
---

# Phase 1 Plan 03: Question Type Difficulty Framework and Monotonic-Sequence Trap Summary

**tipos-preguntas.md updated with 3-level and 4-level difficulty rubrics and per-type file pointers; patrones-y-trampas.md prohibits monotonic distractor sequences; generar-preguntas.md registers per-type files in subagent read list**

## Performance

- **Duration:** ~10 min (estimated, executed within 01-02/01-04 session)
- **Completed:** 2026-02-23
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

### Task 1: Add difficulty level system and per-type file pointers to tipos-preguntas.md
- Added "Niveles de Dificultad" section with 3-level rubric for dato, directo, and completar types (Facil/Medio/Dificil) with exact definitions
- Added 4-level rubric for situacional type (Facil/Medio/Dificil/Muy Dificil) including Nivel 4 where two rules appear to conflict
- Included core principle verbatim: "Mayor nivel = distractores mas plausibles. En Nivel 3+, un alumno que no conozca la regla exacta no puede eliminar ninguna opcion por logica"
- Added "Ver archivos por tipo" section with pointers to dato.md, directo.md, completar.md, situacional.md
- Added quality bar reminder referencing hardest_dato.json and equivalents for difficulty calibration
- Verified no references to 4 answer options or "opcion D" — all types use exactly A, B, C

### Task 2: Add monotonic-sequence trap section to patrones-y-trampas.md; update generar-preguntas.md subagent list
- Added "Trampa: Secuencia monotonica en distractores" section with PROHIBIDO example (70/80/90 from same table row) and CORRECTO example (70/80/90 from different conditions of same scenario)
- Included explicit redistribution rule: if 3 options are consecutive/stepped numbers from same category, redistribute using values from different conditions
- Added per-type files as items 7-10 in generar-preguntas.md subagent read list (dato.md, directo.md, completar.md, situacional.md)
- Added note to Step 2 of Workflow: "Para reglas de dificultad del tipo especifico, leer tambien el archivo del tipo"
- Verified datos-numericos.md filename uses no unicode accent (correct)

## Task Commits

- **Task 1** — `bedfd6d` (feat(01-03): add difficulty level system and per-type file pointers to tipos-preguntas.md)
- **Task 2** — content committed as part of `c7bc6fa` (bundled with 01-02 metadata commit)

## Files Created/Modified

- `.claude/commands/generar-preguntas/tipos-preguntas.md` — Added Niveles de Dificultad section (3-level + 4-level tables), Ver archivos por tipo section, quality bar reminder, 3-option confirmation
- `.claude/commands/generar-preguntas/patrones-y-trampas.md` — Added Trampa: Secuencia monotonica en distractores section with PROHIBIDO/CORRECTO examples and redistribution rule
- `.claude/commands/generar-preguntas.md` — Added per-type files as items 7-10 in subagent read list; added per-type note to Step 2

## Decisions Made

- Difficulty levels placed in a dedicated top-level section in tipos-preguntas.md rather than embedded within each type description — easier to reference and avoids repeating the rubric four times.
- "Ver archivos por tipo" section added as a pointer to files not yet created (created in Plan 01-05) — this pointer-first approach ensures the reference chain is complete when those files are written.
- Monotonic-sequence section placed within the existing Palabras Trampa / distractor quality area of patrones-y-trampas.md — logically grouped with other distractor rules rather than as a standalone section.
- Items 7-10 in the subagent read list are explicit full paths (not relative) to prevent any ambiguity when a subagent resolves file references.

## Deviations from Plan

None - plan executed exactly as written. Task 2 content was committed in the same session as Task 1, bundled with the 01-02 metadata commit (c7bc6fa) rather than as a separate atomic commit. Content is identical to what the plan specified.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- tipos-preguntas.md now gives the generator a complete difficulty framework — it can produce intentionally-leveled questions at L1 through L4
- patrones-y-trampas.md prohibits the monotonic-sequence trap that allowed students to guess without knowing the rule
- generar-preguntas.md subagent list is complete — subagents will read per-type files when 01-05 creates them
- Ready for 01-05: creation of dato.md, directo.md, completar.md, and situacional.md per-type skill files

## Self-Check: PASSED

- FOUND: `.claude/commands/generar-preguntas/tipos-preguntas.md`
- FOUND: `.claude/commands/generar-preguntas/patrones-y-trampas.md`
- FOUND: `.claude/commands/generar-preguntas.md`
- FOUND: `.planning/phases/01-skill-file-audit/01-03-SUMMARY.md`
- FOUND: commit `bedfd6d` — feat(01-03): add difficulty level system and per-type file pointers to tipos-preguntas.md
- dato.md pointer check: matches in tipos-preguntas.md (PASS)
- monoton check: matches in patrones-y-trampas.md (PASS)
- dato.md in subagent list: matches in generar-preguntas.md (PASS)
- Nivel Facil/Dificil check: matches in tipos-preguntas.md (PASS)

---
*Phase: 01-skill-file-audit*
*Completed: 2026-02-23*
