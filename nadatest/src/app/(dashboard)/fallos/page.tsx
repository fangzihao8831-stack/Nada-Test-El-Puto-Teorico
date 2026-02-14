"use client";

import { AlertCircle, RotateCcw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";

const mockFailedQuestions = [
  {
    id: "1",
    enunciado:
      "Cual es la tasa maxima de alcohol en sangre permitida para conductores noveles?",
    tema: "Factores de Riesgo",
    failCount: 4,
    lastFailed: "12/02/2026",
  },
  {
    id: "2",
    enunciado:
      "En una interseccion sin senalizar, quien tiene prioridad?",
    tema: "Prioridad y Maniobras",
    failCount: 3,
    lastFailed: "11/02/2026",
  },
  {
    id: "3",
    enunciado:
      "Cual es la distancia minima de seguridad en autopista con condiciones normales?",
    tema: "Circulacion y Velocidad",
    failCount: 2,
    lastFailed: "10/02/2026",
  },
  {
    id: "4",
    enunciado:
      "Cuando se puede circular por el arcen de una autopista?",
    tema: "La Via y sus Usuarios",
    failCount: 2,
    lastFailed: "09/02/2026",
  },
];

export default function FallosPage() {
  const hasFailedQuestions = mockFailedQuestions.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Preguntas falladas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Repasa las preguntas que mas te cuestan.
          </p>
        </div>
        {hasFailedQuestions && (
          <Button>
            <RotateCcw className="mr-2 size-4" />
            Practicar fallos
          </Button>
        )}
      </div>

      {hasFailedQuestions && (
        <div className="max-w-xs">
          <StatsCard
            title="Total de fallos"
            value={mockFailedQuestions.length}
            icon={AlertCircle}
            description="preguntas pendientes de repasar"
          />
        </div>
      )}

      {hasFailedQuestions ? (
        <div className="space-y-2">
          {mockFailedQuestions.map((question) => (
            <Card key={question.id}>
              <CardContent className="py-4">
                <div className="space-y-2">
                  <p className="text-sm text-foreground">
                    {question.enunciado}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{question.tema}</Badge>
                    <span className="text-xs text-destructive">
                      {question.failCount} veces fallada
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {question.lastFailed}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <AlertCircle className="size-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Perfecto!
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No tienes preguntas falladas. Sigue asi.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
