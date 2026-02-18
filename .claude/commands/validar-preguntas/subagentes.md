# Uso de Subagentes (Per-Tema)

## Estrategia: Shift-Left + Lightweight Review

La validacion se divide en dos fases:

1. **Generacion con auto-validacion** (Opus, 4 agentes): El generador verifica sus propios datos contra el temario mientras genera. Cubre ~90% de errores a coste cero.
2. **Revision adversarial** (Haiku, 2 agentes): Un modelo diferente y mas barato revisa las preguntas sin compartir contexto con el generador. Elimina sesgo de auto-validacion.

## Cuando usar subagentes

- **1-5 preguntas de 1 solo tema**: Todo en el hilo principal, sin subagentes
- **6+ preguntas o 2+ temas**: Fase 1 ya ocurrio durante generacion; lanzar 2 subagentes Haiku para revision

## Preparacion previa (Node.js, cero tokens)

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
      "tema_name": "Senalizacion",
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
- **Agente A**: tema_01 a tema_06 (temas de normas y circulacion)
- **Agente B**: tema_07 a tema_12 (temas de senalizacion, riesgos y sanciones)

### Prompt para cada subagente

Al lanzar con Task tool, usar `model: "haiku"`:

```
Task(
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "..."
)
```

Incluir en el prompt:
1. **Reglas**: Pedir al subagente que lea `content/validation-prompt.md`
2. **Temario**: Pedir al subagente que lea los temario files de sus temas
3. **Preguntas + todotest**: Pedir que lea el bundles JSON y extraiga solo sus temas
4. **Instruccion**: "Ejecuta CHECK 4 (datos) y CHECK 5 (pedagogica). Devuelve JSON con veredictos."

**Importante**: Los agentes Haiku NO comparten contexto con los generadores Opus. Esta separacion elimina el sesgo de auto-validacion.

### Preguntas con `"confianza": "baja"`

Si el generador marco alguna pregunta con `"confianza": "baja"`, el validador debe prestar atencion extra a esa pregunta y considerar web search si las fuentes no confirman el dato.

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
            "detalle": "cita o descripcion"
          },
          "todotest": {
            "evidencia": "DIRECTO|INDIRECTO|SIN MATCH",
            "detalle": "pregunta encontrada o descripcion"
          },
          "claude": "lo que Claude sabe"
        },
        "necesita_web_search": false,
        "detalle_web_search": "que buscar si es necesario"
      },
      "check5_pedagogica": {
        "veredicto": "PASS|AUTO-REWRITE|REJECT",
        "motivo": "texto explicativo",
        "explicacion_reescrita": "nueva explicacion si AUTO-REWRITE, null si PASS"
      }
    }
  ]
}
```

## Despues de recoger resultados

El hilo principal:
1. Reune los resultados de los 2 subagentes
2. Si algun subagente marco `necesita_web_search: true`, ejecutar web search
3. Genera el informe final con todos los veredictos
4. Interactua con el usuario para revisiones manuales
5. Escribe el archivo `_validated.json`

## Comparacion de costes

| Pipeline | Agentes | Modelo | Tokens estimados |
|----------|---------|--------|-----------------|
| Anterior | 4 validadores | Opus | ~324K Opus |
| Actual | 2 validadores | Haiku | ~100K Haiku (~15x mas barato/token) |
