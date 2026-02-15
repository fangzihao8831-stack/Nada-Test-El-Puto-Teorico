# CHECK 4: Verificacion de Datos (Check Principal)

Verifica que los datos de la pregunta son correctos contrastando 3+ fuentes.

## Fuentes (las 3 deben consultarse)
1. `temario_permiso_b_v3.md` - buscar con Grep la seccion relevante
2. `content/todotest_2700.json` - buscar preguntas sobre el mismo tema
3. Conocimiento propio de Claude sobre normativa de trafico espanola

## Algoritmo paso a paso

Para cada pregunta:

1. **Leer** enunciado, opciones, correcta y explicacion
2. **Identificar** que hecho/regla/dato se esta evaluando
3. **Buscar en temario** con Grep (ej: "novel" + "alcohol" para tasas de alcohol)
4. **Buscar en todotest** preguntas sobre el mismo tema
5. **Clasificar el tipo de evidencia** de cada fuente:
   - **DIRECTO**: La fuente cubre el escenario EXACTO de la pregunta (misma situacion, misma regla)
   - **INDIRECTO**: La fuente tiene un principio general relacionado del cual se puede DEDUCIR la respuesta
   - **SIN MATCH**: La fuente no cubre este tema/escenario en absoluto
6. **Comparar** lo que dicen las 3 fuentes
7. **Si temario = SIN MATCH y todotest = SIN MATCH** -> web search es OBLIGATORIO (ver reglas abajo)

## Que verificar por pregunta
- La opcion marcada como correcta (`opciones[correcta]`) es REALMENTE correcta?
- Las otras 2 opciones son REALMENTE incorrectas?
- La explicacion coincide con la respuesta correcta (no la contradice)?
- Todos los valores numericos son exactos (velocidades, distancias, tasas, puntos, plazos)?

---

## Escenarios de decision

**APROBADA - Las 3 fuentes coinciden**:
```
PREGUNTA: "¿A que velocidad maxima puede circular un turismo en autopista?"
CORRECTA: "120 km/h"

Temario (Grep "velocidad" + "autopista" + "turismo"):
  -> "Turismo en autopista/autovia: 120 km/h" CHECK

Todotest (Grep "velocidad" + "autopista"):
  -> Preguntas confirman 120 km/h CHECK

Claude: 120 km/h para turismo en autopista CHECK

VEREDICTO: APROBADA (3 fuentes coinciden)
```

**RECHAZADA - Las fuentes contradicen la pregunta**:
```
PREGUNTA: "Los conductores noveles tienen una tasa maxima de 0,25 mg/l"

Temario: "Novel < 2 anos: 0,15 mg/l aire" -> CONTRADICE
Todotest: preguntas dicen 0,15 mg/l -> CONTRADICE
Claude: 0,15 mg/l -> CONTRADICE

Todas contradicen -> lanzar web search para confirmar:
  WebSearch("tasa alcohol conductor novel mg/l", allowed_domains: ["dgt.es", "boe.es"])
  -> DGT.es confirma: 0,15 mg/l

VEREDICTO: RECHAZADA — pregunta dice 0,25 pero todas las fuentes dicen 0,15
```

**REVISION MANUAL - Fuentes en conflicto entre si**:
```
PREGUNTA: sobre un caso limite de la normativa

Temario dice: regla X
Todotest dice: regla Y
Claude: no esta seguro, se inclina por X

Web search DGT.es + BOE.es:
  -> sin resultado claro

VEREDICTO: FLAG PARA REVISION MANUAL
  Mostrar tabla con lo que dice cada fuente
  El humano decide si aprobar, rechazar o corregir
```

**REVISION MANUAL - Sin cobertura directa en temario ni todotest**:
```
PREGUNTA: "Escenario especifico sobre semaforo rojo y flecha verde con vehiculo detras"

Temario: SIN MATCH (principio general de rojo=parar, pero no cubre este caso especifico)
Todotest: SIN MATCH (preguntas de flechas verdes pero ninguna con vehiculo detras bloqueado)
Claude: cree que la respuesta es X

Web search OBLIGATORIO (temario + todotest = SIN MATCH):
  WebSearch("semaforo rojo flecha verde vehiculo detras DGT",
    allowed_domains: ["dgt.es", "todotest.com", "autoescuela.net", "practicatest.com"])
  -> Web revela que la respuesta depende de configuracion de carriles no especificada

VEREDICTO: FLAG PARA REVISION MANUAL
  Razon: Ninguna fuente primaria cubre el escenario exacto.
  La web revela que la respuesta es condicional (depende de contexto no especificado).
  Mostrar tabla con evidencia de cada fuente.
```

**REVISION MANUAL - Respuesta depende de contexto no especificado en enunciado**:
```
PREGUNTA: escenario donde la respuesta cambia segun un detalle no mencionado
  (ej: numero de carriles, tipo de via, tipo de vehiculo, condicion meteorologica)

CUALQUIER fuente revela que:
  -> La respuesta correcta DEPENDE de un factor que el enunciado no especifica
  -> Con el factor A, la respuesta seria X; con el factor B, la respuesta seria Y

VEREDICTO: FLAG PARA REVISION MANUAL
  Razon: Pregunta ambigua — la respuesta depende de [factor no especificado].
  Sugerencia: Anadir contexto al enunciado o reescribir con escenario mas concreto.
```

---

## Web search: cuando y como

**OBLIGATORIO** (se lanza SIEMPRE) en estos casos:
1. Temario = SIN MATCH **y** todotest = SIN MATCH (solo queda Claude como fuente — insuficiente)
2. Las 3 fuentes principales no coinciden entre si (conflicto)
3. La respuesta correcta depende de un dato numerico que no aparece en la tabla de referencia rapida

**NO necesario** cuando:
- Temario tiene match DIRECTO y todotest tiene match DIRECTO y ambos coinciden
- Temario tiene match DIRECTO y Claude coincide (todotest puede ser SIN MATCH)

**Dominios permitidos**: `dgt.es`, `boe.es`, `todotest.com`, `autoescuela.net`, `practicatest.com`
- Se ejecuta en el hilo principal (no en subagentes) para que el usuario vea las busquedas
- Si web search confirma la respuesta -> PASS (documentar la fuente web en el informe)
- Si web search revela que la respuesta depende de contexto no especificado -> FLAG REVISION MANUAL
- Si web search contradice la respuesta -> REJECT o AUTO-CORREGIR si hay consenso
- Si web search no aclara -> FLAG para revision manual

---

## Datos de referencia rapida

Ver `datos-referencia.md` para la tabla completa de valores numericos de referencia.
