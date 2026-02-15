# Formato del Informe y Postinforme

## Formato del informe

El informe tiene 3 secciones. Usa formato ASCII para que sea legible en terminal.

```
========================================
INFORME DE VALIDACION
========================================
Archivo: [ruta al archivo]
Fecha: [fecha actual]
Total: [N] preguntas

APROBADAS: [X] | RECHAZADAS: [Y] | REVISION MANUAL: [Z]

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
REVISION MANUAL ([Z])
----------------------------------------

[id] - "[enunciado corto]"
  MOTIVO: [CONFLICTO DE DATOS|POSIBLE DUPLICADO|SIN COBERTURA|AMBIGUA]
  [tabla con fuentes si es conflicto de datos]
  [ambas preguntas si es posible duplicado]
  ACCION: ¿Aprobar, rechazar, o corregir?

[repetir para cada revision manual]

========================================
```

## Tabla de evidencia (OBLIGATORIA para cada pregunta en el informe)
```
  +-------------+------------+--------------------------------------+
  | Fuente      | Evidencia  | Dice                                 |
  +-------------+------------+--------------------------------------+
  | Pregunta    | —          | [lo que dice la pregunta]            |
  | Temario     | DIRECTO    | [cita exacta, linea X]               |
  |             | INDIRECTO  | [principio general, linea X]         |
  |             | SIN MATCH  | [busqueda realizada sin resultado]    |
  | Todotest    | DIRECTO    | [pregunta #ID, respuesta X]          |
  |             | INDIRECTO  | [pregunta relacionada #ID]           |
  |             | SIN MATCH  | [busqueda realizada sin resultado]    |
  | Claude      | —          | [lo que Claude sabe]                  |
  | Web         | —          | [resultado si se hizo busqueda]       |
  +-------------+------------+--------------------------------------+
```

**Regla**: Si Temario = SIN MATCH y Todotest = SIN MATCH, la columna Web es OBLIGATORIA.
Si la Web no se consulto en ese caso, el informe es INVALIDO.

---

## Interaccion post-informe

Despues de mostrar el informe, preguntar al usuario:

### 1. Preguntas aprobadas
Guardar automaticamente con `validada: true`. No preguntar al usuario — si pasaron los 5 checks, se guardan directamente.

### 2. Preguntas en revision manual
Para CADA pregunta en revision manual, usar AskUserQuestion:
"[id]: [enunciado corto]"
- Opcion: "Aprobar"
- Opcion: "Rechazar"
- Opcion: "Corregir" (pedir al usuario que indique la correccion)

Si el usuario elige "Corregir":
1. Pedirle que especifique que corregir
2. Aplicar la correccion en el JSON
3. Re-ejecutar los checks solo en esa pregunta corregida
4. Mostrar resultado de la re-validacion

### 3. Preguntas rechazadas
Clasificar las rechazadas en 2 categorias:

**Auto-corregibles** (ofrecer correccion automatica):
- Dato incorrecto pero todas las fuentes coinciden en el valor correcto -> corregir opciones + explicacion
- Acentos faltantes -> corregir automaticamente
- Explicacion contradice la respuesta pero el dato correcto es claro -> reescribir explicacion
- Explicacion correcta pero no cumple formato parrafo+bullets -> auto-rewrite al formato correcto
- Explicacion superficial (sin conexiones, sin bullets) -> auto-rewrite con contenido pedagogico

Para cada auto-corregible, usar AskUserQuestion:
"[N] preguntas rechazadas son auto-corregibles. ¿Corregir automaticamente?"
- Opcion: "Si, corregir y re-validar"
- Opcion: "No, dejar rechazadas"

**No auto-corregibles** (informar y descartar):
- Campo faltante (ej: explicacion) -> re-generar con `/generar-preguntas`
- Duplicado -> eliminar la copia
- Conflicto de datos sin consenso -> requiere investigacion manual

### 4. Guardar resultado (NO sobrescribir originales)

Los archivos originales NUNCA se modifican. El resultado se guarda en archivos nuevos con sufijo `_validated`.

**Regla de nombrado**:
- `test_main.json` -> `test_main_validated.json` (mismo directorio)
- `preguntas_2026-02-14.json` -> `preguntas_2026-02-14_validated.json`

**Contenido del archivo `_validated`**:
- Solo las preguntas aprobadas (incluyendo las de revision manual que el usuario aprobo/corrigio)
- Todas con `validada: true`
- Las rechazadas y duplicados NO se incluyen
- Si todas se rechazan, no crear el archivo `_validated`
