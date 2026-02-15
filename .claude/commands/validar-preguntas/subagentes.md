# Uso de Subagentes

## Cuando usar subagentes
- **1-5 preguntas**: Todo en el hilo principal, sin subagentes
- **6+ preguntas**: Dividir en grupos de 3-4 para checks 3 y 4

## Como dividir el trabajo

```
Hilo principal:
  1. Lee el JSON completo
  2. Ejecuta Check 1 (schema) y Check 2 (formato) en todas las preguntas
     (son rapidos, no necesitan I/O externo)
  3. Filtra las que pasaron checks 1+2
  4. Divide las preguntas restantes en grupos de 3-4

Subagente 1 (Task tool, subagent_type: "general-purpose"):
  - Recibe: preguntas 1-3 como JSON + TODAS las preguntas del batch (para dedup)
  - Ejecuta: Check 3 (duplicados) + Check 4 (datos) para cada una
  - Usa: Comparacion directa contra preguntas del batch (Check 3) + Grep en temario y todotest (Check 4)
  - Devuelve: veredicto por pregunta con evidencia

Subagente 2:
  - Igual para preguntas 4-6

Hilo principal (despues de recoger resultados):
  5. Si algun subagente marco una pregunta para web search, ejecutar aqui
  6. Ejecutar Check 5 (explicaciones) en todas
  7. Generar informe final
```

## Por que Grep y no leer todo el archivo
`todotest_2700.json` es grande (~2700 preguntas). Para CHECK 4 (fact-checking), cada subagente usa Grep para buscar palabras clave especificas del enunciado. Si la pregunta es sobre alcohol, grep busca "alcohol" + "tasa" y lee solo las 10-20 preguntas que matchean.

Para CHECK 3 (duplicados), el subagente recibe TODAS las preguntas del batch como parte de su prompt, y compara solo contra esas. No necesita leer archivos externos para dedup.

## Prompt para subagentes
Al lanzar un subagente con Task tool, incluir en el prompt:
- Las preguntas asignadas como JSON (las que debe validar)
- TODAS las preguntas del batch como JSON (para comparacion de duplicados)
- Instrucciones de Check 3 y Check 4 (copiar las secciones relevantes de `check-3-duplicados.md` y `check-4-datos.md`)
- Ruta a los archivos de referencia (temario y todotest para fact-checking)
- Formato esperado de respuesta (JSON con veredicto por pregunta)

## Formato de respuesta del subagente
```json
{
  "resultados": [
    {
      "id": "pregunta_001",
      "check3_duplicados": {
        "veredicto": "PASS|REJECT|FLAG",
        "motivo": "texto explicativo",
        "match_encontrado": "texto de la pregunta similar dentro del batch si existe",
        "match_id": "id de la pregunta duplicada dentro del batch"
      },
      "check4_datos": {
        "veredicto": "PASS|REJECT|FLAG",
        "motivo": "texto explicativo",
        "fuentes": {
          "temario": {
            "evidencia": "DIRECTO|INDIRECTO|SIN MATCH",
            "detalle": "cita o descripcion de lo encontrado",
            "linea": "numero de linea si aplica"
          },
          "todotest": {
            "evidencia": "DIRECTO|INDIRECTO|SIN MATCH",
            "detalle": "pregunta encontrada o descripcion",
            "todotest_id": "ID si aplica"
          },
          "claude": "lo que Claude sabe"
        },
        "necesita_web_search": true,
        "detalle_web_search": "que buscar si es necesario",
        "razon_web_search": "por que es necesario (ej: temario SIN MATCH + todotest SIN MATCH)"
      }
    }
  ]
}
```
