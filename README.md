# Nadatest - El Puto Teórico

Plataforma web para preparar el examen teórico del permiso B de conducir (DGT, España).

## Stack

- **Frontend**: Next.js 14+ / TypeScript / Tailwind / shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel
- **Imágenes**: Cloudinary + Wikimedia SVGs

## Pipeline de Contenido

```
┌─────────────────────────────────────────────────────────────────┐
│                        FUENTES                                  │
│                                                                 │
│   📄 temario_permiso_b_v3.md          🌐 Todotest / DGT        │
│   (temario oficial completo)          (preguntas reales)        │
└──────────────┬────────────────────────────────┬─────────────────┘
               │                                │
               ▼                                ▼
┌──────────────────────────┐  ┌──────────────────────────────────┐
│  /generar-preguntas      │  │  /extraer-preguntas              │
│                          │  │                                  │
│  • Lee temario           │  │  • Navega webs con Playwright    │
│  • Genera preguntas IA   │  │  • Extrae preguntas reales       │
│  • 6 tipos de pregunta   │  │  • Crea explicaciones PROPIAS    │
│  • Explicaciones + pistas│  │  • Formatea al JSON estándar     │
│  • Subagentes en paralelo│  │                                  │
└──────────────┬───────────┘  └───────────────┬──────────────────┘
               │                              │
               ▼                              ▼
         ┌─────────────────────────────────────────┐
         │           preguntas_raw.json             │
         │                                         │
         │  { id, subtema_id, tipo_pregunta,       │
         │    enunciado, opciones, correcta,        │
         │    explicacion, pista, dificultad }      │
         └────────────────┬────────────────────────┘
                          │
                          ▼
         ┌─────────────────────────────────────────┐
         │         /validar-preguntas               │
         │                                         │
         │  • Verifica datos contra temario         │
         │  • Detecta duplicados                    │
         │  • Revisa trampas estilo DGT             │
         │  • Ajusta dificultad (1-5)               │
         │  • Valida acentos y formato              │
         └──────────┬──────────────┬───────────────┘
                    │              │
              ✅ Aprobadas    ❌ Rechazadas
                    │              │
                    │              └──→ Revisión manual
                    ▼
         ┌─────────────────────────────────────────┐
         │         /generar-imagenes                │
         │                                         │
         │  Señales ──→ Wikimedia SVG (batch)       │
         │  Situaciones ──→ DALL-E 3 + validación   │
         │  Subida ──→ Cloudinary                   │
         └────────────────┬────────────────────────┘
                          │
                          ▼
         ┌─────────────────────────────────────────┐
         │       preguntas_finales.json             │
         │                                         │
         │            ──→ SUPABASE                  │
         └─────────────────────────────────────────┘
```

## Tipos de Preguntas (basado en 300+ preguntas reales DGT)

| Tipo | Frecuencia | Ejemplo |
|------|------------|---------|
| Directa corta | ~25% | "¿Es obligatorio llevar chaleco reflectante?" |
| Situacional | ~25% | "Circulando con lluvia intensa, ¿enciende la antiniebla?" |
| Completar frase | ~15% | "El efecto submarino está relacionado con..." |
| Con imagen | ~20% | "¿Qué indica esta señal?" |
| Dato concreto | ~5% | "¿A qué distancia de una intersección no se puede estacionar?" |
| Trampa absolutos | ~10% | Opciones con "exclusivamente", "en ningún caso" |

## Estructura del Proyecto

```
├── .claude/commands/        # Skills de Claude Code
│   └── generar-preguntas.md # Generador de preguntas DGT
├── content/
│   ├── content-structure.json  # 12 temas, 50 subtemas
│   └── preguntas/              # Preguntas generadas (JSON)
├── requirements.md          # Requisitos del producto
├── technical.md             # Especificación técnica
├── content-pipeline.md      # Pipeline de contenido
├── tasks.md                 # Checklist por fases
├── future-features.md       # Funcionalidades futuras
└── temario_permiso_b_v3.md  # Temario completo permiso B
```

## Documentación

| Archivo | Contenido |
|---------|-----------|
| [requirements.md](requirements.md) | MVP, UX, navegación, sistema de tests, diseño |
| [technical.md](technical.md) | Stack, carpetas, componentes, API, SQL schema |
| [content-pipeline.md](content-pipeline.md) | Pipeline de skills, imágenes, formato JSON |
| [tasks.md](tasks.md) | Tareas por fase (checklist) |
| [future-features.md](future-features.md) | DGT integración, monetización, app móvil |
