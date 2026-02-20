# Nadatest - El Puto Teorico

Plataforma web para preparar el examen teorico del permiso B de conducir (DGT, Espana).

## Stack

- **Frontend**: Next.js 16 / TypeScript / Tailwind CSS v4 / shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Row Level Security)
- **Hosting**: Vercel
- **Imagenes**: Cloudinary + Wikimedia SVGs

## Estado actual

| Area | Estado |
|------|--------|
| Landing page | Completa |
| Registro / Login | Email + Google OAuth |
| Demo (sin cuenta) | 30 preguntas, modo estudio |
| Dashboard | Stats, tests recientes, racha |
| Progreso por tema | Conectado a Supabase |
| Fallos | Revision de preguntas falladas |
| Admin panel | Preguntas, tests, materiales, usuarios |
| Consulta nota DGT | Integrado con API DGT |
| Content pipeline | Skills en fase de refinamiento |

## Rutas

| Ruta | Auth | Descripcion |
|------|------|-------------|
| `/` | No | Landing con CTAs |
| `/login` | No | Login (email + Google) |
| `/register` | No | Registro |
| `/demo` | No | Test de prueba (30 preguntas) |
| `/dashboard` | Si | Home autenticado con stats |
| `/progreso` | Si | Progreso por tema |
| `/fallos` | Si | Preguntas falladas |
| `/test` | Si | Seleccionar test |
| `/test/[id]` | Si | Test activo |
| `/test/resultado` | Si | Resultados del test |
| `/notas-dgt` | Si | Consulta de notas DGT |
| `/admin/*` | Admin | Panel de administracion |

## Pipeline de contenido

```
FUENTES
  temario_permiso_b_v3.md          Todotest / DGT
  (temario oficial completo)       (preguntas reales)
         |                               |
         v                               v
  /generar-preguntas              /extraer-preguntas
  - Lee temario por tema          - Navega webs con Playwright
  - Genera preguntas con IA       - Extrae preguntas reales
  - 6 tipos de pregunta           - Crea explicaciones propias
  - Explicaciones + pistas        - Formatea al JSON estandar
  - Subagentes en paralelo
         |                               |
         v                               v
              preguntas_raw.json
              { id, subtema_id, tipo_pregunta,
                enunciado, opciones, correcta,
                explicacion, pista }
                        |
                        v
              /validar-preguntas
              - Schema + formato
              - Duplicados
              - Datos contra temario
              - Revision pedagogica
              - Acentos y ortografia
                    |           |
              Aprobadas    Rechazadas -> Revision manual
                    |
                    v
              /generar-imagenes
              Senales -> Wikimedia SVG
              Situaciones -> DALL-E 3
              Subida -> Cloudinary
                    |
                    v
              question-bank.ts -> Supabase
```

## Tipos de preguntas (basado en 300+ preguntas reales DGT)

| Tipo | Frecuencia | Ejemplo |
|------|------------|---------|
| Directa corta | ~25% | "Es obligatorio llevar chaleco reflectante?" |
| Situacional | ~25% | "Circulando con lluvia intensa, enciende la antiniebla?" |
| Completar frase | ~15% | "El efecto submarino esta relacionado con..." |
| Con imagen | ~20% | "Que indica esta senal?" |
| Dato concreto | ~5% | "A que distancia de una interseccion no se puede estacionar?" |
| Trampa absolutos | ~10% | Opciones con "exclusivamente", "en ningun caso" |

## Content pipeline

El pipeline de generacion y validacion de preguntas esta en fase de refinamiento. Los batches actuales (`batch_01`-`batch_03`, ~150 preguntas) son output de prueba generado durante el desarrollo de los skills, no contenido de produccion.

Los skills de Claude Code (`/generar-preguntas`, `/validar-preguntas`) se estan iterando para mejorar:
- Calidad de las explicaciones
- Ortografia espanola (acentos, signos de interrogacion)
- Variedad de tipos de pregunta
- Precision de datos contra el temario oficial

## Indice de temas (12 temas, 58 subtemas)

<details><summary><strong>1. El Conductor y el Permiso</strong> (3 subtemas)</summary>

- El permiso de conducir
- Documentacion
- Permiso por puntos
</details>

<details><summary><strong>2. El Vehiculo</strong> (4 subtemas)</summary>

- El vehiculo
- ITV
- El seguro
- Vehiculos electricos e hibridos
</details>

<details><summary><strong>3. Carga, Pasajeros y Remolques</strong> (3 subtemas)</summary>

- La carga
- Transporte de personas y animales
- Remolques
</details>

<details><summary><strong>4. La Via y sus Usuarios</strong> (4 subtemas)</summary>

- La via publica
- Usuarios vulnerables
- Nuevas senales y tipologias de via
- Angulos muertos y visibilidad
</details>

<details><summary><strong>5. Circulacion y Velocidad</strong> (4 subtemas)</summary>

- Normas generales de circulacion
- Velocidad
- Distancia de seguridad
- Marcha atras
</details>

<details><summary><strong>6. Prioridad y Maniobras</strong> (5 subtemas)</summary>

- Prioridad de paso
- Incorporacion a la circulacion
- Adelantamientos
- Intersecciones
- Parada y estacionamiento
</details>

<details><summary><strong>7. Senalizacion</strong> (8 subtemas)</summary>

- Alumbrado
- Senales acusticas
- Jerarquia de senales
- Senales de los agentes
- Semaforos
- Senales verticales
- Marcas viales
- Senalizacion circunstancial
</details>

<details><summary><strong>8. Situaciones Especiales</strong> (6 subtemas)</summary>

- Autopistas y autovias
- Tuneles
- Pasos a nivel
- Condiciones adversas
- Preparacion y desarrollo del viaje
- Conduccion en grupo y situaciones especiales
</details>

<details><summary><strong>9. Seguridad y Tecnologia</strong> (5 subtemas)</summary>

- Seguridad activa
- Seguridad pasiva
- Sistemas ADAS
- Comprobaciones y mantenimiento
- Conduccion autonoma y automatizada
</details>

<details><summary><strong>10. Factores de Riesgo</strong> (7 subtemas)</summary>

- Alcohol
- Drogas
- Medicamentos
- Fatiga y sueno
- Distracciones
- Velocidad como factor de riesgo
- Estados emocionales
</details>

<details><summary><strong>11. Accidentes, Emergencias y Medio Ambiente</strong> (5 subtemas)</summary>

- Conducta PAS
- Primeros auxilios
- Equipamiento de emergencia
- Conduccion eficiente
- Medio ambiente
</details>

<details><summary><strong>12. Infracciones y Sanciones</strong> (4 subtemas)</summary>

- Infracciones y sanciones
- Responsabilidad del conductor
- Inmovilizacion y retirada de vehiculos
- Procedimiento sancionador
</details>

## Estructura del proyecto

```
Nadatest/
  CLAUDE.md                         # Instrucciones para Claude Code
  README.md                         # Este archivo
  requirements.md                   # Requisitos del producto
  technical.md                      # Especificacion tecnica
  content-pipeline.md               # Pipeline de contenido
  future-features.md                # Funcionalidades futuras
  temario_permiso_b_v3.md           # Temario completo permiso B

  content/
    temario/                        # Temario dividido por tema
    preguntas/                      # Preguntas generadas (JSON)
      batch_01/                     # 30 preguntas validadas
      batch_02/                     # 30 preguntas validadas
      batch_03/                     # 90 preguntas validadas (3 iter)

  nadatest/                         # Aplicacion Next.js
    src/
      app/                          # App Router (pages, layouts)
        (auth)/                     # Login, register
        (dashboard)/                # Dashboard, progreso, fallos, etc.
        (exam)/                     # Test activo
        admin/                      # Panel de administracion
        api/                        # API routes
      components/                   # Componentes UI
        ui/                         # shadcn/ui base
        test/                       # TestSession, QuestionGrid, ResultsView
        navigation/                 # Navbar
        dashboard/                  # StatsCard, RecentTestsList
        shared/                     # PageHeader, EmptyState
      hooks/                        # useTimer, etc.
      lib/                          # Supabase clients, utils, question-bank
        supabase/                   # Server + client Supabase
        auth/                       # Auth actions + schemas
        actions/                    # Server actions (admin, test, user)
        data/                       # Data queries (content, tests, user)
        dgt/                        # Consulta nota DGT
      types/                        # TypeScript types
    scripts/                        # Build + content scripts
      generate-question-bank.mjs    # Genera question-bank.ts desde JSON
      validate-questions.mjs        # Validacion de preguntas
      audit-accents.mjs             # Auditoria de acentos
      fix-accents-all.mjs           # Correccion automatica de acentos
      extract-temario-sections.mjs  # Extrae secciones del temario
      prep-validation-context.mjs   # Prepara contexto de validacion

  supabase/                         # Migraciones SQL
```

## Scripts

```bash
npm run dev        # Servidor de desarrollo (Turbopack)
npm run build      # Build de produccion
npm run start      # Servidor de produccion
npm run lint       # ESLint
```

## Variables de entorno

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# OpenAI (generacion de imagenes)
OPENAI_API_KEY=
```

La aplicacion funciona sin Supabase configurado (landing, demo, login/register se renderizan; rutas protegidas redirigen a /login).

## Documentacion

| Archivo | Contenido |
|---------|-----------|
| [requirements.md](requirements.md) | MVP, UX, navegacion, sistema de tests, diseno |
| [technical.md](technical.md) | Stack, carpetas, componentes, API, SQL schema |
| [content-pipeline.md](content-pipeline.md) | Pipeline de skills, imagenes, formato JSON |
| [future-features.md](future-features.md) | DGT integracion, monetizacion, app movil |
