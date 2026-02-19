# Tipos de Preguntas (BASADO EN ANALISIS DE 2.700+ PREGUNTAS)

Las preguntas son una **MEZCLA** de tipos. "Trampa" e "imagen" NO son tipos separados — son **técnicas** que se aplican a cualquier tipo.

Generar preguntas respetando esta distribución:

| Tipo | Frecuencia | Descripción |
|------|------------|-------------|
| Directa | ~40% | Pregunta directa sobre una regla o concepto |
| Situacional | ~27% | Presenta una situación concreta y pregunta que hacer |
| Completar | ~23% | Frase incompleta con "..." que el alumno completa |
| Dato concreto | ~10% | Pregunta sobre un dato numérico o definición específica |

### Técnicas transversales (se aplican a CUALQUIER tipo):
- **Con imagen**: TODAS las preguntas DEBEN tener `requiere_imagen: true` y un `tipo_imagen` apropiado. En el examen oficial DGT, el 100% de preguntas tienen imagen asociada. Las imagenes se generaran con un skill separado (DALL-E 3)
- **Opciones concisas**: Las opciones deben ser escuetas (objetivo: 5-20 palabras). NO incluir justificaciones dentro de la opción. La explicación va en el campo `explicación`
- **Distractores plausibles**: Las opciones incorrectas deben ser errores reales de alumnos o reglas de otro contexto, NUNCA absurdos evidentes

---

## Tipo 1: Directa (~40%)
Pregunta corta y directa. Sin preámbulo largo. Suelen empezar con "¿Es...", "¿Puede...", "¿Está permitido..."

Ejemplos reales:
- "¿Es aconsejable conducir un turismo calzado con unas chanclas?"
- "¿Pueden los ciclistas circular por las autopistas?"
- "¿Es obligatorio llevar en el vehículo un chaleco reflectante?"
- "El estado de los neumáticos, ¿influye en la distancia de frenado?"

**Ejemplos DIFICILES** (nivel objetivo — ver `content/hardest_directa.json` para 57 mas):
- "¿Puede realizar un cambio de sentido en un lugar donde este prohibido adelantar?" → Si, salvo autorización expresa.
- "En un vehículo de autoescuela realizando clases prácticas, ¿quien es considerado el conductor?" → El profesor (mandos adicionales), no el alumno.
- "¿Esta permitida la circulación de animales por una carretera convencional?" → Si, cuando no exista via pecuaria.
- "Circulando con lluvia muy intensa, ¿es correcto encender la luz antiniebla trasera?" → Si. La gente cree que solo con niebla.

## Tipo 2: Situacional (~27%)
Presenta una situación con "Si...", "En...", "Circulando por...", "Cuando...", "Al..."

**IMPORTANTE**: El enunciado debe describir TODOS los factores que afectan la respuesta (via, carriles, señalización, posiciones). Ver `verificación.md` para la "Regla del enunciado autosuficiente".

Ejemplos reales:
- "El tráfico está congestionado y preve que se va a quedar detenido sobre el paso para peatones; ¿debe entrar en el paso?"
- "Si sufre una enfermedad crónica, ¿qué es aconsejable hacer para disminuir el riesgo de sufrir un accidente?"
- "En condiciones de mala visibilidad, ¿qué debe hacer un conductor ante la presencia de ciclistas en la via?"
- "Al estacionar un vehículo con remolque en una pendiente ascendente, si no dispone de calzos, ¿qué debe hacer?"

**Ejemplos DIFICILES** (ver `content/hardest_situacional.json` para 84 mas):
- Prioridad con 3 vehículos en intersección sin señalizar (rojo/azul/verde)
- "En un túnel, ¿qué distancia de seguridad?" → 100 metros. Dato preciso en contexto situacional.
- Combinación de reglas: estacionar en pendiente + remolque + sin calzos

## Tipo 3: Completar (~23%)
Frase incompleta con "..." al final o en medio. El enunciado NO es una pregunta — es una afirmación que se completa.

Ejemplos reales:
- "La intención de efectuar una maniobra debe indicarse..."
- "El cruce de un paso a nivel debe realizarse..."
- "El uso adecuado del casco implica que la correa de sujeción..."
- "Las motocicletas con más de cinco años de antigüedad deben pasar la ITV..."

**Ejemplos DIFICILES** (ver `content/hardest_completar.json` para 133 mas):
- "En las autovías, se permite circular..." → a ciclistas >14 años por arcenes.
- "Si el resultado de alcoholemia es positivo el agente podrá inmovilizar el vehículo, a no ser..." → que otra persona habilitada conduzca.

## Tipo 4: Dato concreto (~10%)
Pregunta sobre un dato específico: velocidad, distancia, tasa, plazo.

Ejemplos reales:
- "¿De que depende la distancia de detención?"
- "En esta via, ¿a qué velocidad máxima le está permitido circular a un turismo con remolque?"
- "¿A qué distancia mínima de una intersección está prohibido estacionar?"

**Ejemplos DIFICILES** (ver `content/hardest_dato.json` para 457 mas):
- "¿Cuál es la tasa de alcohol máxima permitida a un conductor novel?" → 0,15 mg/l.
- "¿Cuántos espejos retrovisores tienen que llevar las motocicletas?" → 1 si <100 km/h, 2 si >100.

---

## ADAS / Tecnología Vehicular

ADAS representa ~2.5% de las preguntas (59+ en el banco). Ver **TEMA 34 del temario** (`temario_permiso_b_v3.md`) para todos los detalles técnicos.

Generar preguntas sobre QUE HACE el sistema y COMO ACTUA, nunca sobre especificaciones técnicas internas.
