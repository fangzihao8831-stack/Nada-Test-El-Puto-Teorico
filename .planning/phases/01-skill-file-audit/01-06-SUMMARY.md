---
phase: 01-skill-file-audit
plan: 06
subsystem: content
tags: [skill-files, content-pipeline, token-reduction, generar-preguntas]

# Dependency graph
requires:
  - phase: 01-skill-file-audit
    provides: Previous plans audited datos-numericos.md, tipos-preguntas, verificacion, explicaciones
provides:
  - generar-preguntas.md with zero dead references and conditional subagent reading tiers
  - verificacion.md with trimmed subtema section (7 error lines) and consolidated signal rules
  - tipos-preguntas.md with no calibration blockquote and no hardest_*.json pointers
affects:
  - content generation subagents (token load reduced)
  - generar-preguntas skill workflow

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Conditional file reading tiers in subagent instructions (always/per-type/conditional)"
    - "Single authoritative location for signal rules: verificacion.md"
    - "Subtema assignment uses tema_XX.md markers instead of embedded 58-row table"

key-files:
  created: []
  modified:
    - .claude/commands/generar-preguntas.md
    - .claude/commands/generar-preguntas/tipos-preguntas.md
    - .claude/commands/generar-preguntas/verificacion.md

key-decisions:
  - "Signal handling rules consolidated to verificacion.md as sole authoritative source; generar-preguntas.md has one-line pointer"
  - "Subtema mapping table (58 rows) replaced with 7 error-pattern lines + pointer to tema_XX.md markers"
  - "Subagent section restructured into 3 tiers: always-read (5 files), per-type (1 file), conditional (tema + catalogo)"
  - "Mezcla de dificultad por test block removed from verificacion.md — tipos-preguntas.md is authoritative for distribution"

patterns-established:
  - "Dead reference removal: remove file refs that no longer exist or are no longer needed in the workflow"
  - "Deduplication: when content exists in N files, designate one authoritative and add pointers from others"

requirements-completed: [DATA-01, SKILL-01, SKILL-02, SKILL-03]

# Metrics
duration: 5min
completed: 2026-02-25
---

# Phase 01 Plan 06: Token Reduction — Generation Skill Files Summary

**Removed ~519k-token dead references and deduplicated cross-file content across generar-preguntas.md, tipos-preguntas.md, and verificacion.md, restructuring subagents to conditional reading tiers**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-25T13:29:50Z
- **Completed:** 2026-02-25T13:34:39Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Removed all dead references to todotest_2700.json, dgt_oficial_exam.json, content-structure.json, and all hardest_*.json files from all 3 generation skill files
- Restructured subagent section in generar-preguntas.md from flat 10-file list to 3-tier conditional reading (always/per-type/conditional)
- Trimmed verificacion.md from 331 to 256 lines — subtema table (58 rows, ~2k tokens) replaced with 7 error-pattern lines + pointer
- Consolidated signal handling rules to verificacion.md as sole authoritative source; removed duplicate sections from generar-preguntas.md

## Task Commits

Each task was committed atomically:

1. **Task 1: Clean generar-preguntas.md** - `718ace3` (refactor)
2. **Task 2: Clean tipos-preguntas.md and verificacion.md** - `5ed762a` (refactor)

## Files Created/Modified
- `.claude/commands/generar-preguntas.md` - Removed Fuentes de datos, content-structure ref, Pistas section, all signal rule sections (Campo codigo_senal, Reglas de senales, Catalogo); restructured subagents to 3 tiers; cleaned Archivos de referencia
- `.claude/commands/generar-preguntas/tipos-preguntas.md` - Removed calibration blockquote and all hardest_*.json file references from type sections
- `.claude/commands/generar-preguntas/verificacion.md` - Replaced 58-line subtema table with 7-line error summary; removed Archivos de referencia de dificultad block; removed Mezcla de dificultad block

## Decisions Made
- Signal handling rules consolidated to verificacion.md; generar-preguntas.md now has a single pointer line rather than duplicate sections. This is the authoritative location.
- Subtema assignment guidance changed from embedded 58-row lookup table to 7 common error patterns + pointer to `[subtema_XX]` markers in tema_XX.md files. The full table is already accessible in the temario.
- Subagent instruction restructured with explicit reading tiers so subagents only load what they need for their assigned type and topics.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 3 generation skill files are clean of dead references
- Token load per subagent reduced: ~519k tokens from dead file references removed, plus subtema table trimmed
- Plan 07 (image metadata cleanup) can proceed
- Generation workflow unchanged in behavior — only file reading instructions and reference sections updated

---
*Phase: 01-skill-file-audit*
*Completed: 2026-02-25*
