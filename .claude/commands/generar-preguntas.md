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

---

## Tipos de Preguntas (BASADO EN ANÁLISIS DE 300+ PREGUNTAS REALES DGT)

Las preguntas reales DGT son una **MEZCLA** de varios tipos. NO todas son situacionales.
Generar preguntas respetando esta distribución aproximada:

| Tipo | Nombre | Frecuencia | Descripción |
|------|--------|------------|-------------|
| 1 | Directa corta | ~25% | Pregunta directa sobre una regla o concepto |
| 2 | Condicional/Situacional | ~25% | Presenta una situación concreta y pregunta qué hacer |
| 3 | Completar frase | ~15% | Frase incompleta que el alumno debe completar |
| 4 | Con imagen | ~20% | Requiere imagen de señal o situación de tráfico |
| 5 | Dato concreto | ~5% | Pregunta sobre un dato específico con contexto |
| 6 | Trampa con absolutos | ~10% | Opciones con "exclusivamente", "únicamente", "en ningún caso" |

### Tipo 1: Directa corta (~25%)
Pregunta corta y directa. Sin preámbulo largo.
- "¿Es aconsejable conducir un turismo calzado con unas chanclas?"
- "¿Está permitido que un vehículo circule sin silenciador?"
- "¿Quién es el responsable de que un menor lleve abrochado el cinturón de seguridad?"
- "¿Pueden los ciclistas circular por las autopistas?"
- "¿Es obligatorio llevar en el vehículo un chaleco reflectante?"

### Tipo 2: Condicional/Situacional (~25%)
Presenta una situación con "Si...", "Circulando por...", "Cuando..."
- "Circulando con lluvia muy intensa, ¿es correcto encender la luz antiniebla trasera?"
- "Si queda detenido en un atasco, ¿qué distancia es aconsejable mantener con el vehículo precedente?"
- "Si un agente de tráfico le ordena detenerse, ¿a quién debe obedecer?"
- "Circulando por una autovía, ¿está permitido circular en paralelo con otro vehículo?"
- "Cuando se aproxima a un paso de peatones, ¿qué debe hacer?"

### Tipo 3: Completar frase (~15%)
Frase incompleta con "..." al final o en medio.
- "Los accidentes de tráfico generan..."
- "El efecto submarino... está relacionado con..."
- "La distancia de detención es igual a..."
- "Las luces de posición deben encenderse cuando..."

### Tipo 4: Con imagen (~20%)
Requiere una imagen de señal o situación. Marcar `requiere_imagen: true`.
- "En esta situación, ¿qué debe hacer si va a girar a la izquierda?"
- "¿Qué indica esta señal?"
- "Según la señalización, ¿puede estacionar en este lugar?"
- "¿Qué vehículo tiene prioridad de paso?"

### Tipo 5: Dato concreto (~5%)
Pregunta sobre un dato numérico o definición, pero con contexto práctico.
- "¿Qué es una detención?"
- "¿Cuántos espejos retrovisores tienen que llevar las motocicletas?"
- "¿A qué distancia mínima de una intersección está prohibido estacionar?"

### Tipo 6: Trampa con absolutos (~10%)
Las trampas están en las OPCIONES, no en el enunciado. Usan absolutos que el alumno acepta sin pensar.
- Opciones trampa: "exclusivamente", "únicamente", "solamente", "en toda clase de vías", "en ningún caso", "siempre"
- La respuesta correcta suele ser la que tiene matiz: "salvo que...", "excepto cuando...", "siempre que..."

---

### Formato del enunciado
- Corto y directo: máximo 2 líneas
- Usar "usted" formal
- **NUNCA** mencionar fechas de políticas (ni "desde 2026", ni "desde julio 2024")
- Las preguntas tratan la normativa como VIGENTE

### Formato de las opciones
- **CORTAS**: máximo 1-2 líneas cada una
- No usar párrafos ni explicaciones largas como opción
- Estilo conciso: "Sí, siempre", "No, salvo emergencia", "Solo en vías interurbanas"
- Algunas preguntas pueden tener **2 opciones** en vez de 3 (como en los tests reales DGT)
- Las trampas van en las OPCIONES (absolutos: "exclusivamente", "en toda clase de vías")

---

## Qué SÍ pregunta la DGT (temas frecuentes)
- Velocidades máximas/mínimas según vía y vehículo
- Alcohol: tasas, controles, sanciones
- Señales de tráfico y marcas viales
- Prioridad de paso y glorietas
- Adelantamientos y distancia a ciclistas
- Luces: cuándo usar cada tipo
- Cinturón, SRI, casco
- Comportamiento en túneles, autopistas, pasos a nivel
- Conducta PAS y primeros auxilios básicos
- Puntos del permiso y sanciones comunes
- ADAS básico (qué hace el sistema, no specs técnicas)

## Qué NO pregunta la DGT (evitar)
- Detalles técnicos de implementación (qué datos envía el eCall, cuántos segundos graba el EDR)
- Especificaciones de ingeniería (potencia kW, voltajes)
- Fechas exactas de entrada en vigor
- Precios o costes de cursos/trámites
- Datos estadísticos

---

## Plausibilidad de Opciones
- Dificultad 1-2: Una opción claramente incorrecta
- Dificultad 3: Dos opciones creíbles
- Dificultad 4-5: Las tres opciones muy plausibles

## Normativa
- Fecha actual: Febrero 2026
- Si una norma ha cambiado recientemente, mencionar cuándo en la explicación
- No incluir excepciones obsoletas

## Pistas
- Ayudar a razonar sin revelar la respuesta
- No deben ser obvias ni inútiles

---

## Calibración de Dificultad (por tasa de fallo humano real)

La dificultad NO es la complejidad de la regla. Es cuánto FALLA la gente en la práctica.

| Nivel | Criterio | Ejemplos concretos |
|-------|----------|-------------------|
| 1 | Se acierta por intuición | Efectos de drogas, "¿cansado? para y duerme" |
| 2 | Sentido común + regla conocida | Glorieta (ceder al entrar), cinturón obligatorio |
| 3 | Hay que saber la regla concreta | PAS, emergencias en túnel, señales específicas |
| 4 | Números parecidos o trampa siempre/nunca | 80 vs 90 km/h, "¿adelantar en curva?" (sí, si no invades contrario) |
| 5 | Excepciones ocultas + 3 opciones muy plausibles | Fin de prioridad + derecha, puntos exactos por infracción, diferencias urbana/interurbana |

### Criterio clave
- **Fácil** = lo resuelves sin haber estudiado (intuición, lógica)
- **Difícil** = necesitas haber memorizado datos concretos Y las tres opciones suenan creíbles
- Las preguntas más difíciles son las que tienen **números similares** o **excepciones que la gente no conoce**

### Preguntas que NECESITAN imagen para ser difíciles
- Prioridad con 3+ vehículos en intersección → `requiere_imagen: true, tipo_imagen: "situacion"`
- Identificación de señales → `requiere_imagen: true, tipo_imagen: "senal"`
- Sin imagen, el techo de dificultad para estos temas es ~3-4

---

## EXPLICACIONES (MUY IMPORTANTE)

### Formato base: Párrafo corto (3-5 frases)
La explicación principal debe ser un **párrafo breve** que explique la respuesta correcta y por qué las otras son incorrectas.

### Cuándo añadir tablas
Tablas SOLO cuando hay **datos numéricos comparables** (velocidades, tasas, plazos). NO usar tablas para explicar conceptos.

### Estructura de la explicación:
1. **Respuesta correcta + por qué** (1-2 frases)
2. **Excepciones relevantes vigentes** (si las hay)
3. **Información adicional** (dato extra útil, breve)
4. **Tabla** (SOLO si hay números que comparar)

---

### Ejemplo explicación CON tabla (datos numéricos):

"Las tasas máximas permitidas son:

| Conductor | Aire espirado | Sangre |
|-----------|---------------|--------|
| General | 0,25 mg/l | 0,5 g/l |
| Novel (< 2 años) | 0,15 mg/l | 0,3 g/l |
| Profesional | 0,15 mg/l | 0,3 g/l |

Superar el doble de la tasa (0,60 mg/l aire) o negarse a la prueba es **delito penal**."

### Ejemplo explicación SIN tabla (concepto):

"Al adelantar ciclistas se debe mantener **mínimo 1,5 metros** de distancia lateral. Para garantizarlo está permitido invadir parte del carril contrario e incluso cruzar la línea continua si es necesario. Si no es posible mantener los 1,5 m con seguridad, **no se debe adelantar**."

### Ejemplo explicación con excepciones:

"El cinturón es obligatorio para **todos los ocupantes**. Excepciones vigentes: personas con certificado médico de exención y durante maniobras de marcha atrás o estacionamiento. El conductor es responsable de los menores. Sanción: **200€ y 4 puntos**."

---

## Reglas de Verificación
- Cada pregunta DEBE verificarse contra el temario antes de incluirla
- Si un dato numérico no coincide con el temario, usar el temario como fuente de verdad
- Las explicaciones deben incluir excepciones e información adicional
- Acentos y ñ correctos en todo el texto
- Fechas solo en la explicación como info adicional, NUNCA en el enunciado

---

## Formato de Salida JSON

```json
{
  "preguntas": [
    {
      "id": "pregunta_XXXX",
      "subtema_id": "subtema_XX",
      "tipo_pregunta": "directa|situacional|completar|imagen|dato|trampa",
      "enunciado": "¿Pregunta aquí?",
      "opciones": ["Opción A", "Opción B", "Opción C"],
      "correcta": 0,
      "explicacion": "Explicación completa...",
      "pista": "Ayuda sutil...",
      "dificultad": 3,
      "requiere_imagen": false,
      "tipo_imagen": "ninguna",
      "origen": "generada",
      "validada": false
    }
  ]
}
```

## Tipos de Imagen
- `senal`: Pregunta sobre señal de tráfico
- `situacion`: Situación de tráfico
- `ninguna`: Pregunta teórica

## Archivos de Referencia
- Temario: `temario_permiso_b_v3.md`
- Estructura: `content/content-structure.json`
- Salida: `content/preguntas/`
