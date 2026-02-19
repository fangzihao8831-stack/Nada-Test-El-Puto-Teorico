import Link from "next/link";
import {
  FileText,
  BarChart3,
  Flame,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentTestsList } from "@/components/dashboard/RecentTestsList";
import { PageHeader } from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";
import { TEST_CONFIG } from "@/lib/constants";
import type { RecentTest } from "@/types/test";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch recent tests
  const { data: rawTests } = await supabase
    .from("tests_realizados")
    .select("id, puntuacion, total_preguntas, created_at")
    .eq("usuario_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const recentTests: RecentTest[] = (rawTests ?? []).map((t, i) => ({
    id: t.id,
    name: `Test #${(rawTests?.length ?? 0) - i}`,
    date: formatDate(t.created_at),
    score: t.puntuacion,
    total: t.total_preguntas,
    passed: t.puntuacion >= TEST_CONFIG.passingScore,
  }));

  // Fetch stats
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

  // Fetch profile for streak
  const { data: profile } = await supabase
    .from("profiles")
    .select("racha_dias")
    .eq("id", user!.id)
    .single();

  // Fetch failed questions count
  const { count: failedCount } = await supabase
    .from("preguntas_falladas")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", user!.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bienvenido a Nadatest"
        description="Tu progreso de hoy y resumen de actividad reciente."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard
          title="Tests realizados"
          value={totalTests ?? 0}
          icon={FileText}
        />
        <StatsCard
          title="Nota media"
          value={`${avgScore}%`}
          icon={BarChart3}
        />
        <StatsCard
          title="Racha actual"
          value={`${profile?.racha_dias ?? 0} días`}
          icon={Flame}
        />
        <StatsCard
          title="Preguntas falladas"
          value={failedCount ?? 0}
          icon={AlertCircle}
        />
      </div>

      <Card className="border-0 bg-gradient-to-r from-primary to-blue-600 text-white shadow-md">
        <CardContent className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Listo para practicar?
            </h2>
            <p className="text-sm text-blue-100">
              Realiza un test de 30 preguntas como el examen oficial.
            </p>
          </div>
          <Button variant="secondary" className="bg-white text-primary hover:bg-blue-50" asChild>
            <Link href="/test">
              Comenzar test
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Tests recientes
        </h2>
        <RecentTestsList tests={recentTests} />
      </div>
    </div>
  );
}
