# Reglas de Verificación

**IMPORTANTE**: Antes de escribir cualquier pregunta, leer `ejemplos-referencia.md` para interiorizar tono, estructura y calidad de distractores del DGT real.

---

## Asignación de subtema_id

El `subtema_id` se asigna según el CONTENIDO, no según el tema pedido.

**Errores frecuentes:** parada/estacionamiento → subtema_23 | fatiga/sueño → subtema_46 | móvil al volante → subtema_47 | circular en autopista → subtema_32 | adelantar ciclistas → subtema_21 | velocidad inadecuada → subtema_16 | marcha atrás → subtema_18

---

## Distribución de respuesta correcta (OBLIGATORIO)

En cada batch de 30: correcta=0 → 9-11, correcta=1 → 9-11, correcta=2 → 9-11. Al terminar, contar y reordenar opciones si necesario.

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

- [ ] `dificultad` con 6 dimensiones + total + nivel. dato/directo/completar: max L3
- [ ] `pista` (max 20 palabras, no revela respuesta)
- [ ] `subtema_id` correcto según contenido
- [ ] Acentos correctos (¿, á/é/í/ó/ú, ñ)

- [ ] Sin referencias a archivos ni letras A/B/C en explicación
- [ ] Datos numéricos verificados contra temario
- [ ] Sin secuencia monotónica en opciones

## Checklist de batch (AL TERMINAR las 30)

- [ ] Distribución: correcta=0, correcta=1, correcta=2 → cada uno 9-11
- [ ] Sin dos preguntas sobre el mismo tema/dato específico
