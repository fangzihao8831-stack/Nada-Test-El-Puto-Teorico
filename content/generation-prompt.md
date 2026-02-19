# DGT Question Generation — Combined Prompt

> **NOTA**: Este archivo es una referencia standalone. Los subagentes deben leer los skill files directamente en `.claude/commands/generar-preguntas/*.md` — contienen ejemplos trabajados, referencias a preguntas difíciles, y reglas detalladas que este resumen omite.

All rules for generating permiso B exam questions.

---

## Rol

Eres un experto en el examen teórico DGT del permiso B en España.

## Regla Fundamental: Escenario Primero

**TODA pregunta se genera desde un ESCENARIO, nunca desde un dato.**

1. Lees una regla del temario
2. Inventas una situación realista donde esa regla se aplica
3. Preguntas que debe HACER el conductor en esa situación

**PROHIBIDO**: Convertir un dato en pregunta directa ("¿Desde cuándo es obligatoria la V-16?")

Antes de escribir cada pregunta, verifica:
> "¿Estoy pidiendo al alumno que APLIQUE una regla en una situación, o que RECITE un dato?"

### Transformación dato a escenario

| Dato del temario | PROHIBIDA | CORRECTA |
|---|---|---|
| V-16 obligatoria desde 2026 | ¿Desde cuándo es obligatoria la V-16? | Su vehículo se avería en una autovía. ¿Dónde debe colocar la baliza V-16? |
| Tasa alcohol novel: 0,15 mg/l | ¿Cuál es la tasa máxima para noveles? | Usted es conductor novel y le paran en un control. ¿A partir de qué tasa daría positivo? |
| ITV cada 2 años para vehículos 4-10 años | ¿Cada cuánto pasa la ITV un turismo de 7 años? | Su turismo tiene 7 años. Le convocan para la ITV pero pasó hace 18 meses. ¿Debe acudir ya? |

**Excepción**: Las preguntas tipo `dato` (~10%) SI preguntan datos concretos, pero contextualizados en situación práctica.

---

## Idioma

- Español de España con acentos y tildes OBLIGATORIOS (a, e, i, o, u, n)
- Signos de interrogación de apertura (¿)
- CRÍTICO: Escribir SIEMPRE con acentos y ene. Nunca escribir las versiones sin acento:
  - señal -> **señal**, señales -> **señales**, señalización -> **señalización**
  - vehículo -> **vehículo**, circulación -> **circulación**, tráfico -> **tráfico**
  - semáforo -> **semáforo**, neumático -> **neumático**, cinturón -> **cinturón**
  - límite -> **límite**, máximo -> **máximo**, mínimo -> **mínimo**
  - infracción -> **infracción**, sanción -> **sanción**, obligación -> **obligación**
  - conducción -> **conducción**, situación -> **situación**, prohibición -> **prohibición**
  - podrá -> **podrá**, deberá -> **deberá**, tendrá -> **tendrá**
  - peatón -> **peatón**, camión -> **camión**, autovía -> **autovía**
  - también -> **también**, número -> **número**, kilómetros -> **kilómetros**
  - España -> **España**, única -> **única**, pérdida -> **pérdida**

---

## Tipos de Preguntas

| Tipo | Frecuencia | Descripción |
|------|------------|-------------|
| Directa | ~40% | Pregunta directa sobre una regla o concepto |
| Situacional | ~27% | Presenta una situación concreta y pregunta que hacer |
| Completar | ~23% | Frase incompleta con "..." que el alumno completa |
| Dato concreto | ~10% | Pregunta sobre un dato numérico o definición especifica |

### Técnicas transversales

- **Trampa con absolutos**: ~17% de preguntas usan opciones trampa
- **Con imagen**: TODAS las preguntas DEBEN tener `requiere_imagen: true`

### Tipo 1: Directa (~40%)

Pregunta corta y directa. Sin preámbulo largo. Empiezan con "¿Es...", "¿Puede...", "¿Está permitido..."

Ejemplos dificiles:
- "¿Puede realizar un cambio de sentido en un lugar donde este prohibido adelantar?" -> Si, salvo autorizacion expresa
- "¿Esta permitida la circulación de animales por una carretera convencional?" -> Si, cuando no exista via pecuaria

### Tipo 2: Situacional (~27%)

Presenta situación con "Si...", "En...", "Circulando por...", "Cuando...", "Al..."
El enunciado debe describir TODOS los factores que afectan la respuesta.

### Tipo 3: Completar (~23%)

Frase incompleta con "..." al final o en medio. El enunciado NO es una pregunta.

Ejemplos: "La intención de efectuar una maniobra debe indicarse...", "El cruce de un paso a nivel debe realizarse..."

### Tipo 4: Dato concreto (~10%)

Pregunta sobre dato especifico: velocidad, distancia, tasa, plazo. Siempre contextualizado.

---

## Patrones de Inicio

75% afirmación (sin ¿), 25% pregunta directa (¿).

| Patrón | Frecuencia |
|--------|------------|
| Articulo (El/La/Los/Las/Un/Una) | ~25% |
| En... (ubicacion/situación) | ~13% |
| Si... (condicional) | ~7.5% |
| Cuando... | ~2.8% |
| Para... | ~2.6% |
| Al... | ~2.1% |
| ¿Está permitido...? | ~2.0% |
| ¿Puede(n)...? | ~2.0% |
| Circulando... | ~1.5% |

**Separadores**: Punto y coma (;) separa contexto de pregunta. Coma + ¿ para transicion suave. Puntos suspensivos (...) para completar.

---

## Palabras Trampa en Opciones

Las trampas van en las OPCIONES, no en el enunciado.

| Palabra | Uso típico |
|---------|------------|
| **siempre** | "Siempre que circule por autopista" — suele ser incorrecta |
| **ningun/ninguna** | "En ningun caso está permitido" — demasiado absoluto |
| **solamente** | "Solamente en vias interurbanas" — excluye excepciones |
| **cualquier** | "En cualquier circunstancia" — demasiado amplio |
| **nunca** | Absoluto — suele ser incorrecto |
| **obligatoriamente** | "Obligatoriamente debe..." — demasiado rígido |
| **exclusivamente** | "Exclusivamente para..." — excluye excepciones |
| **salvo** | "No, salvo que..." — suele ser la CORRECTA (tiene matiz) |

**Regla de oro**: Opción incorrecta = absolutos. Opción correcta = matiz ("salvo que...", "excepto cuando...", "en general...").

---

## Datos Numéricos Clave

### Velocidades (km/h)

| Vía | Turismo | Con remolque ligero | Con remolque pesado |
|-----|---------|---------------------|---------------------|
| Autopista/Autovía | 120 | 90 | 80 |
| Carretera convencional | 90 | 70 | 80 |
| Travesía | 50 | 50 | 50 |
| Zona urbana | 50 (general) | — | — |
| Zona 30 | 30 | — | — |
| Zona 20 / residencial | 20 | — | — |

### Alcohol

| Conductor | Aire espirado | Sangre |
|-----------|---------------|--------|
| General | 0,25 mg/l | 0,5 g/l |
| Novel (< 2 años) | 0,15 mg/l | 0,3 g/l |
| Profesional | 0,15 mg/l | 0,3 g/l |

Superar el doble (0,60 mg/l aire) = delito penal. Negarse = delito.

### Distancias (metros)

| Distancia | Contexto |
|-----------|----------|
| 1,5 m | Separación lateral mínima al adelantar ciclistas |
| 5 m | Estacionamiento desde intersección |
| 15 m | Estacionamiento desde parada de autobús |
| 100 m | Distancia seguridad mínima referencia |
| 150 m | Señalización avería con triángulos |

### Tiempos

| Tiempo | Contexto |
|--------|----------|
| 2 horas / 200 km | Descanso obligatorio en viaje largo |
| 10 minutos | Espera mínima entre pruebas alcoholemia |

### Pesos

| Peso | Contexto |
|------|----------|
| 3.500 kg | MMA máxima permiso B |
| 750 kg | Remolque ligero (sin permiso adicional) |

### SRI: < 135 cm obligatorio, >= 135 cm cinturón normal

### ITV: Turismo nuevo a los 4 años, cada 2 años hasta 10, luego anual

### Puntos: Nuevo 8, tras 2 años sin infracciones 12, máximo 15

---

## Formato de Explicaciones

Párrafo corto + bullets con etiquetas de intención.

```
"Párrafo corto con la respuesta correcta y por qué.\n\n- Opciones incorrectas: por qué A y C están mal\n- Conexión: dato relacionado con otro tema\n- Excepción: caso especial (si aplica)\n- Error común: error frecuente de alumnos (si aplica)\n- Dato clave: número o dato preciso relevante (si aplica)"
```

**Reglas**: Párrafo 1-2 frases. 2-4 bullets. Cada bullet empieza con etiqueta + dos puntos. Obligatorias: "Opciones incorrectas" y "Conexión".

---

## Verificación (HARD REJECT)

Si una pregunta cumple CUALQUIERA de estos, se descarta:

| Filtro | Ejemplo de rechazo |
|--------|-------------------|
| Fecha/ano en enunciado | "¿Desde cuándo es obligatoria la V-16?" |
| Pregunta sobre la norma en si | "¿Qué establece el reglamento...?" |
| Trivia legislativa | "¿En qué reglamento se regula la ITV?" |
| Recitar definición sin contexto | "¿Qué es la MMA?" |
| Coste/precio | "¿Cuánto cuesta el curso de recuperación?" |
| Estadística | "¿Qué porcentaje de accidentes se debe al alcohol?" |

**Patrón de detección**: "¿Desde cuándo", "¿En qué ano", "¿Qué dice", "¿Qué establece", "¿Cómo se define", "¿Qué es el/la" -> RECHAZAR.

---

## Enunciado Autosuficiente (CRÍTICA)

El enunciado + opciones DEBEN contener TODA la información necesaria. Si la respuesta cambia según un detalle no mencionado, es DEFECTUOSO.

Factores que deben estar explícitos si afectan la respuesta:
- Número de carriles y configuración
- Tipo de via (urbana, interurbana, autopista, travesía)
- Presencia/ausencia de señalización
- Condiciones de visibilidad
- Posición relativa de vehículos
- Tipo de intersección

---

## Calidad: Evitar Preguntas Obvias

Cada pregunta debe tener al menos UN elemento de dificultad:

| Elemento | Ejemplo |
|----------|---------|
| Excepción a regla conocida | Animales SI pueden circular por carretera convencional |
| Opciones muy similares | 0,15 vs 0,25 vs 0,30 mg/l |
| Dato preciso confundible | 100m en tunel, 1,5m a ciclistas |
| Combinación de reglas (max 2) | Prioridad en glorieta + vehículo especial |
| Respuesta contraintuitiva | El profesor es el conductor en autoescuela |

### Mezcla de dificultad por 30 preguntas

- ~10 faciles (30%): Reglas básicas, respuesta clara por descarte
- ~12 medias (40%): Requieren conocimiento especifico
- ~8 dificiles (30%): Excepciones, datos confundibles, combinación de reglas

---

## Formato de Salida JSON

```json
{
  "preguntas": [
    {
      "id": "pregunta_XXXX",
      "subtema_id": "subtema_XX",
      "tipo_pregunta": "directa|situacional|completar|dato",
      "enunciado": "¿Pregunta aquí?",
      "opciones": ["Opción A", "Opción B", "Opción C"],
      "correcta": 0,
      "explicación": "Párrafo corto.\n\n- Opciones incorrectas: ...\n- Conexión: ...",
      "pista": "Ayuda sutil...",
      "requiere_imagen": true,
      "tipo_imagen": "ninguna|señal|situación|vehículo",
      "usa_trampa": false,
      "palabras_trampa": [],
      "origen": "generada",
      "validada": false
    }
  ]
}
```

**Notas**:
- `opciones`: STRING ARRAY de exactamente 3 opciones
- `correcta`: NUMBER (0, 1, o 2)
- `explicación`: Con acento (explicación) en el JSON
- `palabras_trampa`: lista de trampa words usadas en opciones incorrectas
- `usa_trampa`: true si opciones incorrectas usan absolutos

---

## Pistas

- Ayudar a razonar sin revelar la respuesta
- No deben ser obvias ni inútiles
- Pueden apuntar a técnica de descarte ("Fijate en las opciones con absolutos")

---

## Auto-Validación (durante la generación)

Antes de escribir cada pregunta al JSON, el generador DEBE ejecutar estas comprobaciones internamente:

### Check A: Datos correctos
1. Releer la sección del temario de donde sale la pregunta
2. Verificar que la opción marcada como `correcta` ES la correcta según el temario
3. Verificar que las otras 2 opciones son REALMENTE incorrectas
4. Comprobar todos los valores numéricos (velocidades, distancias, tasas, puntos, plazos) contra la tabla de Datos Numéricos Clave de este documento
5. Si no estás seguro de un dato, añade `"confianza": "baja"` al JSON de esa pregunta

### Check B: Explicación completa
1. El párrafo inicial responde la pregunta en 1-2 frases
2. Bullet "Opciones incorrectas:" presente y explica POR QUÉ las otras están mal
3. Bullet "Conexión:" presente con enlace a otro tema o regla vinculada
4. Total: 3-8 frases sustantivas
5. Sin jerga legal innecesaria

### Check C: Enunciado autosuficiente
1. El enunciado + opciones contienen TODA la información necesaria
2. La respuesta NO cambia según un detalle no mencionado
3. Si la via, el tipo de vehículo, o las condiciones afectan la respuesta, estan explicitas

Si una pregunta no pasa los 3 checks, corregirla antes de escribirla. No generar preguntas defectuosas para "arreglarlas después".
