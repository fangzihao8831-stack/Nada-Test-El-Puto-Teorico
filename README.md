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

## Índice de Temas (12 temas, 58 subtemas)

<details><summary><strong>1. El Conductor y el Permiso</strong> (3 subtemas)</summary>

- El permiso de conducir
- Documentación
- Permiso por puntos
</details>

<details><summary><strong>2. El Vehículo</strong> (4 subtemas)</summary>

- El vehículo
- ITV
- El seguro
- Vehículos eléctricos e híbridos
</details>

<details><summary><strong>3. Carga, Pasajeros y Remolques</strong> (3 subtemas)</summary>

- La carga
- Transporte de personas y animales
- Remolques
</details>

<details><summary><strong>4. La Vía y sus Usuarios</strong> (4 subtemas)</summary>

- La vía pública
- Usuarios vulnerables
- Nuevas señales y tipologías de vía
- Ángulos muertos y visibilidad
</details>

<details><summary><strong>5. Circulación y Velocidad</strong> (4 subtemas)</summary>

- Normas generales de circulación
- Velocidad
- Distancia de seguridad
- Marcha atrás
</details>

<details><summary><strong>6. Prioridad y Maniobras</strong> (5 subtemas)</summary>

- Prioridad de paso
- Incorporación a la circulación
- Adelantamientos
- Intersecciones
- Parada y estacionamiento
</details>

<details><summary><strong>7. Señalización</strong> (8 subtemas)</summary>

- Alumbrado
- Señales acústicas
- Jerarquía de señales
- Señales de los agentes
- Semáforos
- Señales verticales
- Marcas viales
- Señalización circunstancial
</details>

<details><summary><strong>8. Situaciones Especiales</strong> (6 subtemas)</summary>

- Autopistas y autovías
- Túneles
- Pasos a nivel
- Condiciones adversas
- Preparación y desarrollo del viaje
- Conducción en grupo y situaciones especiales
</details>

<details><summary><strong>9. Seguridad y Tecnología</strong> (5 subtemas)</summary>

- Seguridad activa
- Seguridad pasiva
- Sistemas ADAS
- Comprobaciones y mantenimiento
- Conducción autónoma y automatizada
</details>

<details><summary><strong>10. Factores de Riesgo</strong> (7 subtemas)</summary>

- Alcohol
- Drogas
- Medicamentos
- Fatiga y sueño
- Distracciones
- Velocidad como factor de riesgo
- Estados emocionales
</details>

<details><summary><strong>11. Accidentes, Emergencias y Medio Ambiente</strong> (5 subtemas)</summary>

- Conducta PAS
- Primeros auxilios
- Equipamiento de emergencia
- Conducción eficiente
- Medio ambiente
</details>

<details><summary><strong>12. Infracciones y Sanciones</strong> (4 subtemas)</summary>

- Infracciones y sanciones
- Responsabilidad del conductor
- Inmovilización y retirada de vehículos
- Procedimiento sancionador
</details>

## Estructura del Proyecto

```
├── .claude/commands/        # Skills de Claude Code
│   └── generar-preguntas.md # Generador de preguntas DGT
├── content/
│   ├── content-structure.json  # 12 temas, 58 subtemas
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
