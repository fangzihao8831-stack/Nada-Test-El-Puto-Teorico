# Reglas de Verificación

**IMPORTANTE**: Antes de escribir cualquier pregunta, leer `ejemplos-referencia.md` para interiorizar el tono, estructura y calidad de distractores del DGT real. Estas reglas son controles mecanicos; el ESTILO se aprende de los ejemplos.

---

## Asignacion de subtema_id

El `subtema_id` se asigna segun el CONTENIDO de la pregunta, no segun el tema pedido.

**Errores frecuentes:**
- parada/estacionamiento → subtema_23 (no subtema_21)
- fatiga/sueño → subtema_46 (no subtema_43)
- móvil al volante → subtema_47 (no subtema_15)
- circular en autopista/autovía → subtema_32 (no subtema_16)
- adelantar ciclistas → subtema_21 (no subtema_35)
- velocidad inadecuada vs exceso → subtema_16 (no subtema_35)
- marcha atrás → subtema_18 (no subtema_35)

---

## Distribución de respuesta correcta (OBLIGATORIO)

En cada batch de 30 preguntas: correcta=0 debe ser 9-11, correcta=1 debe ser 9-11, correcta=2 debe ser 9-11.

Al terminar el batch, contar y reordenar opciones si es necesario. La explicacion describe contenido, no posicion, asi que reordenar nunca la rompe.

---

## Rechazo automático (HARD REJECT)

Si una pregunta cumple CUALQUIERA de estos, descartar y reescribir como escenario:

| Filtro | Detecta |
|--------|---------|
| **Fecha/año en enunciado** | "¿Desde cuándo...?", "¿En qué año...?" |
| **Pregunta sobre la norma** | "¿Qué dice la ley...?", "¿Qué establece...?" |
| **Trivia legislativa** | Respuesta es nombre de ley, decreto o artículo |
| **Recitar definición** | "¿Qué es...?", "¿Cómo se define...?" sin contexto |
| **Coste/precio** | Preguntas sobre cuánto cuesta algo |
| **Estadística** | Porcentajes de accidentes, datos epidemiológicos |
| **Código de señal en texto** | R-XXX, P-XXX, S-XXX en enunciado u opciones |
| **Cálculo o fórmula** | V²/254, velocidad×tiempo, distancia de frenado |
| **Pregunta negativa** | "¿Cuál es INCORRECTO?", "¿Qué NO debe hacer?" |
| **Artículo de ley** | Pide citar un artículo o código específico |
| **Variación regional** | Normas de una comunidad autónoma |

---

## Verificación factual

- Cada dato numerico debe verificarse contra `temario_permiso_b_v3.md`. Si no se encuentra, eliminar o marcar FLAG.
- Si las 3 opciones forman secuencia monotónica (70/80/90), REDISTRIBUIR con valores de condiciones distintas.
- Si la correcta contradice el conocimiento de Claude sobre tráfico español, marcar FLAG.
- La explicacion NUNCA contiene referencias a archivos (tema_XX.md). Ver `explicaciones.md`.

---

## Señales de tráfico

**Cuando la pregunta trata de una señal:**
1. Enunciado: "esta señal" (NUNCA R-XXX, P-XXX, S-XXX)
2. Opciones: describir por efecto, no por código
3. Campo `codigo_senal`: código real (ej: `"R-2"`)
4. El código SOLO puede aparecer en `explicacion` como referencia

**Sin señal:** `"codigo_senal": null`

---

## Enunciado autosuficiente

El enunciado + opciones deben contener TODA la informacion para responder. Si la respuesta depende de un detalle no mencionado (carriles, tipo de vía, señalización), el enunciado es defectuoso.

Para situacionales: combinar maximo 2 reglas por pregunta.

---

## Checklist por pregunta

- [ ] Campo `dificultad` con 6 dimensiones + total + nivel (ver `tipos-preguntas.md`)
- [ ] `nivel` coincide con `total` (0-2=L1, 3-5=L2, 6-7=L3, 8-9=L4). dato/directo/completar: max L3
- [ ] Campo `pista` (max 20 palabras, no revela respuesta)
- [ ] `subtema_id` correcto segun contenido
- [ ] Acentos correctos (¿, á/é/í/ó/ú, ñ, interrogativos con tilde)
- [ ] Sin codigo de señal en enunciado ni opciones
- [ ] Sin referencias a archivos en explicacion
- [ ] Sin letras de opcion (A/B/C) en explicacion
- [ ] Datos numericos verificados contra temario
- [ ] Sin secuencia monotónica en opciones

## Checklist de batch (AL TERMINAR las 30)

- [ ] Distribución correcta: contar correcta=0, correcta=1, correcta=2 → cada uno 9-11
- [ ] Sin dos preguntas sobre el mismo tema/dato específico
