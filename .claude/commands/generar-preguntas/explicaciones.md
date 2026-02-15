# Formato de Explicaciones

## Formato: Parrafo corto + bullets en markdown

La explicacion se guarda como un solo string con formato markdown. Un parrafo inicial con la respuesta y la razon, seguido de bullets con detalles.

**Formato en el JSON**:
```json
"explicacion": "Parrafo corto con la respuesta correcta y por que.\n\n- Opciones incorrectas: por que A y C estan mal\n- Conexion: dato relacionado con otro tema o regla vinculada\n- Excepcion: caso especial o excepcion a la regla (si aplica)"
```

## Etiquetas de intencion (OBLIGATORIAS)

Cada bullet DEBE empezar con una etiqueta que indica su proposito:

| Etiqueta | Cuando usar | Obligatoria |
|----------|------------|-------------|
| **Opciones incorrectas** | Explicar por que las otras opciones estan mal | Si (siempre) |
| **Conexion** | Enlazar con otro tema, regla vinculada, o dato complementario | Si (al menos 1) |
| **Excepcion** | Caso especial o excepcion a la regla | Si aplica |
| **Error comun** | Error frecuente de alumnos sobre este tema | Si aplica |
| **Dato clave** | Numero, plazo, distancia o dato preciso relevante | Si aplica |

## Reglas del formato
- **Parrafo inicial**: 1-2 frases. Respuesta correcta + razon principal.
- **Bullets**: 2-4 items. Cada uno empieza con etiqueta + dos puntos. Sin punto final.
- Formato de cada bullet: `- Etiqueta: contenido explicativo`
- Separar parrafo y bullets con `\n\n` (doble salto de linea)
- NO usar headers (#) ni negrita (**) — solo texto plano + bullets con etiqueta
- **Excepcion**: tablas de datos numericos (velocidades, tasas) SI se permiten como ultimo bloque

## Contenido pedagogico obligatorio
- Explicar POR QUE la respuesta correcta es correcta (no solo afirmar que lo es)
- Incluir al menos 1 bullet con etiqueta "Conexion" (otro tema, regla vinculada, dato complementario)
- Si hay un error comun de alumnos, incluir bullet con "Error comun"
- Si la respuesta es contraintuitiva, explicar por que sorprende

---

## Ejemplo SIN tabla:

```
"Al adelantar ciclistas se debe mantener minimo 1,5 metros de distancia lateral.\n\n- Opciones incorrectas: no basta con 1 metro, y no se puede adelantar sin respetar la distancia aunque no haya trafico\n- Conexion: para garantizar los 1,5 m esta permitido cruzar la linea continua e invadir el carril contrario\n- Dato clave: sancion por no respetar la distancia: 200 euros y 4 puntos"
```

## Ejemplo con excepciones:

```
"No llevar puesto el cinturon de seguridad conlleva una sancion de 200 euros y la perdida de 4 puntos.\n\n- Opciones incorrectas: 2 puntos es la sancion de otra infraccion, no del cinturon\n- Conexion: sin cinturon, el airbag puede causar lesiones graves en lugar de proteger; el conductor es responsable de que los menores lleven el SRI adecuado\n- Excepcion: personas con certificado medico de exencion"
```

## Ejemplo CON tabla (datos numericos):

```
"Los conductores noveles (menos de 2 anos de antiguedad) tienen una tasa maxima de 0,15 mg/l en aire espirado, inferior a la general.\n\n- Error comun: muchos confunden 0,15 (noveles) con 0,25 (general) o 0,30 (sangre)\n- Conexion: superar el doble de la tasa (0,60 mg/l) o negarse a la prueba es delito penal\n\n| Conductor | Aire espirado | Sangre |\n|-----------|---------------|--------|\n| General | 0,25 mg/l | 0,5 g/l |\n| Novel (< 2 anos) | 0,15 mg/l | 0,3 g/l |\n| Profesional | 0,15 mg/l | 0,3 g/l |"
```
