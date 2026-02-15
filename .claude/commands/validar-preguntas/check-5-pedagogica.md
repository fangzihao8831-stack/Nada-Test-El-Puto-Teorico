# CHECK 5: Revision Pedagogica de la Explicacion

Revisa la explicacion desde la perspectiva de un alumno que esta aprendiendo. No basta con que sea correcta — debe ENSENAR.

## 5A. Formato: parrafo corto + bullets con etiquetas de intencion

La explicacion se guarda como un solo string con formato markdown: un parrafo inicial (1-2 frases con la respuesta correcta y por que) seguido de bullets donde **cada bullet lleva una etiqueta de intencion** que indica su proposito pedagogico.

**Etiquetas de intencion disponibles**:

| Etiqueta | Cuando usar | Obligatoria |
|----------|------------|-------------|
| **Opciones incorrectas** | Explicar por que las otras opciones estan mal | Si (siempre) |
| **Conexion** | Enlazar con otro tema, regla vinculada, o dato complementario | Si (al menos 1) |
| **Excepcion** | Caso especial o excepcion a la regla | Si aplica |
| **Error comun** | Error frecuente de alumnos sobre este tema | Si aplica |
| **Dato clave** | Numero, plazo, distancia o dato preciso relevante | Si aplica |

**Formato en el JSON**:
```json
"explicacion": "Parrafo corto con la respuesta correcta y la razon principal.\n\n- Opciones incorrectas: por que las otras opciones estan mal\n- Conexion: enlace con otro tema o regla vinculada\n- Excepcion: caso especial si aplica (opcional)"
```

**Reglas del formato**:
- Parrafo inicial: 1-2 frases. Respuesta correcta + por que es correcta.
- Bullets: 2-4 items. Cada uno DEBE empezar con una etiqueta de intencion seguida de dos puntos.
- Formato de cada bullet: `- Etiqueta: contenido explicativo`
- Separar parrafo y bullets con `\n\n` (doble salto de linea)
- NO usar headers (#), negrita (**), ni tablas dentro de la explicacion — solo texto plano + bullets con etiquetas
- Excepcion: tablas de datos numericos (velocidades, tasas) SI se permiten como ultimo item

**Reglas de validacion de etiquetas**:
- Cada bullet DEBE tener una etiqueta valida de la tabla anterior
- Al menos 1 bullet con etiqueta "Opciones incorrectas" (obligatoria)
- Al menos 1 bullet con etiqueta "Conexion" (obligatoria)
- Si un bullet no tiene etiqueta o usa una etiqueta no valida -> AUTO-REWRITE

## 5B. Conexiones con conocimiento relacionado (via etiqueta "Conexion")

La explicacion debe tener al menos 1 bullet con etiqueta "Conexion" que enlace con otro tema o regla vinculada. Ejemplos:

```
PREGUNTA sobre cinturon (4 puntos):
  BUENA explicacion:
    "No llevar puesto el cinturon conlleva 200 euros y 4 puntos.\n\n
    - Opciones incorrectas: 2 puntos es la sancion de otra infraccion\n
    - Conexion: sin cinturon, el airbag puede causar lesiones graves\n
    - Excepcion: personas con certificado medico de exencion"

  MALA explicacion:
    "La sancion es de 4 puntos y 200 euros."
    -> No tiene etiquetas, no conecta con nada, no ensena
```

## 5C. Claridad desde perspectiva del alumno

- Usa lenguaje claro, evita jerga legal innecesaria
- Si hay un error comun de los alumnos, mencionarlo ("Muchos confunden 0,15 con 0,25...")
- Si la respuesta es contraintuitiva, explicar POR QUE sorprende

## 5D. Longitud minima
- Minimo 3 frases sustantivas (no cuenta repetir la pregunta ni frases vacias)
- Maximo 8 frases (no sobrecargar — ser conciso pero completo)

## Veredicto
- **AUTO-REWRITE** si la explicacion es correcta pero no cumple la estructura o es demasiado superficial. Claude reescribe automaticamente siguiendo la estructura y anade conexiones.
- **REJECT** si la explicacion contradice la respuesta correcta (error factual). Si auto-corregible (las fuentes coinciden en el dato correcto), se reescribe. Si no, FLAG para revision manual.
- **PASS** si cumple estructura, tiene conexiones, y es pedagogicamente util.
