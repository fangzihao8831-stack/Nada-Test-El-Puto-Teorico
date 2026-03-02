# Reglas de Verificación

**IMPORTANTE**: Antes de escribir cualquier pregunta, leer `ejemplos-referencia.md` para interiorizar tono, estructura y calidad de distractores del DGT real.

---

## Asignación de subtema_id

El `subtema_id` se asigna según el CONTENIDO, no según el tema pedido.

**Errores frecuentes:** parada/estacionamiento → subtema_23 | fatiga/sueño → subtema_46 | móvil al volante → subtema_47 | circular en autopista → subtema_32 | adelantar ciclistas → subtema_21 | velocidad inadecuada → subtema_16 | marcha atrás → subtema_18

---

## Distribución de respuesta correcta (OBLIGATORIO)

En cada batch de 30: correcta=0 → 9-11, correcta=1 → 9-11, correcta=2 → 9-11.

**Post-generación**: Contar las 30 preguntas y verificar. Si alguna posición tiene <9 o >11, reordenar opciones de las preguntas necesarias (intercambiar posición de correcta con otra opción). NO continuar sin cumplir 9-11.

---

## Rechazo automático (HARD REJECT)

Si cumple CUALQUIERA, descartar y reescribir:

- **Fecha/año en enunciado**: "¿Desde cuándo...?", "¿En qué año...?"
- **Pregunta sobre la norma**: "¿Qué dice la ley...?", "¿Qué establece...?"
- **Trivia legislativa**: respuesta es nombre de ley, decreto o artículo
- **Recitar definición**: "¿Qué es...?", "¿Cómo se define...?" sin contexto
- **Coste/precio**: cuánto cuesta algo
- **Estadística**: porcentajes de accidentes, datos epidemiológicos

- **Cálculo o fórmula**: V²/254, velocidad×tiempo
- **Pregunta negativa**: "¿Cuál es INCORRECTO?", "¿Qué NO debe hacer?"
- **Artículo de ley**: pide citar artículo o código
- **Variación regional**: normas de una comunidad autónoma

---

## Longitud y estilo DGT (HARD REJECT si se excede)

**Límites de longitud:**
- Enunciado: **máximo 120 caracteres**. DGT real promedia 82, máximo ~110.
- Cada opción: **máximo 80 caracteres**. DGT real promedia 46, máximo ~80.
- Si se excede, recortar. Sin excepciones.

**Estilo directo (imitar DGT real, no inventar otro):**
- Ir al grano: "¿Está permitido adelantar en túnel?" — NO "Usted circula por un túnel de un solo carril y el vehículo delantero va lento. ¿Puede adelantarlo?"
- Contexto breve: una frase de situación + pregunta. NO dos frases de escenario + pregunta.
- Sin relleno emocional: NO "usted considera que...", "decide que...", "se encuentra preocupado por..."
- Opciones concisas: "Sí, siempre.", "No, en ningún caso.", "Solo en autopistas." — NO explicar el porqué dentro de la opción.

**Patrones DGT frecuentes (usar estos):**
- "¿Está permitido / obligatorio / prohibido [acción]?"
- "¿Qué debe hacer si [situación breve]?"
- "[Situación corta], ¿qué luces / velocidad / distancia...?"
- "Su turismo [dato]. ¿[pregunta]?"

---

## Verificación factual

- Datos numéricos verificados contra `temario_permiso_b_v3.md`. Si no se encuentra, eliminar o FLAG.
- Si 3 opciones forman secuencia monotónica (70/80/90), REDISTRIBUIR con valores de condiciones distintas.
- Si correcta contradice conocimiento de Claude sobre tráfico español, FLAG.
- Explicación NUNCA contiene referencias a archivos (tema_XX.md).

---

## Señales de tráfico

Cuando la pregunta trata de una señal: enunciado usa "esta señal" (NUNCA R-XXX), opciones describen por efecto, `codigo_senal` tiene el código real, código solo en `explicación`. Sin señal: `"codigo_senal": null`.

---

## Enunciado autosuficiente

Enunciado + opciones contienen TODA la información para responder. Si la respuesta depende de detalle no mencionado, el enunciado es defectuoso. Situacionales: máximo 2 reglas por pregunta.

---

## Checklist por pregunta

- [ ] Enunciado ≤ 120 caracteres, cada opción ≤ 80 caracteres
- [ ] `dificultad` con 6 dimensiones + total + nivel. dato/directo/completar: max L3
- [ ] `pista` (max 20 palabras, no revela respuesta)
- [ ] `subtema_id` correcto según contenido
- [ ] Acentos correctos (¿, á/é/í/ó/ú, ñ)

- [ ] Sin referencias a archivos ni letras A/B/C en explicación
- [ ] Datos numéricos verificados contra temario
- [ ] Sin secuencia monotónica en opciones
- [ ] Opciones concisas: sin justificaciones dentro de la opción. El "porqué" va en explicación.
- [ ] Cada distractor es plausible (un alumno real lo creería). Sin opciones absurdas.

## Distribución de dificultad (OBLIGATORIO para 30 preguntas)

Para un batch de 30: nivel 1 → 5-8, nivel 2 → 12-16, nivel 3 → 5-8, nivel 4 → 2-4 (solo situacional). Si nivel 2 supera 16, subir dificultad de algunas preguntas añadiendo dimensiones (d_excepcion, d_contraintuitivo, d_densidad).

---

## Distribución de tipos (OBLIGATORIO para 30 preguntas)

Respetar las frecuencias de tipos-preguntas.md: directa ~40% (11-13), situacional ~27% (7-9), completar ~23% (6-8), dato ~10% (2-4). Si el batch se desvía, reequilibrar antes de entregar.

---

## Checklist de batch (AL TERMINAR las 30)

- [ ] Distribución: correcta=0, correcta=1, correcta=2 → cada uno 9-11
- [ ] Distribución dificultad: nivel 1 (5-8), nivel 2 (12-16), nivel 3 (5-8), nivel 4 (2-4)
- [ ] Distribución tipos: directa (11-13), situacional (7-9), completar (6-8), dato (2-4)
- [ ] Sin dos preguntas del mismo `subtema_id`
- [ ] Sin dos preguntas sobre el mismo tema/dato específico aunque tengan distinto subtema_id
