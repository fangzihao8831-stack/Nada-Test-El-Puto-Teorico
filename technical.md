# Nadatest - Especificacion Tecnica

## Stack Tecnologico

### Frontend
- **Framework**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: shadcn/ui

### Backend
- **API**: Next.js API Routes / Server Actions
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticacion**: NextAuth.js / Supabase Auth

### Almacenamiento
- **Imagenes**: Cloudinary
- **Videos**: YouTube (embebidos)

### Hosting
- **Aplicacion**: Vercel

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
│   │   ├── page.tsx              # Home
│   │   ├── objetivo/
│   │   │   └── page.tsx
│   │   ├── progreso/
│   │   │   └── page.tsx
│   │   ├── fallos/
│   │   │   └── page.tsx
│   │   ├── materiales/
│   │   │   └── page.tsx
│   │   └── test/
│   │       ├── page.tsx          # Test en progreso
│   │       └── resultado/
│   │           └── page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── preguntas/
│   │   ├── tests/
│   │   ├── materiales/
│   │   └── usuarios/
│   ├── api/
│   │   ├── auth/
│   │   ├── tests/
│   │   ├── preguntas/
│   │   ├── user/
│   │   └── admin/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── test/
│   │   ├── TestPanel.tsx
│   │   ├── TestNavigation.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerOptions.tsx
│   │   ├── FeedbackPanel.tsx
│   │   ├── Timer.tsx
│   │   └── TestModal.tsx
│   ├── navigation/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileMenu.tsx
│   └── dashboard/
│       ├── StatsCard.tsx
│       ├── ProgressBar.tsx
│       └── ThemeAccordion.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── auth.ts
│   ├── utils.ts
│   └── constants.ts
├── types/
│   ├── database.ts
│   ├── test.ts
│   └── user.ts
├── hooks/
│   ├── useTest.ts
│   ├── useTimer.ts
│   └── useProgress.ts
├── content/
│   └── content-structure.json
├── public/
│   ├── images/
│   │   └── senales/              # SVGs de senales
│   └── fonts/
├── .env.local
├── .env.example
├── package.json
├── tailwind.config.ts
└── next.config.js
```

---

## Componentes Principales

### Test
| Componente | Descripcion |
|------------|-------------|
| `TestPanel` | Panel principal del test con pregunta, imagen, opciones |
| `TestNavigation` | Grid 1-30 para saltar entre preguntas |
| `QuestionCard` | Tarjeta con enunciado e imagen de la pregunta |
| `AnswerOptions` | Opciones A/B/C con radio buttons |
| `FeedbackPanel` | Panel de feedback (correcto/incorrecto + explicacion) |
| `Timer` | Temporizador de 30 minutos (modo examen) |
| `TestModal` | Modal para seleccionar test y modo |
| `ResultsPanel` | Pantalla de resultados con estadisticas |

### Dashboard
| Componente | Descripcion |
|------------|-------------|
| `StatsCard` | Tarjeta con estadisticas (tests, media, etc.) |
| `ProgressBar` | Barra de progreso por tema |
| `ThemeAccordion` | Acordeon para materiales de estudio |
| `FailedQuestionsList` | Lista de preguntas falladas |
| `TestHistory` | Historial de tests realizados |

### Navigation
| Componente | Descripcion |
|------------|-------------|
| `Navbar` | Barra de navegacion superior |
| `Sidebar` | Menu lateral (desktop) |
| `MobileMenu` | Menu hamburguesa (movil) |

---

## API Endpoints

### Autenticacion
```
POST /api/auth/register     - Registro con email
POST /api/auth/login        - Login con email
POST /api/auth/google       - Login con Google
POST /api/auth/logout       - Cerrar sesion
GET  /api/auth/session      - Obtener sesion actual
```

### Tests
```
GET  /api/tests                 - Lista de todos los tests
GET  /api/tests/[id]            - Obtener test por ID
GET  /api/tests/[id]/preguntas  - Preguntas de un test
POST /api/tests/[id]/submit     - Enviar respuestas del test
GET  /api/tests/next            - Siguiente test pendiente del usuario
```

### Usuario
```
GET  /api/user/profile      - Perfil del usuario
PUT  /api/user/profile      - Actualizar perfil
GET  /api/user/progress     - Progreso por temas
GET  /api/user/fallos       - Preguntas falladas
GET  /api/user/historial    - Historial de tests
GET  /api/user/stats        - Estadisticas generales
```

### Contenido
```
GET  /api/temas             - Lista de temas
GET  /api/temas/[id]        - Tema con subtemas
GET  /api/materiales        - Materiales de estudio
GET  /api/materiales/[id]   - Material especifico
```

### Admin
```
GET    /api/admin/preguntas         - Listar preguntas
POST   /api/admin/preguntas         - Crear pregunta
PUT    /api/admin/preguntas/[id]    - Actualizar pregunta
DELETE /api/admin/preguntas/[id]    - Eliminar pregunta
POST   /api/admin/preguntas/import  - Importar JSON masivo
GET    /api/admin/usuarios          - Listar usuarios
GET    /api/admin/stats             - Estadisticas admin
```

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
  tipo_pregunta TEXT DEFAULT 'directa', -- directa, situacional, completar, imagen, dato, trampa
  enunciado TEXT NOT NULL,
  opciones JSONB NOT NULL,       -- ["opcion A", "opcion B", "opcion C"]
  correcta INTEGER NOT NULL,     -- indice de la correcta (0, 1, 2)
  explicacion TEXT NOT NULL,
  pista TEXT,
  dificultad INTEGER DEFAULT 3 CHECK (dificultad >= 1 AND dificultad <= 5),
  requiere_imagen BOOLEAN DEFAULT FALSE,
  tipo_imagen TEXT DEFAULT 'ninguna', -- senal, situacion, ninguna
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

-- Preguntas falladas (para rapido acceso)
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
  dificultad INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indices para rendimiento
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

# Auth
NEXTAUTH_SECRET=tu-secreto-aqui
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx

# Cloudinary (imagenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

# OpenAI (para skill de imagenes)
OPENAI_API_KEY=sk-xxxxx
```

---

*Ultima actualizacion: Febrero 2026*
