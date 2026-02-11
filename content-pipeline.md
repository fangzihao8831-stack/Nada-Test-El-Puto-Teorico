# Nadatest - Pipeline de Contenido

## Nomenclatura

| Nivel | Nombre | Cantidad | Visible a usuario | Ejemplo |
|-------|--------|----------|-------------------|---------|
| 1 | Temas | 12 | Si (menu principal) | "Senalizacion" |
| 2 | Subtemas | 50 | Interno | "Senales de prohibicion" |
| 3 | Apartados | Variable | Contenido detallado | "R-301, R-302..." |

Ver `content/content-structure.json` para la estructura completa.

---

## Diagrama del Pipeline

```
TEMARIO + WEBS
      |
      v
[SKILL 1: GENERADOR] + [SKILL 2: EXTRACTOR]
      |                        |
      v                        v
         preguntas_raw.json
               |
               v
      [SKILL 3: VALIDADOR]
               |
      +--------+--------+
      |                 |
   Aprobadas        Revision
      |
      v
[SKILL 4: IMAGENES]
      |
      v
preguntas_finales.json --> SUPABASE
```

---

## Skills de Claude Code

Cada skill es un archivo en `.claude/commands/` que el usuario invoca con `/nombre`.
Los skills pueden lanzar subagentes (Task tool) para trabajo en paralelo.

### Skill 1: Generador de Preguntas (`/generar-preguntas`)
- **Estado**: En progreso
- **Archivo**: `.claude/commands/generar-preguntas.md`
- **Input**: `temario_permiso_b_v3.md`, `content/content-structure.json`
- **Output**: JSON con preguntas, explicaciones, pistas
- Prompt actualizado con datos reales: distribucion de tipos, palabras trampa con frecuencias, patrones de inicio, datos numericos, distribucion por temas
- Todas las preguntas requieren imagen, siempre 3 opciones
- Crea explicaciones pedagogicas propias

### Skill 2: Extractor de Webs (pausado)
- Los datos ya han sido extraidos manualmente:
  - `content/todotest_3000.json` — 2.700 preguntas de 90 tests Todotest
  - `content/dgt_oficial_exam.json` — 30 preguntas del examen oficial DGT
- Skill automatizado pendiente si se necesita en el futuro

### Skill 3: Validador (pendiente)
- **Archivo**: `.claude/commands/validar-preguntas.md`
- Detecta duplicados por similitud semantica contra banco existente (Todotest + generadas)
- Verifica logica de preguntas y datos numericos contra temario
- Revisa que opciones usen palabras trampa correctamente

### Skill 4: Generador de Imagenes (pendiente)
- **Archivo**: `.claude/commands/generar-imagenes.md`
- Senales SVG: ya descargadas en `content/imagenes/senales/`
- Situaciones de trafico: genera con DALL-E 3 via OpenAI API
- Claude revisa que la imagen generada sea correcta antes de guardar

---

## Estrategia de Imagenes

### Senales de trafico
- **Fuente**: https://commons.wikimedia.org/wiki/Road_signs_of_Spain
- **Formato**: SVG (vectorial)
- **Estrategia**: Batch inicial (~500 senales)
- **Validacion**: Automatica por codigo (R-301, P-1, etc.)

### Situaciones de trafico
- **Fuente**: DALL-E 3 API (OpenAI)
- **Coste**: ~$0.04-0.08 por imagen
- **Validacion**: IA filtra + revision humana para dudosas
- **Reutilizacion**: Agrupar preguntas similares con misma imagen

---

## Formato JSON de Preguntas

```json
{
  "id": "pregunta_001",
  "subtema_id": "subtema_21",
  "tipo_pregunta": "imagen",
  "enunciado": "Que indica esta senal de trafico?",
  "opciones": [
    "Prohibido adelantar",
    "Fin de prohibicion de adelantar",
    "Adelantamiento permitido solo por la izquierda"
  ],
  "correcta": 1,
  "explicacion": "Esta senal indica el fin de la prohibicion...",
  "pista": "Fijate en las lineas diagonales",
  "requiere_imagen": true,
  "tipo_imagen": "senal",
  "imagen_url": "cloudinary.com/nadatest/R-501.svg",
  "origen": "generada",
  "validada": true
}
```

### Campos
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `tipo_pregunta` | string | `directa`, `situacional`, `completar`, `dato` |
| `correcta` | int | Indice de la opcion correcta (0, 1 o 2) |
| `requiere_imagen` | bool | Si la pregunta necesita imagen para funcionar |
| `tipo_imagen` | string | `senal`, `situacion`, `vehiculo`, `ninguna` |
| `origen` | string | `generada`, `extraida_dgt`, `extraida_todotest` |

---

## Archivos de Referencia

- `temario_permiso_b_v3.md` - Temario completo (fuente de verdad)
- `content/content-structure.json` - 12 temas, 58 subtemas
- `content/preguntas/` - Preguntas generadas (JSON)
- `content/todotest_3000.json` - 2.700 preguntas extraidas de Todotest
- `content/dgt_oficial_exam.json` - 30 preguntas del examen oficial DGT
- `.claude/commands/generar-preguntas.md` - Skill del generador

---

*Ultima actualizacion: Febrero 2026*
