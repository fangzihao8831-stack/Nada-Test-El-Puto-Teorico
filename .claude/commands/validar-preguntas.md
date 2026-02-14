# Validar Preguntas DGT

Valida preguntas generadas antes de entrar al banco de Nadatest.

## Uso
```
/validar-preguntas [archivo o directorio]
```

Ejemplos:
- `/validar-preguntas content/preguntas/preguntas_2026-02-13.json` - valida un archivo
- `/validar-preguntas content/preguntas/` - valida todos los JSON del directorio

## Argumentos
- `$ARGUMENTS` contiene la ruta al archivo JSON o directorio a validar

## Instrucciones

1. Parsea `$ARGUMENTS` para determinar si es un archivo o directorio
2. Si es directorio, busca todos los `*.json` dentro con Glob — ese directorio es el **batch**
3. Si es un archivo individual, el batch es solo ese archivo
4. Lee cada archivo JSON y extrae el array de preguntas
5. Ejecuta los 5 checks en orden sobre cada pregunta
   - Checks 1+2 (schema, formato): en el hilo principal, son rapidos
   - Check 3 (duplicados): solo compara DENTRO del batch (misma carpeta)
   - Check 4 (fact-check): usa temario + todotest + Claude como fuentes
   - Check 5 (explicaciones): en el hilo principal
6. Para batches >5 preguntas, usa subagentes (Task tool) para checks 3+4
7. Web searches (dgt.es, boe.es) se ejecutan en hilo principal si hay conflictos
8. Genera el informe de validacion
9. Pregunta al usuario que hacer con cada categoria de resultado

---

# CONTEXTO DEL VALIDADOR

## Rol
Eres un auditor de calidad del banco de preguntas DGT para Nadatest. Tu trabajo es detectar errores antes de que lleguen al usuario final. Eres estricto pero justo: rechazas lo que esta mal, pero no rechazas preguntas buenas por exceso de celo.

## Fuentes de verdad (en orden de prioridad)
1. `temario_permiso_b_v3.md` - temario oficial del permiso B
2. `content/todotest_2700.json` - 2.700 preguntas extraidas de examen real
3. Tu conocimiento de la normativa de trafico espanola
4. Web search en dgt.es / boe.es (solo cuando las 3 fuentes anteriores no coinciden)

---

## CHECK 1: Validacion de Schema

Verifica la estructura JSON de cada pregunta. Estos son errores duros que causan REJECT inmediato.

### Campos obligatorios
| Campo | Tipo | Valores validos |
|-------|------|-----------------|
| `id` | string | Cualquier string no vacio |
| `subtema_id` | string | Formato `subtema_XX` |
| `tipo_pregunta` | string | `directa`, `situacional`, `completar`, `dato` |
| `enunciado` | string | No vacio |
| `opciones` | array | Exactamente 3 strings |
| `correcta` | int | 0, 1 o 2 |
| `explicacion` | string | No vacio |
| `pista` | string | No vacio |
| `requiere_imagen` | bool | Debe ser `true` |
| `tipo_imagen` | string | `senal`, `situacion`, `vehiculo`, `ninguna` |
| `origen` | string | `generada`, `extraida_dgt`, `extraida_todotest` |
| `validada` | bool | Cualquier valor (se cambiara a `true` si aprobada) |
| `usa_trampa` | bool | Cualquier valor |
| `palabras_trampa` | array | Array de strings (puede estar vacio) |

### Reglas de schema
- Si falta CUALQUIER campo obligatorio -> REJECT
- Si `opciones` no tiene exactamente 3 elementos -> REJECT
- Si `correcta` no es 0, 1 o 2 -> REJECT
- Si `tipo_pregunta` no es uno de los 4 valores validos -> REJECT
- Si `requiere_imagen` no es `true` -> REJECT

**Veredicto**: REJECT si cualquier regla falla. Indicar exactamente que campo y que error.

---

## CHECK 2: Formato e Idioma

Verifica la calidad del texto en espanol.

### Reglas
1. **Acentos**: Las palabras comunes deben tener acentos correctos (vehiculo, circulacion, senalizacion, limite, esta, podra, debera, etc.)
2. **Signos de interrogacion**: Las preguntas deben abrir con `?` (enunciado que termina en `?` debe empezar con `?`)
3. **Sin ingles**: No debe haber palabras en ingles ni artefactos de codigo en campos de texto (enunciado, opciones, explicacion, pista)
4. **Mayusculas en opciones**: Las opciones no deben empezar con minuscula, EXCEPTO en preguntas tipo `completar` donde la opcion continua la frase
5. **Espacios**: Sin espacios al inicio o final de campos de texto (trim)
6. **Puntos suspensivos**: Las preguntas tipo `completar` deben tener `...` en el enunciado

### Veredicto
- REJECT si los acentos faltan de forma sistematica (>50% de las palabras que los necesitan)
- WARN si hay problemas menores (1-2 acentos faltantes, espacios extra)
- PASS si todo esta correcto

---

## CHECK 3: Deteccion de Duplicados (Dentro del Batch)

Compara cada pregunta contra las DEMAS preguntas del mismo batch para detectar copias o cuasi-copias.

### Alcance: Solo dentro del batch

**Batch = carpeta**: Un batch es todos los archivos JSON dentro de una misma carpeta (ej: `content/preguntas/batch_001/`).

**Se compara contra**: Todas las preguntas de todos los archivos JSON dentro de la misma carpeta del batch.

**NO se compara contra**:
- `content/todotest_2700.json` — es material fuente, las preguntas PUEDEN reutilizarse
- Otras carpetas de batch — batches diferentes PUEDEN tener preguntas solapadas intencionalmente
- Ningun archivo fuera de la carpeta del batch actual

**Razon**: Diferentes batches organizan contenido para diferentes propositos (por tipo, por tema, por seccion web). Es intencional que una misma pregunta aparezca en multiples batches.

### Caso especial: archivo suelto

Si el input es un archivo individual (no dentro de un subdirectorio con otros JSONs), el batch es solo ese archivo. Se comparan preguntas dentro del mismo archivo.

### Algoritmo paso a paso

Para cada pregunta del batch:

1. **Cargar todas las preguntas del batch** (todos los JSON de la carpeta)

2. **Comparar cada pregunta contra todas las demas del batch**
   - Extraer 2-3 palabras clave del enunciado (terminos especificos, no articulos ni preposiciones)
   - Ejemplo: "?Cual es la tasa de alcohol maxima para un conductor novel?" -> keywords: `alcohol`, `novel`, `tasa`

3. **Para cada par de preguntas con keywords en comun**, evaluar similitud:
   - Leer ambos enunciados, opciones y respuestas correctas
   - Determinar si testean el mismo hecho exacto con la misma respuesta

4. **Decidir** segun los criterios abajo

### Criterios de decision con ejemplos

**DUPLICADO dentro del batch (REJECT)**:
```
ARCHIVO 1: "?Cual es la tasa maxima de alcohol para un conductor novel?"
ARCHIVO 2: "?Cual es la tasa de alcohol maxima permitida a un conductor novel?"
RAZON: Texto casi identico, misma respuesta, sin contexto adicional
-> REJECT: DUPLICADO dentro del batch — mantener una, rechazar la otra
```

**NO DUPLICADO (PASS)**:
```
ARCHIVO 1: "?Cual es la tasa maxima de alcohol para un conductor novel?"
ARCHIVO 2: "Un conductor con permiso AM que acaba de obtener el B, ?cual es su tasa maxima?"
RAZON: Mismo dato base (0,15 mg/l) PERO el segundo anade contexto sobre transicion de permisos
-> PASS: Contexto adicional aporta valor pedagogico
```

**NO DUPLICADO (PASS)**:
```
ARCHIVO 1: "Un turismo, ?cuando puede superar la velocidad maxima en 20 km/h?" (autopistas)
ARCHIVO 1: Pregunta similar sobre carreteras convencionales
RAZON: Misma regla (+20 km/h) PERO diferente tipo de via
-> PASS: Testea aplicacion diferente de la misma regla
```

**POSIBLE DUPLICADO (FLAG para revision manual)**:
```
ARCHIVO 1: Pregunta sobre prioridad en glorieta
ARCHIVO 2: Pregunta similar sobre prioridad en glorieta con redaccion diferente
RAZON: No es copia textual pero cubre el mismo escenario exacto
-> FLAG: Mostrar ambas preguntas lado a lado para que el humano decida
```

### Regla general
- Si el texto es >80% identico y la respuesta es la misma -> REJECT
- Si cubre el mismo hecho/regla pero con contexto adicional que aporta valor -> PASS
- Si no estas seguro -> FLAG para revision manual (mostrar ambas preguntas)

---

## CHECK 4: Verificacion de Datos (Check Principal)

Verifica que los datos de la pregunta son correctos contrastando 3+ fuentes.

### Fuentes (las 3 deben consultarse)
1. `temario_permiso_b_v3.md` - buscar con Grep la seccion relevante
2. `content/todotest_2700.json` - buscar preguntas sobre el mismo tema
3. Conocimiento propio de Claude sobre normativa de trafico espanola

### Algoritmo paso a paso

Para cada pregunta:

1. **Leer** enunciado, opciones, correcta y explicacion
2. **Identificar** que hecho/regla/dato se esta evaluando
3. **Buscar en temario** con Grep (ej: "novel" + "alcohol" para tasas de alcohol)
4. **Buscar en todotest** preguntas sobre el mismo tema
5. **Comparar** lo que dicen las 3 fuentes

### Que verificar por pregunta
- La opcion marcada como correcta (`opciones[correcta]`) es REALMENTE correcta?
- Las otras 2 opciones son REALMENTE incorrectas?
- La explicacion coincide con la respuesta correcta (no la contradice)?
- Todos los valores numericos son exactos (velocidades, distancias, tasas, puntos, plazos)?

### Escenarios de decision

**APROBADA - Las 3 fuentes coinciden**:
```
PREGUNTA: "?A que velocidad maxima puede circular un turismo en autopista?"
CORRECTA: "120 km/h"

Temario (Grep "velocidad" + "autopista" + "turismo"):
  -> "Turismo en autopista/autovia: 120 km/h" CHECK

Todotest (Grep "velocidad" + "autopista"):
  -> Preguntas confirman 120 km/h CHECK

Claude: 120 km/h para turismo en autopista CHECK

VEREDICTO: APROBADA (3 fuentes coinciden)
```

**RECHAZADA - Las fuentes contradicen la pregunta**:
```
PREGUNTA: "Los conductores noveles tienen una tasa maxima de 0,25 mg/l"
CORRECTA: esta opcion (indice 0)

Temario: "Novel < 2 anos: 0,15 mg/l aire" -> CONTRADICE
Todotest: preguntas dicen 0,15 mg/l -> CONTRADICE
Claude: 0,15 mg/l -> CONTRADICE

Todas contradicen -> lanzar web search para confirmar:
  WebSearch("tasa alcohol conductor novel mg/l", allowed_domains: ["dgt.es", "boe.es"])
  -> DGT.es confirma: 0,15 mg/l

VEREDICTO: RECHAZADA — pregunta dice 0,25 pero todas las fuentes dicen 0,15
```

**REVISION MANUAL - Fuentes en conflicto entre si**:
```
PREGUNTA: sobre un caso limite de la normativa

Temario dice: regla X
Todotest dice: regla Y
Claude: no esta seguro, se inclina por X

Web search DGT.es + BOE.es:
  -> sin resultado claro

VEREDICTO: FLAG PARA REVISION MANUAL
  Mostrar tabla con lo que dice cada fuente
  El humano decide si aprobar, rechazar o corregir
```

### Web search: cuando y como
- SOLO se lanza cuando las 3 fuentes principales no coinciden
- Dominios permitidos: `dgt.es`, `boe.es`
- Se ejecuta en el hilo principal (no en subagentes) para que el usuario vea las busquedas
- Si web search confirma una de las fuentes -> usar esa
- Si web search no aclara -> FLAG para revision manual

---

## CHECK 5: Revision Pedagogica de la Explicacion

Revisa la explicacion desde la perspectiva de un alumno que esta aprendiendo. No basta con que sea correcta — debe ENSENAR.

### 5A. Formato: parrafo corto + bullets en markdown

La explicacion se guarda como un solo string con formato markdown: un parrafo inicial (1-2 frases con la respuesta correcta y por que) seguido de una lista de bullets con detalles.

**Formato en el JSON**:
```json
"explicacion": "Parrafo corto con la respuesta correcta y la razon principal.\n\n- Bullet 1: por que las otras opciones estan mal o dato relevante\n- Bullet 2: excepcion, conexion con otro tema, o dato adicional\n- Bullet 3: dato extra o error comun de alumnos (opcional)"
```

**Ejemplo renderizado** (como se vera en la app):

> No llevar puesto el cinturon conlleva una sancion de 200 euros y la perdida de 4 puntos.
>
> - El cinturon es obligatorio para todos los ocupantes, en vias urbanas e interurbanas
> - Sin cinturon, el airbag puede causar lesiones graves en lugar de proteger
> - Unica excepcion: personas con certificado medico de exencion

**Reglas del formato**:
- Parrafo inicial: 1-2 frases. Respuesta correcta + por que es correcta.
- Bullets: 2-4 items. Cada uno empieza con mayuscula. Sin punto final.
- Separar parrafo y bullets con `\n\n` (doble salto de linea)
- NO usar headers (#), negrita (**), ni tablas dentro de la explicacion — solo texto plano + bullets
- Excepcion: tablas de datos numericos (velocidades, tasas) SI se permiten como ultimo item

### 5B. Conexiones con conocimiento relacionado

La explicacion debe conectar con al menos 1 nodo de conocimiento relacionado. Ejemplos:

```
PREGUNTA sobre cinturon (4 puntos):
  BUENA explicacion: "...Ademas, el conductor es responsable de que los menores lleven
  el SRI adecuado. Sin cinturon, el airbag puede causar lesiones graves en vez de proteger."
  -> Conecta con: SRI menores + airbag

  MALA explicacion: "La sancion es de 4 puntos y 200 euros."
  -> No conecta con nada, no ensena

PREGUNTA sobre ITV turismo (4 anos):
  BUENA explicacion: "...Despues de 10 anos de antiguedad la inspeccion es anual. Las
  motocicletas tienen un calendario diferente: primera ITV a los 5 anos."
  -> Conecta con: periodicidad post-10 anos + motos

  MALA explicacion: "La primera ITV es a los 4 anos."
  -> Repite la respuesta sin anadir valor
```

### 5C. Claridad desde perspectiva del alumno

- Usa lenguaje claro, evita jerga legal innecesaria
- Si hay un error comun de los alumnos, mencionarlo ("Muchos confunden 0,15 con 0,25...")
- Si la respuesta es contraintuitiva, explicar POR QUE sorprende

### 5D. Longitud minima
- Minimo 3 frases sustantivas (no cuenta repetir la pregunta ni frases vacias)
- Maximo 8 frases (no sobrecargar — ser conciso pero completo)

### Veredicto
- **AUTO-REWRITE** si la explicacion es correcta pero no cumple la estructura o es demasiado superficial. Claude reescribe automaticamente siguiendo la estructura y anade conexiones.
- **REJECT** si la explicacion contradice la respuesta correcta (error factual). Si auto-corregible (las fuentes coinciden en el dato correcto), se reescribe. Si no, FLAG para revision manual.
- **PASS** si cumple estructura, tiene conexiones, y es pedagogicamente util.

### Ejemplo de auto-rewrite

```
ORIGINAL (tv2_003):
  "La sancion por no usar el cinturon de seguridad es de 2 puntos."
  -> Falla: dato incorrecto + sin formato bullets + sin conexiones

AUTO-REWRITE:
  "No llevar puesto el cinturon de seguridad conlleva una sancion de 200 euros y la perdida de 4 puntos del permiso de conducir.\n\n- El cinturon es obligatorio para todos los ocupantes, en vias urbanas e interurbanas\n- El conductor es responsable de que los menores lleven el SRI adecuado\n- Sin cinturon, el airbag puede causar lesiones graves en lugar de proteger\n- Unica excepcion: personas con certificado medico de exencion"
  -> Corrige dato + formato parrafo+bullets + conecta con SRI y airbag
```

---

## USO DE SUBAGENTES

### Cuando usar subagentes
- **1-5 preguntas**: Todo en el hilo principal, sin subagentes
- **6+ preguntas**: Dividir en grupos de 3-4 para checks 3 y 4

### Como dividir el trabajo

```
Hilo principal:
  1. Lee el JSON completo
  2. Ejecuta Check 1 (schema) y Check 2 (formato) en todas las preguntas
     (son rapidos, no necesitan I/O externo)
  3. Filtra las que pasaron checks 1+2
  4. Divide las preguntas restantes en grupos de 3-4

Subagente 1 (Task tool, subagent_type: "general-purpose"):
  - Recibe: preguntas 1-3 como JSON + TODAS las preguntas del batch (para dedup)
  - Ejecuta: Check 3 (duplicados dentro del batch) + Check 4 (datos) para cada una
  - Usa: Comparacion directa contra preguntas del batch (Check 3) + Grep en temario_permiso_b_v3.md y todotest_2700.json (Check 4)
  - Devuelve: veredicto por pregunta con evidencia

Subagente 2:
  - Igual para preguntas 4-6

Subagente N:
  - Igual para el resto

Hilo principal (despues de recoger resultados):
  5. Si algun subagente marco una pregunta para web search, ejecutar aqui
  6. Ejecutar Check 5 (explicaciones) en todas
  7. Generar informe final
```

### Por que Grep y no leer todo el archivo
`todotest_2700.json` es grande (~2700 preguntas). Para CHECK 4 (fact-checking), cada subagente usa Grep para buscar palabras clave especificas del enunciado. Si la pregunta es sobre alcohol, grep busca "alcohol" + "tasa" y lee solo las 10-20 preguntas que matchean.

Para CHECK 3 (duplicados), el subagente recibe TODAS las preguntas del batch como parte de su prompt, y compara solo contra esas. No necesita leer archivos externos para dedup.

### Prompt para subagentes
Al lanzar un subagente con Task tool, incluir en el prompt:
- Las preguntas asignadas como JSON (las que debe validar)
- TODAS las preguntas del batch como JSON (para comparacion de duplicados)
- Instrucciones de Check 3 y Check 4 (copiar las secciones relevantes)
- Ruta a los archivos de referencia (temario y todotest para fact-checking)
- Formato esperado de respuesta (JSON con veredicto por pregunta)

Formato de respuesta del subagente:
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
          "temario": "lo que dice el temario",
          "todotest": "lo que dicen las preguntas de referencia",
          "claude": "lo que Claude sabe"
        },
        "necesita_web_search": true|false,
        "detalle_web_search": "que buscar si es necesario"
      }
    }
  ]
}
```

---

## FORMATO DEL INFORME

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
  MOTIVO: [CONFLICTO DE DATOS|POSIBLE DUPLICADO]
  [tabla con fuentes si es conflicto de datos]
  [ambas preguntas si es posible duplicado]
  ACCION: ?Aprobar, rechazar, o corregir?

[repetir para cada revision manual]

========================================
```

### Tabla de conflicto de datos (cuando aplica)
```
  +-------------+--------------------------------------+
  | Fuente      | Dice                                 |
  +-------------+--------------------------------------+
  | Pregunta    | [lo que dice la pregunta]             |
  | Temario     | [lo que dice el temario]              |
  | Todotest    | [lo que dicen preguntas similares]    |
  | Claude      | [lo que Claude sabe]                  |
  | Web (DGT)   | [resultado de busqueda web]           |
  | Web (BOE)   | [resultado de busqueda web]           |
  +-------------+--------------------------------------+
```

---

## INTERACCION POST-INFORME

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
- Dato incorrecto pero todas las fuentes coinciden en el valor correcto → corregir opciones + explicacion
- Acentos faltantes → corregir automaticamente
- Explicacion contradice la respuesta pero el dato correcto es claro → reescribir explicacion
- Explicacion correcta pero no cumple formato parrafo+bullets → auto-rewrite al formato correcto
- Explicacion superficial (sin conexiones, sin bullets) → auto-rewrite con contenido pedagogico

Para cada auto-corregible, usar AskUserQuestion:
"[N] preguntas rechazadas son auto-corregibles. ?Corregir automaticamente?"
- Opcion: "Si, corregir y re-validar"
- Opcion: "No, dejar rechazadas"

Si el usuario aprueba, aplicar las correcciones y re-ejecutar los checks en las preguntas corregidas.

**No auto-corregibles** (informar y descartar):
- Campo faltante (ej: explicacion) → re-generar con `/generar-preguntas`
- Duplicado → eliminar la copia
- Conflicto de datos sin consenso → requiere investigacion manual

Informar al usuario cuantas se rechazaron y los motivos. No guardar las no auto-corregibles.

### 4. Guardar resultado (NO sobrescribir originales)

Los archivos originales NUNCA se modifican. El resultado se guarda en archivos nuevos con sufijo `_validated`.

**Regla de nombrado**:
- `test_main.json` → `test_main_validated.json` (mismo directorio)
- `preguntas_2026-02-14.json` → `preguntas_2026-02-14_validated.json`

**Contenido del archivo `_validated`**:
- Solo las preguntas aprobadas (incluyendo las de revision manual que el usuario aprobo/corrigio)
- Todas con `validada: true`
- Las rechazadas y duplicados NO se incluyen
- Si todas se rechazan, no crear el archivo `_validated`

**Ventajas**:
- El original queda intacto como registro de lo que se genero
- Se puede hacer diff entre original y validated para ver que cambio
- Se puede re-validar el original si cambian las reglas

---

## DATOS DE REFERENCIA RAPIDA

Valores que el fact-checker debe conocer para comparar rapidamente:

### Velocidades (km/h)
| Via | Turismo | Con remolque | Camion/Bus |
|-----|---------|--------------|------------|
| Autopista/Autovia | 120 | 80 | 90 |
| Carretera convencional | 90 | 70 | 80 |
| Travesia | 50 | 50 | 50 |
| Zona urbana | 50 | - | - |
| Zona 30 | 30 | - | - |
| Zona 20 / residencial | 20 | - | - |

### Alcohol
| Conductor | Aire espirado | Sangre |
|-----------|---------------|--------|
| General | 0,25 mg/l | 0,5 g/l |
| Novel (< 2 anos) | 0,15 mg/l | 0,3 g/l |
| Profesional | 0,15 mg/l | 0,3 g/l |

### Distancias
| Distancia | Contexto |
|-----------|----------|
| 1,5 m | Separacion lateral ciclistas |
| 5 m | Estacionamiento desde interseccion |
| 15 m | Estacionamiento desde parada bus |
| 100 m | Distancia seguridad tunel |
| 150 m | Triangulos senalizacion averia |

### Tiempos
| Tiempo | Contexto |
|--------|----------|
| 2 horas / 200 km | Descanso obligatorio |
| 20-30 min | Duracion descanso |
| 2 minutos | Motor al ralenti maximo |
| 10 minutos | Espera entre pruebas alcoholemia |

### Puntos del permiso
| Situacion | Puntos |
|-----------|--------|
| Permiso nuevo | 8 |
| Tras 2 anos sin infracciones | 12 |
| Maximo acumulable | 15 |

---

## ARCHIVOS DE REFERENCIA
- Temario: `temario_permiso_b_v3.md`
- Todotest: `content/todotest_2700.json`
- Preguntas generadas: `content/preguntas/*.json`
- Pipeline: `content-pipeline.md`
- Generador (formato): `.claude/commands/generar-preguntas.md`
