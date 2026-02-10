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
- **Input**: `temario_permiso_b_v3.md`
- **Output**: JSON con preguntas, explicaciones, pistas
- Crea explicaciones pedagogicas propias

### Skill 2: Extractor de Webs (pendiente)
- **Archivo**: `.claude/commands/extraer-preguntas.md`
- **Input**: URLs DGT/Todotest via Playwright
- **Output**: JSON preguntas
- NO usa explicaciones de fuente, CREA propias

### Skill 3: Validador (pendiente)
- **Archivo**: `.claude/commands/validar-preguntas.md`
- Verifica logica de preguntas
- Detecta duplicados
- Revisa que sean "tramposas" (estilo DGT)
- Ajusta dificultad

### Skill 4: Generador de Imagenes (pendiente)
- **Archivo**: `.claude/commands/generar-imagenes.md`
- Senales: descarga de Wikimedia
- Situaciones: genera con DALL-E
- Sube a Cloudinary

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
  "dificultad": 2,
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
| `tipo_pregunta` | string | `directa`, `situacional`, `completar`, `imagen`, `dato`, `trampa` |
| `correcta` | int | Indice de la opcion correcta (0, 1 o 2) |
| `dificultad` | int | 1 (intuicion) a 5 (excepciones ocultas) |
| `requiere_imagen` | bool | Si la pregunta necesita imagen para funcionar |
| `tipo_imagen` | string | `senal`, `situacion`, `ninguna` |
| `origen` | string | `generada`, `extraida_dgt`, `extraida_todotest` |

---

## Archivos de Referencia

- `temario_permiso_b_v3.md` - Temario completo (fuente de verdad)
- `content/content-structure.json` - 12 temas, 50 subtemas
- `content/preguntas/` - Preguntas generadas (JSON)
- `.claude/commands/generar-preguntas.md` - Skill del generador

---

*Ultima actualizacion: Febrero 2026*
