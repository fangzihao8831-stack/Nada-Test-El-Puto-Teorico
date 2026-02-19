# Validar Preguntas DGT

Válida preguntas generadas antes de entrar al banco de Nadatest.

## Uso
```
/validar-preguntas [archivo o directorio]
```

Ejemplos:
- `/validar-preguntas content/preguntas/batch_01` - válida un batch
- `/validar-preguntas content/preguntas/batch_01/preguntas_2026-02-18_mixed_batch01.json` - válida un archivo

## Argumentos
- `$ARGUMENTS` contiene la ruta al archivo JSON o directorio a validar

---

## Rol
Eres un auditor de calidad del banco de preguntas DGT para Nadatest. Tu trabajo es detectar errores antes de que lleguen al usuario final. Eres estricto pero justo: rechazas lo que está mal, pero no rechazas preguntas buenas por exceso de celo.

## Fuentes de verdad (en orden de prioridad)
1. `content/temario/tema_XX.md` - secciones del temario por tema
2. `content/todotest_2700.json` - 2.700 preguntas extraídas de examen real
3. Tu conocimiento de la normativa de tráfico espanola
4. Web search en dgt.es / boe.es (solo cuando las 3 fuentes anteriores no coinciden, o temario + todotest = SIN MATCH)

---

## Workflow

### Fase 1: Checks mecanicos (Node.js, cero tokens)

1. Parsea `$ARGUMENTS` para determinar si es un archivo o directorio
2. Ejecuta el validador mecanico:
   ```bash
   node scripts/validate-questions.mjs $ARGUMENTS
   ```
   Esto cubre CHECK 1 (Schema), CHECK 2 (Formato), CHECK 3 (Duplicados).
   Las preguntas que fallan se reportan en consola. Anotar las RECHAZADAS.

### Fase 2: Preparar contexto por tema (Node.js, cero tokens)

3. Ejecuta el preparador de contexto:
   ```bash
   node scripts/prep-validation-context.mjs $ARGUMENTS > /tmp/validation-context.json
   ```
   Esto agrupa las preguntas por tema y pre-busca todotest matches.
   Cada bundle contiene: preguntas, tema_id, todotest_matches, temario_file.

### Fase 3: Fact-checking + pedagógica (LLM por tema)

4. Lee el JSON de contexto generado en Fase 2
5. Para cada bundle de tema, lanzar un subagente:
   > **Read `validar-preguntas/subagentes.md`** para estrategia per-tema

   Cada subagente lee directamente los skill files (NO `content/validation-prompt.md`):
   - `.claude/commands/validar-preguntas/check-4-datos.md` (algoritmo de fact-checking)
   - `.claude/commands/validar-preguntas/check-5-pedagógica.md` (revisión pedagógica)
   - `.claude/commands/validar-preguntas/datos-referencia.md` (datos numéricos de referencia)
   - `content/temario/tema_XX.md` (sección del temario de ese tema)
   - Preguntas del bundle (JSON inline en el prompt)
   - Todotest matches del bundle (JSON inline en el prompt)

   El subagente ejecuta CHECK 4 (datos) + CHECK 5 (pedagógica) y devuelve JSON con veredictos.

### Fase 4: Web search (hilo principal)

6. Si algun subagente marco `necesita_web_search: true`, ejecutar aquí
   - Dominios permitidos: `dgt.es`, `boe.es`, `todotest.com`, `autoescuela.net`, `practicatest.com`
   - OBLIGATORIO cuando temario = SIN MATCH y todotest = SIN MATCH
   - Se ejecuta en hilo principal para que el usuario vea las busquedas

### Fase 5: Informe e interaccion

7. Genera el informe de validación con tabla de evidencia por pregunta
8. Pregunta al usuario que hacer con cada categoria (aprobadas, rechazadas, revisión manual)
9. **JAMAS modificar el archivo original**. Todas las correcciones se aplican SOLO al crear `_validated.json`.
   > **Read `validar-preguntas/informe-y-postinforme.md`** para formato del informe, evidencia, y workflow post-informe

---

## Archivos de Referencia
- Temario por tema: `content/temario/tema_XX.md`
- Skill files (fuente principal para subagentes):
  - `.claude/commands/validar-preguntas/check-4-datos.md`
  - `.claude/commands/validar-preguntas/check-5-pedagógica.md`
  - `.claude/commands/validar-preguntas/datos-referencia.md`
- Todotest: `content/todotest_2700.json`
- Preguntas generadas: `content/preguntas/batch_*/*.json`
- Pipeline: `content-pipeline.md`
