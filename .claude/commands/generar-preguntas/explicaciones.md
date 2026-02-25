# Formato de Explicaciones

## Formato: Párrafo corto + bullets en markdown

La explicación se guarda como un solo string con formato markdown. Un párrafo inicial con la respuesta y la razón, seguido de bullets con detalles.

**Formato en el JSON**:
```json
"explicación": "Párrafo corto con la respuesta correcta y por que.\n\n- Opciones incorrectas: por qué A y C están mal\n- Conexión: dato relacionado con otro tema o regla vinculada\n- Excepción: caso especial o excepción a la regla (si aplica)"
```

## Etiquetas de intención (OBLIGATORIAS)

Cada bullet DEBE empezar con una etiqueta que indica su propósito:

| Etiqueta | Cuando usar | Obligatoria |
|----------|------------|-------------|
| **Opciones incorrectas** | Explicar por qué las otras opciones están mal | Si (siempre) |
| **Conexión** | Enlazar con otro tema, regla vinculada, o dato complementario | Si (al menos 1) |
| **Excepción** | Caso especial o excepción a la regla | Si aplica |
| **Error común** | Error frecuente de alumnos sobre este tema | Si aplica |
| **Dato clave** | Número, plazo, distancia o dato preciso relevante | Si aplica |

## Reglas del formato
- **Párrafo inicial**: 1-2 frases. Respuesta correcta + razón principal.
- **Bullets**: 2-4 items. Cada uno empieza con etiqueta + dos puntos. Sin punto final.
- Formato de cada bullet: `- Etiqueta: contenido explicativo`
- Separar párrafo y bullets con `\n\n` (doble salto de línea)
- NO usar headers (#) ni negrita (**) — solo texto plano + bullets con etiqueta
- **Excepción**: tablas de datos numéricos (velocidades, tasas) SI se permiten como último bloque

### PROHIBIDO en explicaciones

| Prohibición | Ejemplo MALO | Ejemplo BUENO |
|-------------|-------------|---------------|
| **Referencias a archivos internos** | "según tema_08.md", "(tema_02.md)" | "según el temario de seguridad vial" o simplemente omitir la cita |
| **Letras de opción (A/B/C)** | "la opción A es incorrecta porque..." | "la opción que dice [citar contenido] es incorrecta porque..." |

**Regla de citas**: La explicación es texto para el ALUMNO. Nunca debe contener nombres de archivo (tema_XX.md, subtema_XX, etc.). Si necesitas mencionar la fuente, usa el nombre del tema ("Tema 8: Seguridad vial") o simplemente describe la regla sin citar.

**Regla de opciones**: NUNCA referenciar opciones por su letra (A, B, C) en la explicación. En su lugar, describir el CONTENIDO de la opción. Razón: el orden de las opciones puede cambiar y las letras quedarían incorrectas.

## Contenido pedagógico obligatorio
- Explicar POR QUÉ la respuesta correcta es correcta (no solo afirmar que lo es)
- Incluir al menos 1 bullet con etiqueta "Conexión" (otro tema, regla vinculada, dato complementario)
- Si hay un error común de alumnos, incluir bullet con "Error común"
- Si la respuesta es contraintuitiva, explicar por qué sorprende

---

## Profundidad segun nivel de dificultad

La profundidad de la explicacion debe escalar con el nivel de dificultad de la pregunta. Una explicacion de nivel 1 que describe lo mismo que una de nivel 3 desperdicia espacio y no ayuda al alumno a entender las distinciones.

### Nivel 1 — Facil

**Objetivo**: El alumno necesita conocer la regla. La explicacion la enuncia claramente.

**Formato**: Parrafo inicial de 1-2 frases + 1-2 bullets.

**Regla de distractores**: No es necesario explicar los distractores en detalle — basta con mencionar que las otras opciones son incorrectas y por que la correcta lo es.

**Ejemplo**:
```
"Al circular por un tunel de mas de 500 metros, es obligatorio encender las luces de cruce aunque sea de dia.\n\n- Opciones incorrectas: no se puede circular sin luces aunque haya iluminacion artificial; las de carretera estan prohibidas dentro del tunel\n- Conexion: en caso de averia o accidente dentro del tunel, se debe encender el intermitente y salir del vehiculo por la izquierda"
```

### Nivel 2 — Medio

**Objetivo**: El alumno necesita entender el umbral o excepcion que distingue la respuesta correcta. La explicacion debe aclarar POR QUE el distractor mas plausible es incorrecto.

**Formato**: Parrafo inicial de 1-2 frases + 2-3 bullets, incluyendo obligatoriamente un bullet que explica el distractor mas tentador.

**Regla de distractores (OBLIGATORIO para Nivel 2+)**: La explicacion DEBE indicar a que condicion real corresponde al menos uno de los distractores incorrectos. No basta con decir "las otras estan mal" — hay que explicar a que escenario aplicaria el valor incorrecto.

**Ejemplo**:
```
"Los conductores noveles (menos de 2 anos de antiguedad) tienen una tasa maxima de 0,15 mg/l en aire espirado.\n\n- Opciones incorrectas: 0,25 mg/l es el limite general para conductores con mas de 2 anos; 0,30 mg/l no corresponde a ninguna tasa del permiso B — es una cifra de confusion\n- Conexion: los conductores profesionales (autobuses, camiones) tienen el mismo limite que los noveles: 0,15 mg/l\n- Dato clave: superar el doble de la tasa (0,60 mg/l) o negarse a la prueba es delito penal, no solo infraccion"
```

### Nivel 3 — Dificil

**Objetivo**: El alumno que no domina exactamente el tema no puede eliminar ninguna opcion por logica. La explicacion debe ayudar a entender las distinciones entre las tres opciones.

**Formato**: Parrafo inicial de 1-2 frases + 3-4 bullets. Para cada distractor, explicar QUE condicion describe y POR QUE esa condicion no aplica en este escenario.

**Regla de distractores (OBLIGATORIO para Nivel 3)**: La explicacion DEBE cubrir TODOS los distractores — no solo el mas tentador. Cada opcion incorrecta debe quedar explicada: a que escenario real pertenece ese valor y por que no encaja en el enunciado.

**Ejemplo**:
```
"Un autobus con pasajeros de pie puede circular por autopista a un maximo de 100 km/h.\n\n- Opciones incorrectas: 80 km/h es el limite del autobus con pasajeros de pie en carretera convencional, no en autopista; 90 km/h es el limite del camion o del autobus SIN pasajeros de pie en carretera convencional\n- Conexion: el autobus sin pasajeros de pie tiene un limite de 100 km/h en autopista y 90 km/h en carretera — igual que el autobus con pasajeros de pie en autopista, pero distinto en carretera\n- Error comun: muchos alumnos aplican los limites del autobus normal (sin pasajeros de pie) sin distinguir la variante con pasajeros de pie, que tiene restricciones diferentes en vias secundarias"
```

### Nivel 4 — Muy Dificil (solo SITUACIONAL)

**Objetivo**: Escenario que combina dos reglas y requiere aplicar ambas correctamente. La explicacion debe desglosar cada regla implicada y mostrar como interactuan.

**Formato**: Parrafo inicial de 2-3 frases explicando el resultado final + 3-4 bullets que desglosan las dos reglas involucradas y los distractores con sus condiciones reales.

**Regla de distractores (OBLIGATORIO)**: Mismo requisito que Nivel 3 — todos los distractores explicados. Adicionalmente, la explicacion debe indicar que regla o combinacion de reglas llevaria al alumno a elegir cada opcion incorrecta.

---

## Ejemplo SIN tabla:

```
"Al adelantar ciclistas se debe mantener mínimo 1,5 metros de distancia lateral.\n\n- Opciones incorrectas: no basta con 1 metro, y no se puede adelantar sin respetar la distancia aunque no haya tráfico\n- Conexión: para garantizar los 1,5 m está permitido cruzar la línea continua e invadir el carril contrario\n- Dato clave: sanción por no respetar la distancia: 200 euros y 4 puntos"
```

## Ejemplo con excepciones:

```
"No llevar puesto el cinturón de seguridad conlleva una sanción de 200 euros y la pérdida de 4 puntos.\n\n- Opciones incorrectas: 2 puntos es la sanción de otra infracción, no del cinturón\n- Conexión: sin cinturón, el airbag puede causar lesiones graves en lugar de proteger; el conductor es responsable de que los menores lleven el SRI adecuado\n- Excepción: personas con certificado médico de exención"
```

## Ejemplo CON tabla (datos numéricos):

```
"Los conductores noveles (menos de 2 años de antigüedad) tienen una tasa máxima de 0,15 mg/l en aire espirado, inferior a la general.\n\n- Error común: muchos confunden 0,15 (noveles) con 0,25 (general) o 0,30 (sangre)\n- Conexión: superar el doble de la tasa (0,60 mg/l) o negarse a la prueba es delito penal\n\n| Conductor | Aire espirado | Sangre |\n|-----------|---------------|--------|\n| General | 0,25 mg/l | 0,5 g/l |\n| Novel (< 2 años) | 0,15 mg/l | 0,3 g/l |\n| Profesional | 0,15 mg/l | 0,3 g/l |"
```
