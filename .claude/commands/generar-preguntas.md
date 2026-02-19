# Generar Preguntas DGT

Genera preguntas de examen para Nadatest.

## Uso
```
/generar-preguntas [número] [tema/subtema]
```

Ejemplos:
- `/generar-preguntas 5` - 5 preguntas de temas aleatorios
- `/generar-preguntas 10 tema_05` - 10 preguntas de señalización
- `/generar-preguntas 3 subtema_36` - 3 preguntas de alcohol

## Argumentos
- `$ARGUMENTS` contiene el número de preguntas y tema/subtema opcional

---

## Rol
Eres un experto en el examen teórico DGT del permiso B en España.

## Regla Fundamental: Escenario Primero, Nunca Dato Directo

**TODA pregunta se genera desde un ESCENARIO, nunca desde un dato.**

El flujo correcto es:
1. Lees una regla del temario (ej: "La baliza V-16 se coloca en la parte más alta del vehículo")
2. Inventas una situación realista donde esa regla se aplica (ej: "Su vehículo sufre una avería en una autovía de noche")
3. Preguntas que debe HACER el conductor en esa situación (ej: "¿Dónde debe colocar la baliza V-16?")

El flujo PROHIBIDO es:
1. Lees un dato del temario (ej: "V-16 obligatoria desde enero 2026")
2. Conviertes ese dato en pregunta (ej: "¿Desde cuándo es obligatoria la V-16?")

**La DGT nunca pregunta CUANDO ni QUE dice una norma. Pregunta que HACES tu como conductor cuando esa norma aplica.**

Antes de escribir cada pregunta, verifica mentalmente:
> "¿Estoy pidiendo al alumno que APLIQUE una regla en una situación, o que RECITE un dato?"

Si la respuesta es "recitar", reescribe la pregunta como escenario.

### Ejemplos de transformación dato → escenario

| Dato del temario | Pregunta PROHIBIDA | Pregunta CORRECTA |
|---|---|---|
| V-16 obligatoria desde 2026 | ¿Desde cuándo es obligatoria la V-16? | Su vehículo se avería en una autovía. ¿Dónde debe colocar la baliza V-16? |
| Tasa alcohol novel: 0,15 mg/l | ¿Cuál es la tasa máxima para noveles? | Usted es conductor novel y le paran en un control. ¿A partir de que tasa daría positivo? |
| ITV cada 2 años para vehículos 4-10 años | ¿Cada cuánto pasa la ITV un turismo de 7 años? | Su turismo tiene 7 años. Le convocan para la ITV pero paso hace 18 meses. ¿Debe acudir ya? |
| Permiso B autoriza motos 125cc tras 3 años | ¿Qué motos puede conducir con permiso B? | Tiene el permiso B desde hace 4 años. ¿Puede conducir una motocicleta de 125 cc por territorio nacional? |

**Excepción**: Las preguntas tipo `dato` (~10%) SI preguntan datos concretos, pero siempre contextualizados en una situación práctica, nunca como trivia sobre la norma en si.

## Idioma
- Español de España con acentos correctos (a, e, i, o, u, n)
- Signos de interrogación de apertura (?)
- Ejemplos: vehículo, circulación, señalización, kilómetros

## Fuentes de datos
- **2.700 preguntas** extraídas de 90 tests de Todotest (banco DGT)
- **30 preguntas** del examen oficial DGT (sedeclave.dgt.gob.es)
- Temario oficial: `temario_permiso_b_v3.md`

## Normativa
- Fecha actual: Febrero 2026
- Si una norma ha cambiado recientemente, mencionar cuando en la explicación
- Desde Feb 2026: el examen DGT incluye videos de percepción de riesgos

---

## Workflow

### 1. Preparación
1. Lee el temario en `temario_permiso_b_v3.md`
2. Lee la estructura en `content/content-structure.json`
3. Si no se específica tema, elige temas variados (no repetir el mismo)

### 2. Generación
Para los tipos de pregunta, distribución, y ejemplos dificiles, consultar:
> **Read `generar-preguntas/tipos-preguntas.md`**

Para patrones de inicio de enunciado, palabras trampa, y distribución por temas:
> **Read `generar-preguntas/patrones-y-trampas.md`**

Para datos numéricos exactos (velocidades, alcohol, distancias, tiempos, puntos):
> **Read `generar-preguntas/datos-numéricos.md`**

### 3. Explicaciones
Cada pregunta lleva explicación con formato párrafo + bullets con etiquetas de intención.
> **Read `generar-preguntas/explicaciones.md`**

### 4. Verificación
Antes de incluir cada pregunta, pasar la verificación completa (autosuficiencia, imagen, situacional, complejidad).
> **Read `generar-preguntas/verificación.md`**

### 5. Subagentes (si >30 preguntas)
- **1-30 preguntas**: Todo en el hilo principal, sin subagentes
- **31+ preguntas**: Dividir en subagentes (Task tool, subagent_type: "general-purpose", model: "sonnet")

**Cada subagente DEBE leer estos skill files directamente** (NO parafrasear ni resumir):
1. `.claude/commands/generar-preguntas/tipos-preguntas.md` — tipos, distribución, ejemplos difíciles
2. `.claude/commands/generar-preguntas/patrones-y-trampas.md` — patrones de inicio, palabras trampa
3. `.claude/commands/generar-preguntas/datos-numéricos.md` — valores numéricos exactos
4. `.claude/commands/generar-preguntas/explicaciones.md` — formato de explicaciones
5. `.claude/commands/generar-preguntas/verificación.md` — reglas de verificación y autosuficiencia
6. Per-tema temario files: `content/temario/tema_XX.md`

**NO usar `content/generation-prompt.md`** — los skill files contienen las reglas completas con ejemplos trabajados y referencias a preguntas difíciles que el archivo combinado omite.

### 6. Revisión y guardado
1. Mostrar preguntas al usuario para revisión ANTES de guardar
2. Solo guardar en `content/preguntas/` cuando el usuario apruebe

---

## Pistas
- Ayudar a razonar sin revelar la respuesta
- No deben ser obvias ni inútiles
- Pueden apuntar a la técnica de descarte (ej: "Fijate en las opciones con absolutos")

## Formato de Salida JSON

Guardar en `content/preguntas/preguntas_[fecha].json`

```json
{
  "preguntas": [
    {
      "id": "pregunta_XXXX",
      "subtema_id": "subtema_XX",
      "tipo_pregunta": "directa|situacional|completar|dato",
      "enunciado": "¿Pregunta aquí?",
      "opciones": ["Opción A", "Opción B", "Opción C"],
      "correcta": 0,
      "explicación": "Explicación completa...",
      "pista": "Ayuda sutil...",
      "requiere_imagen": true,
      "tipo_imagen": "ninguna",
      "origen": "generada",
      "validada": false
    }
  ]
}
```

## Tipos de Imagen
- `señal`: Pregunta sobre señal de tráfico
- `situación`: Situación de tráfico (intersección, adelantamiento, estacionamiento)
- `vehículo`: Imagen de vehículo o parte (espejos, neumáticos, luces)
- `ninguna`: Pregunta teórica pura

## Archivos de Referencia
- Temario: `temario_permiso_b_v3.md`
- Estructura: `content/content-structure.json`
- Preguntas Todotest (referencia): `content/todotest_2700.json`
- Examen DGT oficial (referencia): `content/dgt_oficial_exam.json`
- Preguntas dificiles directa: `content/hardest_directa.json` (57 preguntas)
- Preguntas dificiles situacional: `content/hardest_situacional.json` (84 preguntas)
- Preguntas dificiles completar: `content/hardest_completar.json` (133 preguntas)
- Preguntas dificiles dato: `content/hardest_dato.json` (457 preguntas)
- Salida: `content/preguntas/`
