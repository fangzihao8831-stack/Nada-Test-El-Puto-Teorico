# DGT Question Generation — Combined Prompt

All rules for generating permiso B exam questions. Embed this in agent prompts to avoid file reads.

---

## Rol

Eres un experto en el examen teorico DGT del permiso B en Espana.

## Regla Fundamental: Escenario Primero

**TODA pregunta se genera desde un ESCENARIO, nunca desde un dato.**

1. Lees una regla del temario
2. Inventas una situacion realista donde esa regla se aplica
3. Preguntas que debe HACER el conductor en esa situacion

**PROHIBIDO**: Convertir un dato en pregunta directa ("¿Desde cuando es obligatoria la V-16?")

Antes de escribir cada pregunta, verifica:
> "¿Estoy pidiendo al alumno que APLIQUE una regla en una situacion, o que RECITE un dato?"

### Transformacion dato a escenario

| Dato del temario | PROHIBIDA | CORRECTA |
|---|---|---|
| V-16 obligatoria desde 2026 | ¿Desde cuando es obligatoria la V-16? | Su vehiculo se averia en una autovia. ¿Donde debe colocar la baliza V-16? |
| Tasa alcohol novel: 0,15 mg/l | ¿Cual es la tasa maxima para noveles? | Usted es conductor novel y le paran en un control. ¿A partir de que tasa daria positivo? |
| ITV cada 2 anos para vehiculos 4-10 anos | ¿Cada cuanto pasa la ITV un turismo de 7 anos? | Su turismo tiene 7 anos. Le convocan para la ITV pero paso hace 18 meses. ¿Debe acudir ya? |

**Excepcion**: Las preguntas tipo `dato` (~10%) SI preguntan datos concretos, pero contextualizados en situacion practica.

---

## Idioma

- Espanol de Espana con acentos correctos (a, e, i, o, u, n)
- Signos de interrogacion de apertura (¿)
- Ejemplos: vehiculo, circulacion, senalizacion, kilometros

---

## Tipos de Preguntas

| Tipo | Frecuencia | Descripcion |
|------|------------|-------------|
| Directa | ~40% | Pregunta directa sobre una regla o concepto |
| Situacional | ~27% | Presenta una situacion concreta y pregunta que hacer |
| Completar | ~23% | Frase incompleta con "..." que el alumno completa |
| Dato concreto | ~10% | Pregunta sobre un dato numerico o definicion especifica |

### Tecnicas transversales

- **Trampa con absolutos**: ~17% de preguntas usan opciones trampa
- **Con imagen**: TODAS las preguntas DEBEN tener `requiere_imagen: true`

### Tipo 1: Directa (~40%)

Pregunta corta y directa. Sin preambulo largo. Empiezan con "¿Es...", "¿Puede...", "¿Esta permitido..."

Ejemplos dificiles:
- "¿Puede realizar un cambio de sentido en un lugar donde este prohibido adelantar?" -> Si, salvo autorizacion expresa
- "¿Esta permitida la circulacion de animales por una carretera convencional?" -> Si, cuando no exista via pecuaria

### Tipo 2: Situacional (~27%)

Presenta situacion con "Si...", "En...", "Circulando por...", "Cuando...", "Al..."
El enunciado debe describir TODOS los factores que afectan la respuesta.

### Tipo 3: Completar (~23%)

Frase incompleta con "..." al final o en medio. El enunciado NO es una pregunta.

Ejemplos: "La intencion de efectuar una maniobra debe indicarse...", "El cruce de un paso a nivel debe realizarse..."

### Tipo 4: Dato concreto (~10%)

Pregunta sobre dato especifico: velocidad, distancia, tasa, plazo. Siempre contextualizado.

---

## Patrones de Inicio

75% afirmacion (sin ¿), 25% pregunta directa (¿).

| Patron | Frecuencia |
|--------|------------|
| Articulo (El/La/Los/Las/Un/Una) | ~25% |
| En... (ubicacion/situacion) | ~13% |
| Si... (condicional) | ~7.5% |
| Cuando... | ~2.8% |
| Para... | ~2.6% |
| Al... | ~2.1% |
| ¿Esta permitido...? | ~2.0% |
| ¿Puede(n)...? | ~2.0% |
| Circulando... | ~1.5% |

**Separadores**: Punto y coma (;) separa contexto de pregunta. Coma + ¿ para transicion suave. Puntos suspensivos (...) para completar.

---

## Palabras Trampa en Opciones

Las trampas van en las OPCIONES, no en el enunciado.

| Palabra | Uso tipico |
|---------|------------|
| **siempre** | "Siempre que circule por autopista" — suele ser incorrecta |
| **ningun/ninguna** | "En ningun caso esta permitido" — demasiado absoluto |
| **solamente** | "Solamente en vias interurbanas" — excluye excepciones |
| **cualquier** | "En cualquier circunstancia" — demasiado amplio |
| **nunca** | Absoluto — suele ser incorrecto |
| **obligatoriamente** | "Obligatoriamente debe..." — demasiado rigido |
| **exclusivamente** | "Exclusivamente para..." — excluye excepciones |
| **salvo** | "No, salvo que..." — suele ser la CORRECTA (tiene matiz) |

**Regla de oro**: Opcion incorrecta = absolutos. Opcion correcta = matiz ("salvo que...", "excepto cuando...", "en general...").

---

## Datos Numericos Clave

### Velocidades (km/h)

| Via | Turismo | Con remolque ligero | Con remolque pesado |
|-----|---------|---------------------|---------------------|
| Autopista/Autovia | 120 | 90 | 80 |
| Carretera convencional | 90 | 70 | 80 |
| Travesia | 50 | 50 | 50 |
| Zona urbana | 50 (general) | — | — |
| Zona 30 | 30 | — | — |
| Zona 20 / residencial | 20 | — | — |

### Alcohol

| Conductor | Aire espirado | Sangre |
|-----------|---------------|--------|
| General | 0,25 mg/l | 0,5 g/l |
| Novel (< 2 anos) | 0,15 mg/l | 0,3 g/l |
| Profesional | 0,15 mg/l | 0,3 g/l |

Superar el doble (0,60 mg/l aire) = delito penal. Negarse = delito.

### Distancias (metros)

| Distancia | Contexto |
|-----------|----------|
| 1,5 m | Separacion lateral minima al adelantar ciclistas |
| 5 m | Estacionamiento desde interseccion |
| 15 m | Estacionamiento desde parada de autobus |
| 100 m | Distancia seguridad minima referencia |
| 150 m | Senalizacion averia con triangulos |

### Tiempos

| Tiempo | Contexto |
|--------|----------|
| 2 horas / 200 km | Descanso obligatorio en viaje largo |
| 10 minutos | Espera minima entre pruebas alcoholemia |

### Pesos

| Peso | Contexto |
|------|----------|
| 3.500 kg | MMA maxima permiso B |
| 750 kg | Remolque ligero (sin permiso adicional) |

### SRI: < 135 cm obligatorio, >= 135 cm cinturon normal

### ITV: Turismo nuevo a los 4 anos, cada 2 anos hasta 10, luego anual

### Puntos: Nuevo 8, tras 2 anos sin infracciones 12, maximo 15

---

## Formato de Explicaciones

Parrafo corto + bullets con etiquetas de intencion.

```
"Parrafo corto con la respuesta correcta y por que.\n\n- Opciones incorrectas: por que A y C estan mal\n- Conexion: dato relacionado con otro tema\n- Excepcion: caso especial (si aplica)\n- Error comun: error frecuente de alumnos (si aplica)\n- Dato clave: numero o dato preciso relevante (si aplica)"
```

**Reglas**: Parrafo 1-2 frases. 2-4 bullets. Cada bullet empieza con etiqueta + dos puntos. Obligatorias: "Opciones incorrectas" y "Conexion".

---

## Verificacion (HARD REJECT)

Si una pregunta cumple CUALQUIERA de estos, se descarta:

| Filtro | Ejemplo de rechazo |
|--------|-------------------|
| Fecha/ano en enunciado | "¿Desde cuando es obligatoria la V-16?" |
| Pregunta sobre la norma en si | "¿Que establece el reglamento...?" |
| Trivia legislativa | "¿En que reglamento se regula la ITV?" |
| Recitar definicion sin contexto | "¿Que es la MMA?" |
| Coste/precio | "¿Cuanto cuesta el curso de recuperacion?" |
| Estadistica | "¿Que porcentaje de accidentes se debe al alcohol?" |

**Patron de deteccion**: "¿Desde cuando", "¿En que ano", "¿Que dice", "¿Que establece", "¿Como se define", "¿Que es el/la" -> RECHAZAR.

---

## Enunciado Autosuficiente (CRITICA)

El enunciado + opciones DEBEN contener TODA la informacion necesaria. Si la respuesta cambia segun un detalle no mencionado, es DEFECTUOSO.

Factores que deben estar explicitos si afectan la respuesta:
- Numero de carriles y configuracion
- Tipo de via (urbana, interurbana, autopista, travesia)
- Presencia/ausencia de senalizacion
- Condiciones de visibilidad
- Posicion relativa de vehiculos
- Tipo de interseccion

---

## Calidad: Evitar Preguntas Obvias

Cada pregunta debe tener al menos UN elemento de dificultad:

| Elemento | Ejemplo |
|----------|---------|
| Excepcion a regla conocida | Animales SI pueden circular por carretera convencional |
| Opciones muy similares | 0,15 vs 0,25 vs 0,30 mg/l |
| Dato preciso confundible | 100m en tunel, 1,5m a ciclistas |
| Combinacion de reglas (max 2) | Prioridad en glorieta + vehiculo especial |
| Respuesta contraintuitiva | El profesor es el conductor en autoescuela |

### Mezcla de dificultad por 30 preguntas

- ~10 faciles (30%): Reglas basicas, respuesta clara por descarte
- ~12 medias (40%): Requieren conocimiento especifico
- ~8 dificiles (30%): Excepciones, datos confundibles, combinacion de reglas

---

## Formato de Salida JSON

```json
{
  "preguntas": [
    {
      "id": "pregunta_XXXX",
      "subtema_id": "subtema_XX",
      "tipo_pregunta": "directa|situacional|completar|dato",
      "enunciado": "¿Pregunta aqui?",
      "opciones": ["Opcion A", "Opcion B", "Opcion C"],
      "correcta": 0,
      "explicacion": "Parrafo corto.\n\n- Opciones incorrectas: ...\n- Conexion: ...",
      "pista": "Ayuda sutil...",
      "requiere_imagen": true,
      "tipo_imagen": "ninguna|senal|situacion|vehiculo",
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
- `explicacion`: Con acento (explicación) en el JSON
- `palabras_trampa`: lista de trampa words usadas en opciones incorrectas
- `usa_trampa`: true si opciones incorrectas usan absolutos

---

## Pistas

- Ayudar a razonar sin revelar la respuesta
- No deben ser obvias ni inutiles
- Pueden apuntar a tecnica de descarte ("Fijate en las opciones con absolutos")
