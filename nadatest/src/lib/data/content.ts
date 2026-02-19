import { createClient } from "@/lib/supabase/server";
import type { Tema, Subtema, Material } from "@/types/database";

export async function getTemasWithSubtemas(): Promise<
  (Tema & { subtemas: Subtema[] })[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("temas")
    .select("*, subtemas(*)")
    .order("orden", { ascending: true });

  if (error || !data) return [];

  return data.map((tema) => ({
    ...tema,
    subtemas: (tema.subtemas ?? []).sort(
      (a: Subtema, b: Subtema) => a.orden - b.orden
    ),
  }));
}

export async function getMateriales(): Promise<
  (Material & { temaNombre: string })[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("materiales")
    .select("*, subtemas!inner(temas!inner(nombre))")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((m: any) => ({
    id: m.id,
    subtema_id: m.subtema_id,
    tipo: m.tipo,
    titulo: m.titulo,
    url: m.url,
    created_at: m.created_at,
    temaNombre: m.subtemas.temas.nombre,
  }));
}
