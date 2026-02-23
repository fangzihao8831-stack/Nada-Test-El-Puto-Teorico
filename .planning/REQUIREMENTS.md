# Requirements: Nadatest

**Defined:** 2026-02-23
**Core Value:** Students must be able to practice with factually accurate DGT exam questions that mirror the real test.

## v1.0 Requirements

### Data Accuracy

- [ ] **DATA-01**: Full audit of all numerical data in datos-numericos.md against all 12 tema_XX.md files (speeds, alcohol limits, distances, ITV periods, points, times, weights, SRI rules)
- [ ] **DATA-02**: All discrepancies found in DATA-01 are corrected in datos-numericos.md with temario citations
- [ ] **DATA-03**: datos-referencia.md is updated to match datos-numericos.md exactly so both files are consistent

### Validation

- [ ] **VALID-01**: CHECK 4 (datos verification) can only issue a PASS verdict when the validator has found and cited explicit supporting text from the relevant tema_XX.md file
- [ ] **VALID-02**: When the validator finds the correct answer contradicts or is absent from the temario, CHECK 4 issues REJECT
- [ ] **VALID-03**: When temario coverage is indirect or ambiguous, CHECK 4 issues FLAG instead of defaulting to PASS

## v2 Requirements

### Question Quality

- **QUAL-01**: Distractor quality rules documented per difficulty level (not all wrong options need to be plausible — depends on the question difficulty target)
- **QUAL-02**: Generator produces non-obvious distractors for hard questions that require knowing the specific rule to eliminate

### Workflow

- **FLOW-01**: Single-command end-to-end pipeline (generate → validate → save) with minimal manual steps
- **FLOW-02**: Review interface makes it easy to approve/reject individual questions with context

## Out of Scope

| Feature | Reason |
|---------|--------|
| Video question generation | DGT video perception tests not yet in content pipeline scope |
| Automatic question ingestion to Supabase | DB schema and content pipeline are separate concerns |
| Distractor difficulty improvements | Deferred to v2 — depends on difficulty level system not yet defined |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| DATA-03 | Phase 1 | Pending |
| VALID-01 | Phase 2 | Pending |
| VALID-02 | Phase 2 | Pending |
| VALID-03 | Phase 2 | Pending |

**Coverage:**
- v1.0 requirements: 6 total
- Mapped to phases: 6
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-23 after initial definition*
