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
- Fecha actual: Marzo 2026
- Si una norma ha cambiado recientemente, mencionar cuándo en la explicación
- Desde Feb 2026: el examen DGT incluye vídeos de percepción de riesgos

---

## Workflow

### 1. Preparación
1. Si se especifica tema/subtema, leer solo las secciones relevantes del temario
2. Si no se especifica tema, seguir paso 2.1 para generar el temario filtrado

### 2. Distribución de temas y tipos (OBLIGATORIO para 30 preguntas)

Si se generan 30 preguntas sin tema especificado, distribuir entre al menos 8 temas distintos (de los 12). Máximo 5 preguntas del mismo tema. **Cada subtema_id aparece UNA sola vez** en el batch. Si el subagente tiende a repetir luces/cinturón/alcohol/velocidad, forzar temas menos frecuentes: mercancías peligrosas, documentación, medio ambiente, primeros auxilios.

**Distribución de tipos**: directa 11-13, situacional 7-9, completar 6-8, dato 2-4.
**Distribución de dificultad**: nivel 1 (5-8), nivel 2 (12-16), nivel 3 (5-8), nivel 4 (2-4, solo situacional).

### 2.1 Selección de temas para el temario (OBLIGATORIO si no se especifica tema)

Antes de lanzar el subagente, el hilo principal (Opus) selecciona qué secciones del temario necesita el subagente:

1. Consultar el **Índice de Temas del Temario** (al final de este archivo)
2. Elegir 8-10 temas padre (de los 12) según la distribución decidida en paso 2
3. Para cada tema padre elegido, incluir TODOS sus números de TEMA. Si un tema padre tiene 6+ TEMA (como tema_07 o tema_10), puedes omitir 1-2 de baja relevancia para este batch
4. Respetar las dependencias del índice: incluir siempre los TEMA vinculados juntos
5. Ejecutar:
   ```
   node nadatest/scripts/extract-temario.mjs [números de TEMA] > content/temario_selected.md
   ```
   Ejemplo: `node nadatest/scripts/extract-temario.mjs 1 9 10 11 12 13 15 17 19 27 30 31 36 39 43 44 45 46 47 49 > content/temario_selected.md`

El subagente leerá `content/temario_selected.md` en lugar del temario completo (~50% menos tokens).

### 3. Generación
Para los tipos de pregunta, distribución y ejemplos difíciles, consultar:
> **Read `generar-preguntas/tipos-preguntas.md`**

Para reglas de dificultad del tipo específico, leer también el archivo del tipo: `generar-preguntas/[tipo].md` (dato.md, directo.md, completar.md o situacional.md según corresponda)

Para patrones de inicio de enunciado, palabras trampa y distribución por temas:
> **Read `generar-preguntas/patrones-y-trampas.md`**

Para datos numéricos exactos (velocidades, alcohol, distancias, tiempos, puntos):
> **Read `generar-preguntas/datos-numericos.md`**

### 4. Explicaciones
Cada pregunta lleva explicación con formato párrafo + bullets con etiquetas de intención.
> **Read `generar-preguntas/explicaciones.md`**

### 5. Verificación
Antes de incluir cada pregunta, pasar la verificación completa (autosuficiencia, imagen, situacional, complejidad).
> **Read `generar-preguntas/verificacion.md`**

### 6. Generación con subagente (SIEMPRE usar Sonnet)
Delegar SIEMPRE la generación a un subagente Sonnet para optimizar costes:
- **Task tool**: subagent_type: "general-purpose", model: "sonnet"
- **1-30 preguntas**: 1 subagente con todas las preguntas
- **31+ preguntas**: Dividir en varios subagentes (max 30 preguntas cada uno)

El hilo principal (Opus) solo coordina: parsea argumentos, lanza subagente(s), recibe resultado, muestra al usuario.

**Cada subagente DEBE leer estos archivos** (NO parafrasear ni resumir):

**PRIMERO — Ejemplos (leer ANTES de escribir cualquier pregunta):**
1. `.claude/commands/generar-preguntas/ejemplos-referencia.md` — preguntas DGT reales como referencia de tono, estructura y calidad de distractores. Imitar este estilo.

**Reglas y datos:**
2. `.claude/commands/generar-preguntas/verificacion.md` — reglas mecánicas (HARD REJECT, distribución, checklist)
3. `.claude/commands/generar-preguntas/tipos-preguntas.md` — tipos, distribución, niveles
4. `.claude/commands/generar-preguntas/datos-numericos.md` — valores numéricos exactos
5. `.claude/commands/generar-preguntas/explicaciones.md` — formato de explicaciones
6. `.claude/commands/generar-preguntas/patrones-y-trampas.md` — patrones de inicio, palabras trampa

**Solo el archivo del tipo asignado:**
7. `.claude/commands/generar-preguntas/[tipo].md` — (dato.md, directo.md, completar.md o situacional.md)

**Temario (SIEMPRE):**
8. `content/temario_selected.md` — temario filtrado con los TEMA seleccionados en paso 2.1. Si no existe o se especificó tema concreto, leer `temario_permiso_b_v3.md` completo.

**Solo si genera preguntas sobre señales:**
9. `content/imagenes/senales/catalogo.json` — códigos de señales

**Deduplicación (SIEMPRE):**
10. `content/preguntas/batch_*/scenarios.txt` — leer TODOS los scenarios.txt existentes. No generar preguntas con escenarios similares.

### 6.1 Post-generación: actualizar scenarios.txt
Después de escribir el JSON del batch, generar `scenarios.txt` en la misma carpeta con una línea por pregunta: `subtema_XX | enunciado (max 80 chars)`.

### 7. Revisión y guardado
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
- Temario completo: `temario_permiso_b_v3.md`
- Temario filtrado: `content/temario_selected.md` (generado en paso 2.1)
- Catálogo de señales: `content/imagenes/senales/catalogo.json` (235 señales con SVGs)
- Salida: `content/preguntas/`

---

## Índice de Temas del Temario

Referencia para el paso 2.1. Cada tema padre agrupa varios TEMA del temario (58 en total).

**tema_01** El Conductor y el Permiso (peso examen: 5%)
- TEMA 1: Permisos B, motos 125cc, remolques, noveles
- TEMA 2: Documentación conductor y vehículo
- TEMA 48: Permiso por puntos (8/12/15, pérdida, recuperación)

**tema_02** El Vehículo (peso: 8%)
- TEMA 3: Clasificación, MMA, neumáticos, equipamiento
- TEMA 7: ITV (periodicidad, resultados)
- TEMA 8: Seguro obligatorio (SOA)
- TEMA 52: Vehículos eléctricos e híbridos

**tema_03** Carga, Pasajeros y Remolques (peso: 5%)
- TEMA 4: Disposición de la carga, sobresaliente
- TEMA 5: Ocupantes, SRI, cinturón, animales
- TEMA 6: Remolques (B vs B+E, velocidad)

**tema_04** La Vía y sus Usuarios (peso: 7%)
- TEMA 9: Tipos de vías, zonas especiales
- TEMA 31: Peatones, ciclistas (1,5m), VMP
- TEMA 54: Nuevas señales 2026, ZBE
- TEMA 55: Ángulos muertos, giro holandés

**tema_05** Circulación y Velocidad (peso: 10%)
- TEMA 10: Sentido, carriles, arcén
- TEMA 11: Velocidad (límites, frenado)
- TEMA 12: Distancia de seguridad (regla 2s)
- TEMA 18: Marcha atrás

**tema_06** Prioridad y Maniobras (peso: 12%)
- TEMA 13: Prioridad (derecha, glorietas)
- TEMA 14: Incorporación a la circulación
- TEMA 15: Adelantamientos (1,5m ciclistas)
- TEMA 16: Intersecciones, giros, cambio de sentido
- TEMA 17: Parada y estacionamiento

**tema_07** Señalización (peso: 20%)
- TEMA 19: Alumbrado
- TEMA 20: Señales acústicas (claxon)
- TEMA 21: Jerarquía de señales
- TEMA 22: Señales de los agentes
- TEMA 23: Semáforos
- TEMA 24: Señales verticales
- TEMA 25: Marcas viales
- TEMA 26: Señalización circunstancial

**tema_08** Situaciones Especiales (peso: 8%)
- TEMA 27: Autopistas y autovías
- TEMA 28: Túneles
- TEMA 29: Pasos a nivel
- TEMA 30: Condiciones adversas
- TEMA 53: Preparación del viaje
- TEMA 58: Conducción en grupo

**tema_09** Seguridad y Tecnología (peso: 5%)
- TEMA 32: Seguridad activa (ABS, ESP)
- TEMA 33: Seguridad pasiva (cinturón, airbag)
- TEMA 34: ADAS (ACC, ISA, AEB, eCall)
- TEMA 35: Comprobaciones y mantenimiento
- TEMA 57: Conducción autónoma (niveles SAE)

**tema_10** Factores de Riesgo (peso: 10%)
- TEMA 36: Alcohol (tasas, controles)
- TEMA 37: Drogas
- TEMA 38: Medicamentos (pictograma)
- TEMA 39: Fatiga y sueño (microsueños)
- TEMA 40: Distracciones (móvil 6 puntos)
- TEMA 41: Velocidad como riesgo
- TEMA 42: Estados emocionales

**tema_11** Accidentes, Emergencias y Medio Ambiente (peso: 5%)
- TEMA 43: Conducta PAS
- TEMA 44: Primeros auxilios (PLS, RCP 30:2)
- TEMA 45: Equipamiento (triángulos, V-16, chaleco)
- TEMA 46: Conducción eficiente
- TEMA 47: Medio ambiente (etiquetas, ZBE)

**tema_12** Infracciones y Sanciones (peso: 5%)
- TEMA 49: Infracciones (leves, graves, muy graves)
- TEMA 50: Responsabilidad (administrativa, civil, penal)
- TEMA 51: Inmovilización y retirada
- TEMA 56: Procedimiento sancionador (50% en 20 días)

### Dependencias (incluir juntos)
- TEMA 11 + TEMA 6: velocidad con remolque
- TEMA 19 + TEMA 30: alumbrado en condiciones adversas
- TEMA 36 + TEMA 37: alcohol y drogas
- TEMA 43 + TEMA 44 + TEMA 45: accidentes y emergencias
- TEMA 1 + TEMA 6: permisos B+E y código 96
- TEMA 32 + TEMA 33: seguridad activa y pasiva
