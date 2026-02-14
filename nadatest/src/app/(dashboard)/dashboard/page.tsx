"use client";

import Link from "next/link";
import {
  FileText,
  BarChart3,
  Flame,
  AlertCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";

const recentTests = [
  {
    id: "1",
    name: "Test general #15",
    date: "12/02/2026",
    score: 28,
    total: 30,
    passed: true,
  },
  {
    id: "2",
    name: "Test general #14",
    date: "11/02/2026",
    score: 25,
    total: 30,
    passed: false,
  },
  {
    id: "3",
    name: "Test general #13",
    date: "10/02/2026",
    score: 29,
    total: 30,
    passed: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Bienvenido a Nadatest
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tu progreso de hoy y resumen de actividad reciente.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard
          title="Tests realizados"
          value="12"
          icon={FileText}
          description="este mes"
        />
        <StatsCard
          title="Nota media"
          value="87%"
          icon={BarChart3}
          trend={{ value: 5, positive: true }}
        />
        <StatsCard
          title="Racha actual"
          value="7 dias"
          icon={Flame}
        />
        <StatsCard
          title="Preguntas falladas"
          value="23"
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
        <div className="space-y-2">
          {recentTests.map((test) => (
            <Card key={test.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {test.name}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {test.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    {test.score}/{test.total}
                  </span>
                  <Badge
                    variant={test.passed ? "default" : "destructive"}
                    className={test.passed ? "bg-success text-success-foreground hover:bg-success/80" : ""}
                  >
                    {test.passed ? "Aprobado" : "Suspendido"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
