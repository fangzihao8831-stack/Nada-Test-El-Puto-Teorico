# Tipos de Preguntas (BASADO EN ANALISIS DE 2.700+ PREGUNTAS)

Las preguntas son una **MEZCLA** de tipos. "Trampa" e "imagen" NO son tipos separados — son **tecnicas** que se aplican a cualquier tipo.

Generar preguntas respetando esta distribucion:

| Tipo | Frecuencia | Descripcion |
|------|------------|-------------|
| Directa | ~40% | Pregunta directa sobre una regla o concepto |
| Situacional | ~27% | Presenta una situacion concreta y pregunta que hacer |
| Completar | ~23% | Frase incompleta con "..." que el alumno completa |
| Dato concreto | ~10% | Pregunta sobre un dato numerico o definicion especifica |

### Tecnicas transversales (se aplican a CUALQUIER tipo):
- **Todas las preguntas tendrán imagen**: Las imágenes se generan con un skill separado. NO incluir campos `requiere_imagen` ni `tipo_imagen` en el JSON. Solo incluir `codigo_señal` (ej: "R-2", "P-1a") cuando la pregunta trate específicamente de una señal de tráfico; en ese caso, usar "esta señal" en el enunciado en vez del código.
- **Campo `dificultad` obligatorio**: Toda pregunta debe incluir el objeto `dificultad` con las 6 dimensiones, `total` y `nivel` calculado segun la rubrica de abajo. Sin este campo la pregunta es invalida. El `nivel` NO se asigna subjetivamente — se CALCULA de la suma de dimensiones.
- **Campo `pista` obligatorio**: Una frase corta (máximo 20 palabras) que aparece en modo estudio ANTES de responder. No debe revelar la respuesta. Dos estilos según convenga:
  - **Mnemónico** (para datos/reglas): ayuda a recordar. Ej: *"El límite novel es exactamente la mitad que el general."*
  - **Razonamiento** (para situacionales): guía el pensamiento. Ej: *"Piensa qué ocurre si el vehículo retrocede en la pendiente."*
- **Opciones concisas**: Las opciones deben ser escuetas. NO incluir justificaciones dentro de la opcion. La explicacion va en el campo `explicacion`
- **Distractores plausibles**: Las opciones incorrectas deben ser errores reales de alumnos o reglas de otro contexto, NUNCA absurdos evidentes
- **Siempre 3 opciones (A, B, C)**: El examen DGT usa exactamente 3 opciones. Nunca generar 4 opciones.

---

## Ver archivos por tipo

Para reglas detalladas de dificultad, ejemplos de referencia y checklist por nivel, leer el archivo del tipo correspondiente:
- Tipo `dato` → leer `generar-preguntas/dato.md`
- Tipo `directo` → leer `generar-preguntas/directo.md`
- Tipo `completar` → leer `generar-preguntas/completar.md`
- Tipo `situacional` → leer `generar-preguntas/situacional.md`

---

## Sistema de Dificultad: Rubrica Multidimensional

**Principio fundamental**: La dificultad NO es un numero subjetivo. Se CALCULA sumando 6 dimensiones medibles. Cada pregunta generada DEBE incluir las puntuaciones de cada dimension en el JSON.

### Las 6 Dimensiones

| Dimension | Rango | Que mide | 0 | 1 | 2 |
|-----------|-------|----------|---|---|---|
| `d_reglas` | 0-2 | Cuantas reglas/normas necesita conocer el alumno | 1 regla simple | 2 reglas combinadas | 3+ reglas o jerarquia de normas |
| `d_excepcion` | 0-2 | Nivel de excepcionalidad de la norma aplicada | Regla general/estandar | Excepcion a regla conocida | Excepcion a una excepcion |
| `d_densidad` | 0-1 | Cuantas condiciones tiene el enunciado | Enunciado simple, 1-2 condiciones | Enunciado denso, 3+ condiciones o informacion irrelevante mezclada |
| `d_implicito` | 0-1 | Si la informacion clave esta explicita o hay que inferirla | Todo lo necesario esta dicho explicitamente | Hay condiciones implicitas que el alumno debe deducir (ej: "acaba de obtener el permiso" = novel) |
| `d_distractores` | 0-2 | Calidad/plausibilidad de las opciones incorrectas | Distractores de contexto claramente distinto | 1 distractor plausible del mismo contexto | Los 3 valores son reales del temario, no eliminable por logica |
| `d_contraintuitivo` | 0-1 | Si la respuesta correcta va contra el instinto comun | Respuesta alineada con el sentido comun | Respuesta contraintuitiva (la opcion "segura" o "logica" es incorrecta) |

### Calculo del Nivel

```
puntuacion_total = d_reglas + d_excepcion + d_densidad + d_implicito + d_distractores + d_contraintuitivo
```

| Puntuacion | Nivel | Etiqueta |
|------------|-------|----------|
| 0-2 | 1 | Facil |
| 3-5 | 2 | Medio |
| 6-7 | 3 | Dificil |
| 8-9 | 4 | Muy Dificil (solo situacional) |

**Nota para tipos dato/directo/completar**: Si la puntuacion da 8-9, el nivel maximo es 3. Solo las preguntas situacionales pueden ser nivel 4.

### Campo JSON obligatorio

Cada pregunta DEBE incluir el campo `dificultad` con las puntuaciones:

```json
{
  "dificultad": {
    "d_reglas": 1,
    "d_excepcion": 2,
    "d_densidad": 0,
    "d_implicito": 1,
    "d_distractores": 2,
    "d_contraintuitivo": 1,
    "total": 7,
    "nivel": 3
  }
}
```

### Ejemplo de evaluacion

> Pregunta: "Circula por carretera convencional con linea continua. Para adelantar a un ciclista necesita invadir el carril contrario. ¿Puede adelantar?"
>
> - `d_reglas`: 2 (regla de linea continua + excepcion para ciclistas + distancia lateral)
> - `d_excepcion`: 1 (excepcion a la prohibicion de cruzar linea continua)
> - `d_densidad`: 0 (enunciado claro, sin informacion extra)
> - `d_implicito`: 0 (todo explicito)
> - `d_distractores`: 2 (las 3 opciones son comportamientos validos en otros contextos)
> - `d_contraintuitivo`: 1 (cruzar linea continua "parece" siempre prohibido)
> - **Total: 6 → Nivel 3 (Dificil)**

---

## Tipo 1: Directa (~40%)
Pregunta corta y directa. Sin preambulo largo. Suelen empezar con "¿Es...", "¿Puede...", "¿Esta permitido..."

Ejemplos reales:
- "¿Es aconsejable conducir un turismo calzado con unas chanclas?"
- "¿Pueden los ciclistas circular por las autopistas?"
- "¿Es obligatorio llevar en el vehiculo un chaleco reflectante?"
- "El estado de los neumaticos, ¿influye en la distancia de frenado?"

**Ejemplos DIFICILES** (nivel objetivo):
- "¿Puede realizar un cambio de sentido en un lugar donde este prohibido adelantar?" → Si, salvo autorizacion expresa.
- "En un vehiculo de autoescuela realizando clases practicas, ¿quien es considerado el conductor?" → El profesor (mandos adicionales), no el alumno.
- "¿Esta permitida la circulacion de animales por una carretera convencional?" → Si, cuando no exista via pecuaria.
- "Circulando con lluvia muy intensa, ¿es correcto encender la luz antiniebla trasera?" → Si. La gente cree que solo con niebla.

## Tipo 2: Situacional (~27%)
Presenta una situacion con "Si...", "En...", "Circulando por...", "Cuando...", "Al..."

**IMPORTANTE**: El enunciado debe describir TODOS los factores que afectan la respuesta (via, carriles, senalizacion, posiciones). Ver `verificacion.md` para la "Regla del enunciado autosuficiente".

Ejemplos reales:
- "El trafico esta congestionado y preve que se va a quedar detenido sobre el paso para peatones; ¿debe entrar en el paso?"
- "Si sufre una enfermedad cronica, ¿que es aconsejable hacer para disminuir el riesgo de sufrir un accidente?"
- "En condiciones de mala visibilidad, ¿que debe hacer un conductor ante la presencia de ciclistas en la via?"
- "Al estacionar un vehiculo con remolque en una pendiente ascendente, si no dispone de calzos, ¿que debe hacer?"

**Ejemplos DIFICILES**:
- Prioridad con 3 vehiculos en interseccion sin senalizar (rojo/azul/verde)
- "En un tunel, ¿que distancia de seguridad?" → 100 metros. Dato preciso en contexto situacional.
- Combinacion de reglas: estacionar en pendiente + remolque + sin calzos

## Tipo 3: Completar (~23%)
Frase incompleta con "..." al final o en medio. El enunciado NO es una pregunta — es una afirmacion que se completa.

Ejemplos reales:
- "La intencion de efectuar una maniobra debe indicarse..."
- "El cruce de un paso a nivel debe realizarse..."
- "El uso adecuado del casco implica que la correa de sujecion..."
- "Las motocicletas con mas de cinco anos de antiguedad deben pasar la ITV..."

**Ejemplos DIFICILES**:
- "En las autopistas, se permite circular..." → a ciclistas >14 anos por arcenes.
- "Si el resultado de alcoholemia es positivo el agente podra inmovilizar el vehiculo, a no ser..." → que otra persona habilitada conduzca.

## Tipo 4: Dato concreto (~10%)
Pregunta sobre un dato especifico: velocidad, distancia, tasa, plazo.

Ejemplos reales:
- "¿De que depende la distancia de detencion?"
- "En esta via, ¿a que velocidad maxima le esta permitido circular a un turismo con remolque?"
- "¿A que distancia minima de una interseccion esta prohibido estacionar?"

**Ejemplos DIFICILES**:
- "¿Cual es la tasa de alcohol maxima permitida a un conductor novel?" → 0,15 mg/l.
- "¿Cuantos espejos retrovisores tienen que llevar las motocicletas?" → 1 si <100 km/h, 2 si >100.

---

## ADAS / Tecnologia Vehicular

ADAS representa ~2.5% de las preguntas (59+ en el banco). Ver **tema_09.md** (subtemas 38-42: Seguridad activa, Seguridad pasiva, Sistemas ADAS, Comprobaciones y mantenimiento, Conduccion autonoma) para todos los detalles tecnicos.

Generar preguntas sobre QUE HACE el sistema y COMO ACTUA, nunca sobre especificaciones tecnicas internas.
