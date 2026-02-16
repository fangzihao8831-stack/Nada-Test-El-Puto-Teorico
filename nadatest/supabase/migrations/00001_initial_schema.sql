-- Nadatest Initial Schema
-- Run this in the Supabase SQL editor to set up all tables

-- Profiles (extended user data, linked to Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  avatar_url TEXT,
  permiso_objetivo TEXT DEFAULT 'B',
  racha_dias INTEGER DEFAULT 0,
  ultimo_acceso TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Temas (12 main topics)
CREATE TABLE temas (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  orden INTEGER NOT NULL,
  peso_examen INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subtemas (58 subtopics)
CREATE TABLE subtemas (
  id TEXT PRIMARY KEY,
  tema_id TEXT REFERENCES temas(id) NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  orden INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preguntas (question bank)
CREATE TABLE preguntas (
  id TEXT PRIMARY KEY,
  subtema_id TEXT REFERENCES subtemas(id) NOT NULL,
  tipo_pregunta TEXT DEFAULT 'directa',
  enunciado TEXT NOT NULL,
  opciones JSONB NOT NULL,
  correcta INTEGER NOT NULL,
  explicacion TEXT NOT NULL,
  pista TEXT,
  requiere_imagen BOOLEAN DEFAULT FALSE,
  tipo_imagen TEXT DEFAULT 'ninguna',
  imagen_url TEXT,
  origen TEXT DEFAULT 'generada',
  validada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests (pre-built 30-question tests)
CREATE TABLE tests (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  preguntas JSONB NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests realizados (completed tests by users)
CREATE TABLE tests_realizados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  test_id TEXT REFERENCES tests(id),
  tipo TEXT DEFAULT 'test',
  modo TEXT NOT NULL,
  puntuacion INTEGER NOT NULL,
  total_preguntas INTEGER NOT NULL,
  tiempo_usado INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Respuestas (individual answers per test)
CREATE TABLE respuestas_test (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_realizado_id UUID REFERENCES tests_realizados(id) ON DELETE CASCADE,
  pregunta_id TEXT REFERENCES preguntas(id) NOT NULL,
  respuesta_usuario INTEGER NOT NULL,
  es_correcta BOOLEAN NOT NULL,
  tiempo_respuesta INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preguntas falladas (failed questions for quick review)
CREATE TABLE preguntas_falladas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  pregunta_id TEXT REFERENCES preguntas(id) NOT NULL,
  veces_fallada INTEGER DEFAULT 1,
  ultima_vez TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(usuario_id, pregunta_id)
);

-- Materiales de estudio (study materials)
CREATE TABLE materiales (
  id TEXT PRIMARY KEY,
  subtema_id TEXT REFERENCES subtemas(id) NOT NULL,
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_preguntas_subtema ON preguntas(subtema_id);
CREATE INDEX idx_tests_realizados_usuario ON tests_realizados(usuario_id);
CREATE INDEX idx_preguntas_falladas_usuario ON preguntas_falladas(usuario_id);
CREATE INDEX idx_respuestas_test ON respuestas_test(test_realizado_id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', NEW.raw_user_meta_data->>'full_name')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE temas ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtemas ENABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests_realizados ENABLE ROW LEVEL SECURITY;
ALTER TABLE respuestas_test ENABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas_falladas ENABLE ROW LEVEL SECURITY;
ALTER TABLE materiales ENABLE ROW LEVEL SECURITY;

-- Content tables: public read access
CREATE POLICY "Public read access" ON temas FOR SELECT USING (true);
CREATE POLICY "Public read access" ON subtemas FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tests FOR SELECT USING (true);
CREATE POLICY "Public read access" ON materiales FOR SELECT USING (true);

-- Preguntas: authenticated users only
CREATE POLICY "Authenticated read access" ON preguntas
  FOR SELECT TO authenticated USING (true);

-- Profiles: users can read and update their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tests realizados: users can manage their own test history
CREATE POLICY "Users can read own tests" ON tests_realizados
  FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Users can insert own tests" ON tests_realizados
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- Respuestas: users can manage answers for their own tests
CREATE POLICY "Users can read own answers" ON respuestas_test
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tests_realizados
      WHERE tests_realizados.id = respuestas_test.test_realizado_id
        AND tests_realizados.usuario_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert own answers" ON respuestas_test
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM tests_realizados
      WHERE tests_realizados.id = respuestas_test.test_realizado_id
        AND tests_realizados.usuario_id = auth.uid()
    )
  );

-- Preguntas falladas: users can manage their own failed questions
CREATE POLICY "Users can read own failed questions" ON preguntas_falladas
  FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Users can insert own failed questions" ON preguntas_falladas
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "Users can update own failed questions" ON preguntas_falladas
  FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "Users can delete own failed questions" ON preguntas_falladas
  FOR DELETE USING (auth.uid() = usuario_id);
