# Reglas de Verificación

## Asignacion de subtema_id

El `subtema_id` se asigna segun el CONTENIDO de la pregunta, no segun el tema pedido. Consultar los marcadores `[subtema_XX]` en los archivos `tema_XX.md` para la lista completa.

**Errores frecuentes a evitar:**
- Pregunta sobre parada/estacionamiento → subtema_23 (no subtema_21 Adelantamientos)
- Pregunta sobre fatiga/sueño → subtema_46 (no subtema_43 Alcohol)
- Pregunta sobre el móvil al volante → subtema_47 Distracciones (no subtema_15)
- Pregunta sobre circular en autopista/autovía (prohibiciones, normas específicas) → subtema_32 (no subtema_16 Velocidad)
- Pregunta sobre adelantar ciclistas → subtema_21 (no subtema_35 Condiciones adversas)
- Pregunta sobre velocidad inadecuada vs exceso → subtema_16 Velocidad (no subtema_35 ni subtema_48)
- Pregunta sobre marcha atrás (distancia, prohibiciones) → subtema_18 (no subtema_35)

---

## Distribución de respuesta correcta (OBLIGATORIO)

La posición de la respuesta correcta (`correcta`: 0, 1 o 2) DEBE estar distribuida de forma equilibrada en cada batch. **NO generar todas las correctas en la misma posición.**

**Regla concreta para un batch de 30 preguntas:**
- correcta=0 (primera opción): 9-11 preguntas
- correcta=1 (segunda opción): 9-11 preguntas
- correcta=2 (tercera opción): 9-11 preguntas

**Cómo aplicarlo**: Al generar cada pregunta, escribir primero las 3 opciones en orden de calidad/claridad y luego asignar `correcta` según la posición donde quede la correcta. Al terminar el batch, contar la distribución y reordenar opciones de las preguntas necesarias para equilibrar. **La explicación describe el contenido de las opciones, no su posición, así que reordenar opciones nunca rompe la explicación.**

**Defecto detectado en batches anteriores**: El generador coloca sistemáticamente la correcta en posición 1 (opción B) el 90% de las veces. Esto permite a un alumno aprobar sin saber nada. INACEPTABLE.

---

## Rechazo automático (HARD REJECT)

Si una pregunta cumple CUALQUIERA de estos criterios, se descarta inmediatamente y se reescribe como escenario:

| Filtro | Detecta | Ejemplo de rechazo |
|--------|---------|-------------------|
| **Fecha/año en enunciado** | "¿Desde cuándo...?", "¿En qué año...?", "¿A partir de qué fecha...?" | "¿Desde cuándo es obligatoria la V-16?" |
| **Pregunta sobre la norma en sí** | "¿Qué dice la ley...?", "¿Qué establece el reglamento...?" | "¿Qué establece la ley sobre la V-16?" |
| **Trivia legislativa** | Preguntas cuya respuesta es un nombre de ley, decreto o artículo | "¿En qué reglamento se regula la ITV?" |
| **Recitar definición** | "¿Qué es...?", "¿Cómo se define...?" sin contexto práctico | "¿Qué es la MMA?" (sin escenario de uso) |
| **Coste/precio** | Preguntas sobre cuánto cuesta algo | "¿Cuánto cuesta el curso de recuperación de puntos?" |
| **Estadística** | Datos estadísticos como porcentajes de accidentes | "¿Qué porcentaje de accidentes se debe al alcohol?" |
| **Código de señal en texto** | El enunciado O alguna opción menciona R-XXX, P-XXX o S-XXX | "La señal R-303 prohíbe..." → usar "esta señal" + `codigo_señal`. En opciones: describir la señal por su efecto, no por código |
| **Cálculo o fórmula** | Pide calcular algo con fórmulas (V²/254, velocidad×tiempo, etc.) | "Si circula a 90 km/h, ¿cuál es su distancia de frenado?" |
| **Pregunta negativa** | "¿Cuál es INCORRECTO?", "¿Qué NO debe hacer?" | "¿Cuál de las siguientes acciones es incorrecta?" |
| **Artículo de ley** | Pide citar un artículo, código o decreto específico | "¿Qué artículo del Código Penal sanciona...?" |
| **Variación regional** | Pregunta sobre normas de una comunidad autónoma | "En Cataluña, ¿está permitido...?" |

**Patrón de detección rápida**: Si el enunciado contiene "¿Desde cuándo", "¿En qué año", "¿A partir de qué fecha", "¿Qué dice", "¿Qué establece", "¿Cómo se define", "¿Qué es el/la", o un código de señal (R-###, P-###, S-###) → RECHAZAR.

**Acción tras rechazo**: Identificar la regla subyacente y reescribirla como pregunta de escenario (ver tabla de transformación en `generar-preguntas.md`).

---

## Verificación de exactitud factual (OBLIGATORIO)

Estos tres controles se aplican a TODAS las preguntas con datos numéricos o respuestas sobre reglas de tráfico:

| Filtro | Detecta | Acción |
|--------|---------|--------|
| **Sin cita de temario** | Dato numérico sin sección fuente identificada | Identificar tema_XX.md que confirma el dato antes de conservar la pregunta. Si no se encuentra, eliminar el dato o marcar FLAG. |
| **Contradicción con Claude** | Respuesta correcta contradice el conocimiento general de Claude sobre tráfico español | Marcar FLAG para revisión humana. El temario es la autoridad del examen; la contradicción indica posible error en la pregunta. |
| **Secuencia monotónica en distractores** | Las 3 opciones forman una serie simple (ej: 70/80/90) de la misma categoría de la tabla | REDISTRIBUIR: usar valores de DISTINTAS condiciones del mismo escenario. Ver `patrones-y-trampas.md` para ejemplos. |

**Regla de cita de temario**: Ningún valor numérico se conserva sin verificarlo contra el temario. Si el generador no puede localizar el dato en el temario, el dato se elimina o se marca FLAG. La verificación es interna del generador — la explicación NO debe contener referencias a archivos (tema_XX.md). Ver `explicaciones.md` para las reglas de formato.

---

## Verificación básica
- Cada pregunta DEBE verificarse contra el temario antes de incluirla
- Si un dato numérico no coincide con el temario, usar el temario como fuente de verdad
- Las explicaciones deben incluir excepciones e información adicional
- Acentos y ñ correctos en todo el texto (á, é, í, ó, ú, ñ, ¿, ¡)
- Fechas solo en la explicación como información adicional, NUNCA en el enunciado ni en las opciones
- NO generar preguntas que se responden por sentido común sin conocimiento de tráfico
- NO generar preguntas donde la respuesta se adivina por el TONO de las opciones (ver "Anti-patrones" abajo)
- **Cada pregunta debe pedir al alumno APLICAR una regla, no RECITAR un dato** (ver regla fundamental en `generar-preguntas.md`)
- La justificación va en el campo `explicación`, nunca dentro de la opción

---

## Checklist de acentos (OBLIGATORIO)

Antes de finalizar cada pregunta, verificar que estos acentos estén correctos:
- [ ] ¿Qué, cuándo, cuánto, dónde, cómo, cuál (interrogativos siempre con acento)
- [ ] túnel, vía, está, sí (afirmación), vehículo, señalización, circulación
- [ ] kilómetros, prohíbe, también, semáforo, específica (adjetivo), difícil
- [ ] ¿Los signos de interrogación de apertura (¿) están presentes?
- [ ] ¿La ñ está donde corresponde? (señal, España, año, daño, enseñar)

---

## Detección de duplicados entre batches

Antes de generar preguntas, escanear las preguntas existentes en `content/preguntas/` para evitar duplicar escenarios. NO generar preguntas sobre el mismo tema que ya existe en otro batch (ej: luces en túnel, prioridad en glorieta con el mismo planteamiento).

---

## Regla del enunciado autosuficiente (CRÍTICA)

El enunciado + opciones DEBEN contener TODA la información necesaria para determinar la respuesta correcta. Si la respuesta cambia según un detalle no mencionado, el enunciado es DEFECTUOSO.

**Test de autosuficiencia**: Antes de finalizar cada pregunta situacional, preguntarse:
> "¿Podría alguien razonar la respuesta correcta SOLO con el texto, sin ver ninguna imagen?"

Si la respuesta es NO, hay que añadir contexto al enunciado.

**Factores que deben estar explícitos si afectan la respuesta**:
- Número de carriles y su configuración (solo giro, combinado, etc.)
- Tipo de vía (urbana, interurbana, autopista, travesía)
- Presencia/ausencia de señalización (semáforos, señales, marcas viales)
- Condiciones de visibilidad o meteorológicas cuando sean relevantes
- Posición relativa de los vehículos implicados
- Tipo de intersección (glorieta, cruce en T, cruce regulado)

**Ejemplo MALO** (ambiguo — la respuesta depende de los carriles):
```
"Está detenido en un semáforo en rojo y el vehículo de detrás quiere girar
 con la flecha verde encendida. ¿Qué debe hacer?"
-> DEFECTUOSO: Si hay carril de giro exclusivo, el de atrás debería estar ahí.
   Si es carril compartido, usted podría estar obligado a girar.
```

**Ejemplo BUENO** (contexto completo):
```
"Está detenido en el carril izquierdo de una vía de dos carriles por sentido.
 Su semáforo para seguir recto está en rojo. El carril derecho tiene una flecha
 verde para girar a la derecha. El vehículo detrás de usted quiere girar a la
 derecha. ¿Qué debe hacer?"
-> CORRECTO: El contexto aclara que hay dos carriles y el de giro es otro.
   La respuesta es clara: quedarse quieto, el de atrás debe cambiar de carril.
```

---

## Señales de tráfico e imágenes

Todas las preguntas tendrán imagen asociada (generada por un skill separado). El generador NO debe incluir campos `requiere_imagen` ni `tipo_imagen` en el JSON — estos campos han sido eliminados del schema.

**Cuando la pregunta trata de una señal específica:**
1. Usar "esta señal" en el enunciado (NUNCA el código R-XXX, P-XXX, S-XXX)
2. Las opciones TAMPOCO deben mencionar códigos — describir la señal por su efecto (ej: "la señal que prohíbe vehículos de motor excepto motos sin sidecar" en vez de "la señal R-103")
3. Incluir el campo `codigo_señal` con el código real (ej: `"codigo_señal": "R-2"`)
4. Este campo conecta la pregunta con la imagen correcta de la señal
5. El código de señal SOLO puede aparecer en el campo `explicacion` como dato de referencia

**Cuando la pregunta NO trata de una señal:** poner `"codigo_señal": null`.

**Enunciado autosuficiente**: Aunque la imagen acompañe, el enunciado debe describir toda la información necesaria para responder. Si la respuesta depende de un detalle visual (layout de carriles, posición de vehículos), ese detalle DEBE estar descrito en el texto.

---

## Campo pista (OBLIGATORIO)

La `pista` aparece en modo estudio ANTES de que el alumno responda. Es una ayuda opcional, no un spoiler.

**Reglas:**
- Máximo 20 palabras
- NUNCA revela la respuesta directamente
- NUNCA menciona la opción correcta ("la B", "la segunda")

**Dos estilos según el tipo de pregunta:**

| Estilo | Cuándo usar | Ejemplo |
|--------|-------------|---------|
| **Mnemónico** | Preguntas de dato, regla directa, completar | *"El límite novel es exactamente la mitad que el general."* |
| **Razonamiento** | Preguntas situacionales, combinación de reglas | *"Piensa qué ocurre si el vehículo retrocede en la pendiente."* |

**Test de calidad**: Si leyendo la pista ya sabes la respuesta sin pensar, la pista es mala. Si después de leerla necesitas APLICAR lo que dice para elegir, es buena.

---

## Verificación de escenarios situacionales

Para preguntas tipo `situacional`, verificar ANTES de incluir:

1. **¿El escenario exacto aparece en el temario o todotest?**
   - SÍ → usar esa fuente como base de la pregunta
   - NO → la pregunta se construye por DEDUCCIÓN. Marcarla mentalmente como "deducida"

2. **¿La respuesta tiene UNA sola posibilidad correcta sin importar detalles no mencionados?**
   - SÍ → pregunta válida
   - NO → la pregunta es AMBIGUA. Añadir contexto o descartar

3. **¿La combinación de reglas crea un escenario que existe en la realidad?**
   - SÍ → pregunta válida
   - NO → escenario artificial que puede confundir más que enseñar. Simplificar

**Límite de complejidad**: Combinar máximo 2 reglas por pregunta. Si la combinación de 3+ reglas crea un escenario donde las fuentes primarias no lo cubren directamente, es preferible simplificar. Las preguntas más difíciles del DGT real combinan 2 reglas, no 3+.

---

## Calidad: Evitar Preguntas Obvias

**IMPORTANTE**: NO generar preguntas que cualquier persona responde correctamente por sentido común. Cada pregunta debe tener al menos UNO de estos elementos de dificultad:

| Elemento | Descripción | Ejemplo |
|----------|-------------|---------|
| **Excepción a regla conocida** | La respuesta correcta contradice lo que el alumno cree saber | Animales SÍ pueden circular por carretera convencional |
| **Opciones muy similares** | Las 3 opciones suenan razonables, difieren en un matiz | 0,15 vs 0,25 vs 0,30 mg/l |
| **Dato preciso confundible** | Número exacto que se confunde con otro parecido | 100m en túnel, 1,5m a ciclistas, 5m de intersección |
| **Combinación de reglas** | Requiere aplicar 2 reglas simultáneamente (máx 2) | Prioridad en glorieta + vehículo especial |
| **Respuesta contraintuitiva** | La opción que "suena bien" es incorrecta | El profesor es el conductor en autoescuela, no el alumno |

---

## Anti-patrones de opciones (CRÍTICO — leer antes de escribir CUALQUIER opción)

Estos 3 patrones hacen que las preguntas se adivinen SIN conocimiento. Son defectos GRAVES.

### Anti-patrón 1: Absolutos solo en opciones incorrectas
**Problema**: Si "nunca/siempre/en ningún caso" aparecen SOLO en opciones incorrectas, el alumno descarta sin pensar.
**Regla**: Los absolutos pueden aparecer en CUALQUIER opción. En el DGT real, "Sí" y "No" (absolutos) son frecuentemente correctos. NO segregar absolutos = incorrecto, matiz = correcto.

### Anti-patrón 2: La correcta suena "más razonable"
**Problema**: La correcta siempre suena prudente/equilibrada; las incorrectas suenan extremas o negligentes. Heurística: "elige la más segura" funciona siempre.
**Regla**: Incluir preguntas donde la respuesta correcta es CONTRAINTUITIVA o suena MENOS segura. Ejemplo real: "La carga que sobresale de una motocicleta... NO es necesario señalizarla" (la opción menos segura es la correcta).

### Anti-patrón 3: Distractores absurdos
**Problema**: Las opciones incorrectas dicen cosas que nadie elegiría ("Guardarlas en el maletero para que los bomberos las encuentren", "solo con autorización del ayuntamiento").
**Regla**: Cada distractor debe representar un ERROR REAL que cometen los alumnos o una REGLA DE OTRO CONTEXTO aplicada incorrectamente. Los distractores son reglas reales del temario, pero del subtema equivocado o con el dato equivocado.

Ejemplo BUENO de distractor (regla real, contexto equivocado):
```
Pregunta sobre ciclomotor. Distractor: "Necesita 2 espejos retrovisores"
(Regla real para motos >100 km/h, no para ciclomotores)
```

### Checklist final por pregunta (OBLIGATORIO)
Antes de incluir cada pregunta, verificar:
- [ ] ¿Tiene campo `dificultad` con las 6 dimensiones (d_reglas, d_excepcion, d_densidad, d_implicito, d_distractores, d_contraintuitivo), total y nivel? → Si NO, AÑADIR. Ver `tipos-preguntas.md` para la rubrica completa.
- [ ] ¿El `nivel` coincide con el `total` segun la tabla de mapeo (0-2=L1, 3-5=L2, 6-7=L3, 8-9=L4)? → Si NO, CORREGIR
- [ ] ¿Para tipos dato/directo/completar, el nivel maximo es 3 aunque el total sea 8-9? → Si NO, CORREGIR
- [ ] ¿Cada dimension tiene una justificacion logica? (ej: d_reglas=2 pero solo se necesita 1 regla → CORREGIR)
- [ ] ¿Tiene campo `pista` (máx 20 palabras, no revela respuesta)? → Si NO, AÑADIR
- [ ] ¿Tiene `subtema_id` correcto según la tabla de subtemas de arriba? → Si NO, CORREGIR
- [ ] ¿Puedo adivinar la correcta sin saber nada de tráfico? → Si es SÍ, REESCRIBIR
- [ ] ¿Las incorrectas tienen absolutos y la correcta no? → Si es SÍ, REDISTRIBUIR
- [ ] ¿Las incorrectas suenan absurdas para alguien sin formación? → Si es SÍ, REESCRIBIR con errores reales

- [ ] ¿Todos los acentos están correctos? (ver checklist de acentos arriba)
- [ ] ¿La explicación contiene "tema_XX.md" o cualquier nombre de archivo? → Si es SÍ, ELIMINAR la referencia al archivo
- [ ] ¿La explicación referencia opciones por letra ("la opción A", "la opción B")? → Si es SÍ, REESCRIBIR citando el contenido de la opción en vez de la letra
- [ ] ¿El enunciado O alguna opción menciona un código de señal (R-XXX, P-XXX, S-XXX)? → Si es SÍ, reemplazar por descripción funcional y poner código solo en `codigo_señal`
- [ ] ¿Hay algún valor numérico sin verificar contra el temario? → Si es SÍ, buscar en tema_XX.md y confirmar antes de conservar. NO escribir "tema_XX.md" en la explicación
- [ ] ¿La respuesta correcta contradice lo que Claude sabe sobre tráfico español? → Si es SÍ, marcar FLAG para revisión humana
- [ ] ¿Las 3 opciones forman una secuencia monotónica (ej: 70/80/90) de la misma categoría? → Si es SÍ, REDISTRIBUIR con valores de condiciones distintas
- [ ] ¿La pregunta pide calcular algo con fórmulas? → Si es SÍ, RECHAZAR (DGT solo pregunta recall)
- [ ] ¿La pregunta usa formato negativo ("¿Cuál es INCORRECTO?")? → Si es SÍ, RECHAZAR (DGT nunca usa este formato)

### Checklist de batch completo (AL TERMINAR las 30 preguntas)
- [ ] ¿La distribución de `correcta` es equilibrada? Contar: correcta=0 debe ser 9-11, correcta=1 debe ser 9-11, correcta=2 debe ser 9-11. Si NO, reordenar opciones en las preguntas necesarias
- [ ] ¿Hay dos preguntas sobre el mismo tema/dato específico? → Si es SÍ, reemplazar una por otro tema
