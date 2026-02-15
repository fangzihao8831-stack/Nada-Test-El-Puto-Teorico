# Reglas de Verificación

## Verificación básica
- Cada pregunta DEBE verificarse contra el temario antes de incluirla
- Si un dato numérico no coincide con el temario, usar el temario como fuente de verdad
- Las explicaciones deben incluir excepciones e información adicional
- Acentos y n correctos en todo el texto
- Fechas solo en la explicación como info adicional, NUNCA en el enunciado
- Opciones incorrectas DEBEN usar al menos 1 palabra trampa del listado (ver `patrones-y-trampas.md`)
- La opción correcta debe tener matiz, nunca un absoluto sin excepción
- NO generar preguntas que se responden por sentido común sin conocimiento de tráfico

---

## Regla del enunciado autosuficiente (CRITICA)

El enunciado + opciones DEBEN contener TODA la información necesaria para determinar la respuesta correcta. Si la respuesta cambia segun un detalle no mencionado, el enunciado es DEFECTUOSO.

**Test de autosuficiencia**: Antes de finalizar cada pregunta situacional, preguntarse:
> "¿Podria alguien razónar la respuesta correcta SOLO con el texto, sin ver ninguna imagen?"

Si la respuesta es NO, hay que anadir contexto al enunciado.

**Factores que deben estar explicitos si afectan la respuesta**:
- Numero de carriles y su configuración (solo giro, combinado, etc.)
- Tipo de via (urbana, interurbana, autopista, travesia)
- Presencia/ausencia de señalización (semaforos, senales, marcas viales)
- Condiciones de visibilidad o meteorologicas cuando sean relevantes
- Posicion relativa de los vehículos implicados
- Tipo de intersección (glorieta, cruce en T, cruce regulado)

**Ejemplo MALO** (ambiguo — la respuesta depende de los carriles):
```
"Esta detenido en un semaforo en rojo y el vehículo de detras quiere girar
 con la flecha verde encendida. ¿Que debe hacer?"
-> DEFECTUOSO: Si hay carril de giro exclusivo, el de atras deberia estar ahi.
   Si es carril compartido, usted podria estar obligado a girar.
```

**Ejemplo BUENO** (contexto completo):
```
"Esta detenido en el carril izquierdo de una via de dos carriles por sentido.
 Su semaforo para seguir recto esta en rojo. El carril derecho tiene una flecha
 verde para girar a la derecha. El vehículo detras de usted quiere girar a la
 derecha. ¿Que debe hacer?"
-> CORRECTO: El contexto aclara que hay dos carriles y el de giro es otro.
   La respuesta es clara: quedarse quieto, el de atras debe cambiar de carril.
```

---

## Clasificacion de dependencia de imagen

Todas las preguntas tienen `requiere_imagen: true`, pero el generador debe distinguir internamente:

| Dependencia | Descripción | Accion |
|-------------|-------------|--------|
| **Suplementaria** | La imagen enriquece pero el texto basta para responder | El enunciado es autosuficiente tal cual |
| **Esencial** | La respuesta depende de elementos visuales (layout de carriles, posición exacta, senal concreta) | El enunciado DEBE describir esos elementos explicitamente hasta que las imagenes se generen |

Si durante la generación se detecta que una pregunta seria de dependencia "esencial", se DEBE:
1. Anadir al enunciado la descripción textual del contexto visual
2. O simplificar el escenario para que sea autosuficiente

---

## Verificación de escenarios situacionales

Para preguntas tipo `situacional`, verificar ANTES de incluir:

1. **¿El escenario exacto aparece en el temario o todotest?**
   - SI -> usar esa fuente como base de la pregunta
   - NO -> la pregunta se construye por DEDUCCION. Marcarla mentalmente como "deducida"

2. **¿La respuesta tiene UNA sola posibilidad correcta sin importar detalles no mencionados?**
   - SI -> pregunta valida
   - NO -> la pregunta es AMBIGUA. Anadir contexto o descartar

3. **¿La combinación de reglas crea un escenario que existe en la realidad?**
   - SI -> pregunta valida
   - NO -> escenario artificial que puede confundir mas que ensenar. Simplificar

**Limite de complejidad**: Combinar máximo 2 reglas por pregunta. Si la combinación de 3+ reglas crea un escenario donde las fuentes primarias no lo cubren directamente, es preferible simplificar. Las preguntas mas dificiles del DGT real combinan 2 reglas, no 3+.

---

## Calidad: Evitar Preguntas Obvias

**IMPORTANTE**: NO generar preguntas que cualquier persona responde correctamente por sentido común. Cada pregunta debe tener al menos UNO de estos elementos de dificultad:

| Elemento | Descripción | Ejemplo |
|----------|-------------|---------|
| **Excepción a regla conocida** | La respuesta correcta contradice lo que el alumno cree saber | Animales SI pueden circular por carretera convencional |
| **Opciones muy similares** | Las 3 opciones suenan razonables, difieren en un matiz | 0,15 vs 0,25 vs 0,30 mg/l |
| **Dato preciso confundible** | Numero exacto que se confunde con otro parecido | 100m en tunel, 1,5m a ciclistas, 5m de intersección |
| **Combinacion de reglas** | Requiere aplicar 2 reglas simultaneamente (max 2) | Prioridad en glorieta + vehículo especial |
| **Respuesta contraintuitiva** | La opción que "suena bien" es incorrecta | El profesor es el conductor en autoescuela, no el alumno |

### Archivos de referencia de dificultad
Antes de generar, consultar estos archivos para calibrar el nivel de dificultad:
- `content/hardest_directa.json` — 57 preguntas directas dificiles
- `content/hardest_completar.json` — 133 preguntas completar dificiles
- `content/hardest_situacional.json` — 84 preguntas situacionales dificiles
- `content/hardest_dato.json` — 457 preguntas de datos numéricos confundibles

### Mezcla de dificultad por test
Un test de 30 preguntas debe tener esta distribución aproximada:
- **~10 faciles** (30%): Reglas básicas, respuesta clara por descarte
- **~12 medias** (40%): Requieren conocimiento específico pero sin trampa
- **~8 dificiles** (30%): Excepciones, datos confundibles, combinación de reglas
