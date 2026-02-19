"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatTime } from "@/lib/utils";
import { TEST_CONFIG } from "@/lib/constants";
import type { TestSessionResult } from "@/components/test/TestSession";

const STORAGE_KEY = "nadatest_last_result";

interface ResultsViewProps {
  nextTestHref: string;
  homeHref: string;
  fallosHref?: string;
}

export function ResultsView({
  nextTestHref,
  homeHref,
  fallosHref,
}: ResultsViewProps) {
  const [result, setResult] = useState<TestSessionResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setResult(JSON.parse(stored));
      }
    } catch {
      // sessionStorage might be unavailable
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!result) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No hay resultados disponibles.
        </p>
        <Button className="mt-4" asChild>
          <Link href={nextTestHref}>Realizar un test</Link>
        </Button>
      </div>
    );
  }

  const passed = result.score >= TEST_CONFIG.passingScore;
  const incorrect = result.total - result.score;

  return (
    <div className="space-y-6">
      {/* Score card */}
      <Card className="text-center">
        <CardContent className="py-8">
          <Badge
            variant={passed ? "default" : "destructive"}
            className={`mb-4 text-sm ${passed ? "bg-success text-white hover:bg-success/80" : ""}`}
          >
            {passed ? "Aprobado" : "Suspendido"}
          </Badge>
          <div
            className={`text-5xl font-bold ${passed ? "text-success" : "text-destructive"}`}
          >
            {result.score}/{result.total}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Necesitabas {TEST_CONFIG.passingScore} respuestas correctas para
            aprobar.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="py-4 text-center">
            <Clock className="mx-auto mb-1 size-5 text-muted-foreground" />
            <div className="text-lg font-semibold text-foreground">
              {formatTime(result.timeUsedSeconds)}
            </div>
            <p className="text-xs text-muted-foreground">Tiempo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <CheckCircle2 className="mx-auto mb-1 size-5 text-success" />
            <div className="text-lg font-semibold text-foreground">
              {result.score}
            </div>
            <p className="text-xs text-muted-foreground">Correctas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <XCircle className="mx-auto mb-1 size-5 text-destructive" />
            <div className="text-lg font-semibold text-foreground">
              {incorrect}
            </div>
            <p className="text-xs text-muted-foreground">Incorrectas</p>
          </CardContent>
        </Card>
      </div>

      {/* Question review */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Revisión de preguntas
        </h2>
        <div className="space-y-2">
          {result.questions.map((question) => {
            const userKey = result.answers[question.id];
            const isQuestionCorrect = userKey === question.correcta;
            const userOption = question.opciones.find(
              (o) => o.key === userKey
            );
            const correctOption = question.opciones.find(
              (o) => o.key === question.correcta
            );

            return (
              <Card key={question.id}>
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {question.number}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        {question.enunciado}
                      </p>
                      <div className="text-xs">
                        {!userKey ? (
                          <span className="text-muted-foreground">
                            Sin responder
                          </span>
                        ) : isQuestionCorrect ? (
                          <span className="flex items-center gap-1 text-success">
                            <CheckCircle2 className="size-3.5" />
                            {userOption?.texto}
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <span className="flex items-center gap-1 text-destructive">
                              <XCircle className="size-3.5" />
                              Tu respuesta: {userOption?.texto}
                            </span>
                            <span className="flex items-center gap-1 text-success">
                              <CheckCircle2 className="size-3.5" />
                              Correcta: {correctOption?.texto}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {fallosHref && (
          <Button variant="outline" className="flex-1" asChild>
            <Link href={fallosHref}>
              <RotateCcw className="mr-2 size-4" />
              Revisar fallos
            </Link>
          </Button>
        )}
        <Button className="flex-1" asChild>
          <Link href={nextTestHref}>
            <ArrowRight className="mr-2 size-4" />
            Siguiente test
          </Link>
        </Button>
        <Button variant="ghost" className="flex-1" asChild>
          <Link href={homeHref}>
            <Home className="mr-2 size-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}
