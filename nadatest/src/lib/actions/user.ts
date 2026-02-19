"use server";

import { createClient } from "@/lib/supabase/server";
import type { ApiResponse } from "@/types/api";

export async function updateProfile(data: {
  nombre?: string;
  permiso_objetivo?: string;
}): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "No autenticado" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Error al actualizar el perfil" };
  }

  return { success: true };
}

export async function updateLastAccess(): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("profiles")
    .update({ ultimo_acceso: new Date().toISOString() })
    .eq("id", user.id);
}
