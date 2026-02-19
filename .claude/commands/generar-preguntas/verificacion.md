# Reglas de Verificación

## Rechazo automático (HARD REJECT)

Si una pregunta cumple CUALQUIERA de estos criterios, se descarta inmediatamente y se reescribe como escenario:

| Filtro | Detecta | Ejemplo de rechazo |
|--------|---------|-------------------|
| **Fecha/año en enunciado** | "¿Desde cuándo...?", "¿En qué año...?", "¿A partir de que fecha...?" | "¿Desde cuándo es obligatoria la V-16?" |
| **Pregunta sobre la norma en si** | "¿Qué dice la ley...?", "¿Qué establece el reglamento...?" | "¿Qué establece la ley sobre la V-16?" |
| **Trivia legislativa** | Preguntas cuya respuesta es un nombre de ley, decreto, o artículo | "¿En qué reglamento se regula la ITV?" |
| **Recitar definición** | "¿Qué es...?", "¿Cómo se define...?" sin contexto práctico | "¿Qué es la MMA?" (sin escenario de uso) |
| **Coste/precio** | Preguntas sobre cuanto cuesta algo | "¿Cuánto cuesta el curso de recuperación de puntos?" |
| **Estadística** | Datos estadísticos como porcentajes de accidentes | "¿Qué porcentaje de accidentes se debe al alcohol?" |

**Patrón de detección rápida**: Si el enunciado contiene "¿Desde cuándo", "¿En qué año", "¿A partir de que fecha", "¿Qué dice", "¿Qué establece", "¿Cómo se define", "¿Qué es el/la" → RECHAZAR.

**Acción tras rechazo**: Identificar la regla subyacente y reescribirla como pregunta de escenario (ver tabla de transformación en `generar-preguntas.md`).

---

## Verificación básica
- Cada pregunta DEBE verificarse contra el temario antes de incluirla
- Si un dato numérico no coincide con el temario, usar el temario como fuente de verdad
- Las explicaciones deben incluir excepciones e información adicional
- Acentos y n correctos en todo el texto
- Fechas solo en la explicación como info adicional, NUNCA en el enunciado ni opciones
- NO generar preguntas que se responden por sentido común sin conocimiento de tráfico
- NO generar preguntas donde la respuesta se adivina por el TONO de las opciones (ver "Anti-patrones" abajo)
- **Cada pregunta debe pedir al alumno APLICAR una regla, no RECITAR un dato** (ver regla fundamental en `generar-preguntas.md`)

---

## Regla del enunciado autosuficiente (CRÍTICA)

El enunciado + opciones DEBEN contener TODA la información necesaria para determinar la respuesta correcta. Si la respuesta cambia según un detalle no mencionado, el enunciado es DEFECTUOSO.

**Test de autosuficiencia**: Antes de finalizar cada pregunta situacional, preguntarse:
> "¿Podría alguien razonar la respuesta correcta SOLO con el texto, sin ver ninguna imagen?"

Si la respuesta es NO, hay que añadir contexto al enunciado.

**Factores que deben estar explícitos si afectan la respuesta**:
- Número de carriles y su configuración (solo giro, combinado, etc.)
- Tipo de via (urbana, interurbana, autopista, travesía)
- Presencia/ausencia de señalización (semáforos, señales, marcas viales)
- Condiciones de visibilidad o meteorológicas cuando sean relevantes
- Posición relativa de los vehículos implicados
- Tipo de intersección (glorieta, cruce en T, cruce regulado)

**Ejemplo MALO** (ambiguo — la respuesta depende de los carriles):
```
"Está detenido en un semáforo en rojo y el vehículo de detrás quiere girar
 con la flecha verde encendida. ¿Qué debe hacer?"
-> DEFECTUOSO: Si hay carril de giro exclusivo, el de atrás debería estar ahi.
   Si es carril compartido, usted podría estar obligado a girar.
```

**Ejemplo BUENO** (contexto completo):
```
"Está detenido en el carril izquierdo de una via de dos carriles por sentido.
 Su semáforo para seguir recto esta en rojo. El carril derecho tiene una flecha
 verde para girar a la derecha. El vehículo detrás de usted quiere girar a la
 derecha. ¿Qué debe hacer?"
-> CORRECTO: El contexto aclara que hay dos carriles y el de giro es otro.
   La respuesta es clara: quedarse quieto, el de atrás debe cambiar de carril.
```

---

## Clasificación de dependencia de imagen

Todas las preguntas tienen `requiere_imagen: true`, pero el generador debe distinguir internamente:

| Dependencia | Descripción | Acción |
|-------------|-------------|--------|
| **Suplementaria** | La imagen enriquece pero el texto basta para responder | El enunciado es autosuficiente tal cual |
| **Esencial** | La respuesta depende de elementos visuales (layout de carriles, posición exacta, señal concreta) | El enunciado DEBE describir esos elementos explícitamente hasta que las imagenes se generen |

Si durante la generación se detecta que una pregunta seria de dependencia "esencial", se DEBE:
1. Añadir al enunciado la descripción textual del contexto visual
2. O simplificar el escenario para que sea autosuficiente

---

## Verificación de escenarios situacionales

Para preguntas tipo `situacional`, verificar ANTES de incluir:

1. **¿El escenario exacto aparece en el temario o todotest?**
   - SI -> usar esa fuente como base de la pregunta
   - NO -> la pregunta se construye por DEDUCCION. Marcarla mentalmente como "deducida"

2. **¿La respuesta tiene UNA sola posibilidad correcta sin importar detalles no mencionados?**
   - SI -> pregunta válida
   - NO -> la pregunta es AMBIGUA. Añadir contexto o descartar

3. **¿La combinación de reglas crea un escenario que existe en la realidad?**
   - SI -> pregunta válida
   - NO -> escenario artificial que puede confundir más que enseñar. Simplificar

**Límite de complejidad**: Combinar máximo 2 reglas por pregunta. Si la combinación de 3+ reglas crea un escenario donde las fuentes primarias no lo cubren directamente, es preferible simplificar. Las preguntas más dificiles del DGT real combinan 2 reglas, no 3+.

---

## Calidad: Evitar Preguntas Obvias

**IMPORTANTE**: NO generar preguntas que cualquier persona responde correctamente por sentido común. Cada pregunta debe tener al menos UNO de estos elementos de dificultad:

| Elemento | Descripción | Ejemplo |
|----------|-------------|---------|
| **Excepción a regla conocida** | La respuesta correcta contradice lo que el alumno cree saber | Animales SI pueden circular por carretera convencional |
| **Opciones muy similares** | Las 3 opciones suenan razonables, difieren en un matiz | 0,15 vs 0,25 vs 0,30 mg/l |
| **Dato preciso confundible** | Número exacto que se confunde con otro parecido | 100m en túnel, 1,5m a ciclistas, 5m de intersección |
| **Combinación de reglas** | Requiere aplicar 2 reglas simultaneamente (max 2) | Prioridad en glorieta + vehículo especial |
| **Respuesta contraintuitiva** | La opción que "suena bien" es incorrecta | El profesor es el conductor en autoescuela, no el alumno |

---

## Anti-patrones de opciones (CRÍTICO — leer antes de escribir CUALQUIER opción)

Estos 5 patrones hacen que las preguntas se adivinen SIN conocimiento. Son defectos GRAVES.

### Anti-patrón 1: La correcta es siempre la más larga
**Problema**: Si la opción correcta tiene 30+ palabras y las incorrectas tienen 10-15, cualquiera elige la larga.
**Regla**: Las 3 opciones DEBEN tener longitud similar (diferencia máxima ~30%). Alternar: a veces la correcta es la MAS CORTA (como en el DGT real: "Sí.", "No.", "aumenta.").

Ejemplo BUENO (del DGT real):
```
"¿Es obligatorio detenerse ante barreras en movimiento?"
A: "Sí, pero solamente cuando el vehículo no pueda pasar." (12 palabras)
B: "No, puesto que no se encuentran en posición horizontal." (10 palabras)
C: "Sí." (1 palabra) ← CORRECTA
```

### Anti-patrón 2: Absolutos solo en opciones incorrectas
**Problema**: Si "nunca/siempre/en ningún caso" aparecen SOLO en opciones incorrectas, el alumno descarta sin pensar.
**Regla**: Los absolutos pueden aparecer en CUALQUIER opción. En el DGT real, "Sí" y "No" (absolutos) son frecuentemente correctos. NO segregar absolutos = incorrecto, matiz = correcto.

### Anti-patrón 3: La correcta suena "mas razonable"
**Problema**: La correcta siempre suena prudente/equilibrada; las incorrectas suenan extremas o negligentes. Heurística: "elige la más segura" funciona siempre.
**Regla**: Incluir preguntas donde la respuesta correcta es CONTRAINTUITIVA o suena MENOS segura. Ejemplo real: "La carga que sobresale de una motocicleta... NO es necesario señalizarla" (la opción menos segura es la correcta).

### Anti-patrón 4: La correcta se explica a si misma
**Problema**: La opción correcta contiene justificaciones internas ("porque esa es precisamente la condición", "ya que el sistema solo informa y no sustituye").
**Regla**: Las opciones son AFIRMACIONES ESCUETAS, no explicaciones. La justificación va en el campo `explicación`, NUNCA dentro del texto de la opción. Máximo 20 palabras por opción como objetivo (el DGT real rara vez supera 15).

Ejemplo MALO:
```
"Sí, porque la visibilidad es inferior a 50 metros y esa es precisamente la condición para usarla"
```
Ejemplo BUENO:
```
"Sí, la visibilidad es inferior a 50 metros."
```

### Anti-patrón 5: Distractores absurdos
**Problema**: Las opciones incorrectas dicen cosas que nadie elegiría ("Guardarlas en el maletero para que los bomberos las encuentren", "solo con autorización del ayuntamiento").
**Regla**: Cada distractor debe representar un ERROR REAL que cometen los alumnos o una REGLA DE OTRO CONTEXTO aplicada incorrectamente. Los distractores son reglas reales del temario, pero del subtema equivocado o con el dato equivocado.

Ejemplo BUENO de distractor (regla real, contexto equivocado):
```
Pregunta sobre ciclomotor. Distractor: "Necesita 2 espejos retrovisores"
(Regla real para motos >100 km/h, no para ciclomotores)
```

### Checklist final por pregunta (OBLIGATORIO)
Antes de incluir cada pregunta, verificar:
- [ ] ¿Puedo adivinar la correcta sin saber nada de tráfico? → Si es SÍ, REESCRIBIR
- [ ] ¿La correcta es claramente la más larga? → Si es SÍ, ACORTAR o alargar las otras
- [ ] ¿Las incorrectas tienen absolutos y la correcta no? → Si es SÍ, REDISTRIBUIR
- [ ] ¿La correcta contiene "porque", "ya que", "precisamente"? → Si es SÍ, ELIMINAR justificación
- [ ] ¿Las incorrectas suenan absurdas para alguien sin formación? → Si es SÍ, REESCRIBIR con errores reales

### Archivos de referencia de dificultad
Antes de generar, consultar estos archivos para calibrar el nivel de dificultad:
- `content/hardest_directa.json` — 57 preguntas directas dificiles
- `content/hardest_completar.json` — 133 preguntas completar dificiles
- `content/hardest_situacional.json` — 84 preguntas situacionales dificiles
- `content/hardest_dato.json` — 457 preguntas de datos numéricos confundibles

### Mezcla de dificultad por test
Un test de 30 preguntas debe tener esta distribución aproximada:
- **~10 faciles** (30%): Reglas básicas, respuesta clara por descarte
- **~12 medias** (40%): Requieren conocimiento específico pero sin trampa
- **~8 dificiles** (30%): Excepciones, datos confundibles, combinación de reglas
