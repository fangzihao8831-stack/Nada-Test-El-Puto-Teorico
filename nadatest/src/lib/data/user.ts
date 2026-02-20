import { createClient } from "@/lib/supabase/server";
import type { UserStats, UserProgress, FailedQuestion } from "@/types/user";

export async function getUserStats(userId: string): Promise<UserStats> {
  const supabase = await createClient();

  const { data: tests } = await supabase
    .from("tests_realizados")
    .select("puntuacion, total_preguntas")
    .eq("usuario_id", userId);

  const { data: profile } = await supabase
    .from("profiles")
    .select("racha_dias")
    .eq("id", userId)
    .single();

  if (!tests || tests.length === 0) {
    return {
      totalTests: 0,
      averageScore: 0,
      bestScore: 0,
      currentStreak: profile?.racha_dias ?? 0,
      totalQuestions: 0,
      totalCorrect: 0,
    };
  }

  const totalTests = tests.length;
  const totalQuestions = tests.reduce((s, t) => s + t.total_preguntas, 0);
  const totalCorrect = tests.reduce((s, t) => s + t.puntuacion, 0);
  const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const bestScore = Math.max(...tests.map((t) => t.puntuacion));

  return {
    totalTests,
    averageScore,
    bestScore,
    currentStreak: profile?.racha_dias ?? 0,
    totalQuestions,
    totalCorrect,
  };
}

export async function getUserProgress(
  userId: string
): Promise<UserProgress[]> {
  const supabase = await createClient();

  // Fetch all user answers joined through to temas
  const { data: answers } = await supabase
    .from("respuestas_test")
    .select(
      "es_correcta, pregunta_id, preguntas!inner(subtemas!inner(tema_id, temas!inner(id, nombre)))"
    )
    .in(
      "test_realizado_id",
      // Subquery: get this user's test IDs
      (
        await supabase
          .from("tests_realizados")
          .select("id")
          .eq("usuario_id", userId)
      ).data?.map((t) => t.id) ?? []
    );

  if (!answers || answers.length === 0) return [];

  // Aggregate per tema
  const temaMap = new Map<
    string,
    { nombre: string; correct: number; total: number }
  >();

  for (const answer of answers) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tema = (answer as any).preguntas.subtemas.temas;
    const existing = temaMap.get(tema.id) ?? {
      nombre: tema.nombre,
      correct: 0,
      total: 0,
    };
    existing.total++;
    if (answer.es_correcta) existing.correct++;
    temaMap.set(tema.id, existing);
  }

  return Array.from(temaMap.entries()).map(([temaId, stats]) => ({
    temaId,
    temaNombre: stats.nombre,
    totalQuestions: stats.total,
    correctAnswers: stats.correct,
    incorrectAnswers: stats.total - stats.correct,
    percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
  }));
}

export async function getUserFailedQuestions(
  userId: string
): Promise<(FailedQuestion & { tema: string })[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("preguntas_falladas")
    .select(
      "veces_fallada, ultima_vez, preguntas!inner(id, enunciado, subtemas!inner(temas!inner(nombre)))"
    )
    .eq("usuario_id", userId)
    .order("veces_fallada", { ascending: false });

  if (error || !data) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((row: any) => ({
    preguntaId: row.preguntas.id,
    enunciado: row.preguntas.enunciado,
    failCount: row.veces_fallada,
    lastFailed: row.ultima_vez,
    tema: row.preguntas.subtemas.temas.nombre,
  }));
}

export async function getUserTestHistory(
  userId: string,
  limit = 5
): Promise<
  {
    id: string;
    testNombre: string | null;
    puntuacion: number;
    totalPreguntas: number;
    modo: string;
    createdAt: string;
  }[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tests_realizados")
    .select("id, puntuacion, total_preguntas, modo, created_at, tests(nombre)")
    .eq("usuario_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((row: any) => ({
    id: row.id,
    testNombre: row.tests?.nombre ?? null,
    puntuacion: row.puntuacion,
    totalPreguntas: row.total_preguntas,
    modo: row.modo,
    createdAt: row.created_at,
  }));
}

export async function getTodayTestCount(userId: string): Promise<number> {
  const supabase = await createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("tests_realizados")
    .select("id", { count: "exact", head: true })
    .eq("usuario_id", userId)
    .gte("created_at", today.toISOString());

  if (error) return 0;
  return count ?? 0;
}
