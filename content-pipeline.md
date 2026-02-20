# Nadatest - Pipeline de Contenido

## Nomenclatura

| Nivel | Nombre | Cantidad | Visible a usuario | Ejemplo |
|-------|--------|----------|-------------------|---------|
| 1 | Temas | 12 | Sí (menú principal) | "Señalización" |
| 2 | Subtemas | 58 | Interno | "Señales de prohibición" |
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
   Aprobadas        Revisión
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
- **Estado**: Funcional, en refinamiento
- **Archivo**: `.claude/commands/generar-preguntas.md`
- **Input**: `temario_permiso_b_v3.md`, `content/content-structure.json`
- **Output**: JSON con preguntas, explicaciones, pistas
- Prompt actualizado con datos reales: distribución de tipos, palabras trampa con frecuencias, patrones de inicio, datos numéricos, distribución por temas
- Todas las preguntas requieren imagen, siempre 3 opciones
- Crea explicaciones pedagogicas propias

### Skill 2: Extractor de Webs (pausado)
- Los datos ya han sido extraidos manualmente:
  - `content/todotest_2700.json` — 2.700 preguntas de 90 tests Todotest
  - `content/dgt_oficial_exam.json` — 30 preguntas del examen oficial DGT
- Skill automatizado pendiente si se necesita en el futuro

### Skill 3: Validador (funcional)
- **Archivo**: `.claude/commands/validar-preguntas.md`
- Detecta duplicados por similitud semantica contra banco existente (Todotest + generadas)
- Verifica lógica de preguntas y datos numéricos contra temario
- Revisa que opciones usen palabras trampa correctamente

### Skill 4: Generador de Imágenes (pendiente)
- **Archivo**: `.claude/commands/generar-imagenes.md`
- Señales SVG: ya descargadas en `content/imagenes/señales/`
- Situaciones de tráfico: genera con DALL-E 3 vía OpenAI API
- Claude revisa que la imagen generada sea correcta antes de guardar

---

## Estrategia de Imágenes

### Señales de tráfico
- **Fuente**: https://commons.wikimedia.org/wiki/Road_signs_of_Spain
- **Formato**: SVG (vectorial)
- **Estrategia**: Batch inicial (~500 señales)
- **Validación**: Automática por código (R-301, P-1, etc.)

### Situaciones de tráfico
- **Fuente**: DALL-E 3 API (OpenAI)
- **Coste**: ~$0.04-0.08 por imagen
- **Validación**: IA filtra + revisión humana para dudosas
- **Reutilización**: Agrupar preguntas similares con misma imagen

---

## Formato JSON de Preguntas

```json
{
  "id": "pregunta_001",
  "subtema_id": "subtema_21",
  "tipo_pregunta": "imagen",
  "enunciado": "¿Qué indica esta señal de tráfico?",
  "opciones": [
    "Prohibido adelantar",
    "Fin de prohibición de adelantar",
    "Adelantamiento permitido solo por la izquierda"
  ],
  "correcta": 1,
  "explicacion": "Esta señal indica el fin de la prohibición...",
  "pista": "Fíjate en las líneas diagonales",
  "requiere_imagen": true,
  "tipo_imagen": "señal",
  "imagen_url": "cloudinary.com/nadatest/R-501.svg",
  "origen": "generada",
  "validada": true
}
```

### Campos
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `tipo_pregunta` | string | `directa`, `situacional`, `completar`, `dato` |
| `correcta` | int | Índice de la opción correcta (0, 1 o 2) |
| `requiere_imagen` | bool | Si la pregunta necesita imagen para funcionar |
| `tipo_imagen` | string | `señal`, `situación`, `vehículo`, `ninguna` |
| `origen` | string | `generada`, `extraida_dgt`, `extraida_todotest` |

---

## Archivos de Referencia

- `temario_permiso_b_v3.md` - Temario completo (fuente de verdad)
- `content/content-structure.json` - 12 temas, 58 subtemas
- `content/preguntas/` - Preguntas generadas (JSON)
- `content/todotest_2700.json` - 2.700 preguntas extraídas de Todotest
- `content/dgt_oficial_exam.json` - 30 preguntas del examen oficial DGT
- `.claude/commands/generar-preguntas.md` - Skill del generador

---

*Ultima actualizacion: Febrero 2026*
