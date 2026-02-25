# Phase 1: Skill File Audit - Context (Updated)

**Gathered:** 2026-02-23, **Updated:** 2026-02-25
**Status:** Ready for planning (re-opened after execution revealed gaps)

<domain>
## Phase Boundary

Audit and improve all skill files that influence generation quality. Includes:
- Skill file organization and token efficiency (NEW — discovered during batch_04 generation)
- Remove deprecated image metadata fields across generation, validation, and types
- Cross-document consistency (eliminate contradictions and redundancy)
- Reference file cleanup (remove unnecessary token-heavy references)

Out of scope: new generation workflows, question bank format migration, difficulty grading rework (deferred until post-execution validation).

</domain>

<decisions>
## Implementation Decisions

### Reference file cleanup
- **Remove all references** to `todotest_2700.json` (400k tokens), `dgt_oficial_exam.json` (4k tokens), and all 4 `hardest_*.json` files (108k tokens total) from skill files — the per-type files (dato.md, directo.md, etc.) already contain sufficient worked examples
- **Remove reference** to `content-structure.json` (6.4k tokens) — tema files already have `[subtema_XX]` markers, making the structure mapping redundant
- **catalogo.json read conditionally** — only when generating questions about specific traffic signs (codigo_señal), not loaded by default

### Subtema mapping table removal
- **Delete the 58-line subtema mapping table** from verificacion.md — tema files already contain `[subtema_XX]` markers at each section header
- **Keep only the 7 "common mistakes" lines** (e.g., "phone distraction → subtema_47, not subtema_15") as these corrections aren't visible in the tema source files

### Image metadata fields — complete removal
- **Delete `requiere_imagen` and `tipo_imagen`** from all layers:
  - Generation skill files (already partially done)
  - `check-1-schema.md` (validator rules)
  - `validate-questions.mjs` (validation script)
  - TypeScript type definitions
- **Keep `codigo_señal`** — needed to link questions to traffic sign SVGs
- **Leave existing batch_03 data untouched** — old questions keep their fields, new questions won't have them
- This work belongs in Phase 1 (cleaning up deprecated fields is part of skill file audit)

### Subagent file reading — conditional by type
- Subagents read **only the files they need**, not all 10:
  - Always read: `generar-preguntas.md` (auto-loaded), `tipos-preguntas.md`, `datos-numericos.md`, `verificacion.md`, `explicaciones.md`
  - Read per-type: only the matching type file (e.g., dato subagent reads `dato.md`, not `situacional.md`)
  - Read conditionally: `patrones-y-trampas.md` (always), `catalogo.json` (only for signal questions)
  - Read per-tema: only the assigned `tema_XX.md` files

### Claude's Discretion
- **Per-type file merge strategy**: Whether to merge dato.md/directo.md/completar.md/situacional.md back into tipos-preguntas.md or keep them separate but remove redundancy — Claude decides based on token impact analysis
- **Main file (generar-preguntas.md) cleanup**: Remove content duplicated in sub-files (pista rules, signal rules), keep only JSON format + workflow steps + core "Escenario Primero" rule
- **Anti-pattern compression in verificacion.md**: Decide which of the 5 anti-patterns can be compressed to 1-line rule + 1-line example vs which need full explanation
- **Signal handling rules consolidation**: Currently in 3 files — consolidate into one authoritative location

</decisions>

<specifics>
## Specific Ideas

### Token budget target
Current: ~47,000+ tokens minimum per subagent batch (20,500 skill files + 20,000 tema + 6,400 structure)
Target: Significantly reduce by removing reference files (~135k tokens of references eliminated), conditional reading, and deduplication

### Difficulty grading — deferred validation
User reports difficulty levels "feel wrong" but can't pinpoint the issue yet. After this execution round, review generated questions to determine if:
- Levels skew too high or too low
- Criteria in per-type files are too vague for consistent grading
- A more objective rubric is needed (e.g., distractor plausibility scoring)

</specifics>

<deferred>
## Deferred Ideas

- **Difficulty grading rework** — User feels levels are inaccurate but wants to validate with actual generation output first. Revisit after next batch execution.
- **Image reformatter skill** — When an image is assigned to a situational question, a post-generation step rewrites the statement to reference the image directly. Separate capability, separate phase.

</deferred>

---

*Phase: 01-skill-file-audit*
*Context gathered: 2026-02-23, updated: 2026-02-25*
