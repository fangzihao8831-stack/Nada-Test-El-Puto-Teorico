import { NextResponse } from "next/server";
import { consultarNotaDGT } from "@/lib/dgt/consulta-nota";
import { validateNIF } from "@/lib/dgt/validate-nif";
import type { ConsultaNotaInput, ConsultaNotaResult } from "@/types/dgt";
import type { ApiResponse } from "@/types/api";

const MAX_CHECKS_PER_DAY = 5;

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function POST(request: Request) {
  try {
    // Parse and validate input first (no Supabase needed)
    const body = (await request.json()) as ConsultaNotaInput;
    const { nif, fechaExamen, clasePermiso, fechaNacimiento } = body;

    if (!nif || !fechaExamen || !clasePermiso || !fechaNacimiento) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    if (!validateNIF(nif)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "El NIF/NIE introducido no es valido" },
        { status: 400 }
      );
    }

    if (isNaN(Date.parse(fechaExamen)) || isNaN(Date.parse(fechaNacimiento))) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Formato de fecha no valido" },
        { status: 400 }
      );
    }

    // Auth + rate limit (only when Supabase is configured)
    let userId: string | null = null;

    if (isSupabaseConfigured()) {
      const { createServerClient } = await import("@/lib/supabase/server");
      const supabase = createServerClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: "Debes iniciar sesion para consultar notas" },
          { status: 401 }
        );
      }

      userId = user.id;

      // Rate limit
      const today = new Date().toISOString().split("T")[0];
      const { count } = await supabase
        .from("consultas_dgt")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("consulted_at", `${today}T00:00:00Z`);

      if (count !== null && count >= MAX_CHECKS_PER_DAY) {
        return NextResponse.json<ApiResponse<null>>(
          {
            success: false,
            error: `Has alcanzado el limite de ${MAX_CHECKS_PER_DAY} consultas diarias`,
          },
          { status: 429 }
        );
      }
    }

    // Consult DGT
    const result = await consultarNotaDGT({
      nif,
      fechaExamen,
      clasePermiso,
      fechaNacimiento,
    });

    // Store result in database (only when Supabase is configured + user is authenticated)
    if (isSupabaseConfigured() && userId) {
      try {
        const { createServerClient } = await import("@/lib/supabase/server");
        const supabase = createServerClient();
        const nifHash = await hashNIF(nif);

        await supabase.from("consultas_dgt").insert({
          user_id: userId,
          nif_hash: nifHash,
          fecha_examen: fechaExamen,
          clase_permiso: clasePermiso,
          resultado: result.resultado ?? null,
          tipo_examen: result.tipoExamen ?? null,
        });
      } catch {
        // DB storage failure should not block the result
      }
    }

    return NextResponse.json<ApiResponse<ConsultaNotaResult>>({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("DGT consulta-nota API error:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

async function hashNIF(nif: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(nif.toUpperCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
