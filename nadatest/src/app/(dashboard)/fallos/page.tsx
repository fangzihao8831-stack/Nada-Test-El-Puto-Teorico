import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FailedQuestionCard } from "@/components/dashboard/FailedQuestionCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { createClient } from "@/lib/supabase/server";
import type { FailedQuestionItem } from "@/types/user";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function FallosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rawFailed } = await supabase
    .from("preguntas_falladas")
    .select("pregunta_id, veces_fallada, ultima_vez, preguntas(enunciado, subtemas(temas(nombre)))")
    .eq("usuario_id", user!.id)
    .order("veces_fallada", { ascending: false });

  const failedQuestions: FailedQuestionItem[] = (rawFailed ?? []).map((f) => {
    const pregunta = f.preguntas as unknown as { enunciado: string; subtemas: { temas: { nombre: string } } } | null;
    return {
      id: f.pregunta_id,
      enunciado: pregunta?.enunciado ?? "Pregunta no disponible",
      tema: pregunta?.subtemas?.temas?.nombre ?? "Sin tema",
      failCount: f.veces_fallada,
      lastFailed: formatDate(f.ultima_vez),
    };
  });

  const hasFailedQuestions = failedQuestions.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Preguntas falladas"
        description="Repasa las preguntas que mas te cuestan."
        action={
          hasFailedQuestions ? (
            <Button>
              <RotateCcw className="mr-2 size-4" />
              Practicar fallos
            </Button>
          ) : undefined
        }
      />

      {hasFailedQuestions && (
        <div className="max-w-xs">
          <StatsCard
            title="Total de fallos"
            value={failedQuestions.length}
            icon={AlertCircle}
            description="preguntas pendientes de repasar"
          />
        </div>
      )}

      {hasFailedQuestions ? (
        <div className="space-y-2">
          {failedQuestions.map((question) => (
            <FailedQuestionCard key={question.id} question={question} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={AlertCircle}
          title="Perfecto!"
          description="No tienes preguntas falladas. Sigue asi."
        />
      )}
    </div>
  );
}
