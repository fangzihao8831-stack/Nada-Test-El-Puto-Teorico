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
3. Preguntas qué debe HACER el conductor en esa situación (ej: "¿Dónde debe colocar la baliza V-16?")

El flujo PROHIBIDO es:
1. Lees un dato del temario (ej: "V-16 obligatoria desde enero 2026")
2. Conviertes ese dato en pregunta (ej: "¿Desde cuándo es obligatoria la V-16?")

**La DGT nunca pregunta CUÁNDO ni QUÉ dice una norma. Pregunta qué HACES tú como conductor cuando esa norma aplica.**

Antes de escribir cada pregunta, verifica mentalmente:
> "¿Estoy pidiendo al alumno que APLIQUE una regla en una situación, o que RECITE un dato?"

Si la respuesta es "recitar", reescribe la pregunta como escenario.

### Ejemplos de transformación dato → escenario

| Dato del temario | Pregunta PROHIBIDA | Pregunta CORRECTA |
|---|---|---|
| V-16 obligatoria desde 2026 | ¿Desde cuándo es obligatoria la V-16? | Su vehículo se avería en una autovía. ¿Dónde debe colocar la baliza V-16? |
| Tasa alcohol novel: 0,15 mg/l | ¿Cuál es la tasa máxima para noveles? | Usted es conductor novel y le paran en un control. ¿A partir de qué tasa daría positivo? |
| ITV cada 2 años para vehículos 4-10 años | ¿Cada cuánto pasa la ITV un turismo de 7 años? | Su turismo tiene 7 años. Le convocan para la ITV pero pasó hace 18 meses. ¿Debe acudir ya? |
| Permiso B autoriza motos 125cc tras 3 años | ¿Qué motos puede conducir con permiso B? | Tiene el permiso B desde hace 4 años. ¿Puede conducir una motocicleta de 125 cc por territorio nacional? |

**Excepción**: Las preguntas tipo `dato` (~10%) SÍ preguntan datos concretos, pero siempre contextualizados en una situación práctica, nunca como trivia sobre la norma en sí.

## Idioma
- Español de España con acentos correctos (á, é, í, ó, ú, ñ)
- Signos de interrogación de apertura (¿)
- Ejemplos: vehículo, circulación, señalización, kilómetros

## Normativa
- Fecha actual: Febrero 2026
- Si una norma ha cambiado recientemente, mencionar cuándo en la explicación
- Desde Feb 2026: el examen DGT incluye vídeos de percepción de riesgos

---

## Workflow

### 1. Preparación
1. Lee el temario en `temario_permiso_b_v3.md`
2. Si no se especifica tema, elige temas variados (no repetir el mismo)

### 2. Generación
Para los tipos de pregunta, distribución y ejemplos difíciles, consultar:
> **Read `generar-preguntas/tipos-preguntas.md`**

Para reglas de dificultad del tipo específico, leer también el archivo del tipo: `generar-preguntas/[tipo].md` (dato.md, directo.md, completar.md o situacional.md según corresponda)

Para patrones de inicio de enunciado, palabras trampa y distribución por temas:
> **Read `generar-preguntas/patrones-y-trampas.md`**

Para datos numéricos exactos (velocidades, alcohol, distancias, tiempos, puntos):
> **Read `generar-preguntas/datos-numericos.md`**

### 3. Explicaciones
Cada pregunta lleva explicación con formato párrafo + bullets con etiquetas de intención.
> **Read `generar-preguntas/explicaciones.md`**

### 4. Verificación
Antes de incluir cada pregunta, pasar la verificación completa (autosuficiencia, imagen, situacional, complejidad).
> **Read `generar-preguntas/verificacion.md`**

### 5. Generacion con subagente (SIEMPRE usar Sonnet)
Delegar SIEMPRE la generacion a un subagente Sonnet para optimizar costes:
- **Task tool**: subagent_type: "general-purpose", model: "sonnet"
- **1-30 preguntas**: 1 subagente con todas las preguntas
- **31+ preguntas**: Dividir en varios subagentes (max 30 preguntas cada uno)

El hilo principal (Opus) solo coordina: parsea argumentos, lanza subagente(s), recibe resultado, muestra al usuario.

**Cada subagente DEBE leer estos archivos** (NO parafrasear ni resumir):

**PRIMERO — Ejemplos (leer ANTES de escribir cualquier pregunta):**
1. `.claude/commands/generar-preguntas/ejemplos-referencia.md` — preguntas DGT reales como referencia de tono, estructura y calidad de distractores. Imitar este estilo.

**Reglas y datos:**
2. `.claude/commands/generar-preguntas/verificacion.md` — reglas mecanicas (HARD REJECT, distribucion, checklist)
3. `.claude/commands/generar-preguntas/tipos-preguntas.md` — tipos, distribucion, niveles
4. `.claude/commands/generar-preguntas/datos-numericos.md` — valores numericos exactos
5. `.claude/commands/generar-preguntas/explicaciones.md` — formato de explicaciones
6. `.claude/commands/generar-preguntas/patrones-y-trampas.md` — patrones de inicio, palabras trampa

**Solo el archivo del tipo asignado:**
7. `.claude/commands/generar-preguntas/[tipo].md` — (dato.md, directo.md, completar.md o situacional.md)

**Temario (SIEMPRE):**
8. `temario_permiso_b_v3.md` — fuente de verdad para todo el contenido

**Solo si genera preguntas sobre senales:**
9. `content/imagenes/senales/catalogo.json` — codigos de senales

**Deduplicacion (SIEMPRE):**
10. `content/preguntas/batch_*/scenarios.txt` — leer TODOS los scenarios.txt existentes. No generar preguntas con escenarios similares.

### 5.1 Post-generacion: actualizar scenarios.txt
Despues de escribir el JSON del batch, generar `scenarios.txt` en la misma carpeta con una linea por pregunta: `subtema_XX | enunciado (max 80 chars)`.

### 6. Revisión y guardado
1. Mostrar preguntas al usuario para revisión ANTES de guardar
2. Solo guardar en `content/preguntas/` cuando el usuario apruebe

---

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
      "codigo_señal": null,
      "dificultad": {
        "d_reglas": 1,
        "d_excepcion": 0,
        "d_densidad": 1,
        "d_implicito": 0,
        "d_distractores": 2,
        "d_contraintuitivo": 0,
        "total": 4,
        "nivel": 2
      },
      "origen": "generada",
      "validada": false
    }
  ]
}
```

Para reglas de señales y campo `codigo_señal`, ver `verificacion.md`.

## Archivos de referencia
- Temario: `temario_permiso_b_v3.md`
- Catálogo de señales: `content/imagenes/senales/catalogo.json` (235 señales con SVGs)
- Salida: `content/preguntas/`
