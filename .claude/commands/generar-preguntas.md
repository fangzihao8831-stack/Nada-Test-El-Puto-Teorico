# Generar Preguntas DGT

Genera preguntas de examen para Nadatest.

## Uso
```
/generar-preguntas [numero] [tema/subtema]
```

Ejemplos:
- `/generar-preguntas 5` - 5 preguntas de temas aleatorios
- `/generar-preguntas 10 tema_05` - 10 preguntas de señalización
- `/generar-preguntas 3 subtema_36` - 3 preguntas de alcohol

## Argumentos
- `$ARGUMENTS` contiene el numero de preguntas y tema/subtema opcional

---

## Rol
Eres un experto en el examen teorico DGT del permiso B en España.

## Regla Fundamental: Escenario Primero, Nunca Dato Directo

**TODA pregunta se genera desde un ESCENARIO, nunca desde un dato.**

El flujo correcto es:
1. Lees una regla del temario (ej: "La baliza V-16 se coloca en la parte mas alta del vehículo")
2. Inventas una situación realista donde esa regla se aplica (ej: "Su vehículo sufre una averia en una autovia de noche")
3. Preguntas que debe HACER el conductor en esa situación (ej: "¿Donde debe colocar la baliza V-16?")

El flujo PROHIBIDO es:
1. Lees un dato del temario (ej: "V-16 obligatoria desde enero 2026")
2. Conviertes ese dato en pregunta (ej: "¿Desde cuando es obligatoria la V-16?")

**La DGT nunca pregunta CUANDO ni QUE dice una norma. Pregunta que HACES tu como conductor cuando esa norma aplica.**

Antes de escribir cada pregunta, verifica mentalmente:
> "¿Estoy pidiendo al alumno que APLIQUE una regla en una situación, o que RECITE un dato?"

Si la respuesta es "recitar", reescribe la pregunta como escenario.

### Ejemplos de transformacion dato → escenario

| Dato del temario | Pregunta PROHIBIDA | Pregunta CORRECTA |
|---|---|---|
| V-16 obligatoria desde 2026 | ¿Desde cuando es obligatoria la V-16? | Su vehículo se averia en una autovia. ¿Donde debe colocar la baliza V-16? |
| Tasa alcohol novel: 0,15 mg/l | ¿Cual es la tasa maxima para noveles? | Usted es conductor novel y le paran en un control. ¿A partir de que tasa daria positivo? |
| ITV cada 2 anos para vehiculos 4-10 anos | ¿Cada cuanto pasa la ITV un turismo de 7 anos? | Su turismo tiene 7 anos. Le convocan para la ITV pero paso hace 18 meses. ¿Debe acudir ya? |
| Permiso B autoriza motos 125cc tras 3 anos | ¿Que motos puede conducir con permiso B? | Tiene el permiso B desde hace 4 anos. ¿Puede conducir una motocicleta de 125 cc por territorio nacional? |

**Excepcion**: Las preguntas tipo `dato` (~10%) SI preguntan datos concretos, pero siempre contextualizados en una situación practica, nunca como trivia sobre la norma en si.

## Idioma
- Espanol de España con acentos correctos (a, e, i, o, u, n)
- Signos de interrogacion de apertura (?)
- Ejemplos: vehículo, circulación, señalización, kilometros

## Fuentes de datos
- **2.700 preguntas** extraidas de 90 tests de Todotest (banco DGT)
- **30 preguntas** del examen oficial DGT (sedeclave.dgt.gob.es)
- Temario oficial: `temario_permiso_b_v3.md`

## Normativa
- Fecha actual: Febrero 2026
- Si una norma ha cambiado recientemente, mencionar cuando en la explicación
- Desde Feb 2026: el examen DGT incluye videos de percepcion de riesgos

---

## Workflow

### 1. Preparacion
1. Lee el temario en `temario_permiso_b_v3.md`
2. Lee la estructura en `content/content-structure.json`
3. Si no se específica tema, elige temas variados (no repetir el mismo)

### 2. Generacion
Para los tipos de pregunta, distribución, y ejemplos dificiles, consultar:
> **Read `generar-preguntas/tipos-preguntas.md`**

Para patrones de inicio de enunciado, palabras trampa, y distribución por temas:
> **Read `generar-preguntas/patrones-y-trampas.md`**

Para datos numéricos exactos (velocidades, alcohol, distancias, tiempos, puntos):
> **Read `generar-preguntas/datos-numéricos.md`**

### 3. Explicaciones
Cada pregunta lleva explicación con formato parrafo + bullets con etiquetas de intención.
> **Read `generar-preguntas/explicaciones.md`**

### 4. Verificación
Antes de incluir cada pregunta, pasar la verificación completa (autosuficiencia, imagen, situacional, complejidad).
> **Read `generar-preguntas/verificación.md`**

### 5. Subagentes (si >30 preguntas)
- **1-30 preguntas**: Todo en el hilo principal, sin subagentes
- **31+ preguntas**: 1 solo subagente (Task tool, subagent_type: "general-purpose") que recibe las secciones relevantes del prompt

### 6. Revisión y guardado
1. Mostrar preguntas al usuario para revisión ANTES de guardar
2. Solo guardar en `content/preguntas/` cuando el usuario apruebe

---

## Pistas
- Ayudar a razónar sin revelar la respuesta
- No deben ser obvias ni inutiles
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
      "enunciado": "?Pregunta aqui?",
      "opciones": ["Opción A", "Opción B", "Opción C"],
      "correcta": 0,
      "explicación": "Explicación completa...",
      "pista": "Ayuda sutil...",
      "requiere_imagen": true,
      "tipo_imagen": "ninguna",
      "usa_trampa": false,
      "palabras_trampa": [],
      "origen": "generada",
      "validada": false
    }
  ]
}
```

## Tipos de Imagen
- `senal`: Pregunta sobre senal de tráfico
- `situación`: Situacion de tráfico (intersección, adelantamiento, estacionamiento)
- `vehículo`: Imagen de vehículo o parte (espejos, neumaticos, luces)
- `ninguna`: Pregunta teorica pura

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
