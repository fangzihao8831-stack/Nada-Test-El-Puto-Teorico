import { BarChart3, Trophy, FileText } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ThemeAccordion } from "@/components/dashboard/ThemeAccordion";
import { PageHeader } from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";

export default async function ProgresoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch stats
  const { count: totalTests } = await supabase
    .from("tests_realizados")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", user!.id);

  const { data: allScores } = await supabase
    .from("tests_realizados")
    .select("puntuacion, total_preguntas")
    .eq("usuario_id", user!.id);

  const avgScore =
    allScores && allScores.length > 0
      ? Math.round(
          allScores.reduce(
            (sum, t) => sum + (t.puntuacion / t.total_preguntas) * 100,
            0
          ) / allScores.length
        )
      : 0;

  const bestTest =
    allScores && allScores.length > 0
      ? allScores.reduce(
          (best, t) => {
            const pct = (t.puntuacion / t.total_preguntas) * 100;
            return pct > best.pct
              ? { pct, score: t.puntuacion, total: t.total_preguntas }
              : best;
          },
          { pct: 0, score: 0, total: 0 }
        )
      : null;

  // Fetch temas with subtemas
  const { data: temas } = await supabase
    .from("temas")
    .select("id, nombre, orden, subtemas(id, nombre)")
    .order("orden");

  // Fetch all user answers with tema info for per-tema progress
  const { data: userTests } = await supabase
    .from("tests_realizados")
    .select("id")
    .eq("usuario_id", user!.id);

  const testIds = (userTests ?? []).map((t) => t.id);

  type AnswerRow = {
    es_correcta: boolean;
    preguntas: { subtema_id: string; subtemas: { tema_id: string } } | null;
  };

  let answers: AnswerRow[] = [];
  if (testIds.length > 0) {
    const { data } = await supabase
      .from("respuestas_test")
      .select("es_correcta, preguntas(subtema_id, subtemas(tema_id))")
      .in("test_realizado_id", testIds);
    answers = (data as unknown as AnswerRow[]) ?? [];
  }

  // Calculate per-tema progress
  const temaStats = new Map<string, { total: number; correct: number }>();
  for (const answer of answers) {
    const temaId = answer.preguntas?.subtemas?.tema_id;
    if (!temaId) continue;
    const stats = temaStats.get(temaId) ?? { total: 0, correct: 0 };
    stats.total++;
    if (answer.es_correcta) stats.correct++;
    temaStats.set(temaId, stats);
  }

  const temaItems = (temas ?? []).map((tema) => {
    const stats = temaStats.get(tema.id);
    const progress = stats && stats.total > 0
      ? Math.round((stats.correct / stats.total) * 100)
      : 0;
    return {
      id: tema.id,
      nombre: tema.nombre,
      progress,
      subtemas: (tema.subtemas as { id: string; nombre: string }[]) ?? [],
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi progreso"
        description="Resumen de tu rendimiento y avance por temas."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatsCard
          title="Tests totales"
          value={totalTests ?? 0}
          icon={FileText}
          description="desde el inicio"
        />
        <StatsCard
          title="Nota media"
          value={`${avgScore}%`}
          icon={BarChart3}
        />
        <StatsCard
          title="Mejor nota"
          value={bestTest ? `${Math.round(bestTest.pct)}%` : "—"}
          icon={Trophy}
          description={
            bestTest ? `${bestTest.score}/${bestTest.total} correctas` : undefined
          }
        />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Progreso por temas
        </h2>
        <ThemeAccordion temas={temaItems} />
      </div>
    </div>
  );
}
