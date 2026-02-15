# CHECK 3: Deteccion de Duplicados (Dentro del Batch)

Compara cada pregunta contra las DEMAS preguntas del mismo batch para detectar copias o cuasi-copias.

## Alcance: Solo dentro del batch

**Batch = carpeta**: Un batch es todos los archivos JSON dentro de una misma carpeta (ej: `content/preguntas/batch_001/`).

**Se compara contra**: Todas las preguntas de todos los archivos JSON dentro de la misma carpeta del batch.

**NO se compara contra**:
- `content/todotest_2700.json` — es material fuente, las preguntas PUEDEN reutilizarse
- Otras carpetas de batch — batches diferentes PUEDEN tener preguntas solapadas intencionalmente
- Ningun archivo fuera de la carpeta del batch actual

**Razon**: Diferentes batches organizan contenido para diferentes propositos (por tipo, por tema, por seccion web). Es intencional que una misma pregunta aparezca en multiples batches.

## Caso especial: archivo suelto

Si el input es un archivo individual (no dentro de un subdirectorio con otros JSONs), el batch es solo ese archivo. Se comparan preguntas dentro del mismo archivo.

## Algoritmo paso a paso

Para cada pregunta del batch:

1. **Cargar todas las preguntas del batch** (todos los JSON de la carpeta)

2. **Comparar cada pregunta contra todas las demas del batch**
   - Extraer 2-3 palabras clave del enunciado (terminos especificos, no articulos ni preposiciones)
   - Ejemplo: "¿Cual es la tasa de alcohol maxima para un conductor novel?" -> keywords: `alcohol`, `novel`, `tasa`

3. **Para cada par de preguntas con keywords en comun**, evaluar similitud:
   - Leer ambos enunciados, opciones y respuestas correctas
   - Determinar si testean el mismo hecho exacto con la misma respuesta

4. **Decidir** segun los criterios abajo

## Criterios de decision con ejemplos

**DUPLICADO dentro del batch (REJECT)**:
```
ARCHIVO 1: "¿Cual es la tasa maxima de alcohol para un conductor novel?"
ARCHIVO 2: "¿Cual es la tasa de alcohol maxima permitida a un conductor novel?"
RAZON: Texto casi identico, misma respuesta, sin contexto adicional
-> REJECT: DUPLICADO dentro del batch — mantener una, rechazar la otra
```

**NO DUPLICADO (PASS)**:
```
ARCHIVO 1: "¿Cual es la tasa maxima de alcohol para un conductor novel?"
ARCHIVO 2: "Un conductor con permiso AM que acaba de obtener el B, ¿cual es su tasa maxima?"
RAZON: Mismo dato base (0,15 mg/l) PERO el segundo anade contexto sobre transicion de permisos
-> PASS: Contexto adicional aporta valor pedagogico
```

**POSIBLE DUPLICADO (FLAG para revision manual)**:
```
ARCHIVO 1: Pregunta sobre prioridad en glorieta
ARCHIVO 2: Pregunta similar sobre prioridad en glorieta con redaccion diferente
RAZON: No es copia textual pero cubre el mismo escenario exacto
-> FLAG: Mostrar ambas preguntas lado a lado para que el humano decida
```

## Regla general
- Si el texto es >80% identico y la respuesta es la misma -> REJECT
- Si cubre el mismo hecho/regla pero con contexto adicional que aporta valor -> PASS
- Si no estas seguro -> FLAG para revision manual (mostrar ambas preguntas)
