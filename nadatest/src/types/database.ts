// Database types matching the Supabase SQL schema exactly

export interface Profile {
  id: string; // UUID
  email: string;
  nombre: string | null;
  avatar_url: string | null;
  permiso_objetivo: string;
  racha_dias: number;
  ultimo_acceso: string | null; // timestamp
  created_at: string; // timestamp
  updated_at: string; // timestamp
}

export interface Tema {
  id: string; // tema_01, tema_02...
  nombre: string;
  descripcion: string | null;
  orden: number;
  peso_examen: number;
  created_at: string; // timestamp
}

export interface Subtema {
  id: string; // subtema_01, subtema_02...
  tema_id: string;
  nombre: string;
  descripcion: string | null;
  orden: number;
  created_at: string; // timestamp
}

export interface Pregunta {
  id: string; // pregunta_001, pregunta_002...
  subtema_id: string;
  tipo_pregunta: string;
  enunciado: string;
  opciones: string[]; // JSONB ["opcion A", "opcion B", "opcion C"]
  correcta: number; // 0, 1, or 2
  explicacion: string;
  pista: string | null;
  requiere_imagen: boolean;
  tipo_imagen: string;
  imagen_url: string | null;
  origen: string;
  validada: boolean;
  created_at: string; // timestamp
  updated_at: string; // timestamp
}

export interface Test {
  id: string; // test_001, test_002...
  nombre: string;
  preguntas: string[]; // JSONB array of pregunta_ids
  activo: boolean;
  created_at: string; // timestamp
}

export interface TestRealizado {
  id: string; // UUID
  usuario_id: string; // UUID
  test_id: string | null;
  tipo: string; // test, tema, fallos
  modo: string; // examen, estudio
  puntuacion: number;
  total_preguntas: number;
  tiempo_usado: number | null; // seconds
  created_at: string; // timestamp
}

export interface RespuestaTest {
  id: string; // UUID
  test_realizado_id: string; // UUID
  pregunta_id: string;
  respuesta_usuario: number;
  es_correcta: boolean;
  tiempo_respuesta: number | null; // seconds
  created_at: string; // timestamp
}

export interface PreguntaFallada {
  id: string; // UUID
  usuario_id: string; // UUID
  pregunta_id: string;
  veces_fallada: number;
  ultima_vez: string; // timestamp
}

export interface Material {
  id: string;
  subtema_id: string;
  tipo: string; // ppt, video
  titulo: string;
  url: string;
  created_at: string; // timestamp
}
