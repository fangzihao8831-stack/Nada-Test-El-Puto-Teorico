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

## Contenido pedagógico obligatorio
- Explicar POR QUÉ la respuesta correcta es correcta (no solo afirmar que lo es)
- Incluir al menos 1 bullet con etiqueta "Conexión" (otro tema, regla vinculada, dato complementario)
- Si hay un error común de alumnos, incluir bullet con "Error común"
- Si la respuesta es contraintuitiva, explicar por qué sorprende

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
