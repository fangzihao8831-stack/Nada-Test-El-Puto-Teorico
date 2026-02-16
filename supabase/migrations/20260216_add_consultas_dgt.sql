CREATE TABLE consultas_dgt (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  nif_hash TEXT NOT NULL,
  fecha_examen DATE NOT NULL,
  clase_permiso TEXT NOT NULL,
  resultado TEXT,
  tipo_examen TEXT,
  consulted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE consultas_dgt ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own consultations"
  ON consultas_dgt FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own consultations"
  ON consultas_dgt FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_consultas_dgt_user_id ON consultas_dgt(user_id);
CREATE INDEX idx_consultas_dgt_consulted_at ON consultas_dgt(consulted_at);
