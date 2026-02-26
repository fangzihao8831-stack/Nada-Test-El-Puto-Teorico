# CHECK 6: Clasificacion de Tipo y Dificultad

Reclasifica `tipo_pregunta` y verifica el objeto `dificultad` (6 dimensiones + total + nivel) de cada pregunta aplicando los criterios objetivos de los skill files. El generador asigna tipo y dificultad al crear la pregunta, pero no verifica su propia clasificacion. Este check corrige ambos.

## Paso 1: Clasificar tipo_pregunta

Leer el enunciado y aplicar estas reglas en orden (primera que encaje):

| Criterio | tipo_pregunta |
|----------|---------------|
| El enunciado es una frase incompleta que termina en "..." | `completar` |
| La respuesta correcta es un dato numerico concreto (velocidad, distancia, tasa, plazo, puntos, edad, porcentaje) | `dato` |
| El enunciado describe un escenario de conduccion con variables (tipo de via, clima, otros vehiculos, hora, posicion) y pregunta que HACER | `situacional` |
| El enunciado pregunta directamente sobre una regla sin escenario complejo | `directa` |

### Casos ambiguos

- Si el enunciado plantea un escenario pero la respuesta es un dato numerico → `dato` (el dato manda sobre el escenario)
- Si el enunciado usa "¿Es obligatorio...?", "¿Puede...?", "¿Esta permitido...?" sin variables de contexto → `directa`
- Si el enunciado combina escenario + pregunta conceptual (no sobre que hacer) → `directa`

## Paso 2: Verificar dificultad (6 dimensiones)

Segun el tipo_pregunta asignado en Paso 1, consultar la rubrica de 6 dimensiones en `generar-preguntas/tipos-preguntas.md` y los perfiles tipicos del archivo del tipo:

- `dato` → perfiles en `generar-preguntas/dato.md`
- `directa` → perfiles en `generar-preguntas/directo.md`
- `completar` → perfiles en `generar-preguntas/completar.md`
- `situacional` → perfiles en `generar-preguntas/situacional.md`

### Algoritmo de verificacion

Para cada pregunta, evaluar las 6 dimensiones independientemente:

| Dimension | Que verificar |
|-----------|---------------|
| `d_reglas` | Contar cuantas reglas/normas distintas necesita el alumno para responder |
| `d_excepcion` | ¿La norma aplicada es la regla general (0), una excepcion (1), o excepcion de excepcion (2)? |
| `d_densidad` | ¿El enunciado tiene 1-2 condiciones (0) o 3+ condiciones / informacion irrelevante (1)? |
| `d_implicito` | ¿Toda la informacion esta explicita (0) o hay que deducir algo implicito (1)? |
| `d_distractores` | ¿Los distractores son de otro contexto (0), 1 plausible (1), o los 3 reales del temario (2)? |
| `d_contraintuitivo` | ¿La respuesta es intuitiva (0) o va contra el instinto comun (1)? |

1. Sumar las 6 dimensiones → `total_corregido`
2. Calcular `nivel_corregido` segun tabla: 0-2=L1, 3-5=L2, 6-7=L3, 8-9=L4
3. Si tipo no es `situacional`, el nivel maximo es 3
4. Comparar con `dificultad` original del generador

### Criterios de correccion

- Si alguna dimension individual esta mal asignada → corregirla y recalcular total/nivel
- Si el total no es la suma de las dimensiones → recalcular
- Si el nivel no coincide con el total segun la tabla → recalcular

## Formato de salida

```json
{
  "check6_clasificacion": {
    "tipo_original": "directa",
    "tipo_corregido": "dato",
    "dificultad_original": { "d_reglas": 0, "d_excepcion": 0, "d_densidad": 0, "d_implicito": 0, "d_distractores": 1, "d_contraintuitivo": 0, "total": 1, "nivel": 1 },
    "dificultad_corregida": { "d_reglas": 1, "d_excepcion": 0, "d_densidad": 0, "d_implicito": 1, "d_distractores": 2, "d_contraintuitivo": 0, "total": 4, "nivel": 2 },
    "cambio": true,
    "motivo": "La respuesta es un umbral numerico (0,25 mg/l); d_distractores sube a 2 porque el distractor B (0,30 g/l sangre) es un valor real del mismo sistema; d_implicito=1 porque hay que deducir que 0,30 es la tasa en sangre no aire"
  }
}
```

Si no hay cambio:
```json
{
  "check6_clasificacion": {
    "tipo_original": "situacional",
    "tipo_corregido": "situacional",
    "dificultad_original": { "d_reglas": 1, "d_excepcion": 0, "d_densidad": 1, "d_implicito": 0, "d_distractores": 1, "d_contraintuitivo": 0, "total": 3, "nivel": 2 },
    "dificultad_corregida": null,
    "cambio": false,
    "motivo": null
  }
}
```

## Aplicacion de correcciones

Las correcciones de tipo y dificultad se aplican automaticamente al `_validated.json` junto con las correcciones de CHECK 4 y CHECK 5. No requieren aprobacion manual salvo que el validador tenga duda (en ese caso, marcar `"cambio": "FLAG"` en lugar de `true`).
