# Uso de Subagentes (Per-Tema)

## Estrategia: Shift-Left + Lightweight Review

La validación se divide en dos fases:

1. **Generación con auto-validación** (Opus, 4 agentes): El generador verifica sus propios datos contra el temario mientras genera. Cubre ~90% de errores a coste cero.
2. **Revisión adversarial** (Haiku, 2 agentes): Un modelo diferente y más barato revisa las preguntas sin compartir contexto con el generador. Elimina sesgo de auto-validación.

## Cuando usar subagentes

- **1-5 preguntas de 1 solo tema**: Todo en el hilo principal, sin subagentes
- **6+ preguntas o 2+ temas**: Fase 1 ya ocurrió durante generación; lanzar 2 subagentes Haiku para revisión

## Preparación previa (Node.js, cero tokens)

Antes de lanzar subagentes, ejecutar:
```bash
node scripts/validate-questions.mjs $BATCH         # Checks 1-3 (schema, formato, duplicados)
node scripts/prep-validation-context.mjs $BATCH     # Context bundles (8 todotest matches/tema)
```

El segundo script produce un JSON con bundles por tema:
```json
{
  "bundles": [
    {
      "tema_id": "tema_07",
      "tema_name": "Señalización",
      "temario_file": "content/temario/tema_07.md",
      "question_count": 12,
      "questions": [...],
      "todotest_matches": [...],
      "todotest_match_count": 8
    }
  ]
}
```

## Fase 2: Subagentes Haiku (2 agentes)

Dividir los 12 temas en 2 grupos:
- **Agente A**: tema_01 a tema_06 (temas de normas y circulación)
- **Agente B**: tema_07 a tema_12 (temas de señalización, riesgos y sanciones)

### Prompt para cada subagente

Al lanzar con Task tool, usar `model: "haiku"`:

```
Task(
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "..."
)
```

Incluir en el prompt — el subagente DEBE leer estos archivos directamente (NO parafrasear ni resumir):
1. **Check 4 (datos)**: Leer `.claude/commands/validar-preguntas/check-4-datos.md`
2. **Check 5 (pedagógica)**: Leer `.claude/commands/validar-preguntas/check-5-pedagógica.md`
3. **Datos de referencia**: Leer `.claude/commands/validar-preguntas/datos-referencia.md`
4. **Temario**: Leer los `content/temario/tema_XX.md` files de sus temas asignados
5. **Preguntas + todotest**: Leer el bundles JSON y extraer solo sus temas
6. **Instrucción**: "Ejecuta CHECK 4 y CHECK 5 según las reglas de los archivos. Devuelve JSON con veredictos."

**NO usar `content/validation-prompt.md`** — los skill files contienen las reglas completas con ejemplos trabajados y arboles de decisión que el archivo combinado omite.

**Importante**: Los agentes Haiku NO comparten contexto con los generadores Opus. Esta separación elimina el sesgo de auto-validación.

### Preguntas con `"confianza": "baja"`

Si el generador marco alguna pregunta con `"confianza": "baja"`, el validador debe prestar atención extra a esa pregunta y considerar web search si las fuentes no confirman el dato.

## Formato de respuesta del subagente

```json
{
  "resultados": [
    {
      "id": "pregunta_XXXX",
      "check4_datos": {
        "veredicto": "PASS|REJECT|FLAG",
        "motivo": "texto explicativo",
        "fuentes": {
          "temario": {
            "evidencia": "DIRECTO|INDIRECTO|SIN MATCH",
            "detalle": "cita o descripción"
          },
          "todotest": {
            "evidencia": "DIRECTO|INDIRECTO|SIN MATCH",
            "detalle": "pregunta encontrada o descripción"
          },
          "claude": "lo que Claude sabe"
        },
        "necesita_web_search": false,
        "detalle_web_search": "que buscar si es necesario"
      },
      "check5_pedagógica": {
        "veredicto": "PASS|AUTO-REWRITE|REJECT",
        "motivo": "texto explicativo",
        "explicación_reescrita": "nueva explicación si AUTO-REWRITE, null si PASS"
      }
    }
  ]
}
```

## Después de recoger resultados

El hilo principal:
1. Reúne los resultados de los 2 subagentes
2. Si algun subagente marco `necesita_web_search: true`, ejecutar web search
3. Genera el informe final con todos los veredictos
4. Interactua con el usuario para revisiones manuales
5. Escribe el archivo `_validated.json`

## Comparación de costes

| Pipeline | Agentes | Modelo | Tokens estimados |
|----------|---------|--------|-----------------|
| Anterior | 4 validadores | Opus | ~324K Opus |
| Actual | 2 validadores | Haiku | ~100K Haiku (~15x más barato/token) |
