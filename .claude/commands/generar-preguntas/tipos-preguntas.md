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
- **Trampa con absolutos**: ~17% de preguntas usan opciones trampa
- **Con imagen**: TODAS las preguntas DEBEN tener `requiere_imagen: true` y un `tipo_imagen` apropiado. En el examen oficial DGT, el 100% de preguntas tienen imagen asociada. Las imagenes se generaran con un skill separado (DALL-E 3)

---

## Tipo 1: Directa (~40%)
Pregunta corta y directa. Sin preambulo largo. Suelen empezar con "¿Es...", "¿Puede...", "¿Esta permitido..."

Ejemplos reales:
- "¿Es aconsejable conducir un turismo calzado con unas chanclas?"
- "¿Pueden los ciclistas circular por las autopistas?"
- "¿Es obligatorio llevar en el vehiculo un chaleco reflectante?"
- "El estado de los neumaticos, ¿influye en la distancia de frenado?"

**Ejemplos DIFICILES** (nivel objetivo — ver `content/hardest_directa.json` para 57 mas):
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

**Ejemplos DIFICILES** (ver `content/hardest_situacional.json` para 84 mas):
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

**Ejemplos DIFICILES** (ver `content/hardest_completar.json` para 133 mas):
- "En las autovias, se permite circular..." → a ciclistas >14 anos por arcenes.
- "Si el resultado de alcoholemia es positivo el agente podra inmovilizar el vehiculo, a no ser..." → que otra persona habilitada conduzca.

## Tipo 4: Dato concreto (~10%)
Pregunta sobre un dato especifico: velocidad, distancia, tasa, plazo.

Ejemplos reales:
- "¿De que depende la distancia de detencion?"
- "En esta via, ¿a que velocidad maxima le esta permitido circular a un turismo con remolque?"
- "¿A que distancia minima de una interseccion esta prohibido estacionar?"

**Ejemplos DIFICILES** (ver `content/hardest_dato.json` para 457 mas):
- "¿Cual es la tasa de alcohol maxima permitida a un conductor novel?" → 0,15 mg/l.
- "¿Cuantos espejos retrovisores tienen que llevar las motocicletas?" → 1 si <100 km/h, 2 si >100.

---

## ADAS / Tecnologia Vehicular

ADAS representa ~2.5% de las preguntas (59+ en el banco). Ver **TEMA 34 del temario** (`temario_permiso_b_v3.md`) para todos los detalles tecnicos.

Generar preguntas sobre QUE HACE el sistema y COMO ACTUA, nunca sobre especificaciones tecnicas internas.
