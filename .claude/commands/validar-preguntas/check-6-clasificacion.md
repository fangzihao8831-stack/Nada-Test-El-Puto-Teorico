# CHECK 6: Clasificacion de Tipo y Dificultad

Reclasifica `tipo_pregunta` y `nivel` de cada pregunta aplicando los criterios objetivos de los skill files. El generador asigna tipo y nivel al crear la pregunta, pero no verifica su propia clasificacion. Este check corrige ambos campos.

## Paso 1: Clasificar tipo_pregunta

Leer el enunciado y aplicar estas reglas en orden (primera que encaje):

| Criterio | tipo_pregunta |
|----------|---------------|
| El enunciado es una frase incompleta que termina en "..." | `completar` |
| La respuesta correcta es un dato numerico concreto (velocidad, distancia, tasa, plazo, puntos, edad, porcentaje) | `dato` |
| El enunciado describe un escenario de conduccion con variables (tipo de via, clima, otros vehiculos, hora, posicion) y pregunta que HACER | `situacional` |
| El enunciado pregunta directamente sobre una regla sin escenario complejo | `directa` |

### Casos ambiguos

- Si el enunciado plantea un escenario pero la respuesta es un dato numerico → `dato` (el dato manda sobre el escenario)
- Si el enunciado usa "¿Es obligatorio...?", "¿Puede...?", "¿Esta permitido...?" sin variables de contexto → `directa`
- Si el enunciado combina escenario + pregunta conceptual (no sobre que hacer) → `directa`

## Paso 2: Clasificar nivel

Segun el tipo_pregunta asignado en Paso 1, aplicar los criterios del archivo correspondiente:

- `dato` → criterios de `generar-preguntas/dato.md`
- `directa` → criterios de `generar-preguntas/directo.md`
- `completar` → criterios de `generar-preguntas/completar.md`
- `situacional` → criterios de `generar-preguntas/situacional.md`

### Algoritmo de clasificacion de nivel

Analizar los DISTRACTORES (opciones incorrectas), no el enunciado:

**Nivel 1 (Facil)**: Los distractores son de contexto claramente distinto. Un alumno que conozca la regla basica no duda.

**Nivel 2 (Medio)**: Al menos un distractor es plausible — valor real del temario de una condicion adyacente, o regla que aplica en un escenario parecido. Un alumno descuidado podria elegirlo.

**Nivel 3 (Dificil)**: TODOS los distractores son reglas/valores reales del temario. Ninguna opcion se puede descartar por logica general. Solo se acierta conociendo la norma exacta.

**Nivel 4 (Muy Dificil)** — SOLO para `situacional`: Dos reglas reales parecen entrar en conflicto. Hay que saber cual prevalece. Las 3 opciones son muy plausibles incluso para alumnos con buen nivel.

### Test rapido de nivel

Preguntate: "¿Un alumno que ha estudiado el temario por encima puede descartar alguna opcion solo con sentido comun?"
- Si puede descartar 1+ opciones facilmente → Nivel 1
- Si puede descartar 1 pero duda entre 2 → Nivel 2
- Si no puede descartar ninguna sin conocer la norma exacta → Nivel 3
- Si las 3 opciones parecen correctas y necesita saber prioridad de reglas → Nivel 4

## Formato de salida

```json
{
  "check6_clasificacion": {
    "tipo_original": "directa",
    "tipo_corregido": "dato",
    "nivel_original": 1,
    "nivel_corregido": 2,
    "cambio": true,
    "motivo": "La respuesta es un umbral numerico (0,25 mg/l); el distractor B usa un valor real del mismo sistema (0,30 g/l en sangre) — nivel 2 por distractor plausible"
  }
}
```

Si no hay cambio:
```json
{
  "check6_clasificacion": {
    "tipo_original": "situacional",
    "tipo_corregido": "situacional",
    "nivel_original": 2,
    "nivel_corregido": 2,
    "cambio": false,
    "motivo": null
  }
}
```

## Aplicacion de correcciones

Las correcciones de tipo y nivel se aplican automaticamente al `_validated.json` junto con las correcciones de CHECK 4 y CHECK 5. No requieren aprobacion manual salvo que el validador tenga duda (en ese caso, marcar `"cambio": "FLAG"` en lugar de `true`).
