import { Target } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { PageHeader } from "@/components/shared/PageHeader";
import { ExamDateCard } from "@/components/objetivo/ExamDateCard";
import { DailyGoalCard } from "@/components/objetivo/DailyGoalCard";
import { createClient } from "@/lib/supabase/server";

export default async function ObjetivoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch stats for progress section
  const { count: totalTests } = await supabase
    .from("tests_realizados")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", user!.id);

  const { data: allScores } = await supabase
    .from("tests_realizados")
    .select("puntuacion, total_preguntas")
    .eq("usuario_id", user!.id);

  const avgScore = allScores && allScores.length > 0
    ? Math.round(
        allScores.reduce((sum, t) => sum + (t.puntuacion / t.total_preguntas) * 100, 0) /
          allScores.length
      )
    : 0;

  // Count today's tests
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: todayTests } = await supabase
    .from("tests_realizados")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", user!.id)
    .gte("created_at", today.toISOString());

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Mi objetivo"
        description="Define tu meta y controla tu avance hacia el examen."
      />

      <ExamDateCard />
      <DailyGoalCard todayCount={todayTests ?? 0} />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="size-5 text-primary" />
            <CardTitle className="text-base">Progreso hacia tu objetivo</CardTitle>
          </div>
        </CardHeader>
        <div className="px-6 pb-6 space-y-4">
          <ProgressBar label="Tests completados" value={totalTests ?? 0} max={60} />
          <ProgressBar label="Nota media" value={avgScore} max={100} />
        </div>
      </Card>
    </div>
  );
}
