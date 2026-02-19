# Formato del Informe y Postinforme

## Formato del informe

El informe tiene 3 secciones. Usa formato ASCII para que sea legible en terminal.

```
========================================
INFORME DE VALIDACIÓN
========================================
Archivo: [ruta al archivo]
Fecha: [fecha actual]
Total: [N] preguntas

APROBADAS: [X] | RECHAZADAS: [Y] | REVISIÓN MANUAL: [Z]

----------------------------------------
APROBADAS ([X])
----------------------------------------

[id] - "[enunciado corto]"
  Checks: Schema OK | Formato OK | No duplicada | Datos verificados ([detalle breve])

[repetir para cada aprobada]

----------------------------------------
RECHAZADAS ([Y])
----------------------------------------

[id] - "[enunciado corto]"
  MOTIVO: [SCHEMA|FORMATO|DUPLICADO|DATO INCORRECTO|EXPLICACION CONTRADICE]
  [detalle del error]
  [si es duplicado: mostrar pregunta original]
  [si es dato incorrecto: mostrar que dice cada fuente]

[repetir para cada rechazada]

----------------------------------------
REVISIÓN MANUAL ([Z])
----------------------------------------

[id] - "[enunciado corto]"
  MOTIVO: [CONFLICTO DE DATOS|POSIBLE DUPLICADO|SIN COBERTURA|AMBIGUA]
  [tabla con fuentes si es conflicto de datos]
  [ambas preguntas si es posible duplicado]
  ACCIÓN: ¿Aprobar, rechazar, o corregir?

[repetir para cada revisión manual]

========================================
```

## Tabla de evidencia (OBLIGATORIA para cada pregunta en el informe)
```
  +-------------+------------+--------------------------------------+
  | Fuente      | Evidencia  | Dice                                 |
  +-------------+------------+--------------------------------------+
  | Pregunta    | —          | [lo que dice la pregunta]            |
  | Temario     | DIRECTO    | [cita exacta, línea X]               |
  |             | INDIRECTO  | [principio general, línea X]         |
  |             | SIN MATCH  | [búsqueda realizada sin resultado]    |
  | Todotest    | DIRECTO    | [pregunta #ID, respuesta X]          |
  |             | INDIRECTO  | [pregunta relacionada #ID]           |
  |             | SIN MATCH  | [búsqueda realizada sin resultado]    |
  | Claude      | —          | [lo que Claude sabe]                  |
  | Web         | —          | [resultado si se hizo búsqueda]       |
  +-------------+------------+--------------------------------------+
```

**Regla**: Si Temario = SIN MATCH y Todotest = SIN MATCH, la columna Web es OBLIGATORIA.
Si la Web no se consulto en ese caso, el informe es INVÁLIDO.

---

## Interacción post-informe

Después de mostrar el informe, preguntar al usuario:

### 1. Preguntas aprobadas
Guardar automáticamente con `validada: true`. No preguntar al usuario — si pasaron los 5 checks, se guardan directamente.

### 2. Preguntas en revisión manual
Para CADA pregunta en revisión manual, usar AskUserQuestion:
"[id]: [enunciado corto]"
- Opción: "Aprobar"
- Opción: "Rechazar"
- Opción: "Corregir" (pedir al usuario que indique la corrección)

Si el usuario elige "Corregir":
1. Pedirle que especifique que corregir
2. Aplicar la corrección en el JSON
3. Re-ejecutar los checks solo en esa pregunta corregida
4. Mostrar resultado de la re-validación

### 3. Preguntas rechazadas
Clasificar las rechazadas en 2 categorías:

**Auto-corregibles** (ofrecer corrección automática):
- Dato incorrecto pero todas las fuentes coinciden en el valor correcto -> corregir opciones + explicación
- Acentos faltantes -> corregir automáticamente
- Explicación contradice la respuesta pero el dato correcto es claro -> reescribir explicación
- Explicación correcta pero no cumple formato párrafo+bullets -> auto-rewrite al formato correcto
- Explicación superficial (sin conexiones, sin bullets) -> auto-rewrite con contenido pedagógico

Para cada auto-corregible, usar AskUserQuestion:
"[N] preguntas rechazadas son auto-corregibles. ¿Corregir automáticamente?"
- Opción: "Si, corregir y re-validar"
- Opción: "No, dejar rechazadas"

**No auto-corregibles** (informar y descartar):
- Campo faltante (ej: explicación) -> re-generar con `/generar-preguntas`
- Duplicado -> eliminar la copia
- Conflicto de datos sin consenso -> requiere investigación manual

### 4. Guardar resultado (NO sobrescribir originales)

**REGLA CRÍTICA: JAMAS modificar el archivo original.**
Todas las correcciones (auto-correcciones, reescrituras de enunciado, cambios de explicación) se aplican SOLO en el archivo `_validated`. El archivo original queda intacto como registro de lo que se genero.

**Prohibido**: Usar Edit/Write sobre el archivo original para aplicar correcciones.
**Obligatorio**: Construir el archivo `_validated` desde cero con las versiones corregidas.

**Razón**: El original es el registro histórico. El diff entre original y validated muestra exactamente que cambio el validador. Si se modifica el original, se pierde esa trazabilidad.

**Regla de nombrado**:
- `test_main.json` -> `test_main_validated.json` (mismo directorio)
- `preguntas_2026-02-14.json` -> `preguntas_2026-02-14_validated.json`

**Contenido del archivo `_validated`**:
- Solo las preguntas aprobadas (incluyendo las de revisión manual que el usuario aprobo/corrigio)
- Todas con `validada: true`
- Las correcciones de enunciado, opciones o explicaciones se aplican AQUI, no en el original
- Las rechazadas y duplicados NO se incluyen
- Si todas se rechazan, no crear el archivo `_validated`
