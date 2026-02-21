# Nadatest - Especificación Técnica

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 16+ con App Router y Turbopack
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes**: shadcn/ui

### Backend
- **Server Actions**: Next.js Server Actions (`lib/actions/`, `lib/auth/`)
- **Consultas de datos**: Funciones servidor (`lib/data/`)
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth (`@supabase/ssr`)

### Almacenamiento
- **Imágenes**: Cloudinary
- **Videos**: YouTube (embebidos)

### Hosting
- **Aplicación**: Vercel

---

## Estructura de Carpetas

```
/nadatest
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── page.tsx              # Home (dashboard)
│   │   ├── objetivo/
│   │   │   └── page.tsx
│   │   ├── progreso/
│   │   │   └── page.tsx
│   │   ├── fallos/
│   │   │   └── page.tsx
│   │   ├── materiales/
│   │   │   └── page.tsx
│   │   ├── notas-dgt/
│   │   │   └── page.tsx
│   │   └── test/
│   │       ├── page.tsx          # Selección de test
│   │       └── resultado/
│   │           └── page.tsx
│   ├── (exam)/
│   │   ├── demo/
│   │   │   └── page.tsx
│   │   └── test/
│   │       └── [id]/
│   │           └── page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── preguntas/
│   │   ├── tests/
│   │   ├── materiales/
│   │   └── usuarios/
│   ├── api/
│   │   └── dgt/
│   │       └── consulta-nota/
│   │           └── route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn/ui (19 componentes)
│   ├── test/
│   │   ├── TestSession.tsx
│   │   ├── TestActiveClient.tsx
│   │   ├── QuestionGrid.tsx
│   │   └── ResultsView.tsx
│   ├── navigation/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileMenu.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ThemeAccordion.tsx
│   │   ├── RecentTestsList.tsx
│   │   ├── FailedQuestionCard.tsx
│   │   └── MaterialItem.tsx
│   ├── dgt/
│   │   ├── consulta-nota-form.tsx
│   │   ├── resultado-nota.tsx
│   │   └── historial-notas.tsx
│   ├── objetivo/
│   │   ├── ExamDateCard.tsx
│   │   └── DailyGoalCard.tsx
│   └── shared/
│       ├── PageHeader.tsx
│       └── EmptyState.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── auth/
│   │   ├── actions.ts
│   │   ├── schemas.ts
│   │   └── test-actions.ts
│   ├── actions/
│   │   ├── admin.ts
│   │   ├── test.ts
│   │   └── user.ts
│   ├── data/
│   │   ├── content.ts
│   │   ├── admin.ts
│   │   ├── user.ts
│   │   └── tests.ts
│   ├── dgt/
│   │   ├── validate-nif.ts
│   │   └── consulta-nota.ts
│   ├── utils.ts
│   ├── constants.ts
│   ├── nav-items.ts
│   ├── question-bank.ts
│   ├── build-test.ts
│   └── mock-test-data.ts
├── types/
│   ├── database.ts
│   ├── test.ts
│   ├── user.ts
│   ├── api.ts
│   └── dgt.ts
├── hooks/
│   └── useTimer.ts
├── public/
│   ├── images/
│   │   └── señales/              # SVGs de señales
│   └── fonts/
├── .env.local
├── .env.example
├── package.json
└── next.config.ts
```

---

## Componentes Principales

### Test
| Componente | Descripción |
|------------|-------------|
| `TestSession` | Contenedor principal del test con lógica de estado |
| `TestActiveClient` | Cliente activo del test con interacción en tiempo real |
| `QuestionGrid` | Grid 1-30 para navegar entre preguntas |
| `ResultsView` | Pantalla de resultados con estadísticas |

### Dashboard
| Componente | Descripción |
|------------|-------------|
| `StatsCard` | Tarjeta con estadísticas (tests, media, etc.) |
| `ProgressBar` | Barra de progreso por tema |
| `ThemeAccordion` | Acordeón para materiales de estudio |
| `RecentTestsList` | Historial de tests realizados |
| `FailedQuestionCard` | Tarjeta de pregunta fallada |
| `MaterialItem` | Elemento de material de estudio |

### DGT
| Componente | Descripción |
|------------|-------------|
| `consulta-nota-form` | Formulario de consulta de nota DGT |
| `resultado-nota` | Visualización del resultado de nota |
| `historial-notas` | Historial de consultas de notas |

### Objetivo
| Componente | Descripción |
|------------|-------------|
| `ExamDateCard` | Tarjeta con fecha de examen y cuenta atrás |
| `DailyGoalCard` | Tarjeta de objetivo diario de tests |

### Shared
| Componente | Descripción |
|------------|-------------|
| `PageHeader` | Cabecera reutilizable de página |
| `EmptyState` | Estado vacío con icono y mensaje |

### Navigation
| Componente | Descripción |
|------------|-------------|
| `Navbar` | Barra de navegación superior |
| `Sidebar` | Menú lateral (desktop) |
| `MobileMenu` | Menú hamburguesa (móvil) |

---

## API y Server Actions

La aplicacion usa **Server Actions** para todas las operaciones internas. Solo existe una API Route para integracion externa.

### API Route (única)
```
GET/POST /api/dgt/consulta-nota  - Consulta de notas en el portal DGT
```

### Server Actions (`lib/actions/`)
| Archivo | Funciones |
|---------|-----------|
| `admin.ts` | Gestión de preguntas, tests, materiales, usuarios |
| `test.ts` | Iniciar test, guardar respuestas, finalizar test |
| `user.ts` | Actualizar perfil, objetivo, preferencias |

### Auth Actions (`lib/auth/`)
| Archivo | Funciones |
|---------|-----------|
| `actions.ts` | Login, registro, logout, sesion |
| `test-actions.ts` | Verificacion de auth para tests |
| `schemas.ts` | Validacion con Zod (login, registro) |

### Data Queries (`lib/data/`)
| Archivo | Funciones |
|---------|-----------|
| `content.ts` | Temas, subtemas, materiales |
| `admin.ts` | Consultas administrativas |
| `user.ts` | Stats, progreso, fallos del usuario |
| `tests.ts` | Tests disponibles, siguiente test pendiente |

---

## Schema SQL (Supabase)

```sql
-- Usuarios (manejado por Supabase Auth, tabla extendida)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  avatar_url TEXT,
  permiso_objetivo TEXT DEFAULT 'B',
  racha_dias INTEGER DEFAULT 0,
  ultimo_acceso TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Temas (12 temas principales)
CREATE TABLE temas (
  id TEXT PRIMARY KEY,           -- tema_01, tema_02...
  nombre TEXT NOT NULL,
  descripcion TEXT,
  orden INTEGER NOT NULL,
  peso_examen INTEGER DEFAULT 5, -- porcentaje aproximado en examen
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subtemas (58 subtemas)
CREATE TABLE subtemas (
  id TEXT PRIMARY KEY,           -- subtema_01, subtema_02...
  tema_id TEXT REFERENCES temas(id) NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  orden INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preguntas
CREATE TABLE preguntas (
  id TEXT PRIMARY KEY,           -- pregunta_001, pregunta_002...
  subtema_id TEXT REFERENCES subtemas(id) NOT NULL,
  tipo_pregunta TEXT DEFAULT 'directa', -- directa, situacional, completar, dato
  enunciado TEXT NOT NULL,
  opciones JSONB NOT NULL,       -- ["opcion A", "opcion B", "opcion C"]
  correcta INTEGER NOT NULL,     -- indice de la correcta (0, 1, 2)
  explicacion TEXT NOT NULL,
  pista TEXT,
  requiere_imagen BOOLEAN DEFAULT FALSE,
  tipo_imagen TEXT DEFAULT 'ninguna', -- señal, situación, ninguna
  imagen_url TEXT,
  origen TEXT DEFAULT 'generada', -- generada, extraida_dgt, extraida_todotest
  validada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests pre-creados
CREATE TABLE tests (
  id TEXT PRIMARY KEY,           -- test_001, test_002...
  nombre TEXT NOT NULL,          -- Test 1, Test 2...
  preguntas JSONB NOT NULL,      -- array de pregunta_ids
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests realizados por usuarios
CREATE TABLE tests_realizados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES profiles(id) NOT NULL,
  test_id TEXT REFERENCES tests(id),
  tipo TEXT DEFAULT 'test',      -- test, tema, fallos
  modo TEXT NOT NULL,            -- examen, estudio
  puntuacion INTEGER NOT NULL,
  total_preguntas INTEGER NOT NULL,
  tiempo_usado INTEGER,          -- segundos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Respuestas de cada test
CREATE TABLE respuestas_test (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_realizado_id UUID REFERENCES tests_realizados(id) ON DELETE CASCADE,
  pregunta_id TEXT REFERENCES preguntas(id) NOT NULL,
  respuesta_usuario INTEGER NOT NULL,
  es_correcta BOOLEAN NOT NULL,
  tiempo_respuesta INTEGER,      -- segundos en responder
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preguntas falladas (para rápido acceso)
CREATE TABLE preguntas_falladas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES profiles(id) NOT NULL,
  pregunta_id TEXT REFERENCES preguntas(id) NOT NULL,
  veces_fallada INTEGER DEFAULT 1,
  ultima_vez TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(usuario_id, pregunta_id)
);

-- Materiales de estudio
CREATE TABLE materiales (
  id TEXT PRIMARY KEY,
  subtema_id TEXT REFERENCES subtemas(id) NOT NULL,
  tipo TEXT NOT NULL,            -- ppt, video
  titulo TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX idx_preguntas_subtema ON preguntas(subtema_id);
CREATE INDEX idx_tests_realizados_usuario ON tests_realizados(usuario_id);
CREATE INDEX idx_preguntas_falladas_usuario ON preguntas_falladas(usuario_id);
CREATE INDEX idx_respuestas_test ON respuestas_test(test_realizado_id);
```

---

## Variables de Entorno

```env
# .env.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx

# Cloudinary (imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxx
```

---

*Última actualización: Febrero 2026*
