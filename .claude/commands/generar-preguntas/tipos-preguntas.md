# Tipos de Preguntas (BASADO EN ANÁLISIS DE 2.700+ PREGUNTAS)

Las preguntas son una **MEZCLA** de tipos. "Trampa" e "imagen" NO son tipos separados — son **técnicas** aplicables a cualquier tipo.

| Tipo | Frecuencia | Descripción |
|------|------------|-------------|
| Directa | ~40% | Pregunta directa sobre una regla o concepto |
| Situacional | ~27% | Presenta una situación concreta y pregunta qué hacer |
| Completar | ~23% | Frase incompleta con "..." que el alumno completa |
| Dato concreto | ~10% | Pregunta sobre un dato numérico o definición específica |

### Técnicas transversales (CUALQUIER tipo):
- **Todas tendrán imagen**: Generadas con skill separado. NO incluir `requiere_imagen` ni `tipo_imagen`. Solo `codigo_señal` (ej: "R-2") cuando la pregunta trate de una señal; usar "esta señal" en el enunciado.
- **Campo `dificultad` obligatorio**: Objeto con 6 dimensiones + `total` + `nivel` calculado con la rúbrica de abajo. Sin este campo la pregunta es inválida.
- **Campo `pista` obligatorio**: Frase corta (máx 20 palabras) para modo estudio. No revela respuesta. Estilos: *Mnemónico* (datos/reglas) o *Razonamiento* (situacionales).
- **Opciones concisas**: Sin justificaciones en la opción. La explicación va en `explicación`.
- **Distractores plausibles**: Errores reales de alumnos o reglas de otro contexto, NUNCA absurdos.
- **Siempre 3 opciones (A, B, C)**.

---

## Ver archivos por tipo
- `dato` → `generar-preguntas/dato.md`
- `directo` → `generar-preguntas/directo.md`
- `completar` → `generar-preguntas/completar.md`
- `situacional` → `generar-preguntas/situacional.md`

---

## Sistema de Dificultad: Rúbrica Multidimensional

La dificultad se CALCULA sumando 6 dimensiones. Cada pregunta DEBE incluir las puntuaciones en el JSON.

### Las 6 Dimensiones

| Dimensión | Rango | 0 | 1 | 2 |
|-----------|-------|---|---|---|
| `d_reglas` | 0-2 | 1 regla simple | 2 reglas combinadas | 3+ reglas o jerarquía |
| `d_excepcion` | 0-2 | Regla general | Excepción a regla conocida | Excepción a excepción |
| `d_densidad` | 0-1 | 1-2 condiciones | 3+ condiciones o info irrelevante |
| `d_implicito` | 0-1 | Todo explícito | Condiciones implícitas que inferir |
| `d_distractores` | 0-2 | Contexto distinto | 1 plausible | 3 reales del temario |
| `d_contraintuitivo` | 0-1 | Alineada con sentido común | Contraintuitiva |

### Cálculo del Nivel

`total = d_reglas + d_excepcion + d_densidad + d_implicito + d_distractores + d_contraintuitivo`

| Puntuación | Nivel | Etiqueta |
|------------|-------|----------|
| 0-2 | 1 | Fácil |
| 3-5 | 2 | Medio |
| 6-7 | 3 | Difícil |
| 8-9 | 4 | Muy Difícil (solo situacional) |

dato/directo/completar: nivel máximo 3 aunque total sea 8-9.

### Campo JSON obligatorio

```json
{ "dificultad": { "d_reglas": 1, "d_excepcion": 2, "d_densidad": 0, "d_implicito": 1, "d_distractores": 2, "d_contraintuitivo": 1, "total": 7, "nivel": 3 } }
```

### Ejemplo de evaluación

> "Circula por carretera convencional con línea continua. Para adelantar a un ciclista necesita invadir el carril contrario. ¿Puede adelantar?"
>
> d_reglas=2, d_excepcion=1, d_densidad=0, d_implicito=0, d_distractores=2, d_contraintuitivo=1 → **Total: 6 → Nivel 3**

---

## Tipo 1: Directa (~40%)
Pregunta corta. "¿Es...", "¿Puede...", "¿Está permitido..." Ver `directo.md`.

## Tipo 2: Situacional (~27%)
Presenta situación con "Si...", "En...", "Circulando por..." Enunciado autosuficiente. Ver `situacional.md`.

## Tipo 3: Completar (~23%)
Frase incompleta con "...". NO es pregunta — es afirmación que se completa. Ver `completar.md`.

## Tipo 4: Dato concreto (~10%)
Pregunta sobre dato específico: velocidad, distancia, tasa, plazo. Ver `dato.md`.
