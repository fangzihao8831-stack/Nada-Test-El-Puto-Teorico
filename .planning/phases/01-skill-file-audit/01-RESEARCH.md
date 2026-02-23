# Phase 1: Skill File Audit - Research

**Researched:** 2026-02-23
**Domain:** Content audit — Spanish DGT driving exam skill files vs. official temario
**Confidence:** HIGH (all findings verified directly against temario source files)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- Reescritura completa permitida — sin restricciones para reestructurar cualquier sección o archivo
- Los 4 archivos de instrucciones existentes se revisan con igual profundidad
- Barra de calidad: imitar el estilo real del examen DGT (tono, redacción, distribución de dificultad de la base de 2700 preguntas)
- Los exámenes DGT oficiales usan exactamente **3 opciones de respuesta (A, B, C)** — todas las reglas y ejemplos deben reflejar esto
- Crear 4 nuevos archivos bajo el skill de generación: `dato.md`, `directo.md`, `completar.md`, `situacional.md`
- Cada archivo documenta: definición del tipo, niveles de dificultad con ejemplos concretos, reglas de distractores por nivel
- Los ejemplos de referencia dentro de estos archivos deben generarse usando el skill `/generar-preguntas` — no hacerlos a mano
- DATO, DIRECTO, COMPLETAR tienen 3 niveles de dificultad (Fácil / Medio / Difícil)
- SITUACIONAL tiene 4 niveles (Fácil / Medio / Difícil / Muy Difícil)
- Mayor nivel = distractores más plausibles; en Nivel 3+, un alumno sin dominio exacto no puede eliminar ninguna opción por lógica
- Los escenarios situacionales deben incluir detalles concretos: tipo de vía, velocidad, condiciones meteorológicas, otros vehículos presentes, hora del día
- Verificación de exactitud factual: identificar sección temario (tema_XX.md) que confirma la respuesta correcta, antes de conservar cualquier pregunta
- Verificación cruzada con conocimiento de Claude: si la respuesta correcta contradice el conocimiento general de Claude → marcar FLAG para revisión humana
- Verificación de secuencia en distractores (NUEVO): para preguntas dato sobre velocidades o distancias, las 3 opciones NO deben formar una secuencia monotónica de la misma fila de la tabla
- Formato citas: referencias parentéticas inline `(tema_05.md)` añadido tras cada valor; para valores multi-tema: `(tema_04.md, tema_05.md)`
- Corrección en el mismo pase — auditoría + corrección en un solo paso, sin archivo de log separado
- datos-referencia.md puede ser un subconjunto simplificado de datos-numericos.md; incluir solo los valores que el validador usa activamente; no debe contradecir datos-numericos.md en ningún valor compartido

### Claude's Discretion

- Colocación exacta de las citas dentro de cada línea de datos-numericos.md
- Si añadir cabeceras de sección o reestructurar datos-numericos.md más allá de las correcciones
- Qué valores incluir u omitir en el datos-referencia.md simplificado

### Deferred Ideas (OUT OF SCOPE)

- **Reformateador de preguntas con imagen** — Cuando se asigna una imagen a una pregunta situacional, un paso posterior a la generación reescribe el enunciado para referenciar la imagen directamente. Capacidad diferente, fase separada.
</user_constraints>

---

## Summary

This phase is a content audit task, not a software engineering task. There are no external libraries to install or APIs to call. The work consists of reading the 12 temario files (`content/temario/tema_XX.md`) as the authoritative source, then editing six existing skill files to align with that source — and creating four new per-type skill files.

The skill files are markdown documents that Claude reads at generation and validation time. Their accuracy directly determines whether the generator produces correct questions. A bad value in `datos-numericos.md` propagates into every question that references it. The known root cause that triggered this milestone was the validator passing a question with a wrong trailer speed (80 km/h instead of 90 km/h) because CHECK 4 had no evidence requirement — data was asserted, not cited.

Direct inspection of the temario files against `datos-numericos.md` found **one confirmed factual discrepancy** and **two incomplete coverage areas** in the numerical data files. The instruction files (`tipos-preguntas.md`, `patrones-y-trampas.md`, `verificacion.md`, `explicaciones.md`) are structurally sound but each has specific gaps that CONTEXT.md identified and that research confirms.

**Primary recommendation:** Work through all six existing skill files and four new files in a single ordered sequence, with temario lookup for every numerical value. Do not batch-edit without per-value citation confirmation.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | Full audit of all numerical data in datos-numericos.md against all 12 tema_XX.md files (speeds, alcohol limits, distances, ITV periods, points, times, weights, SRI rules) | Temario files read; specific discrepancies identified below in Architecture Patterns section |
| DATA-02 | All discrepancies found in DATA-01 are corrected in datos-numericos.md with temario citations | Correction approach documented; citation format locked as `(tema_XX.md)` inline |
| DATA-03 | datos-referencia.md is updated to match datos-numericos.md exactly so both files are consistent | Current state of datos-referencia.md analyzed; two missing sections identified (see Pitfalls) |
| SKILL-01 | tipos-preguntas.md reviewed for accuracy of question type distribution, difficulty guidance, and worked examples — updated where instructions could lead to low-quality output | File read; specific gaps found: no difficulty level system, no distractor rules per level, new per-type files required |
| SKILL-02 | patrones-y-trampas.md reviewed for completeness of trap word coverage and question start patterns — updated where gaps exist | File read; coverage is strong; gap identified in monotonic-sequence distractor trap |
| SKILL-03 | verificacion.md reviewed for completeness of self-check rules before generation — updated where the rules miss common generation errors | File read; missing: factual citation requirement, Claude self-contradiction check, monotonic distractor check |
| SKILL-04 | explicaciones.md reviewed for explanation quality guidance — updated where format rules don't lead to pedagogically useful explanations | File read; format is sound; gap: no guidance for handling level-specific explanations or distractor quality notes |
</phase_requirements>

---

## Standard Stack

### Core
| Resource | Location | Purpose | Why Standard |
|----------|----------|---------|--------------|
| Temario files | `content/temario/tema_01.md` to `tema_12.md` | Authoritative source of truth for all DGT rules and numerical data | Official content extracted from DGT syllabus |
| datos-numericos.md | `.claude/commands/generar-preguntas/datos-numericos.md` | Generator's numerical reference — primary file to correct | Read by generator for every question with a numerical value |
| datos-referencia.md | `.claude/commands/validar-preguntas/datos-referencia.md` | Validator's quick-lookup reference | Read by Haiku validator during CHECK 4 |
| tipos-preguntas.md | `.claude/commands/generar-preguntas/tipos-preguntas.md` | Question type definitions, distribution, difficulty guidance | Read by generator before every batch |
| patrones-y-trampas.md | `.claude/commands/generar-preguntas/patrones-y-trampas.md` | Question stem patterns, trap word rules, topic distribution | Read by generator for pattern calibration |
| verificacion.md | `.claude/commands/generar-preguntas/verificacion.md` | Pre-output self-check checklist for generator | Read at final verification step of generation |
| explicaciones.md | `.claude/commands/generar-preguntas/explicaciones.md` | Explanation format rules and pedagogical standards | Read before writing every explanation field |

### New Files to Create
| File | Location | Purpose |
|------|----------|---------|
| dato.md | `.claude/commands/generar-preguntas/dato.md` | Per-type skill: 3 difficulty levels with distractor rules and reference examples |
| directo.md | `.claude/commands/generar-preguntas/directo.md` | Per-type skill: 3 difficulty levels with distractor rules and reference examples |
| completar.md | `.claude/commands/generar-preguntas/completar.md` | Per-type skill: 3 difficulty levels with distractor rules and reference examples |
| situacional.md | `.claude/commands/generar-preguntas/situacional.md` | Per-type skill: 4 difficulty levels with distractor rules and reference examples |

### Supporting Files (read-only context during audit)
| File | Purpose |
|------|---------|
| `content/temario/preamble.md` | Structural context for temario organization |
| `.claude/commands/validar-preguntas/check-4-datos.md` | Validator logic — informs what datos-referencia.md must support |
| `.claude/commands/validar-preguntas/subagentes.md` | Confirms Haiku model constraint must not regress |

### No External Installations Required
This phase is pure content editing. No npm packages, no build tools, no new scripts. The only "stack" is the markdown files themselves and the temario as reference.

---

## Architecture Patterns

### Recommended Work Order

```
Wave 1: Data files (DATA-01, DATA-02, DATA-03)
  Step 1: Audit datos-numericos.md against all 12 tema files → correct + cite inline
  Step 2: Sync datos-referencia.md to match datos-numericos.md corrected values

Wave 2: Instruction files (SKILL-01 through SKILL-04)
  Step 3: Add difficulty + distractor rules to tipos-preguntas.md (SKILL-01)
  Step 4: Add monotonic-sequence trap section to patrones-y-trampas.md (SKILL-02)
  Step 5: Add 3 new verification rules to verificacion.md (SKILL-03)
  Step 6: Review explicaciones.md for gaps (SKILL-04)

Wave 3: New per-type files (SKILL-01 — part 2)
  Step 7: Create dato.md, directo.md, completar.md, situacional.md
          (use /generar-preguntas to produce reference examples per level)
```

Wave 1 must complete before Wave 3 because the per-type files need correct numerical examples. Waves 2 and 3 can proceed in parallel if desired, but the instruction files must be stable before producing example questions that use those instructions.

### Pattern 1: Per-Value Temario Citation

When auditing datos-numericos.md, for each value:
1. Grep the relevant keyword across all tema files
2. Find the exact row/line that confirms the value
3. Add citation inline in parentheses after the value
4. If value contradicts temario, replace with temario value + citation

Example of citation format (locked decision):
```markdown
| Autopista/Autovía | 120 | **90** | 80 |  (tema_05.md)
```

For multi-topic values:
```markdown
| **0,25 mg/l** | General (aire espirado) (tema_01.md, tema_08.md) |
```

### Pattern 2: New Per-Type File Structure

Each of the four new files follows this structure:
```markdown
# Tipo: [DATO|DIRECTO|COMPLETAR|SITUACIONAL]

## Definición
[One paragraph: what this type is, how to identify it, proportion of real exam]

## Niveles de Dificultad

### Nivel 1 — Fácil
**Definición**: [from CONTEXT.md]
**Reglas de distractores**: [what makes a valid Level 1 distractor]
**Ejemplo de referencia**:
[question generated via /generar-preguntas]

### Nivel 2 — Medio
...

### Nivel 3 — Difícil
...

[### Nivel 4 — Muy Difícil (SITUACIONAL only)]
...

## Checklist por nivel
[Quick reference: what to verify before finalizing a question at each level]
```

### Pattern 3: verificacion.md New Rule Format

New rules follow the existing table format in the HARD REJECT section:
```markdown
| **Verificación de exactitud factual** | Dato sin cita de temario | Ningún número se conserva sin citar tema_XX.md |
| **Contradicción con conocimiento propio** | Respuesta contradice lo que Claude sabe | Marcar FLAG para revisión humana |
| **Secuencia monotónica en distractores** | A=80, B=90, C=100 para misma categoría de la tabla | Distractores deben venir de condiciones DISTINTAS |
```

### Anti-Patterns to Avoid

- **Assuming datos-referencia.md is already in sync**: It was not updated when datos-numericos.md received its last corrections. Always re-derive from the corrected datos-numericos.md.
- **Creating new citations without verifying the temario line**: Do not cite a tema file unless a specific line/row was found. Vague references like "tema_05.md covers speed" are insufficient — the citation must be verifiable.
- **Adding difficulty levels without reference examples**: The per-type files are only useful if they include concrete examples. Leaving the examples blank defeats the purpose.
- **Editing verificacion.md without also updating the final checklist**: The checklist at the bottom of verificacion.md is a duplicate of the rules above — both must be updated consistently.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Verifying numerical values | A script to cross-check markdown tables | Direct Grep against tema_XX.md files | Source is markdown, not structured data; Grep is faster and more reliable for this volume |
| Generating reference examples | Manually writing example questions for per-type files | `/generar-preguntas` skill (locked decision) | Examples must match the actual generation style; manually written examples drift |
| Checking consistency between datos-numericos.md and datos-referencia.md | A diff script | Manual review after correcting datos-numericos.md | Files differ in structure; a line-by-line diff would produce false positives |

**Key insight:** This is a human-review-first task. The temario is the ground truth — the audit is the work of reading it carefully, not automating a comparison.

---

## Common Pitfalls

### Pitfall 1: The "150 m in autopista" Triangle Rule
**What goes wrong:** datos-numericos.md states "En autopista/autovía: colocar un triángulo 150 m detrás del vehículo averiado". The temario (tema_11.md, section 45.1) does NOT specify 150 m for autopista. It states: "colocar a 50 metros como mínimo (visibles a 100 metros)". The 150 m figure in datos-numericos.md appears to be an unsourced addition.
**Why it happens:** The 150 m rule may come from older pre-V16 guidance or a misremembering. The temario only specifies: 50 m minimum distance, visible at 100 m. V-16 has replaced triangles as mandatory since January 2026.
**How to avoid:** Delete the 150 m row or reframe it as "triangles: 50 m min, visible at 100 m; V-16 has replaced triangles since Jan 2026 in vias interurbanas" with citation `(tema_11.md)`.
**Warning signs:** Any value in datos-numericos.md with no temario match — look for values without a corresponding grep hit.

### Pitfall 2: "Autobús normal" Speed Oversimplification
**What goes wrong:** datos-numericos.md lists "Autobús (normal, sin pasajeros de pie)" as 100 km/h in autopista and 90 km/h in carretera. The temario (tema_05.md, section 11.1b) adds a third variant: "Autobús con pasajeros DE PIE: 100 km/h autopista, 80 km/h carretera". datos-numericos.md omits this distinction.
**Why it happens:** The three-row table treats buses as two types; the temario has three. The "pasajeros de pie" variant is a realistic exam trap.
**How to avoid:** Add the "Autobús con pasajeros de pie" row to the bus speed table in datos-numericos.md with citation `(tema_05.md)`.
**Warning signs:** Any speed table with fewer rows than the temario equivalent — always count rows and compare.

### Pitfall 3: Motocicleta ITV Incomplete
**What goes wrong:** datos-numericos.md lists motocicleta ITV as "Cada 2 años hasta los 10 años, luego anual" — this matches the temario (tema_02.md). However, neither datos-numericos.md nor datos-referencia.md includes the "luego anual" portion for motocicleta in the row display. The cell in datos-referencia.md says "Cada 2 años hasta 10 años, luego anual" which is correct. Both files agree and match the temario — this is not a discrepancy but confirms consistency.
**Why it happens:** Not a bug here, but worth verifying the row for ciclomotor: datos-numericos.md says "Cada 2 años" (no annual period). The temario (tema_02.md) confirms ciclomotores: "Hasta 3 años exento, más de 3 años cada 2 años" with no annual period. This matches. No discrepancy.
**How to avoid:** Treat ITV tables as a three-vehicle check: turismo, motocicleta, ciclomotor — all three must match their respective temario rows.

### Pitfall 4: Confusing "camión" (datos-numericos.md) with Actual Temario Categories
**What goes wrong:** datos-numericos.md table header says "Camión (cualquier MMA): 90 km/h autopista, 80 km/h carretera". The temario (tema_05.md) distinguishes "Camión ligero/furgón (MMA ≤3.500 kg, categoría N1)" from "Camión pesado (MMA >3.500 kg)" — both have the same speeds (90/80). The speeds are correct, but the label "cualquier MMA" is accurate.
**Why it happens:** The temario happens to have the same speed for both light and heavy trucks, so the simplification is factually correct. No correction needed, but the citation should reference tema_05.md to make this verifiable.
**How to avoid:** Add `(tema_05.md)` citation. The simplification is acceptable because the speeds are identical across categories.

### Pitfall 5: Missing Difficulty-Level Rules in tipos-preguntas.md
**What goes wrong:** tipos-preguntas.md describes the four question types with examples but has no difficulty level system. It references `content/hardest_dato.json` etc. for calibration, but gives no structured rules for what makes a Level 1 vs Level 3 question. When the generator reads this file, it has no rubric for intentional difficulty targeting.
**Why it happens:** Difficulty levels were defined after tipos-preguntas.md was written.
**How to avoid:** The per-type files (dato.md etc.) provide this structure. tipos-preguntas.md needs a pointer to those files plus a brief summary of the level system so the generator knows to consult them.
**Warning signs:** Generator producing questions without explicit difficulty labels — symptom of no structured difficulty rubric.

### Pitfall 6: verificacion.md Checklist Drift
**What goes wrong:** The checklist at the bottom of verificacion.md ("Checklist final por pregunta") is a reduced version of the rules in the file body. If new rules are added to the body without also adding them to the checklist, the checklist becomes incomplete and generators skip the new rules.
**Why it happens:** The checklist and the body rules were written together but are maintained separately.
**How to avoid:** For every new rule added to verificacion.md, simultaneously add a corresponding checklist item. The three new rules (factual citation, Claude self-check, monotonic sequence) each need a checklist entry.

### Pitfall 7: datos-referencia.md Missing Points Data
**What goes wrong:** datos-referencia.md omits the "Puntos del permiso" section entirely, even though datos-numericos.md has it and CHECK 4 in the validator may encounter questions about alcohol + points penalties. The omission means the Haiku validator has no quick-lookup for these values.
**Why it happens:** datos-referencia.md was built as a subset — the points section was not included. The question is whether Haiku ever verifies points data against this file.
**How to avoid:** Per the locked decision, datos-referencia.md includes "only the values that the validator uses actively." Given that points questions exist in the generated batches, include the points table. Minimal entry: new driver (8), after 2 clean years (12), maximum (15), alcohol penalties (4 or 6 points).

---

## Code Examples

### Grep Pattern for Temario Cross-Check

When auditing a specific value, use this pattern:
```bash
# Check all tema files for a specific value
grep -rn "90 km/h\|remolque.*ligero\|ligero.*remolque" content/temario/

# Check a specific tema for a category
grep -n "velocidad\|km/h\|autobús" content/temario/tema_05.md
```

### Citation Format Examples

Current (no citation):
```markdown
| Autopista/Autovía | 120 | **90** | 80 |
```

Corrected (with citation):
```markdown
| Autopista/Autovía | 120 | **90** | 80 | (tema_05.md) |
```

For the triangle/V-16 update in datos-numericos.md:
```markdown
## Señalización de Emergencia
| Dispositivo | Contexto |
|-------------|----------|
| **Triángulos** | A 50 m mínimo, visibles a 100 m. Desde enero 2026 NO son obligatorios si se dispone de V-16 conectada (tema_11.md) |
| **V-16 (baliza)** | Colocar en el techo del vehículo. Obligatorio desde enero 2026 en vías interurbanas como sustituto de triángulos (tema_11.md) |
```

### New Rule Format for verificacion.md

Append to the HARD REJECT table:
```markdown
| **Sin cita de temario** | Dato numérico sin sección fuente | Identificar tema_XX.md que confirma el dato antes de conservar la pregunta |
| **Contradicción con Claude** | Respuesta contradice conocimiento general del tráfico español | Marcar FLAG para revisión humana — el temario manda, pero la contradicción indica posible error |
| **Secuencia monotónica en distractores** | Las 3 opciones forman serie simple (70/80/90) de la misma fila de la tabla | Usar valores de DISTINTAS condiciones del mismo escenario |
```

Append to the Checklist final section:
```markdown
- [ ] ¿Hay algún valor numérico sin cita de tema_XX.md que lo respalde? → Si es SÍ, buscar y añadir cita
- [ ] ¿La respuesta correcta contradice lo que Claude sabe sobre tráfico? → Si es SÍ, marcar FLAG
- [ ] ¿Las 3 opciones forman una secuencia monotónica (ej: 70/80/90) de la misma categoría? → Si es SÍ, REDISTRIBUIR con valores de condiciones distintas
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Triángulos obligatorios en autopista (150 m detrás) | V-16 obligatorio desde enero 2026 en vías interurbanas; triángulos solo como complemento | Enero 2026 | datos-numericos.md "150 m" row needs updating |
| Validador con CHECK 4 sin requisito de evidencia | CHECK 4 actual requiere 3 fuentes con clasificación DIRECTO/INDIRECTO/SIN MATCH | Pre-GSD session | Validator already improved; datos files must match |
| tipos-preguntas.md sin niveles de dificultad | Niveles de dificultad definidos en CONTEXT.md para todos los tipos | 2026-02-23 | Per-type files are new; tipos-preguntas.md needs pointer to them |

**Key regulatory change:** V-16 device is now mandatory on interurban roads since January 2026 (`Ley 5/2025`, confirmed in tema_11.md). Triangles are no longer required if V-16 is available. This affects the "150 m in autopista" row in datos-numericos.md which predates this change.

---

## Open Questions

1. **The "150 m in autopista" triangle rule: was it ever in the temario?**
   - What we know: tema_11.md says "50 m minimum, visible at 100 m." No 150 m figure appears anywhere in tema_11.md.
   - What's unclear: Where the 150 m figure in datos-numericos.md came from. It may be from an older version of the RGC or a misremembering.
   - Recommendation: Treat it as unsourced and remove it. Replace with the V-16 context and the correct 50 m / 100 m visibility rules from tema_11.md.

2. **Should tipos-preguntas.md link to the four new per-type files, or should the per-type files be standalone?**
   - What we know: generar-preguntas.md already instructs the generator to read tipos-preguntas.md as part of Step 2.
   - What's unclear: Whether the generator reads additional files beyond what generar-preguntas.md lists, or only what is explicitly listed.
   - Recommendation: Add a "Ver archivos por tipo" section to tipos-preguntas.md that instructs reading the appropriate `[tipo].md` file for difficulty rules. Update generar-preguntas.md to add the per-type files to its read list.

3. **datos-referencia.md: include or exclude the alcohol penalty/points data?**
   - What we know: datos-referencia.md currently omits the puntos section. The validator (Haiku) reads this file during CHECK 4.
   - What's unclear: Whether the Haiku validator actually encounters questions about points in the current batch workflow.
   - Recommendation: Include a minimal points table (8 / 12 / 15 points, alcohol penalty points) for completeness and to prevent a future CHECK 4 gap. Consistent with the locked decision's criterion ("values the validator uses actively" — points questions exist).

---

## Sources

### Primary (HIGH confidence)
- `content/temario/tema_01.md` — Points system, ITV, permiso B rules, novel conductor rules
- `content/temario/tema_02.md` — ITV periodicidad table (verified for turismo, motocicleta, ciclomotor)
- `content/temario/tema_03.md` — Remolque speeds table (6.3), distance lateral ciclistas
- `content/temario/tema_05.md` — Main speed limits table (11.1b): all vehicle/road combinations including autobús con pasajeros de pie
- `content/temario/tema_06.md` — Parking distances (5 m intersección, 15 m parada bus), parada vs estacionamiento (2 min rule), ciclista lateral distance (1.5 m)
- `content/temario/tema_08.md` — Alcohol limits: general (0,25 mg/l aire, 0,5 g/l sangre), novel/profesional (0,15 mg/l aire, 0,3 g/l sangre)
- `content/temario/tema_09.md` — SRI (135 cm threshold)
- `content/temario/tema_11.md` — Emergency triangle rule (50 m min, visible 100 m), V-16 mandatory since Jan 2026, V-16 replaces triangles on interurban roads

### Secondary (MEDIUM confidence)
- Existing skill files read directly — current state documented from file contents, not assumed

### Tertiary (LOW confidence)
- None. All findings verified against temario source files.

---

## Metadata

**Confidence breakdown:**
- Data audit findings: HIGH — verified by direct grep against temario files
- Instruction file gaps: HIGH — verified by reading the actual files and comparing against CONTEXT.md requirements
- New file structure: HIGH — structure locked in CONTEXT.md; per CONTEXT.md examples already approved
- "150 m" discrepancy: HIGH confidence it is unsourced — no temario match found across any of the 12 tema files

**Research date:** 2026-02-23
**Valid until:** Until temario files are updated (stable regulatory content — valid indefinitely until DGT changes rules)
