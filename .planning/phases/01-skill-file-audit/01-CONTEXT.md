# Fase 1: Auditoría de Skill Files - Contexto

**Recopilado:** 2026-02-23
**Estado:** Listo para planificación

<domain>
## Límite de la Fase

Auditar y mejorar todos los skill files que influyen en la calidad de generación. Incluye:
- Referencias de datos numéricos (`datos-numericos.md`, `datos-referencia.md`) — corregir contra el temario oficial, añadir citas
- Archivos de instrucciones de generación (`tipos-preguntas.md`, `patrones-y-trampas.md`, `verificacion.md`, `explicaciones.md`) — reescribir donde sea necesario
- Nuevos skill files por tipo — crear `dato.md`, `directo.md`, `completar.md`, `situacional.md` con niveles de dificultad y ejemplos de referencia

Fuera de alcance: nuevos flujos de generación, reformateado de preguntas con imagen, cambios en el validador (Fase 2).

</domain>

<decisions>
## Decisiones de Implementación

### Profundidad de mejora de skill files
- Reescritura completa permitida — sin restricciones para reestructurar cualquier sección o archivo
- Los 4 archivos de instrucciones existentes se revisan con igual profundidad
- Barra de calidad: imitar el estilo real del examen DGT (tono, redacción, distribución de dificultad de la base de 2700 preguntas)
- Los exámenes DGT oficiales usan exactamente **3 opciones de respuesta (A, B, C)** — todas las reglas y ejemplos deben reflejar esto

### Nuevos skill files por tipo de pregunta
- Crear 4 nuevos archivos bajo el skill de generación: `dato.md`, `directo.md`, `completar.md`, `situacional.md`
- Cada archivo documenta: definición del tipo, niveles de dificultad con ejemplos concretos, reglas de distractores por nivel
- Los ejemplos de referencia dentro de estos archivos deben generarse usando el skill `/generar-preguntas` — no hacerlos a mano

### Niveles de dificultad
**DATO, DIRECTO, COMPLETAR — 3 niveles:**

| Nivel | Etiqueta | Definición |
|-------|----------|------------|
| 1 | Fácil | Un único hecho o regla. Los distractores son claramente de otro contexto. |
| 2 | Medio | Requiere conocer un umbral específico, excepción, o condición combinada. Un distractor es plausible para un lector descuidado. |
| 3 | Difícil | Todos los distractores son valores/reglas reales del temario aplicados a una condición ligeramente distinta. No deducible por eliminación. |

**SITUACIONAL — 4 niveles:**

| Nivel | Etiqueta | Definición |
|-------|----------|------------|
| 1 | Fácil | 1 variable, aplicación clara de una regla. |
| 2 | Medio | 2 condiciones combinadas. Un distractor activa el instinto equivocado. |
| 3 | Difícil | Excepción a una regla conocida, o conflicto de reglas. Las 3 respuestas son plausibles sin dominar la norma. |
| 4 | Muy Difícil | Dos reglas parecen entrar en conflicto directo. El alumno debe saber cuál prevalece. Todas las opciones son muy plausibles. |

Principio central en todos los tipos: **mayor nivel = distractores más plausibles**. En Nivel 3+, un alumno que no conozca la regla exacta no puede eliminar ninguna opción por lógica.

### Reglas de calidad para situacional
- Los escenarios deben incluir detalles concretos: tipo de vía, velocidad, condiciones meteorológicas, otros vehículos presentes, hora del día cuando sea relevante
- La complejidad escala con el nivel: Nivel 1 = 1 variable; Nivel 2 = 2 combinadas; Nivel 3 = excepción o multi-regla; Nivel 4 = reglas en conflicto
- Foco principal: situacional es el tipo de pregunta más débil en la generación actual

### Nuevas reglas a añadir en verificacion.md
- **Verificación de exactitud factual**: antes de conservar una pregunta, identificar la sección específica del temario (tema_XX.md) que confirma la respuesta correcta
- **Verificación cruzada con conocimiento de Claude**: si la respuesta correcta contradice el conocimiento general de Claude → marcar FLAG para revisión humana (el temario es la autoridad del examen; la contradicción señala un posible error)
- **Verificación de secuencia en distractores** (NUEVO — descubierto durante la discusión): para preguntas de tipo dato sobre velocidades o distancias, las 3 opciones NO deben formar una secuencia monotónica de la misma fila de la tabla. Ejemplo de patrón PROHIBIDO: 80/90/100 para una pregunta de velocidad con remolque — el alumno elige el valor del medio sin saber la norma. Corrección: usar valores de DISTINTAS condiciones del mismo escenario (diferente peso del vehículo, diferente tipo de vía) para que cada opción requiera conocimiento específico de la regla.

### Formato de citas (datos-numericos.md)
- Referencias parentéticas inline: `(tema_05.md)` añadido tras cada valor
- Para valores que abarcan varias secciones: `(tema_04.md, tema_05.md)`
- A criterio de Claude la colocación exacta dentro de cada fila

### Gestión de discrepancias durante la auditoría
- Corregir en el mismo pase (auditoría + corrección en un solo paso — sin archivo de log separado)
- Cada valor corregido recibe su cita en el mismo momento

### Estrategia de sincronización de datos-referencia.md
- Puede ser un subconjunto simplificado de datos-numericos.md (no necesariamente idéntico en estructura)
- Incluir solo los valores que el validador usa activamente al comprobar respuestas
- No debe contradecir datos-numericos.md en ningún valor compartido

### A criterio de Claude
- Colocación exacta de las citas dentro de cada línea de datos-numericos.md
- Si añadir cabeceras de sección o reestructurar datos-numericos.md más allá de las correcciones
- Qué valores incluir u omitir en el datos-referencia.md simplificado

</decisions>

<specifics>
## Ideas Específicas

### Ejemplos de referencia (aprobados durante la discusión)

**DATO:**

Fácil (distractor de contexto equivocado, no secuencial):
> Le realizan una prueba de alcoholemia. El etilómetro marca 0,30 mg/l en aire espirado. Usted lleva 5 años con el carnet. ¿Ha cometido una infracción?
> A) No, el límite general es 0,50 mg/l. — **B) Sí, supera el límite de 0,25 mg/l.** — C) Solo si la segunda prueba, 10 minutos después, lo confirma.

Medio (confusión de umbral — mismo vehículo, distinto tramo de antigüedad):
> Su turismo tiene 11 años de antigüedad y pasó la ITV hace 20 meses. ¿Tiene la ITV en vigor?
> A) Sí, los turismos de más de 10 años pasan la ITV cada 2 años. — **B) No, deben pasarla anualmente a partir de los 10 años.** — C) Sí, el plazo de 24 meses no ha vencido todavía.

Difícil (patrón CORRECTO — opciones de distintas condiciones del mismo escenario):
> Circula por carretera convencional arrastrando un remolque de 600 kg de MMA. ¿Cuál es su velocidad máxima?
> A) 70 km/h *(remolque pesado en carretera — umbral equivocado)* — **B) 80 km/h** — C) 90 km/h *(turismo sin remolque en carretera)*

Nota: 70/80/90 son valores reales de la tabla de velocidades pero para condiciones distintas — no deducibles por eliminación.

**DIRECTO:**

Fácil:
> ¿Es obligatorio el uso del cinturón de seguridad en las vías urbanas?
> A) No, solo en vías interurbanas. — B) Solo cuando se circula a más de 30 km/h. — **C) Sí.**

Medio (excepción que requiere conocimiento específico):
> ¿Puede girar a la derecha en una intersección con semáforo en rojo si la calzada transversal está despejada?
> A) Sí, si lo hace con precaución y velocidad reducida. — B) No, en ningún caso. — **C) Solo si existe una señal específica que lo autorice.**

Difícil (puente móvil — prohibición absoluta contraintuitiva):
> ¿Está permitido adelantar mientras cruza un puente móvil con las barreras levantadas y el puente en posición horizontal?
> A) Sí, si hay espacio y visibilidad suficiente. — B) Sí, cuando el puente esté completamente estabilizado. — **C) No.**

**COMPLETAR:**

Fácil:
> La intención de efectuar una maniobra debe señalizarse...
> A) en el momento de iniciarla. — **B) con suficiente antelación para que los demás puedan reaccionar.** — C) solo si hay otros vehículos a la vista.

Medio (intersección — distancia exacta reglamentaria):
> Para estacionar junto a un cruce en vía urbana, la distancia mínima a la intersección debe ser de...
> A) 3 metros. — **B) 5 metros.** — C) 10 metros.

Difícil (las 3 opciones parecen normas legales válidas):
> Los ciclistas mayores de 14 años tienen permitido circular por las autovías...
> A) por cualquier carril si respetan las normas de circulación. — **B) exclusivamente por el arcén.** — C) solo cuando no existe una vía ciclista alternativa habilitada en el trayecto.

**SITUACIONAL:**

Fácil (1 condición):
> Circula de noche por una carretera sin iluminación con las luces largas encendidas. Se aproxima un vehículo en sentido contrario. ¿Qué debe hacer con las luces?
> A) Mantener las luces largas para ver mejor la calzada. — **B) Cambiar a luz de cruce.** — C) Apagar las luces brevemente para no deslumbrar.

Medio (glorieta + vehículo de emergencias — 2 reglas):
> Circula por el interior de una glorieta y un vehículo de emergencias con sirena y luces activadas intenta entrar en ella. ¿Qué debe hacer?
> A) Mantener su prioridad dentro de la glorieta sin interrumpir la circulación. — B) Acelerar para salir antes de que entre el vehículo de emergencias. — **C) Facilitar el paso al vehículo de emergencias, deteniéndose si es necesario.**

Difícil (excepción a regla conocida — línea continua para ciclistas):
> Circula por carretera convencional con línea continua en el eje. Para adelantar a un ciclista necesita invadir el carril contrario para mantener la distancia lateral reglamentaria. No viene ningún vehículo de frente. ¿Puede adelantar?
> A) No, la línea continua prohíbe invadir el carril contrario en cualquier circunstancia. — B) Sí, pero solo si la visibilidad supera los 200 metros. — **C) Sí, está permitido cruzar la línea continua para adelantar a ciclistas manteniendo la distancia lateral reglamentaria.**

Muy Difícil (bus escolar + semáforo — reglas en conflicto aparente):
> Circula por una vía urbana con su semáforo en verde. En el carril derecho, un autobús escolar está detenido con las luces de advertencia de parada activadas y recogiendo menores. ¿Qué debe hacer?
> **A) Parar hasta que el autobús desactive las señales de parada.** — B) Continuar; el semáforo en verde prevalece sobre las señales del autobús. — C) Reducir la velocidad y pasar con precaución si los menores no cruzan la calzada.

</specifics>

<deferred>
## Ideas Diferidas

- **Reformateador de preguntas con imagen** — Cuando se asigna una imagen a una pregunta situacional, un paso posterior a la generación reescribe el enunciado para referenciar la imagen directamente ("¿Quién tiene prioridad en esta imagen?" en lugar de describir el escenario en texto). Capacidad diferente, fase separada.

</deferred>

---

*Fase: 01-skill-file-audit*
*Contexto recopilado: 2026-02-23*
