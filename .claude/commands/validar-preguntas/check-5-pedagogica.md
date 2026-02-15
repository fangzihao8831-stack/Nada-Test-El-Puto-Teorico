# CHECK 5: Revisión Pedagógica de la Explicación

Revisa la explicación desde la perspectiva de un alumno que esta aprendiendo. No basta con que sea correcta — debe ENSENAR.

## 5A. Formato: parrafo corto + bullets con etiquetas de intención

La explicación se guarda como un solo string con formato markdown: un parrafo inicial (1-2 frases con la respuesta correcta y por que) seguido de bullets donde **cada bullet lleva una etiqueta de intención** que indica su propósito pedagógico.

**Etiquetas de intención disponibles**:

| Etiqueta | Cuando usar | Obligatoria |
|----------|------------|-------------|
| **Opciones incorrectas** | Explicar por que las otras opciones estan mal | Si (siempre) |
| **Conexión** | Enlazar con otro tema, regla vinculada, o dato complementario | Si (al menos 1) |
| **Excepción** | Caso especial o excepción a la regla | Si aplica |
| **Error común** | Error frecuente de alumnos sobre este tema | Si aplica |
| **Dato clave** | Numero, plazo, distancia o dato preciso relevante | Si aplica |

**Formato en el JSON**:
```json
"explicación": "Parrafo corto con la respuesta correcta y la razón principal.\n\n- Opciones incorrectas: por que las otras opciones estan mal\n- Conexión: enlace con otro tema o regla vinculada\n- Excepción: caso especial si aplica (opcional)"
```

**Reglas del formato**:
- Parrafo inicial: 1-2 frases. Respuesta correcta + por que es correcta.
- Bullets: 2-4 items. Cada uno DEBE empezar con una etiqueta de intención seguida de dos puntos.
- Formato de cada bullet: `- Etiqueta: contenido explicativo`
- Separar parrafo y bullets con `\n\n` (doble salto de línea)
- NO usar headers (#), negrita (**), ni tablas dentro de la explicación — solo texto plano + bullets con etiquetas
- Excepción: tablas de datos numéricos (velocidades, tasas) SI se permiten como último item

**Reglas de validación de etiquetas**:
- Cada bullet DEBE tener una etiqueta válida de la tabla anterior
- Al menos 1 bullet con etiqueta "Opciones incorrectas" (obligatoria)
- Al menos 1 bullet con etiqueta "Conexión" (obligatoria)
- Si un bullet no tiene etiqueta o usa una etiqueta no válida -> AUTO-REWRITE

## 5B. Conexiones con conocimiento relacionado (via etiqueta "Conexión")

La explicación debe tener al menos 1 bullet con etiqueta "Conexión" que enlace con otro tema o regla vinculada. Ejemplos:

```
PREGUNTA sobre cinturon (4 puntos):
  BUENA explicación:
    "No llevar puesto el cinturon conlleva 200 euros y 4 puntos.\n\n
    - Opciones incorrectas: 2 puntos es la sanción de otra infracción\n
    - Conexión: sin cinturon, el airbag puede causar lesiones graves\n
    - Excepción: personas con certificado medico de exencion"

  MALA explicación:
    "La sanción es de 4 puntos y 200 euros."
    -> No tiene etiquetas, no conecta con nada, no ensena
```

## 5C. Claridad desde perspectiva del alumno

- Usa lenguaje claro, evita jerga legal innecesaria
- Si hay un error común de los alumnos, mencionarlo ("Muchos confunden 0,15 con 0,25...")
- Si la respuesta es contraintuitiva, explicar POR QUE sorprende

## 5D. Longitud mínima
- Minimo 3 frases sustantivas (no cuenta repetir la pregunta ni frases vacias)
- Maximo 8 frases (no sobrecargar — ser conciso pero completo)

## Veredicto
- **AUTO-REWRITE** si la explicación es correcta pero no cumple la estructura o es demasiado superficial. Claude reescribe automáticamente siguiendo la estructura y anade conexiones.
- **REJECT** si la explicación contradice la respuesta correcta (error factual). Si auto-corregible (las fuentes coinciden en el dato correcto), se reescribe. Si no, FLAG para revisión manual.
- **PASS** si cumple estructura, tiene conexiones, y es pedagógicamente util.
