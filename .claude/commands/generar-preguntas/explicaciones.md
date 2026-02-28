# Formato de Explicaciones

## Formato: Párrafo corto + bullets en markdown

La explicación es un string markdown: párrafo inicial (respuesta + razón) + bullets con detalles.

```json
"explicación": "Párrafo corto con la respuesta correcta y por qué.\n\n- Opciones incorrectas: por qué están mal\n- Conexión: dato relacionado con otro tema\n- Excepción: caso especial (si aplica)"
```

## Etiquetas de intención (OBLIGATORIAS)

| Etiqueta | Cuándo usar | Obligatoria |
|----------|------------|-------------|
| **Opciones incorrectas** | Por qué las otras opciones están mal | Siempre |
| **Conexión** | Otro tema, regla vinculada, dato complementario | Siempre (al menos 1) |
| **Excepción** | Caso especial o excepción a la regla | Si aplica |
| **Error común** | Error frecuente de alumnos | Si aplica |
| **Dato clave** | Número, plazo, distancia precisa | Si aplica |

## Reglas del formato
- **Párrafo inicial**: 1-2 frases. Respuesta correcta + razón principal.
- **Bullets**: 2-4 items. Formato: `- Etiqueta: contenido`
- Separar párrafo y bullets con `\n\n`
- NO usar headers (#) ni negrita (**) — solo texto plano + bullets
- **Excepción**: tablas de datos numéricos permitidas como último bloque

### PROHIBIDO en explicaciones

| Prohibición | Ejemplo MALO | Ejemplo BUENO |
|-------------|-------------|---------------|
| **Referencias a archivos internos** | "según tema_08.md" | "según el temario de seguridad vial" o omitir |
| **Letras de opción (A/B/C)** | "la opción A es incorrecta" | "la opción que dice [contenido] es incorrecta" |

**Regla de citas**: La explicación es para el ALUMNO. Nunca nombres de archivo. Usar nombre del tema o describir la regla sin citar.

**Regla de opciones**: NUNCA referenciar por letra (A/B/C). Describir el CONTENIDO. El orden puede cambiar.

## Contenido pedagógico obligatorio
- Explicar POR QUÉ la correcta es correcta
- Al menos 1 bullet "Conexión"
- Si hay error común, incluir "Error común"
- Si es contraintuitiva, explicar por qué sorprende

---

## Profundidad según nivel

### Nivel 1 — Fácil
Párrafo 1-2 frases + 1-2 bullets. No detallar distractores — basta mencionar por qué la correcta lo es.

**Ejemplo**:
```
"Al circular por un túnel de más de 500 metros, es obligatorio encender las luces de cruce aunque sea de día.\n\n- Opciones incorrectas: no se puede circular sin luces aunque haya iluminación artificial; las de carretera están prohibidas dentro del túnel\n- Conexión: en caso de avería dentro del túnel, encender intermitente y salir por la izquierda"
```

### Nivel 3 — Difícil
Párrafo 1-2 frases + 3-4 bullets. Cubrir TODOS los distractores: a qué escenario real pertenece cada valor incorrecto y por qué no encaja.

**Ejemplo**:
```
"Un autobús con pasajeros de pie puede circular por autopista a un máximo de 100 km/h.\n\n- Opciones incorrectas: 80 km/h es el límite del autobús con pasajeros de pie en carretera convencional, no en autopista; 90 km/h es el límite del camión o del autobús SIN pasajeros de pie en carretera convencional\n- Conexión: el autobús sin pasajeros de pie tiene 100 km/h en autopista y 90 km/h en carretera\n- Error común: muchos alumnos aplican los límites del autobús normal sin distinguir la variante con pasajeros de pie"
```

Nivel 2 interpola entre L1 y L3: párrafo + 2-3 bullets, explicar al menos el distractor más tentador. Nivel 4 (solo situacional) interpola sobre L3: párrafo 2-3 frases + 3-4 bullets, desglosar las dos reglas en conflicto.
