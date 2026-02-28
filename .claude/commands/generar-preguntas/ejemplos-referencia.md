# Ejemplos de Referencia (DGT Real)

Estos ejemplos provienen de exámenes DGT reales. Usarlos como referencia de TONO, ESTRUCTURA DE ENUNCIADO y CALIDAD DE DISTRACTORES. Imitar este estilo, no inventar otro.

---

## Ejemplos completos (nuestro formato JSON)

Estos 2 ejemplos muestran el formato de salida completo con todos los campos.

### Ejemplo 1: DIRECTA nivel 2

```json
{
  "id": "pregunta_XXXX",
  "subtema_id": "subtema_21",
  "tipo_pregunta": "directa",
  "enunciado": "¿Está permitido adelantar por la derecha si existe espacio suficiente?",
  "opciones": [
    "Sí, en vías urbanas, con dos o más carriles delimitados por marcas viales.",
    "No, en ningún caso.",
    "Únicamente a los tranvías."
  ],
  "correcta": 0,
  "explicacion": "En vías urbanas con dos o más carriles por sentido delimitados por marcas viales, está permitido adelantar por la derecha. Esta es una excepción importante a la norma general de adelantar por la izquierda.\n\n- **Opciones incorrectas**: \"En ningún caso\" es un absoluto que ignora esta excepción urbana. \"Únicamente a los tranvías\" mezcla una regla real (se puede adelantar tranvías por la derecha cuando circulan por el centro) con una restricción que no aplica aquí.\n- **Conexión**: La norma general de adelantamiento exige hacerlo por la izquierda, pero las vías urbanas con carriles delimitados son la excepción principal.",
  "pista": "Piensa en calles anchas de ciudad con carriles pintados.",
  "codigo_senal": null,
  "dificultad": {
    "d_reglas": 1, "d_excepcion": 2, "d_densidad": 0,
    "d_implicito": 0, "d_distractores": 1, "d_contraintuitivo": 1,
    "total": 5, "nivel": 2
  }
}
```

### Ejemplo 2: SITUACIONAL nivel 2

```json
{
  "id": "pregunta_XXXX",
  "subtema_id": "subtema_14",
  "tipo_pregunta": "situacional",
  "enunciado": "En una zona de obras un operario le indica que tiene que detener su vehículo, ¿está obligado a obedecerle?",
  "opciones": [
    "No, sólo los agentes de circulación están autorizados a regular la circulación.",
    "No, el personal de obras en la vía sólo puede advertir la necesidad de extremar la atención.",
    "Sí, en ausencia de agentes de circulación, el personal de obras en la vía está autorizado a regular la circulación."
  ],
  "correcta": 2,
  "explicacion": "El personal de obras en la vía está autorizado a regular la circulación cuando no hay agentes presentes.\n\n- **Opciones incorrectas**: La opción que limita esta facultad solo a agentes ignora que existen otros colectivos autorizados (patrullas escolares, personal de obras). La opción que reduce su función a \"advertir\" subestima sus atribuciones legales.\n- **Error común**: Muchos alumnos creen que solo la policía puede ordenar detenerse.\n- **Conexión**: La jerarquía de señalización establece que las órdenes de agentes y personal autorizado prevalecen sobre señales fijas.",
  "pista": "No solo los agentes pueden regular el tráfico.",
  "codigo_senal": null,
  "dificultad": {
    "d_reglas": 1, "d_excepcion": 1, "d_densidad": 0,
    "d_implicito": 0, "d_distractores": 2, "d_contraintuitivo": 1,
    "total": 5, "nivel": 2
  }
}
```

---

## Preguntas reales por tipo (referencia de estilo)

Formato: correcta entre paréntesis (0=primera, 1=segunda, 2=tercera).

### SITUACIONAL

**Lluvia intensa + antiniebla** (correcta: 0)
- Circulando con lluvia muy intensa, ¿es correcto encender la luz antiniebla trasera?
  1. Sí, es obligatorio para señalizar su posición a los conductores que le siguen.
  2. No, la luz antiniebla trasera se utiliza sólo con niebla densa.
  3. Sí, pero sólo en autopistas y autovías.

**Estrechamiento sin señales** (correcta: 2)
- En un estrechamiento sin señales de prioridad se encuentran un turismo que arrastra un remolque y un autobús, sin que se puedan cruzar, ¿cuál tiene preferencia de paso?
  1. El turismo con remolque, por su mayor longitud.
  2. Cualquiera, porque no hay señal que establezca prioridad.
  3. El autobús, por su mayor anchura.

### DIRECTA

**Niebla densa, luces** (correcta: 0)
- Con niebla densa, ¿qué luces antiniebla está obligado a utilizar un turismo?
  1. La luz antiniebla trasera solamente.
  2. La luz antiniebla trasera y la delantera si la tiene instalada.
  3. La luz antiniebla delantera y la luz de largo alcance.

**Plazas turismo** (correcta: 0)
- En un turismo para 5 plazas, incluido el conductor, ¿está permitido que viajen 6 personas?
  1. No, porque no se puede sobrepasar el número de plazas autorizadas.
  2. Sí, cuando no se supera la M.M.A del vehículo.
  3. Sí, cuando el vehículo circula en vías urbanas.

### COMPLETAR

**Frenado** (correcta: 1)
- La distancia necesaria para frenar con seguridad depende...
  1. del buen estado del pedal del embrague.
  2. del buen estado de los neumáticos.
  3. del buen estado del freno de mano.

**Inmovilización autovía** (correcta: 1)
- Si por accidente u otra emergencia un vehículo tiene que ser inmovilizado en una autovía o autopista...
  1. sus ocupantes pueden transitar por la calzada, tomando las debidas precauciones.
  2. ninguno de los ocupantes del vehículo puede transitar por la calzada.
  3. los ocupantes del vehículo pueden transitar por la calzada, excepto los menores de edad.

### DATO

**Velocidad novel** (correcta: 0)
- Hace 6 meses que tiene el permiso de conducción. ¿A qué velocidad máxima puede conducir por una autovía?
  1. A 120 km/h.
  2. A 80 km/h y a 100 km/h para adelantar.
  3. A 80 km/h.

**ITV turismo antiguo** (correcta: 2)
- Su turismo tiene 12 años. ¿Con qué frecuencia debe pasar la ITV?
  1. Cada 2 años.
  2. Cada año y medio.
  3. Cada año.
