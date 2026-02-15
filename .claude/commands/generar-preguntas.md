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

### 5. Subagentes (si >5 preguntas)
Lanzar subagentes con Task tool para generar en paralelo. Cada subagente recibe las secciones relevantes del prompt.

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
