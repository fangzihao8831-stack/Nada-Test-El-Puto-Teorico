"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ApiResponse } from "@/types/api";

async function requireAdmin(): Promise<{ userId: string } | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };
  if (user.app_metadata?.role !== "admin") return { error: "No autorizado" };

  return { userId: user.id };
}

export async function createPregunta(data: {
  id: string;
  subtema_id: string;
  tipo_pregunta: string;
  enunciado: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
  pista?: string;
  requiere_imagen?: boolean;
  tipo_imagen?: string;
  imagen_url?: string;
  origen?: string;
}): Promise<ApiResponse<{ id: string }>> {
  const auth = await requireAdmin();
  if ("error" in auth) return { success: false, error: auth.error };

  const supabase = createAdminClient();
  const { error } = await supabase.from("preguntas").insert(data);

  if (error) {
    console.error("Failed to create pregunta:", error);
    return { success: false, error: "Error al crear la pregunta" };
  }

  return { success: true, data: { id: data.id } };
}

export async function updatePregunta(
  id: string,
  data: Partial<{
    subtema_id: string;
    tipo_pregunta: string;
    enunciado: string;
    opciones: string[];
    correcta: number;
    explicacion: string;
    pista: string | null;
    requiere_imagen: boolean;
    tipo_imagen: string;
    imagen_url: string | null;
    origen: string;
    validada: boolean;
  }>
): Promise<ApiResponse<null>> {
  const auth = await requireAdmin();
  if ("error" in auth) return { success: false, error: auth.error };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("preguntas")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Failed to update pregunta:", error);
    return { success: false, error: "Error al actualizar la pregunta" };
  }

  return { success: true };
}

export async function deletePregunta(
  id: string
): Promise<ApiResponse<null>> {
  const auth = await requireAdmin();
  if ("error" in auth) return { success: false, error: auth.error };

  const supabase = createAdminClient();
  const { error } = await supabase.from("preguntas").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete pregunta:", error);
    return { success: false, error: "Error al eliminar la pregunta" };
  }

  return { success: true };
}

export async function importPreguntas(
  preguntas: {
    id: string;
    subtema_id: string;
    tipo_pregunta: string;
    enunciado: string;
    opciones: string[];
    correcta: number;
    explicacion: string;
    pista?: string;
    requiere_imagen?: boolean;
    tipo_imagen?: string;
    imagen_url?: string;
    origen?: string;
  }[]
): Promise<ApiResponse<{ imported: number; errors: string[] }>> {
  const auth = await requireAdmin();
  if ("error" in auth) return { success: false, error: auth.error };

  const supabase = createAdminClient();
  const errors: string[] = [];
  let imported = 0;

  // Insert in batches of 50 to avoid payload limits
  const batchSize = 50;
  for (let i = 0; i < preguntas.length; i += batchSize) {
    const batch = preguntas.slice(i, i + batchSize);
    const { error } = await supabase.from("preguntas").insert(batch);

    if (error) {
      errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
    } else {
      imported += batch.length;
    }
  }

  return { success: true, data: { imported, errors } };
}

export async function toggleTestActive(
  id: string
): Promise<ApiResponse<{ activo: boolean }>> {
  const auth = await requireAdmin();
  if ("error" in auth) return { success: false, error: auth.error };

  const supabase = createAdminClient();

  // Read current state
  const { data: test, error: readError } = await supabase
    .from("tests")
    .select("activo")
    .eq("id", id)
    .single();

  if (readError || !test) {
    return { success: false, error: "Test no encontrado" };
  }

  const newActivo = !test.activo;
  const { error } = await supabase
    .from("tests")
    .update({ activo: newActivo })
    .eq("id", id);

  if (error) {
    console.error("Failed to toggle test:", error);
    return { success: false, error: "Error al actualizar el test" };
  }

  return { success: true, data: { activo: newActivo } };
}
