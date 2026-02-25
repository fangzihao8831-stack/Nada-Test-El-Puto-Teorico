---
phase: 01-skill-file-audit
plan: 07
subsystem: content-pipeline
tags: [validation, content-pipeline, typescript, cleanup]

# Dependency graph
requires: []
provides:
  - Validation skill files with no todotest_2700.json dead references
  - TypeScript types, scripts, and docs with requiere_imagen/tipo_imagen fully removed
affects: [content-pipeline, generar-preguntas, validar-preguntas]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "hasImage always false in question transformations — image assignment handled by separate image skill"
    - "Validation sources reduced to 2 (temario + Claude knowledge) — todotest no longer a validation input"

key-files:
  created: []
  modified:
    - .claude/commands/validar-preguntas.md
    - .claude/commands/validar-preguntas/check-3-duplicados.md
    - .claude/commands/validar-preguntas/check-4-datos.md
    - .claude/commands/validar-preguntas/datos-referencia.md
    - nadatest/src/types/database.ts
    - nadatest/src/lib/data/tests.ts
    - nadatest/src/lib/actions/admin.ts
    - nadatest/scripts/gen-batch02-only.mjs
    - nadatest/scripts/generate-question-bank.mjs
    - nadatest/src/app/(exam)/test/[id]/page.tsx
    - content-pipeline.md
    - technical.md

key-decisions:
  - "todotest_2700.json removed from validation sources — reduces ~400k tokens of unnecessary context loading per validation run"
  - "requiere_imagen/tipo_imagen removed from all TypeScript types, scripts, and docs — existing batch_03 JSON data intentionally left untouched"
  - "hasImage set to false in all question transformations — image assignment is a separate skill concern, not a question schema field"
  - "Validation source count reduced from 3 to 2 (temario + Claude knowledge) — web search still mandatory when temario = SIN MATCH"

patterns-established:
  - "Question type definitions no longer include image metadata fields — image handling is fully delegated to the image skill"
  - "Validator skips todotest entirely — fact-checking against temario and Claude knowledge only"

requirements-completed: [DATA-02, DATA-03, SKILL-04]

# Metrics
duration: 4min
completed: 2026-02-25
---

# Phase 01 Plan 07: Dead Reference Cleanup Summary

**Removed todotest_2700.json from 4 validation skill files and stripped requiere_imagen/tipo_imagen from 8 TypeScript/script/doc files — zero new TypeScript errors, validator still passes batch_03 cleanly**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-25T13:30:07Z
- **Completed:** 2026-02-25T13:34:00Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Validation skill files no longer instruct the LLM to load todotest_2700.json (~400k tokens saved per validation run)
- requiere_imagen and tipo_imagen removed from the full TypeScript stack — database.ts, actions/admin.ts, data/tests.ts, page.tsx, and both generation scripts
- content-pipeline.md and technical.md docs now match the actual schema (no phantom fields)
- validate-questions.mjs still passes all 30 batch_03 questions; TypeScript compiles clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove todotest_2700.json references from validation skill files** - `010b842` (chore)
2. **Task 2: Remove requiere_imagen and tipo_imagen from schema validator, script, types, and docs** - `bc1c26e` (chore)

**Plan metadata:** (see final commit below)

## Files Created/Modified
- `.claude/commands/validar-preguntas.md` - Removed todotest from sources of truth and references section; cleaned bundle description and web search trigger condition
- `.claude/commands/validar-preguntas/check-3-duplicados.md` - Removed todotest from "NO se compara contra" exemption list
- `.claude/commands/validar-preguntas/check-4-datos.md` - Sources reduced from 3 to 2; algorithm steps, scenario examples, and web search rules updated accordingly
- `.claude/commands/validar-preguntas/datos-referencia.md` - Removed todotest from archivos de referencia section
- `nadatest/src/types/database.ts` - Removed requiere_imagen and tipo_imagen from Pregunta interface
- `nadatest/src/lib/data/tests.ts` - Removed requiere_imagen from inline parameter type; hasImage now always false
- `nadatest/src/lib/actions/admin.ts` - Removed requiere_imagen/tipo_imagen from createPregunta, updatePregunta, and importPreguntas parameter types
- `nadatest/scripts/gen-batch02-only.mjs` - hasImage: false (was q.requiere_imagen || false)
- `nadatest/scripts/generate-question-bank.mjs` - hasImage: false (was q.requiere_imagen !== false)
- `nadatest/src/app/(exam)/test/[id]/page.tsx` - Removed requiere_imagen from Supabase select string; hasImage now always false
- `content-pipeline.md` - Removed requiere_imagen and tipo_imagen from JSON example and field table
- `technical.md` - Removed requiere_imagen and tipo_imagen columns from SQL schema documentation

## Decisions Made
- todotest_2700.json removed as a validation source — the file was being loaded unnecessarily on every LLM validation run. The temario is the primary source of truth; web search is the fallback when temario has no match.
- Existing batch_03 JSON data left untouched — per prior user decision; the validator gracefully ignores extra fields.
- hasImage set to false everywhere instead of being removed — the TestQuestion type still has the field; the image skill will populate it separately when implemented.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated all scenario examples and source-count language in check-4-datos.md**
- **Found during:** Task 1 (check-4-datos.md cleanup)
- **Issue:** The scenario examples and algorithm step references still said "3 fuentes", "Todotest dice:" etc. after removing the todotest source step — internally inconsistent
- **Fix:** Updated all examples and step references to reflect 2-source model (temario + Claude knowledge)
- **Files modified:** .claude/commands/validar-preguntas/check-4-datos.md
- **Verification:** File reads coherently; no dangling "3 fuentes" or "todotest" references in data check logic
- **Committed in:** 010b842 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - consistency bug in example text)
**Impact on plan:** Necessary for internal consistency of the skill file. No scope creep.

## Issues Encountered
None — all files updated cleanly, TypeScript compiles without errors.

## Next Phase Readiness
- Validation skill files are clean and minimal — no dead references loading unnecessary context
- TypeScript types and scripts reflect the actual schema — new questions generated without requiere_imagen/tipo_imagen will type-check correctly
- Phase 1 (skill-file-audit) is now fully complete across all 7 plans

---
*Phase: 01-skill-file-audit*
*Completed: 2026-02-25*
