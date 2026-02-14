# Generar Preguntas DGT

Genera preguntas de examen para Nadatest.

## Uso
```
/generar-preguntas [número] [tema/subtema]
```

Ejemplos:
- `/generar-preguntas 5` → 5 preguntas de temas aleatorios
- `/generar-preguntas 10 tema_05` → 10 preguntas de señalización
- `/generar-preguntas 3 subtema_36` → 3 preguntas de alcohol

## Argumentos
- `$ARGUMENTS` contiene el número de preguntas y tema/subtema opcional

## Instrucciones

1. Lee el temario en `temario_permiso_b_v3.md`
2. Lee la estructura en `content/content-structure.json`
3. Si no se especifica tema, elige temas variados (no repetir el mismo)
4. Lanza subagentes con Task tool para generar las preguntas en paralelo si son muchas (>5)
5. Cada subagente recibe:
   - Este contexto completo (copiar las secciones relevantes al prompt)
   - La sección relevante del temario
   - El subtema asignado
6. Muestra las preguntas al usuario para revisión ANTES de guardar
7. Solo guarda en `content/preguntas/` cuando el usuario apruebe la calidad

## Formato de Salida
Guardar en `content/preguntas/preguntas_[fecha].json`

---

# CONTEXTO DEL GENERADOR

## Rol
Eres un experto en el examen teórico DGT del permiso B en España.

## Idioma
- Español de España con acentos correctos (á, é, í, ó, ú, ñ)
- Signos de interrogación de apertura (¿)
- Ejemplos: vehículo, circulación, señalización, kilómetros

## Fuentes de datos
Este prompt está basado en el análisis de:
- **2.700 preguntas** extraídas de 90 tests de Todotest (banco de preguntas DGT)
- **30 preguntas** del examen oficial de práctica de la DGT (sedeclave.dgt.gob.es)
- El temario oficial del permiso B (`temario_permiso_b_v3.md`)

---

## Tipos de Preguntas (BASADO EN ANÁLISIS DE 2.700+ PREGUNTAS)

Las preguntas son una **MEZCLA** de tipos. "Trampa" e "imagen" NO son tipos separados — son **técnicas** que se aplican a cualquier tipo.

Generar preguntas respetando esta distribución:

| Tipo | Frecuencia | Descripción |
|------|------------|-------------|
| Directa | ~40% | Pregunta directa sobre una regla o concepto |
| Situacional | ~27% | Presenta una situación concreta y pregunta qué hacer |
| Completar | ~23% | Frase incompleta con "..." que el alumno completa |
| Dato concreto | ~10% | Pregunta sobre un dato numérico o definición específica |

### Técnicas transversales (se aplican a CUALQUIER tipo):
- **Trampa con absolutos**: ~17% de preguntas usan opciones trampa
- **Con imagen**: TODAS las preguntas DEBEN tener `requiere_imagen: true` y un `tipo_imagen` apropiado. En el examen oficial DGT, el 100% de preguntas tienen imagen asociada. Las imágenes se generarán con un skill separado (DALL-E 3)

---

### Tipo 1: Directa (~40%)
Pregunta corta y directa. Sin preámbulo largo. Suelen empezar con "¿Es...", "¿Puede...", "¿Está permitido..."

Ejemplos reales:
- "¿Es aconsejable conducir un turismo calzado con unas chanclas?"
- "¿Pueden los ciclistas circular por las autopistas?"
- "¿Es obligatorio llevar en el vehículo un chaleco reflectante?"
- "El estado de los neumáticos, ¿influye en la distancia de frenado?"
- "El conductor, ¿está obligado a cuidar que el resto de pasajeros mantengan una posición adecuada?"
- "Los chalecos reflectantes de alta visibilidad, ¿deben estar homologados?"

**Ejemplos DIFÍCILES** (nivel objetivo — ver `content/hardest_directa.json` para 57 más):
- "¿Puede realizar un cambio de sentido en un lugar donde esté prohibido adelantar?" → Sí, salvo autorización expresa. La mayoría piensa que solo afecta a adelantar.
- "En un vehículo de autoescuela realizando clases prácticas, ¿quién es considerado el conductor?" → El profesor (mandos adicionales), no el alumno.
- "¿Está permitida la circulación de animales por una carretera convencional?" → Sí, cuando no exista vía pecuaria. Respuesta contraintuitiva.
- "Circulando con lluvia muy intensa, ¿es correcto encender la luz antiniebla trasera?" → Sí. La gente cree que solo con niebla.

### Tipo 2: Situacional (~27%)
Presenta una situación con "Si...", "En...", "Circulando por...", "Cuando...", "Al..."

Ejemplos reales:
- "El tráfico está congestionado y prevé que se va a quedar detenido sobre el paso para peatones; ¿debe entrar en el paso?"
- "Si sufre una enfermedad crónica, ¿qué es aconsejable hacer para disminuir el riesgo de sufrir un accidente?"
- "En condiciones de mala visibilidad, ¿qué debe hacer un conductor ante la presencia de ciclistas en la vía?"
- "Al estacionar un vehículo con remolque en una pendiente ascendente, si no dispone de calzos, ¿qué debe hacer?"
- "En una travesía de dos carriles para cada sentido, ¿puede circular por el carril izquierdo?"

**Ejemplos DIFÍCILES** (nivel objetivo — ver `content/hardest_situacional.json` para 84 más):
- Prioridad con 3 vehículos en intersección sin señalizar (rojo/azul/verde)
- "En un túnel, ¿qué distancia de seguridad?" → 100 metros. Dato preciso en contexto situacional.
- Combinación de reglas: estacionar en pendiente + remolque + sin calzos

### Tipo 3: Completar (~23%)
Frase incompleta con "..." al final o en medio. El enunciado NO es una pregunta — es una afirmación que se completa.

Ejemplos reales:
- "La intención de efectuar una maniobra debe indicarse..."
- "El cruce de un paso a nivel debe realizarse..."
- "El uso adecuado del casco implica que la correa de sujeción..."
- "Las motocicletas con más de cinco años de antigüedad deben pasar la ITV..."
- "Para prevenir la aparición de la fatiga es aconsejable parar a descansar durante 20 o 30 minutos..."
- "La señal prohíbe..."
- "Esta señal indica la dirección y sentido que los vehículos..."

**Ejemplos DIFÍCILES** (nivel objetivo — ver `content/hardest_completar.json` para 133 más):
- "En las autovías, se permite circular..." → a ciclistas >14 años por arcenes. Excepción a la prohibición general.
- "Si el resultado de alcoholemia es positivo el agente podrá inmovilizar el vehículo, a no ser..." → que otra persona habilitada conduzca. Excepción contraintuitiva.
- "Los vehículos que circulen por el arcén tienen prohibido circular en posición paralela, excepto..." → las bicicletas. Excepción específica.

### Tipo 4: Dato concreto (~10%)
Pregunta sobre un dato específico: velocidad, distancia, tasa, plazo.

Ejemplos reales:
- "¿De qué depende la distancia de detención?"
- "En esta vía, ¿a qué velocidad máxima le está permitido circular a un turismo con remolque?"
- "¿A qué distancia mínima de una intersección está prohibido estacionar?"

**Ejemplos DIFÍCILES** (nivel objetivo — ver `content/hardest_dato.json` para 457 más):
- "¿Cuál es la tasa de alcohol máxima permitida a un conductor novel?" → 0,15 mg/l. Confusión con 0,25 (general) y 0,3 (sangre).
- "¿Cuántos espejos retrovisores tienen que llevar las motocicletas?" → 1 si <100 km/h, 2 si >100. Dato numérico dual.
- Señal V-16: debe colocarse en la parte más alta del vehículo, NO alejada.

---

## Patrones de Inicio de Pregunta (DATOS REALES)

75% de preguntas empiezan como afirmación (sin ¿), 25% como pregunta directa (¿).

### Los más frecuentes (usar esta distribución):
| Patrón | Frecuencia | Ejemplo |
|--------|------------|---------|
| Artículo (El/La/Los/Las/Un/Una) | ~25% | "El conductor de un turismo..." / "La distancia de detención..." |
| En... (ubicación/situación) | ~13% | "En una autopista..." / "En caso de accidente..." |
| Si... (condicional) | ~7.5% | "Si circula con niebla densa..." |
| Esta señal... | ~3.6% | "Esta señal indica..." |
| Cuando... | ~2.8% | "Cuando se aproxima a un paso de peatones..." |
| ¿Qué indica(n)...? | ~2.7% | "¿Qué indica esta señal?" |
| Para... | ~2.6% | "Para prevenir la fatiga..." |
| Al... | ~2.1% | "Al estacionar en pendiente..." |
| ¿Está permitido...? | ~2.0% | "¿Está permitido adelantar en un túnel?" |
| ¿Puede(n)...? | ~2.0% | "¿Puede circular un ciclo por la autopista?" |
| Circulando/Circula... | ~1.5% | "Circulando por una autovía..." |
| ¿Qué debe hacer...? | ~0.7% | "¿Qué debe hacer ante un peatón?" |
| ¿Es aconsejable/obligatorio...? | ~0.6% | "¿Es obligatorio el uso del casco?" |
| Como norma general... | ~0.6% | "Como norma general, en poblado..." |

### Separadores en el enunciado:
- **Punto y coma (;)**: Separa contexto de pregunta — "El tráfico está congestionado**;** ¿debe entrar?"
- **Coma + ¿**: Transición suave — "Si circula de noche por una carretera sin iluminación**,** ¿qué luces debe usar?"
- **Puntos suspensivos (...)**: Para preguntas tipo completar — "La distancia de detención es igual a**...**"

---

## Palabras Trampa en OPCIONES (DATOS DE 2.700 PREGUNTAS)

Las trampas van en las **OPCIONES**, no en el enunciado. Las opciones incorrectas usan absolutos que el alumno acepta sin pensar.

### Palabras trampa por frecuencia:
| Palabra | Apariciones | Uso típico |
|---------|-------------|------------|
| **siempre** | 254 | "Siempre que circule por autopista" — suele ser incorrecta |
| **ningún/ninguna** | 135 | "En ningún caso está permitido" — demasiado absoluto |
| **solamente** | 117 | "Solamente en vías interurbanas" — excluye excepciones |
| **cualquier** | 104 | "En cualquier circunstancia" — demasiado amplio |
| **prohibido** | 102 | "Está prohibido en todo caso" — ignora excepciones |
| **en ningún caso** | 75 | Absoluto negativo — casi siempre incorrecto |
| **todos los / todas las** | 85 | "Todos los vehículos deben..." — generaliza |
| **salvo** | 47 | "No, salvo que..." — suele ser la correcta (tiene matiz) |
| **nunca** | 37 | Absoluto — suele ser incorrecto |
| **obligatoriamente** | 29 | "Obligatoriamente debe..." — demasiado rígido |
| **exclusivamente** | 27 | "Exclusivamente para..." — excluye excepciones |
| **en cualquier caso** | 27 | Absoluto afirmativo |
| **totalmente** | 21 | "Totalmente prohibido" — sin matiz |
| **en todo caso** | 17 | Similar a "siempre" |
| **solo si** | 17 | Condicional restrictivo |
| **en todo momento** | 10 | Absoluto temporal |
| **independientemente** | 9 | "Independientemente de la vía" — sin considerar contexto |

### Regla de oro para opciones:
- **Opción incorrecta típica**: Usa absolutos ("siempre", "nunca", "en ningún caso", "solamente")
- **Opción correcta típica**: Tiene matiz ("salvo que...", "excepto cuando...", "siempre que...", "en general...")
- **Patrón frecuente**: 2 opciones con absolutos + 1 opción con matiz (correcta)

---

## ADAS / Tecnología Vehicular

ADAS representa ~2.5% de las preguntas (59+ en el banco). Ver **TEMA 34 del temario** (`temario_permiso_b_v3.md`) para todos los detalles técnicos.

Generar preguntas sobre QUÉ HACE el sistema y CÓMO ACTÚA, nunca sobre especificaciones técnicas internas. Consultar el temario para datos exactos de cada sistema.

---

## Datos Numéricos que DEBEMOS Clavar (DATOS REALES)

Estos son los valores exactos que se preguntan. Si un número no coincide con el temario, usar el temario como fuente de verdad.

### Velocidades (km/h)
| Vía | Turismo | Con remolque | Camión/Bus |
|-----|---------|--------------|------------|
| Autopista/Autovía | 120 | 80 | 90 |
| Carretera convencional | 90 | 70 | 80 |
| Travesía | 50 | 50 | 50 |
| Zona urbana | 50 (general) | — | — |
| Zona 30 | 30 | — | — |
| Zona 20 / residencial | 20 | — | — |
| Cuatriciclo ligero | 45 máx | — | — |

**Más testados**: 120, 90, 100, 80, 50, 20, 40 km/h (en ese orden de frecuencia)

### Alcohol
| Conductor | Aire espirado | Sangre |
|-----------|---------------|--------|
| General | 0,25 mg/l | 0,5 g/l |
| Novel (< 2 años) | 0,15 mg/l | 0,3 g/l |
| Profesional (bus, mercancías peligrosas) | 0,15 mg/l | 0,3 g/l |
| Tasa realmente segura | 0,0 | 0,0 |

- Superar el **doble** (0,60 mg/l aire) = delito penal
- Segunda prueba: mínimo **10 minutos** de espera
- Negarse a la prueba = delito

### Distancias (metros)
| Distancia | Contexto |
|-----------|----------|
| **1,5 m** | Separación lateral mínima al adelantar ciclistas |
| **5 m** | Distancia mínima de estacionamiento desde intersección |
| **15 m** | Distancia de estacionamiento desde parada de autobús |
| **50 m** | Señalización previa de maniobra en vía interurbana |
| **100 m** | Distancia para señalizar adelantamiento / distancia seguridad mínima referencia |
| **150 m** | Señalización avería con triángulos (uno a cada lado en autovía) |

### Tiempos
| Tiempo | Contexto |
|--------|----------|
| **2 horas / 200 km** | Descanso obligatorio en viaje largo |
| **20-30 min** | Duración del descanso recomendado |
| **2 minutos** | Tiempo máximo motor al ralentí |
| **10 minutos** | Espera mínima entre pruebas de alcoholemia |
| **15 segundos** | Antelación mínima para señalizar con intermitente |

### Pesos
| Peso | Contexto |
|------|----------|
| **3.500 kg** | MMA máxima permiso B / turismo |
| **750 kg** | Peso máximo remolque ligero (sin permiso adicional) |

### Estatura niños (SRI)
| Estatura | Regla |
|----------|-------|
| **< 135 cm** | Obligatorio SRI homologado, asiento trasero |
| **>= 135 cm** | Puede usar cinturón normal |

### ITV
| Vehículo | Primera ITV | Periodicidad |
|----------|-------------|--------------|
| Turismo nuevo | A los 4 años | Cada 2 años hasta 10 años, luego anual |
| Moto > 5 años | A los 5 años | Cada 2 años |
| Reforma importancia | Inmediata | — |

### Puntos del permiso
| Situación | Puntos |
|-----------|--------|
| Permiso nuevo | 8 puntos |
| Tras 2 años sin infracciones | 12 puntos |
| Máximo acumulable (bonus) | 15 puntos |
| Pérdida por alcohol | 4-6 puntos |

---

## Distribución por Temas (DATOS DE 2.700 PREGUNTAS)

Al generar preguntas variadas, respetar esta distribución aproximada:

| Tema | % | Descripción |
|------|---|-------------|
| **Señales / Marcas viales** | 27% | Señales verticales, horizontales, semáforos, balizamiento |
| **Velocidad** | 12% | Límites, excesos, velocidad inadecuada |
| **Luces / Alumbrado** | 7% | Cruce, carretera, posición, antiniebla, emergencia |
| **Emergencias / Accidentes** | 6% | PAS, primeros auxilios, averías, incendios |
| **Circulación general** | 6% | Carriles, sentido, incorporaciones, autopistas, túneles |
| **Cinturón / SRI / Casco** | 5.5% | Obligatoriedad, excepciones, menores, airbag |
| **Conductor (fatiga, etc.)** | 5% | Fatiga, distracción, medicamentos, sueño, visión |
| **Alcohol / Drogas** | 5% | Tasas, controles, efectos, sanciones |
| **Estacionamiento** | 4.5% | Parada, detención, estacionamiento, pendientes |
| **Adelantamiento** | 3.5% | Cuándo/dónde, ciclistas, línea continua |
| **Mantenimiento / ITV** | 3% | Neumáticos, frenos, inspección técnica |
| **Prioridad** | 2.5% | Intersecciones, glorietas, vehículos especiales |
| **ADAS / Tecnología** | 2.5% | Sistemas de ayuda, ABS, airbag, RCTA, LDW |
| **Peatones / Ciclistas** | 1.5% | Usuarios vulnerables, pasos, prioridad |
| **Remolque / Carga** | 1.5% | Peso, dimensiones, baca, estabilidad |
| **Permiso / Documentación** | 1% | Puntos, sanciones, permiso por puntos |

---

## Qué SÍ pregunta la DGT (temas confirmados)
- Velocidades máximas/mínimas según vía y vehículo
- Alcohol: tasas exactas, controles, sanciones, efectos en conducción
- Señales de tráfico y marcas viales (mayor categoría: 27%)
- Prioridad de paso y glorietas
- Adelantamientos y distancia a ciclistas (1,5 m)
- Luces: cuándo usar cada tipo, antiniebla, emergencia
- Cinturón, SRI, casco — obligatoriedad y excepciones
- Comportamiento en túneles, autopistas, pasos a nivel
- Conducta PAS y primeros auxilios básicos
- Puntos del permiso y sanciones comunes
- ADAS: qué hace cada sistema, cuándo interviene, limitaciones
- Fatiga y distracción: prevención, descansos, teléfonos
- Estacionamiento: distancias mínimas, pendientes, señalización

## Qué NO pregunta la DGT (evitar)
- Detalles técnicos de implementación (qué datos envía el eCall, cuántos segundos graba el EDR)
- Especificaciones de ingeniería (potencia kW, voltajes)
- Fechas exactas de entrada en vigor
- Precios o costes de cursos/trámites
- Datos estadísticos
- Nombres de leyes o artículos específicos
- Detalles del proceso administrativo de infracciones

---

## Normativa
- Fecha actual: Febrero 2026
- Si una norma ha cambiado recientemente, mencionar cuándo en la explicación
- No incluir excepciones obsoletas
- Desde Feb 2026: el examen DGT incluye vídeos de percepción de riesgos además del test de 30 preguntas

## Pistas
- Ayudar a razonar sin revelar la respuesta
- No deben ser obvias ni inútiles
- Pueden apuntar a la técnica de descarte (ej: "Fíjate en las opciones con absolutos")

---

## EXPLICACIONES (MUY IMPORTANTE)

### Formato: Párrafo corto + bullets en markdown

La explicación se guarda como un solo string con formato markdown. Un párrafo inicial con la respuesta y la razón, seguido de bullets con detalles. Esto es más fácil de leer que un bloque de texto largo.

**Formato en el JSON**:
```json
"explicacion": "Párrafo corto con la respuesta correcta y por qué.\n\n- Bullet 1: dato relevante o por qué las otras opciones están mal\n- Bullet 2: excepción, conexión con otro tema, o dato adicional\n- Bullet 3: error común de alumnos o dato extra (opcional)"
```

### Reglas del formato
- **Párrafo inicial**: 1-2 frases. Respuesta correcta + razón principal.
- **Bullets**: 2-4 items. Cada uno empieza con mayúscula. Sin punto final.
- Separar párrafo y bullets con `\n\n` (doble salto de línea)
- NO usar headers (#) ni negrita (**) — solo texto plano + bullets
- **Excepción**: tablas de datos numéricos (velocidades, tasas) SÍ se permiten como último item

### Contenido pedagógico obligatorio
- Explicar POR QUÉ la respuesta correcta es correcta (no solo afirmar que lo es)
- Incluir al menos 1 conexión con conocimiento relacionado (otro tema, regla vinculada, dato complementario)
- Si hay un error común de alumnos, mencionarlo ("Muchos confunden 0,15 con 0,25...")
- Si la respuesta es contraintuitiva, explicar por qué sorprende

---

### Ejemplo explicación SIN tabla:

```
"Al adelantar ciclistas se debe mantener mínimo 1,5 metros de distancia lateral.\n\n- Para garantizar esa distancia está permitido invadir el carril contrario e incluso cruzar la línea continua\n- Si no es posible mantener los 1,5 m con seguridad, no se debe adelantar\n- Sanción por no respetar la distancia: 200 euros y 4 puntos"
```

Renderizado:
> Al adelantar ciclistas se debe mantener mínimo 1,5 metros de distancia lateral.
>
> - Para garantizar esa distancia está permitido invadir el carril contrario e incluso cruzar la línea continua
> - Si no es posible mantener los 1,5 m con seguridad, no se debe adelantar
> - Sanción por no respetar la distancia: 200 euros y 4 puntos

### Ejemplo explicación con excepciones:

```
"No llevar puesto el cinturón de seguridad conlleva una sanción de 200 euros y la pérdida de 4 puntos.\n\n- El cinturón es obligatorio para todos los ocupantes, en vías urbanas e interurbanas\n- El conductor es responsable de que los menores lleven el SRI adecuado\n- Sin cinturón, el airbag puede causar lesiones graves en lugar de proteger\n- Única excepción: personas con certificado médico de exención"
```

### Ejemplo explicación CON tabla (datos numéricos):

```
"Los conductores noveles (menos de 2 años de antigüedad) tienen una tasa máxima de 0,15 mg/l en aire espirado, inferior a la general.\n\n- Muchos confunden 0,15 (noveles) con 0,25 (general) o 0,30 (sangre)\n- Superar el doble de la tasa (0,60 mg/l) o negarse a la prueba es delito penal\n\n| Conductor | Aire espirado | Sangre |\n|-----------|---------------|--------|\n| General | 0,25 mg/l | 0,5 g/l |\n| Novel (< 2 años) | 0,15 mg/l | 0,3 g/l |\n| Profesional | 0,15 mg/l | 0,3 g/l |"
```

---

## Calidad: Evitar Preguntas Obvias

**IMPORTANTE**: NO generar preguntas que cualquier persona responde correctamente por sentido común. Cada pregunta debe tener al menos UNO de estos elementos de dificultad:

| Elemento | Descripción | Ejemplo |
|----------|-------------|---------|
| **Excepción a regla conocida** | La respuesta correcta contradice lo que el alumno cree saber | Animales SÍ pueden circular por carretera convencional |
| **Opciones muy similares** | Las 3 opciones suenan razonables, difieren en un matiz | 0,15 vs 0,25 vs 0,30 mg/l |
| **Dato preciso confundible** | Número exacto que se confunde con otro parecido | 100m en túnel, 1,5m a ciclistas, 5m de intersección |
| **Combinación de reglas** | Requiere aplicar 2+ reglas simultáneamente | Prioridad en glorieta + vehículo especial |
| **Respuesta contraintuitiva** | La opción que "suena bien" es incorrecta | El profesor es el conductor en autoescuela, no el alumno |

### Archivos de referencia de dificultad
Antes de generar, consultar estos archivos para calibrar el nivel de dificultad:
- `content/hardest_directa.json` — 57 preguntas directas genuinamente difíciles
- `content/hardest_completar.json` — 133 preguntas completar difíciles (12 extremas, 121 muy difíciles)
- `content/hardest_situacional.json` — 84 preguntas situacionales difíciles (prioridad, medidas, excepciones)
- `content/hardest_dato.json` — 457 preguntas de datos numéricos confundibles

Cada pregunta incluye un campo `why_hard` que explica por qué es difícil desde perspectiva humana. Usar estos patrones como inspiración.

### Mezcla de dificultad por test
Un test de 30 preguntas debe tener esta distribución aproximada:
- **~10 fáciles** (30%): Reglas básicas, respuesta clara por descarte
- **~12 medias** (40%): Requieren conocimiento específico pero sin trampa
- **~8 difíciles** (30%): Excepciones, datos confundibles, combinación de reglas

## Reglas de Verificación
- Cada pregunta DEBE verificarse contra el temario antes de incluirla
- Si un dato numérico no coincide con el temario, usar el temario como fuente de verdad
- Las explicaciones deben incluir excepciones e información adicional
- Acentos y ñ correctos en todo el texto
- Fechas solo en la explicación como info adicional, NUNCA en el enunciado
- Opciones incorrectas DEBEN usar al menos 1 palabra trampa del listado anterior
- La opción correcta debe tener matiz, nunca un absoluto sin excepción
- NO generar preguntas que se responden por sentido común sin conocimiento de tráfico

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
      "opciones": ["Opción A", "Opción B", "Opción C"],  // SIEMPRE 3 opciones
      "correcta": 0,
      "explicacion": "Explicación completa...",
      "pista": "Ayuda sutil...",
      "requiere_imagen": true,  // SIEMPRE true
      "tipo_imagen": "ninguna",
      "usa_trampa": false,
      "palabras_trampa": [],
      "origen": "generada",
      "validada": false
    }
  ]
}
```

## Tipos de Imagen
- `senal`: Pregunta sobre señal de tráfico
- `situacion`: Situación de tráfico (intersección, adelantamiento, estacionamiento)
- `vehiculo`: Imagen de vehículo o parte (espejos, neumáticos, luces)
- `ninguna`: Pregunta teórica pura

## Archivos de Referencia
- Temario: `temario_permiso_b_v3.md`
- Estructura: `content/content-structure.json`
- Preguntas Todotest (referencia): `content/todotest_2700.json`
- Examen DGT oficial (referencia): `content/dgt_oficial_exam.json`
- Preguntas difíciles directa: `content/hardest_directa.json` (57 preguntas)
- Preguntas difíciles situacional: `content/hardest_situacional.json` (84 preguntas)
- Preguntas difíciles completar: `content/hardest_completar.json` (133 preguntas)
- Preguntas difíciles dato: `content/hardest_dato.json` (457 preguntas)
- Salida: `content/preguntas/`
