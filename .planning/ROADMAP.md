# Roadmap: Nadatest — v1.0 Improve Generation Skill

## Overview

This milestone improves the content pipeline skill files to eliminate factually wrong questions. Phase 1 audits and corrects all numerical data in the generator reference files against the official DGT temario. Phase 2 hardens the validation CHECK 4 so the validator must cite temario evidence before approving any data-bearing question. Together they close the loop: data is correct, and the validator enforces it.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Skill File Audit** - Audit and improve all skill files that influence generation quality (data accuracy + rule quality)
- [ ] **Phase 2: Validator Hardening** - Rewrite CHECK 4 so every verdict requires explicit temario evidence

## Phase Details

### Phase 1: Skill File Audit
**Goal**: All skill files that influence generation quality are reviewed against the temario and corrected — numerical data, question type rules, pattern guidance, self-check rules, and explanation format
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, SKILL-01, SKILL-02, SKILL-03, SKILL-04
**Success Criteria** (what must be TRUE):
  1. Every numerical value in datos-numericos.md has an inline temario citation (tema_XX.md) confirming it
  2. No discrepancy exists between any value in datos-numericos.md and its source in the relevant tema_XX.md file
  3. datos-referencia.md contains no value that contradicts datos-numericos.md — the two files are consistent
  4. tipos-preguntas.md, patrones-y-trampas.md, verificacion.md, and explicaciones.md each updated where current instructions could lead to lower generation quality
**Plans**: 5 plans

Plans:
- [x] 01-01-PLAN.md — Audit and correct datos-numericos.md in one pass (DATA-01, DATA-02)
- [ ] 01-02-PLAN.md — Sync datos-referencia.md to match corrected datos-numericos.md (DATA-03)
- [ ] 01-03-PLAN.md — Add difficulty levels to tipos-preguntas.md; add monotonic-sequence trap to patrones-y-trampas.md (SKILL-01, SKILL-02)
- [ ] 01-04-PLAN.md — Add 3 new verification rules to verificacion.md; review explicaciones.md (SKILL-03, SKILL-04)
- [ ] 01-05-PLAN.md — Create 4 new per-type files: dato.md, directo.md, completar.md, situacional.md (SKILL-01)

### Phase 2: Validator Hardening
**Goal**: CHECK 4 in the validation skill issues evidence-based verdicts — PASS only with a temario quote, REJECT for contradictions, FLAG for ambiguity
**Depends on**: Phase 1
**Requirements**: VALID-01, VALID-02, VALID-03
**Success Criteria** (what must be TRUE):
  1. The CHECK 4 skill instructions contain an explicit rule that PASS requires a quoted or cited passage from the relevant tema_XX.md file
  2. The CHECK 4 skill instructions specify that a correct answer contradicted by or absent from the temario must receive REJECT, not PASS
  3. The CHECK 4 skill instructions specify that indirect or ambiguous temario coverage must receive FLAG, not PASS
  4. The three verdict paths (PASS / REJECT / FLAG) each have unambiguous decision criteria written in the skill file so there is no default path to PASS
**Plans**: TBD

Plans:
- [ ] 02-01: Rewrite CHECK 4 verdict logic in check-4-datos.md with evidence requirements and all three verdict paths

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Skill File Audit | 2/5 | In Progress|  |
| 2. Validator Hardening | 0/1 | Not started | - |
