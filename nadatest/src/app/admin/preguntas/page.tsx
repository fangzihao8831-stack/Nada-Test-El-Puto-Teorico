import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { createClient } from "@/lib/supabase/server";
import { FileText } from "lucide-react";

function getTipoBadgeVariant(tipo: string): "default" | "outline" {
  switch (tipo) {
    case "directa":
    case "dato":
      return "default";
    default:
      return "outline";
  }
}

export default async function AdminPreguntasPage() {
  const supabase = await createClient();

  const { data: preguntas } = await supabase
    .from("preguntas")
    .select("id, enunciado, tipo_pregunta, validada, subtemas(temas(nombre))")
    .order("created_at", { ascending: false })
    .limit(50);

  const questions = (preguntas ?? []).map((p) => {
    const subtema = p.subtemas as unknown as { temas: { nombre: string } } | null;
    return {
      id: p.id,
      enunciado: p.enunciado,
      tipo: p.tipo_pregunta,
      tema: subtema?.temas?.nombre ?? "Sin tema",
      validada: p.validada,
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion de preguntas"
        description="Administra el banco de preguntas de la plataforma."
        action={
          <Button>
            <Plus className="mr-2 size-4" />
            Agregar pregunta
          </Button>
        }
      />

      {questions.length > 0 ? (
        <div className="space-y-2">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardContent className="py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {question.id}
                      </span>
                      {question.validada ? (
                        <Badge className="bg-success text-success-foreground hover:bg-success/80">Validada</Badge>
                      ) : (
                        <Badge variant="outline">Pendiente</Badge>
                      )}
                    </div>
                    <p className="line-clamp-2 text-sm text-foreground">
                      {question.enunciado}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getTipoBadgeVariant(question.tipo)}>
                      {question.tipo}
                    </Badge>
                    <Badge variant="outline">{question.tema}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="Sin preguntas"
          description="No hay preguntas en el banco. Agrega la primera."
        />
      )}
    </div>
  );
}
