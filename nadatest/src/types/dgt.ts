// DGT exam results consultation types

export interface ConsultaNotaInput {
  nif: string;
  fechaExamen: string; // YYYY-MM-DD
  clasePermiso: string; // "B", "A1", etc.
  fechaNacimiento: string; // YYYY-MM-DD
}

export interface ConsultaNotaResult {
  success: boolean;
  resultado?: "APTO" | "NO APTO" | "NO PRESENTADO";
  tipoExamen?: "TEORICO" | "PRACTICO";
  errores?: number;
  nombre?: string;
  error?: string;
}

export interface ConsultaDGTRecord {
  id: string;
  user_id: string;
  nif_hash: string;
  fecha_examen: string;
  clase_permiso: string;
  resultado: string | null;
  tipo_examen: string | null;
  consulted_at: string;
}
