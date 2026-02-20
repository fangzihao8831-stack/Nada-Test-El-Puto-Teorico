import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/login");
  }
  return supabase;
}

export interface AdminStats {
  totalPreguntas: number;
  totalTests: number;
  totalUsuarios: number;
  preguntasValidadas: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await requireAdmin();

  const [preguntas, tests, usuarios, validadas] = await Promise.all([
    supabase.from("preguntas").select("id", { count: "exact", head: true }),
    supabase.from("tests").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("preguntas")
      .select("id", { count: "exact", head: true })
      .eq("validada", true),
  ]);

  return {
    totalPreguntas: preguntas.count ?? 0,
    totalTests: tests.count ?? 0,
    totalUsuarios: usuarios.count ?? 0,
    preguntasValidadas: validadas.count ?? 0,
  };
}

export async function getAdminPreguntas(
  page = 1,
  search?: string,
  pageSize = 20
): Promise<{
  preguntas: {
    id: string;
    enunciado: string;
    tipo_pregunta: string;
    validada: boolean;
    temaNombre: string;
  }[];
  total: number;
}> {
  const supabase = await requireAdmin();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("preguntas")
    .select(
      "id, enunciado, tipo_pregunta, validada, subtemas!inner(temas!inner(nombre))",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    const escaped = search.replace(/%/g, "\\%").replace(/_/g, "\\_");
    query = query.ilike("enunciado", `%${escaped}%`);
  }

  const { data, count, error } = await query;
  if (error || !data) return { preguntas: [], total: 0 };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const preguntas = data.map((p: any) => ({
    id: p.id,
    enunciado: p.enunciado,
    tipo_pregunta: p.tipo_pregunta,
    validada: p.validada,
    temaNombre: p.subtemas.temas.nombre,
  }));

  return { preguntas, total: count ?? 0 };
}

export async function getAdminTests(): Promise<
  {
    id: string;
    nombre: string;
    activo: boolean;
    numPreguntas: number;
    created_at: string;
  }[]
> {
  const supabase = await requireAdmin();

  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((t) => ({
    id: t.id,
    nombre: t.nombre,
    activo: t.activo,
    numPreguntas: (t.preguntas as string[]).length,
    created_at: t.created_at,
  }));
}

export async function getAdminUsuarios(): Promise<
  {
    id: string;
    email: string;
    nombre: string | null;
    created_at: string;
    ultimo_acceso: string | null;
    totalTests: number;
  }[]
> {
  const supabase = await requireAdmin();

  const [profilesResult, testsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, email, nombre, created_at, ultimo_acceso")
      .order("created_at", { ascending: false }),
    supabase
      .from("tests_realizados")
      .select("usuario_id"),
  ]);

  if (profilesResult.error || !profilesResult.data) return [];

  // Count tests per user in TypeScript
  const testCounts = new Map<string, number>();
  for (const t of testsResult.data ?? []) {
    testCounts.set(t.usuario_id, (testCounts.get(t.usuario_id) ?? 0) + 1);
  }

  return profilesResult.data.map((p) => ({
    id: p.id,
    email: p.email,
    nombre: p.nombre,
    created_at: p.created_at,
    ultimo_acceso: p.ultimo_acceso,
    totalTests: testCounts.get(p.id) ?? 0,
  }));
}
