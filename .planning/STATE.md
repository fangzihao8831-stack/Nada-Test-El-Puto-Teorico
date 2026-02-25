# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Students must be able to practice with factually accurate DGT exam questions that mirror the real test.
**Current focus:** Phase 2 — Validator Hardening

## Current Position

Phase: 2 of 2 (Validator Hardening)
Plan: 0 of 1 in current phase
Status: Ready to plan
Last activity: 2026-02-25 — Phase 1 plan 07 complete (dead reference cleanup)

Progress: [█████░░░░░] 50%

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: 9 min
- Total execution time: 36 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-skill-file-audit | 5/5 | 56 min | 11 min |

**Recent Trend:**
- Last 5 plans: 18 min
- Trend: —

*Updated after each plan completion*
| Phase 01-skill-file-audit P06 | 5 | 2 tasks | 3 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-GSD]: datos-numericos.md designated single source of truth for numerical data — datos-referencia.md must mirror it
- [Pre-GSD]: Haiku for validation (not Opus) — do not regress this in CHECK 4 rewrites
- [Known gap]: Validator passed a question with wrong trailer speed (80 instead of 90 km/h) — root cause: CHECK 4 had no evidence requirement
- [01-01]: Citation format locked — inline parenthetical (tema_XX.md) on same line as value; multi-topic: (tema_XX.md, tema_YY.md)
- [01-01]: Autobus con pasajeros DE PIE added as distinct speed table row — autopista 100, carretera 80 (not 90)
- [01-01]: 150 m triangle rule removed as unsourced — temario says 50 m minimum visible at 100 m (tema_11.md)
- [01-01]: V-16 mandatory since January 2026 in vias interurbanas as substitute for triangles
- [01-02]: datos-referencia.md synced to datos-numericos.md — 150 m triangle removed, DE PIE row added, puntos expanded with alcohol penalty points
- [01-02]: Citations intentionally omitted from datos-referencia.md — it is a compact lookup table; full citations live in datos-numericos.md
- [01-03]: Difficulty level system added to tipos-preguntas.md — Nivel 1-4 scale; per-type file pointers added pointing to dato.md, directo.md, completar.md, situacional.md
- [01-04]: Three new rules placed in dedicated "Verificacion de exactitud factual" section rather than appended to HARD REJECT table
- [01-04]: Level-specific depth guidance added to explicaciones.md — Nivel 1 = 1-2 bullets, Nivel 2+ = one distractor explained, Nivel 3+ = all distractors explained
- [Phase 01-06]: Signal handling rules consolidated to verificacion.md as sole authoritative source; generar-preguntas.md has one-line pointer
- [Phase 01-06]: Subtema mapping table (58 rows) replaced with 7 error-pattern lines + pointer to tema_XX.md markers
- [Phase 01-06]: Subagent section restructured into 3 tiers: always-read (5 files), per-type (1 file), conditional (tema + catalogo)

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-02-24
Stopped at: CHECK 6 (clasificacion) skill file created and wired into validator. batch_03 (30 questions) generated and on demo. Badge de dificultad en UI. Next: run /validar-preguntas on batch_03 to test CHECK 6, or generate+validate a fresh batch.
Resume file: None
