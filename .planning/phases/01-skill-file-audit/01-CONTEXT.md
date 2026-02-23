# Phase 1: Skill File Audit - Context

**Gathered:** 2026-02-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Audit and improve all skill files that influence generation quality. Covers:
- Numerical data references (`datos-numericos.md`, `datos-referencia.md`) — correct against official temario, add citations
- Generation instruction files (`tipos-preguntas.md`, `patrones-y-trampas.md`, `verificacion.md`, `explicaciones.md`) — rewrite where needed
- New per-type skill files — create `dato.md`, `directo.md`, `completar.md`, `situacional.md` with difficulty tiers and examples

Building new question-generation workflows, image-aware question reformatting, and validator changes are out of scope (Phase 2).

</domain>

<decisions>
## Implementation Decisions

### Skill file improvement depth
- Full rewrite is allowed — no restrictions on restructuring any section or file
- All 4 existing generation instruction files reviewed with equal depth (tipos-preguntas.md, patrones-y-trampas.md, verificacion.md, explicaciones.md)
- Quality bar: mirror real DGT exam style (tone, phrasing, difficulty distribution)
- Official DGT exams use exactly **3 answer options** (A, B, C) — all examples must match this

### New per-type skill files
- Create 4 new files under the generation skill: `dato.md`, `directo.md`, `completar.md`, `situacional.md`
- Each file documents the type definition, difficulty tiers, and reference examples
- Reference examples inside these files must be **generated using the /generar-preguntas skill** — not handcrafted. This ensures examples reflect the actual generation quality and style, not synthetic ones

### Difficulty tiers (all 4 question types)
3 tiers across all types. Core progression rule: **higher tier = wrong answers are more plausible** (harder to dismiss without knowing the rule).

| Tier | General definition |
|------|--------------------|
| 1 — Easy | Single condition or fact. Distractors are clearly wrong to anyone with basic knowledge. |
| 2 — Medium | Two conditions combined, or a specific threshold/exception. One distractor is plausible to a careless reader. |
| 3 — Hard | Multiple rules combined, or an exception to a common rule. All distractors are plausible without knowing the exact rule. |

**Situacional focus** — priority question type for improvement. Additional rules for situacional:
- Scenarios must include concrete details: road type, speed, weather/conditions, other vehicles present, time of day where relevant
- Complexity scales with tier: Tier 1 has one variable, Tier 2 combines two conditions, Tier 3 requires applying multiple rules or resolving ambiguity

### Self-check rules (verificacion.md)
- Factual accuracy check: Before keeping a question, must identify the specific temario section (tema_XX.md) that confirms the correct answer
- Cross-knowledge check: If the correct answer contradicts Claude's general knowledge → **FLAG** the question for human review. Temario is the authoritative source for the exam; disagreement signals a potential error in either the temario or the question
- Distractor quality check: At Tier 2+, no distractor should be dismissible by common sense alone — each must require rule knowledge to rule out

### Citation format (datos-numericos.md)
- Inline parenthetical references: `(tema_05.md)` appended after each value
- For values that span multiple sections: `(tema_04.md, tema_05.md)`
- Claude's discretion on exact placement (end of row, end of bullet, etc.)

### Discrepancy handling during audit (plans 01-01 and 01-02)
- Fix discrepancies in-place during the audit pass (single-pass, not separate log + fix)
- Each corrected value gets a citation added at the same time
- Claude's discretion on how to structure the audit report for human review

### datos-referencia.md sync strategy (plan 01-03)
- Does not need to be structurally identical to datos-numericos.md
- Can be a simplified subset — include only values that validators actively use when checking answers
- Must not contradict datos-numericos.md on any value that appears in both files

### Claude's Discretion
- Exact citation placement within each line in datos-numericos.md
- Whether to add section headers or restructure datos-numericos.md beyond corrections
- Audit report format for plan 01-01 findings
- Which values to include vs. omit in the simplified datos-referencia.md

</decisions>

<specifics>
## Specific Ideas

- "Mirror real DGT exam style" — the 2700-question database analyzed earlier is the style reference
- Situacional examples must NOT be handcrafted — run /generar-preguntas skill to produce reference examples
- Tier 3 wrong answers should all seem plausible to a student who hasn't mastered the rule — this is the key quality signal for distractor design
- The user confirmed: DGT official exams have exactly 3 answer choices (A, B, C), not 4

</specifics>

<deferred>
## Deferred Ideas

- **Image-aware question reformatter** — When a traffic sign image is assigned to a situational question, a post-generation step rewrites the question text to reference the image directly ("¿Quién tiene prioridad en esta imagen?" instead of describing the scenario in text). Different capability, separate phase.

</deferred>

---

*Phase: 01-skill-file-audit*
*Context gathered: 2026-02-23*
