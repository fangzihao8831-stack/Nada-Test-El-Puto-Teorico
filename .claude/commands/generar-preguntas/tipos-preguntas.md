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
- **Campo `nivel` obligatorio**: Toda pregunta debe incluir `nivel` (1, 2, 3 o 4) según las tablas de dificultad de abajo. Sin este campo la pregunta es inválida.
- **Campo `pista` obligatorio**: Una frase corta (máximo 20 palabras) que aparece en modo estudio ANTES de responder. No debe revelar la respuesta. Dos estilos según convenga:
  - **Mnemónico** (para datos/reglas): ayuda a recordar. Ej: *"El límite novel es exactamente la mitad que el general."*
  - **Razonamiento** (para situacionales): guía el pensamiento. Ej: *"Piensa qué ocurre si el vehículo retrocede en la pendiente."*
- **Opciones concisas**: Las opciones deben ser escuetas (objetivo: 5-20 palabras). NO incluir justificaciones dentro de la opcion. La explicacion va en el campo `explicacion`
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

## Niveles de Dificultad

**Principio fundamental**: Mayor nivel = distractores mas plausibles. En Nivel 3+, un alumno que no conozca la regla exacta no puede eliminar ninguna opcion por logica.

### Para tipos DATO, DIRECTO, COMPLETAR (3 niveles):

| Nivel | Etiqueta | Definicion |
|-------|----------|------------|
| 1 | Facil | Un unico hecho o regla. Los distractores son claramente de otro contexto. |
| 2 | Medio | Requiere conocer un umbral especifico, excepcion, o condicion combinada. Un distractor es plausible para un lector descuidado. |
| 3 | Dificil | Todos los distractores son valores/reglas reales del temario aplicados a una condicion ligeramente distinta. No deducible por eliminacion. |

### Para tipo SITUACIONAL (4 niveles):

| Nivel | Etiqueta | Definicion |
|-------|----------|------------|
| 1 | Facil | 1 variable, aplicacion clara de una regla. |
| 2 | Medio | 2 condiciones combinadas. Un distractor activa el instinto equivocado. |
| 3 | Dificil | Excepcion a una regla conocida, o conflicto de reglas. Las 3 respuestas son plausibles sin dominar la norma. |
| 4 | Muy Dificil | Dos reglas parecen entrar en conflicto directo. El alumno debe saber cual prevalece. Todas las opciones son muy plausibles. |

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
